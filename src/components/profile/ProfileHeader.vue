<template>
  <div
    class="claycard bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl p-8 relative overflow-hidden"
  >
    <!-- Background decoration -->
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-info/10 rounded-full blur-3xl"
    ></div>

    <div class="relative z-10">
      <div class="flex flex-col lg:flex-row lg:items-center gap-8">
        <!-- User Avatar & Info -->
        <div class="flex items-center gap-6">
          <!-- Avatar -->
          <div
            class="claycard w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <span class="text-3xl font-bold text-primary">
              {{ getInitials(user.first_name, user.last_name) }}
            </span>
          </div>

          <!-- User Details -->
          <div>
            <h1 class="text-3xl font-bold text-text-primary mb-2">
              {{ user.first_name }} {{ user.last_name }}
            </h1>

            <div class="flex flex-wrap items-center gap-4 text-sm">
              <div class="claycard bg-surface/80 px-3 py-2 rounded-xl flex items-center gap-2">
                <div class="w-2 h-2 bg-success rounded-full"></div>
                <span class="text-text-secondary capitalize">{{ user.role }}</span>
              </div>

              <div class="claycard bg-surface/80 px-3 py-2 rounded-xl flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-accent"
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
                <span class="text-text-secondary"
                  >Joined {{ formatJoinDate(stats?.joinDate) }}</span
                >
              </div>

              <div
                v-if="stats?.impactScore"
                class="claycard bg-surface/80 px-3 py-2 rounded-xl flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-warning"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <span class="text-text-secondary">{{ stats.impactScore }} impact points</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Actions -->
        <div class="flex-1 flex justify-end">
          <div class="flex items-center gap-3">
            <button
              v-if="isOwnProfile"
              class="claybutton inline-flex items-center gap-2 border border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-xl font-medium transition-all duration-200"
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
              Edit Profile
            </button>

            <button
              class="claybutton inline-flex items-center gap-2 border border-border text-text-secondary bg-surface hover:bg-muted px-4 py-2 rounded-xl font-medium transition-all duration-200"
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
              Share Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/data/mockData'

interface Props {
  user: User
  stats: {
    totalReports: number
    resolved: number
    pending: number
    avgResponseTime: number
    impactScore: number
    joinDate: string
  } | null
  isOwnProfile: boolean
}

defineProps<Props>()

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const formatJoinDate = (dateString?: string) => {
  if (!dateString) return 'Recently'

  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}
</script>
