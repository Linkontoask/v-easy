import Vue from 'vue'
import App from './App.vue'


import msg from './components/message/index'
Vue.use(msg)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
