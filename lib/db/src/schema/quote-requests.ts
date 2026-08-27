import { createInsertSchema } from "drizzle-zod";
import { integer, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const quoteRequestsTable = pgTable(
  "quote_requests",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    requestId: text("request_id").notNull(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email").notNull(),
    address: text("address").notNull(),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [unique("quote_requests_request_id_unique").on(table.requestId)],
);

export const quoteRequestRateLimitsTable = pgTable("quote_request_rate_limits", {
  clientFingerprint: text("client_fingerprint").primaryKey(),
  windowStartedAt: timestamp("window_started_at", { withTimezone: true }).notNull(),
  requestCount: integer("request_count").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequestsTable);

export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type QuoteRequest = typeof quoteRequestsTable.$inferSelect;