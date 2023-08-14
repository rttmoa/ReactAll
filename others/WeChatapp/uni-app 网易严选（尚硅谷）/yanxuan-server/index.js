const express = require('express')
const app = express();
// 导入路由
const router = require('./router/index')

app.use('/',router)



app.listen('8888', () => {
	console.log('服务端启动成功啦....');
	console.log('http://localhost:8888');
})
