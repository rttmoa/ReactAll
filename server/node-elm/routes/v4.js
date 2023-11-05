'use strict';

import express from 'express';
import Food from '../controller/shopping/shop'
const router = express.Router();

router.get('/restaurants', Food.searchResaturant); // !! 搜索餐馆

export default router