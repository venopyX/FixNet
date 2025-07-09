<template>
  <div
    class="claycard bg-gradient-to-r from-secondary/5 via-accent/5 to-info/5 rounded-3xl p-8 relative overflow-hidden"
  >
    <!-- Background decoration -->
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-info/10 to-primary/10 rounded-full blur-3xl"
    ></div>

    <div class="relative z-10">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <!-- Agency Info -->
        <div>
          <div class="flex items-center gap-4 mb-4">
            <div
              class="claycard w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center"
            >
              <svg
                class="w-8 h-8 text-white"
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
            <div>
              <h1 class="text-3xl font-bold text-text-primary">
                {{ user?.agency || 'Agency Dashboard' }} 🏢
              </h1>
              <p class="text-text-secondary">
                Welcome back, {{ user?.first_name }}! Manage your assigned reports.
              </p>
            </div>
          </div>

          <!-- Agency Stats -->
          <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-secondary">{{ stats.total }}</div>
              <div class="text-xs text-text-secondary">Total</div>
            </div>
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-warning">{{ stats.pending }}</div>
              <div class="text-xs text-text-secondary">Pending</div>
            </div>
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-info">{{ stats.underReview }}</div>
              <div class="text-xs text-text-secondary">In Review</div>
            </div>
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-success">{{ stats.resolved }}</div>
              <div class="text-xs text-text-secondary">Resolved</div>
            </div>
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-error">{{ stats.highPriority }}</div>
              <div class="text-xs text-text-secondary">High Priority</div>
            </div>
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-accent">{{ stats.todayReports }}</div>
              <div class="text-xs text-text-secondary">Today</div>
            </div>
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-primary">{{ stats.categories }}</div>
              <div class="text-xs text-text-secondary">Categories</div>
            </div>
          </div>
        </div>

        <!-- User Actions -->
        <div class="flex flex-col sm:flex-row items-center gap-3">
          <div class="text-right">
            <div class="text-sm font-medium text-text-primary">
              {{ user?.first_name }} {{ user?.last_name }}
            </div>
            <div class="text-xs text-text-secondary">{{ user?.agency }}</div>
            <div class="text-xs text-text-muted">
              Last login: {{ formatLastLogin(user?.last_login) }}
            </div>
          </div>

          <div
            class="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center"
          >
            <span class="text-secondary font-bold text-lg">
              {{ getInitials(user?.first_name, user?.last_name) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/data/mockData'

interface Props {
  user: User | null
  stats: {
    total: number
    pending: number
    underReview: number
    resolved: number
    highPriority: number
    todayReports: number
    categories: number
  }
}

defineProps<Props>()

const getInitials = (firstName?: string, lastName?: string) => {
  if (!firstName || !lastName) return 'U'
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const formatLastLogin = (lastLogin?: string) => {
  if (!lastLogin) return 'Never'

  const date = new Date(lastLogin)
  const now = new Date()
  const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60)

  if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)}m ago`
  } else if (diffInMinutes < 24 * 60) {
    return `${Math.floor(diffInMinutes / 60)}h ago`
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }
}
</script>
