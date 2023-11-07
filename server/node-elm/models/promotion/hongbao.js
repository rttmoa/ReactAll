'use strict'

import mongoose from 'mongoose'
import hongbaoData from '../../InitData/hongbao'

const Schema = mongoose.Schema;

// ? 红包
const hongbaoSchema = new Schema({
	id: Number, // ! iD
	sn: String, // ! 序列号
	user_id: Number, // ! 用户iD
	amount: Number, // ! 金额
	sum_condition: Number, // ! 求和条件
	name: String, // ! 红包名称
	phone: String, // ! 手机号
	begin_date: String, // ! 开始日期
	end_date: String, // ! 结束日期
	description_map: { // ! 红包描述信息
		phone: String, // ! 限手机号为。。。
		online_paid_only: String, // ! 限在线支付使用
		validity_delta: String, // ! 有效日期
		validity_periods: String, // ! 有效日期
		sum_condition: String // ! 满足条件
	},
	limit_map: {},
	status: Number, // ! 状态
	present_status: Number, // ! 当前状态
	share_status: Number, // ! 分享状态
})

hongbaoSchema.index({id: 1});

const Hongbao = mongoose.model('Hongbao', hongbaoSchema);

Hongbao.findOne((err, data) => {
	if (!data) {
		hongbaoData.forEach(item => {
			Hongbao.create(item)
		})
	}
})

export default  Hongbao