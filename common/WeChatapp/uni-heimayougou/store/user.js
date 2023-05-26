export default {
  // 开启命名空间
  namespaced: true,


  // 数据
  state: () => ({
    // 通过读取本地的收货地址对象，初始化 address 对象
    address: JSON.parse(uni.getStorageSync("address") || "{}"),
    token: uni.getStorageSync("token") || "",
    // 用户的信息对象
    userinfo: JSON.parse(uni.getStorageSync("userinfo") || "{}"),
    // 重定向的 Object 对象
    redirectInfo: null,
  }),

  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address;
      // 持久化存储到本地
      this.commit("m_user/saveAddressToStorage");
    },
    // 定义将 address 持久化存储到本地 mutations 方法
    saveAddressToStorage(state) {
      uni.setStorageSync("address", JSON.stringify(state.address));
    },
    // 用户信息 存储到vuex中
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo;

      this.commit("m_user/saveUserInfoToStorage");
    },
    // 本地持久化存储
    saveUserInfoToStorage(state) {
      uni.setStorageSync("userinfo", JSON.stringify(state.userinfo));
    },
    // token 保存到 vuex 中
    updateToken(state, token) {
      state.token = token;
      this.commit("m_user/saveTokenToStorage");
    },
    // 本地持久化存储
    saveTokenToStorage(state) {
      uni.setStorageSync("token", state.token);
    },
    // 记录结算跳转到登陆页的信息
    updateRedirectInfo(state, info) {
      state.redirectInfo = info;
      console.log(state.redirectInfo);
    },
  },

  getters: {
    // 为了提高代码的复用性，可以把收货地址的详细地址抽离为 getters，方便在多个页面和组件之间实现复用
    // 收货详情地址的计算属性
    addstr(state) {
      if (!state.address.provinceName) return "";

        // 拼接 省市区详细地址的字符串 并返回给用户
      return (
        state.address.provinceName +
        state.address.cityName +
        state.address.countyName +
        state.address.detailInfo
      );
    },
  },
};
