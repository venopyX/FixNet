<template>
  <nav
    class="fixed top-0 w-full bg-surface/95 backdrop-blur-sm border-b border-border/50 z-50 transition-all duration-300"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">
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

        <div class="hidden md:flex items-center space-x-2">
          <router-link
            to="/reports"
            class="claybutton inline-flex items-center gap-2 text-text-secondary font-medium px-4 py-2 rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
            :class="{ 'text-primary bg-primary/10': $route.path === '/reports' }"
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
            Browse Reports
          </router-link>

          <!-- Super Admin User Management Link -->
          <router-link
            v-if="currentUser?.role === 'super_admin'"
            to="/admin/users"
            class="claybutton inline-flex items-center gap-2 text-text-secondary font-medium px-4 py-2 rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
            :class="{ 'text-primary bg-primary/10': $route.path === '/admin/users' }"
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            User Management
          </router-link>

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

        <!-- Not Authenticated -->
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
            to="/auth"
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

        <!-- Authenticated User Menu -->
        <div v-else class="hidden md:flex items-center space-x-3">
          <router-link
            :to="getDashboardRoute()"
            class="claybutton inline-flex items-center gap-2 text-text-secondary hover:text-primary bg-surface hover:bg-primary/5 px-4 py-2 rounded-xl font-medium transition-all duration-200"
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

          <!-- Profile Dropdown -->
          <div class="relative" v-click-outside="closeProfileMenu">
            <button
              @click="toggleProfileMenu"
              class="claybutton inline-flex items-center gap-3 text-text-primary bg-surface hover:bg-primary/5 px-4 py-2 rounded-xl font-medium transition-all duration-200 border border-border hover:border-primary/20"
              :class="{ 'bg-primary/10 border-primary/20': showProfileMenu }"
            >
              <div
                class="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
              >
                <span class="text-primary font-semibold text-sm">
                  {{ getInitials(currentUser?.first_name, currentUser?.last_name) }}
                </span>
              </div>
              <span class="hidden sm:inline">{{ currentUser?.first_name }}</span>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': showProfileMenu }"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Profile Dropdown Menu -->
            <Transition name="dropdown">
              <div
                v-if="showProfileMenu"
                class="absolute right-0 top-full mt-2 w-64 claycard bg-surface border border-border/50 rounded-2xl shadow-xl z-50 profile-dropdown"
              >
                <div class="p-4">
                  <!-- User Info -->
                  <div class="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
                    <div
                      class="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
                    >
                      <span class="text-primary font-bold text-lg">
                        {{ getInitials(currentUser?.first_name, currentUser?.last_name) }}
                      </span>
                    </div>
                    <div>
                      <div class="font-semibold text-text-primary">
                        {{ currentUser?.first_name }} {{ currentUser?.last_name }}
                      </div>
                      <div class="text-sm text-text-secondary capitalize">
                        {{ currentUser?.role }}
                      </div>
                    </div>
                  </div>

                  <!-- Menu Items -->
                  <div class="space-y-1">
                    <router-link
                      :to="`/profile/${currentUser?.id}`"
                      @click="closeProfileMenu"
                      class="claybutton flex items-center gap-3 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-primary hover:bg-primary/5 transition-all duration-200"
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>View Profile</span>
                    </router-link>

                    <button
                      @click="openEditProfile"
                      class="claybutton flex items-center gap-3 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-primary hover:bg-primary/5 transition-all duration-200"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span>Edit Profile</span>
                    </button>

                    <!-- Super Admin Only Menu Item -->
                    <router-link
                      v-if="currentUser?.role === 'super_admin'"
                      to="/admin/users"
                      @click="closeProfileMenu"
                      class="claybutton flex items-center gap-3 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-accent hover:bg-accent/5 transition-all duration-200"
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
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                      <span>Manage Users</span>
                    </router-link>

                    <button
                      @click="shareProfile"
                      class="claybutton flex items-center gap-3 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-secondary hover:bg-secondary/5 transition-all duration-200"
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
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      <span>Share Profile</span>
                    </button>

                    <div class="border-t border-border/50 mt-2 pt-2">
                      <button
                        v-if="isAuthenticated"
                        @click="showConfirm = true"
                        class="claybutton flex items-center gap-3 w-full px-3 py-2 rounded-xl text-error hover:bg-error/5 transition-all duration-200"
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
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
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
            class="claycard bg-surface/95 backdrop-blur-sm border border-border/50 rounded-2xl mt-4 mb-4 p-4 shadow-lg mobile-menu-content"
          >
            <!-- Navigation Links -->
            <div class="space-y-2 mb-4">
              <router-link
                to="/reports"
                class="claybutton flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-primary/5 hover:text-primary transition-all duration-200 w-full"
                :class="{ 'bg-primary/10 text-primary': $route.path === '/reports' }"
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span class="font-medium">Browse Reports</span>
              </router-link>

              <!-- Super Admin User Management for Mobile -->
              <router-link
                v-if="currentUser?.role === 'super_admin'"
                to="/admin/users"
                class="claybutton flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-accent/5 hover:text-accent transition-all duration-200 w-full"
                :class="{ 'bg-accent/10 text-accent': $route.path === '/admin/users' }"
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
                <span class="font-medium">User Management</span>
              </router-link>

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
                to="/auth"
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
                <div class="claycard bg-primary/10 text-primary px-4 py-3 rounded-xl">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
                    >
                      <span class="text-primary font-semibold">
                        {{ getInitials(currentUser?.first_name, currentUser?.last_name) }}
                      </span>
                    </div>
                    <div>
                      <div class="font-medium">
                        {{ currentUser?.first_name }} {{ currentUser?.last_name }}
                      </div>
                      <div class="text-sm opacity-75 capitalize">{{ currentUser?.role }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Profile Links -->
              <router-link
                :to="`/profile/${currentUser?.id}`"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span class="font-medium">View Profile</span>
              </router-link>

              <!-- Dashboard Link -->
              <router-link
                :to="getDashboardRoute()"
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
                v-if="isAuthenticated"
                @click="showConfirm = true"
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

    <!-- Logout Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="showConfirm = false"
          ></div>

          <!-- Modal -->
          <div class="claycard bg-surface rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl">
            <div class="text-center">
              <div
                class="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-warning"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <h3 class="text-xl font-bold text-text-primary mb-2">Sign Out Confirmation</h3>

              <p class="text-text-secondary mb-6">
                Are you sure you want to sign out of your FixNet account?
              </p>

              <div class="flex gap-3">
                <button
                  @click="showConfirm = false"
                  class="claybutton flex-1 px-4 py-3 border border-border text-text-secondary bg-surface rounded-2xl font-medium hover:bg-muted transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  @click="handleLogout"
                  class="claybutton flex-1 px-4 py-3 bg-error text-white rounded-2xl font-medium hover:bg-error/90 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Profile Edit Modal -->
    <ProfileEditModal
      :show="showEditModal"
      :user="currentUser"
      @close="closeEditProfile"
      @updated="handleProfileUpdate"
    />

    <!-- Share Profile Modal -->
    <ShareProfileModal :show="showShareModal" :user="currentUser" @close="closeShareProfile" />
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { isAuthenticated, currentUser, authService } from '@/utils/auth'
import ProfileEditModal from '@/components/profile/ProfileEditModal.vue'
import ShareProfileModal from '@/components/profile/ShareProfileModal.vue'

const showMobileMenu = ref(false)
const showProfileMenu = ref(false)
const showEditModal = ref(false)
const showShareModal = ref(false)
const showConfirm = ref(false)
const router = useRouter()
const route = useRoute()

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    showProfileMenu.value = false
  }
}

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
  if (showProfileMenu.value) {
    showMobileMenu.value = false
  }
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const closeProfileMenu = () => {
  showProfileMenu.value = false
}

const getDashboardRoute = () => {
  if (!currentUser.value) return '/dashboard'

  const { role } = currentUser.value

  if (['admin', 'super_admin'].includes(role)) {
    return '/admin'
  } else if (role === 'agency_staff') {
    return '/agency/dashboard'
  } else {
    return '/dashboard'
  }
}

const handleLogoClick = () => {
  if (route.path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    router.push('/')
  }
  closeMobileMenu()
  closeProfileMenu()
}

const handleLogout = () => {
  authService.logout()
  showConfirm.value = false
  router.push('/')
  closeMobileMenu()
  closeProfileMenu()
}

const openEditProfile = () => {
  showEditModal.value = true
  closeProfileMenu()
}

const closeEditProfile = () => {
  showEditModal.value = false
}

const shareProfile = () => {
  showShareModal.value = true
  closeProfileMenu()
}

const closeShareProfile = () => {
  showShareModal.value = false
}

const handleProfileUpdate = () => {
  // Profile updated successfully
  closeEditProfile()
}

const getInitials = (firstName?: string, lastName?: string) => {
  if (!firstName || !lastName) return 'U'
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

// Extended HTMLElement interface for the click outside directive
interface HTMLElementWithClickOutside extends HTMLElement {
  clickOutsideEvent?: (event: Event) => void
}

// Click outside directive with proper typing
const vClickOutside = {
  beforeMount(el: HTMLElementWithClickOutside, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElementWithClickOutside) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  },
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

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top right;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Fix for short screen heights - Profile Dropdown */
.profile-dropdown {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}

/* Fix for short screen heights - Mobile Menu */
.mobile-menu-content {
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}

/* Scroll fade effect for mobile menu */
.mobile-menu-content::before {
  content: '';
  position: sticky;
  top: 0;
  height: 8px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), transparent);
  pointer-events: none;
  z-index: 1;
  margin-bottom: -8px;
}

.mobile-menu-content::after {
  content: '';
  position: sticky;
  bottom: 0;
  height: 8px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.9));
  pointer-events: none;
  z-index: 1;
  margin-top: -8px;
}

/* Custom scrollbar for better UX */
.profile-dropdown::-webkit-scrollbar,
.mobile-menu-content::-webkit-scrollbar {
  width: 4px;
}

.profile-dropdown::-webkit-scrollbar-track,
.mobile-menu-content::-webkit-scrollbar-track {
  background: transparent;
}

.profile-dropdown::-webkit-scrollbar-thumb,
.mobile-menu-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.profile-dropdown::-webkit-scrollbar-thumb:hover,
.mobile-menu-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Hide scrollbar for Firefox */
.profile-dropdown,
.mobile-menu-content {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

/* Ensure proper spacing for scrollable content */
@media (max-height: 600px) {
  .profile-dropdown {
    max-height: calc(100vh - 100px);
  }

  .mobile-menu-content {
    max-height: calc(100vh - 60px);
  }
}

@media (max-height: 400px) {
  .profile-dropdown {
    max-height: calc(100vh - 80px);
  }

  .mobile-menu-content {
    max-height: calc(100vh - 40px);
  }
}
</style>
