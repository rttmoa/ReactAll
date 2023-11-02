'use strict';
const { URL } = require('url');


// ! 校验用户是否登录中间件
// const tokenRequired = middleware.tokenRequired(); // 结果；[AsyncFunction (anonymous)]


// 校验用户是否登录
module.exports = () => {
    // ! 拦截 过程
    // 1、获取请求头 address
    // 2、校验请求头 与 config 对比 是否有误
    // 3、获取 ctx cookie 是否登陆
    // 4、通过 数据库 token 查询用户，token 是否存在
    // 5、如果正常执行  await next()
    return async function(ctx, next) {
        // console.log('===================== middleware tokenRequired ========================');
        const referer = ctx.request.header.referer || ''; // referer; 'http://127.0.0.1:7001/
        const url = new URL(referer); // url;  new 后增加了 对象属性； { href, origin, protocol, host, port }
        // console.log(new URL(referer));
        // console.log('http'.indexOf('x'), 'http'.indexOf('t'), 'http'.indexOf('p'), 'http'.indexOf('http')); // -1 1 3 0 没查到返回 -1、查找返回索引值
        if (ctx.app.config.origin && ctx.app.config.origin.indexOf(url.origin) === -1) {
            ctx.body = {
                code: 1004,
                desc: '域名来源有误,请检查config的origin配置',
            };
            return;
        }
        const usertoken = ctx.cookies.get('usertoken', { encrypt: true, signed: true }) || '';
        if (!usertoken) {
            ctx.body = {
                code: 1004,
                desc: '用户未登录,请重新登录',
            };
            return;
        }
        const data = await ctx.service.user.finUserForToken(usertoken);
        if (!data || !data.user_name) {
            ctx.cookies.set('usertoken', '');
            const descr = data && !data.user_name ? data.desc : '登录用户无效,请重新登录！';
            ctx.body = {
                code: 1004,
                desc: descr,
            };
            return;
        }
        await next();
    };
};
