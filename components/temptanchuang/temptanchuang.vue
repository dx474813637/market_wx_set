<template>
	<view class="tc-wrapper u-flex u-row-center">
		<view class="ad u-flex u-row-center" v-if="optData.alertAd.data && optData.alertAd.data.length > 0">
			<image :src="optData.alertAd.data[curAlertAdActive].url" mode=""></image>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name:"temptanchuang",
		data() {
			return {
				curIndex: 0
			};
		},
		computed: {
			...mapState(['optData', 'curAlertAdActive'])
		}
	}
</script>

<style lang="scss" scoped>
	.tc-wrapper {
		width: 100%;
		height: 100%;
		background-color: #ccc;
		.ad {
			width: 300px;
			height: 500px;
			// background-color: #fff;
			border-radius: 5px;
			// box-shadow: 0 0 10px rgba(0,0,0,.1);
			padding: 25px 15px;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
