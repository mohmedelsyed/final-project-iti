import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import Cars from '../pages/Cars.vue'
import CarDetails from '../pages/CarDetails.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import BuyerDashboard from '../pages/BuyerDashboard.vue'
import SellerDashboard from '../pages/SellerDashboard.vue'
import Compare from '../pages/Compare.vue'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/home',
    name: 'HomeNew',
    component: Home
  },
  {
    path: '/cars',
    name: 'Cars',
    component: Cars
  },
  {
    path: '/cars/:id',
    name: 'CarDetails',
    component: CarDetails,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'BuyerDashboard',
    component: BuyerDashboard
  },
  {
    path: '/seller-dashboard',
    alias: '/seller',
    name: 'SellerDashboard',
    component: SellerDashboard
  },
  {
    path: '/compare',
    name: 'Compare',
    component: Compare
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
