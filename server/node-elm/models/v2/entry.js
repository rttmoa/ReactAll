'use strict';

import mongoose from 'mongoose'
import entryData from '../../InitData/entry'
const Schema = mongoose.Schema;



const entrySchema = new Schema({
	id: Number, // ! iD
	is_in_serving: Boolean, // ! true
	description: String, // ! 描述 （附近美食一网打尽、苦了累了，来点甜的、0元早餐0起送，每天都有新花样。）
	title: String, // ! 标题（美食、甜品饮品、预定早餐）
	link: String, // ! 链接
	image_url: String, // ! 图片地址
	icon_url: String, // ! 图标地址
	title_color: String // ! 标题颜色
});

const Entry = mongoose.model('Entry', entrySchema)

Entry.findOne((err, data) => {
	if (!data) {
		for (let i = 0; i < entryData.length; i++) {
			Entry.create(entryData[i]);
		}
	}
})

export default Entry