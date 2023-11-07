'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

// ? 用户信息
const userInfoSchema = new Schema({
  avatar: { type: String, default: 'default.jpg' }, // ! 头像
  balance: { type: Number, default: 0 }, // ! 平衡
  brand_member_new: { type: Number, default: 0 }, // ! 品牌会员新
  current_address_id: { type: Number, default: 0 }, // ! 当前地址iD
  current_invoice_id: { type: Number, default: 0 }, // ! 当前发票iD
  delivery_card_expire_days: { type: Number, default: 0 }, // ! 送货卡片过期天数
  email: { type: String, default: '' }, // ! 邮箱
  gift_amount: { type: Number, default: 3 }, // ! 礼品金额
  city: String,
  registe_time: String,
  id: Number,
  user_id: Number,
  is_active: { type: Number, default: 1 },
  is_email_valid: { type: Boolean, default: false }, // ! 邮箱是否有效
  is_mobile_valid: { type: Boolean, default: true }, // ! 手机号是否有效
  mobile: { type: String, default: '' }, // ! 手机号
  point: { type: Number, default: 0 },
  username: String,
  column_desc: {
    game_desc: { type: String, default: '玩游戏领红包' },
    game_image_hash: { type: String, default: '05f108ca4e0c543488799f0c7c708cb1jpeg' },
    game_is_show: { type: Number, default: 1 },
    game_link: { type: String, default: 'https://gamecenter.faas.ele.me' },
    gift_mall_desc: { type: String, default: '0元好物在这里' },
  },
})

userInfoSchema.index({ id: 1 })

const UserInfo = mongoose.model('UserInfo', userInfoSchema)

export default UserInfo
