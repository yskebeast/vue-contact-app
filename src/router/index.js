import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from "../components/SignIn.vue"
import SignUp from "../components/SignUp.vue"
import Home from "../components/Home.vue"
import Contact from "../components/Contact.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component:SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component:SignUp
  },
  {
    path: '/home/:uid',
    name: 'Home',
    component:Home
  },
  {
    path: '/home/:uid/contact',
    name: 'Contact',
    component:Contact
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
