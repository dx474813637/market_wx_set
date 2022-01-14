<template>
	<view class="ww">
		<view class="menu-options-row u-flex">
			<view class="item-label">魔方高度</view>
			<view class="item-content">
				<el-slider 
					:value="optData.options[curCompOptActive.index].diyHeight" 
					show-input
					:min="80"
					:max="1000"
					@input="handleChangediyHeight"
				>
				</el-slider>
			</view>
		</view>
		<view class="style-box ">
			<view class="style-content u-flex u-row-center">
				<u-image 
					width="auto"
					height="200rpx" 
					:src="styleImg"
					mode="heightFix"
				></u-image>
			</view>
			<view class="style-btn" @click="show = true">选择风格</view>
		</view>
		<view class="menu-options" id="menuOptList">
			<view class="item" v-for="(item, index) in optData.options[this.curCompOptActive.index].data" :key="item.id">
				<view class="item-box" :class="{
					danger: index+1 > maxLen
				}">
					<view class="box-title u-flex u-row-between">
						<view class="item-left u-flex">
							<view class="tuozhuai">
								<u-icon name="tuozhuai" custom-prefix="custom-icon"></u-icon>
							</view>
							<text class="t">广告{{index+1}}</text>
							<text class="danger-text" v-if="index+1 > maxLen">超出最大数量将不显示该广告</text>
						</view>
						<view class="item-right">
							<text class="del" @click="delMenuData(index)">删除</text>
						</view>
					</view>
					<view class="box-content">
						<view class="citem u-flex u-col-top">
							<view class="citem-label">图片路径</view>
							<view class="citem-main u-flex u-flex-wrap">

								<view class="item-input u-flex">
									<u-input :value="item.image" @input="changeMenuUrl" placeholder="输入网络地址或点击下方上传图片"
										border @focus="jujiao(index)" type="text" />
								</view>
								<u-upload 
									:ref="`${curCompOptActive.type}upload${index}`" 
									:max-size="1 * 1024 * 1024"
									max-count="1" 
									width="150" 
									height="150" 
									:multiple="false" 
									:action="uploadUrl"
									:file-list="item.image ? [{url: item.image}] : []" 
									@on-remove="handleRemoveUrl"
									@on-success="handlePicSuccess"
									:index="index"
								></u-upload>
								<!-- <text class="warn">建议尺寸:75px * 75px</text> -->
							</view>
						</view>
						<view class="citem u-flex">
							<view class="citem-label">跳转链接</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="item.link" border @input="changeMenuLink" @focus="jujiao(index)"
										type="text" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add-menu">
			<el-button type="primary" plain size="mini" @click="addImg">添加</el-button>
		</view>
		<u-popup v-model="show" mode="right" width="800" closeable close-icon="close-circle" close-icon-color="#999" close-icon-size="40">
			<view class="style-popup">
				<view class="popup-title u-flex">
					<u-icon name="buju1" custom-prefix="custom-icon" size="40"></u-icon>
					<text>风格选择</text>
				</view>
				<view class="popup-content u-flex u-flex-wrap">
					<view class="item u-flex u-row-center" v-for="(item, index) in adinitData" :key="index" @click="handleChooseStyle(item.style, item.boxNum)">
						<u-image
							width="100%"
							height="100%" 
							:src="item.imgSrc"
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
	import Sortable from 'sortablejs';
	import {
		adinitData
	} from "@/static/js/diyComponents.js"
	export default {
		name: "optionsAd",
		mounted() {
			this.initSortable()
		},
		data() {
			return {
				curActive: -1,
				sortable: null,
				buju: "4",
				tuxing: "square",
				show: false,
				adinitData: adinitData
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'uploadUrl']),
			list() {
				
				return this.optData.options[this.curCompOptActive.index].data.slice(0, len);
			},
			maxLen() {
				let style = this.optData.options[this.curCompOptActive.index].style;
				let opt = adinitData.filter(ele => ele.style == style);
				let len = opt[0].boxNum
				return len
			},
			styleImg() {
				let style = this.optData.options[this.curCompOptActive.index].style;
				let opt = adinitData.filter(ele => ele.style == style);
				return opt[0].imgSrc
			}
		},
		created() {
			// this.handleUpdateHeight()
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
			handleUpdateHeight() {
				let style = this.optData.options[this.curCompOptActive.index].style;
				let opt = adinitData.filter(ele => ele.style == style);
				let h = opt[0].initHeight
				this.updateProps({
					diyHeight: h,
				})
			},
			async initSortable() {

				this.sortable = Sortable.create(document.getElementById("menuOptList"), {
					handle: '.tuozhuai',
					animation: 150,
					ghostClass: "sortable-ghost",
					forceFallback: true,
					onEnd: ({
						newIndex,
						oldIndex
					}) => {
						this.updateSort({
							newIndex,
							oldIndex
						})
					}
				});
			},
			handleChooseStyle(style, num) {
				// console.log(num)
				this.show = false
				this.updateProps({
					style: style,
					img_num: num
				})
				// this.handleUpdateHeight()
			},
			handleChangediyHeight(data) {
				this.updateProps({
					diyHeight: data,
					diy: true
				})
			},
			changeMenuLink(event) {
				this.changeOptData({
					index: this.curActive,
					data: {
						link: event
					}
				})
			},
			changeMenuUrl(event) {
				if (event != this.optData.options[this.curCompOptActive.index].data[this.curActive].url) {
					this.$refs[`${this.curCompOptActive.type}upload${this.curActive}`][0].clear()
				}
				this.changeOptData({
					index: this.curActive,
					data: {
						image: event
					}
				})
			},
			handleRemoveUrl(index, lists, name) {
				this.curActive = name
				this.changeOptData({
					index: this.curActive,
					data: {
						image: ""
					}
				})
			},
			handlePicSuccess(data, index, lists, name) {
				this.curActive = name
				if(data.code == 1) {
					this.$refs[`${this.curCompOptActive.type}upload${this.curActive}`][0].clear()
					this.changeOptData({
						index: this.curActive,
						data: {
							image: data.url
						}
					})
				}
			},
			delMenuData(index) {
				this.delOptData(index)
			},
			jujiao(index) {
				this.curActive = index
			},
			addImg() {
				this.addnewData({
					url: "",
					link: "",
					title: ""
				})
			}
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
				flex: 0 0 50%;
				width: 50%;
				height: 240rpx;
				padding: 10px;
				margin-top: 20rpx;
				cursor: pointer;
				transition: all .3s;
				&:hover {
					background-color: #f8f8f8;
				}
			}
		}
	}
	.sortable-ghost {
		box-shadow: 0 0 10px rgba(170, 170, 255, 0.6);
	}

	.ww {
		
		// padding-top: 10px;
		.style-box {
			background-color: #f2f2f6;
			border-radius: 5px;
			overflow: hidden;
			margin-top: 10px;
			.style-content {
				height: 250rpx;
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
			}
		}

		.menu-options {
			padding-top: 15px;

			.item {
				border-radius: 5px;

				.item-box {
					margin-bottom: 20px;
					&.danger {
						.box-title {
							color: red;
						}
						.danger-text {
							color: red;
							font-size: 24rpx;
							padding-left: 20rpx;
						}
					}
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
