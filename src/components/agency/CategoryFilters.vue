<template>
  <div class="claycard bg-surface rounded-3xl p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-text-primary">Filters</h3>
      <button @click="$emit('clear')" class="text-primary hover:text-secondary text-sm font-medium">
        Clear All
      </button>
    </div>

    <div class="space-y-6">
      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-text-secondary mb-3">Category</label>
        <div class="space-y-2">
          <label class="flex items-center">
            <input type="radio" :value="'all'" v-model="localSelectedCategory" class="sr-only" />
            <div
              class="claybutton flex items-center gap-3 w-full p-3 rounded-xl cursor-pointer transition-all duration-200"
              :class="
                localSelectedCategory === 'all'
                  ? 'bg-primary/10 border border-primary/20 text-primary'
                  : 'bg-background hover:bg-muted text-text-secondary'
              "
            >
              <div
                class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                :class="localSelectedCategory === 'all' ? 'border-primary' : 'border-border'"
              >
                <div
                  v-if="localSelectedCategory === 'all'"
                  class="w-2 h-2 bg-primary rounded-full"
                ></div>
              </div>
              <span class="font-medium">All Categories</span>
            </div>
          </label>

          <label v-for="category in categories" :key="category" class="flex items-center">
            <input type="radio" :value="category" v-model="localSelectedCategory" class="sr-only" />
            <div
              class="claybutton flex items-center gap-3 w-full p-3 rounded-xl cursor-pointer transition-all duration-200"
              :class="
                localSelectedCategory === category
                  ? 'bg-secondary/10 border border-secondary/20 text-secondary'
                  : 'bg-background hover:bg-muted text-text-secondary'
              "
            >
              <div
                class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                :class="localSelectedCategory === category ? 'border-secondary' : 'border-border'"
              >
                <div
                  v-if="localSelectedCategory === category"
                  class="w-2 h-2 bg-secondary rounded-full"
                ></div>
              </div>
              <span class="text-lg mr-2">{{ getCategoryIcon(category) }}</span>
              <span class="font-medium">{{ formatCategory(category) }}</span>
            </div>
          </label>
        </div>
      </div>

      <!-- Status Filter -->
      <div>
        <label class="block text-sm font-medium text-text-secondary mb-3">Status</label>
        <select
          v-model="localSelectedStatus"
          class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">All Status</option>
          <option value="pending">⏳ Pending</option>
          <option value="under_review">🔄 Under Review</option>
          <option value="resolved">✅ Resolved</option>
          <option value="rejected">❌ Rejected</option>
        </select>
      </div>

      <!-- Priority Filter -->
      <div>
        <label class="block text-sm font-medium text-text-secondary mb-3">Priority</label>
        <select
          v-model="localSelectedPriority"
          class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">All Priority</option>
          <option value="high">🔴 High Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="low">🔵 Low Priority</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  categories: string[]
  selectedCategory: string
  selectedStatus: string
  selectedPriority: string
}

interface Emits {
  'update:selectedCategory': [value: string]
  'update:selectedStatus': [value: string]
  'update:selectedPriority': [value: string]
  clear: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localSelectedCategory = computed({
  get: () => props.selectedCategory,
  set: (value: string) => emit('update:selectedCategory', value),
})

const localSelectedStatus = computed({
  get: () => props.selectedStatus,
  set: (value: string) => emit('update:selectedStatus', value),
})

const localSelectedPriority = computed({
  get: () => props.selectedPriority,
  set: (value: string) => emit('update:selectedPriority', value),
})

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    roads: '🛣️',
    electricity: '⚡',
    water: '💧',
    waste: '🗑️',
    safety: '🛡️',
    other: '📋',
  }
  return icons[category] || '📋'
}

const formatCategory = (category: string) => {
  const formatted: Record<string, string> = {
    roads: 'Roads',
    electricity: 'Electrical',
    water: 'Water',
    waste: 'Waste',
    safety: 'Safety',
    other: 'Other',
  }
  return formatted[category] || category
}
</script>
