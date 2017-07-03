import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods/Goods'
import Commonts from '@/components/Commonts/Commonts'
import Seller from '@/components/Seller/Seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/commonts',
      component: Commonts
    },
    {
      path: '/seller',
      component: Seller
    }
  ]
})
