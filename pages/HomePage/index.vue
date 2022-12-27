<template>
	<view>我是首页</view>
</template>

<script>
	export default {
		name:'HomePage',
		onLoad() {
			// this.init()
		},
		onShow() {
			this.init()
		},
		methods:{
			init(){
				const  user = uni.getStorageSync('token')
				console.log('判断token')
				if(user){
					console.log(1)
				}else{
					console.log(2)
					uni.navigateTo({
						url:'/pages/LoginPage/index'
					})
				}
			}
		}
	}
</script>

<style>
</style>