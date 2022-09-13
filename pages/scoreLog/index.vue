<template>
	<view class="home" >
		<NavBar title="积分明细" />
		<image src="../../static/more/header-bg.png" class="header-bg" mode="widthFix"></image>
		<div class="about">
			<!-- 头 -->
			<view class="header">
				<!-- 信息 -->
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
			</view>
			<!-- 内容 -->
			<div class="content">
				<uni-table stripe emptyText="暂无更多数据">
					<!-- 表头行 -->
					<uni-tr>
						<uni-th width="120rpx" align="center">积分</uni-th>
						<uni-th width="120rpx" align="center">积分来源</uni-th>
						<uni-th width="120rpx" align="center">获取时间</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item,i) in list" :key="i">
						<uni-td align="center">{{item.score}}</uni-td>
						<uni-td align="center">{{item.source}}</uni-td>
						<uni-td align="center">{{item.create_time}}</uni-td>
					</uni-tr>
				</uni-table>
			</div>
		</div>
		<uni-popup ref="popup" type="center">
			
			<view class="gz-text">
				<div class="title">
					答题规则
				</div>
				　　一、组织机构
				　　主办：中国大学生在线
				　　二、活动内容
				　　本次知识竞赛以线上答题的形式开展，由中国大学生在线平台推出，进行国家安全知识竞答。
				　　三、活动时间
				　　2021年4月14日至20日
				　　四、参赛流程
				　　①点击链接
				　　②微信注册登录
				　　③进入答题页面，点击开始竞赛参与答题
				　　五、答题规则
				　　①选手可以选择人物角色参与竞答，隐藏角色需要达到“黄金安全员”段位才可以解锁。
				　　②竞答每局10道题目，每题10秒的答题时间，答错或者时间结束视为该局淘汰。最后一题为抢答题，速度最快且回答正确的选手胜出，获得“安全精英”称号。选手每答对一题就可以获得10个积分，积分可以对应升级的段位。
				　　③选手在获得全部段位且获得“安全精英”称号后，可申请领取《全国高校学生国家安全知识线上竞答证书》作为认证奖励。
			</view>
			<div class="mask" @click="maskClick" @touchmove.stop.prevent="moveHandle">
				
			</div>

		</uni-popup>
	</view>
</template>

<script>
	import NavBar from "@/components/NavBar.vue"
	import {
		getMyscoreLog
	} from '@/api/api.js'
	import {
		setToken,
		getDefineToken
	} from '@/utils/auth.js'
	export default {
		data() {
			return {
				list: [],
				userinfo: {},
				Handle:false
			}
		},
		components: {
			NavBar
		},
		
	
		onShow() {
			this.getMyscoreLog()
			this.userinfo = getDefineToken('userinfo')
		},
		methods: {
				moveHandle() {
						return this.Handle
					},
			maskClick() {
				this.$refs.popup.close()
				this.Handle=true
			},
			onLookGz() {
				this.$refs.popup.open()
				this.Handle=false

			},
			getMyscoreLog() {
				getMyscoreLog().then(res => {
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
			top: 0;
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

		.gz-text {
			padding: 20rpx;
			border-radius: 20rpx;
			width: 80vw;
			height: 60vh;
			background: #FFFFFF;
			margin: 0 auto;
			overflow-y: auto;

			.title {
				text-align: center;
				font-size: 30rpx;
				padding: 10rpx 0;
				font-weight: 600;
			}
		}
		.mask{
			position:fixed;
			width: 100vw;
			height: 100vh;
			z-index: -1;
			left: 0	;
			top: 0%;
		}

	}
</style>
