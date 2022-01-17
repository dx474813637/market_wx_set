
import Request from './luch-request/index.js'


const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = 'http://market.netsun.testwebsite.cn/' /* 根域名不同 */
	config.header = {
		...config.header,
		'content-type': 'application/x-www-form-urlencoded',
		// 'appid': 10000,
		// 'appsecret': '7923FoGlaAlRnbpfl+lepwzh/2lVLDAnb8gyRDSpJKX6TJLW9CTXfW4',
		// 'xcxlogin': extConfig.attr.login,
		// 'xcxappid': extConfig.attr.wxappid,
	}
	return config
})


http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
	
	return config
}, (config) => {
	return Promise.reject(config)
})


http.interceptors.response.use(async (response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	
	if (response.hasOwnProperty('data')) {
		if (response.data.code != 1) {
			if (response.data.msg) {
				uni.showToast({
					title: response.data.msg,
					icon: 'none',
					mask: true,
					duration: 1000
				})
			}
		}
	} 
	return response
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	// console.log(response)
	uni.showToast({
		title: response.errMsg,
		icon: 'none'
	})
	return Promise.reject(response)
})

export {
	http
}
