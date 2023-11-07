'use strict'

import mongoose from 'mongoose'
import { ratingList, scores, tags } from '../../InitData/rate'
const Schema = mongoose.Schema

// ? 当前餐馆评论数据
const rateSchema = new Schema({
  restaurant_id: Number, // ! 餐馆iD
  ratings: [
    // ! 等级
    {
      avatar: { type: String, default: '' }, // ! 头像
      highlights: [],
      item_ratings: [
        {
          food_id: Number,
          food_name: String,
          image_hash: { type: String, default: '' },
          is_valid: { type: Number, default: 1 },
        },
      ],
      rated_at: String, // ! 评级
      rating_star: Number, // ! 评级-星级
      rating_text: String, // ! 评级-文本
      tags: { type: Array, default: [] }, // ! 标签
      time_spent_desc: String, // ! 花费时间描述
      username: { type: String, default: '匿名用户' },
    },
  ],
  scores: {
    compare_rating: { type: Number, default: 0 }, // ! 比较评级
    deliver_time: { type: Number, default: 0 }, // ! 送达时间
    food_score: { type: Number, default: 0 }, // ! 食物得分
    order_rating_amount: { type: Number, default: 0 }, // ! 订单评级总数
    overall_score: { type: Number, default: 0 }, // ! 全部得分
    service_score: { type: Number, default: 0 }, // ! 服务得分
  },
  tags: [
    {
      count: { type: Number, default: 0 }, // ! 标签数量
      name: String, // ! 标签名称
      unsatisfied: { type: Boolean, default: false }, // ! 不满意
    },
  ],
})

rateSchema.index({ restaurant_id: 1 })

rateSchema.statics.initData = async function (restaurant_id) {
  try {
    const data = await this.findOne({ restaurant_id })
    if (!data) {
      const newRating = {
        restaurant_id,
        ratings: ratingList,
        scores,
        tags,
      }
      await this.create(newRating)
      return true
    } else {
      return false
    }
  } catch (err) {
    console.log('初始化评论数据失败')
    throw new Error(err)
  }
}

rateSchema.statics.getData = async function (restaurant_id, type) {
  try {
    const data = await this.findOne({ restaurant_id }, '-_id')
    if (!data) {
      throw new Error('未找到当前餐馆的评论数据')
    } else {
      return data[type]
    }
  } catch (err) {
    console.log('初始化评论数据失败')
    throw new Error(err)
  }
}

const Rating = mongoose.model('Rating', rateSchema)

export default Rating
