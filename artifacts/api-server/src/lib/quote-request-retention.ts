import { db, quoteRequestsTable } from "@workspace/db";
import { lt } from "drizzle-orm";
import { logger } from "./logger";

const CLEANUP_INTERVAL_MS = 60 * 60 * 1000;

export function getQuoteRequestRetentionCutoff(now: Date): Date {
  const cutoff = new Date(now);
  const dayOfMonth = cutoff.getUTCDate();

  cutoff.setUTCDate(1);
  cutoff.setUTCMonth(cutoff.getUTCMonth() - 1);

  const lastDayOfPreviousMonth = new Date(
    Date.UTC(cutoff.getUTCFullYear(), cutoff.getUTCMonth() + 1, 0),
  ).getUTCDate();
  cutoff.setUTCDate(Math.min(dayOfMonth, lastDayOfPreviousMonth));

  return cutoff;
}

export function startQuoteRequestRetentionCleanup(): void {
  let cleanupInProgress = false;

  const cleanupExpiredRequests = async () => {
    if (cleanupInProgress) return;
    cleanupInProgress = true;

    try {
      const cutoff = getQuoteRequestRetentionCutoff(new Date());
      const removedRequests = await db
        .delete(quoteRequestsTable)
        .where(lt(quoteRequestsTable.createdAt, cutoff))
        .returning({ id: quoteRequestsTable.id });

      if (removedRequests.length > 0) {
        logger.info(
          { deletedCount: removedRequests.length, cutoff },
          "Expired quote requests deleted",
        );
      }
    } catch (err) {
      logger.error({ err }, "Failed to delete expired quote requests");
    } finally {
      cleanupInProgress = false;
    }
  };

  void cleanupExpiredRequests();

  const timer = setInterval(() => {
    void cleanupExpiredRequests();
  }, CLEANUP_INTERVAL_MS);
  timer.unref();
}
