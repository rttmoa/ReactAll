/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-06-16 14:37:39
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-06-16 16:28:20
 * @Description: 获取对象主键字段类型，用于生成对象的graphql schema，如 id: ID!
 */

import { SteedosObjectTypeConfig, getDataSource, SteedosDatabaseDriverType } from "../../..";
import _ = require("lodash");

/**
 * 根据对象所属数据源的类型，生成grapqhl shcmea的主键字段定义
 * @param objectConfig 对象配置
 */
export function getPrimaryFieldType(objectConfig: SteedosObjectTypeConfig) {
    let idType = '';
    let fields = objectConfig.fields;
    const datasource = getDataSource(objectConfig.datasource);
    if (datasource.driver === SteedosDatabaseDriverType.MeteorMongo || datasource.driver === SteedosDatabaseDriverType.Mongo) {
        if (!_.has(fields, "_id")) {
            idType = '_id: String'
        }
    } else {
        // 设置非默认数据源的主键字段，如mysql
        for (let fieldName in fields) {
            let field = fields[fieldName];
            if (field.primary) {
                let fieldType = ''
                switch (field.type) {
                    case 'text' || 'textarea':
                        fieldType = 'String';
                        break;
                    case 'number':
                        fieldType = 'Float';
                        break;
                    default:
                        fieldType = 'JSON'
                        break;
                }
                idType = `_id: ${fieldType}`;
                break;
            }
        }
    }

    return idType;
}