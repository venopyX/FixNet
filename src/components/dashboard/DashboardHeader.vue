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
        <div class="flex-1">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-text-primary">
                Welcome back, {{ currentUser?.first_name }}! 👋
              </h1>
              <p class="text-text-secondary">Ready to make a difference in your community?</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-4 text-sm">
            <div class="claycard bg-surface/80 px-3 py-2 rounded-xl flex items-center gap-2">
              <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span class="text-text-secondary">Account Active</span>
            </div>
            <div class="claycard bg-surface/80 px-3 py-2 rounded-xl flex items-center gap-2">
              <svg
                class="w-4 h-4 text-primary"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 7V3a4 4 0 118 0v4m-4 0v12m0-12h4a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              <span class="text-text-secondary">Verified Resident</span>
            </div>
            <div class="claycard bg-surface/80 px-3 py-2 rounded-xl flex items-center gap-2">
              <svg
                class="w-4 h-4 text-accent"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-text-secondary">Member since {{ memberSince }}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <router-link
            to="/report/new"
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
            New Report
          </router-link>

          <LogoutButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { currentUser } from '@/utils/auth'
import LogoutButton from './LogoutButton.vue'

const memberSince = computed(() => {
  if (!currentUser.value?.created_at) return 'Recently'

  const date = new Date(currentUser.value.created_at)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
})
</script>
