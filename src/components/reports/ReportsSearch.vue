<template>
  <div class="relative">
    <div class="relative">
      <input
        v-model="localValue"
        type="text"
        placeholder="Search reports by title, description, or location..."
        class="clayinput w-full pl-12 pr-4 py-3 text-text-primary placeholder-text-text-muted rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30"
        @input="handleInput"
      />
      <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
        <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div v-if="localValue" class="absolute right-3 top-1/2 transform -translate-y-1/2">
        <button
          @click="clearSearch"
          class="w-6 h-6 bg-muted hover:bg-border text-text-muted hover:text-text-primary rounded-full flex items-center justify-center transition-all duration-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string
}

interface Emits {
  'update:modelValue': [value: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})

const handleInput = () => {
  // Debounce could be added here if needed
}

const clearSearch = () => {
  localValue.value = ''
}
</script>
