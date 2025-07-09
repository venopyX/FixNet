<template>
  <div class="claycard bg-surface rounded-3xl p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-text-primary">Notifications</h3>
      <span class="claycard bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
        {{ unreadCount }}
      </span>
    </div>

    <div v-if="notifications.length > 0" class="space-y-3">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl hover:bg-primary/5 transition-all duration-200 cursor-pointer"
        :class="{ 'border-primary/20 bg-primary/5': !notification.read }"
        @click="handleNotificationClick(notification)"
      >
        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="getNotificationStyle(notification.type)"
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
                :d="getNotificationIcon(notification.type)"
              />
            </svg>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-medium text-text-primary text-sm">{{ notification.title }}</h4>
              <div v-if="!notification.read" class="w-2 h-2 bg-primary rounded-full"></div>
            </div>
            <p class="text-sm text-text-secondary line-clamp-2">{{ notification.message }}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs text-text-muted">{{ formatTime(notification.time) }}</span>
              <button
                v-if="!notification.read"
                @click.stop="markAsRead(notification.id)"
                class="text-xs text-primary hover:text-secondary font-medium"
              >
                Mark read
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
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
            d="M15 17h5l-5 5v-5zM4.828 4.828A4 4 0 017.05 4h9.9A4 4 0 0120 8v8a4 4 0 01-4 4H7.05a4 4 0 01-2.222-.635L4.828 19.172z"
          />
        </svg>
      </div>
      <h4 class="font-semibold text-text-primary mb-2">No Notifications</h4>
      <p class="text-sm text-text-secondary">
        You're all caught up! New notifications will appear here.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  time: string
  read: boolean
  reportId?: string
}

interface Props {
  notifications: Notification[]
}

interface Emits {
  markRead: [notificationId: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const unreadCount = computed(() => {
  return props.notifications.filter((n) => !n.read).length
})

const getNotificationStyle = (type: string) => {
  const styles: Record<string, string> = {
    new_report: 'bg-primary/10 text-primary',
    high_priority: 'bg-error/10 text-error',
    status_update: 'bg-success/10 text-success',
    assignment: 'bg-info/10 text-info',
  }
  return styles[type] || 'bg-muted text-text-muted'
}

const getNotificationIcon = (type: string) => {
  const icons: Record<string, string> = {
    new_report:
      'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    high_priority:
      'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    status_update: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    assignment: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  }
  return icons[type] || 'M15 17h5l-5 5v-5z'
}

const formatTime = (timeString: string) => {
  const date = new Date(timeString)
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

const handleNotificationClick = (notification: Notification) => {
  if (notification.reportId) {
    // Navigate to report details
    window.location.href = `/report/${notification.reportId}`
  }

  if (!notification.read) {
    markAsRead(notification.id)
  }
}

const markAsRead = (notificationId: string) => {
  emit('markRead', notificationId)
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
