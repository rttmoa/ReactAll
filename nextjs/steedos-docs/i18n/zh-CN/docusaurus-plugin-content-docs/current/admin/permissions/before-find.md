---
sidebar_position: 12
---
# 触发器管理权限

虽然在华炎魔方中使用上面介绍过的各种权限配置方法已经能轻松实现精确到字段和记录级的权限控制，但在千奇百怪的实际项目场景中还是会有些权限需求未能企及，所以华炎魔方权限引擎还结合了 beforeFind 触发器，允许通过编写代码的方式来解决各种个性化的更高级别的权限问题。

### 原理

华炎魔方中的对象触发器，按触发的先后时间次序有两种，一种是在操作执行前触发，一种是在操作执行后触发，并且前者是以`before`为前缀来命名，后者是以`after`为前缀来命名，比如`beforeUpdate`和`afterUpdate`分别会在执行数据修改前和数据修改成功后触发。

要通过触发器来实现权限控制，我们只要在相关对象上编写操作执行前的触发器，即编写以`before`为前缀命名的增、删、改、查触发器，在触发器函数中判断到当前登录用户没有权限时通过有意`throw Error`或返回`false`值的方式来中断执行相关操作就可以达到权限控制的目的了。

### 数据操作权限控制

我们可以在`beforeInsert/beforeUpdate/beforeDelete`触发器中根据当前用户的身份来决定是否拒绝执行相关操作，当需要拒绝时只要在触发器函数中有意`throw Error`或返回`false`值就可以中断执行相关操作。


<alert type="info">
在操作执行前的触发器函数中如果需要返回错误信息可以通过`throw Error`来中断执行数据操作，反之可以通过`return false`来静默中断执行数据操作。

</alert>

在触发器函数中可以通过表达式`this.doc`变量来获取要修改哪些字段值，我们可以移除该变量中的字段来拒绝保存当前用户没有权限保存的字段值，以下示例代码只允许管理员变更合同记录的`owner`字段值。

```javascript
module.exports = {
    listenTo: 'contracts',
    beforeInsert: async function () {
        const userId = this.userId;
        const spaceId = this.spaceId;
        if (userId && spaceId) {
            const userSession = await auth.getSessionByUserId(userId, spaceId);
            var isAdmin = userSession.is_space_admin;
            if(!isAdmin && this.doc.owner){
                throw new Error("只有系统管理员才能变更合同所有者！");
                //return false // 把throw error换成这行，将会新建失败，但是不提示错误信息。
                //delete this.doc.owner //把throw error换成这行，将会新建成功，但是新建后的记录owner值为空。
            }
        }
    },
    beforeUpdate: async function () {
        const userId = this.userId;
        const spaceId = this.spaceId;
        if (userId && spaceId) {
            const userSession = await auth.getSessionByUserId(userId, spaceId);
            var isAdmin = userSession.is_space_admin;
            if(!isAdmin && this.doc.owner){
                throw new Error("只有系统管理员才能变更合同所有者！");
                //return false // 把throw error换成这行，将会修改失败，但是不提示错误信息。
                //delete this.doc.owner //把throw error换成这行，将会修改成功，但是记录owner值不会被修改。
            }
        }
    }
}
```

### 数据查询权限控制

我们可以在`beforeFind`触发器中根据当前用户的身份来决定是否额外叠加特定的过滤条件来限制数据查看范围。

在`beforeFind`触发器函数中通过表达式`this.query.filters`变量可以获取原始的查询条件，然后可以变更该变量值来给原始查询条件额外叠加其他的过滤条件来收缩或放大用户的数据查看权限。


<alert type="info">
并不存在`beforeFindOne`触发器，执行`findOne`时与执行`find`时触发的是都`beforeFind`触发器。

</alert>

假设有一个文档集对象，要实现以下权限规则：

* 工作区管理员始终有所有文档集查看权限。
* 授权查看的组织（非分部）和用户可以查看相关文档集。
* 所有用户至少有查看owner等于自己的文档集的权限。

上述需求中需要把权限落实到具体的用户，所以无法通过分部级权限来实现该需求，我们可以给该对象添加两个额外的字段来保存相关权限配置：

* 授权组织：被授权的组织可以额外拥有查看该文档集的权限。
* 授权用户：被授权的用户可以额外拥有查看该文档集的权限。

然后编写以下代码为文档集`document_collections`对象添加`beforeFind`触发器逻辑实现相关权限控制需求。

```javascript
const Filters = require('@steedos/filters');
module.exports = {
    listenTo: 'document_collections',
    beforeFind: async function(){
        const query = this.query;
        const userId = this.userId;
        const spaceId = this.spaceId;
        if (userId && spaceId) {
            //获取原始的查询条件
            let filters = query.filters;
            //自定义生成用户权限查询条件
            let permissionsFilters;
            const userSession = await auth.getSessionByUserId(userId, spaceId);
            var isAdmin = userSession.is_space_admin;
            if (!isAdmin) {
                var organizations = userSession.organizations.map((org) => { return org._id });
                permissionsFilters = [
                    ["owner", "=", userId],
                    "or",
                    ["allow_read_organizations", "=", organizations],
                    "or",
                    ["allow_read_users", "=", userId]
                ];
            }
            if(permissionsFilters){
                //修改查询条件; formatFiltersToODataQuery函数将数组形式的filters转换为字符串filters
                query.filters = `(${filters}) and (${Filters.formatFiltersToODataQuery(permissionsFilters)})`;
            }
        }
    }
}
```

### 用户身份判断

在触发器中编写权限控制相关代码时，我们经常需要会判断当前登录用户是否有相关权限，而要判断权限首先需要获取的是当前登录用户的身份信息，在华炎魔方中通过可以编写以下代码来获取用户身份。

#### 系统管理员

可以通过以下代码来判断当前用户是否是系统管理员。

```javascript
const userSession = await auth.getSessionByUserId(userId, spaceId);
var isAdmin = userSession.is_space_admin;
if (!isAdmin) {
    //当前登录用户不是管理员
}
```

#### 所属组织

可以通过以下代码来获取当前用户所属组织，一般用于在过滤条件中按组织来过滤数据。

```javascript
const userSession = await auth.getSessionByUserId(userId, spaceId);
var organizations = userSession.organizations.map((org) => { return org._id });
```

#### userSession

还可以通过以下代码来获取当前登录用户的`userSession`来获取更多用户信息。

```javascript
const auth = require("@steedos/auth");
const userSession = await auth.getSessionByUserId(userId, spaceId);
```
