DROP TABLE IF EXISTS transferHistory;

-- 转账记录
CREATE TABLE transferHistory (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addressFrom` varchar(50) NOT NULL,
  `addressTo` varchar(50) NOT NULL,
  `chainFrom` varchar(20) NOT NULL,
  `hashFrom` varchar(200) NOT NULL,
  `chainTo` varchar(20) NOT NULL,
  `hashTo` varchar(200) NOT NULL,
  `tokenSymbol` varchar(20) NOT NULL,
  `tokenAmount` float(18) NOT NULL,
  `mode` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `cratetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- 转账记录
CREATE TABLE tokenBalanceHistory (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tokenAddress` varchar(50) NOT NULL,
  `contractAddress` varchar(50) NOT NULL,
  `tokenName` varchar(20) NOT NULL,
  `chainName` varchar(20) NOT NULL,
  `balance` float(18) NOT NULL,
  `cratetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

--白名单 
CREATE TABLE whiteList (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `walletAddress` varchar(50) NOT NULL,
  `cratetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)