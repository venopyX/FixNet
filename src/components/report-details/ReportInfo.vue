<template>
  <div class="claycard bg-surface rounded-3xl p-6">
    <h2 class="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
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
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Report Information
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Category -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-text-secondary">Category</label>
        <div class="claycard bg-accent/10 border border-accent/20 p-3 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
              <span class="text-lg">{{ getCategoryIcon(report.category) }}</span>
            </div>
            <span class="font-medium text-text-primary">{{
              getCategoryLabel(report.category)
            }}</span>
          </div>
        </div>
      </div>

      <!-- Priority -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-text-secondary">Priority Level</label>
        <div
          class="claycard p-3 rounded-xl"
          :class="{
            'bg-error/10 border border-error/20': report.priority === 'high',
            'bg-warning/10 border border-warning/20': report.priority === 'medium',
            'bg-info/10 border border-info/20': report.priority === 'low',
          }"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center"
              :class="{
                'bg-error/20': report.priority === 'high',
                'bg-warning/20': report.priority === 'medium',
                'bg-info/20': report.priority === 'low',
              }"
            >
              <div
                class="w-3 h-3 rounded-full"
                :class="{
                  'bg-error': report.priority === 'high',
                  'bg-warning': report.priority === 'medium',
                  'bg-info': report.priority === 'low',
                }"
              ></div>
            </div>
            <span class="font-medium text-text-primary capitalize"
              >{{ report.priority }} Priority</span
            >
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="md:col-span-2 space-y-2">
        <label class="text-sm font-medium text-text-secondary">Location</label>
        <div class="claycard bg-primary/5 border border-primary/20 p-4 rounded-xl">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mt-0.5">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-medium text-text-primary mb-2">{{ report.location }}</p>
              <div v-if="report.latitude && report.longitude" class="space-y-2">
                <div class="flex items-center gap-4 text-sm text-text-secondary">
                  <span>Lat: {{ report.latitude }}</span>
                  <span>Lng: {{ report.longitude }}</span>
                </div>
                <button
                  @click="openInMaps"
                  class="claybutton inline-flex items-center gap-2 text-primary hover:text-secondary text-sm font-medium px-3 py-1 rounded-lg hover:bg-primary/10 transition-all duration-200"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Open in Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="md:col-span-2">
        <label class="text-sm font-medium text-text-secondary mb-3 block">Timeline</label>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="claycard bg-info/5 border border-info/20 p-3 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-info/20 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-info"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-text-secondary">Created</p>
                <p class="font-medium text-text-primary">{{ formatDate(report.created_at) }}</p>
              </div>
            </div>
          </div>

          <div class="claycard bg-secondary/5 border border-secondary/20 p-3 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-secondary"
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
              </div>
              <div>
                <p class="text-xs text-text-secondary">Last Updated</p>
                <p class="font-medium text-text-primary">{{ formatDate(report.updated_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Report } from '@/data/mockData'

interface Props {
  report: Report
}

const props = defineProps<Props>()

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

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    roads: 'Roads & Infrastructure',
    electricity: 'Electrical Issues',
    water: 'Water & Plumbing',
    waste: 'Waste Management',
    safety: 'Public Safety',
    other: 'Other Issues',
  }
  return labels[category] || category
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

const openInMaps = () => {
  if (props.report.latitude && props.report.longitude) {
    const url = `https://www.google.com/maps?q=${props.report.latitude},${props.report.longitude}`
    window.open(url, '_blank')
  }
}
</script>
