<template>
  <view>

    <!-- 使用自定义的搜索组件 - uniapp创建  创建的组件在components中 -->
    <!-- 动态绑定属性传递到 my-search组件中 -->
    <!-- <my-search :bgcolor="'pink'" :radius="3"></my-search> -->

    <my-search @click="gotoSearch"></my-search>

    <view class="scroll-view-container">

      <!-- 左侧的滑动区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
        <block v-for="(item, i) in cateList" :key="i">
          <!-- 动态绑定class, 动态切换类名 -->
          <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
        </block>
      </scroll-view>

      <!-- 右侧的滑动区域 -->
      <scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">

        <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">

          <!-- 二级分类的标题: 电视, 空调, 洗衣机, 冰箱 -->
          <view class="cate-lv2-title">/ {{item2.cat_name}} /</view> 
          <!-- 当前二级分类下的三级分类列表 -->
          <view class="cate-lv3-list">

            <!-- 三级分类的Item项 -->
            <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)"> 
              <!-- 三级分类的图片 -->
              <image :src="item3.cat_icon"></image> 
              <!-- 三级分类的文本 -->
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>

    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  
  export default {
    mixins: [badgeMix],
    data() {
      return {
        // 当前设备可用的高度
        wh: 0,

        // 分类列表
        cateList: [],
        active: 0,

        // 二级分类的列表
        cateLevel2: [],
        scrollTop: 0,  // scrollTop 不能赋值相同   设置 0/1 px 即可
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync();  // 获取设备信息，动态给每个手机设置滚动的高度
      this.wh = sysInfo.windowHeight - 50;  // 可使用高度(除去tarBar和顶部导航高度) = 滚动高度 - 搜索框的50px

      this.getCateList()
    },
    methods: {

      // 获取分类列表的数据
      async getCateList() {
        const { data: res } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg()
 
        console.log('一级分类', res.message)

        this.cateList = res.message;   // 为一级分类赋值
 
        this.cateLevel2 = res.message[0].children;  // 为二级分类赋值
      },
      activeChanged(i) {
        this.active = i

        // 重新为二级分类赋值
        this.cateLevel2 = this.cateList[i].children

        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },

      // 跳转到商品列表页面
      gotoGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id,   // 跳转即可查看页面参数和地址
        })
      }, 
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search',  //  跳转到搜索子页面
        })
      }
    }
  }
</script>

<style lang="scss">
	
	// 滚动
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        background-color: #F7F7F7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #FFFFFF;
          position: relative;

          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #C00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
</style>
