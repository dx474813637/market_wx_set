import App from './App'
import element from './element/index'
import { http } from '@/common/service.js'
import store from './store'
Vue.use(element)
import uView from "uview-ui";
Vue.use(uView);


// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.$http = http
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif