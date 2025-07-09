<template>
  <div class="relative" v-click-outside="closeDropdown">
    <button
      @click="toggleDropdown"
      class="claybutton inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 px-4 py-2 rounded-xl font-medium transition-all duration-200"
      :class="{ 'bg-accent/20': showDropdown }"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
        />
      </svg>
      Bulk Actions
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': showDropdown }"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition name="dropdown">
      <div
        v-if="showDropdown"
        class="absolute right-0 top-full mt-2 w-48 claycard bg-surface border border-border/50 rounded-2xl shadow-xl z-50"
      >
        <div class="p-2">
          <button
            @click="handleAction('activate')"
            class="claybutton flex items-center gap-3 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-success hover:bg-success/5 transition-all duration-200"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Activate Users</span>
          </button>

          <button
            @click="handleAction('deactivate')"
            class="claybutton flex items-center gap-3 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-warning hover:bg-warning/5 transition-all duration-200"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Deactivate Users</span>
          </button>

          <button
            @click="handleAction('suspend')"
            class="claybutton flex items-center gap-3 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-error hover:bg-error/5 transition-all duration-200"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
              />
            </svg>
            <span>Suspend Users</span>
          </button>

          <div class="border-t border-border/50 my-2"></div>

          <button
            @click="handleAction('send_email')"
            class="claybutton flex items-center gap-3 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-info hover:bg-info/5 transition-all duration-200"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Send Email</span>
          </button>

          <button
            @click="handleAction('export')"
            class="claybutton flex items-center gap-3 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-secondary hover:bg-secondary/5 transition-all duration-200"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Export Selected</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  selectedCount: number
}

interface Emits {
  action: [actionType: string]
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}

const handleAction = (actionType: string) => {
  emit('action', actionType)
  closeDropdown()
}

// Click outside directive
const vClickOutside = {
  beforeMount(el: HTMLElement, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top right;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
