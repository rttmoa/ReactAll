<template>


  <view>
    <!-- block不会被渲染为任何的元素 -->
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>

  </view> 
</template>

<!-- 
    商品列表展示：
      1、封装Item结构：   <my-goods :goods="goods"></my-goods>
 -->
<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        // 节流阀
        isloading: false
      };
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || '',  // 首页楼层过来的
      this.queryObj.cid = options.cid || ''

      this.getGoodsList()
    },
    methods: {

      // 获取商品列表数据的方法
      async getGoodsList(cb) {
        // 打开节流阀
        this.isloading = true
        const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 关闭节流阀
        this.isloading = false

        // 只要数据请求完毕、就立即按需调用cb回调函数
        cb && cb()
        if (res.meta.status !== 200) return uni.$showMsg()

        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id, // 跳转到商品详情页并携带参数
        })
      }
    },
    // 触底事件
    onReachBottom() {
      // 判断是否还有下一页数据
        // 当前页码值 * 每页显示多少条数据 >= 总数条数
        // pagenum * pagesize >= total
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) { return uni.$showMsg('数据加载完毕!') }

      // 判断是否正在请求其他数据，如果是，则不发起额外的请求
      if (this.isloading) return

      // 让页码值自增 +1
      this.queryObj.pagenum++
      this.getGoodsList()
    },

    // 上拉刷新效果
    onPullDownRefresh() {
      // 1、重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []

      // 2、重新发起数据请求  此函数传递了函数  有cb回调函数执行 函数体内数据
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>
