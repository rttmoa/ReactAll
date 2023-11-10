
import { Request, Response } from 'koa'

export default function (app: any) {

  var domains: any = {
    local: 'http://localhost:3000',
    loc127: 'http://127.0.0.1',
    dist: "http://157.122.54.189:9090",
    dist1: "http://192.168.50.2:9091",
    dist2: "http://172.16.2.23:9091",
    dist3: "http://103.44.145.245",
    dist99: "http://localhost:9089",
  };
  
  // 截获所有请求处理跨域
  app.use(async (ctx: { request: Request; response: Response; }, next: () => any) => {

    let req: Request = ctx.request;
    let res: Response = ctx.response;
    // console.log(req.URL)

    var currentdomain = "http://localhost";
    for (let key in domains) {
      if (!req.header.host) {
        break;
      }
      if (domains[key].indexOf(req.header.host) > -1) {
        currentdomain = domains[key];
        // global.domain = domains[key]; 
        // config.global = domains[key]
        // console.log(currentdomain);
        break;
      }
    }

    res.set("Access-Control-Allow-Origin", currentdomain);//设置管理后台服务器路径http://127.0.0.1:5008
    res.set("Access-Control-Allow-Headers", "X-Requested-With, accept,OPTIONS, content-type");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.set("Access-Control-Allow-Methods", "*");
    // 需要让ajax请求携带cookie ,此处设置为true，那么Access-Control-Allow-Origin 
    // 不能设置为*，所以设置为请求者所在的域名
    res.set("Access-Control-Allow-Credentials", "true");

    //  如果当前请求时OPTIONS 则不进去真正的业务逻辑方法，防止执行多次而产生 
    if (req.method != "OPTIONS") {
      res.set('Content-Type', 'application/json;charset=utf-8');
      await next();
    } else {
      // res.end = ""
    }
  })
}