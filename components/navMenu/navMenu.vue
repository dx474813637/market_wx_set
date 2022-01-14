<template>
	<view class="nav-wrapper">
		<view class="item-box" v-for="(item, index) in diyComponents" :key="index">
			<view class="item-title u-flex">{{item.type}}</view>
			<div class="item-content u-flex u-flex-wrap">
				<view class="item u-flex u-row-center" v-for="(ele, i) in item.children" :key="i" @click="addNewCpt(ele.name)">
					<view class="item-icon">
						<u-icon :name="typeToName[ele.name].icon" custom-prefix="custom-icon"></u-icon>
					</view>
					<view class="item-name">{{typeToName[ele.name].label}}</view>
				</view>
			</div>
		</view>
	</view>
</template>

<script>
	import {diyComponents, typeToName} from "@/static/js/diyComponents.js"
	import {mapState, mapMutations} from "vuex"
	export default {
		name:"navMenu",
		data() {
			return {
				diyComponents: diyComponents,
				typeToName: typeToName
				
			};
		},
		methods: {
			...mapMutations(['addnewCpt']),
			addNewCpt(name) {
				this.addnewCpt(name)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-wrapper {
		.item-box {
			border: 1rpx solid #eee;
			border-radius: 12rpx;
			margin-bottom: 20rpx;
			.item-title {
				background-color: #f2f2f2;
				height: 80rpx;
				padding: 0 20rpx;
			}
			.item-content {
				padding: 20rpx;
				.item {
					flex: 0 0 32%;
					height: 150rpx;
					flex-direction: column;
					background-color: #f8f8f8;
					border: 1rpx solid #eee;
					border-radius: 8rpx;
					margin-bottom: 2%;
					cursor: pointer;
					transition: all .3s;
					&:hover {
						border-color: $theme-color;
					}
					&:nth-of-type(3n - 1) {
						margin-left: 2%;
						margin-right: 2%;
					}
					.item-icon {
						margin-bottom: 10rpx;
						font-size: 44rpx;
						color: $theme-color;
					}                                        
					.item-name {
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
