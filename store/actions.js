import Vue from 'vue'
import {http} from '@/common/service.js'

export const actions = {
	async getHomeData({ commit, state }) {
		let res = await http.get('/Market/home');
		if(res.data.code == 1) {
			commit("updateOptData", res.data.list)
		}
		
	},
	async getCateData({ commit, state }) { //
		const res = await http.get(`/Market/api.html?api_url_xcx=diy_home_product_cate`)
		
		commit("updateCateData", [{ id: '', label: '全部'}, ...res.data.list])
	},
	async getNewsData({ commit, state }) { //
		const res = await http.get(`/Market/api.html?api_url_xcx=diy_home_news_cate`)
		
		commit("updateNewsCate", [{ id: '', label: '全部'}, ...res.data.list])
	},
	async getProductData({ commit, state }, data={}) {
		const res = await http.get(`/Market/api.html?api_url_xcx=diy_home_product`, {params: data})
		// res.data.list.forEach(ele => {
		// 	ele.id = data.p+ele.id
		// })
		commit("updateProductData", res.data)
	},
	async getCouponData({ commit, state }, data={}) {
		const res = await http.get(`/Market/api.html?api_url_xcx=diy_home_coupon`, {params: data})
		// res.data.list.forEach(ele => {
		// 	ele.id = data.p+""+ele.id
		// })
		commit("updateCouponData", res.data)
	},
	async getRichtextData({ commit, state }, data={}) {
		const res = await http.get(`/Market/api.html?api_url_xcx=diy_home_richtext`, {params: data})
		// res.data.list.forEach(ele => {
		// 	ele.id = data.p+""+ele.id
		// })
		commit("updateRichtextData", res.data)
	},
}