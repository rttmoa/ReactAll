/* eslint-disable strict */
module.exports = options => {

  return async (ctx, next) => {
    console.log(23);
    const user = await ctx.service.user.getUser(ctx.username);
    // console.log(user);

    if (!user) {
      ctx.body = {
        status: 500,
        errMsg: '用户不存在',
      };
      return;
    }
    await next();
  };
};
