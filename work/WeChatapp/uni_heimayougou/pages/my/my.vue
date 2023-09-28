<template>
  <view class="my-container">
	  <!-- 这里不让取反先进入页面查看页面结构 -->
    <my-login v-if="!token"></my-login>

    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import { mapState } from 'vuex'

  export default {
    mixins: [badgeMix],
    data() {
      return {
      };	
    },
    computed: {
      ...mapState('m_user', ['token'])
    }
  }
</script>

<style lang="scss">

  // 用户信息页面需要 100%高度的灰色
  page,
  .my-container {
    height: 100%;
  }
</style>
