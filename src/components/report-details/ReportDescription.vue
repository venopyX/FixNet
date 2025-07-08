<template>
  <div class="claycard bg-surface rounded-3xl p-6">
    <h2 class="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
      <svg
        class="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Description
    </h2>

    <div class="claycard bg-background/50 border border-border/50 p-6 rounded-2xl">
      <div class="prose prose-gray max-w-none">
        <p class="text-text-primary leading-relaxed whitespace-pre-wrap">
          {{ report.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Report } from '@/data/mockData'

interface Props {
  report: Report
}

defineProps<Props>()
</script>
