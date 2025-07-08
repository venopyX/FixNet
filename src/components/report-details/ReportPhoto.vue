<template>
  <div class="claycard bg-surface rounded-3xl p-6">
    <h2 class="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
      <svg
        class="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      Photo Evidence
    </h2>

    <div class="relative">
      <div
        class="claycard bg-background/50 rounded-2xl overflow-hidden cursor-pointer group"
        @click="openLightbox"
      >
        <img
          :src="report.photo_url"
          :alt="report.title"
          class="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center"
        >
          <div
            class="w-12 h-12 bg-white/0 group-hover:bg-white/90 rounded-full flex items-center justify-center transition-all duration-300"
          >
            <svg
              class="w-6 h-6 text-white group-hover:text-text-primary transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </div>
      </div>

      <p class="text-sm text-text-muted mt-3 text-center">Click to view full size</p>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="showLightbox" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="closeLightbox"></div>

          <!-- Image Container -->
          <div class="relative z-10 max-w-6xl max-h-full">
            <img
              :src="report.photo_url"
              :alt="report.title"
              class="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />

            <!-- Close Button -->
            <button
              @click="closeLightbox"
              class="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Report } from '@/data/mockData'

interface Props {
  report: Report
}

defineProps<Props>()

const showLightbox = ref(false)

const openLightbox = () => {
  showLightbox.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  showLightbox.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.lightbox-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.lightbox-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.lightbox-enter-to,
.lightbox-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
