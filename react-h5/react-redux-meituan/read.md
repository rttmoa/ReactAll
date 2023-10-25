# 美团Webapp

## 美团app主要功能：

    一、购物车商品的加减

    二、渲染页面样式结构

    三、跳转到 (分类+详情+评价) 页面

    四、分类筛选功能，滚动加载，组件封装，状态管理

    五、Webpack配置

## 前端

**Skill：** `class + redux`

**mock_data：/assets/json/food.json**

**webpack配置**

## 后端

**server mock： 获取美团app接口   `'Referer': 'http://i.waimai.meituan.com',`**

## Issue:

###### *waimai_webapp启动build之后，项目打包过后的文件会自动复制到waimaiServer的public文件下*

###### 在waimaiServer中npm start 启动项目，访问 http://localhost:3000/ 即可 访问到前端打包后的代码~

###### **只启动 waimai_webapp 即可  &&  运行 npm run dev**

###### **于Server端只访问静态文件**
