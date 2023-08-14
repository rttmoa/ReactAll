import config from './config.js'

export default (url, data = {}, method = 'GET') => {

	return new Promise((resolve, reject) => {
		uni.request({
			url: config.host + url, // 小程序。
			// url,  // '/api/getIndexData'  //H5
			data,
			success: (res) => {
				// 成功
				resolve(res.data)
			},
			fail: (err) => {
				// 失败
				reject(err)
			}
		})
	})

}
