import request from '@/utils/request.js'

// 获取token
export function getTokenApi(data) {
	return request({
		url: '/getToken',
		method: 'get',
		params: data
	})
}
// 答题分类
export function getclassify(data) {
	return request({
		url: '/getclassify',
		method: 'get',
		params: data
	})
}
// 答题章节
export function getChapter(data) {
	return request({
		url: '/getChapter',
		method: 'post',
		data
	})
}
// h获取章节题目列表
export function getProblemList(data) {
	return request({
		url: '/getChapterProblem',
		method: 'post',
		data
	})
}
