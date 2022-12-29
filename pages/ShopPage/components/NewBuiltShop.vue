<template>
	<view>
		<u-popup :show="isShow" :round="10" mode="bottom" :closeable="true" closeIconPos="top-right" @close="close"
			@open="open">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="藏品名称" required name="name">
					<uni-easyinput v-model="valiFormData.name" placeholder="请输入藏品名称" />
				</uni-forms-item>
				<uni-forms-item label="藏品图片" required name="avatar">
					<!-- <uni-easyinput v-model="valiFormData.avatar" placeholder="请输入姓名" /> -->
					<!-- <view @click="uploadPictures">上传图片</view> -->
					<image :src="valiFormData.avatar" style="width: 200upx;height: 200upx;" v-if="valiFormData.avatar"></image>
					<button type="primary" @click="uploadPictures" size="mini" v-else>上传图片</button>
				</uni-forms-item>
				<uni-forms-item label="铸造数量" required name="quantity">
					<uni-easyinput v-model="valiFormData.quantity" placeholder="请输入整数(例:12345)" />
				</uni-forms-item>
				<uni-forms-item label="版税" required name="royalties">
					<uni-easyinput v-model="valiFormData.royalties" placeholder="请输入整数(例:12345)" />
				</uni-forms-item>
				<uni-forms-item label="藏品单价" required name="price">
					<uni-easyinput v-model="valiFormData.price" placeholder="请输入整数(例:12345)" />
				</uni-forms-item>
				<!-- <uni-forms-item label="年龄" required name="age">
					<uni-easyinput v-model="valiFormData.age" placeholder="请输入年龄" />
				</uni-forms-item> -->
				<uni-forms-item label="藏品描述" name="description">
					<uni-easyinput type="textarea" maxlength="-1" v-model="valiFormData.description" placeholder="请输入藏品描述" />
				</uni-forms-item>
			</uni-forms>
			<button style="width: 500upx;"  type="primary" @click="submit('valiForm')">提交</button>
		</u-popup>
		<!-- <u-loading-icon text="加载中" textSize="18" :show="true"></u-loading-icon> -->
	</view>
</template>

<script>
	import {
		postIncreaseShop
	} from '@/request/shopping.js'

	export default {
		name: 'NewBuiltShop',
		props: {
			isShow: {
				type: Boolean,
			}
		},
		data() {
			return {
				// isShow: false
				valiFormData: {
					name: '',
					avatar: '',
					quantity: null,
					royalties: null,
					price: null,
					description: ''
				},
				imgUrl: '',
				// 校验规则
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '内容不能为空'
						}]
					},
					// avatar: {
					// 	rules: [{
					// 		required: true,
					// 		errorMessage: '内容不能为空'
					// 	}]
					// },
					quantity: {
						rules: [{
							required: true,
							errorMessage: '内容不能为空'
						}]
					},
					royalties: {
						rules: [{
							required: true,
							errorMessage: '内容不能为空'
						}]
					},
					price: {
						rules: [{
							required: true,
							errorMessage: '内容不能为空'
						}]
					},
					description: {
						rules: [{
							required: true,
							errorMessage: '内容不能为空'
						}]
					},

				},
			}
		},
		methods: {
			// 上传图片
			uploadPictures() {
				const that = this
				let access_token = uni.getStorageSync('token')
				access_token = access_token.access_token
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res.tempFilePaths);
						const imgList = res.tempFilePaths.join(',')
						console.log('top地址', imgList)
						uni.uploadFile({
							url: 'http://1.116.147.41:8180/files', //仅为示例，非真实的接口地址
							filePath: imgList,
							// files:imgList,
							fileType: 'image',
							name: 'files',
							header: {
								'Authorization': `Bearer ${access_token}` // 携带token
							},
							formData: {
								bucket: 'storage',
								path: '',
								randomNamed: false,
								// files: res.tempFilePaths
							},
							success: (uploadFileRes) => {
								console.log('打印', uploadFileRes)
								const {
									data,
									statusCode
								} = uploadFileRes
								if (statusCode === 201) {
									uni.$u.toast('图片上传成功');

									let img = JSON.parse(data)
									that.valiFormData.avatar = img[0]
									console.log('图片地址', this.imgUrl, '-----', img[0])
								} else {
									this.$errorToast('图片上传失败~，请重试')
								}
							},
							fail: (err) => {
								console.log(err)
							}
						});
					}
				});
			},
			// 提交
			submit(ref) {
			uni.showLoading({
				title: '发布中',
				success:(res) => {
					console.log(res)
				},
				fail:(err)=> {
					console.log(err)
				} 
			});
			
			setTimeout(function () {
				uni.hideLoading();
				this.$errorToast('藏品发布失败，请重试')
			},  15 * 1000);
				console.log('上传前', this.imgUrl, this.valiFormData)
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					res.price = parseInt(res.price)
					res.royalties = parseInt(res.royalties)
					res.quantity = parseInt(res.quantity)
					// res.price = parseInt(res.price)
					console.log('上传前的图片地址', this.imgUrl)
					const data = {
						...this.valiFormData
					}
					postIncreaseShop(data).then(res => {
						console.log(res)
						const {
							statusCode,
							data
						} = res[1]
						if (statusCode === 201) {
							uni.$u.toast('发布成功');
							console.log('商品id', data.id)
							this.$emit('init')
							this.$emit('hidePopup')
							this.valiFormData.name= ''
							this.valiFormData.avatar= ''
							this.valiFormData.quantity= null
							this.valiFormData.royalties= null
							this.valiFormData.price= null
							this.valiFormData.price= ''
							uni.hideLoading();
							
						} else {
							// uni.hideLoading();
							// this.$errorToast('藏品发布失败，请重试')
							console.log('藏品发布失败，请重试！')
							uni.$u.toast('藏品发布失败，请重试！！');
						}
					})
					// uni.showToast({
					// 	title: `校验通过`
					// })
				}).catch(err => {
					console.log('err', err);
				})
			},
			open() {
				// console.log('open');
			},
			close() {
				this.$emit('hidePopup')
				// this.show = false
				// console.log('close');
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-popup__content {
		padding: 50px 10px 30px 10px;
	}

	::v-deep .uni-forms-item__label {
		width: 24% !important;
	}

	::v-deep .uni-input-input,
	::v-deep .u-form-item__body__right {
		margin-left: 17px;
	}
</style>
