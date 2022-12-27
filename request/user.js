import {
	apiUrl,
	id,
	secretKey
} from '@/request/api.js'


let access_token = uni.getStorageSync('token')
access_token = access_token.access_token

// 获取验证码
export function postVerification(formData) {
	return uni.request({
		url: apiUrl + '/openid-connect/ext/sms/auth/code',
		method: 'POST',
		data: {
			clientId: id,
			clientSecret: secretKey,
			...formData
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
		}
	})
}

// 提交手机号和短信验证码交换Token
export function postSubmitVerification(formData) {
	return uni.request({
		url: apiUrl + '/openid-connect/ext/sms/auth/token',
		method: 'POST',
		data: {
			clientId: id,
			clientSecret: secretKey,
			...formData
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
		}
	})
}

// 获取验证码
export function postVerification1(formData) {
	console.log('url', formData)
	return uni.request({
		url: apiUrl + '/openid-connect/ext/sms/auth/token',
		method: 'GET',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
			'Authorization': `Bearer ${access_token}` // 携带token
		}
	})
}

// 请求访问Token和刷新Token， 短信验证码及第三方登录请使用专用接口获取访问Token，若刷新Token统一使用本接口
export function postEstablishAccount(formData) {
	return uni.request({
		url: apiUrl + '/blockchain/accounts',
		method: 'POST',
		data: {
			...formData
		},
		header: {
			'Content-Type': 'application/json', //自定义请求头信息
			'Authorization': `Bearer ${access_token}` // 携带token
		}
	})
}