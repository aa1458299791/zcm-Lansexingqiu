<template>
	<view style="width: 100%;height: 100%;">
		<!-- 国潮数字页 -->
		<view style="width: 100%;height: 100%;position: relative;" @click="getIntoNumberPage">
			<image src="../../../static/images/lxq.jpg" style="width: 100%;"></image>
			<view
				style="position: absolute;top: 80px;left: 50px; z-index: 9999; color: blue;font-weight: bold;font-size: 30px;"
				>
				点击进入国潮数字页
			</view>
		</view>
		<!-- 菜单列表 -->
		<view style="display: flex;flex-wrap: wrap;justify-content: space-evenly">
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- ****111 -->
			<view style=" width:15% ;display: flex;flex-direction: column;align-items: center;">
				<!-- 图片 -->
				<view>
					<image src="../../../static/images/sd2.png" style="width: 50px;height: 50px;"></image>
				</view>
				<!-- 标题 -->
				<view>新品</view>
			</view>
			<!-- *** -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TrendPage',
		methods: {
			// 进入国潮数字
			getIntoNumberPage() {
				console.log(123)
				uni.navigateTo({
					url: '/pages/ShopPage/page/NumberPage'
				});
			}
		}
	}
</script>

<style>
</style>
