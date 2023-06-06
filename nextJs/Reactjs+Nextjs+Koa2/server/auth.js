const axios = require('axios')
const config = require('../config')
const { client_id, client_secret, request_token_url } = config.github



module.exports = server => {  // 接收 server

  server.use(async (ctx, next) => {
    // 如果 /auth 做处理
    // 此代码去Github上OAuth获取code，换取Token，最后获取到用户信息的过程
    if (ctx.path === '/auth') {
      const code = ctx.query.code
      if (!code) {
        ctx.body = 'code not exist'
        return
      }
      const result = await axios({
        method: 'POST',
        url: request_token_url,
        data: {
          client_id,
          client_secret,
          code,
        },
        headers: { Accept: 'application/json' },
      })

      console.log(result.status, result.data)

      if (result.status === 200 && (result.data && !result.data.error)) {
        ctx.session.githubAuth = result.data

        const { access_token, token_type } = result.data

        const userInfoResp = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: { Authorization: `${token_type} ${access_token}`},
        }) 
        // console.log(userInfoResp.data)
        ctx.session.userInfo = userInfoResp.data; // Github上的用户信息，去保存到session中  

        // 授权成功后跳转到退出的页面
        ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/')
        ctx.session.urlBeforeOAuth = ''

      } else {
        const errorMsg = result.data && result.data.error
        ctx.body = `request token failed ${errorMsg}`
      }
    } else {
      await next()
    }
  })

  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    if (path === '/logout' && method === 'POST') {  // 如果登出，清空session即可
      ctx.session = null
      ctx.body = `logout success`
    } else {
      await next()
    }
  })

  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    if (path === '/prepare-auth' && method === 'GET') {
      // ctx.session = null
      // ctx.body = `logout success`
      const { url } = ctx.query
      ctx.session.urlBeforeOAuth = url
      // ctx.body = 'ready'
      ctx.redirect(config.OAUTH_URL)
    } else {
      await next()
    }
  })
}
