<template>
	<view class="compOpt-ww">
		<template v-if="activeIndex == 0">
			<view class="w-title u-flex">
				<template v-if="curCompOptActive.type">
					<view class="item-icon">
						<u-icon :name="typeToName[curCompOptActive.type].icon" custom-prefix="custom-icon"></u-icon>
					</view>
					<view class="item-name">{{typeToName[curCompOptActive.type].label}}</view>
				</template>
				<template v-else-if="pageOptFlag">
					<view class="item-icon">
						<u-icon name="setting-fill"></u-icon>
					</view>
					<view class="item-name">首页全局配置</view>
				</template>
				
			</view>
			<template v-if="!curCompOptActive.type && pageOptFlag">
				<optionsPage></optionsPage>
			</template>
			<template v-if="curCompOptActive.type == 'swiper'">
				<optionsSwiper :key="curCompOptActive.index"></optionsSwiper>
			</template>
			<template v-if="curCompOptActive.type == 'menu'">
				<optionsMenu :key="curCompOptActive.index"></optionsMenu>
			</template>
			<template v-if="curCompOptActive.type == 'ad'">
				<optionsAd :key="curCompOptActive.index"></optionsAd>
			</template>
			<template v-if="curCompOptActive.type == 'title'">
				<optionsTitle :key="curCompOptActive.index"></optionsTitle>
			</template>
			<template v-if="curCompOptActive.type == 'productTabs'">
				<optionsTabs :key="curCompOptActive.index"></optionsTabs>
			</template>
			<template v-if="curCompOptActive.type == 'productDiy'">
				<optionsProdDiy :key="curCompOptActive.index"></optionsProdDiy>
			</template>
			<template v-if="curCompOptActive.type == 'coupon'">
				<optionsCoupon :key="curCompOptActive.index"></optionsCoupon>
			</template>
			<template v-if="curCompOptActive.type == 'search'">
				<optionsSearch :key="curCompOptActive.index"></optionsSearch>
			</template>
			<template v-if="curCompOptActive.type == 'richtext'">
				<optionsRichText :key="curCompOptActive.index"></optionsRichText>
			</template>
			<template v-if="curCompOptActive.type == 'shopDiy'">
				<optionsShopDiy :key="curCompOptActive.index"></optionsShopDiy>
			</template>
			<template v-if="curCompOptActive.type == 'news'">
				<optionsNew :key="curCompOptActive.index"></optionsNew>
			</template>
			<template v-if="curCompOptActive.type == 'hq'">
				<optionsHq :key="curCompOptActive.index"></optionsHq>
			</template>
		</template>
		<template v-else-if="activeIndex == 1">
			<view class="w-title u-flex">
				<view class="item-icon">
					<u-icon :name="typeToName.alertAd.icon" custom-prefix="custom-icon"></u-icon>
				</view>
				<view class="item-name">{{typeToName.alertAd.label}}</view>
			</view>
			<optionsAlertad></optionsAlertad>
		</template>
		<template v-else-if="activeIndex == 2">
			<view class="w-title u-flex">
				<view class="item-icon">
					<u-icon :name="typeToName.btns.icon" custom-prefix="custom-icon"></u-icon>
				</view>
				<view class="item-name">{{typeToName.btns.label}}</view>
			</view>
			<optionsBtns></optionsBtns>
		</template>
		
		
	</view>
</template>

<script>
	import {diyComponents, typeToName} from "@/static/js/diyComponents.js"
	import {mapState, mapMutations} from "vuex"
	export default {
		name:"componentOption",
		data() {
			return {
				typeToName: typeToName
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'pageOptFlag', 'activeIndex'])
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.compOpt-ww {
		padding: 0 10px 50px;
		height: 100%;
		overflow-y: auto;
		.w-title {
			height: 40px;
			padding-left: 10px;
			.item-icon {
				color: $theme-color;
				font-size: 18px;
				margin-right: 10px;
			}
			.item-name {
				color: #000;
				font-weight: bold;
			}
		}
	}
</style>
