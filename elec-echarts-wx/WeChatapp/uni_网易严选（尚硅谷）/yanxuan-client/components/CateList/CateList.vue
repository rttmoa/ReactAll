<template>
	<view class="catelist-contanier">
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in cateObj.category.bannerUrlList" :key='index'>
				<image :src="item" mode=""></image>
			</swiper-item>
		</swiper>
		
		<view class="title">
			{{cateObj.category.frontName}}
		</view>
		<view class="desc">
			{{cateObj.category.frontDesc}}
		</view>
		
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods-item" v-for="item in cateObj.itemList" :key="item.id" @click="toDetail(item)">
				<image class="goods-img" :src="item.listPicUrl" mode=""></image>
				<view class="goods-desc">
					{{item.name}}
				</view>
				<view class="goods-price">
					{{item.retailPrice}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import req from '@/api/request.js';
export default {
	name: 'CateList',
	props:['L1Id'],
	data() {
		return {
			indexCateList:[],//所有的分类数据
		};
	},
	created() {
		this.getIndexCateList();
	},
	computed:{
		cateObj(){
			//  所有数据 [] {parentId：}  ===L1Id		
			return this.indexCateList.find(item=>item.category.parentId===this.L1Id)
 		}
	},
	methods: {
		async getIndexCateList() {
			try {
				const res = await req('/getIndexCateList');
				console.log(res);
				if(res.status===200){
					this.indexCateList=res.indexCateList;
				}
			} catch (e) {
				//TODO handle the exception
				console.log(e);
			}
		},
		// 去详情页
		toDetail(item){
			wx.navigateTo({
				url:'/pages/detail/detail?goodsItem='+JSON.stringify(item)
			})
		}
	}
};
</script>

<style lang="stylus">
.catelist-contanier
	.swiper
		height: 360upx
		image
			width: 100%
			height: 360upx
	.title
		font-size: 40upx
		color: #333
		text-align: center
		height: 80upx
		line-height: 80upx
	.desc
		font-size: 30upx
		color: #666
		text-align: center
		height: 50upx
		line-height: 50upx
	.goods-list
		padding: 20upx 0
		display: flex
		flex-wrap: wrap
		// 两边相等空白
		justify-content: space-around
		// 解决列表落单问题
		&::after
			width: 344upx
			content: ''
		.goods-item
			width: 344upx
			margin-bottom: 20upx
			.goods-img
				width: 100%
				height: 344upx
			.goods-desc
				font-size: 32upx
				color: #666
			.goods-price
				color: red
				font-size: 36upx
		
</style>
