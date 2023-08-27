---
title: Custom Objects
sidebar_position: 1
---

Create, customize, edit, delete, or truncate custom objects to extend the functionality that standard objects, like accounts and contacts, provide.

Your object management settings list the custom objects that are defined for your organization. From this list, you can:

- Define a custom object.
- Display detailed information about a custom object. Optional features you can customize include enabling search and reports, tracking activities, tracking field history.
- To update the custom object definition, click Edit and update the desired fields.

## Fields Required for Creating Custom Objects

When you create a custom object, several fields are required to define how you can access the object.

FIELD | DESCRIPTION
-- | --
Label | This name is used to refer to the object in a user interface page.
Object API Name | A unique name used to refer to the object when using the API. In managed packages, this name prevents naming conflicts with package installations. Use only alphanumeric characters and underscores. The name must begin with a letter and have no spaces. It can’t end with an underscore nor have two consecutive underscores.
Description | An optional description of the object. A meaningful description helps you remember the differences between objects when you’re viewing them in a list.
Allow Reports | Makes the data in the custom object records available for reporting purposes.To create reports on custom objects, choose the Other Reports report type category, unless the custom object has a relationship with a standard object. When the custom object has a master-detail relationship with a standard object or is a lookup object on a standard object, select the standard object for the report type category instead.You can still create and run reports without selecting Allow Reports; however, the custom report type isn’t visible.
Add Tasks | Allows users to associate tasks related to the custom object records.
Add Calendar Events | Allows users to associate scheduled calendar events related to the custom object records.
Enable Divisions | If your org has divisions enabled, select this option to enable the custom object for divisions. Divisions group records for simplified search results, list views, reports, and other areas within Salesforce. Salesforce adds a Division field to the custom object. If the custom object is the master in a master-detail relationship, custom objects on the detail side also get the Division field and inherit their division from the master record.
Track Field History | Enables your org to track changes to fields on the custom object records. For example, it tracks who changed the field value and when, what the value was before the edit, and what it was changed to. History data is available for reporting, so users can easily create audit trail reports when this feature is enabled.
Deployment Status | Indicates whether the custom object is visible to other users.
Allow Search | To allow your users to find a custom object’s records when they search, create a custom tab set to Default On or Default Off. Creating a custom tab enables the custom object's Allow Search setting. A custom object that's associated with a custom tab is searchable (by default), even if users don't add the tab for display.
Add Attachments... | Allows users to add attachments to custom object records. You can attach external documents to any object record in much the same way that you can add a PDF file or photo as an attachment to an email. 



<!-- 
对象对应的是数据库的表。我们也可以把对象当作是一个业务分类来理解，如“合同(contract)”这个业务分类，具体到“XXX产品服务合同”就是“合同(contract)”这个业务分类的一条数据。

## 创建自定义对象

管理员登录进入系统后点击右上角的“⚙”--“设置”进入设置界面，当我们需要创建自定义对象时点击“对象设置”->"对象”界面右上角的“新建”按钮。

 ![](https://console.steedos.cn/api/files/images/Tadsy6eNHKtnYGHRW)

* **数据源**：选择该对象所属数据源，该对象的数据将保存到指定数据源中，默认数据源使用的是mongodb数据库。
* **显示名**：界面上将显示该名称来表示该对象。
* **API名称**：字段唯一标识符，只能包含小写字母、数字，必须以字母开头，不能以下划线字符结尾或包含两个连续的下划线字符。
* **图标：** 为您的对象选择合适的图标。
* **开发状态**：此对象的开发状态，“开发中”的对象只有管理员才可以访问，当对象相关功能已经就绪时，您应该把它设置为“已部署”。
* **备注**：输入此对象的描述。
* **外部数据源**：引用第三方数据库的数据。
* **功能开关**：设置此对象上开放的功能，勾选表示开启相关功能。
* **脚本**：表单事件的脚本，例如：在“数据变化时”中添加脚本实现字段级联（联动）效果。

## 对象功能开关

* **允许搜索**：此对象可以通过全局检索查询。
* **允许上传附件**：此对象可以上传附件。
* **允许添加任务**：此对象中的业务数据，可以添加任务。
* **允许添加备注**：此对象中的业务数据，可以添加备忘。
* **允许添加事件**：此对象中的业务数据，可以添加任务。
* **允许共享记录**：启用此功能可以设置该对象对于其他对象的记录共享。
* **允许配置对象流程**：只有启用此功能的业务对象，才能显示在对象流程的配置菜单中。
* **允许查看申请单**：此对象中的业务数据，可以进行审批。
* **允许添加留言**：用户对数据可以添加留言。
* **记录字段历史**：启用此功能后系统会自动记录此字段的修改记录。
* **允许编辑单个字段**：只有启用此功能的业务对象，才能单个编辑字段数据。
* **启用树状结构显示记录**：当启用时，与此对象关联的查找字段将以树状结构的形式显示其选项。
* **启用弹出窗口查找模式**：当启用时，与此对象关联的查找字段将以弹出窗口的形式显示其选项。

## 设置对象字段

新建对象后，您需要进一步描述该对象有哪些属性，比如对于 “报价(offer)” 对象，您可能希望新建“报价编号(offer_id)“、”到期日期(offer_date)“、”报价名称(offer_name)“等字段。


### 自定义字段

新建的对象，默认只有几个内置字段，如“名称(name)”、“所有者(owner)”、“创建人(created_by)”、“修改人(modified_by)”。例如我们需要添加一个 ”报价名称” 字段，点击右上角的 “新建” 按钮弹出 “编辑 对象字段”窗口，填写必填项显示名称 ”报价名称“ 、字段名 “offer_name” 、字段类型 “文本”，点击提交即完成一个字段的创建。

 ![](https://console.steedos.cn/api/files/images/vj7CJWqxyWy2sGcMG)

* **所属对象**：该字段所属对象，默认为当前对象。
* **显示名称**：字段最终显示的名称，由用户自定义。
* **字段名**：用来保存到数据库的字段名称，名称只能包含小写字母，数字，必须以字母开头。不能以下划线结尾或包含两个连续的下划线符号。
* **字段类型**：根据需求设置该字段的类型。
* **默认值**：设定字段的默认值，可以是固定值。
* **字段分组**：在记录的显示页面和编辑页面，将字段分组显示。
* **外部数据源**：引用第三方数据库的数据。
* **高级**：字段功能设置，比如该字段设置为必填。

### 默认值

配置字段默认值目前分为可编辑字段、只读或隐藏字段两种情况。

#### 可编辑字段

这种情况下字段默认值是在前端赋值，字段的默认值可以在新建记录界面上显示出来，有以下两种方式编写字段默认值。

- 固定值：如果只是要给字段设置一个固定值作为默认值，直接输入希望设置的固定值即可，不需要用引号括起来。
- 公式：可以输入一段表单公式脚本来描述希望设置的动态默认值。

#### 非可编辑字段

字段不可编辑，包括以下几种情况：

- 只读字段：即当前用户有查看权限但是没有编辑权限的字段，包括系统内置的只读字段，除非通过配置字段权限改为可编辑字段。
- 隐藏字段：即当前用户没有查看权限的字段，包括系统内置的隐藏字段，除非通过配置字段权限改为可编辑字段。

只要字段不可编辑，那么该字段值就不是由前端界面传入，而是由后台接口自动生成，所以其字段默认值只能配置为后台字段公式表达式。

需要注意的是，后台字段公式配置一个固定值表达式时，需要用引号括起来，否则它将不是一个合法的字段公式表达式。

### 字段显示公式

可以在高级-字段显示公式为该字段增加显示条件，比如输入`{{formData.type__c === 'leader' ? true: false}}`，表示当字段type__c等于leader值时，才显示当前字段，否则隐藏该字段。

## 配置列表视图

列表视图是用来定义前台数据列表展示的数据，您可以自定义需要显示的字段，从不同的维度定义视图展示不一样的数据，设定筛选条件和排序规则等参数。例如“报价(offer)”对象，您可能希望有一个“我的报价”列表视图来展示“报价编号(offer_id)”、“报价名称(offer_name)”、“报价客户(offer_client)”、“状态(state)”等多个数据。用户在界面上可以很方便快捷的切换列表视图、添加筛选条件、查找数据、新建视图等等。[如何自定义列表视图](./listview)

## 配置按钮

每个对象内置了在一定条件下才会显示的基础按钮，例如: 新建、编辑按钮。您也可以给指定对象配置自定义操作按钮。从”设置 => 对象设置 => 对象“进入指定的对象设置详情页， 然后找到操作按钮子表，点击右上角新建按钮，输入显示名称、API名称等后点击提交即可。 -->
