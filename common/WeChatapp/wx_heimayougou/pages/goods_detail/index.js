// pages/goods_detail/index.js
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isFavor:false
  },
  GoodsInfo:{},
 
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
  },
 async getGoodsDetail(goods_id){
    const result = await request({
      url:'/goods/detail',
      data:{goods_id}
    })
    this.GoodsInfo = result.data.message
    this.setData({
      goodsObj:{
        pics:result.data.message.pics,
        goods_name:result.data.message.goods_name,
        goods_price:result.data.message.goods_price,
        goods_introduce:result.data.message.goods_introduce
      }
    })
  },
  handlePreviewImage(e){
   const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
   const current = e.currentTarget.dataset.url; 
   wx.previewImage({
      urls: urls,
      current
    })
  },
  handleCartAdd(e){
    //获取本地缓存
    let cart = wx.getStorageSync('cart')||[]
    //如果商品存在购物车，数量+1
    //判断当前商品是否存在购物车中
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    //如果商品不存在
    if(index == -1){
      //添加商品属性，num为1
      this.GoodsInfo.num =1
      //添加一个商品选中的属性
      this.GoodsInfo.checked =true
      //商品添加到购物车中
      cart.push(this.GoodsInfo)
      
    }else{
      //商品存在购物车，数量加1
      cart[index].num++
    }
     //购物车缓存
     wx.setStorageSync('cart', cart)
     wx.showToast({
       title: '加入成功',
       icon:'success',
       duration:500,
       mask:true
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goods_id);
    //请求数据
    this.getGoodsDetail(options.goods_id?options.goods_id:43976)
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