const express = require('express')
const router = express.Router();

const indexData = require('../datas/index.json'); //首页数据

const indexCateList = require('../datas/indexCateList.json') // 首页滑块导航  分类

const categoryDatas = require('../datas/categoryDatas.json') // tabbar 分类页数据

const jwt = require('jsonwebtoken')


// Node 入口
var Fly = require("flyio/src/node")
var fly = new Fly;


router.get('/test', (req, res) => {
	console.log('测试成功');
	res.send('测试成功')
})

// 首页接口
router.get('/getIndexData', (req, res) => {
	res.send({
		status: 200,
		indexData
	})
})

// 首页滑块导航  分类
router.get('/getIndexCateList', (req, res) => {
	res.send({
		status: 200,
		indexCateList
	})
})


// tabbar 分类页数据
router.get('/categoryDatas', (req, res) => {
	res.send({
		status: 200,
		categoryDatas,
	})
})

// 获取唯一标记  token  微信唯一性标识
router.get('/getOpenId', async (req, res) => {
	// 1、接受请求参数
	const code = req.query.code;
	// 2、整合数据对接微信服务器
	const appId = 'wx894ae1ef2ecb1936';
	const appSecret = '7a27b20309b0fc1fea2963e364f0a19a';

	// 请求微信接口 的链接
	// https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
	const url =
		`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
	// 对接微信服务器
	const result = await fly.get(url);

	const openId = JSON.parse(result.data).openid;
	console.log('openid', result.data)
	// 3、接收到微信服务器返回的openId，结合当前用户数据，加密生成token
	const info = {
		openId,
		name: 'Doraemon',
		age: 17
	}
	// jwt 加密
	var token = jwt.sign({
		foo: info
	}, 'shhhhh');
	console.log(token);
	// 解密：
	// const res2=jwt.verify(token,'shhhhh');
	// console.log(res2)

	// 4、返回给浏览器当前用户加密后的标识
	res.send({
		token
	})
})


//导出
module.exports = router
