<template>
  <div class="min-h-screen bg-background py-20">
    <div class="container mx-auto px-6">
      <div class="max-w-7xl mx-auto space-y-8">
        <!-- Admin Header -->
        <AdminHeader />

        <!-- Filters Section -->
        <div class="claycard bg-surface rounded-3xl p-6">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl font-semibold text-text-primary mb-1">Community Reports</h2>
              <p class="text-text-secondary">Manage and respond to citizen reports</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <StatusFilter v-model="statusFilter" />
              <CategoryFilter v-model="categoryFilter" />
              <PriorityFilter v-model="priorityFilter" />
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div
            class="claycard bg-surface p-6 rounded-3xl text-center hover:scale-105 transition-all duration-300"
          >
            <div
              class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3"
            >
              <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="text-2xl font-bold text-text-primary mb-1">{{ adminStats.pending }}</div>
            <div class="text-text-secondary text-sm">Pending Review</div>
          </div>

          <div
            class="claycard bg-surface p-6 rounded-3xl text-center hover:scale-105 transition-all duration-300"
          >
            <div
              class="w-12 h-12 bg-info/10 rounded-2xl flex items-center justify-center mx-auto mb-3"
            >
              <svg class="w-6 h-6 text-info" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="text-2xl font-bold text-text-primary mb-1">
              {{ adminStats.underReview }}
            </div>
            <div class="text-text-secondary text-sm">Under Review</div>
          </div>

          <div
            class="claycard bg-surface p-6 rounded-3xl text-center hover:scale-105 transition-all duration-300"
          >
            <div
              class="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-3"
            >
              <svg class="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="text-2xl font-bold text-text-primary mb-1">{{ adminStats.resolved }}</div>
            <div class="text-text-secondary text-sm">Resolved</div>
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
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="text-2xl font-bold text-text-primary mb-1">{{ adminStats.total }}</div>
            <div class="text-text-secondary text-sm">Total Reports</div>
          </div>
        </div>

        <!-- Reports Table -->
        <ReportsTable
          :reports="filteredReports"
          @update-status="openStatusModal"
          @view-details="viewReportDetails"
        />

        <!-- Status Update Modal -->
        <StatusUpdateModal
          :show="showStatusModal"
          :report="selectedReport"
          @close="closeStatusModal"
          @updated="handleStatusUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { mockReports, mockStatusUpdates, type Report } from '@/data/mockData'
import { currentUser } from '@/utils/auth'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import StatusFilter from '@/components/admin/StatusFilter.vue'
import CategoryFilter from '@/components/admin/CategoryFilter.vue'
import PriorityFilter from '@/components/admin/PriorityFilter.vue'
import ReportsTable from '@/components/admin/ReportsTable.vue'
import StatusUpdateModal from '@/components/admin/StatusUpdateModal.vue'

const router = useRouter()

// Filters
const statusFilter = ref<'all' | 'pending' | 'under_review' | 'resolved' | 'rejected'>('all')
const categoryFilter = ref<
  'all' | 'roads' | 'electricity' | 'water' | 'waste' | 'safety' | 'other'
>('all')
const priorityFilter = ref<'all' | 'high' | 'medium' | 'low'>('all')

// Modal state
const showStatusModal = ref(false)
const selectedReport = ref<Report | null>(null)

// Calculate admin stats
const adminStats = computed(() => {
  const pending = mockReports.filter((r) => r.status === 'pending').length
  const underReview = mockReports.filter((r) => r.status === 'under_review').length
  const resolved = mockReports.filter((r) => r.status === 'resolved').length
  const total = mockReports.length

  return { pending, underReview, resolved, total }
})

// Filter reports
const filteredReports = computed(() => {
  let reports = [...mockReports]

  // Apply status filter
  if (statusFilter.value !== 'all') {
    reports = reports.filter((report) => report.status === statusFilter.value)
  }

  // Apply category filter
  if (categoryFilter.value !== 'all') {
    reports = reports.filter((report) => report.category === categoryFilter.value)
  }

  // Apply priority filter
  if (priorityFilter.value !== 'all') {
    reports = reports.filter((report) => report.priority === priorityFilter.value)
  }

  // Sort by created date (newest first)
  return reports.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})

const openStatusModal = (report: Report) => {
  selectedReport.value = report
  showStatusModal.value = true
}

const closeStatusModal = () => {
  showStatusModal.value = false
  selectedReport.value = null
}

const viewReportDetails = (reportId: string) => {
  router.push(`/report/${reportId}`)
}

const handleStatusUpdate = (updatedReport: Report) => {
  // In a real app, this would update the backend
  const index = mockReports.findIndex((r) => r.id === updatedReport.id)
  if (index !== -1) {
    mockReports[index] = updatedReport
  }
  closeStatusModal()
}
</script>
