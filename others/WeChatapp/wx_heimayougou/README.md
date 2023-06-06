# 黑马优购_微信小程序项目

#### 介绍

2021年5月6日-2021年5月12日在校参加微信小程序培训，由黑马讲师授课，能够利用微信提供的组件和API实现轮播图、授权用户信息、上拉加载更多等功能，由于之前对uniapp的学习打下了基础，在这次实训中能够轻松应对老师的任务，并担任技术组长，帮助大家解决代码问题。在本次实训中主要学习了之前没有接触过的购物车的逻辑。

#### 项目准备

工具：微信开发者工具、win10系统、注册ID

  下载地址：

​       https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

  官方文档：https://developers.weixin.qq.com/miniprogram/dev/framework/

#### 项目细节

##### 3.1 在app.json里面配置全局样式

###### 3.1.1 pages注册所有的页面

```javascript
   "pages":[
    "pages/index/index",
    "pages/category/index",
    "pages/cart/index",
    "pages/user/index",
    "pages/search/index",
    "pages/goods_list/index",
    "pages/goods_detail/index",
    "pages/logs/logs"
  ]
```

###### 3.1.2 windows设置全局的窗口表现

```javascript
 "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#f40",
    "navigationBarTitleText": "黑马优购",
    "navigationBarTextStyle":"white"
  },  
```

 

###### 3.1.3 tabBar定义底部tab栏

selectedColor:选中时的文字颜色

pagePath:页面路径

text:tabBar显示文字

iconPath：未选中时的图片

selectedIconPath:选中时的图标

```javascript
"tabBar": {
    "selectedColor": "#f40",
    "list": [
      {
        "pagePath":"pages/index/index",
        "text": "首页",
        "iconPath": "/icons/_tao.png",
        "selectedIconPath": "/icons/tao.png"
      },
      {
        "pagePath":"pages/category/index",
        "text": "分类",
        "iconPath": "/icons/_category.png",
        "selectedIconPath": "/icons/category.png"
      },
      {
        "pagePath":"pages/cart/index",
        "text": "购物车",
        "iconPath": "/icons/_cart.png",
        "selectedIconPath": "/icons/cart.png"
      },
      {
        "pagePath":"pages/user/index",
        "text": "我的",
        "iconPath": "/icons/_my.png",
        "selectedIconPath": "/icons/my.png"
      }
    ]
  },
```

##### 3.2 request请求封装

​    借助于feecbook的regeneratorRuntime工具，对wx.request请求API封装，便于发送请求。

备注：封装函数后，要在每一个使用这个方法的页面引入方法。

```javascript
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'
```

##### 3.3 注册组件

###### 3.3.1 SearchInput组件

###### 3.3.2 Tabs组件

备注：使用组件时要在使用页面的index.json文件中声明组件

  

```javascript
 "usingComponents": {
   "SearchInput":"../../components/SearchInput/SearchInput"
  }
```

##### 3.4 index首页

###### 3.4.1 轮播图

 轮播图使用到了<swiper></swiper>组件，<swiper>组件是微信封装好的轮播图，减轻了程序员编写的代码量。

<swiper-item></swiper-item>放置在<swiper>组件中，宽高自动设置为100%。每一个swiper-item代表轮播图的一张图片。

使用到的swiper组件属性：indicator-dots（显示面板指示点）、autoplay（是否自动播放）、circular（是否衔接滑动）

###### 3.4.2 请求图片

```javascript
const result = await request({ url: '/home/swiperdata' })
    console.log("swiperList",result.data.message);
    this.setData({
      swiperList : result.data.message
    })
```

请求过来的图片利用for循环渲染，通过插值表达式{{}}将数据渲染到页面。

navigator的url设置导航链接 open-type导航类型

```javascript
<!-- 分类 -->
<view class="classify">
  <navigator wx:for="{{menuList}}" wx:key="index" url="../../pages/category/index" open-type="switchTab" >
    <image mode="widthFix" src="{{item.image_src}}"></image>
  </navigator>
</view>
```

##### 3.5 category分类页面

###### 3.5.1 页面结构

 通过display：flex；设置响应布局，将完整页面分为两部分，左侧flex:2;占两份，右侧flex:5；占5份。

再通过for循环将信息渲染到页面，通过navigator设置跳转。   

##### 3.6 goods_list列表页面

###### 3.6.1 navigator传参

```javascript
url="/pages/goods_list/index?cid={{item2.cat_id}}"
```

通过url将商品分类的cat_id传给列表页面，跳转到列表页面通过cat_id传给后台，请求当前分类的商品，拿到数据后接收渲染到页面。

###### 3.6.2 组件传参

在组件Tabs中定义方法，并将当前tabs值转给列表页面，实现综合、销量、价格栏的切换。

```javascript
 handleItemTap(e){
      const index = e.currentTarget.dataset.index
      //把当前页面的点击事件的index，传给父控件
      this.triggerEvent("tabsItemChange",{index})
    }

```

###### 3.6.3 上拉加载更多

微信提供触底接口，当页面触底的时候会触发。

```javascript
onReachBottom: function () {
    //上拉加载更多
    this.getGoodsList()
  },

```

​    每次向后端发送请求都请求10条数据，定义isData判断从后端传来的数据是否为空，如果为空，则表示数据加载完毕，则在页面底部显示“暂无更多数据”

如果请求的数据不为空，则表示后端还有数据，新建一个newlist用于存放旧的列表数据和新传的列表数据拼接在一起的列表数据。

```javascript
  //传过来的goodslist数据
      const list = result.data.message.goods
      //解构赋值，拼接老数组和新数组，赋给newList
      let newlist = [...this.data.goodsList, ...list]
      //获取数据后赋值给goodsList
      this.setData({
        goodsList: newlist
      })

```

 

###### 3.6.4 数组排序

点击销量和价格后商品列表会按照销量和价格排序，利用JavaScript中的sort方法，对数组进行排序。

```javascript
 sortList(list) {
    //商品按照价格排序
    list.sort(function (a, b) {
      if (a.goods_price > b.goods_price) { return 1 }
      if (a.goods_price < b.goods_price) { return -1 }
      return 0
    })
    return list
  },

```

   调用该方法，创建两个新的数组，一个存放按销量排序的list，一个存放按价格排序的list，再渲染到页面。

##### 3.7 goods_detail商品详情页

###### 3.7.1 导航传参

goods_list页面中通过添加navigator导航，实现跳转到详情页，同时将该商品的id传给详情页，在打开详情页时，调用请求方法，像后端请求该商品的信息。

传参：

```javascript
 url="/pages/goods_detail/index?goods_id={{item.goods_id}}" 

```

获取参数：

```javascript
 onLoad: function (options) {
    console.log(options.goods_id);
    //请求数据
    this.getGoodsDetail(options.goods_id?options.goods_id:43976)
  }

```

获取商品详情：

```javascript
 this.setData({
      goodsObj:{
        pics:result.data.message.pics,
        goods_name:result.data.message.goods_name,
        goods_price:result.data.message.goods_price
      }
    })

```

###### 3.7.2 轮播图

同样通过swiper和for循环是实现详情页的轮播图。

###### 3.7.3 图标库

使用阿里图标库的方法：登录阿里图标库（网址：https://www.iconfont.cn/），搜索图标，将自己喜欢的图标加入购物车，添加到项目，打开项目，生成在线连接，再网址输入该链接，赋值所有代码，在小程序项目根目录下创建style/iconfont.wxss，将所有代码赋值到style/iconfont.wxss文件中，在使用到图标的页面wxss文件中引入style/iconfont.wxss文件，该页面的wxml文件利用图标class即可使用该图标。

###### 3.7.4 富文本标签

使用微信提供的<rich-text>富文本标签，将后端传过来的商品详情信息渲染到页面。

```javascript
 <rich-text nodes="{{goodsObj.goods_introduce}}"></rich-text>

```

###### 3.7.5 底部按钮

利用flex布局设置底部按钮的占比布局，引入阿里图标，加入购物车和立即购买按钮分别设置不同的背景颜色和字体颜色。并设置固定定位position:fixed;让它固定在页面底部，不随页面滑动而移动。

###### 3.7.6 收藏按钮

通过三元表达式判断isFavor的值，并给view容器设置点击事件，切换isFavor的值。以更换图标和颜色。

```javascript
changeFavorColor(){
    this.setData({
      isFavor:!this.data.isFavor
    })
    if(this.data.isFavor==true){
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 500
      })
    }else{
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 500
      })
    }
  }

```

如果isFavor为true，表示收藏，就利用wx.showToast显示‘收藏成功’，并设置显示时间和显示图标，如果isFavor为flase，同理。

###### 3.7.7 获取用户信息

添加登录页面，让微信用户使用当前微信账号授权登录该小程序，在登录页面添加button，利用button按钮的bindgetuserinfo属性，用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致，open-type="getUserInfo"时有效。

```javascript
<button class="loginBtn" open-type="getUserInfo" bindgetuserinfo="handleGetUserInfo">授权</button>

```

 

```javascript
handleGetUserInfo(e){
    console.log(e.detail.rawData);
    wx.setStorageSync('userInfo',{
      data:e.detail.rawData
    })
    wx.switchTab({
      url: '/pages/index/index',
    })
  }

```

将获取到的用户信息，存储到本地，在user页面从本地取出，因为存储的是字符串格式，需要用JSON.parse转成对象格式。

```javascript
const userInfo = wx.getStorageSync('userInfo')   
   this.setData({
     userInfo:JSON.parse(userInfo.data)
 })

```

##### 3.8 购物车实现

在这个项目中，因为后端接口并不完善，所以借助于本地缓存实现购物车功能。加入购物车的商品存储在本地缓存cart数据中，在每个商品中再添加一个商品数量属性。

再购物车页面取出本地缓存，并遍历计算商品总价和商品数量渲染到页面。

当商品数量只有一个，还减的时候，就弹出一个模态框，问用户是否确认删除当前该商品，如果用户点击确认，就将该商品从本地缓存cart列表中删除该商品。

全选按钮的实现依旧需要遍历cart数据，首先定义一个标识变量，标识当前是全选状态还是取消全选状态，如果它的选中状态是全选，就将所有商品的选中状态改为true，如果是取消全选，就将所有商品的选中状态改为false。并将新的cart列表放到本地缓存。

#### 项目截图

![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/202140_cea6661a_8375601.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/202156_4f48110a_8375601.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/202222_3ceac29d_8375601.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/202237_4a7e2a28_8375601.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/202306_cb5c75e6_8375601.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/202324_610a84d7_8375601.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/202340_22e8c495_8375601.png "屏幕截图.png")