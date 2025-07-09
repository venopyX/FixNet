<template>
  <div class="flex flex-col sm:flex-row gap-3">
    <!-- Role Filter -->
    <div class="relative">
      <select
        v-model="localRole"
        class="clayinput bg-surface border border-border text-text-primary px-4 py-2 rounded-xl appearance-none cursor-pointer pr-10 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <option value="all">All Roles</option>
        <option value="resident">👤 Residents</option>
        <option value="agency_staff">🏢 Agency Staff</option>
        <option value="admin">👨‍💼 Admins</option>
        <option value="super_admin">⚡ Super Admins</option>
      </select>
      <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

    <!-- Status Filter -->
    <div class="relative">
      <select
        v-model="localStatus"
        class="clayinput bg-surface border border-border text-text-primary px-4 py-2 rounded-xl appearance-none cursor-pointer pr-10 min-w-[120px] focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <option value="all">All Status</option>
        <option value="active">✅ Active</option>
        <option value="inactive">⏸️ Inactive</option>
        <option value="suspended">🚫 Suspended</option>
      </select>
      <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

    <!-- Date Range Filter -->
    <div class="relative">
      <select
        v-model="localDateRange"
        class="clayinput bg-surface border border-border text-text-primary px-4 py-2 rounded-xl appearance-none cursor-pointer pr-10 min-w-[120px] focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>
      <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

    <!-- Clear Filters Button -->
    <button
      @click="$emit('clear')"
      class="claybutton inline-flex items-center gap-2 border border-border text-text-secondary bg-surface hover:bg-muted px-4 py-2 rounded-xl font-medium transition-all duration-200"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 4v5h5M20 20v-5h-5M13 3l4 4-4 4M11 21l-4-4 4-4"
        />
      </svg>
      Clear
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type RoleFilter = 'all' | 'resident' | 'agency_staff' | 'admin' | 'super_admin'
type StatusFilter = 'all' | 'active' | 'inactive' | 'suspended'
type DateRangeFilter = 'all' | 'today' | 'week' | 'month' | 'year'

interface Props {
  role: RoleFilter
  status: StatusFilter
  agency: string
  dateRange: DateRangeFilter
}

interface Emits {
  'update:role': [value: RoleFilter]
  'update:status': [value: StatusFilter]
  'update:agency': [value: string]
  'update:dateRange': [value: DateRangeFilter]
  clear: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localRole = computed({
  get: () => props.role,
  set: (value: RoleFilter) => emit('update:role', value),
})

const localStatus = computed({
  get: () => props.status,
  set: (value: StatusFilter) => emit('update:status', value),
})

const localDateRange = computed({
  get: () => props.dateRange,
  set: (value: DateRangeFilter) => emit('update:dateRange', value),
})
</script>
