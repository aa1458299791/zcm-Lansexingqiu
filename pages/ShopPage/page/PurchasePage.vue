<template>
	<view class="purchase_page">
		<!-- 商品信息 -->
		<view style="display: flex;flex-direction: column;align-items: center;padding-top: 30px;">
			<!-- 图片 -->
			<view>
				<image :src="shopData.avatar"
					style="width:400upx ;height: 500upx;box-shadow:5px 5px 20px #FBDF93;border-radius: 10px;"></image>
			</view>
			<!-- 名称 -->
			<view style="font-weight: bold;font-size: 20px;margin: 20px 0;">《{{shopData.name}}》</view>
			<!-- 数量 -->
			<view style="display: flex;">
				<view style="background-color: #FBDF93;padding: 3px 5px;border-radius: 3px 0 0 3px;">限量</view>
				<view style="display: flex;background-color: #282828;padding: 3px 5px;border-radius: 0px 3px 3px 0px;">
					本次发行{{shopData.quantity}}份<u-icon name="eye" style="color: white;margin-left: 10px;"></u-icon>
				</view>
			</view>
			<!-- 购买 -->
			<view style="display: flex;color: antiquewhite;margin-top: 10px;">
				<u-icon name="lock" style="margin-right: 10px;"></u-icon>购买即可体验内容
			</view>
		</view>
		<!-- 用户信息 -->
		<view
			style="margin: 10px;background-color: #181818;display: flex;padding: 5px 10px;border-radius: 7px;margin-top: 20px;">
			<view>
				<image :src="shopData.authorAvatar"
					style="width: 70upx;height: 70upx;border-radius: 100%;border: 1px solid white;margin-right: 15px;">
				</image>
			</view>
			<view>
				<view style="font-weight:bold;">{{shopData.authorName}}</view>
				<view style="color: beige;">创作者</view>
			</view>
		</view>
		<!-- 专题 -->
		<view
			style="margin: 10px; background-color: #181818;display: flex;padding: 5px 10px;border-radius: 7px;margin-top: 10px;">
			<view style="background-color: #FB605C;padding: 2px 5px;border-radius: 3px;margin-right: 15px;">专题</view>
			<view style="display: flex;">传奇套装12月9日15:00火热发售<u-icon name="arrow-right" style="margin-left: 10px;">
				</u-icon>
			</view>
		</view>
		<!-- 介绍 -->
		<view style="margin: 10px;background-color: #181818;padding: 10px;border-radius: 7px;color: #EECD61;">
			<view style="color: white;margin-bottom: 5px;">藏品介绍</view>
			<view>
				<image :src="shopData.avatar" style="width: 100%;height: 400upx;">
				</image>
				{{shopData.description}}
			</view>
		</view>
		<!-- 提交 -->
		<view
			style=" background-color: #181818;display: flex;justify-content: space-between;margin-top: 20px;padding: 10px;">
			<view style="display: flex;">
				<view style="font-size: 10px;margin-top: 15upx;margin-right: 10px;">￥</view>
				<view style="font-size: 20px;font-weight: bold;">{{shopData.price}}</view>
			</view>
			<view> <button class="mini-btn" type="primary" size="mini"
					style="background-color: #FEDF9A;border-radius: 20px;padding: 0 30px;"
					@click="jumpLowerOrder">立即购买</button> </view>
		</view>
	</view>
</template>

<script>
	import {
		getShopData
	} from '@/request/shopping.js'

	export default {
		name: 'PurchasePage',

		data() {
			return {
				shopData: {},
				shopId: null,
			}
		},
		onLoad(option) {
			console.log(option.id)
			// this.shopId = parseInt(option.id)
			this.shopId = option.id
			this.init()
		},
		methods: {
			jumpLowerOrder() {
				console.log(123)
				uni.navigateTo({
					url: `/pages/ShopPage/page/LowerOrder?id=${this.shopData.id}`
				});
			},
			init() {
				getShopData(this.shopId).then(res => {
					console.log(res)
					const {
						data,
						statusCode
					} = res[1]
					if (statusCode === 200) {
						console.log('获取data', data)
						this.shopData = data
					}

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.purchase_page {
		// width: 100%;
		// height: 100% !important;
		// min-height: 300px;
		background-color: #070707;
		color: white;
		// padding: 20px;
	}
</style>
