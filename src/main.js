import Vue from 'vue'
import App from './App.vue'

import vEasy from 'v-easy-message'
// import locale from './components/v-easy/local/en'
// import Message from './components/v-easy/index'

Vue.config.productionTip = false;

Vue.use(vEasy);

new Vue({
  render: h => h(App)
}).$mount('#app')
