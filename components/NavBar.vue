<template>
	<view class="nav-bar" :style="'top:'+MenuButtonObj.top+'px'">
		<uni-nav-bar :height="MenuButtonObj.height" :border="false" @clickLeft="back" :backgroundColor="backgroundColor" left-icon="left"
			right-icon="cart" :color="color" :title="title" />
	</view>
</template>

<script>
	export default {
		name: "navBar",
		props: {
			title: {
				type: String,
				default: ''
			},
			backgroundColor: {
				type: String,
				default: 'rgba(255,255,255,0)'
			},
			color: {
				type: String,
				default: '#fff'
			}
		},
		data() {
			return {
				MenuButtonObj: {
					bottom: 80,
					height: 32,
					left: 281,
					right: 368,
					top: 48,
					width: 87
				},
			};
		},
		created() {
			this.getHeight()
		},
		methods: {
			back() {
				console.log(getCurrentPages())
				// 处理兼容，如果没有上一级界面则返回首页
				const pages = getCurrentPages();
				if (pages.length === 2) {
					uni.navigateBack({
						delta: 1
					});
				} else if (pages.length === 1) {
					uni.switchTab({
						url: '/pages/home/home',
					})
				} else {
					uni.navigateBack({
						delta: 1
					});
				}
			},
			// 获取微信右上角胶囊高度
			getHeight() {
				let res = wx.getMenuButtonBoundingClientRect();
				console.log(res, '胶囊参数')
				this.MenuButtonObj = res
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		position: fixed;
		width: 100%;
		z-index: 99;
	}
</style>
