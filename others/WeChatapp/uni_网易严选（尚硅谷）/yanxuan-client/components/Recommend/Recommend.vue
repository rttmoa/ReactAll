<template>
	<view class="recommend-container">
		<!-- 1、轮播图-->
		<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item><image src="https://yanxuan.nosdn.127.net/static-union/1660563775000030.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image></swiper-item>
			<swiper-item><image src="https://yanxuan.nosdn.127.net/static-union/1660098694dc59e2.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image></swiper-item>
			<swiper-item><image src="https://yanxuan.nosdn.127.net/static-union/166054779021e9ad.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image></swiper-item>
		</swiper>

		<!-- 2、三个小图标 -->
		<view class="policy-list">
			<view class="policy-item" v-for="item in indexData.policyDescList" :key="item.desc">
				<image :src="item.icon" mode=""></image>
				<text>{{ item.desc }}</text>
			</view>
		</view>

		<!-- 3、10个导航图标 -->
		<view class="kingKong-module">
			<view class="kingKong-item" v-for="item in indexData.kingKongModule.kingKongList" :key="item.L1Id">
				<image :src="item.picUrl" mode=""></image>
				<view>{{ item.text }}</view>
			</view>
		</view>
		
		<!-- 4、分类区 数据：categoryModule  -->
		<view class="category-module">
			<view class="category-item" v-for="(item,index) in indexData.categoryModule" :key="index">
				<!-- 大图 -->
				<image class="category-img" :src="item.titlePicUrl" mode=""></image>
				<!-- 横线滑块 -->
				<scroll-view class="category-scroll" scroll-x="true" enable-flex>
					<view class="goods-item" v-for="goods in item.itemList" :key="goods.id">
						<image class="goods-img" :src="goods.showPicUrl" mode=""></image>
						<view class="goods-name">
							{{goods.name}}
						</view>
					</view>
					<view class="goods-item more" >
						查看更多 >
					</view>
				</scroll-view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState({
			indexData: state => state.home.indexData
		})
	}
};
</script>

<style lang="stylus">
.recommend-container
	.banner
		height 350upx
		image
			width 100%
			height 350upx
	// 三个小图标
	.policy-list
		display flex
		margin 10upx 0
		.policy-item
			flex 1
			text-align center
			image
				width 40upx
				height 40upx
				// 文字在图片中间对齐
				vertical-align middle
			text
				font-size 26upx
	// 10个导航
	.kingKong-module
		display flex
		// 换行
		flex-wrap wrap
		.kingKong-item
			width 20%
			text-align center
			margin 6upx 0
			image
				width 100upx
				height 100upx
			view
				font-size 26upx
	// 商品分类区
	.category-module
		margin: 20upx 0
		.category-item
			margin-bottom: 20upx
			.category-img
				width: 100%
				height: 370upx
			// 横线滚动条
			.category-scroll
				display: flex
				flex-wrap: nowrap
				height: 300upx
				.goods-item
					margin-left: 20upx
					.goods-img
						width: 200upx
						height: 200upx
						background-color: #f5f5f5
					.goods-name
						// 换行
						white-space: pre-wrap
						display: -webkit-box
						-webkit-line-clamp: 2
						-webkit-box-orient: vertical
						text-overflow: ellipsis
						overflow: hidden
				.more
					width: 200upx
					height: 300upx
					
				
			
		
		 
</style>
