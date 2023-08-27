---
title: 快速向导
sidebar_position: 0
---

华炎魔方低代码PaaS平台是一款基于 Salesforce Platform 的开源替代方案，旨在为企业提供高效、灵活、易于使用的低代码开发平台。

- 开源免费：华炎魔方是一款开源免费的产品，可以帮助企业节省开发成本。
- 低代码开发：华炎魔方提供了一系列易于使用的低代码开发工具，使企业可以快速构建自己的应用程序，无需编写复杂的代码。
- 高效快捷：华炎魔方提供了一系列易于使用的工具，可以帮助企业快速构建自己的应用程序，提高开发效率。
- 灵活可定制：华炎魔方提供了灵活的扩展功能，可以帮助企业根据自己的需求进行定制化开发。
- 可扩展性：华炎魔方提供了灵活的扩展功能，可以帮助企业根据自己的需求进行定制化开发。
- 安全可靠：华炎魔方内置了企业级的数据安全模型，保障企业数据的安全可靠。

## 点击鼠标，就能编程

华炎魔方可以支持多种企业应用场景，包括但不限于CRM、ERP、OA、BI、IoT、大数据等。无论是传统企业还是新兴企业，都可以使用华炎魔方快速构建自己的应用程序和流程。

- **管理业务数据**：华炎魔方提供了强大的数据管理功能，包括数据建模、数据存储、数据分析等，可以帮助企业轻松管理和分析大量的数据。
  - [x] 对象 [文档](./no-code/customize/object) 
  - [x] 字段 [文档](./no-code/customize/fields/) 
  - [x] 验证规则 [文档](./no-code/customize/validation-rules) 
- **可视化构建应用**：使用简单易懂的拖放式界面，用户可以快速创建自定义的企业级应用程序。
  - [x] 应用 [文档](./no-code/application/app)
  - [x] 选项卡 [文档](./no-code/application/tab)
  - [x] 微页面 [文档](./no-code/amis/) 
  - [x] 列表视图 [文档](./no-code/customize/listview/)
  - [x] 页面布局 [文档](./no-code/customize/page-layout)
- **流程自动化**：内置可视化的流程开发引擎，可以帮助用户快速实现业务流程自动化。
  - [x] 自动化操作 [文档](./automation/automated-actions)
  - [x] 工作流规则 [文档](./automation/workflow-rules)
  - [x] 批准过程 [文档](./automation/approval-process)
  - [x] 审批王 [文档](./automation/approval-king/)


## 管理数据访问权限

华炎魔方提供灵活的多维度数据权限架构，这允许管理员控制用户对数据的访问权限。

![Steedos Permissions](/diagrams/Steedos-Permissions.drawio.svg)

通过仅显示与用户相关的数据，管理数据访问权限会增强安全性。使用权限集、权限集组和简档，控制用户可以访问的对象和字段。使用组织范围的共享设置、用户角色和共享规则，以指定用户可以查看并编辑的单个记录。

  - [x] 对象权限 [文档](./admin/permissions/object-permissions)
  - [x] 字段权限 [文档](./admin/permissions/field-permissions)
  - [x] 应用权限 [文档](./admin/permissions/app-permissions)
  - [x] 分部级权限 [文档](./admin/permissions/division)
  - [x] 共享规则 [文档](./admin/permissions/sharing-rules)
  - [x] 限制规则 [文档](./admin/permissions/restriction-rules)
  - [x] 简档 [文档](./admin/permissions/profile)
  - [x] 权限集 [文档](./admin/permissions/permission-set)

## 使用代码扩展Steedos

使用 Steedos DX，您可以将元数据导入到 Steedos 中，在可视化界面中进行修改，并将其同步回项目源代码。Steedos DX 引入了一种新的方式来组织您的元数据和分发您的应用程序。

![Steedos Overview](/img/platform/steedos-dx.png)

您可以用Git工具管理您的所有内容 - 您的代码、配置和元数据，并从人工智能技术（如 Github Copilot）中受益。

  - [x] create-steedos-app [文档](./developer/create-steedos-app)
  - [x] 软件包 [文档](./developer/package)
  - [x] 元数据同步为代码 [文档](./developer/sync-metadata)
  - [x] API [文档](./api/rest-api/)
  - [x] 触发器 [文档](./developer/action-trigger)
  - [x] 自定义API [文档](./developer/action-api)
   
## 与第三方低代码工具无缝集成

作为低代码生态的一员，华炎魔方通过插件的方式，实现与多个行业领先的第三方低代码工具无缝集成，扩展华炎魔方的产品能力。

  - [x] [Node-RED](https://github.com/node-red/node-red) 集成 [文档](./plugins/node-red)
  - [ ] [metabase](https://github.com/metabase/metabase) 数据分析引擎
  - [ ] [ToolJet](https://github.com/ToolJet/ToolJet/) 集成
  - [ ] [n8n](https://github.com/n8n-io/n8n) 集成
