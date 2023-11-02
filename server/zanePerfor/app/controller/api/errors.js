'use strict';

const Controller = require('egg').Controller;

class ErrorsController extends Controller {

    // 系统重启信息; http://127.0.0.1:7001/errors
    async getSysDbErrorList() {
        const { ctx } = this;
        const result = await ctx.service.errors.getErrorList(); // ! 从 Redis 中获取 错误信息列表

        ctx.body = this.app.result({
            data: result,
        });
    }
}

module.exports = ErrorsController;
