import Vue from 'vue'
import App from './App.vue'

import msg from './components/message/index'

Vue.config.productionTip = false;

Vue.use(msg);

new Vue({
  render: h => h(App)
}).$mount('#app')
