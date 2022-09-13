<template>
	<view class="home">
		<div class="block-num">
			<image src="/static/rank/header.png" class="block-bg" mode="widthFix"></image>
			<div class="num-header">
				<div class="left">
					<image src="/static/rank/jf.png" mode="widthFix" class="num-icon"></image>
					<div class="lect-text">
						<div class="num-title">

							年度积分
						</div>
						<div class="num">
							<span class="n-text">{{userinfo.score}}</span>积分
						</div>
					</div>
				</div>

				<div class="right">
					<image src="/static/rank/jf-icon.png" mode="widthFix" class="right-icon"></image>
				</div>
			</div>
			<div class="header-bottom">
				<div class="h-b">
					<div class="h-b-t">
						{{userinfo.score}}
					</div>
					<div class="h-b-tag">
						今日积分
					</div>
				</div>
				<div class="h-b border">
					<div class="h-b-t">
						{{userinfo.year_score}}
					</div>
					<div class="h-b-tag">
						本年积分
					</div>
				</div>
				<div class="h-b">
					<div class="h-b-t">
					{{userinfo.last_year_score}}
					</div>
					<div class="h-b-tag">
						上年积分
					</div>
				</div>
			</div>

		</div>
		<div class="list">
			<div class="list-title">
				<image src="/static/rank/jb.png" class="title-icon" mode="widthFix"></image>
				<div class="title">
					全行学习榜
				</div>
				<div class="tag">
					相同积分按姓氏笔画排名
				</div>
			</div>
			<div class="list-content">
				<div :class="['list-c-b',index%2==0?'list-bg':'']" v-for="(item,index) in list" :key="index">
					<div class="index">
						{{index+1}}
					</div>
					<div class="name">
						<image :src="item.headimgurl" mode="widthFix" class="header-img"></image>
						<div class="user-name">
							{{item.name}}
						</div>
					</div>
					<div class="num">
						{{item.all_score}}分
					</div>

				</div>
			</div>
		</div>
		</div>

	</view>
</template>

<script>
	import NavBar from "@/components/NavBar.vue"
	import {
		getDefineToken
	} from '@/utils/auth.js'
	import {
		getReport
	} from '@/api/api.js'
	export default {
		data() {
			return {
				list: [],
				userinfo: {}
			}
		},
		components: {
			NavBar
		},
		onShow() {
			this.getReport()
			this.userinfo = getDefineToken('userinfo')
		},
		methods: {
			getReport() {
				getReport().then(res => {
					console.log(res, '考试汇总')
					this.list = res.map(item => {

						return item
					})
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
		background: #fff;

		.block-num {
			width: 100%;
			height: 391rpx;
			border-radius: 10rpx;
			position: relative;
			z-index: 2;

			.block-bg {
				position: absolute;
				width: 100%;
				z-index: 1;
				top: 0;
				left: 0;
			}

			.num-header {
				display: flex;
				justify-content: space-between;
				position: relative;
				z-index: 2;
				padding: 40rpx 57rpx;
				color: #fff;

				.left {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;

					.num-icon {
						width: 29rpx;
						height: 34rpx;
						margin-right: 20rpx;
						margin-top: 10rpx;
					}

					.num-title {}

					.num {
						margin-top: 30rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						.n-text {
							font-size: 52rpx;
							font-weight: bold;
							color: #FFFFFF;
							margin-right: 14rpx;

						}
					}
				}

				.right {
					flex-shrink: 0;
					width: 151rpx;

					.right-icon {
						width: 100%;
					}
				}
			}

			.header-bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				z-index: 2;
				padding: 0 57rpx;

				.h-b {
					width: 33%;
					flex-shrink: 0;
					height: 120rpx;
					text-align: center;
					color: #FFFFFF;

					.h-b-tag {
						font-size: 22rpx;
						color: #7B89FF;

					}

					.h-b-t {
						font-size: 30rpx;
						margin-top: 10rpx;
						margin-bottom: 30rpx;
						font-weight: 600;
					}
				}

				.border {
					border-left: 1rpx solid #7B89FF;
					border-right: 1rpx solid #7B89FF;
				}
			}



		}

		.list {
			width: 100%;
			box-sizing: border-box;
			padding: 20rpx;

			.list-title {
				display: flex;
				justify-content: flex-start;
				align-items: flex-end;
				margin-bottom: 20	rpx;

				.title-icon {
					width: 40rpx;
					height: 50rpx;
				}

				.title {
					font-size: 32rpx;
					font-weight: 800;
					color: #373737;
					margin: 0 14rpx;
				}

				.tag {
					font-size: 24rpx;
					font-weight: 500;
					color: #686868;
				}
			}

			.list-content {
				width: 100%;

				.list-c-b {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 110rpx;
					text-align: center;

					.name {
						flex-shrink: 0;
						width: 220rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.header-img {
							width: 50rpx;
							height: 50rpx;
							border-radius: 50%;
							margin-right: 10rpx;
						}

						.user-name {
							font-weight: 400;
							color: #000000;
							font-size: 32rpx;
							line-height: 38rpx;
						}
					}

					.index {
						flex-shrink: 0;
						width: 172rpx;
					}

					.num {
						flex-shrink: 0;
						width: 153rpx;
						font-size: 26rpx;
						color: #2834E8;
					}
				}

				.list-bg {
					background: #F9F8F9;
				}
			}

		}

	}
</style>
