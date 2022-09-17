<template>
	<view class="tabbar">
		<lb-tabbar v-model="active" @change="handleChange" :height="height" :icon-size="iconsize" :text-size="textsize">
			<lb-tabbar-item v-for="item in tabbars" :key="item.name" :name="item.name" @click="onTaber(item)"
				:icon="active === item.name ? item.iconActive : item.icon">
				{{ item.text }}
			</lb-tabbar-item>
		</lb-tabbar>
	</view>
</template>

<script>
	let App=getApp()
	export default {
		props:['active'],
		data() {
			return {
				height: "90rpx",
				iconsize: '44rpx',
				textsize:'24rpx',
				tabbars: [{
						name: '首页',
						text: '首页',
						pagePath: "/pages/home/home",
						icon: '/static/tabbar/home.png',
						iconActive: '/static/tabbar/home-s.png'
					},
					{
						name: '我的',
						text: '我的',
						pagePath: "/pages/about/about",
						icon: '/static/tabbar/about.png',
						iconActive: '/static/tabbar/about-s.png'
					},
				]
			}
		},
		methods: {
			handleChange(e) {
				console.log('change::', e)

			},
			onTaber(e) {
				App.globalData.active=e.name
				console.log('onTaber::', e)
				uni.switchTab({
					url: e.pagePath
				})
			}
		}
	}
</script>

<style lang="scss">
	.tabbar {
		position: fixed;
		bottom: 0;
		z-index: 99;

		.lb-tabbar {

			& .lb-tabbar-content {
				z-index: 99;
			}
		}
	}
</style>
