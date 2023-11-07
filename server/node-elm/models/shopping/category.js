'use strict'

import mongoose from 'mongoose'
import categoryData from '../../InitData/category'
const Schema = mongoose.Schema

// ? 类别
const categorySchema = new Schema({
  count: Number, // ! 数量
  id: Number,
  ids: [], // ! [207, 220, 260, 233, 239, 244, 248, 252]
  image_url: String,
  level: Number,
  name: String, // ! 分类名称 （全部商家、快餐便当、鲜花蛋糕、果蔬生鲜、异国料理、甜品饮品）
  sub_categories: [
    // ! 子分类
    {
      count: Number, // ! 数量
      id: Number, // ! iD
      image_url: String, // ! 图片地址
      level: Number, // ! 等级
      name: String, // ! 名称（简餐、盖浇饭、麻辣烫、饺子混沌、汉堡、生煎。。。）
    },
  ],
})

categorySchema.statics.addCategory = async function (type) {
  const categoryName = type.split('/')
  try {
    const allcate = await this.findOne()
    const subcate = await this.findOne({ name: categoryName[0] })
    allcate.count++
    subcate.count++
    subcate.sub_categories.map(item => {
      if (item.name == categoryName[1]) {
        return item.count++
      }
    })
    await allcate.save()
    await subcate.save()
    console.log('保存cetegroy成功')
    return
  } catch (err) {
    console.log('保存cetegroy失败')
    throw new Error(err)
  }
}

const Category = mongoose.model('Category', categorySchema)

Category.findOne((err, data) => {
  if (!data) {
    for (let i = 0; i < categoryData.length; i++) {
      Category.create(categoryData[i])
    }
  }
})

export default Category
