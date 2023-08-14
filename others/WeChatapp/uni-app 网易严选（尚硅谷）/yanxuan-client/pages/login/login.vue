<template>
	<view><button open-type="getUserInfo" @tap="getUserProfile">登录</button></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		getUserProfile(e) {
			// 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
			// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
			wx.getUserProfile({
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: res => {
					// avatarUrl    nickName
					console.log(res.userInfo);
					// 保存用户信息；跳转页面：个人中心
					wx.setStorage({
					  key:"userinfo",
					  data:JSON.stringify(res.userInfo)
					})
					// 跳转页面：个人中心 把其他页面都关闭，跳转到某个页面
					wx.reLaunch({
						url:'/pages/personal/personal'
					})
					
				}
			});
		}
	}
};
</script>

<style lang="stylus">

</style>
