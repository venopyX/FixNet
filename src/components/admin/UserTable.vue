<template>
  <div class="claycard bg-surface rounded-3xl overflow-hidden">
    <!-- Table Header -->
    <div class="bg-background/50 p-6 border-b border-border/50">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-text-primary">Users ({{ users.length }})</h3>

        <div class="flex items-center gap-3">
          <!-- Select All -->
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              :checked="isAllSelected"
              @change="$emit('selectAll')"
              class="clayinput w-4 h-4 text-primary rounded border-border focus:ring-primary/30"
            />
            <span class="text-sm text-text-secondary">Select All</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Table Content -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-background/30 border-b border-border/50">
          <tr>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary w-12">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="$emit('selectAll')"
                class="clayinput w-4 h-4 text-primary rounded border-border focus:ring-primary/30"
              />
            </th>
            <th
              class="text-left px-6 py-4 text-sm font-medium text-text-secondary cursor-pointer hover:text-primary"
              @click="$emit('sort', 'first_name')"
            >
              <div class="flex items-center gap-1">
                User
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
                    d="M8 9l4-4 4 4M8 15l4 4 4-4"
                  />
                </svg>
              </div>
            </th>
            <th
              class="text-left px-6 py-4 text-sm font-medium text-text-secondary cursor-pointer hover:text-primary"
              @click="$emit('sort', 'role')"
            >
              <div class="flex items-center gap-1">
                Role
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
                    d="M8 9l4-4 4 4M8 15l4 4 4-4"
                  />
                </svg>
              </div>
            </th>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary">Agency</th>
            <th
              class="text-left px-6 py-4 text-sm font-medium text-text-secondary cursor-pointer hover:text-primary"
              @click="$emit('sort', 'status')"
            >
              <div class="flex items-center gap-1">
                Status
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
                    d="M8 9l4-4 4 4M8 15l4 4 4-4"
                  />
                </svg>
              </div>
            </th>
            <th
              class="text-left px-6 py-4 text-sm font-medium text-text-secondary cursor-pointer hover:text-primary"
              @click="$emit('sort', 'last_login')"
            >
              <div class="flex items-center gap-1">
                Last Login
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
                    d="M8 9l4-4 4 4M8 15l4 4 4-4"
                  />
                </svg>
              </div>
            </th>
            <th class="text-left px-6 py-4 text-sm font-medium text-text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border/30">
          <UserRow
            v-for="user in users"
            :key="user.id"
            :user="user"
            :selected="selectedUsers.includes(user.id)"
            @select="$emit('selectUser', user.id)"
            @edit="$emit('editUser', user)"
            @view-profile="$emit('viewProfile', user.id)"
            @toggle-status="$emit('toggleStatus', user.id, $event)"
          />
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-if="users.length === 0" class="p-12 text-center">
      <div class="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          class="w-12 h-12 text-text-muted"
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
      <h3 class="text-xl font-semibold text-text-primary mb-2">No Users Found</h3>
      <p class="text-text-secondary">
        Try adjusting your search criteria or filters to find users.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type User } from '@/data/mockData'
import UserRow from './UserRow.vue'

interface Props {
  users: User[]
  selectedUsers: string[]
  sortBy: keyof User
  sortOrder: 'asc' | 'desc'
}

interface Emits {
  selectUser: [userId: string]
  selectAll: []
  sort: [column: keyof User]
  editUser: [user: User]
  viewProfile: [userId: string]
  toggleStatus: [userId: string, status: User['status']]
}

const props = defineProps<Props>()
defineEmits<Emits>()

const isAllSelected = computed(() => {
  return props.users.length > 0 && props.selectedUsers.length === props.users.length
})
</script>
