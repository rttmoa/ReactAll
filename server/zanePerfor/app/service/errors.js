/* eslint-disable indent */
'use strict';
const Service = require('egg').Service;

class ErrorsService extends Service { // 系统重启信息; http://127.0.0.1:7001/errors

    // ErrorsService
        // Redis 获取错误列表
        // Redis 存储错误信息


    /*
     * 获得列表信息
     *
     * @returns
     * @memberof ErrorsService
     */
    async getErrorList() {
        const result = await this.app.redis.lrange('db_servers_error_list', 0, -1);
        return result ? result : [];
    }

    /*
     * 保存db和服务重启错误信息
     *
     * @param {*} type
     * @param {*} item
     * @param {*} catcherr
     * @memberof ErrorsService
     */
    async saveSysAndDbErrors(type, item, catcherr) {
        await this.app.redis.lpush('db_servers_error_list', JSON.stringify({
            dbname: type,
            shell: item,
            catch_error: catcherr,
            create_time: new Date(),
        }));
    }

}

module.exports = ErrorsService;
