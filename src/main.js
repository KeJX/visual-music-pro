import Vue from 'vue'
import App from './App.vue'
import './libs/rem'
import "@/assets/scss/index.scss"

import "@/assets/js/perlin.js"
import "@/assets/js/TweenMax.min.js"
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
