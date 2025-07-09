<template>
    <div class="claycard bg-surface rounded-3xl p-6">
      <h3 class="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
        </svg>
        Community Impact
      </h3>
      
      <div class="space-y-4">
        <!-- Total Reports -->
        <div class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div class="text-sm text-text-secondary">Total Reports</div>
                <div class="text-2xl font-bold text-text-primary">{{ stats.totalReports }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Resolved Reports -->
        <div class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div class="text-sm text-text-secondary">Issues Resolved</div>
                <div class="text-2xl font-bold text-text-primary">{{ stats.resolved }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm text-success font-medium">
                {{ stats.totalReports > 0 ? Math.round((stats.resolved / stats.totalReports) * 100) : 0 }}%
              </div>
              <div class="text-xs text-text-muted">Success Rate</div>
            </div>
          </div>
        </div>
        
        <!-- Pending Reports -->
        <div class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-warning" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div class="text-sm text-text-secondary">In Progress</div>
                <div class="text-2xl font-bold text-text-primary">{{ stats.pending }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Average Response Time -->
        <div v-if="stats.avgResponseTime > 0" class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-info/10 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-info" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div class="text-sm text-text-secondary">Avg. Response Time</div>
              <div class="text-lg font-bold text-text-primary">
                {{ stats.avgResponseTime }} day{{ stats.avgResponseTime !== 1 ? 's' : '' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
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
  </script>