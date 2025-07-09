<template>
  <div class="claycard bg-surface rounded-3xl p-6 mt-8">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <!-- Page Info -->
      <div class="text-sm text-text-secondary">
        Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} reports
      </div>

      <!-- Pagination Controls -->
      <div class="flex items-center gap-2">
        <!-- Previous Button -->
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage <= 1"
          class="claybutton w-10 h-10 flex items-center justify-center rounded-xl border border-border hover:border-primary text-text-secondary hover:text-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center gap-1">
          <!-- First Page -->
          <button
            v-if="showFirstPage"
            @click="goToPage(1)"
            class="claybutton w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200"
            :class="
              currentPage === 1
                ? 'bg-primary text-white'
                : 'border border-border hover:border-primary text-text-secondary hover:text-primary'
            "
          >
            1
          </button>

          <!-- First Ellipsis -->
          <span v-if="showFirstEllipsis" class="px-2 text-text-muted">...</span>

          <!-- Visible Pages -->
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="claybutton w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200"
            :class="
              currentPage === page
                ? 'bg-primary text-white'
                : 'border border-border hover:border-primary text-text-secondary hover:text-primary'
            "
          >
            {{ page }}
          </button>

          <!-- Last Ellipsis -->
          <span v-if="showLastEllipsis" class="px-2 text-text-muted">...</span>

          <!-- Last Page -->
          <button
            v-if="showLastPage"
            @click="goToPage(totalPages)"
            class="claybutton w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200"
            :class="
              currentPage === totalPages
                ? 'bg-primary text-white'
                : 'border border-border hover:border-primary text-text-secondary hover:text-primary'
            "
          >
            {{ totalPages }}
          </button>
        </div>

        <!-- Next Button -->
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="claybutton w-10 h-10 flex items-center justify-center rounded-xl border border-border hover:border-primary text-text-secondary hover:text-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage?: number
}

interface Emits {
  pageChange: [page: number]
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 12,
})

const emit = defineEmits<Emits>()

const startItem = computed(() => {
  return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})

// Calculate visible pages for pagination
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(2, props.currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(props.totalPages - 1, start + maxVisible - 1)

  // Adjust start if we're near the end
  if (end - start + 1 < maxVisible) {
    start = Math.max(2, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== props.totalPages) {
      pages.push(i)
    }
  }

  return pages
})

const showFirstPage = computed(() => props.totalPages > 1)
const showLastPage = computed(() => props.totalPages > 1 && props.totalPages !== 1)
const showFirstEllipsis = computed(() => visiblePages.value.length > 0 && visiblePages.value[0] > 2)
const showLastEllipsis = computed(() => {
  return (
    visiblePages.value.length > 0 &&
    visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
  )
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('pageChange', page)
  }
}
</script>
