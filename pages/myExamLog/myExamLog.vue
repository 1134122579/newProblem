<template>
	<view class="home">
		<NavBar title="考试记录" />
		<image src="../../static/more/header-bg.png" class="header-bg" mode="widthFix"></image>
		<div class="about">
			<!-- 头 -->
		<!-- 	<view class="header">
				<view class="user-block">
					<view class="user">
						<image class="header-img" src="/static/more/jfnum.png"></image>
						<view class="user-name">
							<view class="name-text">{{userinfo.score}}</view>
							<view class="name-tag">累计积分</view>
						</view>
					</view>
					<view class="user-icon" @click="onLookGz">
						<view class="gz">
							积分规则
						</view>
						<uni-icons type="help" size="20" color="#fff"></uni-icons>
					</view>
				</view>
			</view> -->
			<!-- 内容 -->
			<div class="content">
				<uni-table stripe emptyText="暂无更多数据">
					<!-- 表头行 -->
					<uni-tr>
						<uni-th width="120rpx" align="center">名称</uni-th>
						<uni-th width="120rpx" align="center">积分</uni-th>
						<uni-th width="140rpx" align="center">时间</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item,i) in list" :key="i">
						<uni-td align="center">{{item.title}}</uni-td>
						<uni-td align="center">{{item.score}}</uni-td>
						<uni-td align="center">{{item.create_time}}</uni-td>
					</uni-tr>
				</uni-table>
			</div>
		</div>
	</view>
</template>

<script>
	import NavBar from "@/components/NavBar.vue"
	import {
		getMyExamLog
	} from '@/api/api.js'
	import {
		setToken,getDefineToken
	} from '@/utils/auth.js'
	export default {
		data() {
			return {
				list: [],
				userinfo:{}
			}
		},
		components: {
			NavBar
		},
		onShow() {
			this.getMyExamLog()
		this.userinfo=getDefineToken('userinfo')
		},
		methods: {
			onLookGz() {
				this.$refs.popup.open()
			},
			getMyExamLog() {
				getMyExamLog().then(res => {
					this.list = res.map(item => {
						item['create_time'] = item['create_time'].split(' ')[0]
						console.log(item['create_time'])
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
		background: #F3F5F7;

		.header-bg {
			position: relative;
			z-index: -3;
			width: 100%;
			top: 0;
		}

		.about {
			position: absolute;
			top: 180rpx;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			// background: #6A6D79	;
			padding: 31rpx;

			.header {
				padding: 180rpx 0 40rpx;
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
							width: 40rpx;
							height: 47rpx;
							display: block;
							object-fit: cover;
						}

						.user-name {
							color: #FFFFFF;
							display: flex;
							align-items: flex-end;

							.name-text {
								padding: 0 20rpx;
								font-size: 56rpx;
								line-height: 1;
							}

							.name-tag {
								font-size: 28rpx;
							}
						}


					}

					.user-icon {
						display: flex;
						justify-content: center;
						align-items: center;

						.gz {
							font-size: 28rpx;
							font-weight: 800;
							color: #FFFFFF;
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

		.uni-table-th {
			font-size: 28rpx;
			font-weight: bold;
			color: #1B1C33;
		}
		.gz-text{
			padding: 20rpx;
			border-radius: 20rpx;
			width: 80vw;
			height: 60vh;
			background: #FFFFFF;
			margin: 0 auto;
			overflow-y:auto;
			.title{
				text-align: center;
				font-size: 30rpx;
				padding: 10rpx 0;
				font-weight: 600;
			}
		}

	}
</style>
