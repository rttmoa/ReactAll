// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isShow:true
  },
  handleGetUserInfo(e){
    console.log(e.detail.rawData);
    wx.setStorageSync('userInfo',{
      data:e.detail.rawData
    })
    this.setData({
      isShow:false
    })
    const userInfo = wx.getStorageSync('userInfo')   
    this.setData({
      userInfo:JSON.parse(userInfo.data)
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    const userInfo = wx.getStorageSync('userInfo')   
    if(userInfo){
      this.setData({
        isShow:false
      })
      this.setData({
        userInfo:JSON.parse(userInfo.data)
      })
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