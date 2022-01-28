<template>
	<view class="ww">
		<!-- <view class="menu-options-row u-flex">
			<view class="item-label">装饰</view>
			<view class="item-content">
				<el-radio v-model="bgStyle" label="1">
					<image src="http://dingxiang.netsun.testwebsite.cn/public/img/title1.png" mode="heightFix"></image>
				</el-radio>
			</view>
		</view> -->
		<view class="style-box ">
			<view class="style-content u-flex u-row-center">
				<u-image 
					width="100%" 
					height="80"
					:src="bg"
					mode="scaleToFill"
				></u-image>
			</view>
			<view class="style-btn" @click="show = true">选择已有风格</view>
		</view>
		<view class="menu-options" id="menuOptList">
			<view class="item" >
				<view class="item-box">
					<view class="box-title u-flex u-row-between">
						<view class="item-left u-flex">
							<!-- <view class="tuozhuai">
								<u-icon name="tuozhuai" custom-prefix="custom-icon"></u-icon>
							</view> -->
							<text class="t">配置项</text>
						</view>
					</view>
					<view class="box-content">
						<view class="citem u-flex u-col-top">
							<view class="citem-label">背景管理</view>
							<view class="citem-main u-flex u-flex-wrap">
								
								<view class="item-input u-flex">
									<u-input :value="optData.options[curCompOptActive.index].bg" @input="changeMenuUrl" placeholder="输入网络地址或点击下方上传图片" border type="text" />
								</view>
								<u-upload 
									ref="uploadTitle" 
									:max-size="1 * 1024 * 1024" 
									max-count="1" 
									width="500" 
									height="120"
									:multiple="false" 
									:action="uploadUrl" 
									:file-list="optData.options[curCompOptActive.index].bg ? [{url: optData.options[curCompOptActive.index].bg}] : []"
									@on-remove="handleRemoveUrl"
									@on-success="handlePicSuccess"
								></u-upload>
								<text class="warn">输入网络图片地址或上传图片可自定义标题栏背景图</text>
							</view>
						</view>
						<view class="citem u-flex">
							<view class="citem-label">标题内容</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="optData.options[curCompOptActive.index].title" border @input="changeMenuTitlte" type="text" />
								</view>
							</view>
						</view>
						<view class="citem u-flex">
							<view class="citem-label">文字颜色</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="optData.options[curCompOptActive.index].titleColor" border @input="changeMenuTitlteColor" type="text" />
									<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].titleColor" @change="changeMenuTitlteColor"></el-color-picker>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="right" width="800" closeable close-icon="close-circle" close-icon-color="#999" close-icon-size="40">
			<view class="style-popup">
				<view class="popup-title u-flex">
					<u-icon name="buju1" custom-prefix="custom-icon" size="40"></u-icon>
					<text>风格选择</text>
				</view>
				<view class="popup-content u-flex u-flex-wrap">
					<view class="item u-flex u-row-center" v-for="(item, index) in titleinitData" :key="index" @click="handleChooseStyle(item)">
						<text class="text">{{optData.options[curCompOptActive.index].title}}</text>
						<u-image
							width="375px"
							height="45px" 
							:src="item.bg"
							border-radius="4"
							bg-color="#fff"
							mode="scaleToFill"
						></u-image>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import {
		titleinitData
	} from "@/static/js/diyComponents.js"
	export default {
		name: "optionsTitle",
		mounted() {
			
		},
		data() {
			return {
				show: false,
				curActive: -1,
				bgStyle: "1",
				bg: "",
				titleinitData: titleinitData,
				titleColor: "",
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'uploadUrl']),
		},
		created() {
			this.bgStyle = this.optData.options[this.curCompOptActive.index].bgStyle
			this.bg = this.optData.options[this.curCompOptActive.index].bg
			this.titleColor = this.optData.options[this.curCompOptActive.index].titleColor
		},
		watch: {
			buju(newv) {
				this.updateProps({
					col: newv
				})
			},
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
			changeMenuTitlte(event) {
				this.updateProps({
					title: event
				})
			},
			changeMenuTitlteColor(event) {
				this.updateProps({
					titleColor: event
				})
			},
			changeMenuUrl(event) {
				if(event != this.optData.options[this.curCompOptActive.index].bg){ 
					this.$refs.uploadTitle.clear()
				}
				this.updateProps({
					bgStyle: "diy",
					bg: event,
				})
			},
			handlePicSuccess(data, index, lists) {
				if(data.code == 1) {
					this.$refs.uploadTitle.clear()
					this.updateProps({
						bgStyle: "diy",
						bg: data.url,
					})
				}
			},
			handleChooseStyle(data) {
				this.show = false
				this.updateProps({
					bgStyle: data.bgStyle,
					bg: data.bg,
				})
				this.$refs.uploadTitle.clear()
				this.bg = data.bg
				// this.handleUpdateHeight()
			},
			handleRemoveUrl(index, lists) {
				this.updateProps({
					bgStyle: "diy",
					bg: "",
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.style-popup {
		padding: 0 10px;
		.popup-title {
			height: 50px;
			padding: 0 20px;
			color: $theme-color;
			text {
				color: #000;
				font-weight: bold;
				padding-left: 10px;
			}
		}
		.popup-content {
			.item {
				flex: 0 0 100%;
				width: 100%;
				padding: 10rpx;
				margin-top: 20rpx;
				cursor: pointer;
				transition: all .3s;
				border: 1rpx solid $theme-bg-color;
				border-radius: 5px;
				position: relative;
				&:hover {
					border-color: $theme-color
				}
				.text {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					
				}
			}
		}
	}

	.ww {

		// padding-top: 10px;
		.style-box {
			background-color: #f2f2f6;
			border-radius: 5px;
			overflow: hidden;
			margin-top: 10px;
			.style-content {
				height: 200rpx;
			}
			.style-btn {
				line-height: 40px;
				text-align: center;
				color: $theme-color;
				background-color: $theme-bg-color;
				cursor: pointer;
				transition: all .3s;
				&:hover {
					background-color: $theme-color;
					color: #fff;
				}
			}
		}
		.menu-options-row {
			padding-left: 10px;
			height: 40px;

			.item-label {
				flex: 0 0 70px;
				width: 70px;
			}

			.item-content {
				flex: 0 0 calc(100% - 70px);
				width: calc(100% - 70px);
				padding-left: 6px;
				image {
					height: 20px;
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
