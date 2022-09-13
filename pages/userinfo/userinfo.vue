<template>
	<view class="home">
		<div class="type-label">
			个人信息
		</div>
		<div class="about">
			<div class="type-list">
				<div class="left">
					<image src="../../static/userinfo/name.png" mode="widthFix" class="more-icon"></image>
					姓名
				</div>
				<input class="uni-input" placeholder-style="color:#333;" placeholder="输入名字"
					v-model="userinfo.name" />
			</div>
			<div class="type-list">
				<div class="left">
					<image src="../../static/userinfo/phone.png" mode="widthFix" class="more-icon"></image>
					手机号
				</div>
				<input class="uni-input" placeholder-style="color:#333;" v-model="userinfo.mobile"
					placeholder="输入手机号" />
			</div>
			<div class="type-list">
				<div class="left">
					<image src="../../static/userinfo/bm.png" mode="widthFix" class="more-icon"></image>
					部门职位
				</div>
				<input class="uni-input" placeholder-style="color:#333;" placeholder="输入部门"
					v-model="userinfo.department" />
			</div>
		</div>
		<div class="button-style" @click="edit">
			提交
		</div>
	</view>
</template>

<script>
	import {
		getTokenApi,editUserInfo
	} from '@/api/api.js'
	import {
		setToken,
		getDefineToken
	} from '@/utils/auth.js'
	let time
	export default {
		data() {
			return {
				userinfo: {}
			}
		},
		components: {

		},
		onLoad() {
		
		},
		onShow() {
			this.userinfo = getDefineToken('userinfo')
		},
		destroyed() {
			clearTimeout(time)
		},
		methods: {
			edit(){
				let {department,mobile,name}=this.userinfo
					editUserInfo({department,mobile,name}).then(res=>{
						console.log(res,'信息修改成功')
						uni.showToast({
							title:'修改成功',
							icon:'none'
						})
						time=setTimeout(()=>{
							uni.navigateBack()
						},1500)
					})
			},
			
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

		.type-label {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #1B1C33;
			padding: 0 30rpx;
		}

		.about {
			padding: 0 31rpx 30rpx;

			.type-list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				font-size: 28rpx;
				background: #FFFFFF;
				margin-top: 30rpx;
				border-radius: 20rpx;
				padding: 30rpx;
				box-sizing: border-box;
				box-shadow: 0px 0px 16px 0px rgba(39, 50, 231, 0.04);

				.left {
					display: flex;
					justify-content: start;
					align-items: center;

					.more-icon {
						width: 28rpx;
						height: 28rpx;
						display: block;
						margin-right: 14rpx;
					}

				}

				.uni-input {
					flex: 1;
					box-sizing: border-box;
					padding-left: 30rpx;
					text-align: right;

				}

			}
		}

		.button-style {
			width: 627rpx;
			height: 80rpx;
			background: #3974F4;
			border-radius: 40rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
			margin: 0 auto;
			font-size: 28rpx;
		}


	}
</style>
