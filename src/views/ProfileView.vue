<template>
  <div class="min-h-screen bg-background py-20">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Back Button -->
        <div class="mb-6">
          <button
            @click="goBack"
            class="claybutton inline-flex items-center gap-2 text-text-secondary bg-surface border border-border hover:bg-muted hover:text-text-primary hover:border-primary/30 px-4 py-2 rounded-xl font-medium transition-all duration-200"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back</span>
          </button>
        </div>

        <!-- Profile Not Found -->
        <div v-if="!user" class="claycard bg-surface rounded-3xl p-12 text-center">
          <div
            class="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-12 h-12 text-error"
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
          <h1 class="text-2xl font-bold text-text-primary mb-2">User Not Found</h1>
          <p class="text-text-secondary mb-6">
            The user profile you're looking for doesn't exist or has been removed.
          </p>
          <router-link
            to="/reports"
            class="claybutton inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-all duration-200"
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Browse Reports
          </router-link>
        </div>

        <!-- Profile Content -->
        <div v-else class="space-y-8">
          <!-- Profile Header -->
          <ProfileHeader :user="user" :stats="userStats" :is-own-profile="isOwnProfile" />

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Stats & Badges -->
            <div class="space-y-6">
              <!-- Profile Stats -->
              <ProfileStats v-if="userStats" :stats="userStats" />

              <!-- Profile Badges -->
              <ProfileBadges v-if="userStats" :badges="userBadges" :stats="userStats" />

              <!-- Profile Contact (if enabled) -->
              <ProfileContact v-if="isContactEnabled" :user="user" />
            </div>

            <!-- Right Column - Activity & Reports -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Profile Activity -->
              <ProfileActivity :activities="userActivities" />

              <!-- Profile Reports -->
              <ProfileReports :reports="userReports" :user="user" @view-report="viewReport" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { mockUsers, mockReports, mockStatusUpdates, type User } from '@/data/mockData'
import { currentUser } from '@/utils/auth'
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import ProfileStats from '@/components/profile/ProfileStats.vue'
import ProfileBadges from '@/components/profile/ProfileBadges.vue'
import ProfileContact from '@/components/profile/ProfileContact.vue'
import ProfileActivity from '@/components/profile/ProfileActivity.vue'
import ProfileReports from '@/components/profile/ProfileReports.vue'

interface Props {
  id: string
}

interface UserStats {
  totalReports: number
  resolved: number
  pending: number
  avgResponseTime: number
  impactScore: number
  joinDate: string
}

interface UserBadge {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

interface UserActivity {
  id: string
  type: string
  title: string
  description: string
  date: string
  icon: string
  color: string
  link: string
}

const props = defineProps<Props>()
const router = useRouter()

// Find the user
const user = computed(() => {
  return mockUsers.find((u) => u.id === props.id)
})

// Check if viewing own profile
const isOwnProfile = computed((): boolean => {
  return Boolean(currentUser.value && user.value && currentUser.value.id === user.value.id)
})

// Check if contact is enabled (handle undefined/null values)
const isContactEnabled = computed((): boolean => {
  return Boolean(user.value?.contact_enabled)
})

// Calculate user stats
const userStats = computed((): UserStats | null => {
  if (!user.value) return null

  const reports = mockReports.filter((r) => r.resident_id === user.value!.id)
  const resolved = reports.filter((r) => r.status === 'resolved').length
  const pending = reports.filter((r) => ['pending', 'under_review'].includes(r.status)).length

  // Calculate average response time for resolved reports
  const resolvedReports = reports.filter((r) => r.status === 'resolved')
  const avgResponseTime =
    resolvedReports.length > 0
      ? resolvedReports.reduce((acc, report) => {
          const created = new Date(report.created_at).getTime()
          const updated = new Date(report.updated_at).getTime()
          return acc + (updated - created) / (1000 * 60 * 60 * 24) // days
        }, 0) / resolvedReports.length
      : 0

  // Calculate community impact score
  const impactScore = resolved * 10 + reports.length * 2

  return {
    totalReports: reports.length,
    resolved,
    pending,
    avgResponseTime: Math.round(avgResponseTime * 10) / 10,
    impactScore,
    joinDate: user.value.created_at,
  }
})

// Get user's reports
const userReports = computed(() => {
  if (!user.value) return []
  return mockReports
    .filter((r) => r.resident_id === user.value!.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})

// Calculate user badges based on achievements
const userBadges = computed((): UserBadge[] => {
  if (!userStats.value) return []

  const badges: UserBadge[] = []

  // New Member Badge
  const joinDate = new Date(userStats.value.joinDate)
  const daysSinceJoin = (Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24)
  if (daysSinceJoin < 30) {
    badges.push({
      id: 'new-member',
      name: 'New Member',
      description: 'Welcome to the community!',
      icon: '👋',
      color: 'info',
    })
  }

  // Reporter Badges
  if (userStats.value.totalReports >= 1) {
    badges.push({
      id: 'first-report',
      name: 'First Reporter',
      description: 'Submitted your first report',
      icon: '📝',
      color: 'primary',
    })
  }

  if (userStats.value.totalReports >= 5) {
    badges.push({
      id: 'active-reporter',
      name: 'Active Reporter',
      description: 'Submitted 5+ reports',
      icon: '📊',
      color: 'secondary',
    })
  }

  if (userStats.value.totalReports >= 10) {
    badges.push({
      id: 'super-reporter',
      name: 'Super Reporter',
      description: 'Submitted 10+ reports',
      icon: '⭐',
      color: 'accent',
    })
  }

  // Impact Badges
  if (userStats.value.resolved >= 3) {
    badges.push({
      id: 'problem-solver',
      name: 'Problem Solver',
      description: '3+ issues resolved',
      icon: '🛠️',
      color: 'success',
    })
  }

  if (userStats.value.impactScore >= 50) {
    badges.push({
      id: 'community-champion',
      name: 'Community Champion',
      description: 'High community impact',
      icon: '🏆',
      color: 'warning',
    })
  }

  return badges
})

// Get user activities (recent reports and status updates)
const userActivities = computed((): UserActivity[] => {
  if (!user.value) return []

  const activities: UserActivity[] = []

  // Add recent reports
  const recentReports = userReports.value.slice(0, 5)
  recentReports.forEach((report) => {
    activities.push({
      id: `report-${report.id}`,
      type: 'report_created',
      title: 'Created a new report',
      description: report.title,
      date: report.created_at,
      icon: '📝',
      color: 'primary',
      link: `/report/${report.id}`,
    })
  })

  // Add status updates for user's reports
  const userReportIds = userReports.value.map((r) => r.id)
  const statusUpdates = mockStatusUpdates
    .filter((su) => userReportIds.includes(su.report_id))
    .slice(0, 5)

  statusUpdates.forEach((update) => {
    const report = userReports.value.find((r) => r.id === update.report_id)
    if (report) {
      activities.push({
        id: `status-${update.id}`,
        type: 'status_updated',
        title: `Report ${update.new_status.replace('_', ' ')}`,
        description: report.title,
        date: update.created_at,
        icon: update.new_status === 'resolved' ? '✅' : '🔄',
        color: update.new_status === 'resolved' ? 'success' : 'info',
        link: `/report/${report.id}`,
      })
    }
  })

  // Sort by date and return latest 10
  return activities
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
})

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/reports')
  }
}

const viewReport = (reportId: string) => {
  router.push(`/report/${reportId}`)
}
</script>
