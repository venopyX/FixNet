import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import { databaseService } from '@/services/database'
import type { User } from '@/types/database'
import type { AuthError, Session } from '@supabase/supabase-js'

/**
 * Authentication state management
 */
export const currentUser = ref<User | null>(null)
export const currentSession = ref<Session | null>(null)
export const isAuthenticated = computed(() => !!currentSession.value && !!currentUser.value)
export const isLoading = ref(false)

/**
 * Authentication result interface for consistent error handling
 */
export interface AuthResult<T = any> {
  success: boolean
  data?: T
  error?: string
  requiresVerification?: boolean
}

/**
 * User registration data interface
 */
export interface RegisterData {
  first_name: string
  last_name: string
  email: string
  password: string
}

/**
 * Enhanced authentication service with Supabase integration
 */
export const authService = {
  /**
   * User login with email and password
   */
  async login(email: string, password: string): Promise<AuthResult<User>> {
    isLoading.value = true

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      })

      if (authError) {
        return {
          success: false,
          error: this.formatAuthError(authError),
        }
      }

      if (!authData.user) {
        return {
          success: false,
          error: 'Authentication failed',
        }
      }

      if (!authData.user.email_confirmed_at) {
        return {
          success: false,
          error: 'Please verify your email before logging in',
          requiresVerification: true,
        }
      }

      const { data: userData, error: userError } = await databaseService.getUserByEmail(email)

      if (userError || !userData) {
        await supabase.auth.signOut()
        return {
          success: false,
          error: 'User profile not found',
        }
      }

      await databaseService.updateUser(userData.id, {
        last_login: new Date().toISOString(),
      })

      currentSession.value = authData.session
      currentUser.value = userData

      return {
        success: true,
        data: userData,
      }
    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred during login',
      }
    } finally {
      isLoading.value = false
    }
  },

  /**
   * User registration with email verification and proper ID handling
   */
  async register(userData: RegisterData): Promise<AuthResult<User>> {
    isLoading.value = true

    try {
      // Step 1: Create auth user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email.toLowerCase().trim(),
        password: userData.password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
          },
        },
      })

      if (authError) {
        return {
          success: false,
          error: this.formatAuthError(authError),
        }
      }

      if (!authData.user) {
        return {
          success: false,
          error: 'Registration failed',
        }
      }

      // Step 2: Create user profile with the same ID from Supabase Auth
      const userProfile = {
        id: authData.user.id, // Use the ID from Supabase Auth
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email.toLowerCase().trim(),
        password: 'managed_by_supabase_auth',
        role: 'resident' as const,
        status: 'active' as const,
        contact_enabled: true,
        agency: undefined,
        assigned_categories: undefined,
        permissions: this.getDefaultPermissions('resident'),
      }

      const { data: profileData, error: profileError } =
        await databaseService.createUser(userProfile)

      if (profileError) {
        console.error('Profile creation failed:', profileError)

        // Clean up auth user if profile creation fails
        try {
          await supabase.auth.admin.deleteUser(authData.user.id)
        } catch (cleanupError) {
          console.error('Failed to cleanup auth user:', cleanupError)
        }

        return {
          success: false,
          error: 'Failed to create user profile. Please try again or contact support.',
        }
      }

      return {
        success: true,
        data: profileData!,
        requiresVerification: !authData.session,
      }
    } catch (error) {
      console.error('Registration error:', error)
      return {
        success: false,
        error: 'An unexpected error occurred during registration',
      }
    } finally {
      isLoading.value = false
    }
  },

  /**
   * Password reset request
   */
  async resetPassword(email: string): Promise<AuthResult<boolean>> {
    isLoading.value = true

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase().trim(), {
        redirectTo: `${window.location.origin}/auth#reset-password`,
      })

      if (error) {
        return {
          success: false,
          error: this.formatAuthError(error),
        }
      }

      return {
        success: true,
        data: true,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to send password reset email',
      }
    } finally {
      isLoading.value = false
    }
  },

  /**
   * Update password (for authenticated users)
   */
  async updatePassword(newPassword: string): Promise<AuthResult<boolean>> {
    isLoading.value = true

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        return {
          success: false,
          error: this.formatAuthError(error),
        }
      }

      return {
        success: true,
        data: true,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update password',
      }
    } finally {
      isLoading.value = false
    }
  },

  /**
   * Resend email verification
   */
  async resendVerification(email: string): Promise<AuthResult<boolean>> {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.toLowerCase().trim(),
      })

      if (error) {
        return {
          success: false,
          error: this.formatAuthError(error),
        }
      }

      return {
        success: true,
        data: true,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to resend verification email',
      }
    }
  },

  /**
   * User logout
   */
  async logout(): Promise<AuthResult<boolean>> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return {
          success: false,
          error: this.formatAuthError(error),
        }
      }

      this.clearAuthState()

      return {
        success: true,
        data: true,
      }
    } catch (error) {
      this.clearAuthState()
      return {
        success: false,
        error: 'Logout failed, but session cleared locally',
      }
    }
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    if (currentUser.value) {
      return currentUser.value
    }

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        return null
      }

      const { data: userData, error: userError } = await databaseService.getUserByEmail(user.email!)

      if (userError || !userData) {
        return null
      }

      currentUser.value = userData
      return userData
    } catch (error) {
      console.error('Failed to get current user:', error)
      return null
    }
  },

  /**
   * Initialize authentication state
   */
  async initializeAuth(): Promise<void> {
    isLoading.value = true

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error('Failed to get session:', error)
        return
      }

      if (session) {
        await this.handleSessionChange(session)
      }

      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)

        switch (event) {
          case 'SIGNED_IN':
          case 'TOKEN_REFRESHED':
            if (session) {
              await this.handleSessionChange(session)
            }
            break
          case 'SIGNED_OUT':
            this.clearAuthState()
            break
          case 'PASSWORD_RECOVERY':
            break
        }
      })
    } catch (error) {
      console.error('Failed to initialize auth:', error)
    } finally {
      isLoading.value = false
    }
  },

  /**
   * Handle session changes
   */
  async handleSessionChange(session: Session): Promise<void> {
    try {
      currentSession.value = session

      if (session.user?.email) {
        const { data: userData, error } = await databaseService.getUserByEmail(session.user.email)

        if (!error && userData) {
          currentUser.value = userData
        } else {
          console.error('User profile not found for authenticated user')
          this.clearAuthState()
        }
      }
    } catch (error) {
      console.error('Failed to handle session change:', error)
      this.clearAuthState()
    }
  },

  /**
   * Clear authentication state
   */
  clearAuthState(): void {
    currentUser.value = null
    currentSession.value = null
  },

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    return currentUser.value?.role === role
  },

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: string[]): boolean {
    return roles.includes(currentUser.value?.role || '')
  },

  /**
   * Check if user is admin (admin or super_admin)
   */
  isAdmin(): boolean {
    return this.hasAnyRole(['admin', 'super_admin'])
  },

  /**
   * Check if user is super admin
   */
  isSuperAdmin(): boolean {
    return this.hasRole('super_admin')
  },

  /**
   * Check if user is agency staff
   */
  isAgencyStaff(): boolean {
    return this.hasRole('agency_staff')
  },

  /**
   * Get default permissions for role
   */
  getDefaultPermissions(role: string): string[] {
    const permissions: Record<string, string[]> = {
      resident: ['create_report', 'view_own_reports'],
      agency_staff: [
        'create_report',
        'view_own_reports',
        'manage_assigned_reports',
        'update_status',
      ],
      admin: [
        'create_report',
        'view_all_reports',
        'manage_reports',
        'update_status',
        'view_analytics',
        'manage_users',
      ],
      super_admin: ['full_access'],
    }

    return permissions[role] || permissions.resident
  },

  /**
   * Format Supabase auth errors for user-friendly display
   */
  formatAuthError(error: AuthError): string {
    const errorMappings: Record<string, string> = {
      'Invalid login credentials': 'Invalid email or password',
      'Email not confirmed': 'Please verify your email before logging in',
      'User already registered': 'An account with this email already exists',
      'Password should be at least 6 characters': 'Password must be at least 6 characters long',
      'Unable to validate email address: invalid format': 'Please enter a valid email address',
      'Signup is disabled': 'New registrations are currently disabled',
      'Email rate limit exceeded': 'Too many email attempts. Please try again later',
      'For security purposes, you can only request this once every 60 seconds':
        'Please wait before requesting another email',
    }

    return errorMappings[error.message] || error.message || 'An unexpected error occurred'
  },
}

/**
 * Demo credentials for testing (remove in production)
 */
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
