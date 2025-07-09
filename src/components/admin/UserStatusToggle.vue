<template>
  <div class="relative">
    <select
      :value="user.status"
      @change="handleStatusChange"
      class="clayinput bg-surface border text-text-primary px-3 py-1 rounded-lg text-sm appearance-none cursor-pointer pr-8 focus:outline-none focus:ring-2 focus:ring-primary/30"
      :class="getStatusClass(user.status)"
    >
      <option value="active">✅ Active</option>
      <option value="inactive">⏸️ Inactive</option>
      <option value="suspended">🚫 Suspended</option>
    </select>
    <div class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <svg class="w-3 h-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type User } from '@/data/mockData'

interface Props {
  user: User
}

interface Emits {
  statusChange: [status: User['status']]
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleStatusChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('statusChange', target.value as User['status'])
}

const getStatusClass = (status: User['status']) => {
  const statusClasses = {
    active: 'border-success/30 bg-success/5 text-success',
    inactive: 'border-border bg-muted/50 text-text-muted',
    suspended: 'border-error/30 bg-error/5 text-error',
  }
  return statusClasses[status] || ''
}
</script>
