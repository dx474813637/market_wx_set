<template>
	<view class="style-popup">
		<view class="popup-title u-flex">
			<u-icon name="buju1" custom-prefix="custom-icon" size="40"></u-icon>
			<text>商品选择</text>
		</view>
		<view class="popup-content u-flex u-flex-wrap u-col-top">
			<view class="item-left">
				<el-tree 
					:data="cateData" 
					:props="defaultProps" 
					@node-click="handleNodeClick"
					highlight-current
					:expand-on-click-node="false"
				></el-tree>
			</view>
			<view class="item-right">
				<el-table 
					ref="multipleTable"
					:data="tableData.list" 
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
					<!-- <el-table-column label="日期" width="120">
						<template slot-scope="scope">{{ scope.row.date }}</template>
					</el-table-column> -->
					<el-table-column prop="pimage" label="图片" width="60">
						<template slot-scope="scope">
							<u-image mode="aspectFill" width="80" height="80" :src="scope.row.pimage"></u-image>
						</template>
					</el-table-column>
					<el-table-column prop="pname" label="标题" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="price" label="价格" width="100">
					</el-table-column>
				</el-table>
				<view class="page u-flex u-row-between">
					<view class="item-left">
						<el-pagination
							background
							layout="total, pager"
							:total="tableData.count"
							:page-count="tableData.pages"
							:page-size="tableData.pageSize || pageSize"
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
		name:"diyProductTable",
		data() {
			return {
				defaultProps: {
				  children: 'children',
				  label: 'label'
				},
				multipleSelection: [],
				options: [],
				pageSize: 10,
				curP: 1,
				curCate: "",
				ls_arr: [],
				isTreeChange: false,
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
			if(this.cateData && this.cateData.length == 0) {
				await this.getCateData()
			}
			await this.getProductData({p:1})
			
			this.ls_arr = this.optData.options[this.curCompOptActive.index].data
			this.handleChecked()
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
			...mapActions(['getCateData', 'getProductData']),
			async refresh() {
				this.isTreeChange = true
				this.curP = 1
				await this.getProductData({cate: this.curCate, p: this.curP})
				this.handleChecked()
			},
			async handleNodeClick(obj, node, el) {
				this.curP = 1;
				this.curCate = obj.id
				this.isTreeChange = true
				await this.getProductData({cate: obj.id, p:1})
				// this.ls_arr = Array.from(new Set([...this.ls_arr, ...this.multipleSelection]))
				this.handleChecked()
			},
			handleChecked() {
				this.$nextTick(() => {
					this.ls_arr.forEach(row => {
						let el =this.tableData.list.find((item) =>  item.id === row.id )
						if(el) {
							this.$refs.multipleTable.toggleRowSelection( el, true);
						}
						
					})
				})
			},
			handleSelectUser() {
				this.isTreeChange = false
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
				this.updateProps({
					data: this.ls_arr
				})
				this.$emit("tableExit")
			},
			async handleChangePage(p) {
				this.isTreeChange = true
				this.curP = p
				await this.getProductData({cate: this.curCate, p})
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
			.item-left {
				width: 480rpx;
				flex: 0 0 480rpx;
				padding: 20rpx;
				height: 100%;
				overflow-y: auto;
				border-right: 1rpx solid #f8f8f8;
			}
			.item-right {
				width: calc(100% - 480rpx);
				flex: 0 0 calc(100% - 480rpx);
				padding: 20rpx;
				height: 100%;
				overflow-y: auto;
			}
		}
	}
</style>
