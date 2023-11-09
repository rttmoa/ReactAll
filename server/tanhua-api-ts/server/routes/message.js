const router = require('koa-router')(),
Message = require('../controllers/message.js'),
koaBody = require('koa-body');


// TODO: MySQL 连接查询 + 子查询

// 获取点赞信息列表
router.get('/starlist', Message.starlist);  // FIXME: 已完成...



module.exports = router;