<template>
  <div class="claycard bg-surface rounded-3xl p-6">
    <h3 class="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
      <svg
        class="w-5 h-5 text-primary"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      Reported By
    </h3>

    <div v-if="reporter" class="space-y-4">
      <!-- Reporter Profile -->
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
        >
          <span class="text-primary font-semibold text-lg">
            {{ getInitials(reporter.first_name, reporter.last_name) }}
          </span>
        </div>
        <div>
          <h4 class="font-medium text-text-primary">
            {{ reporter.first_name }} {{ reporter.last_name }}
          </h4>
          <p class="text-sm text-text-secondary capitalize">{{ reporter.role }}</p>
        </div>
      </div>

      <!-- Reporter Stats -->
      <div class="claycard bg-background/50 border border-border/50 p-4 rounded-xl">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-text-secondary">Member Since</span>
            <span class="text-sm font-medium text-text-primary">{{
              formatDate(reporter.created_at)
            }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-text-secondary">Total Reports</span>
            <span class="text-sm font-medium text-text-primary">{{ reporterStats.total }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-text-secondary">Resolved Issues</span>
            <span class="text-sm font-medium text-success">{{ reporterStats.resolved }}</span>
          </div>
        </div>
      </div>

      <!-- Community Impact -->
      <div
        class="claycard bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 p-4 rounded-xl"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
            <svg
              class="w-5 h-5 text-accent"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-text-primary">Community Contributor</p>
            <p class="text-xs text-text-secondary">Active in making the community better</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Reporter Not Found -->
    <div v-else class="text-center text-text-muted">
      <svg
        class="w-8 h-8 mx-auto mb-2"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <p class="text-sm">Reporter information unavailable</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Report, mockUsers, mockReports } from '@/data/mockData'

interface Props {
  report: Report
}

const props = defineProps<Props>()

// Find the reporter
const reporter = computed(() => {
  return mockUsers.find((user) => user.id === props.report.resident_id)
})

// Calculate reporter stats
const reporterStats = computed(() => {
  if (!reporter.value) return { total: 0, resolved: 0 }

  const reports = mockReports.filter((r) => r.resident_id === reporter.value!.id)
  const resolved = reports.filter((r) => r.status === 'resolved').length

  return {
    total: reports.length,
    resolved,
  }
})

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}
</script>
