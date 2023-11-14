import { login } from "./endpoints/login";
import { logout } from "./endpoints/logout";
import { validate } from "./endpoints/validate";
import { jwtSSO } from "./endpoints/jwt";

export const authExpress = require('@steedos/router').staticRouter();

authExpress.post('/api/v4/users/login', login); // ! 登陆；与数据库用户比较，成功后加 Cookie
authExpress.post('/api/v4/users/logout', logout); // ! 退出；清除 Cookie
authExpress.post('/api/v4/users/validate', validate) // ! 校验用户

// 保留以前的接口路由
authExpress.post('/api/setup/login', login);
authExpress.post('/api/setup/logout', logout)
authExpress.post('/api/setup/validate', validate)

authExpress.get('/jwt/sso', jwtSSO);