import { Dictionary } from '@salesforce/ts-types';
import { getObjectConfig, getSteedosSchema, SteedosObjectPermissionTypeConfig } from '../types'
import { registerPermissionFields } from '../metadata-register/permissionFields'
import _ = require('lodash');
var util = require('../util');
var clone = require('clone');

const _lazyLoads: Dictionary<any> = {};

const addLazyLoad = function(objectName: string, json: SteedosObjectPermissionTypeConfig){
    if(!_lazyLoads[objectName]){
        _lazyLoads[objectName] = []
    }
    _lazyLoads[objectName].push(json)
}

const getLazyLoads = function(objectName: string){
    return _lazyLoads[objectName]
}

export const getLazyLoadPermissions  = function(objectName: string){
    return getLazyLoads(objectName);
}

export const lazyloadPermissions = function(objectName: string){
    let permissions = getLazyLoads(objectName);
    _.each(permissions, function(permission){
        addPermissionConfig(permission.object_name, clone(permission));
    })
}

export const addPermissionConfig = (objectName: string, json: SteedosObjectPermissionTypeConfig)=>{
    if (!json.object_name) {
        throw new Error('missing attribute object_name')
    }
    let object = getObjectConfig(json.object_name);
    if (object) {
        if(!object.permission_set){
            object.permission_set = {}
        }
        util.extend(object.permission_set, {[json.name]: json})
        // getDataSource(object.datasource).setObjectPermission(objectName, json);
    } else {
        addLazyLoad(objectName, json);
    }
}

export const loadObjectPermissions = async function (filePath: string, serviceName: string){
    let permissions = util.loadPermissions(filePath);
    permissions.forEach(permission => {
        addPermissionConfig(permission.object_name, permission);
    });
    if(serviceName)
        for await (const permission of permissions) {
            const { field_permissions } = permission;
            if (field_permissions && _.isArray(field_permissions) && field_permissions.length > 0) {
                for await (const field_permission of field_permissions) {
                    await registerPermissionFields.register(getSteedosSchema().broker, serviceName, {
                        "name": `${permission.name}.${permission.object_name}.${field_permission.field}`,
                        "permission_set_id": permission.name,
                        "permission_object": `${permission.name}_${permission.object_name}`,
                        "object_name": permission.object_name,
                        "field": field_permission.field,
                        "readable": field_permission.readable,
                        "editable": field_permission.editable,
                        "is_system": true,
                    })
                }
            }
        }
}