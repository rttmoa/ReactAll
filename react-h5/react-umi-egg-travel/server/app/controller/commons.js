/* eslint-disable strict */
// const Controller = require('egg').Controller;
const BaseController = require('./base');

class CommonsController extends BaseController {
  async citys() {
    const { ctx, app } = this;
    try {
      // 可维护，MySQL中imgs表
      const result = await app.httpclient.request('https://apis.imooc.com/?icode=B2060B086C0D78F9', {
        dataType: 'json',
      });
      console.log(result); // data: { msg: 'icode不存在', data: null, code: 1001 },
      if (result.status === 200) {
        this.success(result.data.citys);
      } else {
        this.error('获取城市数据失败');
      }
    } catch (error) {
      this.error('获取城市数据失败');
    }
  }
}

module.exports = CommonsController;
