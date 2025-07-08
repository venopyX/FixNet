<template>
  <div class="flex flex-col sm:flex-row gap-4 pt-6">
    <button
      type="submit"
      :disabled="loading"
      class="claybutton flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border-0 focus:outline-none focus:ring-2 focus:ring-primary/30"
      :class="{ 'opacity-50 cursor-not-allowed': loading }"
    >
      <div
        v-if="loading"
        class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
      ></div>
      <svg
        v-else
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
      <span>{{ loading ? 'Submitting Report...' : 'Submit Report' }}</span>
    </button>

    <button
      type="button"
      @click="$emit('cancel')"
      :disabled="loading"
      class="claybutton inline-flex items-center justify-center gap-2 border-2 border-border text-text-secondary bg-surface px-6 py-4 rounded-2xl font-medium hover:bg-muted hover:text-text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-border/30"
      :class="{ 'opacity-50 cursor-not-allowed': loading }"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span>Cancel</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  loading?: boolean
}

interface Emits {
  submit: []
  cancel: []
}

defineProps<Props>()
defineEmits<Emits>()
</script>
