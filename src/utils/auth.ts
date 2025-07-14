import { ref } from 'vue'
import { apiService } from '@/services/api'
import { supabase } from '@/lib/supabase'
import type { User } from '@/types/database'

// Authentication state
export const currentUser = ref<User | null>(null)
export const isAuthenticated = ref(false)
export const isLoading = ref(false)

// Enhanced authentication service
export const authService = {
  async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    isLoading.value = true

    try {
      const response = await apiService.signIn(email, password)

      if (response.error) {
        return { success: false, error: response.error }
      }

      currentUser.value = response.data!
      isAuthenticated.value = true

      return { success: true, user: response.data }
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed' }
    } finally {
      isLoading.value = false
    }
  },

  async register(userData: {
    first_name: string
    last_name: string
    email: string
    password: string
    role?: 'resident' | 'agency_staff' | 'admin' | 'super_admin'
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    isLoading.value = true

    try {
      const response = await apiService.signUp(userData.email, userData.password, {
        first_name: userData.first_name,
        last_name: userData.last_name,
        role: userData.role || 'resident',
      })

      if (response.error) {
        return { success: false, error: response.error }
      }

      // Note: User will need to verify email before they can sign in
      return { success: true, user: response.data }
    } catch (error: any) {
      return { success: false, error: error.message || 'Registration failed' }
    } finally {
      isLoading.value = false
    }
  },

  async forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
    isLoading.value = true

    try {
      const response = await apiService.resetPassword(email)

      if (response.error) {
        return { success: false, error: response.error }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'Password reset failed' }
    } finally {
      isLoading.value = false
    }
  },

  async logout(): Promise<void> {
    try {
      await apiService.signOut()
    } finally {
      currentUser.value = null
      isAuthenticated.value = false
    }
  },

  async getCurrentUser(): Promise<User | null> {
    if (currentUser.value) {
      return currentUser.value
    }

    try {
      const response = await apiService.getCurrentUser()

      if (response.data) {
        currentUser.value = response.data
        isAuthenticated.value = true
        return response.data
      }
    } catch (error) {
      console.error('Failed to get current user:', error)
    }

    return null
  },

  async initializeAuth(): Promise<void> {
    isLoading.value = true

    try {
      // Listen for auth state changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const user = await this.getCurrentUser()
          if (user) {
            currentUser.value = user
            isAuthenticated.value = true
          }
        } else if (event === 'SIGNED_OUT') {
          currentUser.value = null
          isAuthenticated.value = false
        }
      })

      // Check for existing session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        const user = await this.getCurrentUser()
        if (user) {
          currentUser.value = user
          isAuthenticated.value = true
        }
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error)
    } finally {
      isLoading.value = false
    }
  },

  // Utility methods
  hasRole(role: string): boolean {
    return currentUser.value?.role === role
  },

  hasAnyRole(roles: string[]): boolean {
    return roles.includes(currentUser.value?.role || '')
  },

  isAdmin(): boolean {
    return this.hasAnyRole(['admin', 'super_admin'])
  },

  isAgencyStaff(): boolean {
    return this.hasRole('agency_staff')
  },

  isSuperAdmin(): boolean {
    return this.hasRole('super_admin')
  },
}

// Demo credentials for testing
export const demoCredentials = {
  resident: {
    email: 'john@example.com',
    password: 'demo123',
  },
  admin: {
    email: 'admin@fixnet.com',
    password: 'admin123',
  },
  agencyStaff: {
    email: 'staff@agency.com',
    password: 'staff123',
  },
  superAdmin: {
    email: 'super@fixnet.com',
    password: 'super123',
  },
}
