import Koa from "koa";
import jwt from "koa-jwt";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import winston from "winston";
import { createConnection, ConnectionOptions } from "typeorm";
import "reflect-metadata";

import { logger } from "./logger";
import { config } from "./config";
import { unprotectedRouter } from "./unprotectedRoutes";
import { protectedRouter } from "./protectedRoutes";
import { cron } from "./cron";
import { sign } from "./jwt";

// ? 连接 postgres 配置
const connectionOptions: ConnectionOptions = {
    type: "postgres",
    url: config.databaseUrl,
    synchronize: true,
    logging: false,
    entities: config.dbEntitiesPath,
    ssl: config.dbsslconn, // if not development, will use SSL
    extra: {}
};
if (connectionOptions.ssl) {
    connectionOptions.extra.ssl = {
        rejectUnauthorized: false // Heroku uses self signed certificates
    };
}

// 创建与数据库的连接
// 请注意，它不是活动的数据库连接
// TypeORM 创建连接拉取，以使用拉取请求中的连接
createConnection(connectionOptions).then(async () => {

    // console.log(sign()); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTk3NjU4ODcsImV4cCI6MTY5OTc2OTQ4N30.N1O6lOQJwNnfONaeLdeRm_-ryIJKfulKe0fBAO4Ccec
    const app = new Koa();

    // ! 提供重要的安全标头，使您的应用程序更安全
    app.use(helmet.contentSecurityPolicy({
        directives:{
            defaultSrc:["'self'"],
            scriptSrc:["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
            styleSrc:["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com", "fonts.googleapis.com"],
            fontSrc:["'self'","fonts.gstatic.com"],
            imgSrc:["'self'", "data:", "online.swagger.io", "validator.swagger.io"]
        }
    }));

    app.use(cors());

    // 记录器中间件 ->  status >= 500 || status >= 400 || status >= 200
    app.use(logger(winston));

    app.use(bodyParser());

    // ! 这些路由不受 JWT 中间件保护，还包括响应 "Method Not Allowed - 405".
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    // ! JWT 中间件 -> 仅当 JWT 令牌有效且秘密为环境变量时，才能到达此行下方的路由 - 不保护 swagger-json 和 swagger-html 端点
    app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] }));

    // ! 这些路由受 JWT 中间件保护，还包括响应“不允许的方法 -405”的中间件 "Method Not Allowed - 405".
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    // ! 注册 cron 作业来执行任何所需的操作 (定时任务)
    cron.start();

    app.listen(config.port, () => {
        console.dir(`===========================================> Server running on port ${config.port} <===========================================`);
    });

}).catch((error: string) => console.log("TypeORM connection error: ", error));