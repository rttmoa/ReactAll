/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-12-08 15:16:53
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2023-01-18 16:50:20
 * @Description: 
 */
'use strict';
// @ts-check
const { getObject } = require('@steedos/objectql');

module.exports = {
    listenTo: 'instance_tasks',

    beforeInsert: async function () { },

    beforeUpdate: async function () { },

    beforeDelete: async function () { },

    afterInsert: async function () { },

    afterUpdate: async function () {
        // console.log('[trigger][instance_tasks]', 'afterUpdate')
        const { doc, previousDoc } = this
        // 未完成到已完成
        if (!previousDoc.is_finished && doc.is_finished) {
            const instanceTasksObj = getObject('instance_tasks')
            const { _id, instance, handler } = previousDoc
            // 更新当前记录is_latest_approve为true
            await instanceTasksObj.directUpdate(_id, {
                is_latest_approve: true
            })
            // 更新其他记录is_latest_approve为false
            await instanceTasksObj.updateMany([
                ['instance', '=', instance],
                ['handler', '=', handler],
                ['_id', '!=', _id]
            ], {
                is_latest_approve: false
            })
        }
    },

    afterDelete: async function () { },

}