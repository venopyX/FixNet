<template>
  <router-link
    to="/report"
    class="claycard group bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 hover:from-primary/20 hover:via-secondary/20 hover:to-accent/20 p-8 rounded-3xl border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer block"
  >
    <div class="text-center">
      <div
        class="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
      >
        <svg
          class="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>

      <h3
        class="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors"
      >
        📝 Report New Issue
      </h3>

      <p class="text-text-secondary mb-4">
        Spotted a problem in your community? Let us know and help make it better.
      </p>

      <div
        class="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-200"
      >
        <span>Create Report</span>
        <svg
          class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </router-link>
</template>
