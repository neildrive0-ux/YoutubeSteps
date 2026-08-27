import { createHmac } from "node:crypto";
import { ReplitConnectors } from "@replit/connectors-sdk";
import {
  db,
  quoteRequestRateLimitsTable,
  quoteRequestsTable,
} from "@workspace/db";
import {
  CreateQuoteRequestBody,
  CreateQuoteRequestResponse,
} from "@workspace/api-zod";
import { eq, lt, sql } from "drizzle-orm";
import { Router, type IRouter, type Request } from "express";

const router: IRouter = Router();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_LIMIT_RETENTION_MS = 24 * 60 * 60 * 1000;
const RECIPIENT_EMAIL = "ailandscapinggp@gmail.com";
const DEFAULT_FROM_EMAIL =
  "Ai Landscaping & SnowRemoval <onboarding@resend.dev>";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const configuredRateLimitSecret = process.env.SESSION_SECRET;

if (!configuredRateLimitSecret) {
  throw new Error("SESSION_SECRET is required for quote request abuse protection.");
}

const rateLimitSecret: string = configuredRateLimitSecret;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPhone(value: string): string {
  return value.replace(/[^\d+().\-\s]/g, "").trim();
}

async function sendQuoteNotification(
  quote: { name: string; phone: string; email: string; address: string },
  req: Request,
): Promise<void> {
  const connectors = new ReplitConnectors();
  const from = process.env.QUOTE_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;
  const subject = `New quote request from ${quote.name}`;
  const text = [
    "New quote request from the Ai Landscaping & SnowRemoval website",
    "",
    `Name: ${quote.name}`,
    `Phone: ${quote.phone}`,
    `Email: ${quote.email}`,
    `Property address: ${quote.address}`,
  ].join("\n");
  const html = `
    <h2>New quote request</h2>
    <p>A new request was submitted through the Ai Landscaping &amp; SnowRemoval website.</p>
    <table cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(quote.name)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(quote.phone)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(quote.email)}</td></tr>
      <tr><td><strong>Property address</strong></td><td>${escapeHtml(quote.address)}</td></tr>
    </table>
  `;

  const providerResponse = await connectors.proxy("resend", "/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [RECIPIENT_EMAIL],
      reply_to: quote.email,
      subject,
      text,
      html,
    }),
  });

  if (!providerResponse.ok) {
    throw new Error(
      `Resend rejected quote notification with status ${providerResponse.status}`,
    );
  }

  req.log.info("Quote request email sent");
}

function normalizeBody(body: unknown) {
  const candidate =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};

  const normalizeString = (value: unknown) =>
    typeof value === "string" ? value.trim() : value;

  return {
    requestId: normalizeString(candidate.requestId),
    name: normalizeString(candidate.name),
    phone: normalizeString(candidate.phone),
    email: normalizeString(candidate.email),
    address: normalizeString(candidate.address),
    website: normalizeString(candidate.website),
  };
}

function getClientKey(req: Request): string {
  const clientAddress = req.ip || req.socket.remoteAddress || "unknown";

  return createHmac("sha256", rateLimitSecret)
    .update(clientAddress)
    .digest("hex");
}

async function isRateLimited(clientKey: string): Promise<boolean> {
  const now = Date.now();
  const currentTime = new Date(now);
  const windowCutoff = new Date(now - RATE_LIMIT_WINDOW_MS);

  const [rateLimit] = await db
    .insert(quoteRequestRateLimitsTable)
    .values({
      clientFingerprint: clientKey,
      windowStartedAt: currentTime,
      requestCount: 1,
      updatedAt: currentTime,
    })
    .onConflictDoUpdate({
      target: quoteRequestRateLimitsTable.clientFingerprint,
      set: {
        windowStartedAt: sql`CASE
          WHEN ${quoteRequestRateLimitsTable.windowStartedAt} < ${windowCutoff}
          THEN ${currentTime}
          ELSE ${quoteRequestRateLimitsTable.windowStartedAt}
        END`,
        requestCount: sql`CASE
          WHEN ${quoteRequestRateLimitsTable.windowStartedAt} < ${windowCutoff}
          THEN 1
          ELSE ${quoteRequestRateLimitsTable.requestCount} + 1
        END`,
        updatedAt: currentTime,
      },
    })
    .returning({ requestCount: quoteRequestRateLimitsTable.requestCount });

  await db
    .delete(quoteRequestRateLimitsTable)
    .where(
      lt(
        quoteRequestRateLimitsTable.updatedAt,
        new Date(now - RATE_LIMIT_RETENTION_MS),
      ),
    );

  return rateLimit.requestCount > MAX_REQUESTS_PER_WINDOW;
}

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

async function findByRequestId(requestId: string) {
  const [quoteRequest] = await db
    .select()
    .from(quoteRequestsTable)
    .where(eq(quoteRequestsTable.requestId, requestId))
    .limit(1);

  return quoteRequest;
}

router.post("/quote-requests", async (req, res): Promise<void> => {
  const parsed = CreateQuoteRequestBody.safeParse(normalizeBody(req.body));

  if (
    !parsed.success ||
    !emailPattern.test(parsed.data.email) ||
    parsed.data.phone.replace(/\D/g, "").length < 10
  ) {
    req.log.warn("Rejected invalid quote request");
    res.status(400).json({ error: "Please check the quote details and try again." });
    return;
  }

  if (parsed.data.website) {
    req.log.warn("Rejected quote request that filled the spam trap");
    res.status(400).json({ error: "Unable to submit this request." });
    return;
  }

  const existingQuoteRequest = await findByRequestId(parsed.data.requestId);
  if (existingQuoteRequest) {
    res.status(200).json(CreateQuoteRequestResponse.parse(existingQuoteRequest));
    return;
  }

  if (await isRateLimited(getClientKey(req))) {
    res.set("Retry-After", String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)));
    res.status(429).json({
      error: "Too many quote requests. Please wait before trying again.",
    });
    return;
  }

  try {
    const [quoteRequest] = await db
      .insert(quoteRequestsTable)
      .values({
        requestId: parsed.data.requestId,
        name: parsed.data.name,
        phone: formatPhone(parsed.data.phone),
        email: parsed.data.email.toLowerCase(),
        address: parsed.data.address,
      })
      .returning();

    req.log.info({ quoteRequestId: quoteRequest.id }, "Quote request stored");
    res.status(201).json(CreateQuoteRequestResponse.parse(quoteRequest));

    void sendQuoteNotification(quoteRequest, req).catch((notificationError) => {
      req.log.error(
        { err: notificationError, quoteRequestId: quoteRequest.id },
        "Quote request stored but email notification failed",
      );
    });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      const duplicateQuoteRequest = await findByRequestId(parsed.data.requestId);
      if (duplicateQuoteRequest) {
        res
          .status(200)
          .json(CreateQuoteRequestResponse.parse(duplicateQuoteRequest));
        return;
      }
    }

    req.log.error({ err: error }, "Failed to store quote request");
    res.status(500).json({
      error: "We could not save this request right now. Please try again.",
    });
  }
});

export default router;