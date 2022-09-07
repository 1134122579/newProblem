<template>
	<view class="home">
		<NavBar />
		<image src="../../static/more/header-bg.png" class="header-bg" mode="widthFix"></image>
		<!-- 头 -->
		<div class="about">

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
			<!-- 内容 -->
			<div class="liststyle">
				<div class="content">
					<div class="content-type">
						<image src="../../static/home/more.png" mode="widthFix" class="more-icon"></image>
						更多应用
					</div>

					<ul class="block-list">
						<li>
							<image src="../../static/home/starproblem.png" mode="widthFix" class="block-imagsize">
							</image>
							<div class="title">
								开始刷题
							</div>
							<div class="block-tag">
								点击查看
							</div>
						</li>
						<li>
							<image src="../../static/home/start.png" mode="widthFix" class="block-imagsize"></image>
							<div class="title">
								开始考试
							</div>
							<div class="block-tag">
								点击查看
							</div>
						</li>
						<li>
							<image src="../../static/home/jfmx.png" mode="widthFix" class="block-imagsize"></image>
							<div class="title">
								积分明细
							</div>
							<div class="block-tag">
								点击查看
							</div>
						</li>
						<li>
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
			</div>
		</div>

	</view>
</template>

<script>
	import NavBar from '@/components/NavBar.vue'
	import {
		getTokenApi
	} from '@/api/api.js'
	import {
		setToken
	} from '@/utils/auth.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components: {
			NavBar
		},
		onLoad() {
			this.getToken()
		},
		methods: {
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
		position: relative;

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
		}


	}
</style>
