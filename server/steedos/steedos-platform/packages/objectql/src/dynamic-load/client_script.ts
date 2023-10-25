/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-06-14 18:43:07
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2023-01-05 11:27:12
 * @Description: 
 */
import _ = require('lodash')
import path = require('path')
import fs = require('fs')
import { syncMatchFiles } from '@steedos/metadata-core';
// const babel = require("@babel/core");

const { getCacher } = require('@steedos/cachers');

const CACHER_NAME = 'client-scripts';

export const getClientScripts = () => {
    const cacher = getCacher(CACHER_NAME);
    let scripts = "";

    _.each(cacher.values(), (value)=>{
        scripts = scripts + value;
    });
    return scripts;
}

export const loadPackageClientScripts = (packageName, packageDir)=>{
    const cacher = getCacher(CACHER_NAME);
    const filePatten = [
        path.join(packageDir, "*.client.js"),
        "!" + path.join(packageDir, "node_modules"),
    ];
    let packageClientScripts = "";
    let matchedPaths: Array<string> = syncMatchFiles(filePatten);
    matchedPaths = _.sortBy(matchedPaths);
    _.each(matchedPaths, (matchedPath) => {
        let code = fs.readFileSync(matchedPath, 'utf8');
        // packageClientScripts = packageClientScripts + '\r\n;' + code + '\r\n;'
        packageClientScripts = packageClientScripts + '\r\n;' + `try{${code};\r\n}catch(error){console.error('client.js [${matchedPath}] error', error)}` + ';\r\n'
    });

    if(packageClientScripts){
        // try {
        //     cacher.set(packageName, babel.transformSync(packageClientScripts, { 
        //         sourceType: "script", //移除安全模式
        //         comments: false,
        //         presets: [
        //             [
        //               "@babel/preset-env"
        //             ]
        //         ], 
        //         targets: {
        //             chrome: "73",
        //         }
        //     }).code)
        // } catch (error) {
        //     console.error(`loadPackageClientScripts:${packageName}, Error:`, error)
        // }
        cacher.set(packageName, packageClientScripts);
    }
}

export const deletePackageClientScripts = (packageName)=>{
    const cacher = getCacher(CACHER_NAME);
    cacher.delete(packageName);
}

