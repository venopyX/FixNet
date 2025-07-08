<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <!-- Mode Switcher -->
      <div class="flex justify-center mb-8 space-x-4">
        <button
          @click="mode = 'login'"
          :class="modeButtonClass('login')"
          class="claybutton px-6 py-2 font-medium transition-all"
        >
          Sign In
        </button>
        <button
          @click="mode = 'signup'"
          :class="modeButtonClass('signup')"
          class="claybutton px-6 py-2 font-medium transition-all"
        >
          Sign Up
        </button>
      </div>

      <!-- Auth Forms -->
      <Transition name="fade" mode="out-in">
        <component :is="currentComponent" @switch-mode="handleModeSwitch" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue'

const mode = ref<'login' | 'signup' | 'reset'>('login')

const currentComponent = computed(() => {
  switch (mode.value) {
    case 'signup':
      return RegisterForm
    case 'reset':
      return ResetPasswordForm
    default:
      return LoginForm
  }
})

const modeButtonClass = (targetMode: 'login' | 'signup') => {
  const isActive = mode.value === targetMode
  return [
    isActive
      ? 'bg-(--primary) text-white'
      : 'bg-(--surface) text-(--text-secondary) hover:bg-(--muted)',
  ].join(' ')
}

const handleModeSwitch = (newMode: 'login' | 'signup' | 'reset') => {
  mode.value = newMode
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
