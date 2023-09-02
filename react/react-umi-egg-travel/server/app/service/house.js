/* eslint-disable strict */
const Service = require('egg').Service;
const BaseService = require('./base');

class HouseService extends BaseService {


  commonAttr(app) {
    return {
      order: [
        [ 'showCount', 'DESC' ],
      ],
      attributes: {
        exclude: [ 'startTime', 'endTime', 'publishTime' ],
      },
      include: [{
        model: app.model.Imgs,
        limit: 1,
        attributes: [ 'url' ],
      }],
    };
  }


  async hot() {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findAll({
        ...this.commonAttr(app),
        limit: 4,
      });
      return result;
    });
  }


  async search(params) {
    // params: {code: ['10001', '10002', '10003'], startTime: '2022-02-12', endTime: '1998-02-12', pageNum: 1, pageSize: 10}
    return this.run(async (ctx, app) => {
      const { lte, gte, like } = app.Sequelize.Op;
      const where = {
        cityCode: Array.isArray(params.code) ? params.code[0] : params.code,
        startTime: {
          [lte]: params.startTime,
        },
        endTime: {
          [gte]: params.endTime,
        },
        name: {
          [like]: '%' + params.houseName + '%',
        },
      };
      if (!params.houseName) {
        delete where.name;
      }
      const result = await ctx.model.House.findAll({
        ...this.commonAttr(app),
        limit: 8,
        offset: (params.pageNum - 1) * params.pageSize,
        where,
      });

      return result;
    });
  }


  async detail(id) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findOne({
        where: { id },
        include: [
          {
            model: app.model.Imgs,
            attributes: [ 'url' ],
          },
        ],
      });

      await ctx.model.House.update({ showCount: result.showCount + 1 }, {
        where: {
          id,
        },
      });
      return result;
    });
  }
}

module.exports = HouseService;
