import App from './App'
import axios from '/utils/request.js';
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// 在main.js中放入这段自定义适配器的代码，就可以实现uniapp的app和小程序开发中能使用axios进行跨域网络请求，并支持携带cookie
axios.defaults.adapter = function(config) {
		return new Promise((resolve, reject) => {
			console.log(config)
			var settle = require('axios/lib/core/settle');
			var buildURL = require('axios/lib/helpers/buildURL');
			uni.request({
				method: config.method.toUpperCase(),
				url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
				header: config.headers,
				data: config.data,
				dataType: config.dataType,
				responseType: config.responseType,
				sslVerify: config.sslVerify,
				complete: function complete(response) {
					console.log("执行完成：", response)
					response = {
						data: response.data,
						status: response.statusCode,
						errMsg: response.errMsg,
						header: response.header,
						config: config
					};
					settle(resolve, reject, response);
				}
			})
		})
		Vue.prototype.$axios = axios;
		const app = new Vue({
			...App
		})
		app.$mount()
		// #endif

		// #ifdef VUE3
		// import {
		// 	createSSRApp
		// } from 'vue'
		// export function createApp() {
		// 	const app = createSSRApp(App)
		// 	return {
		// 		app
		// 	}
		// }
		// #endif
