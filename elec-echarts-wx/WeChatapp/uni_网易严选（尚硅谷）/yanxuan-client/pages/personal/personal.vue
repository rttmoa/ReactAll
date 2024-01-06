<template>
	<view class="personal-container">
		<view class="header">
			<!-- 已登录 -->
			<template v-if="userinfo.nickName">
				<image class="user-img" :src="userinfo.avatarUrl" mode=""></image>
				<view class="user-info">{{ userinfo.nickName }}</view>
				<button @click="exit">退出登录</button>
			</template>

			<!-- 未登录 -->
			<template v-else>
				<image class="user-img" src="/static/images/personal/personal.png" mode=""></image>
				<view class="user-info" @click="toLogin">去登录吧</view>
				<!-- <navigator url="" open-type=""></navigator> -->
			</template>
		</view>
		<view class="">
			微信登陆流程演示
			<button @click="login">登陆</button>
		</view>
	</view>
</template>

<script>
import req from '@/api/request.js';
export default {
	data() {
		return {
			userinfo: {} //用户信息
		};
	},
	created() {
		wx.getStorage({
			key: 'userinfo',
			success: res => {
				console.log(res);
				if (res.data) {
					this.userinfo = JSON.parse(res.data);
				}
			}
		});
	},
	methods: {
		toLogin() {
			// 去登录页
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		// 退出登录
		exit() {
			// 清空用户信息
			wx.setStorage({
				key: 'userinfo',
				data: ''
			});
			// 去登录页
			wx.reLaunch({
				url: '/pages/login/login'
			});
		},
		login() {
			// 1、从微信服务器获取用户登录凭证code（wx.login()）
			wx.login({
				success: async res => {
					if (res.code) {
						let code = res.code;
						console.log(code);
						// 2、将code发送给开发服务器(自己的服务器)
						try {
							const res = await req('/getOpenId',{code});
							console.log('=====',res);
						} catch (e) {
							//TODO handle the exception
						}
					} else {
						console.log('登录失败！' + res.errMsg);
					}
				}
			});
		}
	}
};
</script>

<style lang="stylus">
.personal-container
	.header
		height 200upx
		line-height 200upx
		background-color #EED7B5
		display flex
		align-items center
		.user-img
			margin 40upx
			width 100upx
			height 100upx
			border-radius 50%
</style>
