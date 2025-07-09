<template>
  <div class="relative" v-click-outside="closeDropdown">
    <button
      @click="toggleDropdown"
      class="claybutton inline-flex items-center gap-2 border border-border text-text-secondary bg-surface hover:bg-muted px-4 py-2 rounded-xl font-medium transition-all duration-200"
      :class="{ 'bg-muted': showDropdown }"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Export
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

    <!-- Export Options -->
    <Transition name="dropdown">
      <div
        v-if="showDropdown"
        class="absolute right-0 top-full mt-2 w-40 claycard bg-surface border border-border/50 rounded-2xl shadow-xl z-50"
      >
        <div class="p-2">
          <button
            @click="handleExport('csv')"
            class="claybutton flex items-center gap-3 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-primary hover:bg-primary/5 transition-all duration-200"
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Export CSV</span>
          </button>

          <button
            @click="handleExport('excel')"
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
                d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6M9 11h6"
              />
            </svg>
            <span>Export Excel</span>
          </button>

          <button
            @click="handleExport('pdf')"
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
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span>Export PDF</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Emits {
  export: [format: string]
}

const emit = defineEmits<Emits>()

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}

const handleExport = (format: string) => {
  emit('export', format)
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
