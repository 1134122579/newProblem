<template>
	<view class="home">
		<NavBar title="考试记录" />
		<image src="../../static/more/header-bg.png" class="header-bg" mode="widthFix"></image>
		<div class="list" v-if="list.length>0">
			<div class="block-list" v-for="item in list" :key="item.id">
				<div class="title">{{ item.title }}</div>
				<div class="block-time">
					<div class="time-left">
						<div class="time-text">开始时间</div>
						<div class="time-y">
							{{ item.start_time[0] }}
						</div>
						<div class="time-d">
							{{ item.start_time[1] }}
						</div>
					</div>
					<div class="time-content">
						<image src="/static/sl-icon.png" class="sl-icon" mode="widthFix"></image>
					</div>
					<div class="time-left">
						<div class="time-text">结束时间</div>
						<div class="time-y">
							{{ item.end_time[0] }}
						</div>
						<div class="time-d">
							{{ item.end_time[1] }}
						</div>
					</div>
				</div>
				<div class="block-time">
					<div class="time-left time-r">
						<div>
							<div class="time-text">总分</div>
							<div class="time-y">{{ item.all_score }}分</div>
						</div>
						<div class="score">
							<div class="time-text">成绩</div>
							<div class="time-y">{{ item.score }}分</div>
						</div>

					</div>
					<div class="time-left">
						<div class="gd-time">规定时间：{{ item.minute }}分钟</div>
					</div>
				</div>
			</div>
		</div>
		<div class="list" v-else>
			 <div class="emty">
				 <image class="emtyimg" src="/static/kong.png" mode="widthFix"></image>
				 <div>暂无记录</div>
			 </div>
		</div>
	</view>
</template>

<script>
	import NavBar from "@/components/NavBar.vue";
	import { getMyExamLog } from "@/api/api.js";
	import { setToken } from "@/utils/auth.js";
	export default {
		data() {
			return {
				list: [],
			};
		},
		components: {
			NavBar,
		},
		onShow() {
			this.getMyExamLog();
		},
		methods: {
			getMyExamLog() {
				getMyExamLog().then((res) => {
					console.log(res, "考试汇总");
					this.list = res.map((item) => {
						item["end_time"] = item["end_time"].split(" ");
						item["start_time"] = item["start_time"].split(" ");
						return item;
					});
				});
			},
		},
	};
</script>

<style lang="scss">
	.home {
		width: 100%;
		height: 100vh;
		position: relative;
		z-index: 1;
		background: #f3f5f7;

		.header-bg {
			position: relative;
			z-index: -3;
			width: 100%;
			top: 0;
		}

		.list {
			position: absolute;
			top: 180rpx;
			z-index: 2;
			padding: 20rpx;
			width: 100%;
			box-sizing: border-box;

			.title {
				font-size: 28rpx;
				font-weight: bold;
				color: #150b47;
			}

			.block-list {
				background: #fff;
				width: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				margin-bottom: 20rpx;

				.block-time {
					margin-top: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.time-content {
						display: flex;
						justify-content: center;
						align-items: center;
						position: relative;
						z-index: 2;

						&::after {
							content: "";
							position: absolute;
							z-index: 1;
							width: 200rpx;
							border-bottom: 1rpx solid #f6f6fe;
						}

						.sl-icon {
							width: 35rpx;
							height: 35rpx;
							position: relative;
							z-index: 2;

							&::after {
								content: "";
								position: absolute;
								left: -50rpx;
								top: 0;
								z-index: 2;
								background: #ff0000;
								width: 10rpx;
								height: 10rpx;
								border-radius: 50%;
								border-bottom: 1rpx solid #f6f6fe;
							}
						}
					}

					.time-left {
						font-size: 26rpx;
						font-weight: bold;
						color: #150b47;
						line-height: 30rpx;

						.time-text {
							font-size: 22rpx;
							color: #736d91;
							margin-bottom: 5rpx;
						}

						.gd-time {
							background: #f6f6fe;
							border-radius: 23rpx;
							padding: 5rpx 18rpx;
							font-size: 24rpx;
							font-weight: 500;
							color: #150b47;
						}
					}
					.time-r{
						display: flex;
						align-items: center;
						justify-content: flex-start;
						.score{
							margin-left: 40rpx;
							.time-y{
								color: #ff0000;
							}
							
						}
					}
				}
			}
		}
		.emty{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			font-size: 26rpx;
			color: #736d91;
			margin: 0 auto;
			width: 60vw;
			.emtyimg{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
