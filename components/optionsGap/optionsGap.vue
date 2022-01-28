<template>
	<view class="ww">
		<view class="menu-options-row u-flex">
			<view class="item-label">背景色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].bg_color" border @input="changebgColor"
					type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].bg_color"
					@change="changebgColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">宽度</view>
			<view class="item-content u-flex u-flex-wrap">
				<el-slider
					:value="optData.options[curCompOptActive.index].width" 
					show-input
					:min="10"
					:max="100"
					@input="handleChangeWidth"
				>
				</el-slider>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">高度</view>
			<view class="item-content u-flex u-flex-wrap">
				<el-slider
					:value="optData.options[curCompOptActive.index].height" 
					show-input
					:min="4"
					:max="400"
					@input="handleChangeHeight"
				>
				</el-slider>
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
		name: "optionsGap",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData' ]),
		},
		created() {
		},
		methods: {
			...mapMutations(['updateProps']),
			changebgColor(event) {
				this.updateProps({
					bg_color: event
				})
			},
			handleChangeWidth(event) {
				this.updateProps({
					width: event
				})
			},
			handleChangeHeight(event) {
				this.updateProps({
					height: event
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.sortable-ghost {
		box-shadow: 0 0 10px rgba(170, 170, 255, 0.6);
	}

	.ww {

		// padding-top: 10px;
		.el-cascader,
		.el-select{
			width: 100%;
		}
		.menu-options-row {
			padding-left: 10px;
			min-height: 40px;
			margin-top: 10px;

			.item-label {
				flex: 0 0 70px;
				width: 70px;
				padding-right: 10px;
			}

			.item-content {
				flex: 0 0 calc(100% - 70px);
				width: calc(100% - 70px);
				min-height: 40px;
				padding-left: 6px;
				.el-slider {
					width: 100%;
				}
			}
		}
		.menu-options {
			padding-top: 15px;
		
			.item {
				border-radius: 5px;
		
				.item-box {
					margin-bottom: 20px;
		
					.box-title {
						background-color: #F2F2F6;
						height: 35px;
						padding: 0 10px;
						border-radius: 6px 6px 0 0;
		
						.item-left {
							.tuozhuai {
								cursor: move;
								padding: 0 10px;
								margin-right: 10px;
							}
						}
		
						.item-right {
							.del {
								color: #999;
								font-size: 12px;
								cursor: pointer;
		
								&:hover {
									color: red;
								}
							}
						}
					}
		
					.box-content {
						border-radius: 0 0 6px 6px;
						padding: 20px 0;
						border: 1rpx solid #f2f2f6;
		
						.citem {
							padding: 0 10px;
							margin-bottom: 10px;
		
							&:last-child {
								margin-bottom: 0;
							}
		
							.citem-label {
								flex: 0 0 70px;
								width: 70px;
								line-height: 50px;
							}
		
							.citem-main {
								flex: 0 0 calc(100% - 70px);
								width: calc(100% - 70px);
		
								.item-input {
									width: 100%;
									height: 50px;
									.el-slider {
										width: 100%;
									}
								}
		
								.emptypic {
									color: $theme-color;
								}
		
								.btn {
									padding: 0 20px;
									margin-right: 20px;
									height: 50px;
								}
		
								.warn {
									// padding-top: 15px;
									color: #999;
									padding-left: 10px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
