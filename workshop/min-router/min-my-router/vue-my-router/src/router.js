import Vue from 'vue'
import XRouter from './x-router'
import Home from './views/Home.vue'

Vue.use(XRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(from,to,next){
      console.log(from,to,'form-to');
      setTimeout(() => {
        next()
      }, 1000);
    }

  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  }
]

const router = new XRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
  routes
})


export default router
