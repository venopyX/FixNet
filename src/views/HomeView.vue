<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section
      class="hero-section bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen flex items-center relative overflow-hidden"
    >
      <!-- Decorative Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-accent/20 to-info/20 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl"
        ></div>
      </div>

      <div class="container mx-auto px-6 py-20 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <div class="lg:w-1/2 text-center lg:text-left">
            <div class="inline-block mb-6">
              <span
                class="claycard bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
              >
                ✨ Making Communities Better Together
              </span>
            </div>

            <h1 class="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Fix Your
              <span
                class="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              >
                Community
              </span>
              <br />
              <span class="text-3xl lg:text-5xl text-text-secondary font-medium">
                One Report at a Time
              </span>
            </h1>

            <p class="text-xl mb-8 text-text-secondary leading-relaxed max-w-xl">
              Transform your neighborhood with FixNet. Report issues, track progress, and watch your
              community flourish through collaborative action.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <router-link
                to="/auth"
                class="claybutton group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border-0 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                Start Reporting
                <svg
                  class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>

              <button
                @click="scrollToHow"
                class="claybutton inline-flex items-center gap-2 bg-surface/80 backdrop-blur-sm text-text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-surface transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
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
                How It Works
              </button>
            </div>
          </div>

          <div class="lg:w-1/2">
            <div class="relative">
              <!-- Floating Report Card -->
              <div
                class="claycard bg-surface p-8 rounded-3xl transform hover:rotate-1 transition-transform duration-700 relative z-10"
              >
                <div class="flex items-center gap-3 mb-6">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center"
                  >
                    <svg class="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-success text-sm font-medium">✓ Resolved</span>
                      <span class="text-text-muted text-xs">2 days ago</span>
                    </div>
                    <h3 class="font-semibold text-text-primary">Pothole on Main Street</h3>
                  </div>
                </div>

                <div
                  class="bg-muted rounded-2xl h-32 mb-4 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src="https://www.mnroadways.com/wp-content/uploads/2016/04/Infrared-Thermal-Patching-Before.jpg"
                    alt="Pothole before and after repair"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-6 h-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
                    >
                      <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <span class="text-text-secondary text-sm">Downtown District</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <div class="w-2 h-2 bg-success rounded-full"></div>
                    <div class="w-2 h-2 bg-success/60 rounded-full"></div>
                    <div class="w-2 h-2 bg-success/30 rounded-full"></div>
                  </div>
                </div>
              </div>

              <!-- Floating Stats -->
              <div class="absolute -top-6 -right-6 claycard bg-surface p-4 rounded-2xl">
                <div class="text-center">
                  <div class="text-2xl font-bold text-primary mb-1">24</div>
                  <div class="text-xs text-text-secondary">Fixed Today</div>
                </div>
              </div>

              <div class="absolute -bottom-6 -left-6 claycard bg-surface p-4 rounded-2xl">
                <div class="text-center">
                  <div class="text-2xl font-bold text-secondary mb-1">1.2k</div>
                  <div class="text-xs text-text-secondary">Active Citizens</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Reports Section -->
    <section class="recent-reports bg-background py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span
              class="claycard bg-gradient-to-r from-secondary/10 to-accent/10 text-secondary px-4 py-2 rounded-full text-sm font-medium"
            >
              🏘️ Community Activity
            </span>
          </div>
          <h2 class="text-4xl font-bold text-text-primary mb-4">Recent Community Reports</h2>
          <p class="text-xl text-text-secondary max-w-2xl mx-auto">
            See what issues your neighbors have reported and track their progress
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div
            v-for="report in recentReports"
            :key="report.id"
            class="claycard group p-6 hover:scale-105 transition-all duration-300 cursor-pointer bg-surface rounded-3xl"
            @click="viewReport(report.id)"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <h3
                  class="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors"
                >
                  {{ report.title }}
                </h3>
                <p class="text-sm text-text-secondary line-clamp-2">{{ report.description }}</p>
              </div>
              <StatusBadge :status="report.status" class="ml-4" />
            </div>

            <div class="mb-4">
              <div
                v-if="!imageLoaded && report.photo_url"
                class="w-full h-32 bg-gradient-to-br from-muted to-border rounded-2xl flex items-center justify-center"
              >
                <span class="text-text-muted text-sm">📸 Photo Available</span>
              </div>
              <img
                v-if="report.photo_url"
                v-show="imageLoaded"
                :src="report.photo_url"
                loading="lazy"
                class="w-full h-32 object-cover rounded-2xl"
                @load="imageLoaded = true"
              />
            </div>

            <div class="flex items-center justify-between text-xs text-text-muted">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-1">
                  <div class="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg class="w-2 h-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>{{ report.location }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <div class="w-4 h-4 bg-info/20 rounded-full flex items-center justify-center">
                    <svg class="w-2 h-2 text-info" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>{{ formatDate(report.created_at) }}</span>
                </div>
              </div>
              <div
                class="claycard bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ getCategoryLabel(report.category) }}
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <router-link
            to="/reports"
            class="claybutton inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-medium hover:scale-105 transition-all duration-200"
          >
            View All Reports
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section bg-surface py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span
              class="claycard bg-gradient-to-r from-accent/10 to-warning/10 text-accent px-4 py-2 rounded-full text-sm font-medium"
            >
              📊 Community Impact
            </span>
          </div>
          <h2 class="text-4xl font-bold text-text-primary mb-4">Making a Real Difference</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="stat-item text-center group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div
                  class="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform"
                >
                  {{ stats.totalReports }}
                </div>
                <div class="text-text-secondary font-medium">Issues Reported</div>
              </div>
            </div>
          </div>

          <div class="stat-item text-center group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-secondary/5 to-success/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg class="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  class="text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform"
                >
                  {{ stats.resolvedReports }}
                </div>
                <div class="text-text-secondary font-medium">Issues Resolved</div>
              </div>
            </div>
          </div>

          <div class="stat-item text-center group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-accent/5 to-warning/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg class="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                    ></path>
                  </svg>
                </div>
                <div
                  class="text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform"
                >
                  {{ stats.activeUsers }}
                </div>
                <div class="text-text-secondary font-medium">Active Citizens</div>
              </div>
            </div>
          </div>

          <div class="stat-item text-center group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-info/5 to-primary/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-info/20 to-info/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg class="w-8 h-8 text-info" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  class="text-4xl font-bold text-info mb-2 group-hover:scale-110 transition-transform"
                >
                  {{ stats.responseTime }}
                </div>
                <div class="text-text-secondary font-medium">Avg Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section
      id="how-it-works"
      ref="howItWorks"
      class="how-it-works bg-gradient-to-br from-background to-surface py-20"
    >
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span
              class="claycard bg-gradient-to-r from-info/10 to-primary/10 text-info px-4 py-2 rounded-full text-sm font-medium"
            >
              🚀 Simple Process
            </span>
          </div>
          <h2 class="text-4xl font-bold text-text-primary mb-4">How FixNet Works</h2>
          <p class="text-xl text-text-secondary max-w-3xl mx-auto">
            A simple three-step process to report issues and drive positive change in your community
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="step text-center group">
            <div
              class="claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                >
                  <span class="text-white text-2xl font-bold">1</span>
                </div>
                <h3 class="text-2xl font-bold text-text-primary mb-4">📱 Report the Issue</h3>
                <p class="text-text-secondary leading-relaxed">
                  Snap a photo, pin the location on our interactive map, and describe the problem.
                  Our system automatically categorizes and routes your report.
                </p>
              </div>
            </div>
          </div>

          <div class="step text-center group">
            <div
              class="claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                >
                  <span class="text-white text-2xl font-bold">2</span>
                </div>
                <h3 class="text-2xl font-bold text-text-primary mb-4">🏛️ Agency Review</h3>
                <p class="text-text-secondary leading-relaxed">
                  The relevant municipal department receives your report instantly. They assess the
                  issue and provide timeline estimates for resolution.
                </p>
              </div>
            </div>
          </div>

          <div class="step text-center group">
            <div
              class="claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-accent/5 to-info/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-20 h-20 bg-gradient-to-br from-accent to-info rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                >
                  <span class="text-white text-2xl font-bold">3</span>
                </div>
                <h3 class="text-2xl font-bold text-text-primary mb-4">📊 Track Progress</h3>
                <p class="text-text-secondary leading-relaxed">
                  Receive real-time updates on your report's status. See before and after photos
                  when the issue is resolved and celebrate community improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features-section bg-surface py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span
              class="claycard bg-gradient-to-r from-success/10 to-secondary/10 text-success px-4 py-2 rounded-full text-sm font-medium"
            >
              ⚡ Powerful Features
            </span>
          </div>
          <h2 class="text-4xl font-bold text-text-primary mb-4">Everything You Need</h2>
          <p class="text-xl text-text-secondary">Built for communities, designed for impact</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="feature-card group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                  <svg class="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-3">📱 Easy Reporting</h3>
                <p class="text-text-secondary">
                  Simple, intuitive interface for quick issue submission with photo upload and GPS
                  location.
                </p>
              </div>
            </div>
          </div>

          <div class="feature-card group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-secondary/5 to-success/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                  <svg class="w-7 h-7 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-3">📊 Real-time Tracking</h3>
                <p class="text-text-secondary">
                  Monitor your reports from submission to completion with detailed status updates.
                </p>
              </div>
            </div>
          </div>

          <div class="feature-card group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-accent/5 to-warning/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                  <svg class="w-7 h-7 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-3">🏘️ Community Impact</h3>
                <p class="text-text-secondary">
                  See community-wide statistics and celebrate collective achievements in local
                  improvements.
                </p>
              </div>
            </div>
          </div>

          <div class="feature-card group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-info/5 to-primary/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-info/20 to-info/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                  <svg class="w-7 h-7 text-info" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-3">🏛️ Agency Dashboard</h3>
                <p class="text-text-secondary">
                  Dedicated portals for municipal agencies to efficiently manage and respond to
                  citizen reports.
                </p>
              </div>
            </div>
          </div>

          <div class="feature-card group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-warning/5 to-accent/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-warning/20 to-warning/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                  <svg class="w-7 h-7 text-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-3">📈 Data Analytics</h3>
                <p class="text-text-secondary">
                  Comprehensive reporting and analytics to identify trends and prioritize community
                  needs.
                </p>
              </div>
            </div>
          </div>

          <div class="feature-card group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-success/5 to-secondary/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-success/20 to-success/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                  <svg class="w-7 h-7 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    ></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-3">🔔 Smart Notifications</h3>
                <p class="text-text-secondary">
                  Automatic updates via email and in-app notifications to keep you informed
                  throughout the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="cta-section bg-gradient-to-br from-primary via-secondary to-accent text-white py-20 relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="container mx-auto px-6 text-center relative z-10">
        <div class="max-w-4xl mx-auto">
          <div class="inline-block mb-6">
            <span
              class="claycard bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium"
            >
              🌟 Join the Movement
            </span>
          </div>

          <h2 class="text-4xl lg:text-6xl font-bold mb-6">Ready to Fix Your Area?</h2>
          <p class="text-xl mb-12 max-w-2xl mx-auto text-white/90 leading-relaxed">
            Join thousands of citizens making a real difference in their communities. Your report
            could be the catalyst for positive change.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/auth"
              class="claybutton group inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border-0 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <div class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              Start Reporting Issues
              <svg
                class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { mockReports, type Report } from '@/data/mockData'
import StatusBadge from '@/components/shared/StatusBadge.vue'

const router = useRouter()
const howItWorks: Ref<HTMLElement | null> = ref(null)
const imageLoaded = ref(false)

// Recent reports (show first 6)
const recentReports = computed(() => mockReports.slice(0, 6))

// Calculate stats from mock data
const stats = computed(() => {
  const totalReports = mockReports.length
  const resolvedReports = mockReports.filter((r) => r.status === 'resolved').length
  const activeUsers = '1.2k' // Mock number
  const responseTime = '2.3 days' // Mock average

  return {
    totalReports,
    resolvedReports,
    activeUsers,
    responseTime,
  }
})

const scrollToHow = () => {
  if (howItWorks.value) {
    howItWorks.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const viewReport = (reportId: string) => {
  router.push(`/report/${reportId}`)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    roads: 'Roads',
    electricity: 'Electrical',
    water: 'Water',
    waste: 'Waste',
    safety: 'Safety',
    other: 'Other',
  }
  return labels[category] || category
}
</script>

<style scoped>
.landing-page {
  overflow-x: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
