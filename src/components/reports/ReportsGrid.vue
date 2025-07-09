<template>
    <div>
      <!-- Reports Grid -->
      <div v-if="reports.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ReportCard
          v-for="report in reports"
          :key="report.id"
          :report="report"
          @view-report="$emit('viewReport', report.id)"
        />
      </div>
  
      <!-- Empty State -->
      <div v-else class="claycard bg-surface rounded-3xl p-12 text-center">
        <div class="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-2">No Reports Found</h3>
        <p class="text-text-secondary">
          Try adjusting your search criteria or filters to find more reports.
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { type Report } from '@/data/mockData'
  import ReportCard from './ReportCard.vue'
  
  interface Props {
    reports: Report[]
  }
  
  interface Emits {
    viewReport: [reportId: string]
  }
  
  defineProps<Props>()
  defineEmits<Emits>()
  </script>