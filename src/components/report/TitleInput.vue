<template>
  <div class="space-y-2">
    <label for="title" class="flex items-center gap-2 text-sm font-medium text-text-secondary">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z"
        />
      </svg>
      Report Title
      <span class="text-error">*</span>
    </label>
    <div class="relative">
      <input
        id="title"
        v-model="localValue"
        type="text"
        placeholder="Brief description of the issue (e.g., 'Large pothole on Main Street')"
        class="clayinput w-full px-4 py-3 text-text-primary placeholder-text-text-muted rounded-2xl transition-all duration-200"
        :class="{ 'border-error focus:ring-error/20': error }"
        maxlength="100"
        @input="handleInput"
      />
      <div class="absolute right-3 top-3 text-xs text-text-muted">{{ localValue.length }}/100</div>
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

interface Props {
  modelValue: string
  error?: string
}

interface Emits {
  'update:modelValue': [value: string]
  input: [value: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value)
  },
})

const handleInput = () => {
  emit('input', localValue.value)
}
</script>
