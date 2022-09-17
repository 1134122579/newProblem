<template>
	<view class="home">
		<image src="../../static/more/header-bg.png" class="header-bg" mode="widthFix"></image>
		<div class="about">
			<!-- 头 -->
			<view class="header">
				<!-- 信息 -->
				<view class="user-block" @click="goPage">
					<view class="user">
						<image class="header-img" :src="userinfo.headimgurl||'http://cdn.521nuochen.cn/0.png'"></image>
						<view class="user-name">
							<view class="name-text">{{userinfo.name||"登录/认证"}}</view>
							<view class="name-tag">Hi，欢迎使用温岭联合银行积分系统</view>
						</view>
					</view>
					<view class="user-icon">
						<uni-icons type="forward" size="22" color="#fff"></uni-icons>
					</view>
				</view>
			</view>
			<!-- 内容 -->
			<div class="content">
				<div class="content-type">
					<image src="../../static/home/more.png" mode="widthFix" class="more-icon"></image>
					更多应用
				</div>

				<ul class="block-list">
					<li @click="onscoreLog">
						<image src="../../static/more/jfnum.png" mode="widthFix" class="block-imagsize"></image>
						<div class="title">
							我的积分
						</div>
					</li>
					<li @click="onmyExamLog">
						<image src="../../static/more/ksjl.png" mode="widthFix" class="block-imagsize"></image>
						<div class="title">
							考试记录
						</div>
					</li>
					<li @click="onCollect">
						<image src="../../static/more/kshz.png" mode="widthFix" class="block-imagsize"></image>
						<div class="title">
							考试汇总
						</div>
					</li>
				</ul>
			</div>
			<div class="type-list" @click="goPage">
				<image src="../../static/more/userinfo.png" mode="widthFix" class="more-icon"></image>
				我的信息
			</div>
			<label >
				<button type='default' open-type='contact'></button>
				<div class="type-list">
					<image src="../../static/more/kf.png" mode="widthFix" class="more-icon"></image>
					联系客服
				</div>
			</label>

		</div>
		<tabbar :active="active"></tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/tabbar/tabbar'
	import {
		getTokenApi
	} from '@/api/api.js'
	import {
		setToken,
		getDefineToken
	} from '@/utils/auth.js'
	export default {
		data() {
			return {
				active:'我的',
				userinfo: {}
			}
		},
		components: {
			tabbar
		},
		onLoad() {},
		onShow() {
			// getApp().globalData.tabbar="我的"
			this.userinfo = getDefineToken('userinfo')
		},
		methods: {
			onCollect() {
				uni.navigateTo({
					url: '/pages/collect/collect'
				})
			},
			onmyExamLog() {
				uni.navigateTo({
					url: '/pages/myExamLog/myExamLog'
				})
			},
			onscoreLog() {
				uni.navigateTo({
					url: '/pages/scoreLog/index'
				})
			},

			goPage() {
				uni.navigateTo({
					url: '/pages/userinfo/userinfo'
				})
			},
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
		width: 100%;
		height: 100vh;
		position: relative;
		z-index: 1;
		background: #F3F5F7;

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

			.header {
				padding: 180rpx 0rpx 40rpx;
				box-sizing: border-box;

				.user-block {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;

					.user {
						display: flex;
						justify-content: start;
						align-items: center;

						.header-img {
							width: 120rpx;
							height: 120rpx;
							display: block;
							object-fit: cover;
							border-radius: 50%;
						}

						.user-name {
							padding-left: 20rpx;
							color: #FFFFFF;

							.name-text {
								font-size: 32rpx;
							}

							.name-tag {
								font-size: 22rpx;
								margin-top: 10rpx;
							}
						}
					}
				}

				.jf-num {
					width: 100%;
					height: 172rpx;
					position: relative;

					.jf-bg {
						width: 100%;
						height: 100%;
						position: relative;
						z-index: -1;
						display: block;
						top: 0;
					}

					.num-block {
						position: absolute;
						top: 0%;
						width: 100%;
						font-size: 28rpx;
						height: 100%;
						color: #fff;
						display: flex;
						align-items: center;
						box-sizing: border-box;
						padding: 38rpx 95rpx 0 51rpx;

						.num {
							font-size: 44rpx;
							padding: 0 20rpx;
						}
					}
				}



			}

			.content {
				position: relative;
				border-radius: 20rpx;
				margin-top: -10rpx;
				padding: 31rpx;
				box-sizing: border-box;
				z-index: 1;
				width: 100%;
				background: #FFFFFF;

				.content-type {
					display: flex;
					justify-content: start;
					align-items: center;
					width: 100%;
					font-size: 28rpx;

					.more-icon {
						width: 28rpx;
						height: 28rpx;
						display: block;
						margin-right: 14rpx;
					}
				}

				.block-list {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					flex-wrap: wrap;

					li {
						margin-top: 31rpx;
						width: 188rpx;
						height: 195rpx;
						flex-shrink: 0;
						border-radius: 20rpx;
						background: #F3F5F7;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						box-shadow: 0px 0px 16px 0px rgba(39, 50, 231, 0.04);

						.block-imagsize {
							width: 68rpx;
							height: 78rpx;
							display: block;
						}

						.title {
							font-size: 26rpx;
							margin-top: 30rpx;
						}

						.block-tag {
							font-size: 22rpx;
							color: #6A6D79;
						}

					}
				}
			}

			.type-list {
				display: flex;
				justify-content: start;
				align-items: center;
				width: 100%;
				font-size: 28rpx;
				background: #FFFFFF;
				margin-top: 30rpx;
				border-radius: 20rpx;
				padding: 30rpx;
				box-sizing: border-box;
				box-shadow: 0px 0px 16px 0px rgba(39, 50, 231, 0.04);

				.more-icon {
					width: 28rpx;
					height: 28rpx;
					display: block;
					margin-right: 14rpx;
				}
			}
		}


	}
</style>
