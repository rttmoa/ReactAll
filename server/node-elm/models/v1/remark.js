'use strict';

import mongoose from 'mongoose'
import remarkData from '../../InitData/remark'
const Schema  = mongoose.Schema;


// ? 备注
const remarkSchema = new Schema({
	remarks: [], // ! 备注； [['不要辣', '少点辣', '多点辣'], ['不要香菜'], ['不要洋葱'], ['多点醋'], ['多点葱'], ['去冰', '少冰']]
})


const Remark = mongoose.model('Remark', remarkSchema);

Remark.findOne((err, data) => {
	if(!data){
		Remark.create(remarkData)
	}
})
export default Remark