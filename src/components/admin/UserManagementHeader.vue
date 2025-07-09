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
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div
              class="claycard w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-text-primary">User Management 👥</h1>
              <p class="text-text-secondary">Manage system users, roles, and permissions</p>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-primary">{{ stats.total }}</div>
              <div class="text-xs text-text-secondary">Total Users</div>
            </div>
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-info">{{ stats.residents }}</div>
              <div class="text-xs text-text-secondary">Residents</div>
            </div>
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-secondary">{{ stats.staff }}</div>
              <div class="text-xs text-text-secondary">Agency Staff</div>
            </div>
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-accent">{{ stats.admins }}</div>
              <div class="text-xs text-text-secondary">Admins</div>
            </div>
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-success">{{ stats.active }}</div>
              <div class="text-xs text-text-secondary">Active</div>
            </div>
            <div class="claycard bg-surface/80 p-3 rounded-2xl text-center">
              <div class="text-lg font-bold text-warning">{{ stats.suspended }}</div>
              <div class="text-xs text-text-secondary">Suspended</div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row items-center gap-3">
          <!-- Bulk Actions (if users selected) -->
          <div v-if="selectedUsers.length > 0" class="flex items-center gap-2">
            <span class="text-sm text-text-secondary">{{ selectedUsers.length }} selected</span>
            <UserBulkActions
              :selected-count="selectedUsers.length"
              @action="$emit('bulkAction', $event)"
            />
          </div>

          <!-- Export Button -->
          <UserExport @export="$emit('export', $event)" />

          <!-- Add User Button -->
          <button
            @click="$emit('addUser')"
            class="claybutton inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-all duration-200"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserBulkActions from './UserBulkActions.vue'
import UserExport from './UserExport.vue'

interface Props {
  stats: {
    total: number
    residents: number
    staff: number
    admins: number
    active: number
    suspended: number
  }
  selectedUsers: string[]
}

interface Emits {
  addUser: []
  bulkAction: [action: string]
  export: [format: string]
}

defineProps<Props>()
defineEmits<Emits>()
</script>
