'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');
const dayjs = require('dayjs');
const BaseController = require('./base');

class UserController extends BaseController {

  async jwtSign({ id, username }) {
    const { ctx, app } = this;
    const token = app.jwt.sign({
      id,
      username,
    }, app.config.jwt.secret);
    // ctx.session[username] = 1;
    await app.redis.set(username, token, 'EX', app.config.redisExpire);
    return token;
  }
  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, [ 'password' ]),
      createTime: ctx.helper.timestamp(result.createTime),
    };
  }
  async register() { // 注册用户： 查询、添加 SQL  +   ctx.helper  +   Token
    try {
      const { ctx, app } = this;
      const parmas = ctx.params();
      // console.log(parmas); // { username: 'zs', password: 'Wenc1101' }
      if (!parmas) return;

      const user = await ctx.service.user.getUser(parmas.username);
      console.log(user);
      if (user) { this.error('用户已经存在'); return; }

      const doc = {
        ...parmas,
        password: md5(parmas.password + app.config.salt),
        createTime: ctx.helper.time(), //  /extend下绑定到ctx全局
      };
      const result = await ctx.service.user.add(doc);
      if (result) {
        const token = await this.jwtSign({
          id: result.id,
          username: result.username,
        });
        this.success({
          ...this.parseResult(ctx, result),
          token,
        });
        // 返回客户端结果：
        // {
        //   "status": 200,
        //   "data": {
        //     "id": 2,
        //     "username": "zs",
        //     "createTime": 1693561940000,
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ6cyIsImlhdCI6MTY5MzU2MTk0MX0.pCErtRVhFPPv6QK3XIXKOz00Jb815hbZ5eV778RCi7c"
        //   }
        // }
      } else {
        this.error('注册使用失败');
      }
    } catch (error) { }
  }

  async login() { // 用户登陆：查询 SQL  +  新Token
    try {
      const { ctx, app } = this;
      const { username, password } = ctx.params();
      const user = await ctx.service.user.getUser(username, password);

      if (user) {
        const token = await this.jwtSign({
          id: user.id,
          username: user.username,
        });

        this.success({
          ...this.parseResult(ctx, user),
          token,
        });
      } else {
        this.error('该用户不存在');
      }
    } catch (error) { }
  }

  async detail() { // 用户详情： 查询 SQL
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    // console.log(user);
    if (user) {
      this.success({
        ...this.parseResult(ctx, user),
      });
    } else {
      this.error('该用户不存在');
    }
  }

  async logout() { // 用户退出： redis清空
    const { ctx, app } = this;
    try {
      await app.redis.del(ctx.username);
      this.success('ok');
    } catch (error) {
      this.error('退出登录失败');
    }
  }

  async edit() { // 用户编辑： 更新 SQL
    const { ctx } = this;
    const result = ctx.service.user.edit({
      ...ctx.params(),
      updateTime: ctx.helper.time(),
      sign: ctx.helper.escape(ctx.params('sign')),
    });

    this.success(result);
  }
}

module.exports = UserController;
