import { Context } from "koa";
import { config } from "./config";
import { transports, format } from "winston";
import * as path from "path";

const logger = (winstonInstance: any): any => {
    winstonInstance.configure({
        level: config.debugLogging ? "debug" : "info", // 是否开发模式
        transports: [
            //
            // - 将所有日志错误（及以下）写入“error.log”。
            new transports.File({ filename: path.resolve(__dirname, "../error.log"), level: "error" }),
            //
            // - 将指定级别的所有日志写入控制台。
            new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.simple()
                )
            })
        ]
    });

    return async (ctx: Context, next: () => Promise<any>): Promise<void> => {

        const start = new Date().getTime();
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = err.message;
        }
        const ms = new Date().getTime() - start;

        let logLevel: string;
        if (ctx.status >= 500) {
            logLevel = "error";
        } else if (ctx.status >= 400) {
            logLevel = "warn";
        } else {
            logLevel = "info";
        }

        const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;
        // console.log(msg);
        winstonInstance.log(logLevel, msg);
    };
};

export { logger };