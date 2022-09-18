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
							{{ problemAllList[isProblemNum] | problemType }}
						</div>
						<div class="type-num">
							<div class="problem-num">{{ isProblemNum + 1 }}</div>
						</div>
						<div class="correct-num">正确：{{ currentProblem }}</div>
					</div>
					<!-- 答题内容========= 单选 判断 多选 -->
					<div class="content-problem" v-show="[1, 2, 4].includes(problemAllList[isProblemNum].type)">
						<div class="p-title">{{ problemAllList[isProblemNum].title }}</div>
						<ul class="p-list">
							<li :class="['p-list-text' + i, 'p-list-text', currentStyle(v)]"
								v-for="(v, i) in problemAllList[isProblemNum].ans" :key="v.number" @click="onAnswer(v)">
								{{ v.number }}:{{ v.content }}
							</li>
							<li class="p-list-text p-button" @click="onNextProblem">下一题</li>
						</ul>
					</div>
					<!-- 填空题 -->
					<div class="content-problem" v-show="[3].includes(problemAllList[isProblemNum].type)">
						<div class="p-title">{{ problemAllList[isProblemNum].title }}</div>
						<div class="p-list">
							<div class="textareaStyle">
								<uni-easyinput :key="problemAllList[isProblemNum].id"
									:disabled="problemAllList[isProblemNum].answer_value" :errorMessage="errorMessage"
									type="textarea" autoHeight v-model="blanksValue" placeholder="请输入答案">
								</uni-easyinput>
							</div>
							<div class="p-list-text p-button" v-if="!problemAllList[isProblemNum].answer_value"
								@click="onBlanksok">
								完成
							</div>
							<div class="p-list-text p-button" v-else @click="onNextProblem">
								下一题
							</div>
						</div>
					</div>
				</div>
				<!-- 题解 -->
				<div class="explanation" v-show="currentYes">
					<div class="explanation-tag">
						正确答案：{{ problemAllList[isProblemNum] |rightKeyFilter}}
					</div>
					<div class="ex-text">题目解释：{{ problemAllList[isProblemNum].explain }}</div>
				</div>
			</div>
			<!-- 答题卡============================================== -->
			<div class="cardstyle" v-show="!isProblem">
				<div class="content">
					<div class="content-type">
						<div class="type-num">答题卡</div>
					</div>
					<!-- 答题内容========= 单选 判断 多选 -->
					<div class="content-problem">
						<div :class="['problem-id', v.answer_value ? 'ok-problem-id' : '']"
							v-for="(v, i) in problemAllList" :key="i" @click="onProblemNumber(v, i)">
							{{ i + 1 }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flooter-bottom">
			<div class="left-botton" @click="onStar">
				<image class="star" src="../../static/problrm/star.png" mode="widthFix"></image>
				<div class="botton-text">答题</div>
			</div>
			<div class="right-botton" @click="onCard">
				<image class="card" src="/static/problrm/card.png" mode="widthFix"></image>
				<div class="botton-text">答题卡</div>
			</div>
		</div>
		<!-- 弹窗 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="提交" title="友情提示"
				:content="'本次答对' + currentProblem + '道题，是否立即提交!'" @confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar.vue';
	import { getTokenApi, subTrainResult, getProblemList } from '@/api/api.js';
	import { setToken } from '@/utils/auth.js';
	export default {
		data() {
			return {
				chapter_id: '', //章节id
				msgType: 'success',
				errorMessage: false, //输入框err
				isStopButton: false, //是否禁止点击选项
				blanksValue: '', //填空题答案
				isLoading: false, //是否加载成功
				isProblem: true,
				isProblemNum: 0,
				problemAllList: [] //所有题目
			};
		},
		components: {
			NavBar
		},
		onLoad(option) {
			console.log(option, '答题的请求参数');
			let { id } = option;
			this.chapter_id = id;
			this.getProblemList(id);
			// this.getToken()
		},
		computed: {
			// 判断是否展示完成按钮
			isBlanks() {
				return true;
				// let pro = this.problemAllList[this.isProblemNum]
				// if (pro.answer_value) {
				// 	if (pro.answer_value == pro.right_key) {
				// 		return false
				// 	}

				// } else [

				// ]
			},
			// // 计算出题目选项样式
			currentYes() {
				// 1: "单选题",
				// 2: "多选题",
				// 3: "填空题",
				// 4: "判断题"
				let pro = this.problemAllList[this.isProblemNum];

				if (pro?.answer_value) {
					//判断是否做题
					if (pro.type != 2) {
						if (pro['answer_value'] != pro['right_key']) {
							return true;
						} else {
							return false;
						}
					} else {
						if (pro['right_key'].includes(pro['answer_value'])) {
							return false;
						} else {
							return true;
						}
					}
				}
				return false;
			},
			// 计算答题正确的个数
			currentProblem() {
				return this.problemAllList.filter(item => item.right_key == item.answer_value).length;
			}
		},
		filters: {
			problemType(value) {
				let obj = {
					1: '单选题',
					2: '多选题',
					3: '填空题',
					4: '判断题'
				};
				let type = value?.type;
				console.log(value);
				return obj[type];
			},
			rightKeyFilter(value) {
				let right_key = value.right_key
				let type = value.type
				if (type == 4) {
					return right_key == 1 ? '正确' : '错误'
				}
				return right_key
			}
		},
		methods: {
			// 提交答题
			dialogConfirm() {
				console.log('点击确认');
				this.messageText = `点击确认了 ${this.msgType} 窗口`;
				let error_ids = this.problemAllList
					.filter(item => item.answer_value && item.right_key != item.answer_value)
					.map(item => item.id);
				let right_ids = this.problemAllList
					.filter(item => item.right_key == item.answer_value)
					.map(item => item.id);
				let data = {
					chapter_id: this.chapter_id,
					error_ids,
					right_ids
				};
				subTrainResult(data).then(res => {
					uni.showToast({
						mask: true,
						title: '提交成功',
						icon: 'none'
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 1500);
				});
			},
			// 完成填空题
			onBlanksok() {
				if (!this.blanksValue) {
					this.errorMessage = true;
					uni.showToast({
						title: '请输入答案',
						icon: 'none'
					})
					return;
				}
				this.problemAllList[this.isProblemNum].answer_value = this.blanksValue;
				if (this.blanksValue == this.problemAllList[this.isProblemNum].right_key) {
					if (this.isProblemNum <= this.problemAllList.length - 2) {
						this.isProblemNum += 1;
						this.isStopButton = false;
						this.blanksValue = '';
					} else {
						uni.showToast({
							title: '暂无更多',
							icon: 'none',
							mask: true
						});
					}
				} else {
					this.disabled = true;
					this.errorMessage = true;
				}
			},

			// 下一题
			onNextProblem() {
				if (this.isProblemNum <= this.problemAllList.length - 2) {
					//判断当前是否是最后一题
					this.isProblemNum += 1;
					this.isStopButton = false;
					let pro = this.problemAllList[this.isProblemNum];
					console.log(this.blanksValue, pro, 1814);
					this.errorMessage = false;
					this.blanksValue = pro['answer_value'] || '';
				} else {
					// uni.showToast({
					// 	title: '暂无更多',
					// 	icon: 'none',
					// 	mask: true,
					// })
					this.$refs.alertDialog.open();
				}
			},
			// 计算出题目选项样式
			currentStyle(data) {
				// 1: "单选题",
				// 2: "多选题",
				// 3: "填空题",
				// 4: "判断题"
				let pro = this.problemAllList[this.isProblemNum];

				if (pro['answer_value']) {
					//判断是否做题
					if (pro['type'] == 1 || pro['type'] == 4) {
						//判断题型
						if (pro['answer_value'] == pro['right_key']) {
							if (pro['answer_value'].includes(data.number)) {
								return ' yse-problem';
							}
						} else {
							if (pro['answer_value'].includes(data.number)) {
								return ' no-problem shake';
							}
						}
						this.isStopButton = true;
					}
					if (pro['type'] == 2) {
						//  多选是否禁止点击
						console.log(pro.right_key, pro['answer_value'], '多选是否禁止点击’');
						if (pro['right_key'].includes(data.number)) {
							if (pro['answer_value'] == pro['right_key']) {
								this.isStopButton = true;
							}
							if (pro['answer_value'].includes(data.number)) {
								return ' yse-problem';
							}
						} else {
							if (pro['answer_value'].includes(data.number)) {
								this.isStopButton = true;
								return ' no-problem shake';
							}
						}
					}
				}
			},
			// 单选 判断 点击答案
			onAnswer(v) {
				let problemObj = this.problemAllList[this.isProblemNum];
				let value = problemObj['answer_value'];
				console.log(v, v.type, value, '选的项');
				// if (problemObj.type == 1 && value) {
				// 	return
				// }
				if (this.isStopButton) {
					return;
				}
				if (value) {
					value = value.split(',');
					let isnumber = value.includes(v.number);
					if (isnumber) {
						value = value.filter(item => item != v.number);
					} else {
						value.push(v.number);
					}
				} else {
					value = [];
					value.push(v.number);
				}
				value = value.sort();
				value = value.join(''); //多选格式
				console.log(value, '结果');
				this.problemAllList[this.isProblemNum]['answer_value'] = value;
				if (problemObj.answer_value == problemObj.right_key) {
					this.onNextProblem();
				}
			},
			// 点击题号
			onProblemNumber(data, index) {
				this.isProblemNum = index;
				this.isProblem = true;
				this.isStopButton = false
				let pro = this.problemAllList[this.isProblemNum];
				if (pro?.type == 3) {
					//判断题型
					this.blanksValue = pro['answer_value'];
				}
			},
			onStar() {
				this.isProblem = true;
			},
			onCard() {
				this.isProblem = false;
			},
			// 获取答题列表
			async getProblemList(chapter_id) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				this.isLoading = false;
				let res = await getProblemList({
					chapter_id
				});
				this.problemAllList = res.map(item => {
					item['answer_value'] = '';
					return item;
				});
				// .sort((a, b) => a.id - b.id)
				this.isLoading = true;
				uni.hideLoading();
			},
			// 获取token
			getToken() {
				getTokenApi().then(res => {
					let { token } = res;
					setToken(token);
				});
			}
		}
	};
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
							color: #ffffff;

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
					content: '';
					z-index: 1;
					display: block;
					height: 10rpx;
					width: 100%;
					background: #333;
					box-shadow: 0 5rpx 15rpx #3974f4;
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
					background: #ffffff;
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
								border: 5rpx solid #3974f4;
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

							.textareaStyle {
								margin-top: 20rpx;
							}

							.uni-data-checklist {
								.checklist-group {
									display: block;

									.checklist-group {
										display: block;

										.checklist-box.is--tag {
											border: none;
											padding: 20rpx 30rpx;
											border-radius: 50rpx;
											background: #f6f5f8;
										}
									}
								}
							}

							.p-list-text {
								width: 100%;
								box-sizing: border-box;
								background: #f6f5f8;
								border-radius: 50rpx;
								// height: 80rpx;
								padding: 20rpx 30rpx;
								margin-top: 24rpx;
							}

							.yse-problem {
								background: #3974f4;
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
								background: #3974f4;
								color: #ffffff;
								text-align: center;
							}
						}
					}
				}

				.explanation {
					padding: 20rpx;
					font-size: 24rpx;
					font-weight: normal;
					color: #373737;
					line-height: 34rpx;

					.explanation-tag {
						font-weight: 600;
					}

					.ex-text {
						margin-top: 14rpx;
					}
				}
			}

			// 答题卡
			.cardstyle {
				position: relative;
				z-index: 1;

				&::after {
					content: '';
					z-index: 1;
					display: block;
					height: 10rpx;
					width: 100%;
					background: #333;
					box-shadow: 0 5rpx 15rpx #3974f4;
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
					background: #ffffff;
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
							border: 2rpx solid #c4c4c4;
							border-radius: 50%;
							text-align: center;
							line-height: 64rpx;
							flex-shrink: 0;
							color: #3974f4;
							margin-top: 46rpx;
							margin-left: calc((100% - 320rpx) / 10);
						}

						.ok-problem-id {
							background: #3974f4;
							color: #ffffff;
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
<style lang="scss">
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.box {
		@include flex;
	}

	.button {
		@include flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 35px;
		margin: 0 5px;
		border-radius: 5px;
	}

	.example-body {
		background-color: #fff;
		padding: 10px 0;
	}

	.button-text {
		color: #fff;
		font-size: 12px;
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.text {
		font-size: 12px;
		color: #333;
	}

	.popup-success {
		color: #fff;
		background-color: #e1f3d8;
	}

	.popup-warn {
		color: #fff;
		background-color: #faecd8;
	}

	.popup-error {
		color: #fff;
		background-color: #fde2e2;
	}

	.popup-info {
		color: #fff;
		background-color: #f2f6fc;
	}

	.success-text {
		color: #09bb07;
	}

	.warn-text {
		color: #e6a23c;
	}

	.error-text {
		color: #f56c6c;
	}

	.info-text {
		color: #909399;
	}

	.dialog,
	.share {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.dialog-box {
		padding: 10px;
	}

	.dialog .button,
	.share .button {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		margin: 0;
		margin-top: 10px;
		padding: 3px 0;
		flex: 1;
	}

	.dialog-text {
		font-size: 14px;
		color: #333;
	}

	//自定义按钮颜色 

	.uni-popup-dialog {
		overflow: hidden;
	}

	.uni-popup-dialog .uni-button-color {
		color: #fff;
	}
</style>
