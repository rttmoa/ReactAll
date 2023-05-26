<template>

  <view class="goods-item">

    <!-- 左侧的盒子 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>

    <!-- 右侧的盒子 - ->
    <view class="goods-item-right">
      <!-- 商品的名字 -->
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <!-- 在渲染商品价格的时候，通过管道符 | 调用过滤器 filters: { toFixed () {}} -->
        <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <!-- 修改 uni-number-box 源码 onBlur函数 -->
        <!-- 解决 NumberBox 数据不合法问题：输入A1和10.2 都会转为数值 -->
        <!-- 在输入的时候还需要 判断新值内容是否合法，新值中不包含小数点 -->
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
	  // 渲染商品列表时，是否加复选框和右侧添加数量的功能
    props: {
      goods: {
        type: Object,
        default: {}
      },
	  // 只希望在购物车页面去展示这个radio组件
      showRadio: {
        type: Boolean,
        // 默认情况下，不会展示 radio 组件
        default: false
      },
      showNum: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 默认的图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    // 过滤器
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      // 这是 radio 组件的 点击事件处理函数
      radioClickHandler() {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数 
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      // 监听到了 NumberBox 组件数量变化的事件
      numChangeHandler(val) {
        // 通过emit触发外界通过 @ 绑定的 num-change 事件
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          // 商品的最新数量
          // goods_count: val - 0,
          goods_count: +val, // 保证数量是一个数值类型
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-price {
          color: #C00000;
          font-size: 16px;
        }
      }
    }
  }
</style>
