<template>
  <div class="w-full max-w-md mx-auto">
    <div class="claycard p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-(--text-primary) mb-2">Welcome Back</h1>
        <p class="text-(--text-secondary)">Sign in to your FixNet account</p>
      </div>

      <!-- Demo Credentials -->
      <div class="mb-6 p-4 bg-(--muted) rounded-xl">
        <p class="text-sm font-medium text-(--text-secondary) mb-2">Demo Credentials:</p>
        <div class="text-xs text-(--text-muted) space-y-1">
          <div>Resident: john@example.com / demo123</div>
          <div>Admin: admin@fixnet.com / admin123</div>
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
          />
          <p v-if="errors.email" class="mt-1 text-sm text-(--error)">{{ errors.email }}</p>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-(--text-secondary) mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            autocomplete="current-password"
            class="clayinput w-full px-4 py-3 text-(--text-primary) placeholder-text-(--text-muted)"
            :class="{ 'border-(--error)': errors.password }"
            placeholder="Enter your password"
          />
          <p v-if="errors.password" class="mt-1 text-sm text-(--error)">{{ errors.password }}</p>
        </div>

        <div v-if="loginError" class="p-3 bg-red-50 border border-(--error) rounded-lg">
          <p class="text-sm text-(--error)">{{ loginError }}</p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="claybutton w-full py-3 px-4 bg-(--primary) text-white font-medium"
          :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
        >
          <span v-if="isLoading">Signing In...</span>
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/utils/auth'
import { validateEmail, validatePassword } from '@/utils/validators'

defineEmits<{
  switchMode: [mode: 'login' | 'signup' | 'reset']
}>()

const router = useRouter()

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

const validateForm = () => {
  // Clear previous errors
  errors.email = ''
  errors.password = ''
  loginError.value = ''

  let isValid = true

  // Validate email
  const emailValidation = validateEmail(form.email)
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error || ''
    isValid = false
  }

  // Validate password
  const passwordValidation = validatePassword(form.password)
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error || ''
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const result = await authService.login(form.email, form.password)

    if (result.success && result.user) {
      // Redirect based on user role
      if (result.user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } else {
      loginError.value = result.error || 'Login failed'
    }
  } catch (error) {
    loginError.value = 'An unexpected error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>
