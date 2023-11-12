/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// 生成 token
// 验证 token

import jwt from "jsonwebtoken";
import { config } from "./config";

const sign = (data = {}) => {
  return jwt.sign(data, config.jwtSecret, { expiresIn: 60 * 60 });
};


const verify = (req: any, res: any, next: any) => {
  const authorization = req.headers.authorization || req.body.token || req.query.token;
  let token = "";
  if (authorization.includes("Bearer")) {
    token = authorization.replace("Bearer ", "");
  } else {
    token = authorization;
  }
  jwt.verify(token, config.jwtSecret, (error, data: any) => {
    if (error) {
      res.json({ error: 1, data: "token验证失败" });
    } else {
      // req._id = data?._id;
      next();
    }
  });
};

export {
  sign,
  verify
};