const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')            /* next作为中间件 */
const session = require('koa-session')  /* koa-session */
const Redis = require('ioredis')
const koaBody = require('koa-body')
const atob = require('atob')

const auth = require('./server/auth')
const api = require('./server/api')

const RedisSessionStore = require('./server/session-store')   // Redis 操作 session

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });    /* 是否处于开发状态 */
const handle = app.getRequestHandler() /* 处理Http请求的响应 */

 
const redis = new Redis({ port: 6379, db:3 }) 

global.atob = atob; // 它将 base64 编码的 ascii 数据转换回二进制



app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.keys = ['Jokcy develop Github App']  // 这个字符串是给cookie加密的

  server.use(koaBody())

  // Koa的session对象 
  const SESSION_CONFIG = {
    key: 'jid',
    // maxAge: 10 * 1000,  //FIXME: 注释掉时间后，刷新页面session不会丢失
    store: new RedisSessionStore(redis), // 连接数据库存储的功能
  }

  server.use(session(SESSION_CONFIG, server))



  // 配置处理github OAuth的登录
  // 将server传入 使用module.exports = server => {}  函数接收
  auth(server)  
  api(server)


  // server.use(async (ctx, next) => {
  //   const path = ctx.path // 获取请求路径
  //   const method = ctx.method
  //   ctx.body = `<span>Koa Router ${path}</span>`
  //   await next() // 是否向下执行
  // })


  // /a/?.js文件
  router.get('/a/:id', async ctx => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id },
    })
    ctx.respond = false
  })

  /**--- 测试session添加与删除Redis ---**/
  // router.get('/set/user', async ctx => {
  //   ctx.session.user = {name: 'Jokcy', age: 18}
  //   ctx.body = "set session success"
  // })
  // router.get('/delete/user', async ctx => {
  //   ctx.session = null
  //   ctx.body = "delete session success"
  // })



  router.get('/api/user/info', async ctx => {
    // const id = ctx.params.id
    // await handle(ctx.req, ctx.res, {
    //   pathname: '/a',
    //   query: { id },
    // })
    // ctx.respond = false
    const user = ctx.session.userInfo; // 先判断userInfo是否存在
    if (!user) {
      ctx.status = 401
      ctx.body = 'Need Login'
    } else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')  /* 返回的数据是json格式的 */
    }
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', index, {httpOnly: false})
    // index += 1

    // ctx.cookies.set('id', 'userid:xxxxx')
    
    ctx.req.session = ctx.session; // 在nextjs渲染之前，将ctx.req.session赋一个值
    await handle(ctx.req, ctx.res) /* handle参数中：req和res是ctx全局挂载nodejs的request,response实例 */
    ctx.respond = false
  })

  server.use(async (ctx, next) => { /* next： 执行下一个中间件 */
    ctx.res.statusCode = 200
    await next()
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })

})
