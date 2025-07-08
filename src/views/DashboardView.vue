<template>
  <div class="min-h-screen bg-background py-20">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto space-y-8">
        <!-- Dashboard Header -->
        <DashboardHeader />

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- New Report Button -->
          <NewReportButton />

          <!-- Stats Cards -->
          <div
            class="claycard bg-surface p-6 rounded-3xl text-center hover:scale-105 transition-all duration-300"
          >
            <div
              class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3"
            >
              <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="text-2xl font-bold text-text-primary mb-1">{{ userStats.resolved }}</div>
            <div class="text-text-secondary text-sm">Issues Resolved</div>
          </div>

          <div
            class="claycard bg-surface p-6 rounded-3xl text-center hover:scale-105 transition-all duration-300"
          >
            <div
              class="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-3"
            >
              <svg class="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="text-2xl font-bold text-text-primary mb-1">{{ userStats.pending }}</div>
            <div class="text-text-secondary text-sm">In Progress</div>
          </div>
        </div>

        <!-- My Reports Section -->
        <MyReports />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { mockReports } from '@/data/mockData'
import { currentUser } from '@/utils/auth'
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import NewReportButton from '@/components/dashboard/NewReportButton.vue'
import MyReports from '@/components/dashboard/MyReports.vue'

// Calculate user stats
const userStats = computed(() => {
  if (!currentUser.value) {
    return { total: 0, resolved: 0, pending: 0 }
  }

  const userReports = mockReports.filter((report) => report.resident_id === currentUser.value!.id)
  const resolved = userReports.filter((report) => report.status === 'resolved').length
  const pending = userReports.filter((report) =>
    ['pending', 'under_review'].includes(report.status),
  ).length

  return {
    total: userReports.length,
    resolved,
    pending,
  }
})
</script>
