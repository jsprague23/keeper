import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import ProfilePage from '@/components/ProfilePage'
import Navbar from '@/components/Navbar'
import Vaults from '@/components/Vaults'
import Modal from '@/components/Modal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/Modal',
      name:'Modal',
      component: Modal
    },
    {
      path:'/Vaults',
      name:'Vaults',
      component: Vaults
    },
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
