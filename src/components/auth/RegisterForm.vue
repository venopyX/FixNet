<template>
  <div class="w-full max-w-md mx-auto">
    <div class="claycard p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-(--text-primary) mb-2">Join FixNet</h1>
        <p class="text-(--text-secondary)">Create your account to start reporting issues</p>
      </div>

      <!-- Registration Success Message -->
      <div
        v-if="registrationSuccess"
        class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
      >
        <div class="flex items-start gap-3">
          <svg
            class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <div>
            <p class="text-sm font-medium text-green-800">Registration Successful!</p>
            <p class="text-sm text-green-600 mt-1">
              Please check your email and verify your account before logging in.
            </p>
            <button
              @click="$emit('switchMode', 'login')"
              class="text-sm text-green-700 underline hover:text-green-800 mt-2"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>

      <form v-else @submit.prevent="handleRegister" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-(--text-secondary) mb-2">
              First Name
            </label>
            <input
              id="firstName"
              v-model="form.first_name"
              type="text"
              autocomplete="given-name"
              class="clayinput w-full px-4 py-3 text-(--text-primary) placeholder-text-(--text-muted)"
              :class="{ 'border-(--error)': errors.first_name }"
              placeholder="John"
              required
            />
            <p v-if="errors.first_name" class="mt-1 text-sm text-(--error)">
              {{ errors.first_name }}
            </p>
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-(--text-secondary) mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              v-model="form.last_name"
              type="text"
              autocomplete="family-name"
              class="clayinput w-full px-4 py-3 text-(--text-primary) placeholder-text-(--text-muted)"
              :class="{ 'border-(--error)': errors.last_name }"
              placeholder="Doe"
              required
            />
            <p v-if="errors.last_name" class="mt-1 text-sm text-(--error)">
              {{ errors.last_name }}
            </p>
          </div>
        </div>

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
            placeholder="john@example.com"
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
              autocomplete="new-password"
              class="clayinput w-full px-4 py-3 pr-12 text-(--text-primary) placeholder-text-(--text-muted)"
              :class="{ 'border-(--error)': errors.password }"
              placeholder="At least 6 characters"
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
          <div class="mt-1">
            <div class="flex items-center gap-2 text-xs">
              <div class="flex gap-1">
                <div
                  v-for="(requirement, index) in passwordRequirements"
                  :key="index"
                  class="w-2 h-2 rounded-full transition-colors"
                  :class="requirement.met ? 'bg-green-500' : 'bg-gray-300'"
                />
              </div>
              <span class="text-(--text-muted)">Password strength</span>
            </div>
          </div>
          <p v-if="errors.password" class="mt-1 text-sm text-(--error)">{{ errors.password }}</p>
        </div>

        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-(--text-secondary) mb-2"
          >
            Confirm Password
          </label>
          <div class="relative">
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              autocomplete="new-password"
              class="clayinput w-full px-4 py-3 pr-12 text-(--text-primary) placeholder-text-(--text-muted)"
              :class="{ 'border-(--error)': errors.confirmPassword }"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-(--text-muted) hover:text-(--text-secondary)"
            >
              <svg
                v-if="showConfirmPassword"
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
          <p v-if="errors.confirmPassword" class="mt-1 text-sm text-(--error)">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <div v-if="registerError" class="p-3 bg-red-50 border border-(--error) rounded-lg">
          <p class="text-sm text-(--error)">{{ registerError }}</p>
        </div>

        <button
          type="submit"
          :disabled="isLoading || !isFormValid"
          class="claybutton w-full py-3 px-4 bg-(--secondary) text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
            Creating Account...
          </span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <div v-if="!registrationSuccess" class="mt-6 text-center">
        <div class="text-sm text-(--text-secondary)">
          Already have an account?
          <button
            @click="$emit('switchMode', 'login')"
            class="text-(--primary) hover:text-(--accent) font-medium transition-colors"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { authService } from '@/utils/auth'
import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
} from '@/utils/validators'

defineEmits<{
  switchMode: [mode: 'login' | 'signup' | 'reset']
}>()

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const isLoading = ref(false)
const registerError = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const registrationSuccess = ref(false)

/**
 * Password strength requirements
 */
const passwordRequirements = computed(() => [
  { met: form.password.length >= 6, text: 'At least 6 characters' },
  { met: /[A-Z]/.test(form.password), text: 'One uppercase letter' },
  { met: /[a-z]/.test(form.password), text: 'One lowercase letter' },
  { met: /[0-9]/.test(form.password), text: 'One number' },
])

/**
 * Check if form is valid for submission
 */
const isFormValid = computed(() => {
  return (
    form.first_name.trim().length >= 2 &&
    form.last_name.trim().length >= 2 &&
    validateEmail(form.email).isValid &&
    form.password.length >= 6 &&
    form.password === form.confirmPassword
  )
})

/**
 * Validate registration form
 */
const validateForm = (): boolean => {
  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = ''
  })
  registerError.value = ''

  let isValid = true

  const firstNameValidation = validateName(form.first_name, 'First name')
  if (!firstNameValidation.isValid) {
    errors.first_name = firstNameValidation.error || ''
    isValid = false
  }

  const lastNameValidation = validateName(form.last_name, 'Last name')
  if (!lastNameValidation.isValid) {
    errors.last_name = lastNameValidation.error || ''
    isValid = false
  }

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

  const confirmPasswordValidation = validateConfirmPassword(form.password, form.confirmPassword)
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.error || ''
    isValid = false
  }

  return isValid
}

/**
 * Handle registration form submission
 */
const handleRegister = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    const result = await authService.register({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
    })

    if (result.success) {
      registrationSuccess.value = true

      // Clear form
      Object.keys(form).forEach((key) => {
        form[key as keyof typeof form] = ''
      })
    } else {
      registerError.value = result.error || 'Registration failed'
    }
  } catch (error) {
    registerError.value = 'An unexpected error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>
