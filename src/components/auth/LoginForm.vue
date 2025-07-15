<template>
  <div class="w-full max-w-md mx-auto">
    <div class="claycard p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-(--text-primary) mb-2">Welcome Back</h1>
        <p class="text-(--text-secondary)">Sign in to your FixNet account</p>
      </div>

      <!-- Demo Credentials (only in development) -->
      <div v-if="isDevelopment" class="mb-6 p-4 bg-(--muted) rounded-xl">
        <p class="text-sm font-medium text-(--text-secondary) mb-2">Demo Credentials:</p>
        <div class="text-xs text-(--text-muted) space-y-1">
          <div
            v-for="(cred, role) in demoCredentials"
            :key="role"
            class="cursor-pointer hover:text-(--primary) transition-colors"
            @click="fillDemoCredentials(cred)"
          >
            {{ role }}: {{ cred.email }} / {{ cred.password }}
          </div>
        </div>
      </div>

      <!-- Email Verification Notice -->
      <div
        v-if="showVerificationNotice"
        class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
      >
        <div class="flex items-start gap-3">
          <svg
            class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
          <div>
            <p class="text-sm font-medium text-blue-800">Email Verification Required</p>
            <p class="text-sm text-blue-600 mt-1">
              Please check your email and verify your account before logging in.
            </p>
            <button
              @click="resendVerification"
              :disabled="isResendingVerification"
              class="text-sm text-blue-700 underline hover:text-blue-800 mt-2 disabled:opacity-50"
            >
              {{ isResendingVerification ? 'Sending...' : 'Resend verification email' }}
            </button>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-(--text-secondary) mb-2">
            Email Address
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            class="clayinput w-full px-4 py-3 text-(--text-primary) placeholder-text-(--text-muted)"
            :class="{ 'border-(--error)': errors.email }"
            placeholder="Enter your email"
            required
          />
          <p v-if="errors.email" class="mt-1 text-sm text-(--error)">{{ errors.email }}</p>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-(--text-secondary) mb-2">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              class="clayinput w-full px-4 py-3 pr-12 text-(--text-primary) placeholder-text-(--text-muted)"
              :class="{ 'border-(--error)': errors.password }"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-(--text-muted) hover:text-(--text-secondary)"
            >
              <svg
                v-if="showPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="mt-1 text-sm text-(--error)">{{ errors.password }}</p>
        </div>

        <div v-if="loginError" class="p-3 bg-red-50 border border-(--error) rounded-lg">
          <p class="text-sm text-(--error)">{{ loginError }}</p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="claybutton w-full py-3 px-4 bg-(--primary) text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading" class="flex items-center justify-center gap-2">
            <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Signing In...
          </span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <div class="mt-6 text-center space-y-2">
        <button
          @click="$emit('switchMode', 'reset')"
          class="text-sm text-(--primary) hover:text-(--accent) transition-colors"
        >
          Forgot your password?
        </button>
        <div class="text-sm text-(--text-secondary)">
          Don't have an account?
          <button
            @click="$emit('switchMode', 'signup')"
            class="text-(--primary) hover:text-(--accent) font-medium transition-colors"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authService, demoCredentials } from '@/utils/auth'
import { validateEmail, validatePassword } from '@/utils/validators'

defineEmits<{
  switchMode: [mode: 'login' | 'signup' | 'reset']
}>()

const router = useRouter()
const route = useRoute()

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const isLoading = ref(false)
const loginError = ref('')
const showPassword = ref(false)
const showVerificationNotice = ref(false)
const isResendingVerification = ref(false)

const isDevelopment = computed(() => import.meta.env.DEV)

/**
 * Fill form with demo credentials
 */
const fillDemoCredentials = (credentials: { email: string; password: string }) => {
  form.email = credentials.email
  form.password = credentials.password
}

/**
 * Validate login form
 */
const validateForm = (): boolean => {
  errors.email = ''
  errors.password = ''
  loginError.value = ''
  showVerificationNotice.value = false

  let isValid = true

  const emailValidation = validateEmail(form.email)
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error || ''
    isValid = false
  }

  const passwordValidation = validatePassword(form.password)
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error || ''
    isValid = false
  }

  return isValid
}

/**
 * Handle login form submission
 */
const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    const result = await authService.login(form.email, form.password)

    if (result.success && result.data) {
      // Redirect to intended page or role-based dashboard
      const redirectTo = (route.query.redirect as string) || getDashboardRoute(result.data.role)
      router.push(redirectTo)
    } else {
      if (result.requiresVerification) {
        showVerificationNotice.value = true
      } else {
        loginError.value = result.error || 'Login failed'
      }
    }
  } catch (error) {
    loginError.value = 'An unexpected error occurred'
  } finally {
    isLoading.value = false
  }
}

/**
 * Resend email verification
 */
const resendVerification = async () => {
  if (!form.email) return

  isResendingVerification.value = true

  try {
    const result = await authService.resendVerification(form.email)

    if (result.success) {
      loginError.value = ''
      // Show success message could be added here
    } else {
      loginError.value = result.error || 'Failed to resend verification email'
    }
  } catch (error) {
    loginError.value = 'Failed to resend verification email'
  } finally {
    isResendingVerification.value = false
  }
}

/**
 * Get dashboard route based on user role
 */
const getDashboardRoute = (role: string): string => {
  switch (role) {
    case 'super_admin':
    case 'admin':
      return '/admin'
    case 'agency_staff':
      return '/agency/dashboard'
    default:
      return '/dashboard'
  }
}
</script>
