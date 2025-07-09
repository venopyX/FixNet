<template>
  <tr class="hover:bg-primary/5 transition-colors duration-200">
    <!-- Checkbox -->
    <td class="px-6 py-4">
      <input
        type="checkbox"
        :checked="selected"
        @change="$emit('select')"
        class="clayinput w-4 h-4 text-primary rounded border-border focus:ring-primary/30"
      />
    </td>

    <!-- User Info -->
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
        >
          <span class="text-primary font-semibold text-sm">
            {{ getInitials(user.first_name, user.last_name) }}
          </span>
        </div>
        <div>
          <div class="font-medium text-text-primary">
            {{ user.first_name }} {{ user.last_name }}
          </div>
          <div class="text-sm text-text-secondary">{{ user.email }}</div>
        </div>
      </div>
    </td>

    <!-- Role -->
    <td class="px-6 py-4">
      <UserRoleSelector :user="user" @role-change="handleRoleChange" />
    </td>

    <!-- Agency -->
    <td class="px-6 py-4">
      <span class="text-text-secondary text-sm">{{ user.agency || '—' }}</span>
    </td>

    <!-- Status -->
    <td class="px-6 py-4">
      <UserStatusToggle :user="user" @status-change="handleStatusChange" />
    </td>

    <!-- Last Login -->
    <td class="px-6 py-4">
      <span class="text-text-muted text-sm">{{ formatLastLogin(user.last_login) }}</span>
    </td>

    <!-- Actions -->
    <td class="px-6 py-4">
      <div class="flex items-center gap-2">
        <button
          @click="$emit('viewProfile')"
          class="claybutton w-8 h-8 bg-info/10 hover:bg-info/20 text-info rounded-lg flex items-center justify-center transition-all duration-200"
          title="View Profile"
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>

        <button
          @click="$emit('edit')"
          class="claybutton w-8 h-8 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg flex items-center justify-center transition-all duration-200"
          title="Edit User"
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
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { type User } from '@/data/mockData'
import UserRoleSelector from './UserRoleSelector.vue'
import UserStatusToggle from './UserStatusToggle.vue'

interface Props {
  user: User
  selected: boolean
}

interface Emits {
  select: []
  edit: []
  viewProfile: []
  toggleStatus: [status: User['status']]
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const formatLastLogin = (lastLogin?: string) => {
  if (!lastLogin) return 'Never'

  const date = new Date(lastLogin)
  const now = new Date()
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
      day: 'numeric',
    })
  }
}

const handleRoleChange = (newRole: User['role']) => {
  // Handle role change if needed
  console.log('Role changed to:', newRole)
}

const handleStatusChange = (newStatus: User['status']) => {
  emit('toggleStatus', newStatus)
}
</script>
