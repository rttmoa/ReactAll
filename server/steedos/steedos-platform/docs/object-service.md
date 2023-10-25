对象服务 Object Service 
===

低代码平台对象是核心，对象元数据在加载和运行阶段需要解决以下问题：
- 对象的元数据加载
- 对象的继承
- 对象的基本增删改查方法
- 事件发布与订阅
- 对象触发器
- 对象服务依赖
- 对象服务生命周期
- 对象服务热更新

华炎魔方使用 Moleculer Service 运行业务对象，实现以上功能。

## 元数据加载

在华炎魔方中，使用元数据定义对象，对象支持在不同的软件包中重复定义，实现扩展。系统在启动时会扫描系统中所有的软件包（Package Service），根据Package Service的依赖关系依次加载软件包，从而实现在新的软件包中扩展旧的对象。

## Base Object Service

在系统启动阶段，自动根据元数据生成对应的 Object Service，所有的 Object Service 均继承自 Base Object Service，在 Base Object Service 中实现基础的增删改查函数。Base Object Service 会根据 driver 的不同进一步调用 driver 层级的增删改查函数。

## Actions

Object Service 使用 Action 来定义方法，基本的方法包括增删改查，开发人员可以自定义Action。

Action 是异步函数，可以使用以下语法直接调用 

```
const res = await broker.call(actionName, params, opts);
```

Action 也可以通过 Moleculer API Gateway， 转换为 API，以 REST, GraphQL, gRPC 的形式访问。

Moleculer 解决了 Action 在不同节点间的调用的负载均衡问题，避免重复调用。

![action-balancing](https://moleculer.services/docs/0.14/assets/action-balancing.gif)

## Events

Action 在增删改查时，会自动 emit events，在服务中可以订阅 Events。

Moleculer 解决了 Events 在节点间的负载均衡问题，同一个微服务的多个节点，只会接收一次 Event。

![balanced-events](https://moleculer.services/docs/0.14/assets/balanced-events.gif)

Moleculer Events 是单向的，因此无法基于 Events 实现触发器。

## Triggers

Trigger 是一种特殊类型的 Action，在增删改查函数中自动调用，并可根据Trigger返回值，控制增删改查 Action 的中断。

## 对象服务的生命周期

基于 Moleculer Service，可以自定义以下对象生命周期函数

```
// users.object.service.js
module.exports = {
    name: "users",
    actions: {...},
    events: {...},
    methods: {...},

    created() {
        // Fired when the service instance created (with `broker.loadService` or `broker.createService`)
    },

    merged() {
        // Fired after the service schemas merged and before the service instance created
    },
    
    async started() {
        // Fired when broker starts this service (in `broker.start()`)
    }

    async stopped() {
        // Fired when broker stops this service (in `broker.stop()`)
    }
};
```

## 对象服务依赖

如果集群中，一个对象必须等待另一个对象加载完才能加载，可以使用以下命令：

```
broker.waitForServices("posts", "users").then(rsp -> {
    // Called after the "posts" and "users" services are available
});
```

## 对象的热更新

在可视化界面修改对象或是安装软件包，可能需要热更新（重新创建）内存中的对象服务。因此对象服务需要订阅自身元数据的修改事件，进行相关处理。
