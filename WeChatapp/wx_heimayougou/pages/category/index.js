// pages/category/index.js
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],   //左侧菜单
    rightContent: [],    //右侧内容
    currentIndex: 0  //左侧当前index
  },

  Cates: [],   //存储分类数据

  handleitemTap(e) {
    //console.log(e);
    //console.log(e.currentTarget.dataset.index);
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      rightContent: this.Cates[e.currentTarget.dataset.index].children
    })
  },

  //后台请求数据
  async getCates() {

    const result = await request({ url: '/categories' })
    this.setData({
      leftMenuList: result.data.message,
      rightContent: (result.data.message)[0].children
    })
    this.Cates = result.data.message
    wx.setStorageSync('Cates', {
      time: Date.now(),
      data: this.Cates
    })
    //关闭loading
    wx.hideLoading();

    
    /*    request({
         url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'
       }).then(
         result=>{
   
         }
       ) */

    /*  wx.request({
       url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
       success:(result)=>{
         this.setData({
           leftMenuList:result.data.message,
           rightContent:(result.data.message)[0].children
         })
         this.Cates = result.data.message
         wx.setStorageSync('Cates', {
           time:Date.now(),
           data:this.Cates
         })
         //关闭loading
         wx.hideLoading();
       }
     }) */
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示加载中
    // wx.showLoading({
    //   title: '加载中',
    // })
    //先从后台取出数据
    var Scates = wx.getStorageSync('Cates')
    //如果本地存储有数据
    if (Scates) {
      //且没有超出有效时间
      if (Date.now() - Scates.time < 10000) {
        this.Cates = Scates.data
        this.setData({
          leftMenuList: Scates.data,
          rightContent: (Scates.data)[0].children
        })
        //关闭loading
        //wx.hideLoading();
      } else {
        //当超出有效时间
        this.getCates()
      }
    } else {
      //当本地存储没有数据
      this.getCates()
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})