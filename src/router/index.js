import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import About from '../views/About.vue'
import Product from '../views/Product'
import Addproduct from '../views/Addproduct'
import Welcome from '../views/Welcome'

Vue.use(VueRouter)

  const routes = [
    {path: '/login',name:'login',component:Login},
    { path: '/home',name: 'Home',component: Home,
      redirect:'/welcome',
  children:[
    {path: '/about',name: 'about',component: About},
    {path: '/product',name: 'product',component: Product},
    { path: '/addproduct',name: 'addproduct', component: Addproduct },
    {path:"/welcome",name:'welcome',component:Welcome},
  ]},

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
