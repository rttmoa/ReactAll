// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    totalPrice: 0,
    totalNum: 0,
    allChecked: true,
    cart: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  setCart(cart) {
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;
    //先判断数组是否为空
    if (cart.length == 0) {
      allChecked = false
    } else {
      //获取总价格、总数量
      cart.forEach(v => {
        if (v.checked) {
          totalPrice += v.goods_price * v.num;
          totalNum += v.num;
        } else {
          allChecked = false
        }
      })
    }
    this.setData({
      totalPrice,
      totalNum,
      allChecked
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取缓存中的收获
    const address = wx.getStorageSync('address')
    
    this.setData({
      address
    })
    let cart = wx.getStorageSync('cart') || []
    this.setData({
      cart
    })
    this.setCart(cart)
  },
  //商品条目复选框
  handleItemChange(e) {
    console.log(e.currentTarget.dataset.id);
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id == goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  handlechangeNum(e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id == goods_id)

      
    
    //当商品数量只有一个，还减的时候
    if (cart[index].num==1 && e.currentTarget.dataset.operation == "-1") {
      wx.showModal({
        cancelColor: 'cancelColor',
        title:'删除',
        content:'确认删除？',
        success:(result)=>{
          if(result.confirm){
            cart.splice(index,1)
            this.setCart(cart)
            this.setData({cart})
          }
        }
      })
    }else{
      cart[index].num+=e.currentTarget.dataset.operation
      this.setCart(cart)
      this.setData({cart})
    }
  },

  //获取地址
  handleGetUserInfo(){
    wx.chooseAddress({
      success: (result) => {
        let address = result
        address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
        wx.setStorageSync('address', address)
      },
    })
  },
  //取消全选
  cancelAll(){
    const cart = this.data.cart
    this.setData({
      allChecked:!this.data.allChecked
    })
    if(this.data.allChecked){
      console.log(this.data.allChecked);  
      cart.forEach(v=>{
        v.checked = true
      })
      this.setCart(cart)
      this.setData({
        cart
      })
    }else{
      cart.forEach(v=>{
        v.checked = false
      })
      this.setCart(cart)
      this.setData({
        cart
      })
    }
    
    // let { cart } = this.data
    // cart.forEach(v=>{
    //   v.checked=!v.checked
    // })
    // this.setCart(cart)
    // this.setData({
    //   cart
    // })
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