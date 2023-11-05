'use strict';

import express from 'express';
import Entry from '../controller/v2/entry'
import CityHandle from '../controller/v1/cities'
import User from '../controller/v2/user'
const router = express.Router();

router.get('/index_entry', Entry.getEntry); // ! 获取初始数据
router.get('/pois/:geohash', CityHandle.pois); // !! 通过 geohash 获取精确位置
router.post('/login', User.login); // !! 用户登陆
router.get('/signout', User.signout); // ! 退出成功
router.post('/changepassword', User.chanegPassword); // !! 修改密码


export default router