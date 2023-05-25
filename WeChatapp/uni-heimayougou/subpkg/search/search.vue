<template>
  <view>

    <!-- search-box  吸顶效果： -->
    <!-- uni-search-bar文档： https://uniapp.dcloud.net.cn/component/uniui/uni-search-bar.html# -->
    <view class="search-box">
    <!-- 监听input输入的、官方文档组件的使用、隐藏右侧取消按钮 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none">
      </uni-search-bar>
    </view>


    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>


    <!-- 搜索历史(历史记录跳转) -->
    <view class="history-box" v-else>

      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>

      <!-- 列表区域 -->
      <view class="history-list">
      <!-- 跳转到商品列表页面：gotoGoodsList -->
        <uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>

    </view>

  </view>
</template>


<!-- 
  此节知识点：
    1、
 -->


<script>
  export default {
    data() {
      return {
        // 延时器的timerId
        timer: null,
        // 搜索关键词
        kw: '',
        // 搜索的结果列表
        searchResults: [],
        // 搜索历史的数组
        historyList: []
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]');  // 如果前面的值不存在 取[]
    },
    methods: {
      // input 输入事件的处理函数
      input(e) {
        // 清除timer对应的延时器
        clearTimeout(this.timer)
        // 重新启动一个延时器、并把timerId赋值给this.timer
        this.timer = setTimeout(() => {
          // 如果500毫秒内、没有触发新的输入事件，则为搜索关键词赋值
          this.kw = e.value
          this.getSearchList()
        }, 500)
      },
      async getSearchList() {
        // 判断搜索关键词是否为空
        if (this.kw.length === 0) {
          this.searchResults = []
          return
        }

        const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message

        this.saveSearchHistory()
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory() {
        // this.historyList.push(this.kw) // 不建议：1、新关键词应该放到首位， 2、关键词不应该重复

        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)

        this.historyList = Array.from(set)

        // 对搜索历史数据，进行持久化的存储
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      clean() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      // 历史记录跳转到商品详情页中去
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw, // 跳转到商品列表页同时 携带query参数
        })
      }
    },

    computed: {
      histories() {
        // console.log(123)
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }


  // 搜索历史盒子
  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      // 两端对齐
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      // 标签名就是类名：审查元素
      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
