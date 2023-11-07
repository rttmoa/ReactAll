'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adminSchema = new Schema({
  user_name: String, // ! 用户名
  password: String, // ! 密码
  id: Number, // ! iD
  create_time: String, // ! 创建时间
  admin: { type: String, default: '管理员' }, // ! 管理员
  status: Number, // !  1:普通管理、 2:超级管理员
  avatar: { type: String, default: 'default.jpg' }, // ! 头像
  city: String, // 城市
})

adminSchema.index({ id: 1 })

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
