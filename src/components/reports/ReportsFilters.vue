<template>
  <div class="space-y-6">
    <div class="claycard bg-surface rounded-3xl p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-text-primary">Filters</h3>
        <button
          @click="$emit('clear')"
          class="text-primary hover:text-secondary text-sm font-medium"
        >
          Clear All
        </button>
      </div>

      <div class="space-y-6">
        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-text-secondary mb-3">Status</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="radio" :value="'all'" v-model="localStatus" class="sr-only" />
              <div
                class="claybutton flex items-center gap-3 w-full p-3 rounded-xl cursor-pointer transition-all duration-200"
                :class="
                  localStatus === 'all'
                    ? 'bg-primary/10 border border-primary/20 text-primary'
                    : 'bg-background hover:bg-muted text-text-secondary'
                "
              >
                <div
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  :class="localStatus === 'all' ? 'border-primary' : 'border-border'"
                >
                  <div v-if="localStatus === 'all'" class="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span class="font-medium">All Status</span>
              </div>
            </label>

            <label class="flex items-center">
              <input type="radio" :value="'pending'" v-model="localStatus" class="sr-only" />
              <div
                class="claybutton flex items-center gap-3 w-full p-3 rounded-xl cursor-pointer transition-all duration-200"
                :class="
                  localStatus === 'pending'
                    ? 'bg-warning/10 border border-warning/20 text-warning'
                    : 'bg-background hover:bg-muted text-text-secondary'
                "
              >
                <div
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  :class="localStatus === 'pending' ? 'border-warning' : 'border-border'"
                >
                  <div
                    v-if="localStatus === 'pending'"
                    class="w-2 h-2 bg-warning rounded-full"
                  ></div>
                </div>
                <span class="font-medium">Pending</span>
              </div>
            </label>

            <label class="flex items-center">
              <input type="radio" :value="'under_review'" v-model="localStatus" class="sr-only" />
              <div
                class="claybutton flex items-center gap-3 w-full p-3 rounded-xl cursor-pointer transition-all duration-200"
                :class="
                  localStatus === 'under_review'
                    ? 'bg-info/10 border border-info/20 text-info'
                    : 'bg-background hover:bg-muted text-text-secondary'
                "
              >
                <div
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  :class="localStatus === 'under_review' ? 'border-info' : 'border-border'"
                >
                  <div
                    v-if="localStatus === 'under_review'"
                    class="w-2 h-2 bg-info rounded-full"
                  ></div>
                </div>
                <span class="font-medium">Under Review</span>
              </div>
            </label>

            <label class="flex items-center">
              <input type="radio" :value="'resolved'" v-model="localStatus" class="sr-only" />
              <div
                class="claybutton flex items-center gap-3 w-full p-3 rounded-xl cursor-pointer transition-all duration-200"
                :class="
                  localStatus === 'resolved'
                    ? 'bg-success/10 border border-success/20 text-success'
                    : 'bg-background hover:bg-muted text-text-secondary'
                "
              >
                <div
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  :class="localStatus === 'resolved' ? 'border-success' : 'border-border'"
                >
                  <div
                    v-if="localStatus === 'resolved'"
                    class="w-2 h-2 bg-success rounded-full"
                  ></div>
                </div>
                <span class="font-medium">Resolved</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Category Filter -->
        <div>
          <label class="block text-sm font-medium text-text-secondary mb-3">Category</label>
          <select
            v-model="localCategory"
            class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Categories</option>
            <option value="roads">🛣️ Roads & Infrastructure</option>
            <option value="electricity">⚡ Electrical Issues</option>
            <option value="water">💧 Water & Plumbing</option>
            <option value="waste">🗑️ Waste Management</option>
            <option value="safety">🛡️ Public Safety</option>
            <option value="other">📋 Other Issues</option>
          </select>
        </div>

        <!-- Priority Filter -->
        <div>
          <label class="block text-sm font-medium text-text-secondary mb-3">Priority</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="radio" :value="'all'" v-model="localPriority" class="sr-only" />
              <div
                class="claybutton flex items-center gap-3 w-full p-3 rounded-xl cursor-pointer transition-all duration-200"
                :class="
                  localPriority === 'all'
                    ? 'bg-primary/10 border border-primary/20 text-primary'
                    : 'bg-background hover:bg-muted text-text-secondary'
                "
              >
                <div
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  :class="localPriority === 'all' ? 'border-primary' : 'border-border'"
                >
                  <div v-if="localPriority === 'all'" class="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span class="font-medium">All Priority</span>
              </div>
            </label>

            <label class="flex items-center">
              <input type="radio" :value="'high'" v-model="localPriority" class="sr-only" />
              <div
                class="claybutton flex items-center gap-3 w-full p-3 rounded-xl cursor-pointer transition-all duration-200"
                :class="
                  localPriority === 'high'
                    ? 'bg-error/10 border border-error/20 text-error'
                    : 'bg-background hover:bg-muted text-text-secondary'
                "
              >
                <div
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  :class="localPriority === 'high' ? 'border-error' : 'border-border'"
                >
                  <div v-if="localPriority === 'high'" class="w-2 h-2 bg-error rounded-full"></div>
                </div>
                <span class="font-medium">🔴 High Priority</span>
              </div>
            </label>

            <label class="flex items-center">
              <input type="radio" :value="'medium'" v-model="localPriority" class="sr-only" />
              <div
                class="claybutton flex items-center gap-3 w-full p-3 rounded-xl cursor-pointer transition-all duration-200"
                :class="
                  localPriority === 'medium'
                    ? 'bg-warning/10 border border-warning/20 text-warning'
                    : 'bg-background hover:bg-muted text-text-secondary'
                "
              >
                <div
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  :class="localPriority === 'medium' ? 'border-warning' : 'border-border'"
                >
                  <div
                    v-if="localPriority === 'medium'"
                    class="w-2 h-2 bg-warning rounded-full"
                  ></div>
                </div>
                <span class="font-medium">🟡 Medium Priority</span>
              </div>
            </label>

            <label class="flex items-center">
              <input type="radio" :value="'low'" v-model="localPriority" class="sr-only" />
              <div
                class="claybutton flex items-center gap-3 w-full p-3 rounded-xl cursor-pointer transition-all duration-200"
                :class="
                  localPriority === 'low'
                    ? 'bg-info/10 border border-info/20 text-info'
                    : 'bg-background hover:bg-muted text-text-secondary'
                "
              >
                <div
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  :class="localPriority === 'low' ? 'border-info' : 'border-border'"
                >
                  <div v-if="localPriority === 'low'" class="w-2 h-2 bg-info rounded-full"></div>
                </div>
                <span class="font-medium">🔵 Low Priority</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Date Range Filter -->
        <div>
          <label class="block text-sm font-medium text-text-secondary mb-3">Date Range</label>
          <select
            v-model="localDateRange"
            class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type StatusFilter = 'all' | 'pending' | 'under_review' | 'resolved' | 'rejected'
type CategoryFilter = 'all' | 'roads' | 'electricity' | 'water' | 'waste' | 'safety' | 'other'
type PriorityFilter = 'all' | 'high' | 'medium' | 'low'
type DateRangeFilter = 'all' | 'today' | 'week' | 'month' | 'year'

interface Props {
  status: StatusFilter
  category: CategoryFilter
  priority: PriorityFilter
  dateRange: DateRangeFilter
}

interface Emits {
  'update:status': [value: StatusFilter]
  'update:category': [value: CategoryFilter]
  'update:priority': [value: PriorityFilter]
  'update:dateRange': [value: DateRangeFilter]
  clear: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localStatus = computed({
  get: () => props.status,
  set: (value: StatusFilter) => emit('update:status', value),
})

const localCategory = computed({
  get: () => props.category,
  set: (value: CategoryFilter) => emit('update:category', value),
})

const localPriority = computed({
  get: () => props.priority,
  set: (value: PriorityFilter) => emit('update:priority', value),
})

const localDateRange = computed({
  get: () => props.dateRange,
  set: (value: DateRangeFilter) => emit('update:dateRange', value),
})
</script>
