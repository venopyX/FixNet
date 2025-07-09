<template>
  <div
    class="claycard group bg-surface hover:bg-primary/5 p-6 rounded-3xl cursor-pointer hover:scale-[1.02] transition-all duration-300 border border-transparent hover:border-primary/20"
    @click="$emit('viewReport')"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <span class="text-lg">{{ getCategoryIcon(report.category) }}</span>
        </div>
        <div>
          <div class="text-xs text-text-muted">#{{ report.id }}</div>
          <div class="text-xs text-text-secondary">{{ formatDate(report.created_at) }}</div>
        </div>
      </div>
      <StatusBadge :status="report.status" />
    </div>

    <!-- Content -->
    <div class="mb-4">
      <h3
        class="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors mb-2 line-clamp-2"
      >
        {{ report.title }}
      </h3>
      <p class="text-sm text-text-secondary line-clamp-3 leading-relaxed">
        {{ report.description }}
      </p>
    </div>

    <!-- Photo -->
    <div v-if="report.photo_url" class="mb-4">
      <div
        class="w-full h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center"
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
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-border/30">
      <div class="flex items-center gap-2 text-xs text-text-muted">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
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

      <div class="flex items-center gap-1">
        <div
          class="w-2 h-2 rounded-full"
          :class="{
            'bg-error': report.priority === 'high',
            'bg-warning': report.priority === 'medium',
            'bg-info': report.priority === 'low',
          }"
        ></div>
        <span class="text-xs text-text-muted capitalize">{{ report.priority }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Report } from '@/data/mockData'
import StatusBadge from '@/components/shared/StatusBadge.vue'

interface Props {
  report: Report
}

interface Emits {
  viewReport: []
}

defineProps<Props>()
defineEmits<Emits>()

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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
