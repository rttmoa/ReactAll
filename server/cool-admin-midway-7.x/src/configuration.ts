import * as orm from '@midwayjs/typeorm';
import { Configuration, App, Config, Inject } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as view from '@midwayjs/view-ejs';
import * as staticFile from '@midwayjs/static-file';
import * as localTask from '@midwayjs/task';
import { ILogger } from '@midwayjs/logger';
// import * as crossDomain from '@midwayjs/cross-domain';

// ? src/modules 模块内 隐藏功能
// TODO 可以查看包下的接口属性；包含什么功能
// TODO TS 声明文件类型
import * as cool from '@cool-midway/core'; // todo 核心部分结构
import * as cloud from '@cool-midway/cloud'; // ! CloudDb；数据库 | 云函数 | CURD
import * as file from '@cool-midway/file'; // ! 文件上传; 本地上传 | 云端上传
import * as sms from '@cool-midway/sms'; // ! 短信配置；阿里云 | 腾讯云 | 云片短信 | 发送验证码 | 发送短信 | 生成验证码

import * as rpc from '@cool-midway/rpc'; // ! 微服务；事件处理 | 事件 | 服务基类 | 微服务配置
import * as task from '@cool-midway/task'; // ! 队列基类; 任务队列
import * as pay from '@cool-midway/pay'; // ! 微信支付配置 | 支付宝支付配置 | 支付宝支付 | 微信支付
import * as iot from '@cool-midway/iot'; // ! MQTT服务 | MQTT 配置
import * as coolLibrary from '@cool-midway/cache-manager-fs-hash';

@Configuration({
  imports: [
    // ? 来自于 @midwayjs
    // https://koajs.com/
    koa,
    // 是否开启跨域(注：顺序不能乱放！！！) http://www.midwayjs.org/docs/extensions/cross_domain
    // crossDomain,
    // 模板渲染 https://midwayjs.org/docs/extensions/render
    view,
    // 静态文件托管 https://midwayjs.org/docs/extensions/static_file
    staticFile,
    // orm https://midwayjs.org/docs/extensions/orm
    orm,
    // 参数验证 https://midwayjs.org/docs/extensions/validate
    validate,
    // 本地任务 http://midwayjs.org/docs/legacy/task
    localTask,
    // ? 来自于 @cool-midway
    // cool-admin 官方组件 https://cool-js.com
    cool,
    // 文件上传 本地 阿里云存储 腾讯云存储 七牛云存储
    file,
    // rpc 微服务 远程调用
    // rpc,
    // 任务与队列
    // task,
    // cool-admin 云开发组件
    cloud,
    // 支付(微信、支付宝) https://cool-js.com/admin/node/core/pay.html
    // pay,
    // 物联网开发，如MQTT支持等
    // iot,
    // 短信
    sms,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  @Inject()
  logger: ILogger;

  @Config('module')
  config;

  async onReady() {}
}
