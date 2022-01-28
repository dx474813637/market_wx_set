<template>
	<view class="wrapper">
		<view class="wrapper-title u-flex u-row-between">
			<view class="item-left u-flex">
				<view class="title">店铺装修</view>
			</view>
			<view class="item-right u-flex">
				<view class="item-btn u-flex" v-if="activeIndex == 0">
					<text class="u-padding-right-10">首页全局配置</text>
					<u-switch v-model="pageOpt" size="35" active-color="#804ED1"></u-switch>
				</view>
				<!-- <view class="item-btn">
					<el-button type="primary" plain size="small">预览</el-button>
				</view> -->
				<view class="item-btn">
					<el-button type="primary" size="small" @click="saveOptions">保存</el-button>
				</view>

			</view>
		</view>
		<view class="wrapper-content u-flex">
			<view class="item-left" v-if="activeIndex == 0">
				<navMenu></navMenu>
			</view>
			<view class="item-center">
				<templateIndex></templateIndex>
			</view>
			<view class="item-right">
				<componentOption></componentOption>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from "vuex"
	export default {
		data() {
			return {
				title: 'Hello',
			}
		},
		async onLoad() {
			uni.showLoading()
			await this.getHomeData()
			uni.hideLoading()
		},
		computed: {
			...mapState(['curCompOptActive', 'pageOptFlag', 'activeIndex', 'optData']),
			pageOpt: {
				get() {
					return this.pageOptFlag;
				},
				set(value) {
					console.log(this)
					this.changepageOptFlag(value)
				}
			}
		},
		methods: {
			...mapMutations(['changeCurComp', 'changepageOptFlag']),
			...mapActions(['getHomeData']),
			async saveOptions() {
				this.$confirm('是否保存当前配置信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					// console.log(this.optData)
					uni.showLoading()
					let res = await this.$http.post('/Market/diy_save', {
						str: JSON.stringify(this.optData)
					})
					uni.hideLoading()
					if(res.data.code != 1) return
					this.$message({
						type: 'success',
						message: '保存成功!'
					});
				}).catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '已取消删除'
					// });
				});


			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		height: 100vh;

		.wrapper-title {
			height: 120rpx;
			padding: 0 50rpx;

			.item-left {
				.title {
					font-weight: bold;
				}
			}

			.item-right {
				.item-btn {
					padding-left: 40rpx;
				}
			}
		}

		.wrapper-content {
			height: calc(100% - 120rpx);
			padding: 10rpx;

			.item-left,
			.item-right {
				padding: 0 20rpx;
			}

			.item-left {
				width: 600rpx;
				flex: 0 0 600rpx;
				height: 100%;
				overflow-y: auto;
			}

			.item-center {
				flex: 1;
				flex-basis: 750rpx;
				height: 100%;
				background-color: #F2F2F6;
				border-radius: 12rpx;
			}

			.item-right {
				width: 800rpx;
				flex: 0 0 800rpx;
				height: 100%;
			}
		}
	}
</style>
