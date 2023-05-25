// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e){
      const index = e.currentTarget.dataset.index
      //把当前页面的点击事件的index，传给父控件
      this.triggerEvent("tabsItemChange",{index})
    }
  }
})
