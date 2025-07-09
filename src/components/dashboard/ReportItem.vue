<template>
  <div
    class="claycard group bg-surface hover:bg-primary/5 p-6 rounded-3xl cursor-pointer hover:scale-[1.02] transition-all duration-300 border border-transparent hover:border-primary/20"
    @click="$emit('click')"
  >
    <div class="flex flex-col lg:flex-row lg:items-center gap-4">
      <!-- Report Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-4 mb-3">
          <div class="flex-1 min-w-0">
            <h3
              class="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors mb-1 truncate"
            >
              {{ report.title }}
            </h3>
            <p class="text-text-secondary text-sm line-clamp-2">
              {{ report.description }}
            </p>
          </div>
          <StatusBadge :status="report.status" />
        </div>

        <div class="flex flex-wrap items-center gap-4 text-sm text-text-muted">
          <!-- Category -->
          <div class="flex items-center gap-1">
            <div class="w-4 h-4 bg-accent/20 rounded-full flex items-center justify-center">
              <span class="text-accent text-xs">{{ getCategoryIcon(report.category) }}</span>
            </div>
            <span>{{ getCategoryLabel(report.category) }}</span>
          </div>

          <!-- Location -->
          <div class="flex items-center gap-1">
            <svg
              class="w-4 h-4 text-primary"
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
            <span class="truncate">{{ report.location }}</span>
          </div>

          <!-- Date -->
          <div class="flex items-center gap-1">
            <svg
              class="w-4 h-4 text-info"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7V3a4 4 0 118 0v4m-4 0v12m0-12h4a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
              />
            </svg>
            <span>{{ formatDate(report.created_at) }}</span>
          </div>

          <!-- Priority -->
          <div class="flex items-center gap-1">
            <div
              class="w-2 h-2 rounded-full"
              :class="{
                'bg-error': report.priority === 'high',
                'bg-warning': report.priority === 'medium',
                'bg-info': report.priority === 'low',
              }"
            ></div>
            <span class="capitalize">{{ report.priority }} Priority</span>
          </div>
        </div>
      </div>

      <!-- Photo Preview -->
      <div v-if="report.photo_url" class="lg:w-24 lg:h-24 w-full h-32">
        <div
          v-if="!imageLoaded"
          class="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center"
        >
          <svg
            class="w-8 h-8 text-primary"
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
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <img
          v-if="report.photo_url"
          v-show="imageLoaded"
          :src="report.photo_url"
          loading="lazy"
          class="w-full h-full object-cover rounded-2xl"
          @load="imageLoaded = true"
          @error="imageLoaded = true"
        />
      </div>

      <!-- Action Arrow -->
      <div class="lg:w-auto w-full flex justify-end lg:justify-center">
        <div
          class="w-8 h-8 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-200"
        >
          <svg
            class="w-4 h-4 text-primary transform group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Report } from '@/data/mockData'
import StatusBadge from '@/components/shared/StatusBadge.vue'

interface Props {
  report: Report
}

defineProps<Props>()
defineEmits<{
  click: []
}>()

const imageLoaded = ref(false)

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    roads: '🛣️',
    electricity: '⚡',
    water: '💧',
    waste: '🗑️',
    safety: '🛡️',
    other: '📋',
  }
  return icons[category] || '📋'
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    roads: 'Roads',
    electricity: 'Electrical',
    water: 'Water',
    waste: 'Waste',
    safety: 'Safety',
    other: 'Other',
  }
  return labels[category] || category
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
