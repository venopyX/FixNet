<template>
    <div class="relative">
      <select
        v-model="localValue"
        class="clayinput bg-surface border border-border text-text-primary px-4 py-3 rounded-xl appearance-none cursor-pointer pr-10 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="priority">By Priority</option>
        <option value="status">By Status</option>
      </select>
      <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  type SortOption = 'newest' | 'oldest' | 'priority' | 'status'
  
  interface Props {
    modelValue: SortOption
  }
  
  interface Emits {
    'update:modelValue': [value: SortOption]
  }
  
  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  
  const localValue = computed({
    get: () => props.modelValue,
    set: (value: SortOption) => emit('update:modelValue', value)
  })
  </script>