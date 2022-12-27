<template>
	<view class="" style="width: 100%;background-color: #000000;min-height: 1500upx;padding-top: 20px;color: white;">
		<!-- 商品信息 -->
		<view
			style="display: flex; background-color: #181818;color: white;margin: 0 15px;padding: 15px 10px;border-radius: 10px;">
			<view style="width:40%;">
				<image :src="shopData.avatar" style="width: 200upx;height: 200upx;border-radius: 10px;">
				</image>
			</view>
			<view style="width: 50%;display: flex;flex-direction: column;justify-content: space-around;">
				<view>《 {{shopData.name}}》</view>
				<view style="display: flex;width: 100%;">
					<view>
						<image :src="shopData.authorAvatar"
							style="width: 50upx;height: 50upx;border-radius: 100%;margin-right: 5px;border: 1px solid white;">
						</image>
					</view>
					<view class="">
						{{shopData.authorName}}
					</view>
				</view>
				<view style="display: flex;">
					<view style="font-size: 10px;margin-top: 15upx;margin-right: 5px;">￥</view>
					<view style="font-size: 20px;font-weight: bold;">{{shopData.price}}</view>
				</view>
			</view>
		</view>
		<!-- 支付方式 -->
		<view style="margin: 15px;background-color:#181818 ;padding: 15px;border-radius: 10px;">
			<view style="font-weight: bold; margin-bottom: 10px;">
				支付方式
			</view>
			<u-radio-group v-model="radiovalue1" placement="column" iconPlacement="right" labelColor="white"
				inactiveColor="white" @change="groupChange">
				<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in radiolist1" :key="index"
					:label="item.name" :name="item.name" labelColor="white" @change="radioChange">
				</u-radio>
			</u-radio-group>
		</view>
		<!-- 按钮 -->
		<view style=" background-color: #181818;display: flex;justify-content: space-between;margin-top: 20px;padding: 10px;position: fixed;
		width: 100%;
bottom: 0;
  right: 0;
">
			<view style="display: flex;margin-left: 30px;">
				<view style="font-size: 10px;margin-top: 15upx;margin-right: 10px;">￥</view>
				<view style="font-size: 20px;font-weight: bold;">{{shopData.price}}</view>
			</view>
			<view> <button class="mini-btn" type="primary" size="mini"
					style="background-color: #FEDF9A;border-radius: 20px;padding: 0 30px;color: #000000;"
					@click="jumpLowerOrder">确认支付</button> </view>
		</view>
	</view>
</template>

<script>
	import {
		postEstablishOrder,
		getShopData,
		postPaymentOrder
	} from '@/request/shopping.js'

	export default {
		name: 'LowerOrder',
		data() {
			return {
				// 基本案列数据
				radiolist1: [{
					name: '支付宝支付',
					disabled: false
				}, ],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '支付宝支付',
				shopId: null,
				shopData: {}
			};
		},
		onLoad(option) {
			console.log(option.id)
			// this.shopId = parseInt(option.id)
			this.shopId = option.id
			this.init()
		},
		methods: {
			// 支付
			jumpLowerOrder() {

				const that = this;
				console.log('支付')
				// const data = [{
				// 	ntf: `${that.shopId}`, // 订单id
				// 	quantity: 1

				// }]

				// console.log('订单数据', data)
				// postEstablishOrder(data).then(res => {
				// 	console.log('接口', res)
				// })
				// 调用uniapp API uni.getProvider 获取服务供应商
				uni.getProvider({
					/* 获取服务类型，可选值如下:
					 * @param share: 分享
					 * @param oauth: 授权登录
					 * @param push: 推送
					 * @param payment: 支付类型
					 */
					service: 'payment',
					success: (res) => {
						/*
						 * @ res.service 获取服务供应商 ==> 'payment'
						 * @ res.provider 这里选择的是支付类型，所以包含["alipay","wxpay"]
						 * ‘alipay’: 表示支付宝
						 * ‘wxpay’: 表示微信
						 */
						console.log('调用', res)
						// .检查res.provider中是否有 alipay

						if (res.provider.indexOf('alipay') != -1) {
							console.log('接口支付')
							// 后台支付接口需要的一些参数
							const data = [{
								ntf: `${that.shopId}`, // 订单id
								quantity: 1

							}]

							console.log('订单数据', data)
							postEstablishOrder(data).then(res => {
								console.log('接口', res)
								const {
									statusCode,
									data
								} = res[1]

								if (statusCode === 201) {

									const data1 = {
										totalAmount: that.shopData.price,
										paymentOrderType: 'NON_FUNGIBLE_TOKEN',
										merchantOrderNumber: 'data.orderId'
									}

									console.log('提交支付签名信息', data1)
									postPaymentOrder(data1).then(res => {
										console.log('支付签名信息', res)
										const {
											statusCode,
											data
										} = res[1]

										if (statusCode === 201) {
											console.log('支付宝签名信息',
												data.prepay)
											uni.requestPayment({
												provider: 'alipay',
												orderInfo: data.prepay,
												//调用成功的回调
												success(res) {
													console.log('支付成功success:' + res);
													uni.$u.toast('支付成功~');
												},
												//调用失败的回调
												fail(err) {
													console.log('支付失败fail:' + err);
													uni.$u.toast('支付失败！');
												}
											})
										}

									})


								} else {
									console.log('订单错误')
								}


							})



							//发起后台支付接口请求

							// that.$api.payMonry(data).then(res => {
							// 		// console.log('支付宝订单数据', res);
							// 		//调用uniapp API uni.requestPayment 支付接口

							// 	}
						}
					},
					fail: (err) => {
						console.log('失败', err)
					}

				})


			},
			groupChange(n) {
				console.log('groupChange', n);
				this.radiovalue1 = n
			},
			radioChange(n) {
				console.log('radioChange', n);
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

<style>
</style>
