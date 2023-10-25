'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
const BaseService = require('./base');


// UserService继承BaseService， BaseService继承Egg Service
class UserService extends BaseService {

  async getUser(username, password) {
    return this.run(async () => {
      const { ctx, app } = this;
      // 查询条件：有密码根据密码查询，无密码根据用户名查询
      const _where = password ? { username, password: md5(password + app.config.salt) } : { username };
      const result = await ctx.model.User.findOne({
        where: _where,
      });
      return result;
    });
  }

  async add(params) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    });
  }

  async edit(params) {
    return this.run(async ctx => {
      // console.log(ctx.username); // underfined
      try {
        const result = await ctx.model.User.update(params, {
          where: {
            username: ctx.username,
          },
        });
        return result;
      } catch (error) {
        // console.log('edit', error.message); // edit WHERE parameter "username" has invalid "undefined" value
        return null;
      }
    });
  }
}

module.exports = UserService;
