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
		optData: {},
		cateData: [],
		newsCate: [],
		coupon_data: {},
		product_data: {},
		richtext_data: {},
		uploadUrl: "https://wx3.y.netsun.com/Index/up_diy_img",
		isChanged: false,
		previewWindow: null,
		pageOptFlag: false,
		keytime: "",
		ajaxBaseUrl: "",
		// uploadHeader: {
		// 	'content-type': 'application/x-www-form-urlencoded',
		// 	'appid': 10000,
		// 	'appsecret': '7923FoGlaAlRnbpfl+lepwzh/2lVLDAnb8gyRDSpJKX6TJLW9CTXfW4',
		// 	...attr,
		// }
	},
	mutations,
	actions
})


export default store
