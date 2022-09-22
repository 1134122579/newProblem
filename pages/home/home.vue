<template>
	<view class="home">
		<!-- 头 -->
		<view class="header">
			<!-- 信息 -->
			<view class="user-block" @click="goPage">
				<view class="user">
					<image class="header-img" :src="userinfo.headimgurl||'http://cdn.521nuochen.cn/0.png'"></image>
					<view class="user-name">
						<view class="name-text">{{userinfo.name||'登录/认证'}}</view>
						<view class="name-tag">Hi，欢迎使用温岭联合银行积分系统</view>
					</view>
				</view>
				<view class="user-icon">
					<uni-icons type="forward" size="22" color="#fff"></uni-icons>
				</view>
			</view>
			<!-- 积分总数 -->
			<view class="jf-num">
				<image src="@/static/home/jfph.png" class="jf-bg" mode="widthFix"></image>
				<!-- 积分 -->
				<div class="num-block">
					年度积分:<text class="num">{{userinfo.year_score||"0"}}</text>积分
				</div>
			</view>
		</view>
		<!-- 内容 -->
		<div class="content">
			<div class="content-type">
				<image src="../../static/home/more.png" mode="widthFix" class="more-icon"></image>
				更多应用
			</div>
			<ul class="block-list">
				<li @click="goProblemTypePage">
					<image src="../../static/home/starproblem.png" mode="widthFix" class="block-imagsize"></image>
					<div class="title">
						在线刷题
					</div>
					<div class="block-tag">
						点击查看
					</div>
				</li>
				<li @click="goProblem">
					<image src="../../static/home/start.png" mode="widthFix" class="block-imagsize"></image>
					<div class="title">
						在线考试
					</div>
					<div class="block-tag">
						点击查看
					</div>
				</li>
				<li @click="goScoreLog">
					<image src="../../static/home/jfmx.png" mode="widthFix" class="block-imagsize"></image>
					<div class="title">
						积分明细
					</div>
					<div class="block-tag">
						点击查看
					</div>
				</li>
				<li @click="onRanking">
					<image src="../../static/home/jfbd.png" mode="widthFix" class="block-imagsize"></image>
					<div class="title">
						积分榜单
					</div>
					<div class="block-tag">
						点击查看
					</div>
				</li>
			</ul>
		</div>
		<tabbar :active="active"> </tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/tabbar/tabbar'
	import {
		getExamInfo,
		getUserInfo
	} from '@/api/api.js'
	import {
		setToken,
		getToken,
		setDefineToken,
		getDefineToken
	} from '@/utils/auth.js'
	export default {
		data() {
			return {
				active: '首页',
				userinfo: {}
			}
		},
		components: {
			tabbar
		},
		onLoad() {
			uni.showShareMenu({
				withShareTicket: true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus: ["shareAppMessage", "shareTimeline"]
			})
		},
		onShow() {
			getApp().globalData.tabbar = "首页"
			// this.getToken()
			console.log(121)
			this.getUserInfo()
		},
		methods: {

			goPage() {
				uni.navigateTo({
					url: '/pages/userinfo/userinfo'
				})
			},
			onRanking() {
				uni.navigateTo({
					url: '/pages/Ranking/Ranking'
				})
			},
			goProblemTypePage() {
				uni.navigateTo({
					url: '/pages/problemType/problemType'
				})
			},
			goScoreLog() {
				uni.navigateTo({
					url: '/pages/scoreLog/index'
				})
			},
			goProblem() {
				getExamInfo().then(res => {
					uni.navigateTo({
						url: '/pages/examination/examination'
					})
				})
			},
			getUserInfo() {
				if (getToken()) {
					getUserInfo().then(res => {
						setDefineToken('userinfo', res)
						this.userinfo = res
					})
				}
			}
		},
		onShareAppMessage(res) {
		    return {
		        // title: '', //分享的名称
		        // path: '/pages/hfdt/gztjh',
		        // mpId:'wx6bf107b87c455b99' //此处配置微信小程序的AppId
		    }
		},
		//分享到朋友圈
		onShareTimeline(res) {
		    return {
		        // title: '',
		        // type: 0,
		        // summary: "",
		    }
		},
	}
</script>

<style lang="scss">
	.home {
		width: 100%;
		height: 100vh;
		position: relative;
		background: #F9FAFE;
		box-sizing: border-box;
		overflow: auto;

		.header {
			padding: 180rpx 31rpx 50rpx;
			width: 100%;
			position: relative;
			z-index: 1;
			background-image: url('@/static/home/header-page.png');
			box-sizing: border-box;
			background-size: 100%;
			background-repeat: no-repeat;
			background-position: 0 0;

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
			border-radius: 40rpx 40rpx 0 0;
			margin-top: -40rpx;
			background: #F9FAFE;
			padding: 31rpx;
			box-sizing: border-box;
			z-index: 1;
			margin-bottom: 90rpx;
			width: 100%;

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
					width: 330rpx;
					height: 330rpx;
					flex-shrink: 0;
					border-radius: 20rpx;
					background: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					box-shadow: 0px 0px 16px 0px rgba(39, 50, 231, 0.04);

					.block-imagsize {
						width: 163rpx;
						height: 129rpx;
						display: block;
					}

					.title {
						font-size: 32rpx;
						margin: 20rpx 0;
					}

					.block-tag {
						font-size: 22rpx;
						color: #6A6D79;
					}

				}
			}
		}

	}
</style>
