import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { isAuthenticated, currentUser } from '@/utils/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true, role: 'resident' },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/AdminDashboardView.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/agency',
    name: 'Agency',
    component: () => import('@/views/AgencyView.vue'),
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('@/views/ReportView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/report/:id',
    name: 'ReportDetails',
    component: () => import('@/views/ReportDetailsView.vue'),
    props: true,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthView.vue'),
    meta: { forceScrollTop: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Special handling for `root(/)` route and routes that need forced scroll
    if (to.meta?.forceScrollTop || to.path === '/') {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Force immediate scroll for problematic routes
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
          resolve({ top: 0, left: 0, behavior: 'auto' })
        }, 0)
      })
    }

    // If there's a saved position (browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }

    // For hash links, scroll to the element
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    // Default: scroll to top for new navigation
    return { top: 0, left: 0, behavior: 'smooth' }
  },
})

// Navigation guards
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/auth')
    return
  }

  if (to.meta.role && currentUser.value?.role !== to.meta.role) {
    next('/')
    return
  }

  next()
})

export default router
