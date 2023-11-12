import { CronJob } from "cron";
import { config } from "./config";




const cron = new CronJob(config.cronJobExpression, () => {
    console.log("每小时执行一次 cron 作业");
});

export { cron };