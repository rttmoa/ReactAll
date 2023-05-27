# 本项目已合并到 [华炎魔方](https://github.com/steedos/steedos-platform/)

# Steedos Accounts

Fullstack authentication and accounts-management for steedos.

## Start Project

后台： `yarn server || yarn start`
前台： `cd /webapp && yarn start`

## [华炎云](https://us.steedos.com/) 跳转

## Start Server at 4000   服务端

```bash
yarn
yarn start
```

Server apis runs on https://127.0.0.1:4000/accounts/

## Webapp at 3000         客户端

```bash
cd webapp
yarn
yarn start
```

Navigate to https://127.0.0.1:3000/ to view react webapp.

## Build Webapp to 4000    服务端运行客户端Build文件

```bash
cd webapp
yarn
yarn build
```

Build webapp to /webapps/build folder, will mount to https://127.0.0.1:4000/accounts/a/

Navigate to https://127.0.0.1:4000/ , will redirect to build webapp at https://127.0.0.1:4000/accounts/a/

## 密码策略

默认密码格式要求为：密码必须包含字符、数字和字母，并至少有一个大写字母，且不能少于8位
可通过steedos-config.ym配置文件进行重写：

```
public:
  accounts:
    password:
      policy:
        reg: ^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$
        regErrorMessage: 密码必须包含字母和数字，且不能少于8位
```
