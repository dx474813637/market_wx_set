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
			<view class="item-label u-padding-top-20">排列类型</view>
			<view class="item-content u-flex">
				<el-radio v-model="col_type" label="1">多行模式</el-radio>
				<el-radio v-model="col_type" label="2">单行滑动</el-radio>
			</view>
		</view>
		<view class="menu-options-row u-flex u-col-top" v-if="style == '1' && col_type == '1'">
			<view class="item-label u-padding-top-20">列数</view>
			<view class="item-content u-flex">
				<el-radio v-model="col_num" label="2">2列</el-radio>
				<el-radio v-model="col_num" label="3">3列</el-radio>
			</view>
		</view>
		<view class="menu-options-row u-flex u-col-top" v-if="style == '2' ">
			<view class="item-label u-padding-top-20">商品图片</view>
			<view class="item-content u-flex">
				<el-radio v-model="isPic" label="1">显示</el-radio>
				<el-radio v-model="isPic" label="2">不显示</el-radio>
			</view>
		</view>
		<view class="menu-options-row u-flex u-col-top">
			<view class="item-label u-padding-top-20">选择分类</view>
			<view class="item-content u-flex u-flex-1">
				<el-cascader 
					:options="cateData" 
					:props="{ multiple: true, checkStrictly: true, value: 'id' }" 
					clearable
					:show-all-levels="false"
					size="medium"
					@change="handleChangeTabs"
					v-model="selectArr"
				>
				</el-cascader>
			</view>
		</view>
		<view class="menu-options-row u-flex u-col-top">
			<view class="item-label u-padding-top-20">tabs滑块</view>
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
				<el-color-picker :value="optData.options[curCompOptActive.index].activeColor"
					@change="changeActiveColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">tabs未激活颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].inactiveColor" border @input="changeinActiveColor"
					type="text" />
				<el-color-picker :value="optData.options[curCompOptActive.index].inactiveColor"
					@change="changeinActiveColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">tabs背景颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].tabs_bg_color" border @input="changebgColor"
					type="text" />
				<el-color-picker :value="optData.options[curCompOptActive.index].tabs_bg_color"
					@change="changebgColor"></el-color-picker>
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
		<view class="menu-options-row u-flex">
			<view class="item-label">按钮颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].buy_btn_color" border @input="changebtnColor"
					type="text" />
				<el-color-picker :value="optData.options[curCompOptActive.index].buy_btn_color"
					@change="changebtnColor"></el-color-picker>
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
		name: "optionsTabs",
		data() {
			return {
				curActive: -1,
				style: "1",
				col_num: "2",
				col_type: "1",
				isPic: "1",
				show_bar: "1",
				uploadUrl: "http://www.example.com/upload",
				selectArr: []
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'cateData', 'ajaxBaseUrl']),
		},
		async created() {
			this.style = this.optData.options[this.curCompOptActive.index].style
			this.col_num = this.optData.options[this.curCompOptActive.index].col_num
			this.col_type = this.optData.options[this.curCompOptActive.index].col_type
			this.isPic = this.optData.options[this.curCompOptActive.index].isPic
			this.show_bar = this.optData.options[this.curCompOptActive.index].show_bar
			this.selectArr = this.optData.options[this.curCompOptActive.index].tabsId
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
			col_type(newv) {
				this.updateProps({
					col_type: newv
				})
			},
			isPic(newv) {
				this.updateProps({
					isPic: newv
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
			async handleChangeTabs(v) {
				let oldTabsId = this.optData.options[this.curCompOptActive.index].tabsId
				let i
				let tabs_arr = []
				if(oldTabsId.length > v.length) {
					oldTabsId.forEach((item, index) => {
						let idlist = v.map(ele => ele.toString());
						if(!idlist.includes(item.toString())) {
							i = index
						}
					})
					oldTabsId.splice(i, 1)  
				}else if(oldTabsId.length < v.length) {
					v.forEach((item, index) => {
						let idlist = oldTabsId.map(ele => ele.toString());
						if(!idlist.includes(item.toString())) {
							i = index
						}
					})
					oldTabsId.push(v[i])
				}
				tabs_arr = oldTabsId
				this.selectArr = tabs_arr
				this.updateProps({
					tabsId: tabs_arr
				})
				let data = []
				let p_arr = []
				tabs_arr.forEach(async (ele, index) => {
					let id = ele[ele.length - 1];
					let name = this.cateData
					ele.forEach((item, i) => {
						name = name.filter(e => e.id == item)[0]
						if(i == ele.length - 1) {
							name = name.label
						}else {
							name = name.children
						}
					})
					p_arr.push(this.$http.get(`Index/diy_home_product`, {params: {cate: id, p: 1}}))
					data.push({ name, data: []})
					
				})
				let res = await Promise.all(p_arr)
				res.forEach((ele, index) => {
					data[index].data = ele.data.list
				})
				this.updateProps({
					tabs: data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sortable-ghost {
		box-shadow: 0 0 10px rgba(170, 170, 255, 0.6);
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
		}
	}
</style>
