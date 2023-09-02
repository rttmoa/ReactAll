/* eslint-disable strict */
/* eslint-disable no-unused-vars */


module.exports = app => {
  console.dir('(----------------------------------------------------------------------------------------------------------------------------------------------------                                                               app.js                                                                                    -----------------------------------------------------------------------------------------------------------------------------------------------------)');
  // app.ctx.username = 'zs';
  const store = {};
  app.sessionStore = {
    async get(key) {
      console.log('--store--', store);
      return store[key];
    },
    async set(key, value, maxAge) {
      store[key] = value;
    },
    async destroy(key) {
      store[key] = null;
    },
  };

  const mids = app.config.coreMiddleware;
  app.config.coreMiddleware = [ ...mids, ...[
    'interfaceLimit',
    'allowHosts',
    'notFound',
    'auth',
    'interfaceCache',
  ] ];

  // 中间件：
  // console.log('中间件', app.config.coreMiddleware);
  // 中间件 [
  //   'meta',           'siteFile',
  //   'notfound',       'static',
  //   'bodyParser',     'overrideMethod',
  //   'session',        'securities',
  //   'i18n',           'eggLoaderTrace',
  //   'interfaceLimit', 'allowHosts',
  //   'notFound',       'auth',
  //   'interfaceCache'
  // ]

  // app：
  // console.log(app);
  // {
  //   env: 'local',
  //   name: 'lession',
  //   baseDir: 'E:\\Project\\ReactAll\\react\\react-umi-egg-travel\\server',
  //   subdomainOffset: 2,
  //   config: '<egg config>',
  //   httpclient: '<egg httpclient>',
  //   loggers: '<egg loggers>',
  //   router: '<egg router>'
  // }

  // 配置项：
  // console.log(app.config);
};
