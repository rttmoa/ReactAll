<template>
  <view>
    <!-- 搜索组件 -->
    <!-- 吸顶效果： position: sticky、top:0 、 z-index: 999   -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>

    <!-- 轮播图的区域 -->
    <!-- 轮播图的区域 uswiper 快速生成代码片段 -->
    <!-- 小圆点 | 自动轮播 | 轮播间隔 | 开始轮播到结束是1s | 衔接轮播 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域：分类、秒杀拍、超市购、母婴品 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>

    <!-- 楼层区域：时尚女装、户外运动、箱包配饰 -->
    <!-- 楼层的容器 -->
    <view class="floor-list">
      <!-- 每一个楼层的 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">

        <!-- 楼层的标题 -->
        <image :src="item.floor_title.image_src" class="floor-title">
        </image>

        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">

          <!-- 左侧大图片的盒子：点击跳转商品列表页 -->
          <!-- 此处将view改造成navigator标签，就可以动态绑定URL地址了 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix">
            </image>
          </navigator>

          <!-- 右侧 4 个小图片的盒子：点击跳转商品列表页-->
          <view class="right-img-box">
          <!-- 不让渲染数组第一项 arr[0] 被隐藏掉就好了 -->
            <navigator class="right-img-item" v-for="(item2, index2) in item.product_list" :key="index2" v-if="index2 !== 0" :url="item2.url">
              <!-- 高度正常、宽度自适应 -->   
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix">
              </image>
            </navigator>
          </view>

        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  
  export default {
    mixins: [badgeMix],
    data() {
      return {
        // 这是轮播图的数据列表
        swiperList: [],
        // 分类导航的数据列表
        navList: [],
        // 楼层的数据
        floorList: []
      };
    },
    onLoad() {
      // 调用方法，获取轮播图的数据
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // 请求失败
        if (res.meta.status !== 200) return uni.$showMsg()

        this.swiperList = res.message
      },
      async getNavList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取首页楼层数据的方法
      async getFloorList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()

        // 对数据进行处理
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]; // 由于后台给的数据格式不对
          })
        })
        this.floorList = res.message
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">


  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }




  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }




  .floor-title {
    width: 100%;
    height: 60rpx;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
  



  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
