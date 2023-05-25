<template>


  <view v-if="goods_info.goods_name" class="goods-detail-container">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{goods_info.goods_price}}</view>
      <!-- 商品信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品的名字 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>

    <!-- 渲染后台返回的HTML元素 -->
    <!-- https://uniapp.dcloud.net.cn/component/rich-text.html -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>

    <!-- 商品导航组件区域 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonCilck 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'

  export default {
    computed: {
      // mapState/mapGetters的返回值通过展开运算符交给计算属性computed
      ...mapState('m_cart', []),
      ...mapGetters('m_cart', ['total']),  // 把 m_cart 模块中名称为total的getter映射到当前页面中使用
    },
    watch: {
      // 使用普通函数的形式定义的 watch 侦听器，在页面首次加载后不会被调用
      // total(newVal) {
      //   const findResult = this.options.find(x => x.text === '购物车')
      //   if (findResult) {
      //     findResult.info = newVal
      //   }
      // }
      
      // 解决：可以使用对象的形式来定义 watch 侦听器
      total: {
        // 1、通过监听total值的变化，通过第一个形参得到变化后的新值  -- handler是侦听器的处理函数
        handler(newVal) {
          // 2、通过数组的find方法，找到购物车按钮的配置对象
          const findResult = this.options.find(x => x.text === '购物车')
          if (findResult) {
            // 3、动态为购物车按钮的info属性赋值
            findResult.info = newVal
          }
        },
        // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
        immediate: true
      }
    },
    data() {
      return {
        // 商品详情对象
        goods_info: {},
        // 商品导航组件按钮配置对象 
        options: [{
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id);    // 根据商品详情页Id 去发请求
    },
    methods: {
      // mapMutations 的返回值通过展开运算符交给methods节点
      // 把 m_cart 模块中的 addToCart 方法映射到当前页面使用
      ...mapMutations('m_cart', ['addToCart']),

      // 获取商品详情数据
      async getGoodsDetail(goods_id) {
        const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
        if (res.meta.status !== 200) return uni.$showMsg()

        // 处理后重新赋值：目的是解决图片底部空白间隙
        res.message.goods_introduce = 
        res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')

        this.goods_info = res.message

        // webp格式在ios设备上显示不出
        // <img style=\"display:block;\" data-src=\"//image.suning.cn/uimg/sop/commodity/966602987133443585157120_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" 
          // src=\"//image.suning.cn/uimg/sop/commodity/966602987133443585157120_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\">
      },
      // 实现轮播图的大图预览功能
      preview(i) {
        uni.previewImage({ // 大图预览
          // 预览时，默认显示图片的索引 
          current: i,
          // 所有图片 url 地址的数组
          urls: this.goods_info.pics.map(x => x.pics_big), // 即 urls中是要预览的图片
        })
      },
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e) {
        if (e.content.text === '加入购物车') {
          // 组织商品的信息对象
          // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
          const goods = {
            goods_id: this.goods_info.goods_id,
            goods_name: this.goods_info.goods_name,
            goods_price: this.goods_info.goods_price,
            goods_count: 1,
            goods_small_logo: this.goods_info.goods_small_logo,
            goods_state: true
          }

          // 调用 addToCart 方法
          this.addToCart(goods)
        }
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #C00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        margin-right: 10px;
      }

      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    .yf {
      font-size: 12px;
      color: gray;
      margin: 10px 0;
    }
  }

  // 底部加入购物车 固定定位
  .goods_nav {
    position: fixed;
    bottom: 0;
    left: 0;
    // 让元素占整个屏幕宽度
    width: 100%; 
  }

  .goods-detail-container {
    padding-bottom: 50px;
  }
</style>
