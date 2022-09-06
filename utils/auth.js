const TokenKey = 'token';
// 认证令牌
export function getToken() {
	return uni.getStorageSync(TokenKey)
}

export function setToken(token) {
	return uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
	return uni.removeStorageSync(TokenKey)
}
// 自定义本地存储
/**
 * name 名称
 */
export function getDefineToken(name) {
	return uni.getStorageSync(name)
}
/**
 * name 名称
 * key 值
 */
export function setDefineToken(name,key) {
	return uni.setStorageSync(name, key)
}
/**
 * 清除本地指定储存
 * name 名称
 * key 值
 */
export function removeDefineToken(name) {
	return uni.removeStorageSync(name)
}