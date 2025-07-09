<template>
  <div class="claycard bg-surface rounded-3xl p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-text-primary">Assigned Categories Overview</h2>
      <span class="text-sm text-text-muted">{{ categories.length }} categories assigned</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="category in categories"
        :key="category"
        class="claycard bg-background/50 border border-border/50 p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300"
      >
        <div class="flex items-center gap-4 mb-4">
          <div
            class="w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center"
            :class="getCategoryGradient(category)"
          >
            <span class="text-2xl">{{ getCategoryIcon(category) }}</span>
          </div>
          <div>
            <h3 class="font-semibold text-text-primary capitalize">
              {{ formatCategory(category) }}
            </h3>
            <p class="text-sm text-text-secondary">{{ getCategoryDescription(category) }}</p>
          </div>
        </div>

        <!-- Category Stats -->
        <div class="grid grid-cols-3 gap-3">
          <div class="text-center">
            <div class="text-lg font-bold" :class="getStatusColor('total')">
              {{ getCategoryStats(category).total }}
            </div>
            <div class="text-xs text-text-muted">Total</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-bold" :class="getStatusColor('pending')">
              {{ getCategoryStats(category).pending }}
            </div>
            <div class="text-xs text-text-muted">Pending</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-bold" :class="getStatusColor('resolved')">
              {{ getCategoryStats(category).resolved }}
            </div>
            <div class="text-xs text-text-muted">Resolved</div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mt-4">
          <div class="flex justify-between text-xs text-text-muted mb-1">
            <span>Resolution Rate</span>
            <span>{{ getCategoryStats(category).resolutionRate }}%</span>
          </div>
          <div class="w-full bg-muted rounded-full h-2">
            <div
              class="bg-gradient-to-r from-success to-accent h-2 rounded-full transition-all duration-500"
              :style="{ width: `${getCategoryStats(category).resolutionRate}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="categories.length === 0" class="text-center py-12">
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-text-primary mb-2">No Categories Assigned</h3>
      <p class="text-text-secondary">
        Contact your administrator to get assigned to report categories.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Report } from '@/data/mockData'

interface Props {
  categories: string[]
  reports: Report[]
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

const getCategoryGradient = (category: string) => {
  const gradients: Record<string, string> = {
    roads: 'from-gray-400 to-gray-600',
    electricity: 'from-yellow-400 to-orange-500',
    water: 'from-blue-400 to-cyan-500',
    waste: 'from-green-400 to-emerald-500',
    safety: 'from-red-400 to-pink-500',
    other: 'from-purple-400 to-indigo-500',
  }
  return gradients[category] || 'from-gray-400 to-gray-600'
}

const formatCategory = (category: string) => {
  const formatted: Record<string, string> = {
    roads: 'Roads & Infrastructure',
    electricity: 'Electrical Systems',
    water: 'Water & Plumbing',
    waste: 'Waste Management',
    safety: 'Public Safety',
    other: 'Other Issues',
  }
  return formatted[category] || category
}

const getCategoryDescription = (category: string) => {
  const descriptions: Record<string, string> = {
    roads: 'Road maintenance and infrastructure',
    electricity: 'Power systems and electrical issues',
    water: 'Water supply and plumbing systems',
    waste: 'Garbage collection and disposal',
    safety: 'Public safety and security concerns',
    other: 'Miscellaneous community issues',
  }
  return descriptions[category] || 'Category reports and issues'
}

const getCategoryStats = (category: string) => {
  const categoryReports = props.reports.filter((r) => r.category === category)
  const total = categoryReports.length
  const pending = categoryReports.filter((r) =>
    ['pending', 'under_review'].includes(r.status),
  ).length
  const resolved = categoryReports.filter((r) => r.status === 'resolved').length
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0

  return { total, pending, resolved, resolutionRate }
}

const getStatusColor = (type: string) => {
  const colors: Record<string, string> = {
    total: 'text-primary',
    pending: 'text-warning',
    resolved: 'text-success',
  }
  return colors[type] || 'text-text-primary'
}
</script>
