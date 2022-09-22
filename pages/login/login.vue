<template>
	<view class="newcontent flexcolumn">
	<image class="login_bg"  src="/static/login_bg.png" mode="widthFix"></image>
		<view class="logo">
			<!-- <open-data type="userAvatarUrl"></open-data> -->
			<image style="width: 100%;height: 100%;" src="http://cdn.521nuochen.cn/0.png"></image>
		</view>
		<view class="newtitle"> 温岭联合村镇银行</view>
		<view class="buttonSyule ">
			<view class="button_">
				<label >
					<div class="b-style">
						授权登录
					</div>
					<button   @click="getUserProfile" :disabled="disabled"> </button>
				</label>

			</view>
			<view class="button_">
		<label >
			<div class="b-style no-style">
				暂不登录
			</div>
			<button  @click="noUser" > </button>
		</label>
			</view>
		</view>
	</view>
</template>

<script>
	import { wx_mini_login, getUserInfo } from "@/api/api.js"
	import { clearStorageSync} from '../../utils/auth.js'
	import {
		setToken,
		setDefineToken,
		getDefineToken
	} from '@/utils/auth.js'
	export default {
		data() {
			return {
				userInfo: {},
				disabled: false,
				code:''
			}
		},
		methods: {
			noUser() {
				clearStorageSync()
				uni.switchTab({
					url: '/pages/home/home',
				})
				
			},
			getUserProfile(e) {
				let that = this

				this.disabled = true

				uni.login({
					success: res => {
						console.log(res)
						that.code = res.code
						// 发送 res.code 到后台换取 openId, sessionKey, unionId
					}
				})
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				uni.getUserProfile({
					desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					lang: 'zh_CN',
					success: (res) => {
						console.log(res)
						let obj = res
						obj.code = that.code
						console.log(obj)
						uni.showLoading({
							title: '登陆中..',
						})

						wx_mini_login(obj).then(res => {
							// 获取用户信息
							setToken(res.token)
							getUserInfo().then(res => {
								setDefineToken('userinfo',res)
								that.userInfo = res
								uni.hideLoading()
								uni.switchTab({
									url: '/pages/home/home',
								})
							})
						})
					},
					complete: () => {
						that.disabled = false
					}
				})
			},
		}
	}
</script>

<style>
	.newcontent {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background: #FFFFFF;
		position: relative;
		z-index: 1;
	}
	.login_bg{
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.buttonSyule {
		margin: 0 auto;
		width: 45%;
		height: 400rpx;
	}
	.b-style{
		text-align: center;
		font-size: 28rpx;
		font-weight: 500;
		color: #FFFFFF;
		background: #3974F4;
		border-radius: 20rpx;
		height: 90rpx;
		line-height: 90rpx;
	}
	.no-style{
		background: #A1A1A1;
	}

	.logo {
		border-radius: 50%;
		overflow: hidden;
		/* position: absolute; */
		z-index: 2;
		left: 50%;
		bottom: 200rpx;
		width: 160rpx;
		height: 160rpx;
		border-radius: 160rpx;
		/* animation: sway 10s ease-in-out infinite; */
		opacity: .95;
	}

	@keyframes sway {
		0% {
			transform: translate3d(0, 20rpx, 0) rotate(-15deg);
		}

		17% {
			transform: translate3d(0, 0rpx, 0) rotate(25deg);
		}

		34% {
			transform: translate3d(0, -20rpx, 0) rotate(-20deg);
		}

		50% {
			transform: translate3d(0, -10rpx, 0) rotate(15deg);
		}

		67% {
			transform: translate3d(0, 10rpx, 0) rotate(-25deg);
		}

		84% {
			transform: translate3d(0, 15rpx, 0) rotate(15deg);
		}

		100% {
			transform: translate3d(0, 20rpx, 0) rotate(-15deg);
		}
	}

	.newtitle {
		font-weight: 600;
		padding: 50rpx 0;
		font-size: 30rpx;
	}

	.button_ {
		margin: 40rpx 0;
	}
</style>
