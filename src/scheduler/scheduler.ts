import cron from "node-cron";
import { fetchEvents } from "../controllers/fetchAndProcessEvents";
import { processEvents } from "../controllers/fetchAndProcessEvents";
import logger from "../../bunyanlogger";

const job = cron.schedule("* * * * *", async () => {
  try {
    let continuation = null;
    const currentTime = new Date();
    const endTimestamp = Math.floor(currentTime.getTime() / 1000);
    const startTimestamp = endTimestamp - 60;

    do {
      const { events, nextContinuation } = await fetchEvents(
        startTimestamp,
        endTimestamp,
        continuation
      );

      await processEvents(events);
      continuation = nextContinuation;
    } while (continuation);
  } catch (error) {
    logger.error("Error fetching events", error);
  }
});

export default job;
