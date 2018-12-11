import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Methods from '@/server'
import getSong from '@/server/searchMp3'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(getSong);

Vue.use(Methods);

Vue.use(MintUI);

Vue.filter('filterImgUrl',(val,size=240)=>{
  return val.replace('{size}',size);
}); 


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
