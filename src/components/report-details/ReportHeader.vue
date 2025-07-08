<template>
  <div class="claycard bg-surface rounded-3xl p-8 relative overflow-hidden">
    <!-- Background decoration -->
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
    ></div>

    <div class="relative z-10">
      <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div class="flex-1 min-w-0">
          <!-- Status Badge -->
          <div class="mb-4">
            <StatusBadge :status="report.status" class="text-base px-4 py-2" />
          </div>

          <!-- Title -->
          <h1 class="text-3xl lg:text-4xl font-bold text-text-primary mb-4 leading-tight">
            {{ report.title }}
          </h1>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-4 text-text-secondary">
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5"
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
              <span>Report #{{ report.id }}</span>
            </div>

            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5"
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
              <span>{{ formatDate(report.created_at) }}</span>
            </div>

            <div class="flex items-center gap-2">
              <div
                class="w-3 h-3 rounded-full"
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

        <!-- Actions -->
        <div v-if="isOwner" class="flex items-center gap-3">
          <button
            class="claybutton inline-flex items-center gap-2 border border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-xl font-medium transition-all duration-200"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Report
          </button>

          <button
            class="claybutton inline-flex items-center gap-2 border border-border text-text-secondary bg-surface hover:bg-muted px-4 py-2 rounded-xl font-medium transition-all duration-200"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Report } from '@/data/mockData'
import StatusBadge from '@/components/shared/StatusBadge.vue'

interface Props {
  report: Report
  isOwner: boolean
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
