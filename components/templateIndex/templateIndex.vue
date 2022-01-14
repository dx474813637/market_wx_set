<template>
	<view class="w u-flex u-row-center u-col-top">
		<view class="w-main" ref="previewWindow">
			<template v-if="aIndex == 0">
				<tempshouye :opt="opt" :key="keytime"></tempshouye>
			</template>
			<template v-else-if="aIndex == 1">
				<temptanchuang></temptanchuang>
			</template>
			<template v-else-if="aIndex == 2">
				<tempxuanfu></tempxuanfu>
			</template>
		</view>
		<view class="tabbar-w u-flex u-row-center">
			<view class="tabbar u-flex u-row-between">
				<view class="item" v-for="(item, index) in tempBtns" :key="index">
					<el-button type="primary" :plain="index !== activeIndex" size="small" @click="handerChangeActive(index)">{{item.name}}</el-button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name: "templateIndex",
		data() {
			return {
				tempBtns: [{
						name: "首页"
					},
					{
						name: "弹窗提醒"
					},
					{
						name: "悬浮按钮"
					},
				],
			};
		},
		props: {
			opt: Object
		},
		computed: {
			...mapState(['activeIndex', 'keytime']),
			aIndex: {
				get() {
					return this.activeIndex
				},
				set(v) {
					this.changeCurPage(v)
				}
			},
			
		},
		mounted() {
			this.setRef(this.$refs.previewWindow)
		},
		methods: {
			...mapMutations(['setRef', 'changeCurPage', 'changeCurComp']),
			handerChangeActive(index) {
				if(index == this.aIndex) return;
				this.aIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.w {
		height: 100%;
		position: relative;
		padding-top: 20px;
		.w-main {
			height: calc(100% - 70px);
			overflow-y: auto;
			width: 375px;
			user-select: none;
		}
	}
	.tabbar-w {
		width: 100%;
		height: 50px;
		background-color: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
		box-shadow: 0 -10px 10px rgba(0,0,0,.1);
		.tabbar {
			width: 240px;
			.item {
			}
		}
		
	}
</style>
