<template>
	<view class="ww">
		<view class="menu-options-row u-flex ">
			<view class="item-label">顶部标题</view>
			<view class="item-content u-flex">
				<u-switch v-model="nav_bar_flag" size="35"></u-switch>
			</view>
		</view>
		<template v-if="nav_bar_flag">
			<view class="menu-options-row u-flex">
				<view class="item-label">顶部标题栏文本</view>
				<view class="item-content u-flex u-flex-wrap">
					<u-input :value="optData.name" border @input="changename"
						type="text" />
				</view>
			</view>
			<view class="menu-options-row u-flex">
				<view class="item-label">顶部标题背景颜色</view>
				<view class="item-content u-flex u-flex-wrap">
					<u-input :value="optData.nav_bar_bgcolor" border @input="changenavbgColor"
						type="text" />
					<el-color-picker :value="optData.nav_bar_bgcolor"
						@change="changenavbgColor"></el-color-picker>
				</view>
			</view>
			<view class="menu-options-row u-flex">
				<view class="item-label">顶部标题文本颜色</view>
				<view class="item-content u-flex u-flex-wrap">
					<u-input :value="optData.nav_bar_color" border @input="changenavColor"
						type="text" />
					<el-color-picker :value="optData.nav_bar_color"
						@change="changenavColor"></el-color-picker>
				</view>
			</view>
		</template>
		
		<view class="menu-options-row u-flex">
			<view class="item-label">页面背景颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.bgColor" border @input="changebgColor"
					type="text" />
				<el-color-picker :value="optData.bgColor"
					@change="changebgColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">顶部背景块</view>
			<view class="item-content u-flex u-flex-wrap">
				<el-select v-model="top_box_flag" placeholder="请选择">
				    <el-option label="不显示" value="-1"></el-option>
				    <el-option label="显示纯色" value="1"></el-option>
				    <el-option label="显示渐变色" value="2"></el-option>
				    <el-option label="显示图片" value="3"></el-option>
				</el-select>
				<!-- <el-radio v-model="top_box_flag" label="-1">不显示</el-radio>
				<el-radio v-model="top_box_flag" label="1">显示纯色</el-radio>
				<el-radio v-model="top_box_flag" label="2">显示渐变色</el-radio>
				<el-radio v-model="top_box_flag" label="3">显示图片</el-radio> -->
				<!-- <u-switch v-model="top_box_flag" size="35"></u-switch> -->
			</view>
		</view>
		<view class="menu-options-row u-flex" v-if="top_box_flag != -1">
			<view class="item-label">顶部背景块颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.top_box_color" border @input="changetopBoxColor"
					type="text" />
				<el-color-picker :value="optData.top_box_color"
					@change="changetopBoxColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex" v-if="top_box_flag == 2">
			<view class="item-label">顶部背景块颜色2</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.top_box_color2" border @input="changetopBoxColor2"
					type="text" />
				<el-color-picker :value="optData.top_box_color2"
					@change="changetopBoxColor2"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex" v-if="top_box_flag == 2">
			<view class="item-label">颜色渐变角度</view>
			<view class="item-content u-flex u-flex-wrap">
				<el-slider
					:value="optData.top_box_color_rotate" 
					show-input
					:min="0"
					:max="360"
					@input="handleChangeColorRotate"
				>
				</el-slider>
			</view>
		</view>
		<view class="menu-options-row u-flex" v-if="top_box_flag != -1">
			<view class="item-label">顶部背景块高度</view>
			<view class="item-content u-flex u-flex-wrap">
				<el-slider
					:value="optData.top_box_height" 
					show-input
					:min="80"
					:max="800"
					@input="handleChangetopBoxHeight"
				>
				</el-slider>
			</view>
		</view>
		<view class="menu-options-row u-flex" v-if="top_box_flag != -1">
			<view class="item-label">顶部背景块下圆角</view>
			<view class="item-content u-flex u-flex-wrap">
				<el-slider
					:value="optData.top_box_radius" 
					show-input
					:min="0"
					:max="50"
					@input="handleChangetopBoxRadius"
				>
				</el-slider>
			</view>
		</view>
		<view class="menu-options" v-if="top_box_flag == 3">
			<view class="item" >
				<view class="item-box">
					<view class="box-title u-flex u-row-between">
						<view class="item-left u-flex">
							<text class="t">顶部背景块 - 图片配置</text>
						</view>
					</view>
					<view class="box-content">
						<view class="citem u-flex u-col-top">
							<view class="citem-label">图片</view>
							<view class="citem-main u-flex u-flex-wrap">
								
								<view class="item-input u-flex">
									<u-input :value="optData.top_box_img" @input="changeMenuUrl" placeholder="输入网络地址或点击下方上传图片" border type="text" />
								</view>
								<u-upload 
									ref="uploadTopBoxPic" 
									:max-size="1 * 1024 * 1024" 
									max-count="1" 
									width="500" 
									height="200"
									:multiple="false" 
									:action="uploadUrl" 
									:file-list="optData.top_box_img ? [{url: optData.top_box_img}] : []"
									@on-remove="handleRemoveUrl"
									@on-success="handlePicSuccess"
								></u-upload>
								<text class="warn">输入网络图片地址或上传图片可自定义图片 </text>
							</view>
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
		mapMutations,
		mapActions
	} from "vuex"
	export default {
		name: "optionsPage",
		data() {
			return {
				nav_bar_flag: false,
				top_box_flag: '-1',
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'uploadUrl']),
		},
		created() {
			this.nav_bar_flag = this.optData.nav_bar_flag
			this.top_box_flag = this.optData.top_box_flag
		},
		watch: {
			nav_bar_flag(newv) {
				this.updatePageOpt({
					nav_bar_flag: newv
				})
			},
			top_box_flag(newv) {
				this.updatePageOpt({
					top_box_flag: newv
				})
			}
		},
		methods: {
			...mapMutations(['updatePageOpt']),
			handleChangeColorRotate(event) {
				this.updatePageOpt({
					top_box_color_rotate: event
				})
			},
			handleChangetopBoxRadius(event) {
				this.updatePageOpt({
					top_box_radius: event
				})
			},
			handleChangetopBoxHeight(event) {
				this.updatePageOpt({
					top_box_height: event
				})
			},
			changetopBoxColor(event) {
				this.updatePageOpt({
					top_box_color: event
				})
			},
			changetopBoxColor2(event) {
				this.updatePageOpt({
					top_box_color2: event
				})
			},
			changebgColor(event) {
				this.updatePageOpt({
					bgColor: event
				})
			},
			changenavbgColor(event) {
				this.updatePageOpt({
					nav_bar_bgcolor: event
				})
			},
			changenavColor(event) {
				this.updatePageOpt({
					nav_bar_color: event
				})
			},
			changename(event) {
				this.updatePageOpt({
					name: event
				})
			},
			changeMenuUrl(event) {
				if(event != this.optData.options[this.curCompOptActive.index].top_box_img){ 
					this.$refs.uploadTopBoxPic.clear()
				}
				this.updateProps({
					top_box_img: event,
				})
			},
			handlePicSuccess(data, index, lists) {
				if(data.code == 1) {
					this.$refs.uploadTopBoxPic.clear()
					this.updateProps({
						top_box_img: data.url,
					})
				}
			},
			handleRemoveUrl(index, lists) {
				this.updateProps({
					top_box_img: "",
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.sortable-ghost {
		box-shadow: 0 0 10px rgba(170, 170, 255, 0.6);
	}

	.ww {

		// padding-top: 10px;
		.el-cascader,
		.el-select{
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
				.el-slider {
					width: 100%;
				}
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
									.el-slider {
										width: 100%;
									}
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
