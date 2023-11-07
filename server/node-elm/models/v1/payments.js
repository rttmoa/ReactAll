'use strict'

import mongoose from 'mongoose'
import paymentsData from '../../InitData/payments'
const Schema = mongoose.Schema


// ? 付款模式
const paymentsSchema = new Schema({
  description: String, // ! 描述（商家仅支持在线支付、商家不支持货到付款）
  disabled_reason: String, // ! 禁止原因
  id: Number, // ! iD
  is_online_payment: Boolean, // ! 是否在线支付
  name: String, // ! 付款名称（在线支付、货到付款）
  promotion: [], // ! 推广
  select_state: Number, // ! 选定状态
})

const Payments = mongoose.model('Payments', paymentsSchema)

Payments.findOne((err, data) => {
  if (!data) {
    paymentsData.forEach(item => {
      Payments.create(item)
    })
  }
})

export default Payments
