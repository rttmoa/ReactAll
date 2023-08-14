<template>
	<view class="index-container">
		<!-- 1、头部 -->
		<view class="header">
			<image class="logo" src="/static/images/logo.png" mode=""></image>
			<!-- 搜索 -->
			<view class="search">
				<text class="iconfont icon-sousuotianchong"></text>
				<input type="text" placeholder="搜索...." placeholder-class="placeholder" />
			</view>
			<button>Doraemon</button>
		</view>
		<!-- 2、导航区域-->
		<scroll-view class="nav-scroll" scroll-x="true" enable-flex="true" v-if="indexData.kingKongModule">
			<view class="nav-item" :class="{active:navIndex===-1}" @click="changeIndex(-1,-1)" >推荐</view>
			<view class="nav-item" :class="{active:index===navIndex}" @click="changeIndex(index,item.L1Id)" v-for="(item,index) in indexData.kingKongModule.kingKongList" :key="item.L1Id">{{ item.text }}</view>
		</scroll-view>
		
		<!-- 导航区域 -->
		<scroll-view scroll-y="true" >
			<!-- 推荐模块 跟其他模块互斥关系，-->
			<Recommend v-if="navIndex===-1"></Recommend>
			<!-- 其他分类列表 -->
			<CateList v-else :L1Id='L1Id'/>
		</scroll-view>
	</view>
</template>

<script>
import req from '@/api/request.js';
import { mapState, mapActions } from 'vuex';
import Recommend  from '@/components/Recommend/Recommend.vue'
import CateList  from '@/components/CateList/CateList.vue'
export default {
	components:{
		Recommend,
		CateList
	},
	data() {
		return {
			// indexData: {} //首页数据
			navIndex:-1,  //高亮标记
			L1Id:0  //导航标记
		};
	},
	computed: {
		// 获取数据
		...mapState('home', ['indexData'])
		// ...mapState({
		// 	indexData:state=>state.home.indexData
		// })
	},
	onLoad() {},
	created() {
		// wx.request({
		// 	url,data,method
		// })
		// this.getIndexData();
		// this.getIndexDataAction();  //触发action 的第二种写法

		// 触发action 异步发网络请求 拿到数据 往vuex存
		this.$store.dispatch('home/getIndexDataAction');
	},
	methods: {
		//触发action 的第二种写法
		// ...mapActions('home',['getIndexDataAction']),
		async getIndexData() {
			try {
				const res = await req('/getIndexData'); //小程序
				// const res = await req('/api/getIndexData');  //H5 跨域
				console.log(res);
				if (res.status == 200) {
					this.indexData = res.indexData;
				}
			} catch (e) {
				//TODO handle the exception
			}
		},
		// 点击高亮
		changeIndex(index,L1Id){
			this.navIndex=index;
			this.L1Id=L1Id;
		}
	}
};
</script>

<style lang="stylus">
.index-container
	padding 10rpx 5rpx
	.header
		display flex
		.logo
			width 140rpx
			height 40rpx
			margin 10rpx
		.search
			flex 1
			position relative
			// width 420upx
			height 60upx
			background-color #eee
			.iconfont
				position absolute
				left 10rpx
				top 9rpx
				font-size 45rpx
			input
				width 360upx
				height 60upx
				margin-left 60upx
				.placeholder
					font-size 26upx
		button
			width 144upx
			height 60upx
			line-height 60upx
			font-size 24rpx
			padding 0 5rpx
			margin-left 10upx
			// tab 缩进 后移   shift+tab 前进
	.nav-scroll
		// scroll-view 必须要设置高度，否则会占满全屏
		height: 80upx
		// 不换行
		display flex
		white-space nowrap
		.nav-item
			// 针对H5单独处理
			display inline-block
			height 45upx
			padding 10upx
			font-size 26upx
			// 父级引用
			&.active
				border-bottom 3upx solid #BB2C08
				color #BB2C08
</style>
