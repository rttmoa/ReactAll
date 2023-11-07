'use strict'

import mongoose from 'mongoose'
import deliveryData from '../../InitData/delivery'
const Schema = mongoose.Schema

// ? 派送 交货
const DeliverySchema = new Schema({
  color: String, // ! 颜色
  id: Number,
  is_solid: Boolean,
  text: String, // ! 蜂鸟专送
})

DeliverySchema.index({ id: 1 })

const Delivery = mongoose.model('Delivery', DeliverySchema)

Delivery.findOne((err, data) => {
  if (!data) {
    Delivery.create(deliveryData)
  }
})

export default Delivery
