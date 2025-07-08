<template>
  <span
    :class="statusClasses"
    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
  >
    <span class="w-2 h-2 rounded-full mr-2" :class="dotClasses"></span>
    {{ statusText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  status: 'pending' | 'under_review' | 'resolved' | 'rejected'
}

const props = defineProps<Props>()

const statusConfig = {
  pending: {
    text: 'Pending',
    bgClass: 'bg-(--warning)/10 text-(--warning)',
    dotClass: 'bg-(--warning)',
  },
  under_review: {
    text: 'Under Review',
    bgClass: 'bg-(--info)/10 text-(--info)',
    dotClass: 'bg-(--info)',
  },
  resolved: {
    text: 'Resolved',
    bgClass: 'bg-(--success)/10 text-(--success)',
    dotClass: 'bg-(--success)',
  },
  rejected: {
    text: 'Rejected',
    bgClass: 'bg-(--error)/10 text-(--error)',
    dotClass: 'bg-(--error)',
  },
}

const statusClasses = computed(() => statusConfig[props.status].bgClass)
const dotClasses = computed(() => statusConfig[props.status].dotClass)
const statusText = computed(() => statusConfig[props.status].text)
</script>
