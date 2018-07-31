import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import ProfilePage from '@/components/ProfilePage'
import Navbar from '@/components/Navbar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/Navbar',
      name:'Navbar',
      component:Navbar
    },
    {
      path:'/ProfilePage',
      name: 'ProfilePage',
      component: ProfilePage
    },
    {
      path:'/Auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
