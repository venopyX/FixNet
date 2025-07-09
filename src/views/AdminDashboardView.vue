<template>
  <div class="min-h-screen bg-background py-20">
    <div class="container mx-auto px-6">
      <div class="max-w-7xl mx-auto space-y-8">
        <!-- Admin Dashboard Header -->
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
              <div>
                <div class="flex items-center gap-4 mb-4">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 class="text-3xl font-bold text-text-primary">Admin Dashboard 👨‍💼</h1>
                    <p class="text-text-secondary">
                      Welcome back, {{ currentUser?.first_name }}! Manage reports and system
                      operations.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="flex flex-col sm:flex-row items-center gap-3">
                <!-- Super Admin User Management Button -->
                <router-link
                  v-if="currentUser?.role === 'super_admin'"
                  to="/admin/users"
                  class="claybutton inline-flex items-center gap-2 bg-gradient-to-r from-accent to-info text-white px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-all duration-200"
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
                  Manage Users
                </router-link>

                <router-link
                  to="/reports"
                  class="claybutton inline-flex items-center gap-2 border border-primary/20 text-primary bg-primary/5 px-6 py-3 rounded-2xl font-medium hover:bg-primary/10 transition-all duration-200"
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
                  View All Reports
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Dashboard Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Quick Stats -->
          <div class="lg:col-span-2 space-y-6">
            <div class="claycard bg-surface rounded-3xl p-6">
              <h2 class="text-xl font-semibold text-text-primary mb-6">Quick Stats</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl text-center"
                >
                  <div class="text-2xl font-bold text-primary mb-1">{{ mockReports.length }}</div>
                  <div class="text-sm text-text-secondary">Total Reports</div>
                </div>
                <div
                  class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl text-center"
                >
                  <div class="text-2xl font-bold text-warning mb-1">{{ pendingReports }}</div>
                  <div class="text-sm text-text-secondary">Pending</div>
                </div>
                <div
                  class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl text-center"
                >
                  <div class="text-2xl font-bold text-success mb-1">{{ resolvedReports }}</div>
                  <div class="text-sm text-text-secondary">Resolved</div>
                </div>
                <div
                  class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl text-center"
                >
                  <div class="text-2xl font-bold text-info mb-1">{{ mockUsers.length }}</div>
                  <div class="text-sm text-text-secondary">Total Users</div>
                </div>
              </div>
            </div>

            <!-- Recent Reports Preview -->
            <div class="claycard bg-surface rounded-3xl p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-text-primary">Recent Reports</h2>
                <router-link
                  to="/reports"
                  class="text-primary hover:text-secondary font-medium text-sm"
                >
                  View All →
                </router-link>
              </div>
              <div class="space-y-3">
                <div
                  v-for="report in recentReports"
                  :key="report.id"
                  class="claycard bg-background/50 border border-border/50 p-4 rounded-xl"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="font-medium text-text-primary">{{ report.title }}</h3>
                      <p class="text-sm text-text-secondary">{{ report.location }}</p>
                    </div>
                    <div class="text-right">
                      <div class="text-xs text-text-muted">{{ formatDate(report.created_at) }}</div>
                      <StatusBadge :status="report.status" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Admin Actions -->
          <div class="space-y-6">
            <div class="claycard bg-surface rounded-3xl p-6">
              <h2 class="text-xl font-semibold text-text-primary mb-6">Admin Actions</h2>
              <div class="space-y-3">
                <button
                  class="claybutton w-full flex items-center gap-3 p-4 rounded-2xl bg-background/50 border border-border/50 hover:bg-primary/5 hover:border-primary/20 text-text-secondary hover:text-primary transition-all duration-200"
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span class="font-medium">Analytics Dashboard</span>
                </button>

                <button
                  class="claybutton w-full flex items-center gap-3 p-4 rounded-2xl bg-background/50 border border-border/50 hover:bg-secondary/5 hover:border-secondary/20 text-text-secondary hover:text-secondary transition-all duration-200"
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span class="font-medium">Export Reports</span>
                </button>

                <button
                  class="claybutton w-full flex items-center gap-3 p-4 rounded-2xl bg-background/50 border border-border/50 hover:bg-accent/5 hover:border-accent/20 text-text-secondary hover:text-accent transition-all duration-200"
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span class="font-medium">System Settings</span>
                </button>

                <!-- Super Admin Only -->
                <router-link
                  v-if="currentUser?.role === 'super_admin'"
                  to="/admin/users"
                  class="claybutton w-full flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-accent/10 to-info/10 border border-accent/20 hover:from-accent/20 hover:to-info/20 text-accent hover:text-info transition-all duration-200"
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
              </div>
            </div>

            <!-- System Status -->
            <div class="claycard bg-surface rounded-3xl p-6">
              <h2 class="text-xl font-semibold text-text-primary mb-6">System Status</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-text-secondary">System Health</span>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-success rounded-full"></div>
                    <span class="text-success text-sm font-medium">Operational</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-text-secondary">Database</span>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-success rounded-full"></div>
                    <span class="text-success text-sm font-medium">Connected</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-text-secondary">Last Backup</span>
                  <span class="text-text-muted text-sm">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { mockReports, mockUsers } from '@/data/mockData'
import { currentUser } from '@/utils/auth'
import StatusBadge from '@/components/shared/StatusBadge.vue'

// Check admin access
if (!currentUser.value || !['admin', 'super_admin'].includes(currentUser.value.role)) {
  throw new Error('Access denied')
}

const pendingReports = computed(() => {
  return mockReports.filter((r) => ['pending', 'under_review'].includes(r.status)).length
})

const resolvedReports = computed(() => {
  return mockReports.filter((r) => r.status === 'resolved').length
})

const recentReports = computed(() => {
  return mockReports
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}
</script>
