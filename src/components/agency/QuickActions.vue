<template>
  <div class="claycard bg-surface rounded-3xl p-6">
    <h3 class="text-lg font-semibold text-text-primary mb-6">Quick Actions</h3>

    <!-- Selection Info -->
    <div
      v-if="selectedReports.length > 0"
      class="claycard bg-accent/10 border border-accent/20 p-4 rounded-2xl mb-4"
    >
      <div class="flex items-center gap-2 text-accent">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="font-medium"
          >{{ selectedReports.length }} report{{
            selectedReports.length !== 1 ? 's' : ''
          }}
          selected</span
        >
      </div>
    </div>

    <div class="space-y-3">
      <!-- Bulk Status Updates -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-text-secondary">Bulk Status Updates</h4>

        <button
          @click="handleBulkAction('mark_under_review')"
          :disabled="selectedReports.length === 0"
          class="claybutton w-full flex items-center gap-3 p-3 rounded-2xl bg-background/50 border border-border/50 hover:bg-info/5 hover:border-info/20 text-text-secondary hover:text-info transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="font-medium">Mark Under Review</span>
        </button>

        <button
          @click="handleBulkAction('mark_resolved')"
          :disabled="selectedReports.length === 0"
          class="claybutton w-full flex items-center gap-3 p-3 rounded-2xl bg-background/50 border border-border/50 hover:bg-success/5 hover:border-success/20 text-text-secondary hover:text-success transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="font-medium">Mark Resolved</span>
        </button>

        <button
          @click="handleBulkAction('assign_to_me')"
          :disabled="selectedReports.length === 0"
          class="claybutton w-full flex items-center gap-3 p-3 rounded-2xl bg-background/50 border border-border/50 hover:bg-primary/5 hover:border-primary/20 text-text-secondary hover:text-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span class="font-medium">Assign to Me</span>
        </button>
      </div>

      <!-- Divider -->
      <div class="border-t border-border/50 my-4"></div>

      <!-- Quick Filters -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-text-secondary">Quick Filters</h4>

        <button
          @click="handleQuickFilter('high_priority')"
          class="claybutton w-full flex items-center gap-3 p-3 rounded-2xl bg-background/50 border border-border/50 hover:bg-error/5 hover:border-error/20 text-text-secondary hover:text-error transition-all duration-200"
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span class="font-medium">High Priority Only</span>
        </button>

        <button
          @click="handleQuickFilter('pending_today')"
          class="claybutton w-full flex items-center gap-3 p-3 rounded-2xl bg-background/50 border border-border/50 hover:bg-warning/5 hover:border-warning/20 text-text-secondary hover:text-warning transition-all duration-200"
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
              d="M8 7V3a4 4 0 118 0v4m-4 0v12m0-12h4a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
            />
          </svg>
          <span class="font-medium">Today's Reports</span>
        </button>

        <button
          @click="handleQuickFilter('needs_response')"
          class="claybutton w-full flex items-center gap-3 p-3 rounded-2xl bg-background/50 border border-border/50 hover:bg-secondary/5 hover:border-secondary/20 text-text-secondary hover:text-secondary transition-all duration-200"
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="font-medium">Needs Response</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  selectedReports: string[]
}

interface Emits {
  bulkAction: [action: string]
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleBulkAction = (action: string) => {
  emit('bulkAction', action)
}

const handleQuickFilter = (filter: string) => {
  emit('bulkAction', `filter_${filter}`)
}
</script>
