<template>
  <div class="w-full max-w-md mx-auto">
    <div class="claycard p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-(--text-primary) mb-2">Join FixNet</h1>
        <p class="text-(--text-secondary)">Create your account to start reporting issues</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
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
            autocomplete="new-password"
            class="clayinput w-full px-4 py-3 text-(--text-primary) placeholder-text-(--text-muted)"
            :class="{ 'border-(--error)': errors.password }"
            placeholder="At least 6 characters"
          />
          <p v-if="errors.password" class="mt-1 text-sm text-(--error)">{{ errors.password }}</p>
        </div>

        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-(--text-secondary) mb-2"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            autocomplete="new-password"
            class="clayinput w-full px-4 py-3 text-(--text-primary) placeholder-text-(--text-muted)"
            :class="{ 'border-(--error)': errors.confirmPassword }"
            placeholder="Confirm your password"
          />
          <p v-if="errors.confirmPassword" class="mt-1 text-sm text-(--error)">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <div v-if="registerError" class="p-3 bg-red-50 border border-(--error) rounded-lg">
          <p class="text-sm text-(--error)">{{ registerError }}</p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="claybutton w-full py-3 px-4 bg-(--secondary) text-white font-medium"
          :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
        >
          <span v-if="isLoading">Creating Account...</span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <div class="mt-6 text-center">
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
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

const router = useRouter()

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

const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = ''
  })
  registerError.value = ''

  let isValid = true

  // Validate first name
  const firstNameValidation = validateName(form.first_name, 'First name')
  if (!firstNameValidation.isValid) {
    errors.first_name = firstNameValidation.error || ''
    isValid = false
  }

  // Validate last name
  const lastNameValidation = validateName(form.last_name, 'Last name')
  if (!lastNameValidation.isValid) {
    errors.last_name = lastNameValidation.error || ''
    isValid = false
  }

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

  // Validate confirm password
  const confirmPasswordValidation = validateConfirmPassword(form.password, form.confirmPassword)
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.error || ''
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const result = await authService.register({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
    })

    if (result.success && result.user) {
      // Redirect to dashboard after successful registration
      router.push('/dashboard')
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
