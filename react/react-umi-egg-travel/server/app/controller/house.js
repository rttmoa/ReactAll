/* eslint-disable strict */
const Controller = require('egg').Controller;
const BaseController = require('./base');

class HouseController extends BaseController {
  async hot() {
    const { ctx, app } = this;
    const result = await ctx.service.house.hot();
    this.success(result);
  }

  async search() {
    const { ctx, app } = this;
    const result = await ctx.service.house.search(ctx.params());
    this.success(result);
  }

  async detail() {
    const { ctx, app } = this;
    const result = await ctx.service.house.detail(ctx.params('id'));

    this.success({
      info: result,
      banner: result.imgs
    });
  }
}

module.exports = HouseController;