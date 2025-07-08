<template>
  <button
    @click="$emit('click')"
    class="claybutton inline-flex items-center gap-2 text-text-secondary bg-surface border border-border hover:bg-muted hover:text-text-primary hover:border-primary/30 px-4 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-border/30"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    <span>Back</span>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>
