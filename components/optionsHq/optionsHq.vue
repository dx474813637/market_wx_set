<template>
	<view class="ww">
		<view class="menu-options-row u-flex u-col-top" style="height: auto;">
			<view class="item-label u-p-t-16">搜索行情</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input v-model="kw" @focus="s_input_focus = true" @blur="s_input_focus = false" border type="text" placeholder="输入关键字等待下方结果,选择并配置"  />
				
			</view>
		</view>
		<view class="" >
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
					<u-empty text="请输入行情关键字" mode="list"></u-empty>
				</template>
				<template v-else-if="s_res.length > 0">
					<view
						v-for="(item, index) in s_res"
						:key="index"
						class="item"
					>
						<el-button type="primary" plain size="mini" icon="el-icon-circle-plus-outline" @click="addHq(item)">{{item.pname}}</el-button>
					</view>
				</template>
				
			</view>
		</view>
		
		<view class="menu-options-row u-flex ">
			<view class="item-label ">tabs滑块</view>
			<view class="item-content u-flex">
				<el-radio v-model="show_bar" label="1">显示</el-radio>
				<el-radio v-model="show_bar" label="0">不显示</el-radio>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">tabs已激活颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].activeColor" border @input="changeActiveColor"
					type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].activeColor"
					@change="changeActiveColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">tabs未激活颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].inactiveColor" border @input="changeinActiveColor"
					type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].inactiveColor"
					@change="changeinActiveColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">tabs背景颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].tabs_bg_color" border @input="changebgColor"
					type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].tabs_bg_color"
					@change="changebgColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">列表背景颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].list_bg_color" border @input="changelistbgColor"
					type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].list_bg_color"
					@change="changelistbgColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options" id="menuOptList" >
			<view class="item" v-for="(item,index) in optData.options[curCompOptActive.index].tabs" :key="item.pid">
				<view class="item-box">
					<view class="box-title u-flex u-row-between">
						<view class="item-left u-flex">
							<view class="tuozhuai">
								<u-icon name="tuozhuai" custom-prefix="custom-icon"></u-icon>
							</view>
							<text class="t">{{index+1}}、{{item.pname}}</text>
						</view>
						<view class="item-right">
							<text class="del" @click="delMenuData(index)">删除</text>
						</view>
					</view>
					<view class="box-content" v-if="!move">
						<view class="citem u-flex">
							<view class="citem-label">标题</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="item.pname" @focus="jujiao(index)" border
										@input="changePropPName" type="text" />
								</view>
							</view>
						</view>
						<view class="citem u-flex" >
							<u-image 
								width="100%"
								height="350"
								:src="item.imgSrc"
								border
							></u-image>
						</view>
					</view>
				</view>
			</view>
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
				s_res: [],
				show_bar: "1",
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'uploadUrl']),
		},
		watch: {
			kw(n) {
				uni.$u.debounce(this.lookUpShop, 1600)
			},
			show_bar(newv) {
				this.updateProps({
					show_bar: newv
				})
			},
		},
		created() {
			this.show_bar = this.optData.options[this.curCompOptActive.index].show_bar
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
			async lookUpShop() {
				this.s_loading = true
				this.s_res = []
				let res = await this.$http.get('/Market/api.html?api_url_xcx=ppi_search', {
					params: {
						name: this.kw
					}
				})
				this.s_loading = false
				if(res.data.code != 1) return;
				this.s_res = res.data.list
				
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
						let tabs = this.optData.options[this.curCompOptActive.index].tabs
						const val = tabs[oldIndex]
						tabs.splice(oldIndex, 1)
						tabs.splice(newIndex, 0, val)
						this.updateProps({
							tabs: tabs
						})
					}
				});
			},
			addHq(obj) {
				this.updateProps({
					tabs: [
						...this.optData.options[this.curCompOptActive.index].tabs,
						{
							...obj,
							imgSrc: `http://www.100ppi.com/graph/ppi_ci/graph/${obj.ppid}-365-190-6-5-1.png`
						}
					]
				})
				
				
			},
			changePropPName(event) {
				let tabs = this.optData.options[this.curCompOptActive.index].tabs
				tabs[this.curActive].pname = event
				this.updateProps({
					tabs: tabs,
				})
			},
			changelistbgColor(event) {
				this.updateProps({
					list_bg_color: event
				})
			},
			changeActiveColor(event) {
				this.updateProps({
					activeColor: event
				})
			},
			changeinActiveColor(event) {
				this.updateProps({
					inactiveColor: event
				})
			},
			changebgColor(event) {
				this.updateProps({
					tabs_bg_color: event
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
			delMenuData(index) {
				let tabs = this.optData.options[this.curCompOptActive.index].tabs
				tabs.splice(index, 1)
				this.updateProps({
					tabs: tabs
				})
			},
			jujiao(index) {
				this.curActive = index
			},
			
			
			
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
			padding: 2px 5px;
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
