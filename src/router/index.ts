import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { isAuthenticated, currentUser, authService } from '@/utils/auth'

type UserRole = 'super_admin' | 'admin' | 'agency_staff' | 'resident'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: UserRole[]
    forceScrollTop?: boolean
    title?: string
  }
}

/**
 * Role hierarchy for permission checking
 */
const roleHierarchy: Record<UserRole, UserRole[]> = {
  super_admin: ['super_admin', 'admin', 'agency_staff', 'resident'],
  admin: ['admin', 'resident'],
  agency_staff: ['agency_staff'],
  resident: ['resident'],
}

/**
 * Check if user has required role access
 */
function hasRoleAccess(userRole: string | undefined, allowedRoles: UserRole[]): boolean {
  if (!userRole || !allowedRoles.length) return false

  return allowedRoles.some((role) => roleHierarchy[userRole as UserRole]?.includes(role) ?? false)
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'FixNet - Community Issue Reporting' },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthView.vue'),
    meta: {
      title: 'Sign In - FixNet',
      forceScrollTop: true,
    },
    beforeEnter: (to, from, next) => {
      if (isAuthenticated.value) {
        next('/dashboard')
      } else {
        next()
      }
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      requiresAuth: true,
      roles: ['resident'],
      title: 'Dashboard - FixNet',
    },
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboardView.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin', 'super_admin'],
      title: 'Admin Dashboard - FixNet',
    },
  },
  {
    path: '/admin/users',
    name: 'AdminUserManagement',
    component: () => import('@/views/AdminUserManagementView.vue'),
    meta: {
      requiresAuth: true,
      roles: ['super_admin'],
      title: 'User Management - FixNet',
    },
  },
  {
    path: '/agency/dashboard',
    name: 'AgencyDashboard',
    component: () => import('@/views/AgencyDashboardView.vue'),
    meta: {
      requiresAuth: true,
      roles: ['agency_staff'],
      title: 'Agency Dashboard - FixNet',
    },
  },
  {
    path: '/report/new',
    name: 'CreateReport',
    component: () => import('@/views/ReportCreateView.vue'),
    meta: {
      requiresAuth: true,
      roles: ['resident', 'agency_staff', 'admin', 'super_admin'],
      title: 'Create Report - FixNet',
    },
  },
  {
    path: '/report/:id',
    name: 'ReportDetails',
    component: () => import('@/views/ReportDetailsView.vue'),
    props: true,
    meta: { title: 'Report Details - FixNet' },
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/ReportsView.vue'),
    meta: { title: 'Reports - FixNet' },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: {
      requiresAuth: true,
      roles: ['resident', 'agency_staff', 'admin', 'super_admin'],
      title: 'Profile - FixNet',
    },
  },
  {
    path: '/email-verification',
    name: 'EmailVerification',
    component: () => import('@/views/EmailVerificationView.vue'),
    meta: { title: 'Email Verification - FixNet' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Page Not Found - FixNet' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.meta?.forceScrollTop) {
      return new Promise((resolve) => {
        setTimeout(() => {
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
          resolve({ top: 0, left: 0, behavior: 'auto' })
        }, 0)
      })
    }

    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const element = document.querySelector(to.hash)
          if (element) {
            resolve({ el: to.hash, behavior: 'smooth' })
          } else {
            resolve({ top: 0, left: 0, behavior: 'smooth' })
          }
        }, 100)
      })
    }

    return { top: 0, left: 0, behavior: 'smooth' }
  },
})

/**
 * Global navigation guards
 */
router.beforeEach(async (to, from, next) => {
  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!isAuthenticated.value) {
      // Try to get current user in case session exists but user is not loaded
      const user = await authService.getCurrentUser()

      if (!user) {
        next({
          path: '/auth',
          query: { redirect: to.fullPath },
        })
        return
      }
    }

    // Check role-based access
    if (to.meta.roles && to.meta.roles.length > 0) {
      if (!hasRoleAccess(currentUser.value?.role, to.meta.roles)) {
        // Redirect based on user role
        const userRole = currentUser.value?.role
        if (userRole === 'admin' || userRole === 'super_admin') {
          next('/admin')
        } else if (userRole === 'agency_staff') {
          next('/agency/dashboard')
        } else {
          next('/dashboard')
        }
        return
      }
    }
  }

  next()
})

export default router
