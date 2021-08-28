import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/base.css'
import './assets/css/ionfont.css'
import api from './api'
import i18n from './language/'
Vue.prototype.$api=api;

Vue.config.productionTip = false

//页面刷新
let userinfo =localStorage.getItem('userinfo');
if(userinfo){
  let obj=JSON.parse(userinfo)
  store.commit('LoginModule/setInfo',obj)
}


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
