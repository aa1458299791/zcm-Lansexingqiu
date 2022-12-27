<template>
	<view style="width: 100%;min-height: 1000px; background-color: #303030;padding-bottom: 100px;">
		<!-- 菜单选择 -->
		<view>
			<u-tabs :list="list1" @click="click" style="font-size: 20px;" lineWidth="130"></u-tabs>
		</view>
		<!-- 搜索 -->
		<view style="margin: 10px 0  30px 0;padding: 5px 10px ;">
			<u-search placeholder="搜索" v-model="keyword" :showAction="false" @search="searchShop"></u-search>
		</view>
		<!-- 排序 -->
		<view style="margin: 10px 0  30px 0;padding: 5px 10px ;">
			<u-subsection :list="list" :current="curNow" mode="subsection" @change="sectionChange"></u-subsection>
		</view>
		<!-- 商品卡片 -->
		<view v-if="isShowIndex === 0"
			style="display: flex;flex-wrap: wrap;justify-content: space-around;border-radius: 10px;margin-top: 30px;padding: 0 10px;">
			<!-- 1*** -->
			<view style="width: 48%;background-color: #585864;border-radius: 10px;margin-bottom:15px ;"
				v-for="item in shopList" :key="item.id" @click="entryPurchasePage(item.id)">
				<!-- 图片 -->
				<view>
					<image :src="item.avatar" style="width: 100%;height: 10rem;border-radius: 10px  10px 0 0 ;"></image>
				</view>
				<!-- 标题 -->
				<view class="text_name" style="color: #62B0B9;font-size: 20px;font-weight: bold;padding: 5px 10px ;">
					{{item.name}}
				</view>
				<!-- 用户信息 -->
				<view
					style="color: white; font-size: 10px;display: flex;margin: 5px 10px ;padding-bottom: 10px; border-bottom: 1px solid rosybrown;">
					<view style="display: flex;width: 80%;" class="text_name">
						<image :src="item.authorAvatar"
							style="width: 15%;height: 1rem;border-radius: 100%;margin-right: 5px;"></image>
						{{item.authorName}}
					</view>
					<view>拥有</view>
				</view>
				<!-- 编号 -->
				<view style="padding: 5px 10px ;color: #62B0B9;" class="text_name">{{item.description}}</view>
				<!-- 价格 -->
				<view style="font-size: 22px;font-weight: bold;color: #2783BE;padding: 5px 10px ;">￥{{item.price}}
				</view>
			</view>
		</view>
		<!-- 盲盒 -->
		<view v-if="isShowIndex === 1">
			<view></view>
			
		</view>
		<!-- 空状态 -->
		<!-- <view class="" v-if="shopList.length <= 0">
			<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
		</view> -->
		<!-- 新建商品 -->
		<view style="width: 100%; position: fixed;bottom: 20px;left: calc(50% - -90px);" @click="newBuiltShop" v-if="isShowIndex === 0">
			<image src="../../../static/images/tj.png" style="width: 20%;height: 3.5rem;"></image>
		</view>
		<!-- 弹出 -->

		<view>
			<NewBuiltShop :isShow="isShowShop" @hidePopup="hidePopup" @init="init"> </NewBuiltShop>
		</view>
		<!-- <uni-load-more :status="isStatus" /> -->
	</view>
</template>

<script>
	import {
		getCommodity
	} from '@/request/shopping.js'
	import NewBuiltShop from '@/pages/ShopPage/components/NewBuiltShop.vue'
	export default {
		name: 'NumberPage',
		components: {
			NewBuiltShop
		},
		data() {
			return {
				isShowIndex:0, // 菜单
				isShowShop: false, // 弹出框
				list1: [{
					name: '藏品',
				}, {
					name: '盲盒',
				}, ],
				list: ['最新上架', '价格升序', '价格降序'],
				curNow: 0,
				keyword: '', // 输入框
				page: 1, // 页码
				maxPage: null, // 最大页码
				size: 5, // 条数
				name: '', // 商品名称
				author: '', // 用户id
				shopList: []
				// isStatus:true
			}
		},
		onLoad() {
			this.init()
		},
		onReachBottom() {
			console.log('到底了')
			if (this.page < this.maxPage) {
				this.page += 1
				this.init()
			} else {
				this.$errorToast('暂无更多数据')
			}

			//      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕!')

			//      if (this.isloading) return

			//      // 让页码值自增+1
			//      this.queryObj.pagenum++
			//      this.getGoodsList()
		},
		methods: {
			// 搜索
			searchShop(value) {
				this.page = 1
				this.shopList = []
				// console.log('搜索',value,this.keyword)
				this.init()
			},
			// 隐藏弹出框
			hidePopup() {
				this.isShowShop = false
			},
			// 新建商品
			newBuiltShop() {
				console.log(123)
				this.isShowShop = true
			},
			init() {
				const data = `page=${this.page}&size=${this.size}&name=${this.keyword}`
				getCommodity(data).then(res => {
					console.log('获取商品数据', res[1])
					const {
						statusCode,
						data
					} = res[1]
					if (statusCode === 200) {
						const list = data.representations
						this.shopList = [...this.shopList, ...list].reverse()
						this.maxPage = data.pages
						console.log(this.shopList)
					} else {
						uni.$u.toast('数据获取失败');
					}
				})
			},
			// 进入详情
			entryPurchasePage(id) {
				uni.navigateTo({
					url: `/pages/ShopPage/page/PurchasePage?id=${id}`
				});
			},
			click(item) {
				console.log('item', item);
				this.isShowIndex = item.index
			},
			sectionChange(index) {
				this.curNow = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-tabs__wrapper__nav__item {
		width: 40%;
	}

	::v-deep .u-subsection__item--first {
		border-radius: 30px;
	}

	::v-deep .u-subsection__item--no-border-right {
		border-radius: 30px;
	}

	::v-deep .u-subsection__item--last {
		border-radius: 30px;
	}

	::v-deep .u-tabs__wrapper__nav__item__text {
		color: #1873B2 !important;
	}

	::v-deep .u-subsection__item__text {
		color: white !important;
	}

	.text_name {
		display: -webkit-box; //使用了flex，需要加
		overflow: hidden; //超出隐藏
		word-break: break-all; //纯英文、数字、中文
		text-overflow: ellipsis; //省略号
		-webkit-box-orient: vertical; //垂直
		-webkit-line-clamp: 1; //显示一行
		white-space: pre-line; //合并空白符序列，但是保留换行符。(如果要使用这个垂直和显示几行的代码也要写)

	}
</style>
