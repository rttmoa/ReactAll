// pages/goods_list/index.js
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    currentIndex: 0,
    goodsList: [],   //从后端请求的商品列表
    sortGoodsList:[],  //按价格排序的商品列表
    sellGoodsList:[],   //按销量排序的商品列表
    isDate: false,
  },
  //请求参数
  QueryParams: {
    query: '',
    cid: '5',
    pagenum: 1,
    pagesize: 10
  },

  //请求商品信息
  async getGoodsList() {
    //修改当前页码
    this.QueryParams.pagenum = this.QueryParams.pagenum + 1
    const result = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    if ((result.data.message.goods).length == 0) {
      console.log('没有更多了');
      this.setData({
        isDate: true
      })
    } else {
      console.log(result);
      //传过来的goodslist数据
      const list = result.data.message.goods
      //解构赋值，拼接老数组和新数组，赋给newList
      let newlist = [...this.data.goodsList, ...list]
      //获取数据后赋值给goodsList
      this.setData({
        goodsList: newlist
      })
    }
  },
  //按价格排序
  sortList(list) {
    //商品按照价格排序
    list.sort(function (a, b) {
      if (a.goods_price > b.goods_price) { return 1 }
      if (a.goods_price < b.goods_price) { return -1 }
      return 0
    })
    return list
  },
  //按销量排序
  sortListNumber(list) {
    //商品按照价格排序
    list.sort(function (a, b) {
      if (a.goods_number > b.goods_number) { return 1 }
      if (a.goods_number < b.goods_number) { return -1 }
      return 0
    })
    return list
  },
  //修改tabs标签样式
 async handleTabsItemChange(e) {
    //tabs下标
    console.log(e.detail.index);
    this.data.currentIndex = e.detail.index
    let tabs = this.data.tabs
    tabs.forEach((v, i) => i == this.data.currentIndex ? v.isActive = true : v.isActive = false)
    //修改后的tabs重新赋值
    this.setData({ tabs })
    //点击销量
    if(this.data.currentIndex == 1){
      const result = await request({
        url: '/goods/search'
      })
      const newlist = this.sortListNumber(result.data.message.goods)
      this.setData({
        sellGoodsList:newlist,
        isDate:true
      })
    }
    //点击价格
    if (this.data.currentIndex == 2) {
      const result = await request({
        url: '/goods/search'
      })
      const newlist = this.sortList(result.data.message.goods)
      this.setData({
        sortGoodsList:newlist,
        isDate:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过navigator跳转传过来的参数
    console.log(options);
    this.QueryParams.cid = options.cid || ''
    //获取后台传过来的参数
    this.getGoodsList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉加载更多
    this.getGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})