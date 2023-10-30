'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // middleware/userExist.js 判断用户是否存在
  const userExist = app.middleware.userExist();

  // FIXME: 用户部分已测试....
  router.post('/api/user/register', controller.user.register); // 用户注册
  router.post('/api/user/login', controller.user.login); // 用户登陆
  router.post('/api/user/detail', userExist, controller.user.detail); // 用户详情
  router.post('/api/user/logout', controller.user.logout); // 用户退出 redis
  router.post('/api/user/edit', controller.user.edit); // 用户编辑

  router.post('/api/commons/citys', controller.commons.citys); // 获取城市数据

  // FIXME: 民宿部分已测试...
  router.post('/api/house/hot', controller.house.hot); // 最热民宿
  router.post('/api/house/search', controller.house.search); // 搜索民宿
  router.post('/api/house/detail', controller.house.detail); // 民宿详情

  router.post('/api/comment/add', controller.comment.add); // 添加评论
  router.post('/api/comment/lists', controller.comment.lists); // 评论列表

  router.post('/api/orders/hasOrder', userExist, controller.orders.hasOrder); // 是否存在订单
  router.post('/api/orders/addOrder', userExist, controller.orders.addOrder); // 添加订单
  router.post('/api/orders/delOrder', userExist, controller.orders.delOrder); // 删除订单
  router.post('/api/orders/lists', userExist, controller.orders.lists); // 订单列表
  router.post('/api/orders/pay', userExist, controller.orders.pay); // 订单支付
};
