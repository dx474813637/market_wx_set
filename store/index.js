import Vue from 'vue'
import Vuex from 'vuex'
import {mutations} from "./mutations.js"
import {actions} from "./actions.js"
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		curCompOptActive: {
			index: -1,
			type: null
		},
		curAlertAdActive: 0,
		activeIndex: 0,
		optData: data || {},
		cateData: [],
		coupon_data: {},
		product_data: {},
		richtext_data: {},
		uploadUrl: "http://market.netsun.testwebsite.cn/Index/up_diy_img",
		isChanged: false,
		previewWindow: null,
		pageOptFlag: false,
		keytime: "",
		ajaxBaseUrl: "http://market.netsun.testwebsite.cn/Index/"
	},
	mutations,
	actions
})


export default store
