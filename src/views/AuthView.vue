<template>
  <div class="min-h-screen py-20">
    <div class="container mx-auto px-6 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div class="w-full max-w-md">
        <!-- Mode Switcher -->
        <div class="flex justify-center mb-8 space-x-4">
          <button
            @click="switchMode('login')"
            :class="modeButtonClass('login')"
            class="claybutton px-6 py-2 font-medium transition-all"
          >
            Sign In
          </button>
          <button
            @click="switchMode('signup')"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue'

const router = useRouter()
const mode = ref<'login' | 'signup' | 'reset'>('login')

// Hash to mode mapping with aliases
const hashToModeMap: Record<string, 'login' | 'signup' | 'reset'> = {
  'sign-in': 'login',
  login: 'login',
  'sign-up': 'signup',
  signup: 'signup',
  register: 'signup',
  'reset-password': 'reset',
  reset: 'reset',
  'forgot-password': 'reset',
}

// Mode to hash mapping (preferred hash for each mode)
const modeToHashMap: Record<'login' | 'signup' | 'reset', string> = {
  login: 'sign-in',
  signup: 'sign-up',
  reset: 'reset-password',
}

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

const forceScrollToTop = () => {
  // Multiple scroll attempts for maximum reliability
  window.scrollTo({ top: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  // Smooth scroll after immediate positioning
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 10)

  // Final fallback for stubborn cases
  setTimeout(() => {
    if (window.scrollY > 0) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, 100)
}

const getModeFromHash = (): 'login' | 'signup' | 'reset' => {
  const hash = window.location.hash.slice(1) // Remove the # symbol
  return hashToModeMap[hash] || 'login'
}

const updateHashFromMode = (newMode: 'login' | 'signup' | 'reset') => {
  const newHash = modeToHashMap[newMode]
  // Only update if different to avoid triggering hashchange event unnecessarily
  if (window.location.hash !== `#${newHash}`) {
    window.location.hash = newHash
  }
}

const switchMode = (newMode: 'login' | 'signup') => {
  mode.value = newMode
  updateHashFromMode(newMode)
  nextTick(() => {
    forceScrollToTop()
  })
}

const handleModeSwitch = (newMode: 'login' | 'signup' | 'reset') => {
  mode.value = newMode
  updateHashFromMode(newMode)
  nextTick(() => {
    forceScrollToTop()
  })
}

const handleHashChange = () => {
  const newMode = getModeFromHash()
  if (newMode !== mode.value) {
    mode.value = newMode
    nextTick(() => {
      forceScrollToTop()
    })
  }
}

onMounted(() => {
  // Set initial mode based on hash
  const initialMode = getModeFromHash()
  mode.value = initialMode

  // If no hash is present, set default hash
  if (!window.location.hash) {
    updateHashFromMode(initialMode)
  }

  // Listen for hash changes (browser navigation)
  window.addEventListener('hashchange', handleHashChange)

  forceScrollToTop()
})

onUnmounted(() => {
  // Clean up event listener
  window.removeEventListener('hashchange', handleHashChange)
})

// Watch for mode changes and ensure scroll to top
watch(mode, () => {
  nextTick(() => {
    forceScrollToTop()
  })
})
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
