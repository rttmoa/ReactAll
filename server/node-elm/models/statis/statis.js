'use strict';

import mongoose from 'mongoose'
const Schema  = mongoose.Schema;

// ? 统计
const statisSchema = new Schema({
	date: String,
	origin: String,
	id: Number,
})

statisSchema.index({id: 1})

const Statis = mongoose.model('Statis', statisSchema)

export default Statis