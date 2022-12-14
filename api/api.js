import request from '@/utils/request.js'

// 获取token
export function getTokenApi(data) {
	return request({
		url: '/getToken',
		method: 'get',
		params: data
	})
}
export function wx_mini_login(data) {
	return request({
		url: '/wx_mini_login',
		method: 'post',
		data
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

//积分明细
export function getMyscoreLog(data) {
	return request({
		url: '/getMyscoreLog',
		method: 'get',
		data
	})
}
// 获取考试
export function getExamProblem(data) {
	return request({
		url: '/getExamProblem',
		method: 'get',
		data
	})
}
// 获取考试
export function getExam(data) {
	return request({
		url: '/getExam',
		method: 'get',
		data
	})
}

// 获取用户信息
export function getUserInfo(data) {
	return request({
		url: '/getUserInfo',
		method: 'get',
		data
	})
}
// 获取用户信息
export function getMyExamLog(data) {
	return request({
		url: '/getMyExamLog',
		method: 'get',
		data
	})
}

// 获取用户信息
export function editUserInfo(data) {
	return request({
		url: '/editUserInfo',
		method: 'post',
		data
	})
}

//排行榜
export function getReport(data) {
	return request({
		url: '/getReport',
		method: 'get',
		data
	})
}

export function getScoreRule(data) {
	return request({
		url: '/getScoreRule',
		method: 'get',
		data
	})
}

export function subTrainResult(data) {
	return request({
		url: '/subTrainResult',
		method: 'post',
		data
	})
}
export function getExamInfo(data) {
	return request({
		url: '/getExamInfo',
		method: 'get',
		data
	})
}

export function subExamResult(data) {
	return request({
		url: '/subExamResult',
		method: 'post',
		data
	})
}
