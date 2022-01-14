<template>
	<view class="ww">
		
		<view class="menu-options-row u-flex">
			<view class="item-label">选择文本</view>
			<view class="item-content u-flex u-flex-wrap">
				<u-input disabled :value="optData.options[curCompOptActive.index].dataId" border
					type="text" />
				<el-button type="primary" size="medium" @click="showPopup">选择</el-button>
			</view>
		</view>
		<u-popup v-model="show" mode="center" width="1600" height="1300" closeable close-icon="close-circle"
			close-icon-color="#999" close-icon-size="40" border-radius="8">
			<richtextTable @tableExit="show = false"></richtextTable>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from "vuex"
	export default {
		name: "optionsRichText",
		data() {
			return {
				show: false
			};
		},
		computed: {
			...mapState(['curCompOptActive', 'optData']),
		},
		async created() {

			
		},
		watch: {
		},
		methods: {
			...mapMutations(['changeOptData', 'delOptData', 'addnewData', 'updateSort', 'updateProps']),
			...mapActions(['getCateData']),
			changebgColor(event) {
				this.updateProps({
					bgColor: event
				})
			},
			showPopup() {
				this.show = true;
				// this.handleChecked()
				
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
	}
</style>
