# 大众点评-H5

## 前端技术

##### Skill:   `class + redux + 可查看package`

## 后端技术

##### Skill:  `mock + koa`

## Issue:

###### **安装：**`npm install`  **启动：**`npm run mock & npm start`

**[大众点评Webapp](https://coding.imooc.com/class/chapter/313.html#Anchor](https://coding.imooc.com/class/chapter/313.html#Anchor))**

**/docs下开发文档**

**webpack配置**

**改动程序需多次重启服务** 


* [X] 端口：本地(8080)，Mock(3000)
* [X] Webpack配置(开发与生产环境)
* [X] Class组件开发
* [X] 路由跳转 及 请求参数
* [X] 全局Less、IconFont图标(eot,svg,ttf,woff)的配置：[icomoon](https://icomoon.io/app/#/select)
* [X] 轮播图 | 超值特惠 | 猜你喜欢 本地图片渲染 &  远程地址(error)
* [X] import * as Name from ""

  ```
  import * as userInfoActionsFromOtherFile from'../actions/userinfo'
  asuserInfoActionsFromOtherFilefrom： {__esModule: true, update: ƒ, User: ƒ}
  导出所有as名称 可以使用所有属性方法
  ```
* [X] Redux使用

  ```
  export default connect( mapStateToProps, mapDispatchToProps )(Home)
  ```
* [X] Login页面登陆后、刷新页面、Redux数据消失 --> 解决办法  1、使用localstoreage  2、redux持久化(persist)
* [X] Login页面父子组件传值
* [X] User页面组件封装(订单评价)
* [X] User页面订单列表接口 & 提交评论接口
* [X] City页面

  ```
  Redux取值、Redux储存、localstoreage存储、history跳转
  ```
* [X] Search页面

  ```
  window.history.back()
  hashHistory.push('/search/all/' + encodeURIComponent(value))
  /api/search/0/北京/all/UserName长
  根据城市名+文章+关键词发请求
  滚动加载 获取数据 重新渲染
  处理重新搜索：componentDidUpdate(prevProps, prevState) {
  	if (keyword === prevProps.keyword && category === prevProps.category) { return } 
  }
  节流函数、滚动加载 <LoadMore />组件   |  window.addEventListener('scroll', function () {}
  ```
* [X] Detail页面

  ```
  购买拦截：hashHistory.push('/Login/' + encodeURIComponent('/detail/' + id))
  	 <Route path='/Login(/:router)' component={Login}/>
  获取首页数据:    /api/detail/comment/1/5889520870693865
  ```
* [ ] Home页面
