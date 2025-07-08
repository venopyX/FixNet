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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-text-primary">Admin Dashboard 🏛️</h1>
              <p class="text-text-secondary">
                Welcome back, {{ currentUser?.first_name }}! Manage community reports efficiently.
              </p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-4 text-sm">
            <div class="claycard bg-surface/80 px-3 py-2 rounded-xl flex items-center gap-2">
              <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span class="text-text-secondary">System Online</span>
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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <span class="text-text-secondary">Administrator</span>
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
              <span class="text-text-secondary">Last updated {{ formatTime(new Date()) }}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <router-link
            to="/"
            class="claybutton inline-flex items-center gap-2 border border-border text-text-secondary bg-surface px-4 py-3 rounded-2xl font-medium hover:bg-muted transition-all duration-200"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0h3m0 0h3m0 0a1 1 0 001-1V10M9 21v-6a1 1 0 011-1h2a1 1 0 011 1v6"
              />
            </svg>
            Public View
          </router-link>

          <LogoutButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { currentUser } from '@/utils/auth'
import LogoutButton from '@/components/dashboard/LogoutButton.vue'

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
