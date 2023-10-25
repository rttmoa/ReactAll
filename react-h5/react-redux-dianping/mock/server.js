var app = require('koa')()
var router = require('koa-router')()
console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

// router.get('/', function *(next) {
//     this.body = 'hello koa !'
// });

// router.get('/api', function *(next) {
//     console.log(123)
//     this.body = 'test data'
// });

// 首页 —— 广告（超值特惠）   // http://localhost:3000/api/homead
var homeAdData = require('./home/ad.js')
router.get('/api/homead', function (next) { 
    console.log('首页 —— 广告（超值特惠）')
    // console.log(this.response)
    this.body = homeAdData
})

// 首页 —— 推荐列表（猜你喜欢） // http://localhost:3000/api/homelist/:city/:page
var homeListData = require('./home/list.js')
router.get('/api/homelist/:city/:page', function (next) { 
    console.log('首页 —— 推荐列表（猜你喜欢）')

    // 参数
    const params = this.params
    const paramsCity = params.city
    const paramsPage = params.page

    console.log('当前城市：' + paramsCity)
    console.log('当前页数：' + paramsPage)

    this.body = homeListData
})

// 搜索结果页 - 搜索结果 - 三个参数  
// http://localhost:3000/api/search/222/beijing/scenery/Forbidden
var searchListData = require('./search/list.js')
// 参数必传：页码、城市、分类、关键词
router.get('/api/search/:page/:city/:category/:keyword', function (next) {
    console.log('搜索结果页 - 搜索结果')

    // 参数
    const params = this.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category
    const paramsKeyword = params.keyword

    console.log('当前页数：' + paramsPage)
    console.log('当前城市：' + paramsCity)
    console.log('当前类别：' + paramsCategory)
    console.log('关键字：' + paramsKeyword)

    this.body = searchListData
})

// 搜索结果页 - 搜索结果 - 两个参数   // http://localhost:3000/api/search/222/beijing/scenery
router.get('/api/search/:page/:city/:category', function (next) {  //->   
    console.log('搜索结果页 - 搜索结果')

    // 参数
    const params = this.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category

    console.log('当前页数：' + paramsPage)
    console.log('当前城市：' + paramsCity)
    console.log('当前类别：' + paramsCategory)

    this.body = searchListData
})

// 详情页 - 商户信息    // http://localhost:3000/api/detail/info/5934707649654805
const detailInfo = require('./detail/info.js')
router.get('/api/detail/info/:id', function (next) {   //-->    
    console.log('详情页 - 商户信息')

    const params = this.params
    const id = params.id

    console.log('商户id: ' + id)

    this.body = detailInfo
})

// 详情页 - 用户评论  /// http://localhost:3000/api/detail/comment/5/5934707649654805
const detailComment = require('./detail/comment.js')
router.get('/api/detail/comment/:page/:id', function (next) {
    console.log('详情页 - 用户点评')

    const params = this.params
    const page = params.page
    const id = params.id

    console.log('商户id: ' + id)
    console.log('当前页数: ' + page)

    this.body = detailComment
})

// 订单列表  /// http://localhost:3000/api/orderlist/zhangsan
const orderList = require('./orderlist/orderList.js')
router.get('/api/orderlist/:username', function (next) {  
    console.log('订单列表')

    const params = this.params
    const username = params.username
    console.log('用户名：' + username)

    // console.log('orderList', orderList)
    this.body = orderList
})
 
// 提交评论  //// http://localhost:3000/api/submitComment
router.post('/api/submitComment', function (next) {
    
    console.log('提交评论', this)
    // console.log(this)

    // 获取参数 
    this.body = {
        errno: 0,
        msg: 'ok'
    }
})



// FIXME: 订单列表  /// http://localhost:3000/api/orderlistTest
let url1 = "/api/orderlistTest/:username/";   // http://localhost:3000/api/orderlistTest/zhangsan
let url2 = "/api/orderlistTest/:username/:city";  // http://localhost:3000/api/orderlistTest/zhangsan/beijing
let url3 = "/api/orderlistTest/";
router.get(url3, function (next) {  
    console.log('订单列表')



    console.log(this.url) //   /api/orderlistTest?username=zhangsan&age=123
    console.log(this.search) //   ?username=zhangsan&age=123
    console.log(this.query) //   [Object: null prototype] { username: 'zhangsan', age: '123' }
    console.log(this.pathname) // undefined
    console.log(this.path) // /api/orderlistTest
    console.log(this.href) // http://localhost:3000/api/orderlistTest?username=zhangsan&age=123
 
    // const params = this.params
    // const username = params.username
    // console.log('用户名：' + username)

    this.body = "订单列表返回Success！"
})



// TODO: 开始服务并生成路由
app.use(
    router.routes()
).use(
    router.allowedMethods()
)
app.listen(3000)