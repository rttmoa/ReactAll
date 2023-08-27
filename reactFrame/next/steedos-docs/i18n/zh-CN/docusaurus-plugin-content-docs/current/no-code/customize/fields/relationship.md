---
sidebar_position: 5
---
# 对象关联关系类型字段

在设置对象和对象关系之间的字段可以使用相关表关系和主表/子表关系字段。

## 相关表关系字段

当我们需要描述两个对象之间的关联关系时，可以在其中一个对象中创建一个“相关表”字段来关联两个对象。比如每个“报价”记录都应该有对应的“所属客户”与之关联，此时我们可以在“报价”对象上创建一个“报价客户”字段跟“客户”对象关联起来。

 ![](https://console.steedos.cn/api/files/images/vzFBER4y7caPQGfy7)

### 引用对象

该相关表字段要关联到的另一个对象，这里设置了“客户”表示通过该相关表字段把“报价”与“客户”两个对象关联起来。

### 过滤器函数

默认情况下，用户在新建和编辑对象记录界面上填写相关表字段值时会列出相关表的所有记录供选择，可以在这里配置可选项范围，比如输入以下内容作为过滤器函数值可让用户在新建和编辑 “报价” 记录界面上填写“报价客户”字段值时只列出有效客户供选择。

```javascript
function(filters, values){
  return [["state","=","active"]];
}
```

关于该函数返回值，目前推荐使用数组语法。

### 选择项函数

与上述过滤器函数类似，你可以在这里描述用户在填写相关表字段值列出哪些选项供选择，比如输入以下内容作为选择项函数值可以实现上述过滤器函数中内容同样的效果。

```javascript
function(values){
  var result = [];
  var queryFilters = [["state", "=", "active"]];
  var steedosFilters = require("@steedos/filters");
  var odataFilter = steedosFilters.formatFiltersToODataQuery(queryFilters);
  var options = {
    $select: 'name'
  };
  options.$filter = odataFilter;
  var accounts = Creator.odata.query('accounts', options, true);
  accounts.forEach(function (item) {
    result.push({
      label: item.name,
      value: item._id
    });
  });
  return result;
}
```

### 多选

如果对象使用的是华炎魔方默认数据源，即使用的是mongodb数据库，那么可以勾选该属性来允许用户选择多个关联值，比如用户可以在新建或编辑某个“报价”记录界面上，选择多个“报价客户”来关联到该“报价”记录。


相关表字段展示选择项时有两种模式：一种是普通下拉选择框模式；另一种是弹出窗口查找模式，该模式需要在对象设置界面将该对象的“启用弹出窗口查找模式”功能开启。以下是两种模式的示例图：

 ![下拉选择框](https://console.steedos.cn/api/files/images/C2Zkb6F5dF7GcaFWG)

 ![弹出窗口查找](https://console.steedos.cn/api/files/images/Yx4AccjxkYsaR37Fa)

<alert type="info">
该字段类型的字段也被称为外键字段，其值保存的是关联对象记录的主键字段值而不是名称字段值。
</alert>

## 主表/子表关系字段

在相关表字段的基础上，我们可以通过创建一个“主表/子表”字段来描述两个对象间的主从关系，需要注意的是应该把“主表/子表”字段添加到“子表”对象侧，来表示“子表”对象是通过这个字段来关联其“主表”的，而不是把“主表/子表”字段添加到“主表”对象侧。比如 “报价行条目” 都应该有对应的 “报价” 与之关联，此时我们可以在 ”报价行条目“ 对象上建立一个 “报价名称” 字段，类型为主表/子表跟 “报价” 对象关联起来。

**区别**：设置为主表/子表类型的字段可以在主表的“相关子表”里设置关联子表显示的列。

 ![](https://console.steedos.cn/api/files/images/oE5HkKqvj4DkTejzh)

设置该对象相关子表：

 ![](https://console.steedos.cn/api/files/images/797diCyoLRFTF5oqq)

### 引用对象

该相关表字段要关联到的另一个对象，这里设置了“客户”表示通过该相关表字段把“报价”与“客户”两个对象关联起来。

### 过滤器函数

默认情况下，用户在新建和编辑对象记录界面上填写相关表字段值时会列出相关表的所有记录供选择，可以在这里配置可选项范围，比如输入以下内容作为过滤器函数值可让用户在新建和编辑 “报价” 记录界面上填写“报价客户”字段值时只列出有效客户供选择。

```javascript
function(filters, values){
  return [["state","=","active"]];
}
```

关于该函数返回值，目前推荐使用数组语法。
### 选择项函数

与上述过滤器函数类似，你可以在这里描述用户在填写相关表字段值列出哪些选项供选择，比如输入以下内容作为选择项函数值可以实现上述过滤器函数中内容同样的效果。

```javascript
function(values){
  var result = [];
  var queryFilters = [["state", "=", "active"]];
  var steedosFilters = require("@steedos/filters");
  var odataFilter = steedosFilters.formatFiltersToODataQuery(queryFilters);
  var options = {
    $select: 'name'
  };
  options.$filter = odataFilter;
  var accounts = Creator.odata.query('accounts', options, true);
  accounts.forEach(function (item) {
    result.push({
      label: item.name,
      value: item._id
    });
  });
  return result;
}
```

<alert type="info">
该字段类型的字段也被称为外键字段，其值保存的是关联对象记录的主键字段值而不是名称字段值。
</alert>
