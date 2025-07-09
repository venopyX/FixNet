<template>
    <div class="claycard bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl p-8 mb-8 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-info/10 rounded-full blur-3xl"></div>
      
      <div class="relative z-10">
        <div class="text-center mb-8">
          <div class="inline-block mb-4">
            <span class="claycard bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              🌍 Community Transparency
            </span>
          </div>
          
          <h1 class="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Community Reports Gallery
          </h1>
          
          <p class="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Explore all community improvement reports. See what issues citizens have identified and track their progress toward resolution.
          </p>
        </div>
        
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="claycard bg-surface/80 p-4 rounded-2xl">
              <div class="text-2xl lg:text-3xl font-bold text-primary mb-1">{{ stats.total }}</div>
              <div class="text-text-secondary text-sm">Total Reports</div>
            </div>
          </div>
          
          <div class="text-center">
            <div class="claycard bg-surface/80 p-4 rounded-2xl">
              <div class="text-2xl lg:text-3xl font-bold text-warning mb-1">{{ stats.pending }}</div>
              <div class="text-text-secondary text-sm">Pending</div>
            </div>
          </div>
          
          <div class="text-center">
            <div class="claycard bg-surface/80 p-4 rounded-2xl">
              <div class="text-2xl lg:text-3xl font-bold text-success mb-1">{{ stats.resolved }}</div>
              <div class="text-text-secondary text-sm">Resolved</div>
            </div>
          </div>
          
          <div class="text-center">
            <div class="claycard bg-surface/80 p-4 rounded-2xl">
              <div class="text-2xl lg:text-3xl font-bold text-accent mb-1">{{ stats.thisMonth }}</div>
              <div class="text-text-secondary text-sm">This Month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    stats: {
      total: number
      pending: number
      resolved: number
      thisMonth: number
    }
  }
  
  defineProps<Props>()
  </script>