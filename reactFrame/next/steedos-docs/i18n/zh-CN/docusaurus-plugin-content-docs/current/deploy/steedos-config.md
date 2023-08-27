---
title: 参数配置
---

平台相关功能参数介绍。

## 基础参数

```bash
# Platform
PORT=5000
ROOT_URL=http://localhost:5000

# 微服务通讯 [https://moleculer.services/docs/0.14/networking.html](https://moleculer.services/zh/docs/0.14/networking.html)
TRANSPORTER=redis://127.0.0.1:6379

# 缓存 https://moleculer.services/zh/docs/0.14/caching.html
CACHER=redis://127.0.0.1:6379/1

# 数据库
MONGO_URL=mongodb://127.0.0.1:27017/steedos
MONGO_OPLOG_URL=mongodb://127.0.0.1:27017/local

```

## 登录界面

配置登录界面相关参数，例如是否允许注册、是否允许修改密码、是否允许创建企业。

```bash
STEEDOS_TENANT_ENABLE_REGISTER=true  # 允许创建账户，空库时默认true
STEEDOS_TENANT_ENABLE_FORGET_PASSWORD=true  # 允许密码密码，设置为true时将显示找回密码链接用于找回密码，默认false。
STEEDOS_TENANT_ENABLE_CREATE_TENANT=false  # 允许创建企业，默认只有空库时允许创建
STEEDOS_TENANT_ENABLE_PASSWORD_LOGIN=true # 允许使用密码登录，启用时，注册和登录都默认使用密码。默认true
STEEDOS_TENANT_ENABLE_BIND_EMAIL=false # 强制绑定邮箱，登录后必须输入和验证邮箱。默认false
STEEDOS_TENANT_ENABLE_BIND_MOBILE=false # 强制绑定手机号，登录后必须输入和验证手机号。默认false
STEEDOS_TENANT_ENABLE_EMAIL_CODE_LOGIN=false #允许使用邮箱验证码登录，启用时，注册和登录都默认使用验证码。
STEEDOS_TENANT_ENABLE_MOBILE_CODE_LOGIN=false # 允许使用手机验证码登录，启用时，注册和登录都默认使用验证码。
STEEDOS_TENANT_TOKEN_SECRET=  # 默认值 43位字符串, 每次重启服务时生成新的值
STEEDOS_TENANT_ACCESS_TOKEN_EXPIRES_IN= # 默认值 90d
STEEDOS_TENANT_REFRESH_TOKEN_EXPIRES_IN=  # 默认值 7d
```

# 开发环境元数据同步

```bash
METADATA_SERVER=http://localhost:5000
METADATA_APIKEY=
```

## 文件存储

配置附件存储的相关参数。

### 本地

```bash
STEEDOS_CFS_STORE=local
STEEDOS_STORAGE_DIR=/app/storage
```

### S3

附件可以保存在 S3 协议的服务器中，包括AW、阿里云、腾讯云的云存储服务，或是私有部署的 minio 服务

```bash
STEEDOS_CFS_STORE=S3
STEEDOS_CFS_AWS_S3_ENDPOINT=http://minio:9000
STEEDOS_CFS_AWS_S3_FORCE_PATH_STYLE=true
STEEDOS_CFS_AWS_S3_BUCKET=steedos-prod
STEEDOS_CFS_AWS_S3_ACCESS_KEY_ID=${MINIO_ROOT_USER:-steedos} 
STEEDOS_CFS_AWS_S3_SECRET_ACCESS_KEY=${MINIO_ROOT_PASSWORD:-steedos123}
```
### 免登录下载

默认系统中上传的头像、图片、附件需要登录之后才能下载。

配置以下变量可以设定免登录下载。

```bash
STEEDOS_CFS_DOWNLOAD_PUBLIC=avatars,images # 可选 avatars,images,files, 默认值为avatars
```

## 推送通知

配置手机端推送通知的相关参数，用于华炎魔方手机app接收通知消息。

```bash
# iPhone
STEEDOS_PUSH_APN_DATA=

# 安卓
STEEDOS_GCM_APIKEY=
STEEDOS_GCM_PROJECT_NUMBER=

# 华为
STEEDOS_PUSH_HUAWEI_APPID=
STEEDOS_PUSH_HUAWEI_APPPKGNAME=
STEEDOS_PUSH_HUAWEI_APPSECRET=

# 小米
STEEDOS_PUSH_MI_APPSECRET=
STEEDOS_PUSH_MI_PRODUCTION=
```

## 邮件配置

配置SMTP服务的相关参数，用于系统发送推送邮件。

```bash
STEEDOS_EMAIL_FROM=
STEEDOS_EMAIL_URL=
STEEDOS_EMAIL_HOST=
STEEDOS_EMAIL_PORT=
STEEDOS_EMAIL_USERNAME=
STEEDOS_EMAIL_PASSWORD=
STEEDOS_EMAIL_SECURE=
STEEDOS_EMAIL_SIGNNAME=
```

## OIDC 身份认证

企业版：配置 OpenID Connnect 单点登录的参数，可以连接 Keycloak 服务器。

```bash
# OpenID Connect
STEEDOS_IDENTITY_OIDC_ENABLED=true
STEEDOS_IDENTITY_OIDC_CONFIG_URL=https://id.steedos.cn/realms/master/.well-known/openid-configuration
STEEDOS_IDENTITY_OIDC_CLIENT_ID=steedos-oidc-public
STEEDOS_IDENTITY_OIDC_CLIENT_SECRET=none
STEEDOS_IDENTITY_OIDC_NAME=Steedos ID
STEEDOS_IDENTITY_OIDC_LOGO=
STEEDOS_IDENTITY_OIDC_REQUIRE_LOCAL_ACCOUNT=false
```

## 定时任务配置

配置定时任务的属性。

```bash
STEEDOS_CRON_BUILD_INDEX="0 0 * * * *"
STEEDOS_CRON_WORKFLOW_RULE='*/10 * * * * *'
STEEDOS_CRON_MAILQUEUE_INTERVAL=10000
STEEDOS_CRON_PUSH_INTERVAL=1000
STEEDOS_CRON_WEBHOOKQUEUE_INTERVAL=10000
STEEDOS_CRON_INSTANCERECORDQUEUE_INTERVAL=10000
STEEDOS_CRON_SMSQUEUE_INTERVAL=1000
STEEDOS_CRON_OBJECTWEBHOOKSQUEUE_INTERVAL=10000
```

* STEEDOS_CRON_BUILD_INDEX: 创建数据库索引的执行时间，如上面的“0 0 * * * *”意为每小时为数据库执行一次创建索引操作，已存在的索引不会重复创建。
* STEEDOS_CRON_WORKFLOW_RULE: 工作流规则队列的执行时间，基于时间的工作流操作依赖此配置，如上面的“*/10 * * * * *”意为每10秒执行。
* STEEDOS_CRON_MAILQUEUE_INTERVAL: 邮件队列的轮询间隔(单位毫秒)
* STEEDOS_CRON_PUSH_INTERVAL: 消息推送的轮询间隔(单位毫秒)
* STEEDOS_CRON_WEBHOOKQUEUE_INTERVAL: 流程触发器队列的轮询间隔(单位毫秒)
* STEEDOS_CRON_INSTANCERECORDQUEUE_INTERVAL: 对象流程队列的轮询间隔(单位毫秒)
* STEEDOS_CRON_SMSQUEUE_INTERVAL: 短信发送队列的轮询间隔(单位毫秒)
* STEEDOS_CRON_OBJECTWEBHOOKSQUEUE_INTERVAL: 对象触发器队列的轮询间隔(单位毫秒)

## Graphql配置

配置Graphql的属性。

```bash
STEEDOS_GRAPHQL_ENABLE_CONSOLE=true
```

* STEEDOS_GRAPHQL_ENABLE_CONSOLE: 控制Graphql编辑器是否显示，默认true，可配置false禁止显示，编辑器访问地址`{ROOT_URL}/graphql`。

<!-- 
## 账户相关

配置账户相关参数。

```yaml
accounts:
  mobile_phone_locales: ['zh-CN']
  mobile_regexp: '^[0-9]{11}$'
    is_username_skip_minrequiredlength: true
    UTF8_Names_Validation: '[A-Za-z0-9-_.\u00C0-\u017F\u4e00-\u9fa5]'
```

* mobile_phone_locales: 此参数优先。手机号本地化，配置为`zh-CN`表示使用中国的11位手机号，要支持其他国家手机号请参考 [validator](https://www.npmjs.com/package/validator)。
* mobile_regexp: 手机号格式正则表达式，使用一个正则表达式来描述正确的手机号格式。
* is_username_skip_minrequiredlength：是否跳过用户名最小位数限制，默认最小为6位。
* UTF8_Names_Validation: 用户名规则正则表达式。


## 密码规则配置

密码的复杂度是通过password.policy 属性来控制的，值为正则表达式。

```yaml
public:
  password:
    policy: ^[A-Za-z0-9]{8,}$
    policyError: "密码不能少于8位"
    policies:
      - policy: 123
        policyError: "密码必须包含123"
      - policy: 456
        policyError: "密码必须包含456"
    policyFunction: !
      function(password){
        if(password === '12345678'){
          throw new Error('密码不能是12345678');
        }
      }
```

- public.password.policyFunction: string Function. 自定义验证函数(1个参数: 用户输入的password), 可通过import等手段引入验证库. 或者直接编写验证规则. 不符合规则时, 直接throw error即可.
- public.password.policies: Array<{policy: '正则表达式', policyError: '不符合表达式时的提示消息'}>

配置了多个密码规则时会同时生效，上述示例中配置的规则是会同时生效的。 -->


## amis sdk

可以配置华炎魔方引用的amis sdk版本或者amis sdk源码编译后skd.js文件所在路径。

```bash
# Amis
STEEDOS_AMIS_VERSION=2.9.0
STEEDOS_AMIS_URL=https://8888-steedos-steedosamis-t274254lixx.ws-us101.gitpod.io/packages/amis
```

- STEEDOS_AMIS_VERSION：华炎魔方每个版本都会默认引用当前版本最适用的sdk版本，通常情况下不需要配置amis sdk版本。
- STEEDOS_AMIS_URL：当需要调式amis源码时，可以配置此变量引用指定路径下的sdk.js文件，不需要精确到sdk.js文件，只要配置为amis所在路径即可，系统会自动补全文件路径。

## 前端资产包

可以配置华炎魔方引用的前端组件库资产包地址。

```bash
# 资产包
STEEDOS_UNPKG_URL=https://unpkg.steedos.cn
STEEDOS_PUBLIC_PAGE_ASSETURLS=http://127.0.0.1:8080/@steedos-widgets/amis-object/dist/assets-dev.json
```

- STEEDOS_UNPKG_URL：配置所有前端资产包的域名地址，包括第三方npm包。
- STEEDOS_PUBLIC_PAGE_ASSETURLS：配置前端组件库资产包地址，多个资产包地址用逗号分隔。


## 流程触发器

```
STEEDOS_ENABLE_PROCESS_TRIGGER=true
```

- STEEDOS_ENABLE_PROCESS_TRIGGER: 控制流程触发器是否执行