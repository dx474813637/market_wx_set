<template>
	<view class="ww">
		<view class="menu-options-row u-flex u-col-top">
			<view class="item-label u-padding-top-20">布局样式</view>
			<view class="item-content u-flex">
				<el-radio v-model="style" label="1">列表</el-radio>
				<el-radio v-model="style" label="2">宫格</el-radio>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">背景颜色1</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].bg1_color" border
					@input="changebg1Color" type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].bg1_color"
					@change="changebg1Color"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">背景颜色2</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].bg2_color" border
					@input="changebg2Color" type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].bg2_color"
					@change="changebg2Color"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">标题颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].font1_color" border
					@input="changefont1Color" type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].font1_color"
					@change="changefont1Color"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">描述颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].font2_color" border
					@input="changefont2Color" type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].font2_color"
					@change="changefont2Color"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">按钮背景</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].btnbg_color" border
					@input="changebtnbgColor" type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].btnbg_color"
					@change="changebtnbgColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">按钮文字</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].btn_color" border
					@input="changebtnColor" type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].btn_color"
					@change="changebtnColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">选择优惠</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input disabled :value="optData.options[curCompOptActive.index].data | filterDataId" border
					type="text" />
				<el-button type="primary" size="medium" @click="showPopup">选择</el-button>
			</view>
		</view>
		<view class="menu-options-row">
			<view class="diy-list u-flex u-flex-wrap u-col-top" id="diyList">
				<view class="item" v-for="(item, index) in optData.options[curCompOptActive.index].data" :key="item.id">
					<view class="card u-flex u-row-between">
						<view class="title">{{item.title}}</view>
						<view class="del-btn u-flex u-row-center" title="移除" @click="delProdDiy(index)">
							<u-icon name="minus-circle-fill" color="#ff0000" size="40"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>

		<u-popup v-model="show" mode="center" width="1800" height="1300" closeable close-icon="close-circle"
			close-icon-color="#999" close-icon-size="40" border-radius="8">
			<diyCouponTable @tableExit="show = false"></diyCouponTable>
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
		name: "optionsCoupon",
		data() {
			return {
				curActive: -1,
				style: "1",
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
					handle: '.card',
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
			changefont1Color(event) {
				this.updateProps({
					font1_color: event
				})
			},
			changefont2Color(event) {
				this.updateProps({
					font2_color: event
				})
			},
			changebg1Color(event) {
				this.updateProps({
					bg1_color: event
				})
			},
			changebg2Color(event) {
				this.updateProps({
					bg2_color: event
				})
			},
			changebtnbgColor(event) {
				this.updateProps({
					btnbg_color: event
				})
			},
			changebtnColor(event) {
				this.updateProps({
					btn_color: event
				})
			},
			delProdDiy(index) {
				console.log(index)
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
				padding-right: 5px;
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
					width: 100%;
					margin-bottom: 5px;

					.card {
						position: relative;
						width: 100%;
						background-color: #f8f8f8;
						padding: 0 12rpx;
						border-radius: 8rpx;
						height: 40px;
						cursor: move;
						.del-btn {
							width: 40rpx;
							height: 40rpx;
							cursor: pointer;
						}
					}
				}
			}
		}
	}
</style>
