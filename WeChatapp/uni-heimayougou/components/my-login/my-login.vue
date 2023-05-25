<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button
      type="primary"
      class="btn-login"
      open-type="getUserInfo"
      @getuserinfo="getUserInfo"
    >
      一键登录
    </button>
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>
<!-- 
  用户登陆页面：
    1、用户信息页面渲染
    2、分析登陆功能的实现思路
    ...结算后三秒自动跳转根据redirect重定向到跳转页
 -->
 
<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    // 调用 mapState 辅助方法， 把 m_user模块中的数据映射到当前用组件中使用
    ...mapState("m_user", ["redirectInfo"]),
  },
  methods: {
    ...mapMutations("m_user", [
      "updateUserInfo",
      "updateToken",
      "updateRedirectInfo",
    ]),
    // 用户授权之后，获取用户的基本信息
    getUserInfo(e) {
      // console.log("登陆信息", e)

      // 如果没有授权
      if (e.detail.errMsg === "getUserInfo:fail auth deny")
        return uni.$showMsg("您取消了登录授权！");

      // updateUserInfo函数会将数据存储到Store中， 并且存储到localstoreage中
      // 查看控制台中Storeage是否存储成功 - 可以删除Storage中的userinfo查看
      // console.log(e.detail.userInfo)
      this.updateUserInfo(e.detail.userInfo); // 更新用户信息

      // 后台中接口需要的数据：https://www.showdoc.com.cn/128719739414963/2612400282844951
      this.getToken(e.detail);
    },
    // 调用登陆接口， 换取永久的 token
    async getToken(info) {
      // 获取 code 对应的值
      const [err, res] = await uni.login().catch((err) => err);
      console.log(res);

      if (err || res.errMsg !== "login:ok") {
        return uni.$showMsg("登录失败！");
      }
      // console.log(res)

      // 准备参数
      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature,
      };
      // console.log(query)

      const { data: loginResult } = await uni.$http.post(
        "/api/public/v1/users/wxlogin",
        query
      );
      console.log(loginResult);
      if (loginResult.meta.status !== 200) return uni.$showMsg("登录失败！");
      // console.log(123)

      // 直接把 token 保存到 vuex 中 并保存到localstoreage中
      // 查看控制台中Storeage是否存储成功
      this.updateToken(loginResult.message.token);

      // 判断vuex中的redirectInfo是否为null
      // 如果不为null，则登陆成功之后，需要重新导航到对应的页面
      this.navigateBack();
    },
    // 返回登陆之前的页面
    navigateBack() {
      // redirectInfo 不为 null， 并且导航方式为 switchTab
      if (this.redirectInfo && this.redirectInfo.openType === "switchTab") {
        // 调用小程序提供的 uni.switchTab() API 进行页面的导航
        uni.switchTab({
          // 要导航的页面地址
          url: this.redirectInfo.from,
          // 导航完成之后，把vuex中的 redirectInfo 对象重置为 null
          complete: () => {
            this.updateRedirectInfo(null);
          },
        });
      }
    },
  },
};
</script>

<style lang="scss">
.login-container {
  height: 750rpx;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: " ";
    display: block;
    width: 100%;
    height: 40px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 100%;
    transform: translateY(50%);
  }

  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
