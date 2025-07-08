<template>
  <div class="relative">
    <select
      v-model="localValue"
      class="clayinput bg-surface border border-border text-text-primary px-4 py-2 rounded-xl appearance-none cursor-pointer pr-10 min-w-[120px] focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      <option value="all">All Priority</option>
      <option value="high">🔴 High</option>
      <option value="medium">🟡 Medium</option>
      <option value="low">🔵 Low</option>
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

type PriorityFilter = 'all' | 'high' | 'medium' | 'low'

interface Props {
  modelValue: PriorityFilter
}

interface Emits {
  'update:modelValue': [value: PriorityFilter]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: PriorityFilter) => {
    emit('update:modelValue', value)
  },
})
</script>
