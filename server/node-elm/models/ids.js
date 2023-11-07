'use strict';

import mongoose from 'mongoose'

// ? 所有 iD 主键
const idsSchema = new mongoose.Schema({
	restaurant_id: Number, // ! 餐馆 iD
	food_id: Number, // ! 食物 iD
	order_id: Number, // ! 订单 iD
	user_id: Number, // ! 用户 iD
	address_id: Number, // ! 地址 iD
	cart_id: Number, // ! 购物车 iD
	img_id: Number, // ! 图片 iD
	category_id: Number, // ! 类别 iD
	item_id: Number, // ! 物品 iD
	sku_id: Number,  // ! 库存单位 iD
	admin_id: Number, // ! 管理员 iD
	statis_id: Number, // ! 统计数据 iD
});

const Ids = mongoose.model('Ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
			restaurant_id: 0,
			food_id: 0,
			order_id: 0,
			user_id: 0,
			address_id: 0,
			cart_id: 0,
			img_id: 0,
			category_id: 0,
			item_id: 0,
			sku_id: 0, 
			admin_id: 0,
			statis_id: 0,
		});
		newIds.save();
	}
})
export default Ids