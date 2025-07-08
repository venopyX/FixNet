<template>
  <div class="relative">
    <!-- Logout Button -->
    <button
      @click="showConfirm = true"
      class="claybutton inline-flex items-center gap-2 border border-border text-text-secondary bg-surface px-4 py-3 rounded-2xl font-medium hover:bg-muted hover:text-text-primary hover:border-error/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-border/30"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span class="hidden sm:inline">Sign Out</span>
    </button>

    <!-- Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="showConfirm = false"
          ></div>

          <!-- Modal -->
          <div class="claycard bg-surface rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl">
            <div class="text-center">
              <div
                class="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-warning"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <h3 class="text-xl font-bold text-text-primary mb-2">Sign Out Confirmation</h3>

              <p class="text-text-secondary mb-6">
                Are you sure you want to sign out of your FixNet account?
              </p>

              <div class="flex gap-3">
                <button
                  @click="showConfirm = false"
                  class="claybutton flex-1 px-4 py-3 border border-border text-text-secondary bg-surface rounded-2xl font-medium hover:bg-muted transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  @click="handleLogout"
                  class="claybutton flex-1 px-4 py-3 bg-error text-white rounded-2xl font-medium hover:bg-error/90 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/utils/auth'

const router = useRouter()
const showConfirm = ref(false)

const handleLogout = () => {
  authService.logout()
  showConfirm.value = false
  router.push('/')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
