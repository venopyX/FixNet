<template>
  <div class="space-y-2">
    <div class="relative">
      <select
        v-model="localValue"
        class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl appearance-none cursor-pointer pr-12 transition-all duration-200"
        :class="{ 'border-error focus:ring-error/20': error }"
        @change="handleChange"
      >
        <option value="pending" class="bg-surface text-text-primary">🟡 Pending Review</option>
        <option value="under_review" class="bg-surface text-text-primary">🔵 Under Review</option>
        <option value="resolved" class="bg-surface text-text-primary">✅ Resolved</option>
        <option value="rejected" class="bg-surface text-text-primary">❌ Rejected</option>
      </select>
      <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
    <p v-if="error" class="text-sm text-error flex items-center gap-1">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Report } from '@/data/mockData'

interface Props {
  modelValue: Report['status']
  error?: string
}

interface Emits {
  'update:modelValue': [value: Report['status']]
  change: [value: Report['status']]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: Report['status']) => {
    emit('update:modelValue', value)
  },
})

const handleChange = () => {
  emit('change', localValue.value)
}
</script>
