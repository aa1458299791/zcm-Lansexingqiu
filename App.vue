<script>
	import {
		postRefreshToken
	} from '@/request/login.js'

	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.init()
		},
		onShow: function() {
			console.log('App Show')
			setInterval(() => {
				console.log('启动获取token定时器')
				this.init()
			}, 2 * 60 * 1000)
		},
		onHide: function() {
			console.log('App Hide')
			
		},
		methods: {
			init() {
				// 获取token
				const token = uni.getStorageSync('token')
				if (token) {
					const data = {
						refreshToken: token.refresh_token,
					}
					postRefreshToken(data).then(res => {
						console.log(res[1])
						const {
							statusCode,
							data
						} = res[1]
						if (statusCode === 200) {
							// this.$successToast('重新获取token成功')
							uni.setStorageSync('token', data)
							this.$store.commit('OBTAIN_TOKEN', data)
						} else {
							uni.$u.toast('登录数据获取失败，请重新登录！');
							uni.navigateTo({
								url: '/pages/LoginPage/index'
							})
							// this.errorStatus = false
						}

					})
				} else {
					uni.$u.toast('请重新登录！');
					uni.navigateTo({
						url: '/pages/LoginPage/index'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
