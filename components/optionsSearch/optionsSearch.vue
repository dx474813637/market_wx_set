<template>
	<view class="ww">
		<view class="menu-options-row u-flex u-col-top">
			<view class="item-label u-padding-top-20">搜索框形状</view>
			<view class="item-content u-flex">
				<el-radio v-model="shape" label="round">圆形</el-radio>
				<el-radio v-model="shape" label="square">方形</el-radio>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">搜索框背景颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].bgColor" border @input="changebgColor"
					type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].bgColor"
					@change="changebgColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">边框颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].borderColor" border @input="changeborderColor"
					type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].borderColor"
					@change="changeborderColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">占位文字内容</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].placeholder" border @input="changeplaceholder"
					type="text" />
			</view>
		</view>
		<view class="menu-options-row u-flex u-col-top">
			<view class="item-label u-padding-top-20">文字对齐方式</view>
			<view class="item-content u-flex">
				<el-radio v-model="inputAlign" label="left">左</el-radio>
				<el-radio v-model="inputAlign" label="center">中</el-radio>
				<el-radio v-model="inputAlign" label="right">右</el-radio>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">输入框字体颜色</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].color" border @input="changecolor"
					type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].color"
					@change="changecolor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex u-col-top">
			<view class="item-label">是否启用清除控件</view>
			<view class="item-content u-flex">
				<u-switch v-model="clearabled" size="35"></u-switch>
			</view>
		</view>
		<view class="menu-options-row u-flex u-col-top">
			<view class="item-label">是否显示右侧按钮</view>
			<view class="item-content u-flex">
				<u-switch v-model="showAction" size="35"></u-switch>
			</view>
		</view>
		<view class="menu-options-row u-flex u-col-top" v-if="showAction">
			<view class="item-label">右侧按钮文本颜色</view>
			<view class="item-content u-flex">
				<u-input :value="optData.options[curCompOptActive.index].action_color" border @input="changeActionColor"
					type="text" />
				<el-color-picker class="u-m-l-10" :value="optData.options[curCompOptActive.index].action_color"
					@change="changeActionColor"></el-color-picker>
			</view>
		</view>
		<view class="menu-options-row u-flex" v-if="showAction">
			<view class="item-label">按钮文字内容</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input :value="optData.options[curCompOptActive.index].actionText" border @input="changeactionText"
					type="text" />
			</view>
		</view>
		<view class="menu-options-row u-flex u-col-top">
			<view class="item-label">带有左侧图片</view>
			<view class="item-content u-flex">
				<u-switch v-model="leftPic" size="35"></u-switch>
			</view>
		</view>
		<view class="menu-options" id="menuOptList" v-if="leftPic">
			<view class="item" >
				<view class="item-box">
					<view class="box-title u-flex u-row-between">
						<view class="item-left u-flex">
							<text class="t">左侧图片配置</text>
						</view>
					</view>
					<view class="box-content">
						
						<view class="citem u-flex">
							<view class="citem-label">图片占比</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<el-slider
										:value="optData.options[curCompOptActive.index].leftPicWidth" 
										show-input
										:min="0"
										:max="50"
										input-size="mini"
										@input="handleChangeleftPicWidth"
									>
									</el-slider>
								</view>
							</view>
						</view>
						<view class="citem u-flex u-col-top">
							<view class="citem-label">图片</view>
							<view class="citem-main u-flex u-flex-wrap">
								
								<view class="item-input u-flex">
									<u-input :value="optData.options[curCompOptActive.index].leftPicSrc" @input="changeMenuUrl" placeholder="输入网络地址或点击下方上传图片" border type="text" />
								</view>
								<u-upload 
									ref="uploadSearchPic" 
									:max-size="1 * 1024 * 1024" 
									max-count="1" 
									width="500" 
									height="120"
									:multiple="false" 
									:action="uploadUrl" 
									:file-list="optData.options[curCompOptActive.index].leftPicSrc ? [{url: optData.options[curCompOptActive.index].leftPicSrc}] : []"
									@on-remove="handleRemoveUrl"
									@on-success="handlePicSuccess"
									image-mode="aspectFit"
								></u-upload>
								<text class="warn">输入网络图片地址或上传图片可自定义图片（推荐：可放网站LOGO）</text>
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
		name: "optionsSearch",
		data() {
			return {
				curActive: -1,
				shape: "round",
				inputAlign: "left",
				clearabled: false,
				showAction: false,
				leftPic: false,
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'uploadUrl']),
		},
		async created() {
			this.shape = this.optData.options[this.curCompOptActive.index].shape
			this.inputAlign = this.optData.options[this.curCompOptActive.index].inputAlign
			this.clearabled = this.optData.options[this.curCompOptActive.index].clearabled
			this.showAction = this.optData.options[this.curCompOptActive.index].showAction
			this.leftPic = this.optData.options[this.curCompOptActive.index].leftPic

			
		},
		watch: {
			leftPic(newV, oldV) {
				this.updateProps({
					leftPic: newV
				})
			},
			clearabled(newV, oldV) {
				this.updateProps({
					clearabled: newV
				})
			},
			showAction(newV, oldV) {
				this.updateProps({
					showAction: newV
				})
			},
			inputAlign(newV, oldV) {
				this.updateProps({
					inputAlign: newV
				})
			},
			shape(newV, oldV) {
				this.updateProps({
					shape: newV
				})
			},
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
			...mapActions(['getCateData']),
			changebgColor(event) {
				this.updateProps({
					bgColor: event
				})
			},
			changeborderColor(event) {
				this.updateProps({
					borderColor: event
				})
			},
			changeplaceholder(event) {
				this.updateProps({
					placeholder: event
				})
			},
			changeActionColor(event) {
				this.updateProps({
					action_color: event
				})
			},
			changecolor(event) {
				this.updateProps({
					color: event
				})
			},
			changeplaceholderColor(event) {
				this.updateProps({
					placeholderColor: event
				})
			},
			changeactionText(event) {
				this.updateProps({
					actionText: event
				})
			},
			
			handleChangeleftPicWidth(data) {
				this.updateProps({
					leftPicWidth: data
				})
			},
			changeMenuUrl(event) {
				if(event != this.optData.options[this.curCompOptActive.index].leftPicSrc){ 
					this.$refs.uploadSearchPic.clear()
				}
				this.updateProps({
					leftPicSrc: event,
				})
			},
			handlePicSuccess(data, index, lists) {
				if(data.code == 1) {
					this.$refs.uploadSearchPic.clear()
					this.updateProps({
						leftPicSrc: data.url,
					})
				}
			},
			handleRemoveUrl(index, lists) {
				this.updateProps({
					leftPicSrc: "",
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
