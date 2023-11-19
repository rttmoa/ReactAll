## 探花交友后台API启动

### 技术需求

> * 本地接口文档；[http://localhost:9089/swagger.html](http://localhost:9089/swagger.html)
> * 服务端使用；Koa + MySQL
> * Koa 全局处理；app.js
> * 数据库关系；tanhua.sql
> * **数据库表设计 Visio**
> * Koa 封装 MySQL - koa-mysql.js

### 功能需求分析

> * 交友 friend
> * 消息 message
> * 我的 my
> * 圈子 qz
> * 用户 user

##### 交友 friend

> 1. 最近来访  （访客信息）
> 1. 今日佳人  （找到缘分值最大的用户）
