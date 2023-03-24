create database egg_house;

use egg_house;

-- 用户表
create table `user`(
  `id` int not null auto_increment,
  `username` varchar(20) default null comment '用户名',
  `password` varchar(64) default null comment '密码',
  `avatar` longtext comment '头像',
  `phone` varchar(20) default null comment '电话',
  `sign` varchar(300) default null comment '用户签名',
  `createTime` timestamp default null comment '创建时间',
  `updateTime` timestamp default null comment '更新时间',
  primary key(`id`)
)engine=InnoDB auto_increment=1 default charset=utf8 comment='用户表';

-- 民宿表
create table `house`(
  `id` int not null auto_increment,
  `name` varchar(50) default null comment '房屋名称',
  `info` varchar(150) default null comment '房屋简介',
  `addres` varchar(200) default null comment '房屋地址',
  `price` int default null comment '房屋价格',
  `publishTime` timestamp default null comment '发布时间',
  `cityCode` varchar(10) not null comment '城市编码',
  `showCount` int(5) not null default 0 comment '展示次数',
  `startTime` timestamp default null comment '开始出租时间',
  `endTime` timestamp default null comment '出租结束时间',
  primary key(`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment='房屋表';

-- 图片表
create table `imgs`(
  `id` int not null auto_increment,
  `url` varchar(500) default null comment '图片地址',
  `houseId` int not null comment '房屋id',
  `createTime` timestamp default null comment '创建时间',
  primary key(`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment='图片表';

-- 评论表
create table `comment`(
  `id` int not null auto_increment,
  `userId` int not null comment '用户表id',
  `houseId` int not null comment '房屋表id',
  `msg` varchar(500) default null comment '评论内容',
  `createTime` timestamp default null comment '创建时间',
  primary key(`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment='评论表';

INSERT INTO `house` VALUES 
(1,'东城民宿','东区 临近地铁','东城区',200,'2020-08-10 13:37:57','10001',1,'2020-08-10 13:37:57','2020-10-20 13:37:57'),
(2,'西城民宿','西区 临近地铁','西城区',100,'2020-08-10 13:38:23','10001',1,'2020-08-10 13:37:57','2020-11-10 13:37:57'),
(3,'新区民宿','新区民宿位置优越','新城区',150,'2020-08-10 13:38:23','10001',0,'2020-08-10 13:37:57','2020-12-10 13:37:57'),
(4,'老城民宿','老城区风景秀美','老城区',100,'2020-08-10 13:38:23','10001',0,'2020-08-10 13:37:57','2020-12-10 13:37:57'),
(5,'西苑民宿','西苑风景秀美','西城区',100,'2020-08-10 13:38:23','10001',0,'2020-08-10 13:37:57','2020-11-10 13:37:57'),
(6,'紫金巷民宿','紧邻老城区风景秀美','东城区',120,'2020-08-10 13:38:23','10001',0,'2020-08-10 13:37:57','2020-11-10 13:37:57'),
(7,'北戴河民宿','风景秀美适合放松身心','北城区',100,'2020-08-10 13:38:23','10002',0,'2020-08-10 13:37:57','2020-12-10 13:37:57'),
(8,'南苑民宿','南苑民宿风景秀美','东城区',150,'2020-08-10 13:38:23','10001',0,'2020-08-10 13:37:57','2020-10-10 13:37:57'),
(9,'北苑民宿','北苑民宿风景秀美','北城区',100,'2020-08-10 13:38:23','10002',0,'2020-08-10 13:37:57','2020-12-10 13:37:57'),
(10,'三厢和民宿','紧邻地铁交通方便','东城区',200,'2020-08-10 13:38:23','10003',0,'2020-08-10 13:37:57','2020-10-10 13:37:57'),
(11,'老城区民宿','老城区风景秀美','老城区',100,'2020-08-10 13:38:23','10001',0,'2020-08-10 13:37:57','2020-12-10 13:37:57'),
(12,'老城区民宿','老城区风景秀美','老城区',100,'2020-08-10 13:38:23','10001',0,'2020-08-10 13:37:57','2020-12-10 13:37:57'),
(13,'老城区民宿','老城区风景秀美','老城区',100,'2020-08-10 13:38:23','10001',0,'2020-08-10 13:37:57','2020-12-10 13:37:57'),
(14,'老城区民宿','老城区风景秀美','老城区',100,'2020-08-10 13:38:23','10001',0,'2020-08-10 13:37:57','2020-12-10 13:37:57'),
(15,'老城区民宿','老城区风景秀美','老城区',100,'2020-08-10 13:38:23','10001',0,'2020-08-10 13:37:57','2020-12-10 13:37:57');

INSERT INTO `imgs` VALUES
(1,'http://img3.mukewang.com/szimg/5d1032ab08719e0906000338-360-202.jpg',1,'2020-08-11 13:37:57'),
(2,'http://img2.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',1,'2020-08-11 13:37:57'),
(3,'http://img2.mukewang.com/szimg/5ad05dc00001eae705400300-360-202.jpg',1,'2020-08-11 13:37:57'),
(4,'http://img1.mukewang.com/szimg/5a1f65a900015d1505400300-360-202.jpg',2,'2020-08-11 13:37:57'),
(5,'https://img3.mukewang.com/szimg/5f3cdd710925166812000676-360-202.png',2,'2020-08-11 13:37:57'),
(6,'https://img4.mukewang.com/szimg/5f20e20109429b5f12000676-360-202.png',3,'2020-08-11 13:37:57'),
(7,'http://img3.mukewang.com/szimg/5d1032ab08719e0906000338-360-202.jpg',4,'2020-08-11 13:37:57'),
(8,'http://img2.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',5,'2020-08-11 13:37:57'),
(9,'http://img2.mukewang.com/szimg/5ad05dc00001eae705400300-360-202.jpg',6,'2020-08-11 13:37:57'),
(10,'http://img1.mukewang.com/szimg/5a1f65a900015d1505400300-360-202.jpg',7,'2020-08-11 13:37:57'),
(11,'https://img3.mukewang.com/szimg/5f3cdd710925166812000676-360-202.png',8,'2020-08-11 13:37:57'),
(12,'https://img4.mukewang.com/szimg/5f20e20109429b5f12000676-360-202.png',9,'2020-08-11 13:37:57'),
(13,'http://img3.mukewang.com/szimg/5d1032ab08719e0906000338-360-202.jpg',10,'2020-08-11 13:37:57'),
(14,'http://img2.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',11,'2020-08-11 13:37:57'),
(15,'http://img2.mukewang.com/szimg/5ad05dc00001eae705400300-360-202.jpg',12,'2020-08-11 13:37:57'),
(16,'http://img1.mukewang.com/szimg/5a1f65a900015d1505400300-360-202.jpg',13,'2020-08-11 13:37:57'),
(17,'https://img3.mukewang.com/szimg/5f3cdd710925166812000676-360-202.png',14,'2020-08-11 13:37:57'),
(18,'https://img4.mukewang.com/szimg/5f20e20109429b5f12000676-360-202.png',15,'2020-08-11 13:37:57')
;

-- 订单表
create table `orders`(
  `id` int not null auto_increment,
  `orderNumber` varchar(20) default null comment '订单编号',
  `userId` int not null comment '用户id',
  `houseId` int not null comment '房屋id',
  `isPayed` int default 0 comment '是否支付，0未支付，1已支付',
  `createTime` timestamp default null comment '创建时间',
  `updateTime` timestamp default null comment '更新时间',
  primary key(`id`)
)engine=InnoDB auto_increment=1 default charset=utf8 comment='订单表';

