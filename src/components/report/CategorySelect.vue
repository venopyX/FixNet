<template>
  <div class="space-y-2">
    <label for="category" class="flex items-center gap-2 text-sm font-medium text-text-secondary">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
      Issue Category
      <span class="text-error">*</span>
    </label>
    <div class="relative">
      <select
        id="category"
        v-model="localValue"
        class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl appearance-none cursor-pointer transition-all duration-200"
        :class="{ 'border-error focus:ring-error/20': error }"
        @change="handleChange"
      >
        <option value="roads" class="bg-surface text-text-primary">
          🛣️ Roads & Infrastructure
        </option>
        <option value="electricity" class="bg-surface text-text-primary">
          ⚡ Electrical Issues
        </option>
        <option value="water" class="bg-surface text-text-primary">💧 Water & Plumbing</option>
        <option value="waste" class="bg-surface text-text-primary">🗑️ Waste Management</option>
        <option value="safety" class="bg-surface text-text-primary">🛡️ Public Safety</option>
        <option value="other" class="bg-surface text-text-primary">📋 Other Issues</option>
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

type Category = 'roads' | 'electricity' | 'water' | 'waste' | 'safety' | 'other'

interface Props {
  modelValue: Category
  error?: string
}

interface Emits {
  'update:modelValue': [value: Category]
  change: [value: Category]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: Category) => {
    emit('update:modelValue', value)
  },
})

const handleChange = () => {
  emit('change', localValue.value)
}
</script>
