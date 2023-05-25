export default {
  namespaced: true,

  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // console.log(findResult)

      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      // console.log(state.cart)

      // 通过 commit 方法，调用m_cart命名空间下的 saveToStoreage方法
      this.commit('m_cart/saveToStorage')
    },
    // 将购物车中的数据持久化存储到本地
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    /**--- 更新购物车中商品的勾选状态 ---**/
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (findResult) {
        findResult.goods_state = goods.goods_state

        this.commit('m_cart/saveToStorage')
      }
    },
    /**--- 更新商品的数量 ---**/
    updateGoodsCount(state, goods) {
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (findResult) {
        // 更新对应的商品数量
        findResult.goods_count = goods.goods_count
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    // 根据 Id 删除对应的商品
    removeGoodsById(state, goods_id) {
      // 传递过来的Id被过滤掉之后 新数组重新存储
      state.cart = state.cart.filter(x => x.goods_id !== goods_id); // 过滤掉传递过来要删除的商品 并 保存

      this.commit('m_cart/saveToStorage')
    },
    /**--- 更新购物车中所有商品的勾选状态 ---**/
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)

      this.commit('m_cart/saveToStorage')
    }
  },

  getters: {
    // 购物车中所有商品的总数量
    total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return c

      // 循环统计商品的数量，累加到变量 c 中
      return state.cart.reduce((total, item) => total += item.goods_count, 0)
    },
    /**--- 购物车中已勾选商品的总数量 ---**/
    checkedCount(state) {
      // reduce的返回值就是已勾选的商品总数量
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    /**--- 已勾选商品的总价格 ---**/
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
    }
  }
}
