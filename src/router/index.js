import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/power',
      name: 'power',
      component: () => import('../views/Power.vue')
    },
    {
      path: '/income',
      name: 'income',
      component: () => import('../views/Income.vue')
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/Team.vue')
    },
    // {
    //   path: '/addLiquidity',
    //   name: 'addLiquidity',
    //   component: () => import('../views/AddLiquidity.vue')
    // },
    {
      path: '/portfolio-single',
      name: 'portfolioSingle',
      component: () => import('../views/portfolioSingle.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/packages',
      name: 'packages',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Packages.vue')
    },
    {
      path: '/404',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/404.vue')
    },
    {
      path: '/:pathMatch(.*)',
      //访问主页的时候 重定向到index页面
      redirect: '/404',
    },
  ]
})
export default router
