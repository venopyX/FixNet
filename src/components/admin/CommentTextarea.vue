<template>
  <div class="space-y-2">
    <div class="relative">
      <textarea
        v-model="localValue"
        :placeholder="placeholder"
        class="clayinput w-full px-4 py-3 text-text-primary placeholder-text-text-muted rounded-2xl resize-none transition-all duration-200"
        :class="{ 'border-error focus:ring-error/20': error }"
        rows="4"
        maxlength="500"
        @input="handleInput"
      ></textarea>
      <div class="absolute right-3 bottom-3 text-xs text-text-muted">
        {{ localValue.length }}/500
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
  placeholder?: string
}

interface Emits {
  'update:modelValue': [value: string]
  input: [value: string]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Add your comment here...',
})
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
