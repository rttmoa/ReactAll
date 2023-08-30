// components/IOU/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBaitiao: { // 是否隐藏白条的遮罩
      type: Boolean,
      value: true
    }, 
    baitiao:{ // 分期内容的数据
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex: 0 // 选中的下标
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBaitiaoView: function (e) { // 隐藏白条弹框
      if (e.target.dataset.target == 'self')
        this.setData({
          hideBaitiao: true
        })
    },
    selectItem: function (e) {// 选择白条分期
      var index = e.currentTarget.dataset.index
      var baitiao = this.data.baitiao
      for (var i = 0; i < baitiao.length; i++) {
        baitiao[i].select = false
      }
      baitiao[index].select = !baitiao[index].select
      // 更新data
      this.setData({
        baitiao: baitiao,
        selectIndex: index
      })
    },
    makeBaitiao: function () { // 点击打白条
      this.setData({
        hideBaitiao: true
      })
      const selectItem = this.data.baitiao[this.data.selectIndex]
      this.triggerEvent('updateSelect', selectItem)
    },
  }
})
