<template>
	<view class="ww">
		
		<view class="menu-options-row u-flex">
			<view class="item-label">风格选择</view>
			<view class="item-content">
				<el-radio v-model="isWrap" label="wrap">换行</el-radio>
				<el-radio v-model="isWrap" label="nowrap">不换行</el-radio>
			</view>
		</view>
		<template v-if="isWrap == 'wrap'">
			<view class="menu-options-row u-flex">
				<view class="item-label">布局样式</view>
				<view class="item-content">
					<el-radio v-model="buju" label="4">4列</el-radio>
					<el-radio v-model="buju" label="5">5列</el-radio>
					<el-radio v-model="buju" label="6">6列</el-radio>
				</view>
			</view>
			<view class="menu-options-row u-flex">
				<view class="item-label">图形样式</view>
				<view class="item-content">
					<el-radio v-model="tuxing" label="square">方形</el-radio>
					<el-radio v-model="tuxing" label="circle">圆形</el-radio>
				</view>
			</view>
		</template>
		
		
		<view class="menu-options-row u-flex">
			<view class="item-label">文字颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].title_color" border
					@input="changetitleColor" type="text" />
				<el-color-picker :value="optData.options[curCompOptActive.index].title_color"
					@change="changetitleColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options" id="menuOptList">
			<view class="item" v-for="(item,index) in optData.options[curCompOptActive.index].data" :key="item.id">
				<view class="item-box">
					<view class="box-title u-flex u-row-between">
						<view class="item-left u-flex">
							<view class="tuozhuai">
								<u-icon name="tuozhuai" custom-prefix="custom-icon"></u-icon>
							</view>
							<text class="t">菜单{{index+1}}</text>
						</view>
						<view class="item-right">
							<text class="del" @click="delMenuData(index)">删除</text>
						</view>
					</view>
					<view class="box-content" v-if="!move">
						<view class="citem u-flex u-col-top" v-if="isWrap == 'wrap'">
							<view class="citem-label">图片路径</view>
							<view class="citem-main u-flex u-flex-wrap">
								
								<view class="item-input u-flex">
									<u-input :value="item.url" @input="changeMenuUrl" placeholder="输入网络地址或点击下方上传图片" border @focus="jujiao(index)" type="text" />
								</view>
								<u-upload 
									:ref="`${curCompOptActive.type}upload${index}`" 
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
								<text class="warn">建议尺寸:75px * 75px</text>
							</view>
						</view>
						<view class="citem u-flex">
							<view class="citem-label">文字内容</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="item.title" border @input="changeMenuTitlte" @focus="jujiao(index)"
										type="text" />
								</view>
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
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import Sortable from 'sortablejs';
	export default {
		name: "optionsMenu",
		mounted() {
			this.initSortable()
		},
		data() {
			return {
				curActive: -1,
				sortable: null,
				buju: "4",
				isWrap: 'wrap',
				tuxing: "square",
				move: false
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'uploadUrl']),
		},
		created() {
			this.buju = this.optData.options[this.curCompOptActive.index].col
			this.tuxing = this.optData.options[this.curCompOptActive.index].shape
			this.isWrap = this.optData.options[this.curCompOptActive.index].isWrap
		},
		watch: {
			isWrap(newv) {
				this.updateProps({
					isWrap: newv
				})
			},
			buju(newv) {
				this.updateProps({
					col: newv
				})
			},
			tuxing(newv) {
				this.updateProps({
					shape: newv
				})
			}
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
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
						this.updateSort({
							newIndex,
							oldIndex
						})
					}
				});
			},
			changeMenuLink(event) {
				this.changeOptData({
					index: this.curActive,
					data: {
						link: event
					}
				})
			},
			changeMenuTitlte(event) {
				this.changeOptData({
					index: this.curActive,
					data: {
						title: event
					}
				})
			},
			changetitleColor(event) {
				this.updateProps({
					title_color: event
				})
			},
			changeMenuUrl(event) {
				if(event != this.optData.options[this.curCompOptActive.index].data[this.curActive].url){ 
					this.$refs[`${this.curCompOptActive.type}upload${this.curActive}`][0].clear()
				}
				this.changeOptData({
					index: this.curActive,
					data: {
						url: event
					}
				})
			},
			handleRemoveUrl(index, lists, name) {
				this.curActive = name
				this.changeOptData({
					index: this.curActive,
					data: {
						url: ""
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
							url: data.url
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
