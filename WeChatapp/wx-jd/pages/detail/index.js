// pages/detail/index.js
// 引入接口配置文件urlconfig
const interfaces = require('../../utils/urlconfig.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    partData: {},
    baitiao: [],
    baitiaoSelectItem: {
      desc: "【白条支付】首单享立减优惠"
    },
    hideBaitiao: true, // 是否隐藏白条的遮罩
    hideBuy: true, // 是否购买的遮罩
    badgeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const self = this
    // 发送接口请求
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: interfaces.productionDetail,
      success(res) {
        let result = null
        res.data.forEach(data => {
          if (data.partData.id == id)
            result = data
        })

        self.setData({
          partData: result.partData,
          baitiao: result.baitiao
        })
        wx.hideLoading()
      }
    })
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
    const self = this
    wx.getStorage({
      key: 'cartInfo',
      success: function (res) {
        const cartArray = res.data
        self.setBadge(cartArray)
      },
    })
  },
  /**
   * 显示白条弹框
   */
  popBaitiaoView: function () {
    this.setData({
      hideBaitiao: false
    })
  },
  /**
   * 显示商品弹框
   */
  popBuyView: function () {
    this.setData({
      hideBuy: false
    })
  },
  updateSelectItem(e){ // 更新data
    this.setData({
      baitiaoSelectItem: e.detail
    })
  },
  updateCount(e){ // 更新count
    var partData = this.data.partData
    partData.count = e.detail.val
    this.setData({
      partData: partData
    })
  },
  /**
   * 加入购物车
   */
  addCart() {
    var self = this
    wx.getStorage({
      key: 'cartInfo',
      success(res) {
        const cartArray = res.data
        let partData = self.data.partData
        let isExit = false; // 判断数组是否存在该商品
        cartArray.forEach(cart => {
          if (cart.id == partData.id) { // 存在该商品
            isExit = true
            cart.total += self.data.partData.count
            wx.setStorage({
              key: 'cartInfo',
              data: cartArray,
            })
          }
        })
        if (!isExit) { // 不存在该商品
          partData.total = self.data.partData.count
          cartArray.push(partData)
          wx.setStorage({
            key: 'cartInfo',
            data: cartArray,
          })
        }
        self.setBadge(cartArray)
      },
      fail() {
        let partData = self.data.partData
        partData.total = self.data.partData.count
        let cartArray = []
        cartArray.push(partData)
        wx.setStorage({
          key: 'cartInfo',
          data: cartArray,
        })
        self.setBadge(cartArray)
      }
    })
    // 购物车提醒
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 3000
    })
  },
  /**
   * 设置购物车图标
  */
  setBadge(cartArray) {
    this.setData({
      badgeCount: cartArray.length
    })
  },
  /**
   * 显示购物车
   */
  showCartView: function () {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  }
})