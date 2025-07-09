<template>
    <div class="claycard bg-surface rounded-3xl p-6">
      <h3 class="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Recent Activity
      </h3>
      
      <div v-if="activities.length > 0" class="space-y-4">
        <div
          v-for="(activity, index) in activities"
          :key="activity.id"
          class="relative"
        >
          <!-- Timeline Line -->
          <div 
            v-if="index < activities.length - 1"
            class="absolute left-6 top-12 w-0.5 h-16 bg-border"
          ></div>
          
          <!-- Activity Item -->
          <div class="flex items-start gap-4">
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0"
              :class="getActivityColor(activity.color)"
            >
              {{ activity.icon }}
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                   @click="navigateTo(activity.link)"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-text-primary">{{ activity.title }}</h4>
                  <span class="text-xs text-text-muted">{{ formatDate(activity.date) }}</span>
                </div>
                <p class="text-sm text-text-secondary line-clamp-2">{{ activity.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- No Activity State -->
      <div v-else class="text-center py-8">
        <div class="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 class="font-semibold text-text-primary mb-2">No Recent Activity</h4>
        <p class="text-sm text-text-secondary">
          This user hasn't been active recently. Check back later for updates!
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  
  interface Activity {
    id: string
    type: string
    title: string
    description: string
    date: string
    icon: string
    color: string
    link?: string
  }
  
  interface Props {
    activities: Activity[]
  }
  
  defineProps<Props>()
  const router = useRouter()
  
  const getActivityColor = (color: string) => {
    const colors: Record<string, string> = {
      'primary': 'bg-primary/10 text-primary',
      'secondary': 'bg-secondary/10 text-secondary',
      'success': 'bg-success/10 text-success',
      'info': 'bg-info/10 text-info',
      'warning': 'bg-warning/10 text-warning'
    }
    return colors[color] || 'bg-muted text-text-muted'
  }
  
  const formatDate = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)}d ago`
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }
  
  const navigateTo = (link?: string) => {
    if (link) {
      router.push(link)
    }
  }
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