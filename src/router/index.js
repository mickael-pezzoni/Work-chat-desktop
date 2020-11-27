import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tchat from '../views/Tchat.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tchat',
    name: 'Tchat',
    component: Tchat
  }
]

const router = new VueRouter({
  routes
})

export default router
