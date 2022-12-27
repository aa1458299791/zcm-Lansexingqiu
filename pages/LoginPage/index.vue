<template>
	<view class="login_page">
		<!-- 上 -->
		<view style="width: 100%;text-align: center;">
			<!-- 图片 -->
			<view style="margin-top: 20px;">
				<image src="../../static/images/lxq.jpg" style="width: 150px;height: 150px;margin: 0 auto;"></image>
			</view>
			<!-- text -->
			<view style="margin-top: 10px;font-size: 22px;  font-weight: bold;color: #54C9DC;">连接每一位享受生活的年轻人</view>
		</view>
		<!-- 下 -->
		<view v-if="isSwitch === 1">
			<view style="padding: 20px;margin-top: 30px;">
				<!-- 手机号码 -->
				<view style="display: flex;align-content: space-between;align-items: center;">
					<image src="../../static/images/sj.png" style="width: 20px ;height: 20px;margin-right: 10px;">
					</image>
					手机号码
				</view>
				<!-- 数字 -->
				<view style="display: flex;margin: 10px 0;">
					<uni-data-select v-model="value" :localdata="range" :clear="false" @change="change">
					</uni-data-select>
					<u--input placeholder="请输入号码" border="surround" v-model="value1" @change="change1"
						style="margin-right: 110px;"></u--input>
				</view>
				<!-- 登录 -->
				<view style="display: flex;justify-content: space-between;color: #25D2D0;">
					<!-- 密码 -->
					<view>密码登录</view>
					<!-- 问题 -->
					<view>登录遇到问题</view>
				</view>
				<!-- 获取/登录 -->

				<view style="margin: 15px 0;">
					<u-toast ref="uToast"></u-toast>
					<u-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-code>
					<u-button @tap="getCode" style="background-color: #25D2D0;border-radius: 30px;color: white;">
						{{tips}}
					</u-button>
				</view>
				<!-- 协议 -->
				<view style="color:#25D2D0 ; font-size: 12px;display: flex;justify-content: space-between;">
					<!-- 同意 -->
					<view>
						<u-radio-group v-model="value2" @change="groupChange">
							<u-radio activeColor="#25D2D0" label="我已阅读并同意" @change="radioChange"></u-radio>
						</u-radio-group>
					</view>
					<!-- 政策 -->
					<view class="">
						用户协议和隐私政策
					</view>
				</view>

			</view>
			<!-- 底部 -->
			<view style="text-align: center;position: fixed;bottom: 20px;left: calc(50% - 20px);">
				<image src="../../static/images/wx.png" style="width: 50px;height: 50px;"></image>
			</view>
		</view>
		<!-- 验证码界面 -->
		<view v-else style="padding: 20px;margin-top: 30px;">
			<!-- 验证码 -->
			<view style="display: flex;">
				<u-icon name="checkmark-circle" style="margin-right: 15px;"></u-icon>验证码
			</view>
			<!-- 输入框 -->
			<view style="margin-top: 15px;">
				<view v-if="!errorStatus"
					style="display: flex;justify-content: space-around;font-size: 10px;color: #25D2D0;"
					@click="againInput"
					>
					<view>重新输入手机号</view>
					<view>验证码错误</view>
				</view>
				<view>
					<InputBox @verification="verification" :value1="value1"></InputBox>
				</view>
			</view>
			<!-- 重新获取 -->
			<view style="margin-top: -50px;">
				<u-toast ref="uToast"></u-toast>
				<u-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-code>
				<u-button @tap="getCode" style="background-color: #25D2D0;border-radius: 30px;color: white;">{{tips}}
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		postVerification,
		postSubmitVerification
	} from '@/request/login.js'
	import InputBox from '@/pages/components/InputBox.vue'
	export default {
		name: 'LoginPage',
		components: {
			InputBox
		},
		data() {
			return {
				errorStatus: true, // 验证错误
				tips: '',
				// refCode: null,
				seconds: 60, // 倒计时
				isSwitch: 1,
				value: 0,
				value1: '15296131512', // 号码
				value2: '', // 同意
				range: [{
						value: 0,
						text: "+86"
					},
					{
						value: 1,
						text: "+520"
					},

				],
			};
		},
		onReady() {
			// 注意这里不能将一个组件赋值给data的一个变量，否则在微信小程序会
			// 造成循环引用而报错，如果你想这样做，请在非data中定义refCode变量
			// this.refCode = this.$refs.uCode;
		},
		methods: {
			// 重新输入手机号
			againInput(){
				this.errorStatus = true
				this.isSwitch = 1
			},
			// 验证码
			verification(text) {
				console.log('接收的', text)
				// const user = {
				// 	token: '123'
				// }
				// uni.setStorageSync('userInfo', user)
				// console.log(uni.getStorageSync('userInfo'))
				const data = {
					phoneNumber: this.value1,
					authenticationCode: text
				}
				postSubmitVerification(data).then(res => {
					console.log(res[1])
					const {
						statusCode,
						data
					} = res[1]
					if (statusCode === 200) {
						this.$successToast('登录成功')
						uni.setStorageSync('token', data)
						this.$store.commit('OBTAIN_TOKEN',data)
						uni.reLaunch({
								url: '/pages/HomePage/index'
							});
					} else {
						this.errorStatus = false
					}

				})
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.value1 !== '') {
					// uni.reLaunch({
					// 		url: '/pages/HomePage/index'
					// 	});
					if (this.$refs.uCode.canGetCode) {

						uni.showLoading({
							title: '正在获取验证码'
						})
						setTimeout(() => {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							uni.$u.toast('验证码已发送');
							const data = {
								phoneNumber: this.value1
							}
							console.log('登录')
							postVerification(data).then(res => {
								console.log(res)
								const {
									statusCode
								} = res[1]
								if (statusCode === 201) {
									this.isSwitch = 2
									uni.$u.toast('验证码已发送');
								} else {
									this.$errorToast('获取失败~，请重试')
								}
							})
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}, 2000);
					} else {
						uni.$u.toast('倒计时结束后再发送');
					}
				} else {
					this.$errorToast('请重新输入')
				}
			},
			end() {
				// uni.$u.toast('倒计时结束');
			},
			start() {
				// uni.$u.toast('倒计时开始');
			},
			// 获取验证码
			obtainVerification() {
				this.$successToast('获取成功~')
				this.value1 = ''
				this.isSwitch = 2
				// const data = {
				// 	clientId: 'blue-planet.frontend',
				// 	clientSecret: 'gR2fnkMJJj8WCSHMs19OQXwealWWPRVf',
				// 	phoneNumber: this.value1
				// }
				// postVerification(data).then(res => {
				// 	console.log(res)
				// 	const {
				// 		statusCode
				// 	} = res[1]
				// 	if (statusCode = 201) {
				// 		this.$successToast('获取成功~')
				// 		this.value1 = ''
				// 		this.isSwitch = 2
				// 		// uni.navigateTo({
				// 		// 	url:'pages/HomePage/index'
				// 		// })
				// 	} else {
				// 		this.$errorToast('获取失败~，请重试')
				// 	}
				// })
			},
			//单选
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			// 电话
			change1(e) {
				// console.log('change', e);
			},
			// 下拉
			change(e) {
				console.log("e:", e);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login_page {
		width: 100%;

		::v-deep .uni-select {
			border: 0;
			width: 70px;
		}
	}
</style>
