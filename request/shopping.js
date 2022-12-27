import {
	apiUrl,
} from '@/request/api.js'


let access_token = uni.getStorageSync('token')
access_token = access_token.access_token


// 根据条件筛选查询平台寄卖藏品商品集合
export function getCommodity(formData) {
	return uni.request({
		url: `${apiUrl}/blockchain/non-fungible-tokens?${formData}`,
		method: 'GET',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
			'Authorization': `Bearer ${access_token}` // 携带token
		}
	})
}

//  用户铸造数字藏品在平台寄卖，同时会发布等量的NFT到联盟链
export function postIncreaseShop(formData) {
	return uni.request({
		url: apiUrl + '/blockchain/non-fungible-tokens',
		method: 'POST',
		data: {
			...formData
		},
		header: {
			'accept': 'application/json', //自定义请求头信息
			'Content-Type': 'application/json', //自定义请求头信息
			'Authorization': `Bearer ${access_token}` // 携带token
		}
	})
}

//  查询单个藏品商品
export function getShopData(formData) {
	return uni.request({
		url: `${apiUrl}/blockchain/non-fungible-tokens/${formData}`,
		method: 'GET',
		// data: {
		// 	...formData
		// },
		header: {
			'accept': 'application/json', //自定义请求头信息
			'Content-Type': 'application/json', //自定义请求头信息
			'Authorization': `Bearer ${access_token}` // 携带token
		}
	})
}

//  创建数字藏品订单
export function postEstablishOrder(formData) {
	return uni.request({
		url: apiUrl + '/blockchain/non-fungible-tokens/orders',
		method: 'POST',
		data: [...formData]

			,
		header: {
			'accept': 'application/json', //自定义请求头信息
			'Content-Type': 'application/json', //自定义请求头信息
			'Authorization': `Bearer ${access_token}` // 携带token
		}
	})
}

//  创建支付宝预付签名信息串，APP端使用该串调起支付宝付款
export function postPaymentOrder(formData) {
	return uni.request({
		url: apiUrl + '/payments/alipay/prepay/app',
		method: 'POST',
		data: {...formData},
		header: {
			'accept': 'application/json', //自定义请求头信息
			'Content-Type': 'application/json', //自定义请求头信息
			'Authorization': `Bearer ${access_token}` // 携带token
		}
	})
}
