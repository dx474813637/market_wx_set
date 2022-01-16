import Vue from 'vue'
import { Notification } from 'element-ui';
import {typeToName} from "../static/js/diyComponents.js"

export const mutations = {
	changeKeyTime(state, data) {
		state.keytime = new Date().getTime()
	},
	//改变组件顺序
	changeCptSort(state, data) {
		let d = state.optData.options
		const val = d[data.oldIndex]
		d.splice(data.oldIndex, 1)
		d.splice(data.newIndex, 0, val)
		this.commit('changeKeyTime')
		if(state.curCompOptActive.index != -1) {
			this.commit("changeCurComp", {
				type: state.curCompOptActive.type,
				index: data.newIndex
			})
		}
		
	},
	//当前配置的页面
	changeCurPage(state, data) {
		state.activeIndex = data
		this.commit("changepageOptFlag", false)
	},
	//当前选中的弹窗广告
	changeCurAlertAdActive(state, data) {
		state.curAlertAdActive = data
	},
	addNewAlertAd(state) {
		state.optData.alertAd.data.push({
			link: "",
			url: "",
			show_type: "1"
		})
	},
	updateAlertAd(state, data) {
		let index = data.index;
		let obj = data.data;
		for(let key in obj) {
			state.optData.alertAd.data[index][key] = obj[key]
		}
	},
	updateAlertAdSort(state, data) {
		let d = state.optData.alertAd.data
		const val = d[data.oldIndex]
		d.splice(data.oldIndex, 1)
		d.splice(data.newIndex, 0, val)
	},
	delAlertAdData(state, data) {
		state.optData.alertAd.data.splice(data, 1)
	},
	//悬浮按钮
	addNewBtn(state) {
		state.optData.btns.data.push({
			id: state.optData.btns.data.length + '',
			icon: "",
			type: "1",
			type_image: "",
			type_link: ""
		})
	},
	updateBtnIconMain(state, data) {
		for(let key in data) {
			state.optData.btns[key] = data[key]
		}
	},
	updateBtn(state, data) {
		let index = data.index;
		let obj = data.data;
		for(let key in obj) {
			state.optData.btns.data[index][key] = obj[key]
		}
	},
	updateBtnSort(state, data) {
		let d = state.optData.btns.data
		const val = d[data.oldIndex]
		d.splice(data.oldIndex, 1)
		d.splice(data.newIndex, 0, val)
	},
	delBtnData(state, data) {
		state.optData.btns.data.splice(data, 1)
	},
	//当前选中的组件
	changeCurComp(state, data) {
		state.curCompOptActive = data
		if(data.index != -1) {
			this.commit("changepageOptFlag", false)
		}
	},
	changepageOptFlag(state, data) {
		state.pageOptFlag = data
		if(data) {
			this.commit("changeCurComp", {index: -1, type: null})
		}
	},
	updatePageOpt(state, data) {
		for (let key in data) {
			if(key != 'options') {
				state.optData[key] = data[key]
			}
			
		}
	},
	//修改组件配置项数据
	changeOptData(state, data) {
		for (let key in data.data) {
			state.optData.options[state.curCompOptActive.index].data[data.index][key] = data.data[key]
		}
		
	},
	//移除组件
	delCptData(state, data) {
		let name = state.optData.options[data].type
		state.optData.options.splice(data, 1)
		Notification.success({
			title: typeToName[name].label + "组件移除成功",
			position: "bottom-right"
		})
		state.curCompOptActive = {
			index: -1,
			type: null
		}
		
	},
	//移除组件中的配置项数据
	delOptData(state, data) {
		state.optData.options[state.curCompOptActive.index].data.splice(data, 1)
		
		
	},
	//新增组件配置项数据
	addnewData(state, data) {
		state.optData.options[state.curCompOptActive.index].data.push(data)
		
	},
	//更新组件配置项数据排序
	updateSort(state, data) {
		let d = state.optData.options[state.curCompOptActive.index].data
		const val = d[data.oldIndex]
		d.splice(data.oldIndex, 1)
		d.splice(data.newIndex, 0, val)
		
	},
	//更新组件配置项
	updateProps(state, data) {
		for (let key in data) {
			state.optData.options[state.curCompOptActive.index][key] = data[key]
		}
		
	},
	updateCateData(state, data) {
		state.cateData = data
	},
	updateNewsCate(state, data) {
		state.newsCate = data
	},
	updateProductData(state, data) {
		data.count = Number(data.count)
		data.pages = Number(data.pages)
		state.product_data = data
	},
	updateRichtextData(state, data) {
		state.richtext_data = data
	},
	updateCouponData(state, data) {
		state.coupon_data = data
	},
	changeFlag(state, data) {
		state.isChanged = true
	},
	//新增组件
	addnewCpt(state, name) {
		let obj = {
			type: name,
			data: []
		}
		if (name == "swiper") {
			Object.assign(obj, {
				width: 375,
				height: 250,
				diy: false,
				diyHeight: 400,
				diyRadius: 0,
				diyPadding: 0,
			})
			for (let i = 0; i < 3; i++) {
				obj.data.push({
					id: i,
					image: "http://dingxiang.netsun.testwebsite.cn/public/img/image-default.jpg",
					link: "http://www.baidu.com"
				})
			}
		} else if (name == 'menu') {
			Object.assign(obj, {
				col: "4",
				shape: "square",
				isWrap: 'wrap',
			})
			for (let i = 0; i < 8; i++) {
				obj.data.push({
					id: i,
					title: "标题",
					url: "http://dingxiang.netsun.testwebsite.cn/public/img/image-default.jpg",
					link: "http://www.baidu.com"
				})
			}
		} else if (name == 'ad') {
			Object.assign(obj, {
				style: "1",
				diy: false,
				diyHeight: 400,
				img_num: 1,
				data: [{
					id: 0,
					image: "http://dingxiang.netsun.testwebsite.cn/public/img/image-default.jpg",
					link: "http://www.baidu.com",
				}]
			})
		} else if (name == 'title') {
			Object.assign(obj, {
				type: "title",
				title: "标题栏",
				titleColor: "#000000",
				bgStyle: "1",
				bg: "http://dingxiang.netsun.testwebsite.cn/public/img/title1.png"
			})
		} else if (name == 'productTabs') {
			Object.assign(obj, {
				type: "productTabs",
				style: "1",
				col_num: "2",
				show_bar: "1",
				activeColor: "#2979ff",
				inactiveColor: "#303133",
				tabs_bg_color: "",
				list_bg_color: "#f8f8f8",
				buy_btn_color: "#2979ff",
				tabsId: [],
				tabs: []
			})
		} else if (name == 'productDiy') {
			Object.assign(obj, {
				type: "productDiy",
				style: "1",
				col_num: "2",
				list_bg_color: "#f8f8f8",
				buy_btn_color: "#2979ff",
				dataId: "",
				data: []
			})
		} else if (name == 'coupon') {
			Object.assign(obj, {
				type: "coupon",
				style: "1",
				bg1_color: "#EFC480",
				bg2_color: "#EFC480",
				font1_color: "#4F3A1E",
				font2_color: "#A8700D",
				btnbg_color: "#FFFFFF",
				btn_color: "#A8700D",
				dataId: "",
				data: []
			})
		} else if (name == 'search') {
			Object.assign(obj, {
				type: "search",
				initValue: "",
				shape: "round",
				bgColor: "#f2f2f2",
				placeholder: "请输入关键字",
				inputAlign: "left",
				color: "#606266",
				placeholderColor: "#909399",
				clearabled: true,
				showAction: true,
				leftPic: true,
				leftPicWidth: 30,
				leftPicSrc: '',
				actionText: "搜索",
				borderColor: ""
			})
		} else if (name == 'richtext') {
			Object.assign(obj, {
				type: "richtext",
				dataId: null,
				data: ""
			})
		} else if (name == 'shopDiy') {
			Object.assign(obj, {
				type: "shopDiy",
				list_bg_color: '#f8f8f8',
				data: []
			})
		} else if( name == 'news') {
			Object.assign(obj, {
				type: "news",
				show_bar: "1",
				activeColor: "#2979ff",
				inactiveColor: "#303133",
				tabs_bg_color: "",
				list_bg_color: "#f8f8f8",
				tabsId: [],
				tabs: []
			})
		} else if( name == 'hq') {
			Object.assign(obj, {
				type: "hq",
				show_bar: "1",
				activeColor: "#2979ff",
				inactiveColor: "#303133",
				tabs_bg_color: "",
				list_bg_color: "#f8f8f8",
				tabsId: [],
				tabs: []
			})
		}
		
		if (state.curCompOptActive.index == -1) {
			state.optData.options.push(obj)
			Notification.success({
				title: typeToName[name].label + "组件已添加至最底处",
				position: "bottom-right"
			})
			Vue.prototype.$nextTick(() => {
				state.previewWindow.$el.scrollTop  = state.previewWindow.$el.scrollHeight;
				this.commit("changeCurComp", {
					index: state.optData.options.length - 1,
					type: name
				})
			})
			
		} else {
			state.optData.options.splice(state.curCompOptActive.index + 1, 0, obj)
			Notification.success({
				title: typeToName[name].label + "组件添加成功",
				position: "bottom-right"
			})
			Vue.prototype.$nextTick(() => {
				this.commit("changeCurComp", {
					index: state.curCompOptActive.index + 1,
					type: name
				})
			})
		}
		
	
	},
	setRef(state, data) {
		state.previewWindow = data
	}
}