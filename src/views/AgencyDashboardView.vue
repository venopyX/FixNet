<template>
  <div class="min-h-screen bg-background py-20">
    <div class="container mx-auto px-6">
      <div class="max-w-7xl mx-auto space-y-8">
        <!-- Agency Header -->
        <AgencyHeader :user="currentUser" :stats="agencyStats" />

        <!-- Category Reports Overview -->
        <CategoryReportsOverview :categories="assignedCategories" :reports="assignedReports" />

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Filters and Quick Actions -->
          <div class="space-y-6">
            <!-- Category Filters -->
            <CategoryFilters
              :categories="assignedCategories"
              v-model:selectedCategory="selectedCategory"
              v-model:selectedStatus="selectedStatus"
              v-model:selectedPriority="selectedPriority"
              @clear="clearFilters"
            />

            <!-- Quick Actions -->
            <QuickActions :selected-reports="selectedReports" @bulk-action="handleBulkAction" />

            <!-- Agency Notifications -->
            <AgencyNotifications
              :notifications="agencyNotifications"
              @mark-read="markNotificationRead"
            />
          </div>

          <!-- Reports Table -->
          <div class="lg:col-span-3">
            <AssignedReportsTable
              :reports="filteredReports"
              :selected-reports="selectedReports"
              :sort-by="sortBy"
              :sort-order="sortOrder"
              @select-report="toggleReportSelection"
              @select-all="toggleSelectAll"
              @sort="handleSort"
              @update-status="updateReportStatus"
              @view-report="viewReport"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { mockReports, mockStatusUpdates, type Report } from '@/data/mockData'
import { currentUser } from '@/utils/auth'
import AgencyHeader from '@/components/agency/AgencyHeader.vue'
import CategoryReportsOverview from '@/components/agency/CategoryReportsOverview.vue'
import CategoryFilters from '@/components/agency/CategoryFilters.vue'
import QuickActions from '@/components/agency/QuickActions.vue'
import AgencyNotifications from '@/components/agency/AgencyNotifications.vue'
import AssignedReportsTable from '@/components/agency/AssignedReportsTable.vue'

const router = useRouter()

// Check agency staff access
if (!currentUser.value || currentUser.value.role !== 'agency_staff') {
  router.push('/auth')
}

// State
const selectedCategory = ref<string>('all')
const selectedStatus = ref<string>('all')
const selectedPriority = ref<string>('all')
const selectedReports = ref<string[]>([])
const sortBy = ref<keyof Report>('created_at')
const sortOrder = ref<'asc' | 'desc'>('desc')

// Get assigned categories for current user
const assignedCategories = computed(() => {
  return currentUser.value?.assigned_categories || []
})

// Filter reports by assigned categories
const assignedReports = computed(() => {
  return mockReports.filter((report) => assignedCategories.value.includes(report.category))
})

// Calculate agency stats
const agencyStats = computed(() => {
  const total = assignedReports.value.length
  const pending = assignedReports.value.filter((r) => r.status === 'pending').length
  const underReview = assignedReports.value.filter((r) => r.status === 'under_review').length
  const resolved = assignedReports.value.filter((r) => r.status === 'resolved').length
  const highPriority = assignedReports.value.filter((r) => r.priority === 'high').length

  // Calculate today's reports
  const today = new Date().toISOString().split('T')[0]
  const todayReports = assignedReports.value.filter((r) => r.created_at.startsWith(today)).length

  return {
    total,
    pending,
    underReview,
    resolved,
    highPriority,
    todayReports,
    categories: assignedCategories.value.length,
  }
})

// Helper function for safe comparison
const safeCompare = (a: any, b: any, sortOrder: 'asc' | 'desc'): number => {
  // Handle null/undefined values
  if (a == null && b == null) return 0
  if (a == null) return sortOrder === 'asc' ? -1 : 1
  if (b == null) return sortOrder === 'asc' ? 1 : -1

  // Convert to strings for comparison if needed
  const aVal = typeof a === 'string' ? a : String(a)
  const bVal = typeof b === 'string' ? b : String(b)

  if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
  if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
  return 0
}

// Apply filters to assigned reports
const filteredReports = computed(() => {
  let reports = [...assignedReports.value]

  // Apply category filter
  if (selectedCategory.value !== 'all') {
    reports = reports.filter((report) => report.category === selectedCategory.value)
  }

  // Apply status filter
  if (selectedStatus.value !== 'all') {
    reports = reports.filter((report) => report.status === selectedStatus.value)
  }

  // Apply priority filter
  if (selectedPriority.value !== 'all') {
    reports = reports.filter((report) => report.priority === selectedPriority.value)
  }

  // Apply sorting with null-safe comparison
  reports.sort((a, b) => {
    const aValue = a[sortBy.value]
    const bValue = b[sortBy.value]
    return safeCompare(aValue, bValue, sortOrder.value)
  })

  return reports
})

// Generate agency notifications
const agencyNotifications = computed(() => {
  const notifications = []

  // New reports notifications
  const newReports = assignedReports.value.filter((r) => r.status === 'pending').slice(0, 3)
  newReports.forEach((report) => {
    notifications.push({
      id: `new-${report.id}`,
      type: 'new_report',
      title: 'New Report Assigned',
      message: `${report.title} in ${report.category}`,
      time: report.created_at,
      read: false,
      reportId: report.id,
    })
  })

  // High priority notifications
  const highPriorityReports = assignedReports.value
    .filter((r) => r.priority === 'high' && r.status !== 'resolved')
    .slice(0, 2)
  highPriorityReports.forEach((report) => {
    notifications.push({
      id: `priority-${report.id}`,
      type: 'high_priority',
      title: 'High Priority Report',
      message: `Urgent: ${report.title}`,
      time: report.created_at,
      read: false,
      reportId: report.id,
    })
  })

  return notifications
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5)
})

// Clear all filters
const clearFilters = () => {
  selectedCategory.value = 'all'
  selectedStatus.value = 'all'
  selectedPriority.value = 'all'
  selectedReports.value = []
}

// Handle sorting
const handleSort = (column: keyof Report) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortOrder.value = 'asc'
  }
}

// Handle report selection
const toggleReportSelection = (reportId: string) => {
  const index = selectedReports.value.indexOf(reportId)
  if (index > -1) {
    selectedReports.value.splice(index, 1)
  } else {
    selectedReports.value.push(reportId)
  }
}

const toggleSelectAll = () => {
  if (selectedReports.value.length === filteredReports.value.length) {
    selectedReports.value = []
  } else {
    selectedReports.value = filteredReports.value.map((r) => r.id)
  }
}

// Handle bulk actions
const handleBulkAction = (action: string) => {
  console.log('Bulk action:', action, 'for reports:', selectedReports.value)
  // Implement bulk actions here
  selectedReports.value = []
}

// Update report status
const updateReportStatus = (reportId: string, newStatus: Report['status']) => {
  const report = mockReports.find((r) => r.id === reportId)
  if (report) {
    const oldStatus = report.status
    report.status = newStatus
    report.updated_at = new Date().toISOString()

    // Add status update record
    mockStatusUpdates.push({
      id: String(mockStatusUpdates.length + 1),
      report_id: reportId,
      admin_id: currentUser.value?.id || '',
      previous_status: oldStatus,
      new_status: newStatus,
      admin_comment: `Status updated by ${currentUser.value?.first_name} ${currentUser.value?.last_name}`,
      updated_by: `${currentUser.value?.first_name} ${currentUser.value?.last_name}`,
      is_public: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }
}

// View report details
const viewReport = (reportId: string) => {
  router.push(`/report/${reportId}`)
}

// Mark notification as read
const markNotificationRead = (notificationId: string) => {
  // Implementation for marking notifications as read
  console.log('Mark notification as read:', notificationId)
}

// Clear selections when filters change
watch([selectedCategory, selectedStatus, selectedPriority], () => {
  selectedReports.value = []
})
</script>
