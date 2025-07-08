<template>
  <div class="claycard bg-surface rounded-3xl overflow-hidden">
    <!-- Table Header -->
    <div class="bg-background/50 p-6 border-b border-border/50">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 class="text-lg font-semibold text-text-primary">
          {{ filteredReports.length }} Report{{ filteredReports.length !== 1 ? 's' : '' }}
        </h3>

        <div class="flex items-center gap-3">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search reports..."
              class="clayinput bg-surface border border-border text-text-primary pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[200px]"
            />
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <!-- Refresh Button -->
          <button
            @click="refreshData"
            class="claybutton w-10 h-10 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl flex items-center justify-center transition-all duration-200"
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
                d="M4 4v5h5M20 20v-5h-5M13 3l4 4-4 4M11 21l-4-4 4-4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Table Content -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-background/30 border-b border-border/50">
          <tr>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary">Report</th>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary">Category</th>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary">Priority</th>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary">Status</th>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary">Created</th>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border/30">
          <ReportRow
            v-for="report in filteredReports"
            :key="report.id"
            :report="report"
            @update-status="$emit('updateStatus', report)"
            @view-details="$emit('viewDetails', report.id)"
          />
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-if="filteredReports.length === 0" class="p-12 text-center">
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
      <h3 class="text-xl font-semibold text-text-primary mb-2">No Reports Found</h3>
      <p class="text-text-secondary">
        {{
          searchQuery
            ? 'Try adjusting your search criteria'
            : 'No reports match the selected filters'
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { type Report } from '@/data/mockData'
import ReportRow from './ReportRow.vue'

interface Props {
  reports: Report[]
}

interface Emits {
  updateStatus: [report: Report]
  viewDetails: [reportId: string]
}

const props = defineProps<Props>()
defineEmits<Emits>()

const searchQuery = ref('')

// Filter reports based on search
const filteredReports = computed(() => {
  if (!searchQuery.value) return props.reports

  const query = searchQuery.value.toLowerCase()
  return props.reports.filter(
    (report) =>
      report.title.toLowerCase().includes(query) ||
      report.description.toLowerCase().includes(query) ||
      report.location.toLowerCase().includes(query),
  )
})

const refreshData = () => {
  // In a real app, this would refresh data from the backend
  console.log('Refreshing data...')
}
</script>
