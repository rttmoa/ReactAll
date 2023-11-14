import { setRequestUser } from "./session";
import { Response } from 'express-serve-static-core';
import * as core from "express-serve-static-core";
interface Request extends core.Request {
    user: any;
}

// ? 需要身份验证
export const requireAuthentication = async (req: Request, res: Response, next: () => void) => {
    // ? 给 Request 对象添加 user 属性，解析Request对象，获取请求头信息， 返回值类型为 Promise<SteedosUserSession>  
    await setRequestUser(req, res, function () {
        if (req.user) {
            next();
        }
        else {
            res.status(401).send({ status: 'error', message: 'You must be logged in to do this.' });
        }
    });

}