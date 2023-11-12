import Router from "@koa/router";
import { general } from "./controller";

const unprotectedRouter = new Router();


// ! 不受 JWT 中间件保护的路由、可以是注册、登陆 不用验证 Token的路由接口


// Hello World route
unprotectedRouter.get("/", general.helloWorld);

export { unprotectedRouter };