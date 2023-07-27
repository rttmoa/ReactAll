/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
module.exports = app => {
  app.once('server', server => {
    // websocket

    console.dir('(====================服务已开启=============================)');
    console.dir('server ==> ', server);
    // app.log('123-----');
    // console.log(app.bar);
  });
  app.on('error', err => {
    // report error
    console.log('error ==> ', err);
  });
  app.on('request', ctx => {
    // log receive request
    console.log('request ==> ', ctx);

  });
  app.on('response', ctx => {
    console.log('response ==> ', ctx);
  });
};
