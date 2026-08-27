import { Router, type IRouter } from "express";
import { SendQuoteRequestBody } from "@workspace/api-zod";
import { ReplitConnectors } from "@replit/connectors-sdk";
import type { Request } from "express";

const router: IRouter = Router();

const RECIPIENT_EMAIL = "ailandscapinggp@gmail.com";
const DEFAULT_FROM_EMAIL = "Ai Landscaping & SnowRemoval <onboarding@resend.dev>";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestTimestamps = new Map<string, number[]>();

function getRequestKey(request: Request): string {
  const forwardedFor = request.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string") return forwardedFor.split(",")[0].trim();
  return request.ip || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recentRequests = (requestTimestamps.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestTimestamps.set(key, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestTimestamps.set(key, recentRequests);
  return false;
}

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

router.post("/quote-requests", async (req, res) => {
  const parsed = SendQuoteRequestBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: "Please provide valid quote request details." });
    return;
  }

  if (isRateLimited(getRequestKey(req))) {
    res.status(429).json({ message: "Too many requests. Please try again later." });
    return;
  }

  const quote = {
    name: parsed.data.name.trim(),
    phone: formatPhone(parsed.data.phone),
    email: parsed.data.email.trim().toLowerCase(),
    address: parsed.data.address.trim(),
  };

  if (
    !quote.name ||
    !quote.address ||
    quote.phone.replace(/\D/g, "").length < 10
  ) {
    res.status(400).json({ message: "Please provide valid quote request details." });
    return;
  }

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

  try {
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
      const providerBody = await providerResponse.text();
      req.log.error(
        { status: providerResponse.status, body: providerBody.slice(0, 500) },
        "Resend rejected quote request email",
      );
      res.status(502).json({ message: "We couldn't send your request right now. Please call us at 780-995-7459." });
      return;
    }

    req.log.info("Quote request email sent");
    res.json({ status: "sent" });
  } catch (error) {
    req.log.error({ err: error }, "Quote request email failed");
    res.status(502).json({ message: "We couldn't send your request right now. Please call us at 780-995-7459." });
  }
});

export default router;