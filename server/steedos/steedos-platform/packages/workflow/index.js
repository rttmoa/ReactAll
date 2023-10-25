/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-03-28 09:35:34
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-12-30 17:40:56
 * @Description: 
 */
const express = require('express');
const path = require('path');
exports.init = function ({  }) {
    let desingerDir = path.dirname(require.resolve("@steedos/steedos-plugin-workflow/package.json"));
    require('./src/designerRouter')
    require('@steedos/router').staticRouter().use('/applications', express.static(path.join(desingerDir, 'public')));
    require('./src/instance_files')
    require('./src/office_convert_to_pdf_router')
};

// 声明审批王引擎所需全局变量
exports.workflowManagers = require('./engine/manager')

// 导出methods
exports.workflowMethods = require('./engine/methods')

exports.desingerManager = require('./src/designerManager')