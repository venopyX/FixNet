<template>
    <div class="claycard bg-surface rounded-3xl p-6">
      <h3 class="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Contact
      </h3>
      
      <div class="space-y-3">
        <button
          class="claybutton w-full flex items-center gap-3 p-4 rounded-2xl bg-background/50 border border-border/50 hover:bg-primary/5 hover:border-primary/20 text-text-secondary hover:text-primary transition-all duration-200"
        >
          <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="text-left">
            <div class="font-medium">Send Message</div>
            <div class="text-sm text-text-muted">Contact {{ user.first_name }} directly</div>
          </div>
        </button>
        
        <button
          class="claybutton w-full flex items-center gap-3 p-4 rounded-2xl bg-background/50 border border-border/50 hover:bg-secondary/5 hover:border-secondary/20 text-text-secondary hover:text-secondary transition-all duration-200"
        >
          <div class="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </div>
          <div class="text-left">
            <div class="font-medium">Share Profile</div>
            <div class="text-sm text-text-muted">Share with your network</div>
          </div>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { User } from '@/data/mockData'
  
  interface Props {
    user: User
  }
  
  defineProps<Props>()
  </script>