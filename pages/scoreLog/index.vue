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
							<view class="name-text">{{userinfo.year_score}}</view>
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
						<uni-th width="120rpx" align="center">积分来源</uni-th>
						<uni-th width="120rpx" align="center">积分</uni-th>
						<uni-th width="120rpx" align="center">获取时间</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item,i) in list" :key="i">
						<uni-td align="center">{{item.source}}</uni-td>
						<uni-td align="center">{{item.score}}</uni-td>
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
				<div class="text-content" v-html="rule">
					
				</div>
			</view>
			<div class="mask" @click="maskClick" @touchmove.stop.prevent="moveHandle">
				
			</div>

		</uni-popup>
	</view>
</template>

<script>
	import NavBar from "@/components/NavBar.vue"
	import {
		getMyscoreLog,getScoreRule
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
				rule:'',
				Handle:false
			}
		},
		components: {
			NavBar
		},
		
	
		onShow() {
			this.getMyscoreLog()
			this.userinfo = getDefineToken('userinfo')
			this.getScoreRule()
		},
		methods: {
			getScoreRule(){
					getScoreRule().then(res=>{
						this.rule=res
					})
			},
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
			padding: 40rpx;
			border-radius: 20rpx;
			width: 80vw;
			height: 60vh;
			background: #FFFFFF;
			margin: 0 auto;
			overflow-y: auto;
			box-sizing: border-box;

			.title {
				text-align: center;
				font-size: 30rpx;
				padding: 10rpx 0;
				font-weight: 600;
			}
			.text-content{
				font-size: 26rpx;
				line-height: 1.8;
				color: #585454;
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
		.uni-table-td{
			font-size: 24rpx;
		}

	}
</style>
