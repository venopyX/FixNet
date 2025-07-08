<template>
  <div class="min-h-screen bg-background py-20">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="inline-block mb-4">
            <span
              class="claycard bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
            >
              📝 Report an Issue
            </span>
          </div>
          <h1 class="text-4xl font-bold text-text-primary mb-4">Help Improve Your Community</h1>
          <p class="text-xl text-text-secondary max-w-2xl mx-auto">
            Report infrastructure issues in your area and help make your community better for
            everyone.
          </p>
        </div>

        <!-- Report Form -->
        <ReportFormCard @submit="handleSubmit" @cancel="handleCancel" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { mockReports, type Report } from '@/data/mockData'
import { currentUser } from '@/utils/auth'
import ReportFormCard from '@/components/report/ReportFormCard.vue'

const router = useRouter()

interface ReportFormData {
  title: string
  description: string
  category: 'roads' | 'electricity' | 'water' | 'waste' | 'safety' | 'other'
  location: string
  latitude?: number
  longitude?: number
  photo?: File
}

const handleSubmit = async (formData: ReportFormData) => {
  if (!currentUser.value) {
    router.push('/auth')
    return
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Create new report
  const newReport: Report = {
    id: String(mockReports.length + 1),
    resident_id: currentUser.value.id,
    title: formData.title,
    description: formData.description,
    category: formData.category,
    location: formData.location,
    latitude: formData.latitude,
    longitude: formData.longitude,
    photo_url: formData.photo
      ? 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
      : undefined,
    status: 'pending',
    priority: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // Add to mock data
  mockReports.unshift(newReport)

  // Redirect to dashboard
  router.push('/dashboard')
}

const handleCancel = () => {
  router.push('/dashboard')
}
</script>
