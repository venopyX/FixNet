<template>
  <div class="claycard bg-surface rounded-3xl overflow-hidden">
    <!-- Table Header -->
    <div class="bg-background/50 p-6 border-b border-border/50">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-text-primary">
          Assigned Reports ({{ reports.length }})
        </h3>

        <div class="flex items-center gap-3">
          <!-- Select All -->
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              :checked="isAllSelected"
              @change="$emit('selectAll')"
              class="clayinput w-4 h-4 text-primary rounded border-border focus:ring-primary/30"
            />
            <span class="text-sm text-text-secondary">Select All</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Table Content -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-background/30 border-b border-border/50">
          <tr>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary w-12">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="$emit('selectAll')"
                class="clayinput w-4 h-4 text-primary rounded border-border focus:ring-primary/30"
              />
            </th>
            <th
              class="text-left px-6 py-4 text-sm font-medium text-text-secondary cursor-pointer hover:text-primary"
              @click="$emit('sort', 'title')"
            >
              <div class="flex items-center gap-1">
                Report
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 9l4-4 4 4M8 15l4 4 4-4"
                  />
                </svg>
              </div>
            </th>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary">Category</th>
            <th
              class="text-left px-6 py-4 text-sm font-medium text-text-secondary cursor-pointer hover:text-primary"
              @click="$emit('sort', 'priority')"
            >
              <div class="flex items-center gap-1">
                Priority
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 9l4-4 4 4M8 15l4 4 4-4"
                  />
                </svg>
              </div>
            </th>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary">Status</th>
            <th
              class="text-left px-6 py-4 text-sm font-medium text-text-secondary cursor-pointer hover:text-primary"
              @click="$emit('sort', 'created_at')"
            >
              <div class="flex items-center gap-1">
                Created
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 9l4-4 4 4M8 15l4 4 4-4"
                  />
                </svg>
              </div>
            </th>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border/30">
          <tr
            v-for="report in reports"
            :key="report.id"
            class="hover:bg-primary/5 transition-colors duration-200"
            :class="{ 'bg-primary/5': selectedReports.includes(report.id) }"
          >
            <!-- Checkbox -->
            <td class="px-6 py-4">
              <input
                type="checkbox"
                :checked="selectedReports.includes(report.id)"
                @change="$emit('selectReport', report.id)"
                class="clayinput w-4 h-4 text-primary rounded border-border focus:ring-primary/30"
              />
            </td>

            <!-- Report Info -->
            <td class="px-6 py-4">
              <div>
                <h4 class="font-medium text-text-primary line-clamp-1">{{ report.title }}</h4>
                <p class="text-sm text-text-secondary line-clamp-1">{{ report.location }}</p>
                <span class="text-xs text-text-muted">#{{ report.id }}</span>
              </div>
            </td>

            <!-- Category -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <span class="text-lg">{{ getCategoryIcon(report.category) }}</span>
                <span class="text-sm text-text-secondary capitalize">{{ report.category }}</span>
              </div>
            </td>

            <!-- Priority -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div
                  class="w-2 h-2 rounded-full"
                  :class="{
                    'bg-error': report.priority === 'high',
                    'bg-warning': report.priority === 'medium',
                    'bg-info': report.priority === 'low',
                  }"
                ></div>
                <span class="text-sm text-text-secondary capitalize">{{ report.priority }}</span>
              </div>
            </td>

            <!-- Status -->
            <td class="px-6 py-4">
              <select
                :value="report.status"
                @change="handleStatusChange(report.id, ($event.target as HTMLSelectElement).value)"
                class="clayinput bg-surface border text-text-primary px-3 py-1 rounded-lg text-sm appearance-none cursor-pointer pr-8 focus:outline-none focus:ring-2 focus:ring-primary/30"
                :class="getStatusClass(report.status)"
              >
                <option value="pending">⏳ Pending</option>
                <option value="under_review">🔄 Under Review</option>
                <option value="resolved">✅ Resolved</option>
                <option value="rejected">❌ Rejected</option>
              </select>
            </td>

            <!-- Created Date -->
            <td class="px-6 py-4">
              <span class="text-sm text-text-muted">{{ formatDate(report.created_at) }}</span>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <button
                  @click="$emit('viewReport', report.id)"
                  class="claybutton w-8 h-8 bg-info/10 hover:bg-info/20 text-info rounded-lg flex items-center justify-center transition-all duration-200"
                  title="View Details"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-if="reports.length === 0" class="p-12 text-center">
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
        No reports match your current filters or you haven't been assigned any reports yet.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Report } from '@/data/mockData'

interface Props {
  reports: Report[]
  selectedReports: string[]
  sortBy: keyof Report
  sortOrder: 'asc' | 'desc'
}

interface Emits {
  selectReport: [reportId: string]
  selectAll: []
  sort: [column: keyof Report]
  updateStatus: [reportId: string, status: Report['status']]
  viewReport: [reportId: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isAllSelected = computed(() => {
  return props.reports.length > 0 && props.selectedReports.length === props.reports.length
})

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

const getStatusClass = (status: Report['status']) => {
  const statusClasses = {
    pending: 'border-warning/30 bg-warning/5 text-warning',
    under_review: 'border-info/30 bg-info/5 text-info',
    resolved: 'border-success/30 bg-success/5 text-success',
    rejected: 'border-error/30 bg-error/5 text-error',
  }
  return statusClasses[status] || ''
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`
  } else if (diffInHours < 24 * 7) {
    return `${Math.floor(diffInHours / 24)}d ago`
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }
}

const handleStatusChange = (reportId: string, newStatus: string) => {
  emit('updateStatus', reportId, newStatus as Report['status'])
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
