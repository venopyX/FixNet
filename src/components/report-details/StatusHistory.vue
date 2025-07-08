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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Status History
    </h3>

    <div class="space-y-4">
      <!-- Current Status -->
      <div class="claycard bg-primary/5 border border-primary/20 p-4 rounded-xl">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mt-1">
            <div class="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <StatusBadge :status="report.status" />
              <span class="text-xs text-text-muted">Current Status</span>
            </div>
            <p class="text-sm text-text-secondary">
              {{ getStatusDescription(report.status) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Status Updates -->
      <div v-if="statusUpdates.length > 0" class="space-y-3">
        <div v-for="(update, index) in statusUpdates" :key="update.id" class="relative">
          <!-- Timeline Line -->
          <div
            v-if="index < statusUpdates.length - 1"
            class="absolute left-4 top-8 w-0.5 h-16 bg-border"
          ></div>

          <!-- Update Item -->
          <div class="flex items-start gap-3">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center mt-1"
              :class="getStatusColor(update.new_status)"
            >
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <div class="flex-1 min-w-0">
              <div class="claycard bg-background/50 border border-border/50 p-3 rounded-xl">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-sm font-medium text-text-primary">
                    Status changed to {{ formatStatusName(update.new_status) }}
                  </span>
                  <span class="text-xs text-text-muted">
                    {{ formatDate(update.created_at) }}
                  </span>
                </div>

                <div v-if="update.updated_by" class="flex items-center gap-2 mb-2">
                  <div class="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg
                      class="w-3 h-3 text-primary"
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
                  </div>
                  <span class="text-xs text-text-secondary">by {{ update.updated_by }}</span>
                </div>

                <p
                  v-if="update.admin_comment"
                  class="text-sm text-text-primary bg-surface/80 p-2 rounded-lg border border-border/30"
                >
                  {{ update.admin_comment }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Report Created -->
      <div class="relative">
        <div
          v-if="statusUpdates.length > 0"
          class="absolute left-4 top-8 w-0.5 h-4 bg-border"
        ></div>

        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-info rounded-full flex items-center justify-center mt-1">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div class="flex-1">
            <div class="claycard bg-background/50 border border-border/50 p-3 rounded-xl">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-medium text-text-primary">Report Created</span>
                <span class="text-xs text-text-muted">{{ formatDate(report.created_at) }}</span>
              </div>
              <p class="text-sm text-text-secondary">
                Report submitted and assigned ID #{{ report.id }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Report, mockStatusUpdates } from '@/data/mockData'
import StatusBadge from '@/components/shared/StatusBadge.vue'

interface Props {
  report: Report
}

const props = defineProps<Props>()

// Get status updates for this report
const statusUpdates = computed(() => {
  return mockStatusUpdates
    .filter((update) => update.report_id === props.report.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-warning',
    under_review: 'bg-info',
    resolved: 'bg-success',
    rejected: 'bg-error',
  }
  return colors[status] || 'bg-gray-500'
}

const getStatusDescription = (status: string) => {
  const descriptions: Record<string, string> = {
    pending: 'Your report has been received and is waiting for review by the relevant department.',
    under_review: 'The agency is currently reviewing your report and assessing the situation.',
    resolved: 'The reported issue has been successfully addressed and resolved.',
    rejected: 'The report has been reviewed but cannot be processed at this time.',
  }
  return descriptions[status] || 'Status information unavailable.'
}

const formatStatusName = (status: string) => {
  return status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
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
