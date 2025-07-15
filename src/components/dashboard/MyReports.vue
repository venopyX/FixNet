<template>
  <div class="space-y-6">
    <!-- Section Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-text-primary mb-2">My Reports</h2>
        <p class="text-text-secondary">Track the progress of your community improvement reports</p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Filter Dropdown -->
        <div class="relative">
          <select
            v-model="selectedFilter"
            class="clayinput bg-surface border border-border text-text-primary px-4 py-2 rounded-xl appearance-none cursor-pointer pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Reports</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              class="w-4 h-4 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <!-- Sort Dropdown -->
        <div class="relative">
          <select
            v-model="selectedSort"
            class="clayinput bg-surface border border-border text-text-primary px-4 py-2 rounded-xl appearance-none cursor-pointer pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="status">By Status</option>
          </select>
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              class="w-4 h-4 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Reports List -->
    <div v-if="filteredReports.length > 0" class="space-y-4">
      <ReportItem
        v-for="report in filteredReports"
        :key="report.id"
        :report="report"
        @click="viewReport(report.id)"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="claycard bg-surface rounded-3xl p-12 text-center">
      <div class="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          class="w-12 h-12 text-text-muted"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>

      <h3 class="text-xl font-semibold text-text-primary mb-2">
        {{
          selectedFilter === 'all'
            ? 'No Reports Yet'
            : `No ${selectedFilter.replace('_', ' ')} Reports`
        }}
      </h3>

      <p class="text-text-secondary mb-6 max-w-md mx-auto">
        {{
          selectedFilter === 'all'
            ? "You haven't submitted any reports yet. Start by reporting an issue in your community."
            : `You don't have any ${selectedFilter.replace('_', ' ')} reports.`
        }}
      </p>

      <router-link
        v-if="selectedFilter === 'all'"
        to="/report/new"
        class="claybutton inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-all duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Create Your First Report
      </router-link>
    </div>

    <!-- Pagination (if needed) -->
    <div v-if="filteredReports.length > 0" class="flex justify-center pt-6">
      <div class="claycard bg-surface px-4 py-2 rounded-xl">
        <span class="text-text-secondary text-sm">
          Showing {{ filteredReports.length }} of {{ userReports.length }} reports
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { mockReports, type Report } from '@/data/mockData'
import { currentUser } from '@/utils/auth'
import ReportItem from './ReportItem.vue'

const router = useRouter()
const selectedFilter = ref<'all' | 'pending' | 'under_review' | 'resolved' | 'rejected'>('all')
const selectedSort = ref<'newest' | 'oldest' | 'status'>('newest')

// Get user's reports
const userReports = computed(() => {
  if (!currentUser.value) return []
  return mockReports.filter((report) => report.resident_id === currentUser.value!.id)
})

// Filter reports
const filteredReports = computed(() => {
  let reports = userReports.value

  // Apply filter
  if (selectedFilter.value !== 'all') {
    reports = reports.filter((report) => report.status === selectedFilter.value)
  }

  // Apply sort
  switch (selectedSort.value) {
    case 'newest':
      reports = [...reports].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      break
    case 'oldest':
      reports = [...reports].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
      break
    case 'status':
      const statusOrder = { pending: 0, under_review: 1, resolved: 2, rejected: 3 }
      reports = [...reports].sort(
        (a, b) =>
          statusOrder[a.status as keyof typeof statusOrder] -
          statusOrder[b.status as keyof typeof statusOrder],
      )
      break
  }

  return reports
})

const viewReport = (reportId: string) => {
  router.push(`/report/${reportId}`)
}
</script>
