const router = require('koa-router')(),
    My = require('../controllers/my.js'),
    koaBody = require('koa-body');


// 

// 个人信息
router.get('/userinfo', My.userinfo); // FIXME: 已完成...

// 保存个人信息
router.post('/submitUserInfo', My.submitUserInfo); // FIXME: 已完成...

// 我的动态
router.get('/trends', My.trends); // FIXME: 已完成...

// 粉丝，喜欢，互相关注 
router.get('/counts', My.counts);  // FIXME: 已完成...

// 粉丝，喜欢，互相关注 列表数据
router.get('/likelist', My.likelist);  // FIXME: 已完成...


module.exports = router;