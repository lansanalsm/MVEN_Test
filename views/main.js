import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import VueRouter from 'vue-router'

import ListClient from './components/ListClient.vue'
import CreateClient from './components/CreateClient.vue'
import EditClient from './components/EditClient.vue'

import VueAxios from 'vue-axios'
import axios from 'axios'
import VueSimpleAlert from 'vue-simple-alert'

Vue.use(VueSimpleAlert)
// import DeleteClient from './components/DeleteClient.vue';

Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.use(VueAxios, axios)

// new Vue({
//   render: h => h(App)
// }).$mount('#app')

const routes = [
  {
    name: 'home',
    path: '/',
    component: ListClient
  },
  {
    name: 'create',
    path: '/create',
    component: CreateClient
  },
  {
    name: 'edit',
    path: '/edit/:id',
    component: EditClient
  }
]

const router = new VueRouter({ mode: 'history', routes: routes })

new Vue(Vue.util.extend({ router }, App)).$mount('#app')
