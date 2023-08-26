/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-03-28 09:35:34
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-11-17 09:30:50
 * @Description: 
 */
import "reflect-metadata";

import { getFromContainer } from "./container";
import { CreatorManager } from "./creator/CreatorManager";


const pkg = require('../package.json')
process.env.STEEDOS_VERSION = pkg.version;

/**
 * Gets a ObjectSchemaManager which creates object schema.
 */
export function getCreator(): CreatorManager {
    return getFromContainer(CreatorManager);
}

// export { default as ODataRouter } from './odata/ODataRouter'
export { default as MeteorODataRouter } from './odata/MeteorODataRouter'
export { default as MeteorODataAPIV4Router } from './odata/MeteorODataAPIV4Router'
export * from './routes'
export { init, newCollection, loadObjectTranslations, loadTranslations, InitTranslations, loadClientScripts, loadPackage, loadRouters, removeRouter } from './init'
export { default as Util } from './util'

export * from './plugins'

export { coreExpress } from "./express-middleware";

export * from './holidays'
