<template>
	<view class="typepage">
		<view class="typelist">
			<view :class="activeId==item.id?'label active-label':'label'" @click="oclabelClick(item)"
				v-for="item in list" :key="item.id">
				{{item.title}}
			</view>
		</view>
		<view class="type-content">
			<view class="type-content-title" @click="goProblemPage(item)" v-for="item in sonlist" :key="item.id">
				{{item.title}}
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getclassify
	} from '@/api/api.js'
	export default {
		data() {
			return {
				activeId: 0,
				list: [],
				show: true,
				sonlist: []
			}
		},
		onLoad() {
			this.getclassify()
		},
		methods: {
			goProblemPage(data) {
				console.log(data)
				uni.navigateTo({
					url: `/pages/chapter/chapter?class_id=${data.id}`
				})
			},
			oclabelClick(data) {
				if (this.activeId != data.id) {
					this.sonlist = data.children
					this.activeId = data.id
				}

			},
			getclassify() {
				getclassify().then(res => {
					this.list = res
					this.sonlist = res[0].children
					this.activeId = res[0].id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.typepage {
		display: flex;
		height: 100vh;
		font-size: 26rpx;
		background: #F5F6FE;

		.typelist {
			width: 218rpx;
			height: 100%;
			box-sizing: border-box;
			text-align: center;
			background-color: #fff;

			.label {
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: 1rpx solid #EEF0F2;
			}

			.active-label {
				background: #F5F6FE;
				color: #3974F4;

				&::before {
					content: '·';
					margin-right: 10rpx;
					font-size: 20rpx;
					line-height: 80rpx;
					font-weight: 600;
				}
			}
		}

		.type-content {
			flex: 1;

			.type-content-title {
				margin: 20rpx auto;
				width: 472rpx;
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 14rpx;
				line-height: 75rpx;
				text-align: center;

			}
		}

	}
</style>
