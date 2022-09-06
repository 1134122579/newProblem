// import Vue from 'vue'
import axios from 'axios'
import {
	getToken
} from '@/utils/auth.js'

// create an axios instance
const service = axios.create({
	baseURL: 'https://wldt.nxcsoft.top/api/v1', // url = base url + request url
	//withCredentials: true, // send cookies when cross-domain requests 注意：withCredentials和后端配置的cross跨域不可同时使用
	timeout: 6000, // request timeout
	crossDomain: true
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(config => {
		//添加请求头
		if (getToken()) {
			// 给请求头添加token
			config.headers["token"] =getToken();
		}
		config.headers["app-type"] ='ios';
		return config;
	},
	error => {
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

//配置成功后的拦截器
service.interceptors.response.use(res => {
	res = res.data
	if (res.status !== 200) {
		return uni.showToast({
			title:res.message,
			icon:'none'
		})&& Promise.reject(res.message);
	}
	console.log(res.data); // for debug
	return res.data
}, error => {
	if (error.response.status) {
		switch (error.response.status) {
			case 401:
				break;
			default:
				break;
		}
	}
	return Promise.reject(error)
})

export default service
