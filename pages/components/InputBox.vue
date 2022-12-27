<template>
	<view class="code">

		<input class="cinput" adjust-position="false" auto-blur="true" @blur="blur" @input="codenum" :focus="focus"
			value="code" v-model="code" type="number" maxlength="6" />
		<view class="code-input">
			<view v-for="(item,index) in 6" :key="index" @click="codefocus(index)"
				:style='(index == code.length? "border: 5rpx solid #1195db;width: 80rpx;height: 80rpx;line-height: 80rpx;":"color: " + codeclolor + ";" +"border: 2rpx solid" + codeclolor)'>
				{{code[index]}}
			</view>
		</view>
		<view class="code-tip-one">
			<view class="code-tip">已发送验证码至<text>{{value1}}</text></view>
			<!-- <view class="code-errow" v-if="codeclolor == '#ff0000'">验证码输入错误</view> -->
		</view>
		<!-- <view class="recode">重新发送({{sec}}s)</view> -->
	</view>
</template>

<script>
	export default {
		name: 'InputBox',
		props:{
			value1:{
				type:String,
				default:'666666666'
			}
		},
		data() {
			return {
				// 验证码输入聚焦
				focus: true, //input焦点，用于键盘隐藏后重新唤起
				// 验证码框颜色
				codeclolor: "#313131", //自定义光标的颜色
				// 验证码获取秒数
				sec: '50', //这是重新获取验证码的倒计时
				code: '', //这是用户输入的验证码
			}
		},
		methods: {
			// 输入验证码
			codenum: function(event) {
				var that = this
				var code = event.target.value
				that.code = code
				if (code.length == 6) {
					console.log(code)
					this.$emit('verification',code)
					// if (code == '123456') {
					// 	console.log('输入')
					// 	//输入六位验证码后自动进行验证并执行验证成功的函数
					// } else {
					// 	console.log(2)
					// 	that.codeclolor = "#ff0000"
					// 	setTimeout(function() {
					// 		that.code = ""
					// 		event.target.value = ""
					// 		that.codeclolor = "#313131"
					// 	}, 1500)
					// }
				}
			},
			// 键盘隐藏后设置失去焦点
			blur: function() {
				var that = this
				that.focus = false
			},
			// 点击自定义光标显示键盘
			codefocus: function(e) {
				var that = this
				if (e == that.code.length) {
					that.focus = true
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.code {
		margin: auto;
		margin-top: 50rpx;
		width: 650rpx;
		height: auto;
	}

	.code-tip-one {
		width: 650rpx;
		height: 250rpx;
		line-height: 100rpx;
		font-size: 60rpx;
		font-weight: bold;
		color: #313131;
		text-align: center;
		margin-top: 10px;
	}

	.code-tip {
		width: 650rpx;
		height: 100rpx;
		line-height: 50rpx;
		font-size: 30rpx;
		font-weight: normal;
		color: #8a8a8a;
	}

	.code-errow {
		width: 650rpx;
		height: 50rpx;
		line-height: 25rpx;
		font-size: 28rpx;
		font-weight: normal;
		color: #ff0000;
	}

	.code-tip>text {
		padding: 0 20rpx;
		width: 650rpx;
		font-size: 30rpx;
		font-weight: normal;
		color: #ff5500;
	}

	.code-input {
		margin: auto;
		width: 650rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-around;
	}

	.code-input>view {
		margin-top: 5rpx;
		margin-left: 15rpx;
		width: 86rpx;
		height: 86rpx;
		line-height: 86rpx;
		font-size: 60rpx;
		font-weight: bold;
		color: #313131;
		text-align: center;
		border-radius: 10rpx;
	}

	.code-input>view:nth-child(1) {
		margin-left: 0rpx;
	}

	.cinput {
		position: fixed;
		left: -100rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.recode {
		margin-top: 20rpx;
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #707070;
		font-size: 28rpx;
	}
</style>
