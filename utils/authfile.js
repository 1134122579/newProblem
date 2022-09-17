import config from "@/config/auth_config.js"
import { getDefineToken } from './auth'
let Debug=false
export default function initApp() {
	/**
	 * 页面跳转拦截器
	 */
	let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
	list.forEach(item => { //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
		uni.addInterceptor(item, {
			invoke(e) { // 调用前拦截
				//获取用户的token
				const token = uni.getStorageSync('token')
				//token是否已失效
				// let tokenExpired = uni.getStorageSync('token_expired') < Date.now(),
				let tokenExpired = ""
				let userinfo = getDefineToken('userinfo') || ''
				//获取要跳转的页面路径（url去掉"?"和"?"后的参数）
				let url = e.url.split('?')[0];
				let notNeed = config.whiteList.includes(url)
				// 如果在whiteList里面就不需要登录
				if (notNeed) {
					return e
				} else {
					//需要登录
					if (token == '') {
						// uni.showToast({
						// 	title: '请先登录',
						// 	icon: 'none'
						// })
						uni.navigateTo({
							url: config.loginPage
						})
						return false
					} else {
						if (userinfo.is_auth != 1&&url!=config.authPage) {
							uni.showModal({
								title: '提示',
								content: '暂未认证，将跳转认证页面！',
								confirmText: '前往',
								success(res) {
									if (res.confirm) {
										uni.navigateTo({
											url: config.authPage
										})
											
									}
								}
							});
							return false
						}
						return e
					}
				}

			},
			fail(err) { // 失败回调拦截 
				console.log(err);
				if (Debug) {
					console.log(err);
					uni.showModal({
						content: JSON.stringify(err),
						showCancel: false
					});
				}
			},
			complete(e) {}
		})
	})
	//添加uniCloud云函数拦截器
}
