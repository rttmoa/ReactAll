import Vue from 'vue'
import Vuex from 'vuex'
import home from './module/home.js'
import cart from './module/cart.js'

Vue.use(Vuex)

const store=new Vuex.Store({
	modules:{
		home,
		cart
	}
})

export default store;