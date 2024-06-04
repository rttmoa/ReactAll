drop table transferHistory

-- 转账记录
CREATE TABLE transferHistory (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(50) NOT NULL,
  `from` varchar(20) NOT NULL,
  `fromScan` varchar(200) NOT NULL,
  `to` varchar(20) NOT NULL,
  `toScan` varchar(200) NOT NULL,
  `token`varchar(20) NOT NULL,
  `amount` int(18) NOT NULL,
  `mode` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `cratetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)
