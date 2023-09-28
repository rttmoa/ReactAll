<template>


  <view class="cart-container" v-if="cart.length !== 0">
  
    <!-- 收货地址组件 -->
    <my-address></my-address>

    <!-- 商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧的文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <!-- 循环渲染购物车中的商品信息 -->
    <!-- 滑动商品进行删除 uni-swipe-action 及 uni-swipe-action-item组件  -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :options="options" @click="swipeItemClickHandler(goods)">
          <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>

    <!-- 使用自定义的结算组件 -->
    <my-settle></my-settle>
    
  </view>

  <!-- 空白购物车的区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>
<!-- 
   购物车：
    1、渲染购物车数据(通过mapState函数，将Store中的cart数组映射到当前页面中使用)
    2、
 -->
<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import { mapState, mapMutations } from 'vuex'

  export default {

    // 将 badgeMin 混入打当前页面中进行使用
    mixins: [badgeMix],
    // 计算属性
    computed: {
      // 调用 mapState方法，把 m_cart 模块中的cart数组映射到当前页面中，作为计算属性来使用
      // ...mapState('模块名称', ['要映射的数据名称1', '要映射的数据名称2'])
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        // 滑动删除组件 配置
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      // 商品的勾选状态发生了改变
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      // 商品的数量发生了改变
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      // 删除购物车物品
      swipeItemClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">

  // 结算区域 不能遮盖住底部
  .cart-container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #EFEFEF;

    .cart-title-text {
      font-size: 14px;
      margin-left: 10px;
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
