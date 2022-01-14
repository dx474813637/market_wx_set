import Vue from 'vue'
import {http} from '@/common/service.js'

export const actions = {
	async getCateData({ commit, state }) { //
		const res = await http.get(`${state.ajaxBaseUrl}diy_home_product_cate`)
		
		commit("updateCateData", res.data.list)
	},
	async getProductData({ commit, state }, data={}) {
		const res = await http.get(`${state.ajaxBaseUrl}diy_home_product`, {params: data})
		// res.data.list.forEach(ele => {
		// 	ele.id = data.p+ele.id
		// })
		commit("updateProductData", res.data)
	},
	async getCouponData({ commit, state }, data={}) {
		const res = await http.get(`${state.ajaxBaseUrl}diy_home_coupon`, {params: data})
		// res.data.list.forEach(ele => {
		// 	ele.id = data.p+""+ele.id
		// })
		commit("updateCouponData", res.data)
	},
	async getRichtextData({ commit, state }, data={}) {
		const res = await http.get(`${state.ajaxBaseUrl}diy_home_richtext`, {params: data})
		// res.data.list.forEach(ele => {
		// 	ele.id = data.p+""+ele.id
		// })
		commit("updateRichtextData", res.data)
	},
}