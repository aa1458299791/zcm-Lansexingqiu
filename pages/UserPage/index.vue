<template>
	<view>
		我是用户页
		这是token:{{user.access_token || 123456789}}
		 <uni-easyinput errorMessage v-model="value" focus placeholder="请输入账户名" ></uni-easyinput>
		<button @click="aaa">创建账号</button>
	</view>
</template>

<script>
	import {postEstablishAccount} from '@/request/user.js'
	export default {
		name: 'UserPage',
		data() {
			return {
				user: {},
				value:''
			}
		},
		onLoad() {
			this.user = uni.getStorageSync('token')
			console.log(this.user)
		},
		methods: {
			// 创建
			aaa() {

				const data = {
					name: this.value
				}
				postEstablishAccount(data).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style>
</style>
