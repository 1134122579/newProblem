<template>
	<view class="home">
		<NavBar />
		<image src="../../static/more/header-bg.png" class="header-bg" mode="widthFix"></image>
		<!-- 头 -->
		<div class="about" v-if="isLoading">

			<view class="header">
				<!-- 信息 -->
				<view class="user-block">
					<view class="user">
						<view class="user-name">
							<view class="name-text">在线刷题</view>
							<view class="name-tag">温岭积分系统</view>
						</view>
					</view>
					<view class="user-icon">
						<image class="header-img" src="/static/problrm/icon.png"></image>
					</view>
				</view>

			</view>
			<!-- 答题 -->
			<!-- 1 单选 2多选 3 填空 4 判断 -->
			<div class="liststyle" v-show="isProblem">
				<div class="content">
					<div class="content-type">
						<div class="type-left">
							{{problemAllList[isProblemNum]|problemType}}
						</div>
						<div class="type-num">
							<div class="problem-num">
								{{isProblemNum+1}}
							</div>
						</div>
						<div class="correct-num">
							正确：{{currentProblem}}
						</div>
					</div>
					<!-- 答题内容========= 单选 判断 多选 -->
					<div class="content-problem">
						<div class="p-title">
							<!-- 		组织地方法人银行按规定向人民银行申请（）的普惠小微
							贷款余额增量的激励资金支持. -->
							{{problemAllList[isProblemNum].title}}
						</div>
						<ul class="p-list">
							<li :class="['p-list-text'+i,'p-list-text',currentStyle(v)]"
								v-for="(v,i) in problemAllList[isProblemNum].ans" :key="v.number" @click="onAnswer(v)">
								{{v.number}}:{{v.content}}
							</li>
							<li class="p-list-text p-button" @click="onNextProblem">
								下一题
							</li>
						</ul>

					</div>

				</div>
				<!-- 题解 -->
				<div class="explanation" v-show="currentYes">
					<div class="explanation-tag">
						题解:{{problemAllList[isProblemNum].right_key}}
					</div>
					<div class="ex-text">
						{{problemAllList[isProblemNum].explain}}
					</div>
				</div>
			</div>
			<!-- 答题卡============================================== -->
			<div class="cardstyle" v-show="!isProblem">
				<div class="content">
					<div class="content-type">
						<div class="type-num">
							答题卡
						</div>
					</div>
					<!-- 答题内容========= 单选 判断 多选 -->
					<div class="content-problem">
						<div :class="['problem-id',v.answer_value?'ok-problem-id':'']" v-for="(v,i) in problemAllList"
							:key="i" @click="onProblemNumber(v,i)">
							{{i+1}}
						</div>
					</div>

				</div>
			</div>

		</div>
		<div class="flooter-bottom">
			<div class="left-botton" @click="onStar">
				<image class="star" src="../../static/problrm/star.png" mode="widthFix"></image>
				<div class="botton-text">
					收藏
				</div>
			</div>
			<div class="right-botton" @click="onCard">
				<image class="card" src="/static/problrm/card.png" mode="widthFix"></image>
				<div class="botton-text">
					答题卡
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar.vue'
	import {
		getTokenApi,
		getProblemList
	} from '@/api/api.js'
	import {
		setToken
	} from '@/utils/auth.js'
	export default {
		data() {
			return {
				isLoading: false, //是否加载成功
				isProblem: true,
				isProblemNum: 0,
				problemAllList: [], //所有题目
				// noProblemList: [], //错误题id
				// correctProblemList: [], //正确题id
			}
		},
		components: {
			NavBar
		},
		onLoad(option) {
			console.log(option, '答题的请求参数')
			let {
				id
			} = option
			this.getProblemList(id)
			// this.getToken()
		},
		computed: {
			// // 计算出题目选项样式
			currentYes() {
				// 1: "单选题",
				// 2: "多选题",
				// 3: "填空题",
				// 4: "判断题"
				let pro = this.problemAllList[this.isProblemNum]
				if (pro?.answer_value) { //判断是否做题
					if (pro['type'] == 1) { //判断题型
						if (pro['answer_value'] != pro['right_key']) {
							return true
						} else {
							return false
						}
					}
				}
				return false
			},
			// 计算答题正确的个数
			currentProblem() {
				return this.problemAllList.filter(item => item.right_key == item.answer_value).length
			}
		},
		filters: {

			problemType(value) {
				let obj = {
					1: "单选题",
					2: "多选题",
					3: "填空题",
					4: "判断题"
				}
				let type = value?.type
				console.log(value)
				return obj[type]
			}
		},
		methods: {

			// 下一题
			onNextProblem() {
				if (this.isProblemNum <= this.problemAllList.length - 2) {
					this.isProblemNum += 1
				} else {
					uni.showToast({
						title: '暂无更多',
						icon: 'none',
						mask: true,
					})
				}
			},
			isComplete(data) {
				console.log(data, '当前题是否完成')
			},
			// 计算出题目选项样式
			currentStyle(data) {
				// 1: "单选题",
				// 2: "多选题",
				// 3: "填空题",
				// 4: "判断题"
				let pro = this.problemAllList[this.isProblemNum]
				if (pro['answer_value']) { //判断是否做题
					if (pro['type'] == 1) { //判断题型
						if (pro['answer_value'] == pro['right_key']) {
							if (pro['answer_value'].includes(data.number)) {
								return ' yse-problem'
							}
						} else {
							if (pro['answer_value'].includes(data.number)) {
								return ' no-problem shake'
							}
						}

					}

				}
			},
			// 单选 判断 点击答案
			onAnswer(v) {
				let problemObj = this.problemAllList[this.isProblemNum]
				let value = problemObj['answer_value']
				console.log(v, v.type, value, '选的项')
				if (problemObj.type == 1 && value) {
					return
				}
				if (value) {
					value = value.split(',')
					let isnumber = value.includes(v.number)
					if (isnumber) {
						value = value.filter(item => item != v.number)
					} else {
						value.push(v.number)
					}
				} else {
					value = []
					value.push(v.number)
				}
				value = value.join(',')
				console.log(value, '结果')
				this.problemAllList[this.isProblemNum]['answer_value'] = value
			},
			// 点击题号
			onProblemNumber(data, index) {
				this.isProblemNum = index
				this.isProblem = true
			},
			onStar() {
				this.isProblem = true
			},
			onCard() {
				this.isProblem = false
			},
			// 获取答题列表
			async getProblemList(chapter_id) {
				uni.showLoading({
					title: '加载中',
					mask: true,
				})
				this.isLoading = false
				let res = await getProblemList({
					chapter_id
				})
				this.problemAllList = res.map(item => {
					item['answer_value'] = ""
					return item
				}).sort((a, b) => a.id - b.id)
				this.isLoading = true
				uni.hideLoading()
			},
			// 获取token
			getToken() {
				getTokenApi().then(res => {
					let {
						token
					} = res
					setToken(token)
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		height: 100vh;
		// padding-bottom: 220rpx;
		position: relative;
		// box-sizing: border-box;

		.header-bg {
			position: relative;
			z-index: -3;
			width: 100%;
			top: 0;
		}

		.about {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			// background: #6A6D79	;
			padding: 31rpx;
			overflow-y: auto;
			padding-bottom: 120rpx;

			.header {
				padding: 180rpx 31rpx 40rpx;
				position: relative;
				z-index: -2;

				.user-block {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;

					.user {
						display: flex;
						justify-content: start;
						align-items: center;



						.user-name {
							padding-left: 20rpx;
							color: #FFFFFF;

							.name-text {
								font-size: 48rpx;
							}

							.name-tag {
								font-size: 22rpx;
								margin-top: 10rpx;
							}
						}
					}

					.header-img {
						width: 187rpx;
						height: 156rpx;
						display: block;
						object-fit: cover;
					}
				}


			}

			// 答题
			.liststyle {
				position: relative;
				z-index: 1;

				&::after {
					content: "";
					z-index: 1;
					display: block;
					height: 10rpx;
					width: 100%;
					background: #333;
					box-shadow: 0 5rpx 15rpx #3974F4;
					border-radius: 10rpx;
					position: absolute;
					top: 0;
					left: 0;
				}

				.content {
					position: relative;
					// border-radius: 20rpx 20rpx 0 0;
					z-index: 1;
					width: 98%;
					background: #FFFFFF;
					margin: 0 auto;
					box-sizing: border-box;
					padding: 20rpx;

					.content-type {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 100%;
						font-size: 28rpx;
						margin-top: 20rpx;

						.type-left {
							width: 120rpx;
							flex-shrink: 0;
							height: 30rpx;
							line-height: 30rpx;
							font-size: 26rpx;
							border-left: 4rpx solid #373737;
							padding-left: 20rpx;
						}

						.type-num {
							width: 97rpx;
							height: 97rpx;
							font-size: 32rpx;
							font-weight: 600;
							box-sizing: border-box;
							border-radius: 50%;
							box-shadow: 0 0 20rpx #ccc;
							padding: 8rpx;
							flex-shrink: 0;

							.problem-num {
								border: 5rpx solid #3974F4;
								width: 100%;
								height: 100%;
								text-align: center;
								line-height: 71rpx;
								border-radius: 50%;
								box-sizing: border-box;
							}
						}

						.correct-num {
							width: 120rpx;
							flex-shrink: 0;
							height: 30rpx;
							line-height: 30rpx;
							font-size: 26rpx;
						}
					}

					.content-problem {
						.p-title {
							font-size: 26rpx;
							font-weight: normal;
							color: #373737;
							line-height: 40rpx;
							margin-top: 24rpx;
						}

						.p-list {
							padding-bottom: 24rpx;
							border-bottom: 1rpx dashed #ccc;

							.uni-data-checklist {
								.checklist-group {
									display: block;

									.checklist-group {
										display: block;

										.checklist-box.is--tag {
											border: none;
											padding: 20rpx 30rpx;
											border-radius: 50rpx;
											background: #F6F5F8;
										}
									}
								}
							}

							.p-list-text {
								width: 100%;
								box-sizing: border-box;
								background: #F6F5F8;
								border-radius: 50rpx;
								// height: 80rpx;
								padding: 20rpx 30rpx;
								margin-top: 24rpx;
							}

							.yse-problem {
								background: #3974F4;
								color: #fff;
							}

							.no-problem {
								background: #ff0000;
								color: #fff;
							}

							// 错误抖动
							.shake {
								animation: shake 800ms ease-in-out;
							}

							@keyframes shake {

								/* 水平抖动，核心代码 */
								10%,
								90% {
									transform: translate3d(-1px, 0, 0);
								}

								20%,
								80% {
									transform: translate3d(+2px, 0, 0);
								}

								30%,
								70% {
									transform: translate3d(-4px, 0, 0);
								}

								40%,
								60% {
									transform: translate3d(+4px, 0, 0);
								}

								50% {
									transform: translate3d(-4px, 0, 0);
								}
							}



							.p-button {
								background: #3974F4;
								color: #FFFFFF;
								text-align: center;
							}
						}
					}

				}

				.explanation {
					padding: 20rpx 0;
					font-size: 24rpx;
					font-weight: normal;
					color: #373737;
					line-height: 34rpx;
				}

			}

			// 答题卡
			.cardstyle {
				position: relative;
				z-index: 1;

				&::after {
					content: "";
					z-index: 1;
					display: block;
					height: 10rpx;
					width: 100%;
					background: #333;
					box-shadow: 0 5rpx 15rpx #3974F4;
					border-radius: 10rpx;
					position: absolute;
					top: 0;
					left: 0;
				}

				.content {
					position: relative;
					// border-radius: 20rpx 20rpx 0 0;
					z-index: 1;
					width: 98%;
					background: #FFFFFF;
					margin: 0 auto;
					box-sizing: border-box;
					padding: 20rpx;

					.content-type {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						font-size: 28rpx;
						margin-top: 20rpx;

						.type-num {
							height: 97rpx;
							font-size: 32rpx;
							line-height: 97rpx;
							font-weight: 600;
							box-sizing: border-box;
							flex-shrink: 0;
						}

					}

					.content-problem {
						display: flex;
						justify-content: flex-start;
						align-items: flex-start;
						flex-wrap: wrap;
						box-sizing: border-box;

						// padding-right:  20rpx;
						.problem-id {
							width: 64rpx;
							height: 64rpx;
							border: 2rpx solid #C4C4C4;
							border-radius: 50%;
							text-align: center;
							line-height: 64rpx;
							flex-shrink: 0;
							color: #3974F4;
							margin-top: 46rpx;
							margin-left: calc((100%-320rpx)/20);
						}

						.ok-problem-id {
							background: #3974F4;
							color: #FFFFFF;
						}
					}

				}

				.explanation {
					padding: 20rpx 0;
					font-size: 24rpx;
					font-weight: normal;
					color: #373737;
					line-height: 34rpx;
				}

			}
		}

		.flooter-bottom {
			position: fixed;
			bottom: 0;
			width: 100%;
			z-index: 5;
			background: #fff;
			box-shadow: 8rpx 0 20rpx #ccc;
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 20rpx 0;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);

			.botton-text {
				font-size: 26rpx;
				margin-top: 14rpx;
				margin-bottom: 10rpx;
			}

			.left-botton {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				box-sizing: border-box;
				width: 50%;

				.star {
					width: 46rpx;
					height: 46rpx;
					display: block;
				}
			}

			.right-botton {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				width: 50%;
				box-sizing: border-box;

				.card {
					width: 46rpx;
					height: 46rpx;
					display: block;
				}
			}
		}

	}

	.type-num {
		position: relative;
		z-index: 2;

		&::after {
			position: absolute;
			z-index: 1;
			content: '';
			display: block;
			background-image: url('@/static/problrm/header_bg.png');
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position: center center;
			width: 300rpx;
			height: 97rpx;
			left: 0;
			right: 0;
			top: 0;
			margin: auto;
			margin-left: -100rpx;
		}
	}
</style>
