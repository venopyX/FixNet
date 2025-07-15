<template>
  <div class="min-h-screen py-20">
    <div class="container mx-auto px-6 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div class="w-full max-w-md">
        <div class="claycard p-8 text-center">
          <!-- Success State -->
          <div v-if="verificationStatus === 'success'" class="space-y-6">
            <div
              class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-(--text-primary) mb-2">Email Verified!</h1>
              <p class="text-(--text-secondary) mb-6">
                Your email has been successfully verified. You can now sign in to your account.
              </p>
              <router-link
                to="/auth"
                class="claybutton inline-flex items-center gap-2 bg-(--primary) text-white px-6 py-3 rounded-xl font-medium"
              >
                Sign In to Your Account
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </router-link>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="verificationStatus === 'error'" class="space-y-6">
            <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-(--text-primary) mb-2">Verification Failed</h1>
              <p class="text-(--text-secondary) mb-6">
                {{ errorMessage }}
              </p>
              <div class="space-y-3">
                <router-link
                  to="/auth"
                  class="claybutton inline-flex items-center gap-2 bg-(--primary) text-white px-6 py-3 rounded-xl font-medium"
                >
                  Back to Sign In
                </router-link>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-else class="space-y-6">
            <div
              class="w-16 h-16 bg-(--primary) rounded-full flex items-center justify-center mx-auto"
            >
              <svg class="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
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
            </div>
            <div>
              <h1 class="text-2xl font-bold text-(--text-primary) mb-2">Verifying Email</h1>
              <p class="text-(--text-secondary)">
                Please wait while we verify your email address...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'

const route = useRoute()

const verificationStatus = ref<'loading' | 'success' | 'error'>('loading')
const errorMessage = ref('')

onMounted(async () => {
  const token_hash = route.query.token_hash as string
  const type = route.query.type as string

  if (!token_hash || type !== 'email') {
    verificationStatus.value = 'error'
    errorMessage.value =
      'Invalid verification link. Please try again or request a new verification email.'
    return
  }

  try {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: 'email',
    })

    if (error) {
      verificationStatus.value = 'error'
      errorMessage.value = error.message || 'Verification failed. The link may have expired.'
    } else {
      verificationStatus.value = 'success'
    }
  } catch (error) {
    verificationStatus.value = 'error'
    errorMessage.value = 'An unexpected error occurred during verification.'
  }
})
</script>
