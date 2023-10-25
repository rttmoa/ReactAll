const axios = require('axios')
const config = require('../config')
const { client_id, client_secret, request_token_url } = config.github



// todo 通过去 Github 上 OAuth 获取 code，换取 Token，最后获取到用户信息 将用户信息绑定到 ctx.session 上的过程
module.exports = server => {  // 接收 server
  
  server.use(async (ctx, next) => {
    
    // 如果 /auth 做处理
    if (ctx.path === '/auth') {
      const code = ctx.query.code;  
      if (!code) {
        // code: 0e4ed5464d3a39f14a2b
        // http://localhost:3000/auth?code=0e4ed5464d3a39f14a2b
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
      console.log('OAuthGetToken: ', result.status, result.data)
      // 200 
      // {
      //   access_token: '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',
      //   token_type: 'bearer',
      //   scope: 'user'
      // }

      if (result.status === 200 && (result.data && !result.data.error)) {

        ctx.session.githubAuth = result.data // todo： 获取 Token 绑定给 ctx 上

        const { access_token, token_type, scope } = result.data

        const userInfoResp = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: { Authorization: `${token_type} ${access_token}`},
        }) 
        // console.log(userInfoResp.data)
        ctx.session.userInfo = userInfoResp.data; // todo；通过 Token 获取用户信息； Github上的用户信息，去保存到session中  

        // 授权成功后跳转到退出的页面
        ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/')
        ctx.session.urlBeforeOAuth = "";

      } else {
        const errorMsg = result.data && result.data.error
        ctx.body = `request token failed ${errorMsg}`
      }
    } else {
      await next()
    }
  })

  server.use(async (ctx, next) => { 
    const { path, method } = ctx;
    if (path === '/logout' && method === 'POST') {  // 如果登出，清空 session 即可
      ctx.session = null
      ctx.body = `logout success`
    } else {
      await next()
    }
  })

  server.use(async (ctx, next) => { 
    const { path, method } = ctx; 
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
