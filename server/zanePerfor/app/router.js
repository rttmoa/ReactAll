'use strict';

module.exports = app => {
    require('./router/home')(app); // ? 首页；应用列表、用户登陆、系统列表、用户管理、系统重启错误信息、邮件管理
    require('./router/api')(app); // ? 功能；用户相关、github登陆、微博登陆、微信登陆、系统配置相关、清空数据、系统错误信息、邮件管理
    require('./router/web/web')(app); // ? 浏览器
    require('./router/web/api')(app);
    require('./router/wx/web')(app); // ? 微信小程序
    require('./router/wx/api')(app);
};
