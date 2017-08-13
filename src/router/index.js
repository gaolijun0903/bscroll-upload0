import Vue from 'vue'
import Router from 'vue-router'
import Pullup1 from '@/components/pullup1'
import Pullup2 from '@/components/pullup2'
import Pullup3 from '@/components/pullup3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/pullup1'
    },
    {
      path: '/pullup1',
      component: Pullup1
    },
    {
      path: '/pullup2',
      component: Pullup2
    },
    {
      path: '/pullup3',
      component: Pullup3
    }
  ]
})
