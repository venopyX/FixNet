import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { isAuthenticated, currentUser } from '@/utils/auth'

// Define role types for type safety
type UserRole = 'super_admin' | 'admin' | 'agency_staff' | 'resident'

// Extend the RouteMeta interface to include our custom properties
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    role?: UserRole
    forceScrollTop?: boolean
  }
}

// Type-safe role hierarchy - defines which roles can access what
const roleHierarchy: Record<UserRole, UserRole[]> = {
  super_admin: ['super_admin', 'admin', 'agency_staff', 'resident'],
  admin: ['admin', 'resident'],
  agency_staff: ['agency_staff'],
  resident: ['resident'],
}

/**
 * Check if user has required role or higher in hierarchy
 * @param userRole - Current user's role
 * @param requiredRole - Role required for the route
 * @returns boolean indicating if user has access
 */
function hasRequiredRole(userRole: string | undefined, requiredRole: UserRole): boolean {
  if (!userRole) return false

  // Check if userRole exists in our hierarchy
  if (!(userRole in roleHierarchy)) return false

  // Type-safe access with assertion
  return roleHierarchy[userRole as UserRole]?.includes(requiredRole) ?? false
}

const routes: RouteRecordRaw[] = [
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
    path: '/admin/users',
    name: 'AdminUserManagement',
    component: () => import('@/views/AdminUserManagementView.vue'),
    meta: { requiresAuth: true, role: 'super_admin' },
  },
  {
    path: '/agency',
    name: 'Agency',
    component: () => import('@/views/AgencyView.vue'),
  },
  {
    path: '/agency/dashboard',
    name: 'AgencyDashboard',
    component: () => import('@/views/AgencyDashboardView.vue'),
    meta: { requiresAuth: true, role: 'agency_staff' },
  },
  {
    path: '/profile/:id',
    name: 'UserProfile',
    component: () => import('@/views/UserProfileView.vue'),
    props: true,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/ReportsView.vue'),
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
    // Special handling for routes that need forced scroll
    // if (to.meta?.forceScrollTop || to.path === '/auth') {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       // Force immediate scroll for problematic routes
    //       document.documentElement.scrollTop = 0
    //       document.body.scrollTop = 0
    //       resolve({ top: 0, left: 0, behavior: 'auto' })
    //     }, 0)
    //   })
    // }

    // If there's a saved position (browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }

    // For hash links to actual elements, scroll to the element
    if (to.hash) {
      return new Promise((resolve) => {
        // Wait a bit for the page to render
        setTimeout(() => {
          const element = document.querySelector(to.hash)
          if (element) {
            resolve({
              el: to.hash,
              behavior: 'smooth',
            })
          } else {
            // Element not found, just scroll to top
            resolve({ top: 0, left: 0, behavior: 'smooth' })
          }
        }, 100)
      })
    }

    // Default: scroll to top for new navigation
    return { top: 0, left: 0, behavior: 'smooth' }
  },
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Check authentication first
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/auth')
    return
  }

  // Check role-based access with hierarchy support
  if (to.meta.role && !hasRequiredRole(currentUser.value?.role, to.meta.role)) {
    // Redirect to home if access denied
    next('/')
    return
  }

  // Allow navigation
  next()
})

export default router
