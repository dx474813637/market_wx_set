<template>
	<view class="ww">
		<view class="menu-options" id="menuOptList">
			<view class="item" v-for="(item,index) in optData.alertAd.data" :key="item.id">
				<view class="item-box">
					<view class="box-title u-flex u-row-between">
						<view class="item-left u-flex">
							<view class="tuozhuai">
								<u-icon name="tuozhuai" custom-prefix="custom-icon"></u-icon>
							</view>
							<text class="t">弹窗{{index+1}}</text>
						</view>
						<view class="item-right">
							<text class="del" @click="delAlertAd(index)">删除</text>
						</view>
					</view>
					<view class="box-content" v-if="!move">
						<view class="citem u-flex u-col-top">
							<view class="citem-label">图片路径</view>
							<view class="citem-main u-flex u-flex-wrap">
								
								<view class="item-input u-flex">
									<u-input :value="item.url" @input="changeAlertAdUrl" placeholder="输入网络地址或点击下方上传图片" border @focus="jujiao(index)" type="text" />
								</view>
								<u-upload 
									:ref="`alertupload${index}`" 
									:max-size="1 * 1024 * 1024" 
									max-count="1" 
									width="150" 
									height="150"
									:multiple="false" 
									:action="uploadUrl" 
									:file-list="item.url ? [{url: item.url}] : []"
									@on-remove="handleRemoveUrl"
									@on-success="handlePicSuccess"
									:index="index"
								></u-upload>
								<text class="warn"></text>
							</view>
						</view>
						<view class="citem u-flex">
							<view class="citem-label">跳转链接</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="item.link" border @input="changeAlertAdLink" @focus="jujiao(index)"
										type="text" />
								</view>
							</view>
						</view>
						<view class="citem u-flex u-col-top">
							<view class="citem-label">弹出频率</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<el-radio :name="`radio${index}`" :value="item.show_type" label="1" @change="handleChangeType(index, '1')">仅首次</el-radio>
									<el-radio :name="`radio${index}`" :value="item.show_type" label="2" @change="handleChangeType(index, '2')">多次</el-radio>
								</view>
								<text class="warn">
									<template v-if="item.show_type == 1">
										进入商城只显示一次广告弹窗，再次进入商城依旧显示一次
									</template>
									<template v-else-if="item.show_type == 2">
										每次进入该商城页面显示广告弹窗
									</template>
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add-menu">
			<el-button type="primary" plain size="mini" @click="addAd">添加</el-button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import Sortable from 'sortablejs';
	export default {
		name: "optionsAlertad",
		mounted() {
			this.initSortable()
		},
		data() {
			return {
				curActive: -1,
				sortable: null,
				move: false,
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'uploadUrl']),
		},
		watch: {
			curActive(newv) {
				this.changeCurAlertAdActive(newv)
			},
		},
		methods: {
			...mapMutations(['changeCurAlertAdActive', 'addNewAlertAd', 'updateAlertAdSort', 'delAlertAdData', 'updateAlertAd']),
			async initSortable() {
				
				this.sortable = Sortable.create(document.getElementById("menuOptList"), {
					handle: '.tuozhuai',
					animation: 150,
					ghostClass: "sortable-ghost",
					forceFallback: true,
					onStart: e => {
						this.move = true
					},
					onEnd: ({
						newIndex,
						oldIndex
					}) => {
						this.move = false
						this.updateAlertAdSort({
							newIndex,
							oldIndex
						})
					}
				});
			},
			changeAlertAdLink(event) {
				this.updateAlertAd({
					index: this.curActive,
					data: {
						link: event
					}
				})
			},
			changeAlertAdUrl(event) {
				if(event != this.optData.alertAd.data[this.curActive].url){ 
					this.$refs[`alertupload${this.curActive}`][0].clear()
				}
				this.updateAlertAd({
					index: this.curActive,
					data: {
						url: event
					}
				})
			},
			handleRemoveUrl(index, lists, name) {
				this.curActive = name
				this.updateAlertAd({
					index: this.curActive,
					data: {
						url: ""
					}
				})
			},
			handlePicSuccess(data, index, lists, name) {
				this.curActive = name
				if(data.code == 1) {
					this.$refs[`alertupload${this.curActive}`][0].clear()
					this.updateAlertAd({
						index: this.curActive,
						data: {
							url: data.url
						}
					})
				}
			},
			handleChangeType(index, type) {
				this.updateAlertAd({
					index: index,
					data: {
						show_type: type
					}
				})
			},
			delAlertAd(index) {
				this.delAlertAdData(index)
			},
			jujiao(index) {
				this.curActive = index
			},
			addAd() {
				this.addNewAlertAd({
					url: "",
					link: ""
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sortable-ghost {
		box-shadow: 0 0 10px rgba(170, 170, 255, 0.6);
		.item-box {
			
			.box-title {
				border: 1rpx solid $theme-bg-color;
				border-radius: 6px!important;
			}
		}
	}

	.ww {

		// padding-top: 10px;
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
