<template>
  <nav
    class="fixed top-0 w-full bg-surface/95 backdrop-blur-sm border-b border-border/50 z-50 transition-all duration-300"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3" @click.prevent="handleLogoClick">
            <div
              class="claycard w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">FA</span>
            </div>
            <span class="font-bold text-xl text-text-primary">FixNet</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-2">
          <a
            href="/#how-it-works"
            class="claybutton inline-flex items-center gap-2 text-text-secondary font-medium px-4 py-2 rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            How It Works
          </a>
          <a
            href="/#features"
            class="claybutton inline-flex items-center gap-2 text-text-secondary font-medium px-4 py-2 rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Features
          </a>
        </div>

        <!-- Desktop Auth Buttons -->
        <div v-if="!isAuthenticated" class="hidden md:flex items-center space-x-3">
          <router-link
            to="/auth"
            class="claybutton inline-flex items-center gap-2 border border-primary/20 text-primary bg-primary/5 px-5 py-2 rounded-xl font-medium hover:bg-primary/10 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Sign In
          </router-link>
          <router-link
            to="/auth#sign-up"
            class="claybutton inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-xl font-medium shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border-0 focus:outline-none focus:ring-2 focus:ring-primary/30"
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
            Get Started
          </router-link>
        </div>

        <!-- Desktop Authenticated User Menu -->
        <div v-else class="hidden md:flex items-center space-x-3">
          <div class="flex items-center gap-3 mr-2">
            <div class="claycard bg-primary/10 px-3 py-1 rounded-full">
              <span class="text-primary text-sm font-medium">{{ currentUser?.first_name }}</span>
            </div>
          </div>
          <router-link
            :to="currentUser?.role === 'admin' ? '/admin' : '/dashboard'"
            class="claybutton inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl font-medium hover:scale-105 transition-all duration-200"
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Dashboard
          </router-link>
          <button
            @click="handleLogout"
            class="claybutton inline-flex items-center gap-2 border border-border text-text-secondary bg-surface px-4 py-2 rounded-xl font-medium hover:bg-muted hover:text-text-primary transition-all duration-200"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="claybutton text-text-secondary hover:text-primary p-2 rounded-xl transition-colors duration-200"
            :class="{ 'text-primary bg-primary/10': showMobileMenu }"
          >
            <svg
              v-if="!showMobileMenu"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition name="slide-down">
        <div v-if="showMobileMenu" class="md:hidden">
          <div
            class="claycard bg-surface/95 backdrop-blur-sm border border-border/50 rounded-2xl mt-4 mb-4 p-4 shadow-lg"
          >
            <!-- Navigation Links -->
            <div class="space-y-2 mb-4">
              <a
                href="/#how-it-works"
                class="claybutton flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-primary/5 hover:text-primary transition-all duration-200 w-full"
                @click="closeMobileMenu"
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="font-medium">How It Works</span>
              </a>
              <a
                href="/#features"
                class="claybutton flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-primary/5 hover:text-primary transition-all duration-200 w-full"
                @click="closeMobileMenu"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span class="font-medium">Features</span>
              </a>
            </div>

            <!-- Auth Section -->
            <div v-if="!isAuthenticated" class="border-t border-border/50 pt-4 space-y-3">
              <router-link
                to="/auth"
                class="claybutton flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-primary/20 text-primary bg-primary/5 font-medium hover:bg-primary/10 transition-all duration-200 w-full"
                @click="closeMobileMenu"
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>Sign In</span>
              </router-link>
              <router-link
                to="/auth#sign-up"
                class="claybutton flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 w-full"
                @click="closeMobileMenu"
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
                <span>Get Started</span>
              </router-link>
            </div>

            <!-- Authenticated User Section -->
            <div v-else class="border-t border-border/50 pt-4 space-y-3">
              <!-- User Info -->
              <div class="px-4 py-2">
                <div class="claycard bg-primary/10 text-primary px-4 py-3 rounded-xl text-center">
                  <div class="flex items-center justify-center gap-2 mb-1">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span class="font-medium"
                      >{{ currentUser?.first_name }} {{ currentUser?.last_name }}</span
                    >
                  </div>
                  <span class="text-sm opacity-75 capitalize">{{ currentUser?.role }}</span>
                </div>
              </div>

              <!-- Dashboard Link -->
              <router-link
                :to="currentUser?.role === 'admin' ? '/admin' : '/dashboard'"
                class="claybutton flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:scale-[1.02] transition-all duration-200 w-full"
                @click="closeMobileMenu"
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span>Go to Dashboard</span>
              </router-link>

              <!-- Sign Out Button -->
              <button
                @click="handleLogout"
                class="claybutton flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-text-secondary bg-surface font-medium hover:bg-muted hover:text-text-primary transition-all duration-200 w-full"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { isAuthenticated, currentUser, authService } from '@/utils/auth'

const showMobileMenu = ref(false)
const router = useRouter()
const route = useRoute()

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const handleLogoClick = () => {
  if (route.path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    router.push('/')
  }
  closeMobileMenu()
}

const handleLogout = () => {
  authService.logout()
  router.push('/')
  closeMobileMenu()
}
</script>

<style scoped>
/* Slide down animation for mobile menu */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.95);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-5px) scaleY(0.98);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}
</style>
