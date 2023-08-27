---
title: Build Your Own Steedos Application
sidebar_position: 2
---

An app is a collection of items that work together to serve a particular function. 

The platform includes innovative point-and-click app-building tools that give you the power to customize Salesforce to meet the needs of your business. You can also build your own apps to share and store information that is important to you. You don’t need any programming knowledge to use these tools.

Steedos apps are a collection of standard and custom tabs, including:

- Most standard objects, including Home, the main Tasks, Calendar, and People
- Your org’s custom objects
- Micro page tabs
- Web tabs

Steedos provides standard apps such as Sales and Projects.

When you choose an app, your screen changes to reflect the contents of that app. For example, if you switch from an app that contains Projects to another app that doesn’t, the Projects item disappears. In addition, the app might display a different default landing tab when selected.

Apps are associated with profiles. Profiles control which tabs you can see or hide, as well as which apps are available to you.

<!-- 
应用程序包含您对自定义应用程序预期的一切内容，例如自定义和标准对象，以及自定义选项卡。

## 创建自定义应用

建立好合同、付款等对象后，我们可以建立自定义应用：合同。

### 新建应用

管理员，进入 设置》应用程序》应用程序，点击新建按钮

 ![新建应用程序](https://console.steedos.cn/api/files/images/pLbYpE4EiFdJ4mpSP)

输入应用程序的名称、API名称等，选择好桌面主菜单、手机主菜单，点击保存按钮。

 ![](https://console.steedos.cn/api/files/images/3gQZyGj6z97KiJ5F2)

### 访问应用

点击左上角的“应用程序启动器”图标，可以点击进入合同应用。

 ![](https://console.steedos.cn/api/files/images/RnnzvrFFBiDPQ7cTc)

里面已经有之前在预览时录入的数据。

 ![](https://console.steedos.cn/api/files/images/W8BCSZWifA255kjMg)

查看合同详情页，不但显示合同的详情，也会将作为子表的付款记录列表显示。

 ![](https://console.steedos.cn/api/files/images/MeeMHihvzbdMzTkPW)

经过上述的配置，我们就建立起了合同管理系统的框架。具备了合同应用的基本功能，比如管理合同，建立和跟踪合同的付款记录等。


## 链接外部应用

在华炎魔方中可以配置应用程序时可以配置外接应用与把第三方应用集成到华炎魔方中。

点击顶部左上角九宫格图标弹出的“应用程序启动器”会列出当前系统启用的所有应用程序，可以在“设置”应用的“应用程序→应用程序”界面维护这些应用程序，要集成第三方外接应用，请在这里新建一个应用，并在“外接应用”栏输入相关属性：

* 外部链接：请输入外接应用的访问地址，如果想通过链接脚本来打开外接应用，可以不填写该项。
* 使用iframe打开：是否在华炎魔方内嵌iframe打开外接应用。
* 在新窗口打开：是否使用新窗口来打开外接应用。
* 链接脚本：这里可以输入希望在顶部左上角九宫格图标弹出的“应用程序启动器”中点击该外接应用时要触发执行的`javascript`脚本，一般来说外接应用需要单点登录时可以在这里编写脚本来实现。

链接脚本最终会在一个不带参数的闭包函数中执行`(function(){" + 链接脚本+ "})()`，并且可以在链接脚本中通过变量`app`来引用当前点击的应用，比如`app.url`会输出我们为当前应用配置的外部链接地址，还可以在链接脚本中通过变量`event`来引用点击该外部链接时的事件参数，比如

在链接脚本中可以增加代码`event.preventDefault();`来阻止点击外接链接A标签时的浏览器默认行为。

如果勾选了“使用iframe打开”的话，链接脚本中还可以通过变量`iframe`来引用用于打开外部应用的iframe，比如我们可以加入脚本`iframe.attr("src", url)`来让iframe打开一个带有动态参数的url地址。

以下示例脚本演示了如何调用外接应用的登录接口来实现单点登录，并在登录成功后使用iframe来打开外接应用的逻辑。

```javascript
var loginUrl = "https://mail.xxx.com/user/?q=login.do";
var openUrl = "https://mail.xxx.com";
event.preventDefault();
var loginSucFun = function(){
    iframe.attr("src", openUrl);
}
$.ajax({
    type: "POST",
    url: loginUrl,
    data: {
      ...
    },
    success: function(result) {
        loginSucFun();
    },
    error: function() {
        toastr.error("xxx系统登录验证失败，可能链接脚本或域账户设置不正确！");
    }
});
``` -->