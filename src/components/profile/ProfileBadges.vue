<template>
  <div class="claycard bg-surface rounded-3xl p-6">
    <h3 class="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
      <svg
        class="w-5 h-5 text-primary"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
      Achievements
    </h3>

    <div v-if="badges.length > 0" class="space-y-3">
      <div
        v-for="badge in badges"
        :key="badge.id"
        class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl hover:scale-[1.02] transition-all duration-300"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
            :class="getBadgeColor(badge.color)"
          >
            {{ badge.icon }}
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-text-primary">{{ badge.name }}</h4>
            <p class="text-sm text-text-secondary">{{ badge.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- No Badges State -->
    <div v-else class="text-center py-8">
      <div class="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          class="w-8 h-8 text-text-muted"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      </div>
      <h4 class="font-semibold text-text-primary mb-2">No Badges Yet</h4>
      <p class="text-sm text-text-secondary">
        Start reporting community issues to earn your first achievement badge!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

interface Props {
  badges: Badge[]
  stats: {
    totalReports: number
    resolved: number
    pending: number
    avgResponseTime: number
    impactScore: number
    joinDate: string
  }
}

defineProps<Props>()

const getBadgeColor = (color: string) => {
  const colors: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    info: 'bg-info/10 text-info',
    error: 'bg-error/10 text-error',
  }
  return colors[color] || 'bg-muted text-text-muted'
}
</script>
