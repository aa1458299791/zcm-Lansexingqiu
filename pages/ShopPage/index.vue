<template>
	<view class="shop_page">
		<!-- 导航栏 -->
		<view style="margin-top: 30px;">
			<u-subsection :list="list" :current="current" :fontSize="24" @change="sectionChange"></u-subsection>
		</view>
		<!-- 广场 -->
		<view v-if="current === 0">
			<SquarePage></SquarePage>
		</view>
		<!-- 潮购 -->
		<view v-if="current === 1">
		<TrendPage></TrendPage>	
		</view>
		
	</view>
</template>

<script>
	import TrendPage  from '@/pages/ShopPage/page/TrendPage.vue'
	import SquarePage  from '@/pages/ShopPage/page/SquarePage.vue'
	export default {
		name: 'ShopPage',
		components:{
			TrendPage,SquarePage
		},
		data() {
			return {
				list: ['广场', '潮购'],
				// 或者如下，也可以配置keyName参数修改对象键名
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				current: 1
			}
		},
		methods: {
			sectionChange(index) {
				// console.log(index)
				this.current = index;
				// console.log(this.current)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop_page {
		width: 100%;
		height: 100%;
	}
</style>
