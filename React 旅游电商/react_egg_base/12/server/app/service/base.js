const Service = require('egg').Service;

class BseService extends Service {
  run(callback) {
    const { ctx, app } = this;
    try {
      if(callback)
        return callback(ctx, app);
    } catch (error) {
      console.log('报错了',error);
      return null;
    }
  }
}

module.exports = BseService;