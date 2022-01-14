<template>
	<view class="ww">
		<view class="menu-options-row u-flex">
			<view class="item-label">组件高度</view>
			<view class="item-content">
				<el-slider 
					:value="optData.options[curCompOptActive.index].diyHeight" 
					show-input
					:min="80"
					:max="1000"
					@input="handleChangediyHeight"
				>
				</el-slider>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">圆角</view>
			<view class="item-content">
				<el-slider 
					:value="optData.options[curCompOptActive.index].diyRadius" 
					show-input
					:min="0"
					:max="100"
					@input="handleChangediyRadius"
				>
				</el-slider>
			</view>
		</view>
		<view class="menu-options-row u-flex">
			<view class="item-label">左右边距</view>
			<view class="item-content">
				<el-slider 
					:value="optData.options[curCompOptActive.index].diyPadding" 
					show-input
					:min="0"
					:max="100"
					@input="handleChangediyPadding"
				>
				</el-slider>
			</view>
		</view>
		<view class="img-options u-m-t-40" id="imgOptList">
			<view class="item" v-for="(item,index) in optData.options[curCompOptActive.index].data" :key="item.id">
				<view class="item-box">
					<view class="box-title u-flex u-row-between">
						<view class="item-left u-flex">
							<view class="tuozhuai">
								<u-icon name="tuozhuai" custom-prefix="custom-icon"></u-icon>
							</view>
							<text class="t">图片{{index+1}}</text>
						</view>
						<view class="item-right">
							<text class="del" @click="delSwiperData(index)">删除</text>
						</view>
					</view> 
					<view class="box-content" v-if="!move">
						<view class="citem u-flex u-col-top">
							<view class="citem-label">图片路径</view>
							<view class="citem-main u-flex u-flex-wrap">
								
								<view class="item-input u-flex">
									<u-input :value="item.image" @input="changeSwiperImg" placeholder="输入网络地址或点击下方上传图片" border @focus="jujiao(index)" type="text" />
								</view>
								<u-upload 
									:ref="`${curCompOptActive.type}upload${index}`" 
									:max-size="1 * 1024 * 1024" 
									max-count="1" 
									width="150" 
									height="150"
									:multiple="false" 
									:action="uploadUrl" 
									:file-list="item.image ? [{url: item.image}] : []"
									@on-remove="handleRemoveUrl"
									@on-success="handlePicSuccess"
									:index="index"
								></u-upload>
								<text class="warn">建议尺寸:750px * 520px</text>
							</view>
						</view>
						<view class="citem u-flex u-col-top">
							<view class="citem-label">跳转链接</view>
							<view class="citem-main u-flex u-flex-wrap">
								<view class="item-input u-flex">
									<u-input :value="item.link" border @input="changeSwiperLink" @focus="jujiao(index)"
										type="text" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add-img">
			<el-button type="primary" plain size="mini" @click="addImg">添加</el-button>
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
		name: "optionsSwiper",
		mounted() {
			this.initSortable()
		},
		data() {
			return {
				curActive: -1,
				sortable: null,
				sortableEl: null,
				move: false
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData', 'uploadUrl']),
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
			async initSortable() {
				this.sortable = Sortable.create(document.getElementById("imgOptList"), {
					handle: '.tuozhuai',
					animation: 150,
					ghostClass: "sortable-ghost",
					forceFallback: true,
					onStart: e => {
						this.move = true
					},
					onEnd: ({ newIndex, oldIndex }) => {
						this.move = false
						this.updateSort({newIndex, oldIndex})
					}
				});
			},
			
			changeSwiperImg(event) {
				if(event != this.optData.options[this.curCompOptActive.index].data[this.curActive].url){
					this.$refs[`${this.curCompOptActive.type}upload${this.curActive}`][0].clear()
				}
				this.changeOptData({
					index: this.curActive,
					data: {
						image: event
					}
				})
			},
			changeSwiperLink(event) {
				this.changeOptData({
					index: this.curActive,
					data: {
						link: event
					}
				})
			},
			
			handleRemoveUrl(index, lists, name) {
				this.curActive = name
				this.changeOptData({
					index: this.curActive,
					data: {
						image: ""
					}
				})
			},
			handlePicSuccess(data, index, lists, name) {
				this.curActive = name
				if(data.code == 1) {
					this.$refs[`${this.curCompOptActive.type}upload${this.curActive}`][0].clear()
					this.changeOptData({
						index: this.curActive,
						data: {
							image: data.url
						}
					})
				}
			},
			delSwiperData(index) {
				this.delOptData(index)
			},
			jujiao(index) {
				this.curActive = index
			},
			addImg() {
				this.addnewData({
					image: "",
					url: ""
				})
			},
			handleChangediyHeight(data) {
				this.updateProps({
					diyHeight: data,
					diy: true
				})
			},
			handleChangediyRadius(data) {
				this.updateProps({
					diyRadius: data
				})
			},
				
			handleChangediyPadding(data) {
				this.updateProps({
					diyPadding: data
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
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
		padding-top: 10px;
		
		.menu-options-row {
			padding-left: 10px;
			height: 40px;

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
		.img-options {
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
									padding-top: 15px;
									color: #999;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
