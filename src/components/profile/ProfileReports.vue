<template>
  <div class="claycard bg-surface rounded-3xl p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-text-primary flex items-center gap-2">
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        {{ user.first_name }}'s Reports ({{ reports.length }})
      </h3>

      <!-- View Toggle -->
      <div class="claycard bg-background border border-border rounded-xl p-1 flex">
        <button
          @click="viewMode = 'recent'"
          class="claybutton px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
          :class="
            viewMode === 'recent'
              ? 'bg-primary text-white'
              : 'text-text-secondary hover:text-primary'
          "
        >
          Recent
        </button>
        <button
          @click="viewMode = 'resolved'"
          class="claybutton px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
          :class="
            viewMode === 'resolved'
              ? 'bg-primary text-white'
              : 'text-text-secondary hover:text-primary'
          "
        >
          Resolved
        </button>
      </div>
    </div>

    <div v-if="filteredReports.length > 0" class="space-y-4">
      <div
        v-for="report in displayedReports"
        :key="report.id"
        class="claycard group bg-background/50 hover:bg-primary/5 border border-border/50 hover:border-primary/20 p-4 rounded-2xl cursor-pointer transition-all duration-300"
        @click="$emit('viewReport', report.id)"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span class="text-sm">{{ getCategoryIcon(report.category) }}</span>
            </div>
            <div>
              <div class="text-xs text-text-muted">#{{ report.id }}</div>
              <div class="text-xs text-text-secondary">{{ formatDate(report.created_at) }}</div>
            </div>
          </div>
          <StatusBadge :status="report.status" />
        </div>

        <h4
          class="font-semibold text-text-primary group-hover:text-primary transition-colors mb-2 line-clamp-2"
        >
          {{ report.title }}
        </h4>

        <p class="text-sm text-text-secondary line-clamp-2 mb-3">
          {{ report.description }}
        </p>

        <div class="flex items-center justify-between pt-3 border-t border-border/30">
          <div class="flex items-center gap-2 text-xs text-text-muted">
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span class="truncate">{{ report.location }}</span>
          </div>

          <div class="flex items-center gap-1">
            <div
              class="w-2 h-2 rounded-full"
              :class="{
                'bg-error': report.priority === 'high',
                'bg-warning': report.priority === 'medium',
                'bg-info': report.priority === 'low',
              }"
            ></div>
            <span class="text-xs text-text-muted capitalize">{{ report.priority }}</span>
          </div>
        </div>
      </div>

      <!-- Show More Button -->
      <div v-if="filteredReports.length > displayLimit" class="text-center pt-4">
        <button
          @click="showMore"
          class="claybutton inline-flex items-center gap-2 text-primary hover:text-secondary bg-primary/5 hover:bg-primary/10 px-6 py-3 rounded-2xl font-medium transition-all duration-200"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          Show {{ Math.min(5, filteredReports.length - displayLimit) }} More
        </button>
      </div>
    </div>

    <!-- No Reports State -->
    <div v-else class="text-center py-8">
      <div class="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          class="w-8 h-8 text-text-muted"
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
      <h4 class="font-semibold text-text-primary mb-2">
        {{ viewMode === 'resolved' ? 'No Resolved Reports' : 'No Reports Yet' }}
      </h4>
      <p class="text-sm text-text-secondary">
        {{
          viewMode === 'resolved'
            ? `${user.first_name} hasn't had any reports resolved yet.`
            : `${user.first_name} hasn't submitted any reports yet.`
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Report, User } from '@/data/mockData'
import StatusBadge from '@/components/shared/StatusBadge.vue'

interface Props {
  reports: Report[]
  user: User
}

interface Emits {
  viewReport: [reportId: string]
}

defineProps<Props>()
defineEmits<Emits>()

const viewMode = ref<'recent' | 'resolved'>('recent')
const displayLimit = ref(5)

const filteredReports = computed(() => {
  const props = getCurrentInstance()?.props as Props
  if (viewMode.value === 'resolved') {
    return props.reports.filter((r) => r.status === 'resolved')
  }
  return props.reports
})

const displayedReports = computed(() => {
  return filteredReports.value.slice(0, displayLimit.value)
})

const showMore = () => {
  displayLimit.value += 5
}

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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Fix for Composition API
import { getCurrentInstance } from 'vue'
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
