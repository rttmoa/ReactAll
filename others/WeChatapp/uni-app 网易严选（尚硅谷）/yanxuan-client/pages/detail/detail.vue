<template>
	<view class="detail">
		<view class="header">{{ goodsItem.name }}</view>
		<!-- 内容 -->
		<scroll-view class="detaiScroll" scroll-y="true">
			<image :src="goodsItem.listPicUrl" mode=""></image>
			<view class="tag">{{ goodsItem.promTag }}</view>
			<view class="price">￥ {{ goodsItem.retailPrice }}</view>
			<view class="list" style="margin-left: 5%;font-size: 28upx;line-height: 50upx;">
				<view>1) 100%桑蚕丝填充，丝丝精粹不掺杂</view>
				<view>2) 创新井字拉网工艺，桑蚕丝不易黏连结块</view>
				<view>3) 两种面料可选，贡缎手感细腻，竹棉清爽透气</view>
				<view>4) AB双面设计，多种活性印花不易褪色</view>
			</view>
		</scroll-view>

		<!-- 底部 -->
		<view class="footer">
			<view class="img">
				<image src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/detail-kefu-d10f0489d2.png?imageView&type=webp" mode=""></image>
			</view>
			<view class="btn">立即购买</view>
			<view class="btn cart" @click="addCart">加入购物车</view>
		</view>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			goodsItem: {} //商品详情
		};
	},
	onLoad(options) {
		this.goodsItem = JSON.parse(options.goodsItem);
		console.log(this.goodsItem);
	},
	methods: {
		...mapMutations('cart', ['addGoodsMutation']),
		// 添加到购物车
		addCart() {
			this.addGoodsMutation(this.goodsItem);
		}
	}
};
</script>

<style lang="stylus">
.detail
	.header
		height 90rpx
		line-height 90rpx
		width 570rpx
		margin 0 auto
		text-align center
	.detaiScroll
		height calc(100vh - 190rpx)
		image
			width 100%
			height 750rpx
		.tag
			width 90%
			height 100rpx
			line-height 100rpx
			background-color #bb2c08
			margin 20rpx auto
			text-align center
			color #fff
			font-size 32rpx
			border-radius 10rpx
		.price
			font-size 50rpx
			color #dd1a21
			line-height 70rpx
			margin-left 5%
	.footer
		display flex
		position fixed
		bottom 0
		left 0
		right 0
		height 100rpx
		line-height 100rpx
		border-top 1px solid #eee
		background-color #fff
		.img
			flex 1
			line-height 100rpx
			image
				display block
				margin 20rpx auto
				width 60rpx
				height 60rpx
		.btn
			flex 2
			border-left 1px solid #eee
			text-align center
			&.cart
				background-color #dd1a21
				color #fff
</style>
