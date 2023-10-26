/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // !开启前置代理模式
  // 注意，开启此模式后，应用就默认自己处于反向代理之后，会支持通过解析约定的请求头来获取用户真实的 IP，协议和域名。
  // config.proxy = true;
  // 开启 proxy 配置后，应用会解析 X-Forwarded-For 请求头来获取客户端的真实 IP。
  // config.ipHeaders = 'X-Real-Ip, X-Forwarded-For';
  // config.maxIpsCount
  // config.maxIpsCount = 1;
  // 开启 proxy 配置后，应用会解析 X-Forwarded-Proto 请求头来获取客户端的真实访问协议。
  // config.protocolHeaders = 'X-Real-Proto, X-Forwarded-Proto';
  // 开启 proxy 配置后，应用仍然还是直接读取 host 来获取请求的域名，绝大部分反向代理并不会修改这个值。但是也许有些反向代理会通过 X-Forwarded-Host 来传递客户端的真实访问域名，可以通过在 config.hostHeaders 中配置，这个配置项支持配置多个头（逗号分开）。
  // config.hostHeaders = 'X-Forwarded-Host';

  // 用于cookie签名密钥，应更改为您自己的并保持安全
  config.keys = appInfo.name + '_1606747991901_2392';

  // config.view = {} // 模板配置

  // add your middleware config here
  config.middleware = [];

  config.jwt = {
    secret: 'Nick',
  };
  // egg 提供两种文件接收模式，1 是 file 直接读取，2 是 stream 流的方式
  config.multipart = {
    // multipart 配置项有很多选项，文档中有配置说明Eggjs
    mode: 'file',
    fileSize: '50kb',
  };

  config.security = { // 比如你 Egg 启动的是本地地址 http://127.0.0.1:7001 ，但是你请求的 POST 或 GET 接口是非本地计算机（别人的电脑），或者使用 Postman 发起请求，都会触发安防策略
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };
  config.cors = {
    // origin:'*', //允许所有跨域访问，注释掉则允许上面 白名单 访问
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload',
  };

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'jue-cost',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7009,
      hostname: '0.0.0.0',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
