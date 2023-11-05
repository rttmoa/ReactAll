'use strict';

import express from 'express';
import Explain from '../controller/v3/explain'
const router = express.Router();

router.get('/profile/explain', Explain.getExpalin) // ! 获取服务中心数据

export default router