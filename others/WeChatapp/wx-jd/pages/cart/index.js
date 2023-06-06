// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray: [],
    totalMoney: '0.00', // 金额总计
    totalCount: 0, // 结算商品数量总和
    selectAll: false, // 是否全选
    startX: 0, //开始坐标
    startY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this
    wx.getStorage({
      key: 'cartInfo',
      success: function (res) {
        const cartArray = res.data
        cartArray.forEach(cart => {
          cart.select = false, // 选中
          cart.isTouchMove = false // 滑动删除
        })
        self.setData({
          cartArray: cartArray,
          selectAll: false,
          totalMoney: '0.00',
          totalCount: 0
        })
        // 设置Tabbar图标
        cartArray.length > 0 ?
          wx.setTabBarBadge({
            index: 2,
            text: String(cartArray.length)
          }) : wx.removeTabBarBadge({
            index: 2,
          })
      },
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function(){
    // 更新Storage
    const cartArray = this.data.cartArray
    wx.setStorage({
      key: 'cartInfo',
      data: cartArray
    })
  },
  /**
   * 子组件修改count触发
   */
  onGetCount: function (e) {
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray
    cartArray[index].total = e.detail.val
    // 更新data
    this.setData({
      cartArray: cartArray
    })
  },
  /**
   * 点击进入详情页面
   */
  switchGoodDetail(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray
    wx.navigateTo({
      url: '/pages/detail/index?id=' + cartArray[index].id,
    })
  },
  /**
   * 选中单个商品
   */
  selectGood(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray
    let totalMoney = Number(this.data.totalMoney) // 字符串转为number来进行计算
    let totalCount = this.data.totalCount
    let selectAll = this.data.selectAll
    // 设置选中或不选中状态
    cartArray[index].select = !cartArray[index].select
    // 计算总金额和商品个数
    if (cartArray[index].select) {
      totalMoney += Number(cartArray[index].price) * cartArray[index].total
      totalCount++
    } else {
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total
      totalCount--
      selectAll = false
    }
    // 更新data
    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)), 
      totalCount: totalCount,
      selectAll: selectAll
    })
  },
  /**
   * count -1
  */
  subCount(e) {
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray
    let totalMoney = Number(this.data.totalMoney)
    // 计算金额
    if (cartArray[index].select) {
      totalMoney -= Number(cartArray[index].price)
    }
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })
  },
  /**
   * count +1
  */
  addCount(e) {
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray
    let totalMoney = Number(this.data.totalMoney)
    // 计算金额
    if (cartArray[index].select) {
      totalMoney += Number(cartArray[index].price)
    }
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })
  },
  /**
   * 全选
  */
  selectAll() {
    const cartArray = this.data.cartArray
    let totalMoney = 0 // 合计初始化为0
    let totalCount = 0 // 结算个数初始化为0
    let selectAll = this.data.selectAll
    selectAll = !selectAll // 全选按钮置反

    cartArray.forEach(cart => {
      // 设置选中或不选中状态 每个商品的选中状态和全选按钮一致
      cart.select = selectAll
      // 计算总金额和商品个数
      if (cart.select) { // 如果选中计算
        totalMoney += Number(cart.price) * cart.total
        totalCount++
      } else {// 全不选中置为0
        totalMoney = 0
        totalCount = 0
      }
    })
    // 更新data
    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount,
      selectAll: selectAll
    })
  },
  /**
   * 手指触摸动作开始 记录起点X坐标
  */
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.cartArray.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cartArray: this.data.cartArray
    })
  },
  /**
   * 滑动事件处理
  */
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    this.data.cartArray.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })

    //更新数据
    that.setData({
      cartArray: that.data.cartArray
    })
  },
  /**
   * 计算滑动角度
  */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  /**
   * 删除事件
  */
  del: function (e) {
    var index = e.currentTarget.dataset.index
    var self = this

    // 删除storage
    wx.getStorage({
      key: 'cartInfo',
      success: function (res) {
        const partData = res.data
        partData.forEach((cart, i) => {
          if (cart.title == self.data.cartArray[index].title) {
            partData.splice(i, 1)
          }
        })
        wx.setStorage({
          key: 'cartInfo',
          data: partData
        })
        self.update(index)
      }
    })
  },
  update: function (index) {
    var cartArray = this.data.cartArray
    let totalMoney = Number(this.data.totalMoney)
    let totalCount = this.data.totalCount
    // 计算价格和数量
    if (cartArray[index].select) {
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total
      totalCount--
    }
    // 删除
    cartArray.splice(index, 1)
    // 更新数据
    this.setData({
      cartArray: this.data.cartArray,
      totalCount: totalCount,
      totalMoney: String(totalMoney.toFixed(2))
    })

    // 设置Tabbar图标
    cartArray.length > 0 ?
      wx.setTabBarBadge({
        index: 2,
        text: String(cartArray.length)
      }) : wx.removeTabBarBadge({
        index: 2,
      })
  }
})