<template>
	<view class="ww">
		<view class="menu-options-row u-flex ">
			<view class="item-label">联系客服</view>
			<view class="item-content u-flex">
				<u-switch v-model="service" size="35"></u-switch>
			</view>
		</view>
		<view class="menu-options" id="menuOptList">
			<view class="item" v-for="(item,index) in optData.btns.data" :key="item.id">
				<view class="item-box">
					<view class="box-title u-flex u-row-between">
						<view class="item-left u-flex">
							<view class="tuozhuai">
								<u-icon name="tuozhuai" custom-prefix="custom-icon"></u-icon>
							</view>
							<text class="t">按钮{{index+1}}</text>
						</view>
						<view class="item-right">
							<text class="del" @click="delBtn(index)">删除</text>
						</view>
					</view>
					<view class="box-content" v-if="!move">
						<view class="citem u-flex u-col-top">
							<view class="citem-label">图标路径</view>
							<view class="citem-main u-flex u-flex-wrap">
								
								<view class="item-input u-flex">
									<u-input :value="item.icon" @input="changeBtnUrl" placeholder="输入网络地址或点击下方上传图片" border @focus="jujiao(index)" type="text" />
								</view>
								<u-upload 
									:ref="`btnupload${index}`" 
									:max-size="1 * 1024 * 1024" 
									max-count="1" 
									width="150" 
									height="150"
									:multiple="false" 
									:action="uploadUrl" 
									:file-list="item.icon ? [{url: item.icon}] : []"
									@on-remove="handleRemoveUrl"
									@on-success="handlePicSuccess"
									:index="index"
								></u-upload>
								<text class="warn"></text>
							</view>
						</view>
						<view class="citem u-flex u-col-top">
							<view class="citem-label">触发样式</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<el-radio :name="`radio${index}`" :value="item.type" label="1" @change="handleChangeType(index, '1')">弹窗样式</el-radio>
									<el-radio :name="`radio${index}`" :value="item.type" label="2" @change="handleChangeType(index, '2')">页面跳转</el-radio>
								</view>
							</view>
						</view>
						<view class="citem u-flex u-col-top" v-if="item.type == 1">
							<view class="citem-label">弹窗图片</view>
							<view class="citem-main u-flex u-flex-wrap">
								
								<view class="item-input u-flex">
									<u-input :value="item.type_image" @input="changeBtnsAlert" placeholder="输入网络地址或点击下方上传图片" border @focus="jujiao(index)" type="text" />
								</view>
								<u-upload 
									:ref="`btnupload${index}_style2`" 
									:max-size="1 * 1024 * 1024" 
									max-count="1" 
									width="150" 
									height="150"
									:multiple="false" 
									:action="uploadUrl" 
									:file-list="item.type_image ? [{url: item.type_image}] : []"
									@on-remove="handleRemoveUrl2"
									@on-success="handlePicSuccess2"
									:index="index"
								></u-upload>
								<text class="warn"></text>
							</view>
						</view>
						<view class="citem u-flex" v-if="item.type == 2">
							<view class="citem-label">跳转链接</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="item.type_link" border @input="changeBtnLink" @focus="jujiao(index)"
										type="text" />
								</view>
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
		name: "optionsBtns",
		mounted() {
			this.initSortable()
		},
		data() {
			return {
				curActive: -1,
				sortable: null,
				move: false,
				service: true,
			};
		},
		created() {
			this.service = this.optData.service
		},
		watch: {
			service(newV, oldV) {
				this.updatePageOpt({
					service: newV
				})
			},
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'uploadUrl']),
		},
		methods: {
			...mapMutations(['changeCurBtnActive', 'addNewBtn', 'updateBtnSort', 'delBtnData', 'updateBtn', 'updatePageOpt']),
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
						this.updateBtnSort({
							newIndex,
							oldIndex
						})
					}
				});
			},
			changeBtnLink(event) {
				this.updateBtn({
					index: this.curActive,
					data: {
						type_link: event
					}
				})
			},
			changeBtnUrl(event) {
				if(event != this.optData.btns.data[this.curActive].icon){ 
					this.$refs[`btnupload${this.curActive}`][0].clear()
				}
				this.updateBtn({
					index: this.curActive,
					data: {
						icon: event
					}
				})
			},
			changeBtnsAlert(event) {
				if(event != this.optData.btns.data[this.curActive].type_image){ 
					this.$refs[`btnupload${this.curActive}_style2`][0].clear()
				}
				this.updateBtn({
					index: this.curActive,
					data: {
						type_image: event
					}
				})
			},
			handleRemoveUrl(index, lists, name) {
				this.curActive = name
				this.updateBtn({
					index: this.curActive,
					data: {
						icon: ""
					}
				})
			},
			handleRemoveUrl2(index, lists, name) {
				this.curActive = name
				this.updateBtn({
					index: this.curActive,
					data: {
						type_image: ""
					}
				})
			},
			handlePicSuccess(data, index, lists, name) {
				this.curActive = name
				if(data.code == 1) {
					this.$refs[`btnupload${this.curActive}`][0].clear()
					
					this.updateBtn({
						index: this.curActive,
						data: {
							icon: data.url
						}
					})
				}
			},
			handlePicSuccess2(data, index, lists, name) {
				this.curActive = name
				if(data.code == 1) {
					this.$refs[`btnupload${this.curActive}_style2`][0].clear()
					this.updateBtn({
						index: this.curActive,
						data: {
							type_image: data.url
						}
					})
				}
			},
			handleChangeType(index, type) {
				this.updateBtn({
					index: index,
					data: {
						type: type
					}
				})
			},
			delBtn(index) {
				this.delBtnData(index)
			},
			jujiao(index) {
				this.curActive = index
			},
			addAd() {
				this.addNewBtn({
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
