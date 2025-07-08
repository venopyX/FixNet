<template>
  <div class="min-h-screen bg-background py-20">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <!-- Back Button -->
        <BackButton @click="goBack" class="mb-6" />

        <!-- Report Not Found -->
        <div v-if="!report" class="claycard bg-surface rounded-3xl p-12 text-center">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-text-primary mb-2">Report Not Found</h1>
          <p class="text-text-secondary mb-6">
            The report you're looking for doesn't exist or may have been removed.
          </p>
          <router-link
            to="/"
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0h3m0 0h3m0 0a1 1 0 001-1V10M9 21v-6a1 1 0 011-1h2a1 1 0 011 1v6"
              />
            </svg>
            Go Home
          </router-link>
        </div>

        <!-- Report Details -->
        <div v-else class="space-y-8">
          <!-- Report Header -->
          <ReportHeader :report="report" :is-owner="isOwner" />

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Main Info -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Report Info -->
              <ReportInfo :report="report" />

              <!-- Report Description -->
              <ReportDescription :report="report" />

              <!-- Report Photo -->
              <ReportPhoto v-if="report.photo_url" :report="report" />
            </div>

            <!-- Right Column - Sidebar -->
            <div class="space-y-6">
              <!-- Reporter Info -->
              <ReporterInfo :report="report" />

              <!-- Status History -->
              <StatusHistory :report="report" />
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
import { mockReports, mockUsers } from '@/data/mockData'
import { currentUser } from '@/utils/auth'
import BackButton from '@/components/report-details/BackButton.vue'
import ReportHeader from '@/components/report-details/ReportHeader.vue'
import ReportInfo from '@/components/report-details/ReportInfo.vue'
import ReportDescription from '@/components/report-details/ReportDescription.vue'
import ReportPhoto from '@/components/report-details/ReportPhoto.vue'
import ReporterInfo from '@/components/report-details/ReporterInfo.vue'
import StatusHistory from '@/components/report-details/StatusHistory.vue'

interface Props {
  id: string
}

const props = defineProps<Props>()
const router = useRouter()

// Find the report
const report = computed(() => {
  return mockReports.find((r) => r.id === props.id)
})

// Check if current user owns this report
const isOwner = computed(() => {
  return !!(currentUser.value && report.value && currentUser.value.id === report.value.resident_id)
})

const goBack = () => {
  // Try to go back in history, fallback to dashboard or home
  if (window.history.length > 1) {
    router.go(-1)
  } else if (currentUser.value) {
    router.push('/dashboard')
  } else {
    router.push('/')
  }
}
</script>
