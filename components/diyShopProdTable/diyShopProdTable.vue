<template>
	<view class="style-popup">
		<view class="popup-title u-flex">
			<u-icon name="buju1" custom-prefix="custom-icon" size="40"></u-icon>
			<text>商品配置</text>
		</view>
		<view class="popup-content u-flex u-flex-wrap u-col-top">
			<view class="item-right">
				<el-table 
					ref="multipleTable"
					:data="p_list" 
					v-loading="loading"
					tooltip-effect="dark" 
					style="width: 100%"
					@selection-change="handleSelectionChange"
					@select="handleSelectUser"
					border
					header-row-class-name="header-row"
					size="small"
				>
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="id" label="ID" width="55">
					</el-table-column>
					<el-table-column prop="pimage" label="图片" width="60">
						<template slot-scope="scope">
							<u-image mode="aspectFill" width="80" height="80" :src="scope.row.pic1"></u-image>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="标题" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="price" label="价格" width="200">
					</el-table-column>
					<view slot="empty" class="empty-wrap">当前无数据</view>
				</el-table>
				<view class="page u-flex u-row-between">
					<view class="item-left">
						<el-pagination
							background
							layout="total, pager"
							:total="Totalcount"
							:page-count="pagesCount"
							:page-size="pageSize"
							:current-page="curP"
							@current-change="handleChangePage"
						>
						</el-pagination>
					</view>
					
					<view class="item-btn">
						<el-button type="primary"  size="mini" plain @click="refresh">刷新</el-button>
						<el-button type="primary" size="mini" @click="handleUpadteData">选择</el-button>
					</view>
				</view>
				
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
		name:"diyShopProdTable",
		props: {
			login: {
				type: String,
				default: ''
			},
			curData: {
				type: Array,
				default: () => {
					return []
				}
			},
			curActive: {
				type: Number | String,
				default: 0
			}
		},
		data() {
			return {
				defaultProps: {
				  children: 'children',
				  label: 'label'
				},
				multipleSelection: [],
				options: [],
				pageSize: 10,
				pagesCount: 10,
				Totalcount: 10,
				curP: 1,
				curCate: "",
				ls_arr: [],
				isTreeChange: false,
				p_list: [],
				loading: false
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'cateData', 'product_data']),
			tableData: {
				get() {
					return this.product_data || {}
				}
			}
		},
		async created() {
			
			// this.handleChecked()
		},
		async mounted() {
			await this.getData()
			this.handleChecked()
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
			...mapActions(['getCateData', 'getProductData']),
			async getData() {
				this.loading = true;
				let res = await this.$http.get('Index/diy_home_shop_product', {
					params: {
						login: this.login,
						p: this.curP
					}
				})
				this.loading = false;
				if(res.data.code != 1) return;
				this.p_list = res.data.list
				this.pagesCount = Number(res.data.pages)
				this.Totalcount = Number(res.data.count)
			},
			async refresh() {
				this.isTreeChange = true
				this.curP = 1
				await this.getData()
				this.handleChecked()
			},
			handleChecked() {
				this.$nextTick(() => {
					this.curData.forEach(row => {
						let el =this.p_list.find((item) =>  item.id == row.id )
						if(el) {
							this.$refs.multipleTable.toggleRowSelection( el, true);
						}
						
					})
				})
			},
			handleSelectUser(selection, row) {
				if(selection.length > 2) {
					this.$nextTick(() => {
						this.$refs.multipleTable.toggleRowSelection( row, false);
						uni.showToast({
							icon:"none",
							title: '至多配置2个推荐显示'
						})
					})
				}
			},
			handleSelectionChange(val) {
				if(val.length < this.multipleSelection.length && !this.isTreeChange) {
					let arr = this.dataFilterItem(val, this.multipleSelection) 
					this.ls_arr = this.dataFilterItem(arr, this.ls_arr) 
				}else {
					this.multipleSelection = val;
					this.ls_arr = this.dataFilter(this.ls_arr, val)
				}
			},
			dataFilterItem(arr1, arr2) {
				return arr2.filter(item => {
					let idlist = arr1.map(v => v.id);
					return !idlist.includes(item.id)
				})
			},
			dataFilter(arr1, arr2) {
				let arr = this.dataFilterItem(arr1, arr2)
				return [ ...arr, ...arr1]
			},
			handleUpadteData() {
				this.changeOptData({
					index: this.curActive,
					data: {
						data: this.ls_arr
					}
				})
				this.$emit("tableExit")
				this.p_list = []
			},
			async handleChangePage(p) {
				this.curP = p
				await this.getData()
				this.handleChecked()
			}	
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 20px 0;
	}
	.style-popup {
		.el-table {
			/deep/ .header-row th:first-child .cell {
				display: none!important;
			}
		}
		.popup-title {
			height: 50px;
			padding: 0 20px;
			color: #7b9bbb;
			background-color: #2c3e50;
			text {
				color: #fff;
				font-weight: bold;
				padding-left: 10px;
			}
		}
	
		.popup-content {
			padding: 0 20rpx;
			height: 1200rpx;
				>.item-left {
				width: 480rpx;
				flex: 0 0 480rpx;
				padding: 20rpx;
				height: 100%;
				overflow-y: auto;
				border-right: 1rpx solid #f8f8f8;
			}
			.item-right {
				flex: 1;
				width: 100%;
				padding: 20rpx;
				height: 100%;
				overflow-y: auto;
				.el-table {
					min-height: 300px;
				}
			}
		}
	}
</style>
