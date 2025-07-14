<template>
  <div
    :class="[
      'claycard bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center overflow-hidden',
      sizeClasses,
    ]"
  >
    <img
      v-if="!logoError"
      :src="logoSrc"
      alt="FixNet Logo"
      :class="imageClasses"
      :loading="loading"
      @error="handleLogoError"
      @load="handleLogoLoad"
    />
    <span v-else :class="['text-white font-bold', textSizeClasses]">
      {{ fallbackText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import logoImage from '@/assets/logo.png'

interface Props {
  size?: 'small' | 'medium' | 'large'
  loading?: 'eager' | 'lazy'
  fallbackText?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  loading: 'lazy',
  fallbackText: 'FN',
})

const logoError = ref(false)
const logoSrc = logoImage

const sizeClasses = computed(() => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
  }
  return sizes[props.size]
})

const imageClasses = computed(() => {
  return 'w-full h-full object-contain transition-transform duration-200 hover:scale-105'
})

const textSizeClasses = computed(() => {
  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-lg',
  }
  return textSizes[props.size]
})

const handleLogoError = () => {
  console.warn('Logo image failed to load, falling back to text')
  logoError.value = true
}

const handleLogoLoad = () => {
  logoError.value = false
}
</script>

<style scoped>
/* Ensure logo doesn't get blurry on small sizes */
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Smooth hover effect */
.claycard:hover img {
  transform: scale(1.05);
}
</style>
