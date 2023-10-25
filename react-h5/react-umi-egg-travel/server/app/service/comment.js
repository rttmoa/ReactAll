/* eslint-disable strict */
const Service = require('egg').Service;
const BaseService = require('./base');

class CommentService extends BaseService {


  async add(params) {
    return this.run(async ctx => {
      const result = await ctx.model.Comment.create(params);
      return result;
    });
  }


  async lists(params, userId) {

    return this.run(async (ctx, app) => {
      const { id, pageSize, pageNum } = params;
      const result = await ctx.model.Comment.findAll({
        where: {
          houseId: id,
          userId,
        },
        limit: pageSize,
        offset: (pageNum - 1) * pageSize,
        include: [
          {
            model: app.model.User,
            attributes: [ 'avatar', 'username' ],
          },
        ],
      });
      return result;
    });
  }
}

module.exports = CommentService;
