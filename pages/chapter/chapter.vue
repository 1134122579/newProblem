<template>
	<view class="chapter">
		<div :class="index+1==list.length?'chapter-block border-no':'chapter-block'" v-for="(item,index) in list"
			:key="item.id">
			<div class="block-left">
				<div class="title">
					{{item.title}}
				</div>
				<div class="num">
					<span :style="item.train_num>0&&'color:#3974F4'">{{item.train_num}}</span>/{{item.num}}
				</div>
				<view class="progress-box">
					<progress :percent="item.pgNum" show-info stroke-width="3" font-size="24rpx" activeColor="#3974F4"
						backgroundColor="#F5F6FE;" />
				</view>
			</div>
			<div class="block-right" @click="goProblemPage(item)">
				开始刷题
			</div>

		</div>
	</view>
</template>

<script>
	import {
		getChapter
	} from '@/api/api.js'
	export default {
		data() {
			return {
				list: [],
				class_id:''
			}
		},
		onLoad({
			class_id
		}) {
			this.class_id=class_id
		},
		onShow() {
			this.getChapter()
		},
		methods: {
			goProblemPage(data) {
				uni.navigateTo({
					url: `/pages/problems/index?id=${data.id}`
				})
			},
			getChapter() {
				let class_id=this.class_id
				getChapter({
					class_id
				}).then(res => {
					console.log(res, '章节列表')
					this.list = res.map(item => {
						item['pgNum'] = Math.round(item.train_num / item.num * 100) 
						return item
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.chapter {
		height: 100vh;
		padding-top: 20rpx;
		box-sizing: border-box;

		.chapter-block {
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			margin: 40rpx;
			border-bottom: 1rpx solid #F5F6FE;
			position: relative;

			&::before {
				content: '';
				display: block;
				width: 20rpx;
				height: 20rpx;
				background: #3974F4;
				border-radius: 50%;
				position: absolute;
				left: -20rpx;
				top: 33rpx;
			}

			&::after {
				content: '';
				display: block;
				width: 4rpx;
				height: 180rpx;
				background: #F5F6FE;
				position: absolute;
				left: -15rpx;
				top: 63rpx;
			}


			.block-left {
				flex: 1;

				.title {
					font-size: 28rpx;
					font-weight: 600;
				}

				.num {
					font-size: 24rpx;
					color: #C4C4C4;
					margin: 20rpx 0;
				}
			}

			.block-right {
				flex-shrink: 0;
				padding-left: 30rpx;
				color: #3974F4;
				font-size: 28rpx;
			}
		}

		.border-no {
			&::after {
				display: none;
			}
		}
	}
</style>
