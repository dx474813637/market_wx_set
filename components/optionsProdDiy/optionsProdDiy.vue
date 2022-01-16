<template>
	<view class="ww">
		<view class="menu-options-row u-flex u-col-top">
			<view class="item-label u-padding-top-20">布局样式</view>
			<view class="item-content u-flex">
				<el-radio v-model="style" label="1">宫格</el-radio>
				<el-radio v-model="style" label="2">列表</el-radio>
			</view>
		</view>
		<view class="menu-options-row u-flex u-col-top" v-if="style == '1'">
			<view class="item-label u-padding-top-20">列数</view>
			<view class="item-content u-flex">
				<el-radio v-model="col_num" label="2">2列</el-radio>
				<el-radio v-model="col_num" label="3">3列</el-radio>
			</view>
		</view>
		<!-- <view class="menu-options-row u-flex u-col-top">
			<view class="item-label u-padding-top-20">选择分类</view>
			<view class="item-content u-flex u-flex-1">
				<el-cascader 
					:options="options" 
					:props="{ multiple: true, checkStrictly: true }" 
					clearable
					:show-all-levels="false"
					size="medium"
					@change="handleChangeTabs"
				>
				</el-cascader>
			</view>
		</view> -->
		<view class="menu-options-row u-flex">
			<view class="item-label">列表背景颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].list_bg_color" border
					@input="changelistbgColor" type="text" />
				<el-color-picker :value="optData.options[curCompOptActive.index].list_bg_color"
					@change="changelistbgColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">按钮颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].buy_btn_color" border @input="changebtnColor"
					type="text" />
				<el-color-picker :value="optData.options[curCompOptActive.index].buy_btn_color"
					@change="changebtnColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">选择商品</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input disabled :value="optData.options[curCompOptActive.index].data | filterDataId" border
					type="text" />
				<el-button type="primary" size="medium" @click="showPopup">选择</el-button>
			</view>
		</view>
		<view class="menu-options-row">
			<view class="diy-list u-flex u-flex-wrap u-col-top" id="diyList">
				<view class="item" v-for="(item, index) in optData.options[curCompOptActive.index].data" :key="item.id">
					<view class="card">
						<view class="del-btn u-flex u-row-center" title="移除" @click="delProdDiy(index)">
							<u-icon name="minus-circle-fill" color="#ff0000" size="40"></u-icon>
						</view>
						<image class="img" mode="scaleToFill" :src="item.pimage"></image>
					</view>
				</view>
			</view>
		</view>

		<u-popup v-model="show" mode="center" width="2200" height="1300" closeable close-icon="close-circle"
			close-icon-color="#999" close-icon-size="40" border-radius="8">
			<diyProductTable @tableExit="show = false"></diyProductTable>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from "vuex"
	import Sortable from 'sortablejs';
	export default {
		name: "optionsProdDiy",
		data() {
			return {
				curActive: -1,
				style: "1",
				col_num: "2",
				show_bar: "1",
				show: false,
				uploadUrl: "http://www.example.com/upload",
				
			};
		},
		mounted() {
			this.initSortable()
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'cateData']),
		},
		filters: {
			filterDataId(v) {
				return v.map(ele => {
					return ele.id
				}).join(",")
			}
		},
		async created() {
			this.style = this.optData.options[this.curCompOptActive.index].style
			this.col_num = this.optData.options[this.curCompOptActive.index].col_num
			this.show_bar = this.optData.options[this.curCompOptActive.index].show_bar
			if(this.cateData && this.cateData.length == 0) {
				await this.getCateData()
			}
		},
		watch: {
			style(newv) {
				this.updateProps({
					style: newv
				})
			},
			col_num(newv) {
				this.updateProps({
					col_num: newv
				})
			},
			show_bar(newv) {
				this.updateProps({
					show_bar: newv
				})
			},
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
			...mapActions(['getCateData']),
			
			refresh() {
				
			},
			showPopup() {
				this.show = true;
				// this.handleChecked()
				
			},
			// handleChecked() {
			// 	this.$nextTick(() => {
			// 		this.optData.options[this.curCompOptActive.index].data.forEach(row => {
			// 			this.$refs.multipleTable.toggleRowSelection(
			// 				this.tableData.find((item) =>  item.id === row.id )
			// 				, true
			// 			);
			// 		})
			// 	})
			// },
			
			initSortable() {
				this.sortable = Sortable.create(document.getElementById("diyList"), {
					handle: '.img',
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
			changelistbgColor(event) {
				this.updateProps({
					list_bg_color: event
				})
			},
			changebtnColor(event) {
				this.updateProps({
					buy_btn_color: event
				})
			},
			delProdDiy(index) {
				this.delOptData(index)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.sortable-ghost .img {
		box-shadow: 0 0 10px rgba(170, 170, 255, 0.6);
	}
	.header-row {
		background-color: #f2f2f2;
	}
	

	.ww {

		// padding-top: 10px;
		.el-cascader {
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
			}

			.diy-list {
				border: 1rpx dashed $theme-color;
				border-radius: 6px;
				padding: 30rpx;
				min-height: 240rpx;

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
		}
	}
</style>
