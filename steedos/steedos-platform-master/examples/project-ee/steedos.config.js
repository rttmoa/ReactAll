/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-07-26 11:15:13
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-08-29 12:01:01
 * @Description: 
 */
module.exports = {
	// Namespace of nodes to segment your nodes on the same network.
	namespace: "steedos",
	// Default log level for built-in console logger. It can be overwritten in logger options above.
	// Available values: trace, debug, info, warn, error, fatal
	logLevel: "warn",

	// Called after broker started.
	started(broker) {
		broker.createService(require("@steedos/service-enterprise"));
	},
	// 添加settings自定义配置
    settings: {
        sms: {
            qcloud: {
                smsqueue_interval: 1000, //默认1秒轮询一次短信队列
                sdkappid: process.env.STEEDOS_SMS_QCLOUD_SDKAPPID,
                appkey: process.env.STEEDOS_SMS_QCLOUD_APPKEY,
                signname: process.env.STEEDOS_SMS_QCLOUD_SIGNNAME
            }
        }
    }

};
