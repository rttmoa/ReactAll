import koa from 'koa'
import user from './user'
import Router = require("@koa/router")
const router = new Router();



export default (): any => {

  router.use('/user', user.routes())
  // return router
}