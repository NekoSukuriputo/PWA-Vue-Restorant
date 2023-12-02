import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home'),
      },
      {
        path: 'foods',
        name: 'Foods',
        component: () => import('../views/foods/index.vue'),
      },
      {
        path: 'foods/:id',
        component: () => import('../views/foods/show'),
        meta: {
          forAuth: true
        },
      },
      {
        path: 'cart',
        component: () => import('../views/cart/index'),
        meta: {
          forAuth: true
        },

      },
      {
        path: 'ordersuccess',
        component: () => import('../views/waiting/index'),
        meta: {
          forAuth: true
        },

      }
    ]
  },
  {
    path: '/auth',
    component: () => import('../layouts/auth.vue'),
    meta: {
      forVisitors: true
    },
    children: [
      {
        path: 'login',
        component: () => import('../views/auth/login.vue'),
      },
      {
        path: 'register',
        component: () => import('../views/auth/register.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(
  (to, from, next) => {
    const loggedIn = sessionStorage.getItem('user');
    if (to.matched.some(record => record.meta.forVisitors)) {
      if (loggedIn) {
        next({
          path: '/'
        })
      } else next()
    } else if (to.matched.some(record => record.meta.forAuth)) {
      if (!loggedIn) {
        next({
          path: '/auth/login'
        })
      } else next()
    }
    else next()
  }
)


export default router
