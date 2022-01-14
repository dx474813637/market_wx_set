<template>
	<view class="style-popup">
		<view class="popup-title u-flex">
			<u-icon name="buju1" custom-prefix="custom-icon" size="40"></u-icon>
			<text>富文本列表（点击表格行信息进行选择）</text>
		</view>
		<view class="popup-content u-flex u-flex-wrap u-col-top">
			<view class="item-right">
				<el-table 
					ref="richtextTable"
					:data="tableData.list" 
					style="width: 100%"
					@current-change="handleCurrentChange"
					border
					highlight-current-row
					size="small"
					max-height="500"
				>
					<el-table-column prop="id" label="ID" width="55">
					</el-table-column>
					<el-table-column prop="title" label="标题" width="120">
					</el-table-column>
					<el-table-column label="内容">
						<template slot-scope="scope">
							<view class="richtext">
								<u-parse autoscroll :html="scope.row.info" ></u-parse>
								<!-- <rich-text :nodes="scope.row.data"></rich-text> -->
							</view>
							
						</template>
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
		name:"richtextTable",
		data() {
			return {
				defaultProps: {
				  children: 'children',
				  label: 'label'
				},
				multipleSelection: null,
				options: [],
				pageSize: 10,
				curP: 1,
				isPageChange: false,
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'richtext_data']),
			tableData: {
				get() {
					return this.richtext_data
				}
			}
		},
		async created() {
			await this.getRichtextData({p: this.curP})
			this.handleChecked()
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
			...mapActions(['getRichtextData']),
			async refresh() {
				this.curP = 1
				await this.getRichtextData({p: this.curP})
				this.handleChecked()
			},
			handleChecked() {
				let tarId = this.multipleSelection ? this.multipleSelection.id : this.optData.options[this.curCompOptActive.index].dataId
				this.$nextTick(() => {
					// this.optData.options[this.curCompOptActive.index].data.forEach(row => {
					this.$refs.richtextTable.setCurrentRow(
						this.tableData.list.find((item) =>  item.id == tarId )
						, true
					);
					// })
				})
			},
			handleCurrentChange(currentRow, oldCurrentRow) {
				// console.log(currentRow)
				this.multipleSelection = currentRow;
				
			},
			handleUpadteData() {
				this.updateProps({
					data: this.multipleSelection.info,
					dataId: this.multipleSelection.id
				})
				this.$emit("tableExit")
			},
			async handleChangePage(p) {
				console.log(this.multipleSelection)
				this.curP = p
				await this.getRichtextData({p})
				this.handleChecked()
			}	
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 20px 0;
	}
	.richtext {
		position: relative;
		&:after {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
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
			
			.item-right {
				flex: 1;
				padding: 20rpx;
				height: 100%;
				overflow-y: auto;
			}
		}
	}
</style>
