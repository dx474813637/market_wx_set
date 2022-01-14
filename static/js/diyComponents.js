export const typeToName = {
	swiper: {
		label: "轮播图",
		icon: "lunbo",
	},
	menu: {
		label: "菜单组",
		icon: "menu-s",
	},
	ad: {
		label: "广告魔方",
		icon: "buju1",
	},
	title: {
		label: "标题栏",
		icon: "biaotilan",
	},
	productTabs: {
		label: "分类选项卡",
		icon: "tab",
	},
	productDiy: {
		label: "自定义商品",
		icon: "shangpin",
	},
	coupon: {
		label: "优惠券",
		icon: "youhuiquan",
	},
	search: {
		label: "搜索框",
		icon: "sousuokuang-sousuo",
	},
	richtext: {
		label: "富文本",
		icon: "bianji_wenben_fuwenben",
	},
	alertAd: {
		label: "弹窗管理",
		icon: "danchuang",
	},
	btns: {
		label: "悬浮按钮",
		icon: "xuanfuanniu",
	},
	news: {
		label: "资讯",
		icon: "zuixinzixun-06",
	},
	hq: {
		label: "行情",
		icon: "hangqing",
	},
}

export const diyComponents = [{
		type: "图文",
		children: [{
				name: "swiper",
			},
			{
				name: "menu",
			},
			{
				name: "ad",
			},
			{
				name: "title",
			},
		]
	},
	{
		type: "商品组",
		children: [{
			name: "productTabs",
		}, {
			name: "productDiy",
		}, ]
	},
	{
		type: "其他",
		children: [{
				name: "coupon",
			},
			{
				name: "search",
			},
			{
				name: "news",
			},
			{
				name: "hq",
			},
			// {

			// 	name: "richtext",
			// },
		]
	}
]

export const titleinitData = [{
		bgStyle: "1",
		bg: "http://dingxiang.netsun.testwebsite.cn/public/img/title1.png"
	},
	{
		bgStyle: "2",
		bg: "http://dingxiang.netsun.testwebsite.cn/public/img/title2.png"
	},
	{
		bgStyle: "3",
		bg: "http://dingxiang.netsun.testwebsite.cn/public/img/title3.png"
	},
	{
		bgStyle: "4",
		bg: "http://dingxiang.netsun.testwebsite.cn/public/img/title4.png"
	},
	{
		bgStyle: "5",
		bg: "http://dingxiang.netsun.testwebsite.cn/public/img/title5.png"
	},
]
export const adinitData = [{
		style: "1",
		boxNum: 1,
		initHeight: 400,
		imgSrc: "http://dingxiang.netsun.testwebsite.cn/public/img/adv_01.jpg",
		data: [{
			width: 720,
			height: 400
		}, ]
	},
	{
		style: "2",
		boxNum: 2,
		initHeight: 400,
		imgSrc: "http://dingxiang.netsun.testwebsite.cn/public/img/adv_02.jpg",
		data: [{
				width: 375,
				height: 400
			},
			{
				width: 375,
				height: 400
			},
		]
	},
	{
		style: "3",
		boxNum: 3,
		initHeight: 400,
		imgSrc: "http://dingxiang.netsun.testwebsite.cn/public/img/adv_03.jpg",
		data: [{
				width: 375,
				height: 400
			},
			{
				width: 375,
				height: 200
			},
			{
				width: 375,
				height: 200
			},
		]
	},
	{
		style: "4",
		boxNum: 3,
		initHeight: 400,
		imgSrc: "http://dingxiang.netsun.testwebsite.cn/public/img/adv_04.jpg",
		data: [{
				width: 375,
				height: 200
			},
			{
				width: 375,
				height: 200
			},
			{
				width: 375,
				height: 400
			},
		]
	},
	{
		style: "5",
		boxNum: 3,
		initHeight: 400,
		imgSrc: "http://dingxiang.netsun.testwebsite.cn/public/img/adv_05.jpg",
		data: [{
				width: 375,
				height: 200
			},
			{
				width: 375,
				height: 200
			},
			{
				width: 750,
				height: 200
			},
		]
	},
	{
		style: "6",
		boxNum: 3,
		initHeight: 400,
		imgSrc: "http://dingxiang.netsun.testwebsite.cn/public/img/adv_06.jpg",
		data: [{
				width: 750,
				height: 200
			},
			{
				width: 375,
				height: 200
			},
			{
				width: 375,
				height: 200
			},
		]
	},
	{
		style: "7",
		boxNum: 5,
		initHeight: 400,
		imgSrc: "http://dingxiang.netsun.testwebsite.cn/public/img/adv_07.jpg",
		data: [{
				width: 375,
				height: 200
			},
			{
				width: 375,
				height: 200
			},
			{
				width: 250,
				height: 200
			},
			{
				width: 250,
				height: 200
			},
			{
				width: 250,
				height: 200
			},
		]
	},
]
// export default diyComponents
