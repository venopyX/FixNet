<template>
  <div class="relative">
    <select
      :value="user.role"
      @change="handleRoleChange"
      class="clayinput bg-surface border border-border text-text-primary px-3 py-1 rounded-lg text-sm appearance-none cursor-pointer pr-8 focus:outline-none focus:ring-2 focus:ring-primary/30"
      :class="getRoleClass(user.role)"
    >
      <option value="resident">👤 Resident</option>
      <option value="agency_staff">🏢 Agency Staff</option>
      <option value="admin">👨‍💼 Admin</option>
      <option value="super_admin">⚡ Super Admin</option>
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
  roleChange: [role: User['role']]
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleRoleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('roleChange', target.value as User['role'])
}

const getRoleClass = (role: User['role']) => {
  const roleClasses = {
    resident: 'border-info/30 bg-info/5 text-info',
    agency_staff: 'border-secondary/30 bg-secondary/5 text-secondary',
    admin: 'border-accent/30 bg-accent/5 text-accent',
    super_admin: 'border-warning/30 bg-warning/5 text-warning',
  }
  return roleClasses[role] || ''
}
</script>
