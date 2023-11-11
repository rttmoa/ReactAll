import user from './user'
import my from './my'
import mongo from './mongo'

import Router = require("@koa/router")
const router = new Router();



export default (app: any): any => {
  
  router.use('/user', user.routes())
  router.use('/my', my.routes())
  router.use('/mongo', mongo.routes())
  app.use(router.routes()).use(router.allowedMethods())
}