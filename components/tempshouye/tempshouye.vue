<template>
	<view class="wrapper" :style="{
		background: optData.bgColor
	}" >
		
		<view class="navbar u-flex u-row-center" v-if="optData.nav_bar_flag" :style="{
			color: optData.nav_bar_color,
			backgroundColor: optData.nav_bar_bgcolor
		}">
			<view class="item u-line-1">{{optData.name}}</view>
		</view>
		 
		<view class="top-box" v-if="optData.top_box_flag" :style="{
			'height': optData.top_box_height + 'rpx',
			'border-radius': `0 0 ${optData.top_box_radius}% ${optData.top_box_radius}%`,
			'background': optData.top_box_color,
		}"></view>
		
		<view class="ww" id="list">
			<view 
				class="item-wrapper" 
				v-for="(item, i) in optData.options" 
				:key="i"
				:class="{
					'active-border': curCompOptActive.index == i
				}"
			>	
				<view 
					class="del-btn u-flex u-row-center" 
					v-if="curCompOptActive.index == i" 
					title="移除组件" 
					@click.stop="handleDelCpt(i)"
				>
					<i class="el-icon-delete"></i>
				</view>
				<!-- <view 
					class="move-btn u-flex u-row-center" 
					v-if="curCompOptActive.index == i && i != 0" 
					title="拖拽组件可改变序列"
				>
					<i class="el-icon-info"></i>
				</view> -->
				
				<!-- <image src="../../static/img/tabs-header.png" class="mb-header-bar" mode="widthFix"  v-if="i == 0 && item.type == 'swiper'"></image> -->
				<template v-if="item.type == 'swiper'">
					<view class="swiper-wrapper" :style="{
						'padding-left': item.diyPadding + 'rpx',
						'padding-right': item.diyPadding + 'rpx'
					}">
						<!-- <view class="swiper-header-row u-flex u-row-between" v-if="i == 0">
							<view class="item-left">
								<view class="shop-name">{{optData.name}}</view>
							</view>
							<view class="item-right">
								<view class="item-search-icon u-flex u-row-center"><i class="el-icon-search"></i></view>
							</view>
						</view> -->
						<u-swiper 
							:list="item.data" 
							:height="item.diy? item.diyHeight : 400" 
							:border-radius="item.diyRadius" 
						></u-swiper>
						<view class="swiper-mask"></view>
					</view>
				</template>
				
				<template v-if="item.type == 'menu'">
					<view class="menu-wrapper u-flex u-flex-wrap" v-if="item.isWrap == 'wrap'">
						<view class="item u-flex u-row-center" v-for="(ele, index) in item.data" :key="index" 
							:class="{
								'col-6': item.col == 6,
								'col-5': item.col == 5,
								'col-4': item.col == 4,
							}"
						>
							<view class="menu-img">
								<u-image width="100%" height="100%" :src="ele.url" :shape="item.shape" border-radius="4"></u-image>
							</view>
							<view class="menu-title u-line-1" :style="{
								color: item.title_color
							}">{{ele.title}}</view>
						</view>
					</view>
					<scroll-view scroll-x v-else-if="item.isWrap == 'nowrap'">
						<view class="menu-wrapper u-flex nowrap">
							<view class="item u-flex u-row-center" v-for="(ele, index) in item.data" :key="index" >
								<view class="menu-title" :style="{
									color: item.title_color
								}">{{ele.title}}</view>
							</view>
						</view>
					</scroll-view>
					
				</template>
				<template v-if="item.type == 'ad'">
					<view class="ad-wrapper u-flex" 
						:class="{
							'ad-1': item.style == 1,
							'ad-2': item.style == 2,
							'ad-3': item.style == 3,
							'ad-4': item.style == 4,
							'ad-5': item.style == 5,
							'ad-6': item.style == 6,
							'ad-7': item.style == 7
						}"
						:style="{
							'height': (item.diy? item.diyHeight : 400) + 'rpx'
						}"
					>
						<template v-if="item.style == 1">
							<view class="item u-flex-1">
								<u-image width="100%" height="100%" :src="item.data[0].image" v-if="item.data[0] && item.data[0].image"></u-image>
							</view>
						</template>
						<template v-if="item.style == 2">
							<view class="item u-flex-1">
								<u-image width="100%" height="100%" :src="item.data[0].image" v-if="item.data[0] && item.data[0].image"></u-image>
							</view>
							<view class="item u-flex-1">
								<u-image width="100%" height="100%" :src="item.data[1].image" v-if="item.data[1] && item.data[1].image"></u-image>
							</view>
						</template>
						<template v-if="item.style == 3">
							<view class="item u-flex-1">
								<u-image width="100%" height="100%" :src="item.data[0].image" v-if="item.data[0] && item.data[0].image"></u-image>
							</view>
							<view class="item u-padding-0 half u-flex-1">
								<view class="item half-h">
									<u-image width="100%" height="100%" :src="item.data[1].image" v-if="item.data[1] && item.data[1].image"></u-image>
								</view>
								<view class="item half-h">
									<u-image width="100%" height="100%" :src="item.data[2].image" v-if="item.data[2] && item.data[2].image"></u-image>
								</view>
							</view>
						</template>
						<template v-if="item.style == 4">
							<view class="item u-padding-0 half u-flex-1">
								<view class="item half-h">
									<u-image width="100%" height="100%" :src="item.data[0].image" v-if="item.data[0] && item.data[0].image"></u-image>
								</view>
								<view class="item half-h">
									<u-image width="100%" height="100%" :src="item.data[1].image" v-if="item.data[1] && item.data[1].image"></u-image>
								</view>
							</view>
							<view class="item u-flex-1">
								<u-image width="100%" height="100%" :src="item.data[2].image" v-if="item.data[2] && item.data[2].image"></u-image>
							</view>
						</template>
						<template v-if="item.style == 5">
							<view class="item u-padding-0 u-flex-1 u-flex">
								<view class="item u-flex-1">
									<u-image width="100%" height="100%" :src="item.data[0].image" v-if="item.data[0] && item.data[0].image"></u-image>
								</view>
								<view class="item u-flex-1">
									<u-image width="100%" height="100%" :src="item.data[1].image" v-if="item.data[1] && item.data[1].image"></u-image>
								</view>
							</view>
							<view class="item u-flex-1">
								<u-image width="100%" height="100%" :src="item.data[2].image" v-if="item.data[2] && item.data[2].image"></u-image>
							</view>
						</template>
						<template v-if="item.style == 6">
							<view class="item u-flex-1">
								<u-image width="100%" height="100%" :src="item.data[0].image" v-if="item.data[0] && item.data[0].image"></u-image>
							</view>
							<view class="item u-padding-0 u-flex-1 u-flex">
								<view class="item u-flex-1">
									<u-image width="100%" height="100%" :src="item.data[1].image" v-if="item.data[1] && item.data[1].image"></u-image>
								</view>
								<view class="item u-flex-1">
									<u-image width="100%" height="100%" :src="item.data[2].image" v-if="item.data[2] && item.data[2].image"></u-image>
								</view>
							</view>
						</template>
						<template v-if="item.style == 7">
							<view class="item u-padding-0 u-flex-1 u-flex">
								<view class="item u-flex-1">
									<u-image width="100%" height="100%" :src="item.data[0].image" v-if="item.data[0] && item.data[0].image"></u-image>
								</view>
								<view class="item u-flex-1">
									<u-image width="100%" height="100%" :src="item.data[1].image" v-if="item.data[1] && item.data[1].image"></u-image>
								</view>
							</view>
							<view class="item u-padding-0 u-flex-1 u-flex">
								<view class="item u-flex-1">
									<u-image width="100%" height="100%" :src="item.data[2].image" v-if="item.data[2] && item.data[2].image"></u-image>
								</view>
								<view class="item u-flex-1">
									<u-image width="100%" height="100%" :src="item.data[3].image" v-if="item.data[3] && item.data[3].image"></u-image>
								</view>
								<view class="item u-flex-1">
									<u-image width="100%" height="100%" :src="item.data[4].image" v-if="item.data[4] && item.data[4].image"></u-image>
								</view>
							</view>
						</template>
						
					</view>
				</template>
				
				<template v-if="item.type == 'title'">
					<view class="title-wrapper u-padding-8 u-flex u-row-center">
						<view class="bg">
							<u-image width="100%" height="100%" mode="scaleToFill" :src="item.bg"></u-image>
						</view>
						<view class="title" :style="{
							color: item.titleColor
						}">{{item.title}}</view>
					</view>
				</template>
				
				<template v-if="item.type == 'productTabs'">
					<view class="product-wrapper" v-if="item.tabs && item.tabs.length > 0">
						<view class="product-tabs">
							<u-tabs 
								:list="item.tabs | filterTabs" 
								is-scroll 
								:current="current"
								:active-color="item.activeColor || '#2979ff'"
								:inactive-color="item.inactiveColor || '#303133'"
								:showBar="item.show_bar == 1? true : false"
								:bgColor="item.tabs_bg_color || 'transparent'"
								@change="handleChangeIndex"
							></u-tabs>
						</view>
						<view 
							class="product-list u-flex u-flex-wrap u-padding-8" 
							:class="{
								list1: item.style == '1',
								list2: item.style == '2'
							}" 
							:style="{
								backgroundColor: item.list_bg_color || '#f8f8f8'
							}"
							v-if="item.tabs[current].data && item.tabs[current].data.length > 0"
						>
							<view class="item u-padding-8" v-for="(ele, index) in item.tabs[current].data" :key="ele.id">
								<view class="p-card u-flex">
									<view class="p-img-wrap">
										<view class="p-img">
											<image width="100%" height="100%" mode="aspectFill" :src="ele.pimage" >
										</view>
									</view>
									
									<view class="p-content">
										<view class="p-name u-line-1">{{ele.pname}}</view>
										<view class="p-sub u-line-1">{{ele.psub}}</view>
										<view class="p-bottom u-flex u-row-between">
											<view class="item-left">￥{{ele.price}}</view>
											<view class="item-right">
												<u-button type="primary" shape="circle" size="mini" :custom-style="{background: item.buy_btn_color}">
													<u-icon name="shopping-cart"></u-icon>
												</u-button>
											</view>
										</view>
									</view>
									
								</view>
							</view>
						</view>
						
					</view>
					<view v-else>
						<u-empty text="请选择分类,生成分类选项卡" mode="list"></u-empty>
					</view>
					
				</template>
				
				<template v-if="item.type == 'productDiy'">
					<view class="product-wrapper" v-if="item.data && item.data.length > 0">
						<view 
							class="product-list u-flex u-flex-wrap u-padding-8" 
							:class="{
								list1: item.style == '1',
								list2: item.style == '2'
							}" 
							:style="{
								backgroundColor: item.list_bg_color || '#f8f8f8'
							}"
						>
							<view class="item u-padding-8" v-for="(ele, index) in item.data" :key="ele.id">
								<view class="p-card u-flex">
									<view class="p-img-wrap">
										<view class="p-img">
											<image width="100%" height="100%" mode="aspectFill" :src="ele.pimage" >
										</view>
									</view>
									
									<view class="p-content">
										<view class="p-name u-line-1">{{ele.pname}}</view>
										<view class="p-sub u-line-1">{{ele.psub}}</view>
										<view class="p-bottom u-flex u-row-between">
											<view class="item-left">￥{{ele.price}}</view>
											<view class="item-right">
												<u-button type="primary" shape="circle" size="mini" :custom-style="{background: item.buy_btn_color}">
													<u-icon name="shopping-cart"></u-icon>
												</u-button>
											</view>
										</view>
									</view>
									
								</view>
							</view>
						</view>
						
					</view>
					<view v-else>
						<u-empty text="请选择分类,生成分类选项卡" mode="list"></u-empty>
					</view>
				</template>
				<template v-if="item.type == 'coupon'">
					<view class="product-wrapper" v-if="item.data && item.data.length > 0">
						<view
							class="product-list coupon u-flex u-flex-wrap u-padding-8" 
							:class="{
								list2: item.style == '1',
								list1: item.style == '2'
							}"
						>
							<view class="item u-padding-8" v-for="(ele, index) in item.data" :key="ele.id">
								<view class="coupon-card u-flex" :style="{
									background: `linear-gradient(to right, ${item.bg1_color}, ${item.bg2_color}`,
								}">
									<view class="item-left">
										<view class="coupon-title u-line-1" :style="{
											color: item.font1_color
										}">
											<text>￥</text>
											<text class="coupon">{{ele.coupon}}</text>
											<text class="title u-line-1">{{ele.title}}</text>
										</view>
										<view class="coupon-term u-line-1" :style="{
											color: item.font2_color
										}">
											满 {{ele.term}} 可用
										</view>
										<view class="coupon-time u-line-1" :style="{
											color: item.font2_color
										}">
											有效期：{{ele.time1}}至{{ele.time1}}
										</view>
									</view>
									<view class="item-right u-flex u-row-center">
										<view class="coupon-btn" :style="{
											background: item.btnbg_color,
											color: item.btn_color
										}">立即领取</view>
										<view class="coupon-num u-line-1" :style="{
											color: item.font2_color
										}">仅剩{{ele.number - ele.receive_num}}张</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-else>
						<u-empty text="请选择优惠券,生成数据" mode="list"></u-empty>
					</view>
				</template>
				
				<template v-if="item.type == 'richtext'">
					<view class="richText-wrapper" v-if="item.data">
						<u-parse 
							:html="item.data" 
							:key="item.id"
						></u-parse>
					</view>
					<view v-else>
						<u-empty text="请选择富文本内容" mode="list"></u-empty>
					</view>
					
				</template>
				
				<template v-if="item.type == 'search'">
					<view class="search-wrapper u-flex">
						<view class="search-left-pic" v-if="item.leftPic" :style="{
							flex: `0 0 ${item.leftPicWidth}%`,
							width: `0 0 ${item.leftPicWidth}%`,
						}">
							<u-image
								height="64"
								mode="aspectFit"
								:src="item.leftPicSrc"
							></u-image>
						</view>
						<view class="search-content">
							<u-search
								v-model="demo"
								:shape="item.shape"
								:bgColor="item.bgColor"
								:placeholder="item.placeholder"
								:inputAlign="item.inputAlign"
								:color="item.color"
								:placeholderColor="item.placeholderColor"
								:clearabled="item.clearabled"
								:showAction="item.showAction"
								:actionText="item.actionText"
								:borderColor="item.borderColor"
							></u-search>
						</view>
						
					</view>
					
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from "vuex"
	import Sortable from 'sortablejs';
	export default {
		name:"tempshouye",
		data() {
			return {
				current: 0,
				demo: "",
				vueThis: this,
			};
		},
		mounted() {
			this.initSortable()
		},
		computed: {
			...mapState(['curCompOptActive', 'optData']),
		},
		created() {
			// console.log(this.opt)
		},
		filters: {
			filterTabs(v) {
				return v.map(ele => {
					return {name: ele.name}
				})
			}
		},
		methods: {
			...mapMutations(['changeCurComp', 'delCptData', 'changeCptSort']),
			handleSelectComp(i) {
				this.changeCurComp({
					index: i,
					type: this.optData.options[i].type
				})
			},
			handleDelCpt(i) {
				this.delCptData(i)
			},
			handleChangeIndex(index) {
				// this.current = index
			},
			async initSortable() {
				
				this.sortable = Sortable.create(document.getElementById("list"), {
					// handle: '.move-btn',
					handle: '.item-wrapper',
					animation: 150,
					ghostClass: "sortable-ghost",
					forceFallback: true,
					onChoose: e => {
						this.handleSelectComp(e.oldIndex)
					},
					onEnd: ({
						newIndex,
						oldIndex
					}) => {
						if(newIndex == oldIndex) return
						this.changeCptSort({
							newIndex,
							oldIndex
						})
						this.move = false
					}
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		color: #000;
		height: 100rpx;
		font-size: 16px;
		// border-bottom: 1rpx solid #f8f8f8;
		.item {
			
		}
	}
	.wrapper {
		position: relative;
		background-color: #fff;
		.top-box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 1;
			transform: scaleX(1.5);
		}
	}
	.ww {
		position: relative;
		z-index: 20;
		min-height: 800px;
		position: relative;
		padding-bottom: 40px;
		.item-wrapper {
			position: relative;
			&.active-border {
				border: 4rpx dashed red;
			}
			.move-btn {
				position: absolute;
				right: -2px;
				top: 25px;
				width: 25px;
				height: 25px;
				background-color: red;
				color: #fff;
				z-index: 201;
				cursor: pointer;
				border-bottom-left-radius: 3px;
				&:hover {
					background-color: #ca0808;
				}
			}
			.del-btn {
				position: absolute;
				right: -2px;
				top: -2px;
				width: 25px;
				height: 25px;
				background-color: red;
				color: #fff;
				z-index: 201;
				cursor: pointer;
				border-bottom-left-radius: 3px;
				&:hover {
					background-color: #ca0808;
				}
			}
			.mb-header-bar {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				z-index: 200;
			}
			.search-wrapper {
				padding: 15rpx;
				position: relative;
				&:after {
					content: "";
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}
				.search-left-pic {
					padding-right: 10px;
				}
				.search-content {
					flex: 1;
				}
			}
			.richText-wrapper {
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
			.swiper-wrapper {
				position: relative;
				.swiper-mask {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}
				.swiper-header-row {
					padding: 0 12px;
					height: 50px;
					position: absolute;
					left: 0;
					top: 20px;
					width: 100%;
					z-index: 200;
					.shop-name {
						font-weight: bold;
						color: #fff;
						font-size: 32rpx;
					}
					.item-search-icon {
						width: 30px;
						height: 30px;
						border-radius: 50%;
						background-color: rgba(255,255,255,.2);
						border: 1rpx solid #fff;
						color: #fff;
					}
				}
			}
			.menu-wrapper {
				padding: 0px 5px 20px;
				&.nowrap {
					padding: 5px 10px;
					.item {
						min-height: 25px;
						flex-direction: row;
						margin: 0 10px;
						flex: 0 0 auto;
						padding: 0;
						&:first-child {
							margin-left: 0;
						}
						&:last-child {
							margin-right: 0;
						}
					}
				}
				.item {
					min-height: 80px;
					flex-direction: column;
					flex: 1;
					padding-top: 20px;
					&.col-4 {
						flex: 0 0 25%;
						width: 25%;
					}
					&.col-5 {
						flex: 0 0 20%;
						width: 20%;
					}
					&.col-6 {
						flex: 0 0 16.6%;
						width: 16.6%;
						.menu-img {
							width: 40px;
							height: 40px;
							margin-bottom: 8px;
						}
					}
					.menu-img {
						width: 50px;
						height: 50px;
						margin-bottom: 10px;
					}
					.menu-title {
						width: 100%;
						text-align: center;
					}
				}
			}
			.ad-wrapper {
				width: 100%;
				padding: 4rpx;
				&.ad-5,
				&.ad-6,
				&.ad-7 {
					flex-direction: column;
				}
				.item {
					width: 100%;
					height: 100%;
					padding: 4rpx;
					&.half-h {
						height: 50%;
					}
					&.half-w {
						width: 50%;
					}
				}
			}
			.title-wrapper {
				width: 100%;
				height: 80rpx;
				position: relative;
				.title {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					z-index: 10;
				}
				.bg {
					position: relative;
					z-index: 10;
					width: 100%;
					height: 80rpx;
				}
			}
			.product-wrapper {
				.product-tabs {
					
				}
				.product-list {
					background-color: #f8f8f8;
					&.coupon {
						background-color: transparent;
					}
					.item {
						flex: 0 0 50%;
						width: 50%;
						.p-card {
							width: 100%;
							background-color: #fff;
							border-radius: 5px;
							overflow: hidden;
							.p-img-wrap {
								width: 100%;
								position: relative;
								.p-img {
									position: relative;
									width: 100%;
									padding-top: 100%;
									image {
										position: absolute;
										left: 0;
										top: 0;
										width: 100%;
										height: 100%;
									}
								}
							}
							.p-content {
								position: relative;
								padding: 12rpx;
							}
							.p-name {
								font-size: 32rpx;
								margin-bottom: 10rpx;
							}
							.p-sub {
								color: #999;
							}
							.p-bottom {
								height: 60rpx;
								.item-left {
									color: red;
									font-size: 16px;
								}
								.item-right {
									
								}
							}
						}
						.coupon-card {
							width: 100%;
							height: 84px;
							background: linear-gradient(to right, rgb(239, 196, 128), rgb(239, 196, 128));
							color: rgb(168, 112, 13);
							mask: url('../../static/img/coupon_bg1.png') center no-repeat;
							mask-size: 100% 100%;
							// margin: 0 12px;
							position: relative;
							.item-left {
								flex: 0 0 70%;
								width: 70%;
								padding-left: 15px;
								.coupon-title {
									font-size: 16px;
									.coupon {
										font-size: 22px;
										font-weight: bold;
										padding: 0 5px;
									}
									.title {
										
									}
								}
								.coupon-term {
									font-size: 12px;
									line-height: 20px;
								}
								.coupon-time {
									font-size: 12px;
								}
							}
							.item-right {
								flex: 0 0 30%;
								width: 30%;
								flex-direction: column;
								font-size: 12px;
								.coupon-btn {
									padding: 0 10px;
									line-height: 30px;
									border-radius: 15px;
									// background-color: #fff;
									// border: 1rpx solid #fff;
									color: #A8700D;
									margin-bottom: 8px;
								}
								.coupon-num {
								}
							}
						}
					}
					&.list1 .item {
						flex: 0 0 50%;
						width: 50%;
						.p-card {
							width: 100%;
							flex-direction: column;
							.p-sub {
								margin-bottom: 10px;
							}
						}
						.p-content {
							height: 200rpx;
							width: 100%;
						}
						.coupon-card {
							height: 70px;
							.item-left {
								padding-left: 15px;
							}
							.coupon-title {
								font-size: 14px;
								flex-wrap: wrap;
								.coupon {
									font-size: 16px;
								}
								.title {
									width: 100%;
									flex: 0 0 100%;
									display: block;
								}
							}
							.coupon-time {
								display: none;
							}
							.coupon-btn {
								 margin:0 auto;
								 width:20px;
								 line-height:14px;
								 padding: 0;
								 text-align: center;
							}
							.coupon-num {
								display: none;
							}
						}
					}
					&.list2 .item {
						flex: 0 0 100%;
						width: 100%;
						.p-card {
							display: flex;
							height: 240rpx;
							.p-img-wrap {
								flex: 0 0 240rpx;
								width: 240rpx;
								padding: 12rpx;
								.p-img {
									image {
										border-radius: 6px;
									}
								}
							}
							.p-content {
								flex: 1;
								width: calc(100% - 240rpx);
								height: 100%;
								padding-left: 20rpx;
								padding: 8rpx;
								.p-bottom {
									position: absolute;
									bottom: 0;
									left: 0;
									width: 100%;
									height: 40px;
									padding: 0 10rpx;
									padding-right: 20rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
