import koa, { Response, Context } from 'koa'
import Router from '@koa/router'
import json from 'koa-json'
import	koajwt from 'koa-jwt'
import serve from 'koa-static'
import	bodyparser from 'koa-bodyparser'
import	koaBody from 'koa-body'

import { errorHandle, sendHandle, dbHandle } from './middlewares' 
import { config } from './config/config.ts'

import user from './routes/user.ts'
// import friends from './routes/friends.ts'
// import message from './routes/message.ts'
// import qz from './routes/qz.ts'
// import my from './routes/my.ts' 
// import _crossDomain from './middlewares/crossDomain.ts'
// import _public from './middlewares/public.ts'
// import _routes from './routes/index.ts'

const router = new Router();
const	app = new koa()

// 参考文章；https://codeleading.com/article/12133249301/

	
// _crossDomain(app)
// 静态服务器中间件
app.use(serve('./public', {
	setHeaders: (res, path, stats) => {
		let extname = require('path').extname(path);
		// 根据扩展名设置不同的响应头，如果这里不设置，会在sendHandle中统一设置成json格式，那么静态资源也会以json格式返回，浏览器不能正常展示
		switch (extname) {
			case '.html':
				res.setHeader('Content-Type', 'text/html;charset=utf-8');
				break;
			case '.png':
			case '.jpg':
			case '.gif':
			case '.bmp':
				res.setHeader('Content-Type', 'image/png;charset=utf-8');
				break;
		}
	}
})); 


app.use(json(null));  // json中间件
app.use(bodyparser(null));  // body参数解析中间价
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
router.use('/user', user.routes());
// router.use('/friends', friends.routes());
// router.use('/qz', qz.routes());
// router.use('/message',message.routes());
// router.use('/my',my.routes()); 
// _routes()
// app.use(_routes())
app.use(router.routes()).use(router.allowedMethods());



app.listen('9089', () => {
	console.dir('---------------------------------- koa is listening in 9089 -------------------------------------');
}) 
