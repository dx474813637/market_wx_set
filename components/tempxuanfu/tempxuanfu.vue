<template>
	<view class="xf-wrapper">
		<!-- <view class="xf">
			<image class="xf-btn" :src="optData.btns.icon" mode=""></image>
			<view class="xf-list">
				<view class="item" v-for="(item, index) in optData.btns.data" :key="index">
					<image class="xf-btn" :src="item.icon" mode=""></image>
				</view>
			</view>
		</view> -->
		<view class="btns">
			<view class="btns-main btns-style u-flex u-row-center" @click="handlechangeActive" :class="{
				active: btn_active
			}">
				<u-icon name="plus" size="46"></u-icon>
			</view>
			<view class="btns-list" :class="{
				active: btn_active
			}">
				<view 
					v-for="(item, index) in optData.btns.data"
					:key="index"
					class="item btns-style" 
				>
					<image :src="item.icon" mode="scaleToFill"></image>
				</view>
				<view class="item btns-style u-flex u-row-center" title="联系客服" v-if="optData.service">
					<u-icon name="service" size="46" custom-prefix="custom-icon"></u-icon>
				</view>
				<view class="item btns-style u-flex u-row-center" title="返回顶部">
					<u-icon name="top" size="46" custom-prefix="custom-icon"></u-icon>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name:"tempxuanfu",
		data() {
			return {
				btn_active: true,
			};
		},
		computed: {
			...mapState(['optData'])
		},
		methods: {
			handlechangeActive() {
				this.btn_active = !this.btn_active
			},
		}
	}
</script>

<style lang="scss" scoped>
	.xf-wrapper {
		width: 100%;
		height: 100%;
		background-color: #ccc;
		position: relative;
		
		
	}
	
	@keyframes zhuan {
		0% {
			opacity: 0;
			transform: translateY(-10px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.btns {
		position: absolute;
		right: 30rpx;
		bottom: 150rpx;
		z-index: 200;
		width: 100rpx;
		.btns-style {
			width: 100rpx;
			height: 100rpx;
			padding: 10rpx;
			border-radius: 50%;
			box-shadow: 0 0 10px rgba(0,0,0,0.2);
			background-color: #fff;
			image {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				
			}
		}
		.btns-main {
			transition: all .3s;
			color: #585772;
			&.active {
				transform: rotate(45deg);
				color: #fff;
				background-color: #585772;
			}
		}
		.btns-list {
			position: absolute;
			bottom: 100%;
			left: 0;
			display: none;
			&.active {
				display: block;
				.item {
					animation: zhuan .5s;
				}
			}
			.item {
				margin-bottom: 10px;
			}
		}
	}
</style>
