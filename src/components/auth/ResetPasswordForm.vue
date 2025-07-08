<template>
  <div class="w-full max-w-md mx-auto">
    <div class="claycard p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-(--text-primary) mb-2">Reset Password</h1>
        <p class="text-(--text-secondary)">Enter your email to receive reset instructions</p>
      </div>

      <form v-if="!emailSent" @submit.prevent="handleReset" class="space-y-6">
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

        <div v-if="resetError" class="p-3 bg-red-50 border border-(--error) rounded-lg">
          <p class="text-sm text-(--error)">{{ resetError }}</p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="claybutton w-full py-3 px-4 bg-(--accent) text-white font-medium"
          :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
        >
          <span v-if="isLoading">Sending...</span>
          <span v-else>Send Reset Link</span>
        </button>
      </form>

      <!-- Success Message -->
      <div v-else class="text-center space-y-4">
        <div
          class="w-16 h-16 bg-(--success) rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-(--text-primary)">Check Your Email</h3>
        <p class="text-(--text-secondary)">
          We've sent password reset instructions to<br />
          <strong>{{ form.email }}</strong>
        </p>
        <p class="text-sm text-(--text-muted)">Don't see the email? Check your spam folder.</p>
      </div>

      <div class="mt-6 text-center">
        <button
          @click="$emit('switchMode', 'login')"
          class="text-(--primary) hover:text-(--accent) font-medium transition-colors"
        >
          ← Back to Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { authService } from '@/utils/auth'
import { validateEmail } from '@/utils/validators'

defineEmits<{
  switchMode: [mode: 'login' | 'signup' | 'reset']
}>()

const form = reactive({
  email: '',
})

const errors = reactive({
  email: '',
})

const isLoading = ref(false)
const resetError = ref('')
const emailSent = ref(false)

const validateForm = () => {
  errors.email = ''
  resetError.value = ''

  const emailValidation = validateEmail(form.email)
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error || ''
    return false
  }

  return true
}

const handleReset = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const result = await authService.forgotPassword(form.email)

    if (result.success) {
      emailSent.value = true
    } else {
      resetError.value = result.error || 'Failed to send reset email'
    }
  } catch (error) {
    resetError.value = 'An unexpected error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>
