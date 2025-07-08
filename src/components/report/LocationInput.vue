<template>
  <div class="space-y-2">
    <label for="location" class="flex items-center gap-2 text-sm font-medium text-text-secondary">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      Location
      <span class="text-error">*</span>
    </label>
    <div class="relative">
      <input
        id="location"
        v-model="localValue"
        type="text"
        placeholder="e.g., 'Main Street & Oak Avenue' or '123 Elm Street'"
        class="clayinput w-full px-4 py-3 pl-12 text-text-primary placeholder-text-text-muted rounded-2xl transition-all duration-200"
        :class="{ 'border-error focus:ring-error/20': error }"
        @input="handleInput"
      />
      <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
        <svg
          class="w-5 h-5 text-text-muted"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
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
