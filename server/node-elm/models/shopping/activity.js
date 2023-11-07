'use strict';

import mongoose from 'mongoose'
import activityData from '../../InitData/activity'
const Schema = mongoose.Schema;


// ? 活动
const activitySchema = new Schema({
	description: String, // ! 描述（已加入“外卖保”计划，食品安全有保障、该商家支持开发票，请在下单时填写好发票抬头）
	icon_color: String, // ! 图标颜色
	icon_name: String, // ! 图标名称（品、保、新、票、付。。。）
	id: Number, // ! iD
	name: String, // ! 活动名称（品牌商家、外卖保、新店、开发票、在线支付。。。）
	ranking_weight: Number // ! 排名权重
})

activitySchema.index({index: 1});

const Activity = mongoose.model('Activity', activitySchema);

Activity.findOne((err, data) => {
	if (!data) {
		activityData.forEach(item => {
			Activity.create(item);
		})
	}
})

export default Activity