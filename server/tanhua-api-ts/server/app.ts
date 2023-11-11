import koa, { Response, Context } from 'koa'
import Router from '@koa/router'
import json from 'koa-json'
import	koajwt from 'koa-jwt'
import	bodyparser from 'koa-bodyparser'
import	koaBody from 'koa-body'

import { errorHandle, sendHandle, dbHandle } from './middlewares' 
import { config } from './config/config.ts'

import user from './routes/user.ts'
// import friends from './routes/friends.ts'
// import message from './routes/message.ts'
// import qz from './routes/qz.ts'
// import my from './routes/my.ts' 
import _crossDomain from './middlewares/crossDomain.ts'
import _public from './middlewares/public.ts'
import _routes from './routes/index.ts'

const router = new Router();
const	app = new koa()

// 参考文章；https://codeleading.com/article/12133249301/
// ! steedos-accounts/src/rest-express/endpoints/steedos/create-tenant.ts 文件 db 创建数据
	
_crossDomain(app)
_public(app)


app.use(json());  // json中间件
app.use(bodyparser());  // body参数解析中间价
app.use(sendHandle());  // 响应中间件
app.use(dbHandle());// 数据库处理中间件
app.use(errorHandle); // 异常中间件



// token验证接口
app.use(koajwt({
	secret: config.jwtkey
}).unless({
	// 排除需要token验证的接口
	path: ['/user/login','/user/loginVerification', '/swagger.html'] as any
}));


// 接口地址为： /user/login
// router.use('/user', user.routes());
// router.use('/friends', friends.routes());
// router.use('/qz', qz.routes());
// router.use('/message',message.routes());
// router.use('/my',my.routes()); 
_routes(app)

// app.use(_routes())
// app.use(router.routes()).use(router.allowedMethods());



app.listen(config.port, () => {
	console.dir('---------------------------------- koa is listening in 9089 -------------------------------------');
}) 
