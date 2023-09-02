/* eslint-disable strict */
module.exports = options => {
  // console.log('options', options)
  return async (ctx, next) => {
    const url = ctx.request.url;
    // console.log('url', url);
    // const user = ctx.session[ctx.username];

    // 从前端请求中解析出token
    const token = ctx.request.token;
    // console.log('egg-auth-token', token);
    // 根据username从redis中获取token
    const userToken = await ctx.app.redis.get(ctx.username);
    // console.log(userToken);
    const user = userToken ? userToken === token : userToken;
    // console.log('suer', user); // false

    // TODO: 先关闭掉
    // 用户不存在，并且请求的路径在排除项之内
    // if (!user && !options.exclude.includes(ctx.request.url.split('?')[0])) {
    //   ctx.body = {
    //     status: 1001,
    //     errMsg: '用户未登录',
    //   };
    // } else {
    //   await next();
    // }
    await next();
  };
};
