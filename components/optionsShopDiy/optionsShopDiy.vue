<template>
	<view class="ww">
		<view class="menu-options-row u-flex u-col-top" style="height: auto;">
			<view class="item-label u-p-t-16">搜索店铺</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input v-model="kw" @focus="s_input_focus = true" @blur="s_input_focus = false" border type="text" placeholder="输入关键字等待下方结果,选择并配置"  />
				<view class="search-res-box u-flex u-flex-wrap"
					:class="{
						'u-row-center': s_loading || s_res.length == 0,
						'u-col-top': s_res.length > 0
					}"
					v-if="kw.length > 0 || s_input_focus || s_res.length > 0"
				>
					<template v-if="s_loading">
						<view>
							<text>搜索中</text>
							<i class="el-icon-loading"></i>
						</view>
					</template>
					<template v-else-if="s_res.length == 0">
						<u-empty text="请输入关键字" mode="list"></u-empty>
					</template>
					<template v-else-if="s_res.length > 0">
						<view
							v-for="(item, index) in s_res"
							:key="index"
							class="item"
						>
							<el-button type="primary" plain size="mini" icon="el-icon-circle-plus-outline" @click="addShop">{{item.name}}</el-button>
						</view>
					</template>
					
				</view>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">列表背景颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].list_bg_color" border @input="changelistbgColor"
					type="text" />
				<el-color-picker :value="optData.options[curCompOptActive.index].list_bg_color"
					@change="changelistbgColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options" id="menuOptList" >
			<view class="item" v-for="(item,index) in optData.options[curCompOptActive.index].data" :key="item.id">
				<view class="item-box">
					<view class="box-title u-flex u-row-between">
						<view class="item-left u-flex">
							<view class="tuozhuai">
								<u-icon name="tuozhuai" custom-prefix="custom-icon"></u-icon>
							</view>
							<text class="t">{{item.name}}</text>
						</view>
						<view class="item-right">
							<text class="del" @click="delMenuData(index)">删除</text>
						</view>
					</view>
					<view class="box-content" v-if="!move">
						<view class="citem u-flex">
							<view class="citem-label">文本颜色</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="item.header_color" @focus="jujiao(index)" border
										@input="changePropColor3" type="text" />
									<el-color-picker class="u-m-l-10" :value="item.header_color" @active-change="jujiao(index)"
										@change="changePropColor3"></el-color-picker>
								</view>
							</view>
						</view>
						<view class="citem u-flex">
							<view class="citem-label">标签背景色</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="item.tag_color_bg" @focus="jujiao(index)" border
										@input="changePropColor4" type="text" />
									<el-color-picker class="u-m-l-10" :value="item.tag_color_bg" @active-change="jujiao(index)"
										@change="changePropColor4"></el-color-picker>
								</view>
							</view>
						</view>
						<view class="citem u-flex">
							<view class="citem-label">标签文本色</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="item.tag_color" @focus="jujiao(index)" border
										@input="changePropColor5" type="text" />
									<el-color-picker class="u-m-l-10" :value="item.tag_color" @active-change="jujiao(index)"
										@change="changePropColor5"></el-color-picker>
								</view>
							</view>
						</view>
						<view class="citem u-flex">
							<view class="citem-label">背景风格</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<el-select :value="item.header_bg_style" @focus="jujiao(index)" @input="changeProphbs"  placeholder="请选择">
										<el-option label="显示纯色" value="1"></el-option>
										<el-option label="显示渐变色" value="2"></el-option>
										<el-option label="显示图片" value="3"></el-option>
									</el-select>
								</view>
							</view>
						</view>
						<view class="citem u-flex u-col-top" v-if="item.header_bg_style == '3'">
							<view class="citem-label">背景图片</view>
							<view class="citem-main u-flex u-flex-wrap">
								
								<view class="item-input u-flex">
									<u-input :value="item.header_bg_src" @input="changeBgUrl" placeholder="输入网络地址或点击下方上传图片" border @focus="jujiao(index)" type="text" />
								</view>
								<u-upload 
									:ref="`${curCompOptActive.type}upload${index}`" 
									:max-size="1 * 1024 * 1024" 
									max-count="1" 
									width="150" 
									height="150"
									:multiple="false" 
									:action="uploadUrl" 
									:file-list="item.header_bg_src ? [{url: item.header_bg_src}] : []"
									@on-remove="handleRemoveUrl"
									@on-success="handlePicSuccess"
									:index="index"
								></u-upload>
								<text class="warn">建议尺寸:75px * 75px</text>
							</view>
						</view>
						<view class="citem u-flex" v-if="item.header_bg_style != '3'">
							<view class="citem-label">背景颜色1</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="item.header_bg" @focus="jujiao(index)" border
										@input="changePropColor1" type="text" />
									<el-color-picker class="u-m-l-10" :value="item.header_bg" @active-change="jujiao(index)"
										@change="changePropColor1"></el-color-picker>
								</view>
							</view>
						</view>
						<view class="citem u-flex" v-if="item.header_bg_style == 2">
							<view class="citem-label">背景颜色2</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="item.header_bg2" @focus="jujiao(index)" border
										@input="changePropColor2" type="text" />
									<el-color-picker class="u-m-l-10" :value="item.header_bg2" @active-change="jujiao(index)"
											@change="changePropColor2"></el-color-picker>
									
									
								</view>
							</view>
						</view>
						<view class="citem u-flex">
							<view class="citem-label">商品推荐</view>
							<view class="citem-main u-flex u-flex-wrap">
								<u-input disabled :value="item.data | filterDataId" border
									type="text" />
								<el-button class="u-m-l-10" type="primary" size="medium" @click="showPopup(index, item.login)" plain>配置</el-button>
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		
		<u-popup v-model="show" mode="center" width="2200" height="1300" closeable close-icon="close-circle"
			close-icon-color="#999" close-icon-size="40" border-radius="8">
			<diyShopProdTable 
				@tableExit="show = false" 
				:login="login"
				:curActive="curActive"
				:curData="optData.options[curCompOptActive.index].data[curActive] && optData.options[curCompOptActive.index].data[curActive].data"
			></diyShopProdTable>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import Sortable from 'sortablejs';
	export default {
		name: "optionsShopDiy",
		mounted() {
			this.initSortable()
		},
		data() {
			return {
				curActive: 0,
				sortable: null,
				move: false,
				kw: '',
				show: false,
				login: '',
				s_input_focus: false,
				s_loading: false,
				s_res: []
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'uploadUrl']),
		},
		watch: {
			kw(n) {
				uni.$u.debounce(this.lookUpShop, 1600)
			}
		},
		filters: {
			filterDataId(v) {
				return v.map(ele => {
					return ele.id
				}).join(",")
			}
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
			lookUpShop() {
				this.s_loading = true
				this.s_res = []
				setTimeout(() => {
					this.s_res = [{name: 'xiixhaha'}]
					this.s_loading = false
				}, 1000)
				
			},
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
			addShop() {
				this.addnewData({
					id: '23',
					login: 'toocle3',
					name: '网盛生意宝股份有限公司线上店铺2',
					logo: 'http://market.netsun.testwebsite.cn/Public/Upload/diy/61e3935bdc488.png',
					tag: ['限时直降'],
					tag_color: '#fff',
					tag_color_bg: '#f90',
					header_color: '#fff',
					header_bg_style: '1',
					header_bg_src: 'http://market.netsun.testwebsite.cn/Public/Upload/diy/61e392fa4fa0b.png',
					header_bg: '#aa55ff',
					header_bg2: '#5555ff',
					data: []
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
			changelistbgColor(event) {
				this.updateProps({
					list_bg_color: event
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
			changeProphbs(event) {
				this.changeOptData({
					index: this.curActive,
					data: {
						header_bg_style: event
					}
				})
			},
			changePropColor1(event) {
				this.changeOptData({
					index: this.curActive,
					data: {
						header_bg: event
					}
				})
			},
			changePropColor2(event) {
				this.changeOptData({
					index: this.curActive,
					data: {
						header_bg2: event
					}
				})
			},
			changePropColor3(event) {
				this.changeOptData({
					index: this.curActive,
					data: {
						header_color: event
					}
				})
			},
			changePropColor4(event) {
				this.changeOptData({
					index: this.curActive,
					data: {
						tag_color_bg: event
					}
				})
			},
			changePropColor5(event) {
				this.changeOptData({
					index: this.curActive,
					data: {
						tag_color: event
					}
				})
			},
			changeBgUrl(event) {
				if(event != this.optData.options[this.curCompOptActive.index].data[this.curActive].url){ 
					this.$refs[`${this.curCompOptActive.type}upload${this.curActive}`][0].clear()
				}
				this.changeOptData({
					index: this.curActive,
					data: {
						header_bg_src: event
					}
				})
			},
			handleRemoveUrl(index, lists, name) {
				this.curActive = name
				this.changeOptData({
					index: this.curActive,
					data: {
						header_bg_src: ""
					}
				})
			},
			delShopProdDiy(index1, index2, obj) {
				obj.splice(index1, 1)
				this.changeOptData({
					index: index2,
					data: {
						data: obj
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
							header_bg_src: data.url
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
			
			showPopup(index, login) {
				this.login = login
				this.curActive = index
				this.show = true;
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.el-slider,
	.el-select {
		width: 100%;
	}
	.search-res-box {
		min-height: 150px;
		width: 100%;
		margin: 10px auto;
		border: 1px dashed $theme-bg-color;
		border-radius: 10px;
		.item {
			padding: 10px 15px;
			.el-button {
				white-space: normal!important;
			}
		}
	}
	.add-menu {
		padding: 20px 0 10px;
		.el-button {
			width: 100%;
		}
	}
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
			margin-bottom: 12px;

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
							.diy-list {
								border: 1rpx dashed $theme-color;
								border-radius: 6px;
								padding: 30rpx;
								min-height: 80rpx;
								width: 100%;
								.item {
									padding: 12rpx;
									
									.card {
										position: relative;
										.del-btn {
											position: absolute;
											right: -15rpx;
											top: -15rpx;
											width: 40rpx;
											height: 40rpx;
											z-index: 20;
											background-color: #fff;
											border-radius: 50%;
											cursor: pointer;
										}
							
										.img {
											width: 80rpx;
											height: 80rpx;
											cursor: move;
											border-radius: 8rpx;
											border: 1px solid #eee;
										}
									}
								}
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
