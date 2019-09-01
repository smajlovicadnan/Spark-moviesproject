import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './routes'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios';
import plugin from './plugin';

Vue.use(plugin);
Vue.use(VueRouter);
Vue.use(VueAxios,axios);


const router=new VueRouter({
  routes,

})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
