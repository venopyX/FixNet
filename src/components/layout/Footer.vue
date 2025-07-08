<template>
  <footer class="bg-black border-t border-white/10 py-16">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-12">
        <div class="md:col-span-2">
          <div class="flex items-center space-x-3 mb-6">
            <div
              class="claycard w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
            >
              <span class="text-white font-bold text-lg">FA</span>
            </div>
            <span class="font-bold text-2xl text-white">FixMyArea</span>
          </div>
          <p class="text-white/70 mb-6 max-w-md leading-relaxed">
            Empowering communities to create positive change through transparent, efficient
            reporting of local infrastructure issues.
          </p>
          <div class="flex space-x-4">
            <!-- GitHub -->
            <a
              href="#"
              class="claybutton w-10 h-10 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.397.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <!-- Twitter -->
            <a
              href="#"
              class="claybutton w-10 h-10 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
            <!-- LinkedIn -->
            <a
              href="#"
              class="claybutton w-10 h-10 bg-accent/10 hover:bg-accent/20 text-accent rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
            <!-- Telegram -->
            <a
              href="#"
              class="claybutton w-10 h-10 bg-info/10 hover:bg-info/20 text-info rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M11.944 0C5.356 0 0 5.356 0 11.944s5.356 11.944 11.944 11.944 11.944-5.356 11.944-11.944S18.532 0 11.944 0zm5.922 8.24l-1.944 9.056c-.222.944-.833 1.167-1.611.722l-4.5-3.333-2.167 2.056c-.222.222-.444.444-.889.444l.333-4.556L4.167 9.82C3.333 9.546 3.333 8.82 4.389 8.546l11.333-4.389c.833-.333 1.611.167 1.333.983z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 class="font-semibold text-lg mb-6 text-white">Platform</h3>
          <ul class="space-y-3">
            <li>
              <router-link
                to="/dashboard"
                class="claybutton text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 14a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 14a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link
                to="/report"
                class="claybutton text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Report Issue
              </router-link>
            </li>
            <li>
              <router-link
                to="/agency"
                class="claybutton text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m-5-4h5.5"
                  />
                </svg>
                For Agencies
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-lg mb-6 text-white">Resources</h3>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="claybutton text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#"
                class="claybutton text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                class="claybutton text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                User Guide
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-lg mb-6 text-white">Legal</h3>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="claybutton text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                class="claybutton text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5"
              >
                <svg
                  class="w-4 h-4"
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
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                class="claybutton text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5"
              >
                <svg
                  class="w-4 h-4"
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
                Accessibility
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div
        class="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="flex flex-col sm:flex-row items-center gap-4 text-sm text-white/50">
          <p>&copy; 2025 FixMyArea. All rights reserved.</p>
          <div class="flex items-center gap-2">
            <span>Built with</span>
            <svg class="w-4 h-4 text-error" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            <span>by {{ currentUserLogin }} for stronger communities</span>
          </div>
        </div>

        <div class="flex items-center gap-4 text-sm text-white/50">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentUserLogin = ref('@venopyx')
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
