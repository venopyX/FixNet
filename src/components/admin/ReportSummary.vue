<template>
  <div class="claycard bg-background/50 border border-border/50 p-6 rounded-2xl">
    <div class="flex items-start gap-4">
      <!-- Report Icon -->
      <div
        class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0"
      >
        <span class="text-xl">{{ getCategoryIcon(report.category) }}</span>
      </div>

      <!-- Report Info -->
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-text-primary mb-2">{{ report.title }}</h3>
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-4">
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
              <span class="text-text-secondary">{{ report.location }}</span>
            </div>
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
              <span class="text-text-secondary">ID #{{ report.id }}</span>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
              <div
                class="w-3 h-3 rounded-full"
                :class="{
                  'bg-error': report.priority === 'high',
                  'bg-warning': report.priority === 'medium',
                  'bg-info': report.priority === 'low',
                }"
              ></div>
              <span class="text-text-secondary capitalize">{{ report.priority }} Priority</span>
            </div>
            <div class="flex items-center gap-1">
              <svg
                class="w-4 h-4 text-accent"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-text-secondary">{{ formatDate(report.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Report } from '@/data/mockData'

interface Props {
  report: Report
}

defineProps<Props>()

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
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
