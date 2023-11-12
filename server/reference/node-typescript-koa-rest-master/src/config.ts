import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export interface Config {
    port: number;
    debugLogging: boolean;
    dbsslconn: boolean;
    jwtSecret: string;
    databaseUrl: string;
    dbEntitiesPath: string[];
    cronJobExpression: string;
}

const isDevMode = process.env.NODE_ENV == "development";

const config: Config = {
    port: +(process.env.PORT || 3000),
    debugLogging: isDevMode,
    dbsslconn: !isDevMode,
    jwtSecret: process.env.JWT_SECRET || "node-typescript-koa-rest",
    databaseUrl: process.env.DATABASE_URL || "postgres://postgres:root@localhost:5432/apidb",
    dbEntitiesPath: [
      ... isDevMode ? ["src/entity/**/*.ts"] : ["dist/entity/**/*.js"],
    ],
    cronJobExpression: "0 * * * *" // 每小时；0 * * * *  || 每分钟：* * * * *  ||  https://zhuanlan.zhihu.com/p/648015270
};

export { config };