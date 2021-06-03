import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jsonp from 'jsonp'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
import Vuex from 'vuex';
import store from './store/index'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);

Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/api'  //关键代码
Vue.config.productionTip = false

Vue.use(ElementUI);
new Vue({
  jsonp,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

