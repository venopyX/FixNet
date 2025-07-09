<template>
  <tr class="hover:bg-background/30 transition-colors duration-200">
    <!-- Report Info -->
    <td class="px-6 py-4">
      <div class="flex items-start gap-3">
        <div
          v-if="report.photo_url && !imageLoaded"
          class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
        >
          <svg
            class="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <img
          v-if="report.photo_url"
          v-show="imageLoaded"
          :src="report.photo_url"
          loading="lazy"
          class="w-12 h-12 object-cover rounded-lg flex-shrink-0"
          @load="imageLoaded = true"
          @error="imageLoaded = true"
        />
        <div class="min-w-0 flex-1">
          <h4 class="font-medium text-text-primary truncate">{{ report.title }}</h4>
          <p class="text-sm text-text-secondary truncate mt-1">{{ report.location }}</p>
          <p class="text-xs text-text-muted mt-1">ID: #{{ report.id }}</p>
        </div>
      </div>
    </td>

    <!-- Category -->
    <td class="px-6 py-4">
      <div class="flex items-center gap-2">
        <span class="text-lg">{{ getCategoryIcon(report.category) }}</span>
        <span class="text-sm text-text-primary capitalize">{{ report.category }}</span>
      </div>
    </td>

    <!-- Priority -->
    <td class="px-6 py-4">
      <div class="flex items-center gap-2">
        <div
          class="w-3 h-3 rounded-full"
          :class="{
            'bg-error': report.priority === 'high',
            'bg-warning': report.priority === 'medium',
            'bg-info': report.priority === 'low',
          }"
        ></div>
        <span class="text-sm text-text-primary capitalize">{{ report.priority }}</span>
      </div>
    </td>

    <!-- Status -->
    <td class="px-6 py-4">
      <StatusBadge :status="report.status" />
    </td>

    <!-- Created -->
    <td class="px-6 py-4">
      <div class="text-sm">
        <div class="text-text-primary">{{ formatDate(report.created_at) }}</div>
        <div class="text-text-muted">{{ formatTime(report.created_at) }}</div>
      </div>
    </td>

    <!-- Actions -->
    <td class="px-6 py-4">
      <div class="flex items-center gap-2">
        <button
          @click="$emit('updateStatus')"
          class="claybutton inline-flex items-center gap-1 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Update
        </button>

        <button
          @click="$emit('viewDetails')"
          class="claybutton inline-flex items-center gap-1 border border-border text-text-secondary hover:bg-muted px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
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
          View
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Report } from '@/data/mockData'
import StatusBadge from '@/components/shared/StatusBadge.vue'

interface Props {
  report: Report
}

interface Emits {
  (e: 'updateStatus'): void
  (e: 'viewDetails'): void
}

defineProps<Props>()
defineEmits<Emits>()

const imageLoaded = ref(false) // Reactive state for image loading

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

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
