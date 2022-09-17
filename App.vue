<script>
	 import initApp from "@/utils/authfile.js"
	export default {
		globalData: { //使用全局储存信息
			version: '',
			versionCode: '',
			tabbar:'首页'
		},
		onLaunch: function() {
			initApp()
			console.log(initApp(),'999999')
		},
		onShow: function() {
			console.log('App Show')
			this.getAppInfo()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 获取应用信息 热更新
			getAppInfo() {
				let getUpdateManager=uni.canIUse('getUpdateManager')
				if (getUpdateManager) {
					const updateManager = uni.getUpdateManager()
					updateManager.onCheckForUpdate(function(res) {
						console.log(res,"resresresres")
						if (res.hasUpdate) {
							updateManager.onUpdateReady(function() {
								uni.showModal({
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success: function(res) {
										if (res.confirm) {
											updateManager.applyUpdate()
										}
									}
								})
							})
							updateManager.onUpdateFailed(function() {
								uni.showModal({
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
								})
							})
						}
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
					})
				}
			}

		}
	}
</script>

<style>
	/*每个页面公共css */
	/* //自定义弹窗按钮颜色 */
	.uni-dialog-button{
		background:#f6f5f8 ;
	}
	.uni-border-left{
		background: #659EF8;
	}
	.uni-dialog-content{
		height: 250rpx;
	}
</style>
