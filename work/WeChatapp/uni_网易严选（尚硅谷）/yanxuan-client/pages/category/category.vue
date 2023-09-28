<template>
	<view class="category-contanier">
		<!-- 搜索 -->
		<view class="header"><view class="search">商品搜索</view></view>
		<!-- 内容 -->
		<view class="content">
			<!-- 左侧区域 -->
			<view class="left">
				<scroll-view class="left-scroll" scroll-y="true">
					<view class="nav-item" :class="{ active: index === navIndex }" @click="changeNavIndex(index)" v-for="(item, index) in categoryDatas" :key="item.id">
						{{ item.name }}
					</view>
				</scroll-view>
			</view>
			<!-- 右侧区域 -->
			<view class="right">
				<scroll-view class="right-scroll" scroll-y="true">
					<view>
						<!-- 大图 -->
						<image class="cate-img" :src="categoryObj.imgUrl" mode=""></image>
						<!-- 列表 -->
						<view class="goods-list">
							<view class="goods-item" v-for="item in categoryObj.subCateList" :key="item.id">
								<image class="goods-img" :src="item.wapBannerUrl" mode=""></image>
								<view class="goods-name">{{ item.name }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import req from '@/api/request.js';
export default {
	data() {
		return {
			navIndex: 0, //高亮标记
			categoryDatas: []
		};
	},
	created() {
		this.getCategoryList();
	},
	computed: {
		// 根据数组[]和下标，找到对象
		categoryObj() {
			return this.categoryDatas[this.navIndex];
		}
	},
	methods: {
		// 点击高亮
		changeNavIndex(index) {
			this.navIndex = index;
		},
		async getCategoryList() {
			try {
				const res = await req('/categoryDatas');
				console.log(res);
				if (res.status == 200) {
					this.categoryDatas = res.categoryDatas;
				}
			} catch (e) {
				console.log(e);
				//TODO handle the exception
			}
		}
	}
};
</script>

<style lang="stylus">
.category-contanier
	.header
		padding 20upx 0
		.search
			width 90%
			margin 0 auto
			height 60upx
			line-height 60upx
			background-color #ccc
			color #333
			text-align center
			border-radius 8upx
	.content
		display flex
		border-top 2upx solid #333
		// 动态计算高度 100vh -60 -20*2
		height calc(100vh - 102upx)
		.left
			width 20%
			border-right 2upx solid #333
			.left-scroll
				height calc(100vh - 102upx)
				.nav-item
					position relative
					font-size 26upx
					height 60upx
					line-height 60upx
					text-align center
					&.active::before
						content ''
						width 2upx
						height 34upx
						background-color red
						position absolute
						left 10upx
						top 17upx
		.right
			flex 1
			// height calc(100vh - 102upx)
			.right-scroll
				height calc(100vh - 102upx)
				.cate-img
					width 520upx
					height 200upx
					display block
					margin 20upx auto
				.goods-list
					display flex
					flex-wrap wrap
					.goods-item
						width 33.333%
						text-align center
						margin 20upx 0
						.goods-img
							width 90%
							height 140upx
						.goods-name
							font-size 26upx
</style>
