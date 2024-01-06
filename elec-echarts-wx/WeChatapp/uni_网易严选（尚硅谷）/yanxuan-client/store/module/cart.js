import Vue from 'vue'

// 已经存在的,都是响应式的
const state = {
	cartList: [{
			"isSelected": true,
			"count": 2,
			"promId": 0,
			"showPoints": false,
			"itemTagList": [{
				"itemId": 1536001,
				"tagId": 128111157,
				"freshmanExclusive": false,
				"name": "暖冬特惠",
				"subType": 204,
				"forbidJump": false,
				"type": 2
			}],
			"rank": 1,
			"id": 1536001,
			"sellVolume": 3634,
			"primaryPicUrl": "https://yanxuan-item.nosdn.127.net/32b8b2d07b1c4327593a4a70993eeac2.png",
			"soldOut": false,
			"sortFlag": 0,
			"commentCount": 0,
			"onSaleTime": 1538101896296,
			"picMode": 1,
			"commentWithPicCount": 0,
			"underShelf": false,
			"status": 2,
			"couponConflict": true,
			"forbiddenBuy": false,
			"promotionDesc": "暖冬特惠",
			"limitedFlag": 204,
			"pieceNum": 0,
			"itemSizeTableDetailFlag": false,
			"forbidExclusiveCal": false,
			"rewardShareFlag": false,
			"updateTime": 1575894115275,
			"showCommentEntrance": true,
			"pieceUnitDesc": "件",
			"specialPromTag": "",
			"counterPrice": 299,
			"categoryL2Id": 0,
			"retailPrice": 209,
			"primarySkuPreSellPrice": 0,
			"preLimitFlag": 0,
			"itemPromValid": true,
			"promTag": "暖冬特惠",
			"source": 0,
			"points": 0,
			"primarySkuPreSellStatus": 0,
			"extraServiceFlag": 0,
			"flashPageLink": "",
			"autoOnsaleTimeLeft": 0,
			"innerData": {},
			"saleCenterSkuId": 0,
			"pointsStatus": 0,
			"extraPrice": "",
			"colorNum": 0,
			"showTime": 0,
			"autoOnsaleTime": 0,
			"preemptionStatus": 1,
			"isPreemption": 0,
			"zcSearchFlag": false,
			"name": "女式色拉姆内衣套装2.0",
			"appExclusiveFlag": false,
			"itemType": 1,
			"listPicUrl": "https://yanxuan-item.nosdn.127.net/02b61fb5700aed6761b7524d98ed0837.png",
			"pointsPrice": 0,
			"simpleDesc": "色拉姆发热面料，加厚升级",
			"seoTitle": "",
			"newItemFlag": false,
			"buttonType": 0,
			"primarySkuId": 1634105,
			"displaySkuId": 1634104,
			"productPlace": "",
			"itemSizeTableFlag": false
		},
		{
			"isSelected": false,
			"count": 1,
			"promId": 0,
			"showPoints": false,
			"itemTagList": [{
				"itemId": 1562007,
				"tagId": 128111157,
				"freshmanExclusive": false,
				"name": "暖冬特惠",
				"subType": 204,
				"forbidJump": false,
				"type": 2
			}],
			"rank": 1,
			"id": 1562007,
			"sellVolume": 2477,
			"primaryPicUrl": "https://yanxuan-item.nosdn.127.net/eade4561af1081945c35ba934c7348b1.png",
			"soldOut": false,
			"sortFlag": 0,
			"commentCount": 0,
			"onSaleTime": 1536637196215,
			"picMode": 1,
			"commentWithPicCount": 0,
			"underShelf": false,
			"status": 2,
			"couponConflict": true,
			"forbiddenBuy": false,
			"promotionDesc": "暖冬特惠",
			"limitedFlag": 204,
			"pieceNum": 0,
			"itemSizeTableDetailFlag": false,
			"forbidExclusiveCal": false,
			"rewardShareFlag": false,
			"updateTime": 1576742994144,
			"showCommentEntrance": true,
			"pieceUnitDesc": "件",
			"specialPromTag": "",
			"counterPrice": 299,
			"categoryL2Id": 0,
			"retailPrice": 199,
			"primarySkuPreSellPrice": 0,
			"preLimitFlag": 0,
			"itemPromValid": true,
			"promTag": "暖冬特惠",
			"source": 0,
			"points": 0,
			"primarySkuPreSellStatus": 0,
			"extraServiceFlag": 0,
			"flashPageLink": "",
			"autoOnsaleTimeLeft": 0,
			"innerData": {},
			"saleCenterSkuId": 0,
			"pointsStatus": 0,
			"extraPrice": "",
			"colorNum": 4,
			"showTime": 0,
			"autoOnsaleTime": 0,
			"preemptionStatus": 1,
			"isPreemption": 0,
			"zcSearchFlag": false,
			"name": "不扎脖子的柔软，男式可机洗高领羊毛衫",
			"appExclusiveFlag": false,
			"itemType": 1,
			"listPicUrl": "https://yanxuan-item.nosdn.127.net/bb4c991ad08c0b061c083cd7b2f2dd08.png",
			"pointsPrice": 0,
			"simpleDesc": "轻薄打底告别臃肿",
			"seoTitle": "",
			"newItemFlag": false,
			"buttonType": 0,
			"primarySkuId": 1623203,
			"displaySkuId": 1623197,
			"productPlace": "",
			"itemSizeTableFlag": false
		}
	]

}


const mutations = {
	// 修改state数据
	setCartList(state, payload) {
		state.cartList = payload;
	},

	/**
	 *  添加商品数据到购物车列表
	 * @param {Object} state
	 * @param {Object} goodsItem
	 * 1)购物车列表已经有该商品，让原来的商品数量 +1    [].find(item=>item)  findIndex
	 * 2）购物车列表 没有该商品，直接添加购物车  count 1 isSeletctd  true
	 */
	addGoodsMutation(state, goodsItem) {
		const item = state.cartList.find(item => item.id === goodsItem.id)
		console.log(item);
		if (item) {
			// 存在，count+1
			item.count += 1;
		} else {
			//不存在，添加字段
			// goodsItem.count = 1;
			// goodsItem.isSelected = true;
			Vue.set(goodsItem, 'count', 1);
			Vue.set(goodsItem, 'isSelected', true)
			state.cartList.push(goodsItem);
		}

	},
	// 添加、减少商品
	changeCountMutation(state, {
		isAdd,
		index
	}) {
		if (isAdd) {
			// 加
			state.cartList[index].count += 1;
		} else {

			if (state.cartList[index].count > 1) {
				// 减
				state.cartList[index].count -= 1;
			} else {
				wx.showModal({
					title: '提示',
					content: '您确定要删除该商品吗？',
					success(res) {
						if (res.confirm) {
							// 删除
							state.cartList.splice(index, 1)
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			}

		}
	},
	// 修改商品的选中状态
	changeSelectedMutation(state, {
		isSelected,
		index
	}) {
		state.cartList[index].isSelected = isSelected;
	},
	// 全选、全不选
	changeAllSelectedMutation(state, isAllSelected) {
		// 遍历所有商品，让所有商品的状态，跟全选按钮保持一致
		state.cartList.forEach(item => item.isSelected = isAllSelected)
	}
}


const actions = {
	//发送网络请求，

}

const getters = {
	// 是否全选中
	isAllSelected(state) {
		return state.cartList.every(item => item.isSelected)
	},
	// 总数量
	totalCount(state) {
		return state.cartList.reduce((pre, item) => {
			return pre += item.isSelected ? item.count : 0;
		}, 0)
	},
	// 总价格 单价*数量
	totalPrice(state) {
		return state.cartList.reduce((pre, item) => {
			return pre += item.isSelected ? item.count * item.retailPrice : 0;
		}, 0)
	}

}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
