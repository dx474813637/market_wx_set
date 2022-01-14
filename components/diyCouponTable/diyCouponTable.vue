<template>
	<view class="style-popup">
		<view class="popup-title u-flex">
			<u-icon name="youhuiquan" custom-prefix="custom-icon" size="40"></u-icon>
			<text>优惠券列表</text>
		</view>
		<view class="popup-content u-flex u-flex-wrap u-col-top">
			<!-- <view class="item-left">
				<el-tree 
					:data="cateData" 
					:props="defaultProps" 
					@node-click="handleNodeClick"
					highlight-current
					:expand-on-click-node="false"
				></el-tree>
			</view> -->
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
					<el-table-column prop="title" label="标题" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="优惠额度" width="80">
						<template slot-scope="scope">{{ scope.row.cate == '2' ? scope.row.coupon / 10 + '折': scope.row.coupon }}</template>
					</el-table-column>
					<el-table-column prop="term" label="优惠门槛" width="80">
					</el-table-column>
					<el-table-column label="类型" width="100">
						<template slot-scope="scope">
							<template v-if="scope.row.cate == '1'">满减券</template>
							<template v-else-if="scope.row.cate == '2'">满折券</template>
							<template v-else>{{scope.row.cate}}</template>
						</template>
					</el-table-column>
					<el-table-column prop="time2" label="到期日期" width="100">
					</el-table-column>
					<el-table-column prop="number" label="数量" width="80">
					</el-table-column>
					<el-table-column label="剩余" width="80">
						<template slot-scope="scope">{{scope.row.number - scope.row.receive_num}}</template>
					</el-table-column>
				</el-table>
				<view class="page u-flex u-row-between">
					<view class="item-left">
						<el-pagination
							background
							layout="total, pager"
							:total="tableData.count"
							:pageCount="tableData.pages"
							:pageSize="pageSize"
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
		name:"diyCouponTable",
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
				ls_arr: [],
				isPageChange: false,
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'cateData', 'coupon_data']),
			tableData: {
				get() {
					return this.coupon_data || {}
				}
			}
		},
		async created() {
			if(!this.coupon_data.list) {
				await this.getCouponData({p: this.curP})
			}
			this.ls_arr = this.optData.options[this.curCompOptActive.index].data
			this.handleChecked()
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
			...mapActions(['getCouponData']),
			async refresh() {
				this.curP = 1
				await this.getCouponData({p: this.curP})
				this.handleChecked()
			},
			handleSelectUser() {
				this.isPageChange = false
			},
			handleNodeClick(obj, node, el) {
				console.log(obj)
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
			handleSelectionChange(val) {
				if(val.length < this.multipleSelection.length && !this.isPageChange) {
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
				this.isPageChange = true
				this.curP = p
				await this.getCouponData({p})
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
				flex: 1;
				// width: calc(100% - 480rpx);
				// flex: 0 0 calc(100% - 480rpx);
				padding: 20rpx;
				height: 100%;
				overflow-y: auto;
			}
		}
	}
</style>
