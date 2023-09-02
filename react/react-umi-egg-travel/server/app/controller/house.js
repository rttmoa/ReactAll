/* eslint-disable no-unused-vars */
/* eslint-disable strict */
const Controller = require('egg').Controller;
const BaseController = require('./base');


class HouseController extends BaseController {

  async hot() { // 最热民宿： 查询 SQL
    const { ctx, app } = this;
    const result = await ctx.service.house.hot();
    this.success(result);
  }

  async search() { // 搜索民宿： 查询 SQL     未调试
    // params: {code: ['10001', '10002', '10003'], startTime: '2022-02-12', endTime: '1998-02-12', pageNum: 1, pageSize: 10}
    const { ctx, app } = this;
    const result = await ctx.service.house.search(ctx.params());
    this.success(result);
  }

  async detail() { // 民宿详情： 查询 SQL
    const { ctx, app } = this;
    const result = await ctx.service.house.detail(ctx.params('id')); // id：1,2,3,4,5,6,7,8... 15

    this.success({
      info: result,
      banner: result.imgs,
    });
  }
}

module.exports = HouseController;
