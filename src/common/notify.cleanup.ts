import cron from "node-cron";
import Notify from "../model/entities/entity.notify.entity";

cron.schedule("* * * * *", async () => {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 0);

    const res = await Notify.deleteMany({ createdAt: { $lt: cutoff } });
    console.log(`[CRON] Deleted ${res.deletedCount} old notifies`);
  } catch (error) {
    console.error("[CRON] Error deleting old notifies:", error);
  }
});
