<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section
      class="hero-section bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 min-h-screen flex items-center relative overflow-hidden"
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
                🏛️ For Government Agencies
              </span>
            </div>

            <h1 class="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Streamline
              <span
                class="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              >
                Citizen Services
              </span>
              <br />
              <span class="text-3xl lg:text-5xl text-text-secondary font-medium">
                With FixNet
              </span>
            </h1>

            <p class="text-xl mb-8 text-text-secondary leading-relaxed max-w-xl">
              Empower your agency with a modern platform that connects you directly with citizens,
              streamlines report management, and improves community satisfaction.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                @click="scrollToContact"
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
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                Partner With Us
                <svg
                  class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                @click="scrollToBenefits"
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z"
                  />
                </svg>
                View Benefits
              </button>
            </div>
          </div>

          <div class="lg:w-1/2">
            <div class="relative">
              <!-- Agency Dashboard Preview -->
              <div
                class="claycard bg-surface p-8 rounded-3xl transform hover:rotate-1 transition-transform duration-700 relative z-10"
              >
                <div class="flex items-center gap-3 mb-6">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-primary"
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
                    <h3 class="font-semibold text-text-primary">Agency Dashboard</h3>
                    <p class="text-text-secondary text-sm">Real-time report management</p>
                  </div>
                </div>

                <div class="space-y-3 mb-4">
                  <div class="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <span class="text-sm text-text-primary">Pending Reports</span>
                    <span
                      class="bg-warning/20 text-warning px-2 py-1 rounded-full text-xs font-medium"
                      >24</span
                    >
                  </div>
                  <div class="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <span class="text-sm text-text-primary">Under Review</span>
                    <span class="bg-info/20 text-info px-2 py-1 rounded-full text-xs font-medium"
                      >12</span
                    >
                  </div>
                  <div class="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <span class="text-sm text-text-primary">Resolved Today</span>
                    <span
                      class="bg-success/20 text-success px-2 py-1 rounded-full text-xs font-medium"
                      >8</span
                    >
                  </div>
                </div>

                <div class="text-center">
                  <span class="text-xs text-text-muted">Efficient • Organized • Transparent</span>
                </div>
              </div>

              <!-- Floating Stats -->
              <div class="absolute -top-6 -right-6 claycard bg-surface p-4 rounded-2xl">
                <div class="text-center">
                  <div class="text-2xl font-bold text-secondary mb-1">98%</div>
                  <div class="text-xs text-text-secondary">Satisfaction</div>
                </div>
              </div>

              <div class="absolute -bottom-6 -left-6 claycard bg-surface p-4 rounded-2xl">
                <div class="text-center">
                  <div class="text-2xl font-bold text-accent mb-1">2.5x</div>
                  <div class="text-xs text-text-secondary">Faster Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Agency Stats Section -->
    <section class="agency-stats bg-surface py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span
              class="claycard bg-gradient-to-r from-success/10 to-secondary/10 text-success px-4 py-2 rounded-full text-sm font-medium"
            >
              📊 Proven Results
            </span>
          </div>
          <h2 class="text-4xl font-bold text-text-primary mb-4">Agencies See Real Impact</h2>
          <p class="text-xl text-text-secondary max-w-2xl mx-auto">
            Join municipalities that have transformed their citizen services with FixNet
          </p>
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
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  class="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform"
                >
                  45+
                </div>
                <div class="text-text-secondary font-medium">Partner Agencies</div>
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
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  class="text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform"
                >
                  2.3 days
                </div>
                <div class="text-text-secondary font-medium">Avg Response Time</div>
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
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div
                  class="text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform"
                >
                  94%
                </div>
                <div class="text-text-secondary font-medium">Resolution Rate</div>
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
                      d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                    ></path>
                  </svg>
                </div>
                <div
                  class="text-4xl font-bold text-info mb-2 group-hover:scale-110 transition-transform"
                >
                  98%
                </div>
                <div class="text-text-secondary font-medium">Citizen Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" ref="benefitsSection" class="benefits bg-background py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span
              class="claycard bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
            >
              ⚡ Why Choose FixNet
            </span>
          </div>
          <h2 class="text-4xl font-bold text-text-primary mb-4">Benefits for Your Agency</h2>
          <p class="text-xl text-text-secondary">
            Streamline operations, improve efficiency, and enhance citizen satisfaction
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="benefit-card group">
            <div
              class="claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                  <svg class="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-3">🎯 Centralized Management</h3>
                <p class="text-text-secondary">
                  All citizen reports in one organized dashboard. No more scattered emails, phone
                  calls, or lost paperwork.
                </p>
              </div>
            </div>
          </div>

          <div class="benefit-card group">
            <div
              class="claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
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
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-3">⚡ Faster Response Times</h3>
                <p class="text-text-secondary">
                  Automated routing and prioritization help you respond to urgent issues faster than
                  ever before.
                </p>
              </div>
            </div>
          </div>

          <div class="benefit-card group">
            <div
              class="claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
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
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-3">📊 Data-Driven Insights</h3>
                <p class="text-text-secondary">
                  Analytics and reporting help you identify trends, allocate resources efficiently,
                  and plan better.
                </p>
              </div>
            </div>
          </div>

          <div class="benefit-card group">
            <div
              class="claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
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
                <h3 class="text-xl font-bold text-text-primary mb-3">🤝 Improved Transparency</h3>
                <p class="text-text-secondary">
                  Citizens can track progress in real-time, building trust and reducing follow-up
                  inquiries.
                </p>
              </div>
            </div>
          </div>

          <div class="benefit-card group">
            <div
              class="claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
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
                      fill-rule="evenodd"
                      d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4z"
                      clip-rule="evenodd"
                    />
                    <path
                      d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-3">💰 Cost Effective</h3>
                <p class="text-text-secondary">
                  Reduce administrative overhead and improve resource allocation with automated
                  workflows.
                </p>
              </div>
            </div>
          </div>

          <div class="benefit-card group">
            <div
              class="claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300 h-full relative overflow-hidden"
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
                      fill-rule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-3">🚀 Easy Implementation</h3>
                <p class="text-text-secondary">
                  Quick setup with minimal IT requirements. Our team provides full onboarding
                  support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works for Agencies -->
    <section class="agency-workflow bg-surface py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span
              class="claycard bg-gradient-to-r from-info/10 to-primary/10 text-info px-4 py-2 rounded-full text-sm font-medium"
            >
              🔄 Simple Workflow
            </span>
          </div>
          <h2 class="text-4xl font-bold text-text-primary mb-4">How It Works for Agencies</h2>
          <p class="text-xl text-text-secondary max-w-3xl mx-auto">
            A streamlined process that integrates seamlessly with your existing operations
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="step text-center group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
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
                <h3 class="text-2xl font-bold text-text-primary mb-4">📥 Receive Reports</h3>
                <p class="text-text-secondary leading-relaxed">
                  Citizens submit detailed reports with photos and locations. All reports are
                  automatically categorized and routed to your department.
                </p>
              </div>
            </div>
          </div>

          <div class="step text-center group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
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
                <h3 class="text-2xl font-bold text-text-primary mb-4">⚙️ Manage & Prioritize</h3>
                <p class="text-text-secondary leading-relaxed">
                  Use your admin dashboard to review, prioritize, and assign reports. Filter by
                  urgency, location, or category.
                </p>
              </div>
            </div>
          </div>

          <div class="step text-center group">
            <div
              class="claycard bg-background p-8 rounded-3xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
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
                <h3 class="text-2xl font-bold text-text-primary mb-4">📢 Update & Communicate</h3>
                <p class="text-text-secondary leading-relaxed">
                  Update report status and add comments. Citizens receive automatic notifications
                  about progress and resolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials bg-background py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span
              class="claycard bg-gradient-to-r from-success/10 to-secondary/10 text-success px-4 py-2 rounded-full text-sm font-medium"
            >
              💬 Success Stories
            </span>
          </div>
          <h2 class="text-4xl font-bold text-text-primary mb-4">What Agencies Say</h2>
          <p class="text-xl text-text-secondary">
            Hear from municipal partners who've transformed their citizen services
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="testimonial claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
              >
                <span class="text-primary font-bold text-lg">MC</span>
              </div>
              <div>
                <h4 class="font-semibold text-text-primary">Maria Chen</h4>
                <p class="text-sm text-text-secondary">City Manager, Springfield</p>
              </div>
            </div>
            <p class="text-text-primary leading-relaxed mb-4">
              "FixNet has revolutionized how we handle citizen reports. Our response time improved
              by 60% and citizen satisfaction is at an all-time high."
            </p>
            <div class="flex items-center gap-1">
              <svg class="w-5 h-5 text-warning fill-current" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span class="text-sm text-text-secondary">5/5 Rating</span>
            </div>
          </div>

          <div
            class="testimonial claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center"
              >
                <span class="text-secondary font-bold text-lg">DM</span>
              </div>
              <div>
                <h4 class="font-semibold text-text-primary">David Miller</h4>
                <p class="text-sm text-text-secondary">Public Works Director, Riverside</p>
              </div>
            </div>
            <p class="text-text-primary leading-relaxed mb-4">
              "The dashboard is incredibly intuitive. Our team was up and running within days, and
              we've never been more organized with citizen requests."
            </p>
            <div class="flex items-center gap-1">
              <svg class="w-5 h-5 text-warning fill-current" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span class="text-sm text-text-secondary">5/5 Rating</span>
            </div>
          </div>

          <div
            class="testimonial claycard bg-surface p-8 rounded-3xl hover:scale-105 transition-all duration-300"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-12 h-12 bg-gradient-to-br from-accent/20 to-info/20 rounded-full flex items-center justify-center"
              >
                <span class="text-accent font-bold text-lg">SP</span>
              </div>
              <div>
                <h4 class="font-semibold text-text-primary">Sarah Park</h4>
                <p class="text-sm text-text-secondary">Communications Director, Metro City</p>
              </div>
            </div>
            <p class="text-text-primary leading-relaxed mb-4">
              "The transparency FixNet provides has significantly improved our relationship with
              citizens. They can see we're working on their concerns."
            </p>
            <div class="flex items-center gap-1">
              <svg class="w-5 h-5 text-warning fill-current" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span class="text-sm text-text-secondary">5/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section
      id="contact"
      ref="contactSection"
      class="contact bg-gradient-to-br from-primary via-secondary to-accent text-white py-20 relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="container mx-auto px-6 text-center relative z-10">
        <div class="max-w-4xl mx-auto">
          <div class="inline-block mb-6">
            <span
              class="claycard bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium"
            >
              🤝 Partner With Us
            </span>
          </div>

          <h2 class="text-4xl lg:text-6xl font-bold mb-6">
            Ready to Transform Your Citizen Services?
          </h2>
          <p class="text-xl mb-12 max-w-2xl mx-auto text-white/90 leading-relaxed">
            Join the growing network of agencies using FixNet to build stronger communities. Get
            started today with a free consultation.
          </p>

          <!-- Contact Form -->
          <div class="claycard bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto">
            <form @submit.prevent="handleContactSubmit" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    v-model="contactForm.firstName"
                    type="text"
                    placeholder="First Name"
                    class="clayinput w-full px-4 py-3 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>
                <div>
                  <input
                    v-model="contactForm.lastName"
                    type="text"
                    placeholder="Last Name"
                    class="clayinput w-full px-4 py-3 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    v-model="contactForm.email"
                    type="email"
                    placeholder="Email Address"
                    class="clayinput w-full px-4 py-3 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>
                <div>
                  <input
                    v-model="contactForm.phone"
                    type="tel"
                    placeholder="Phone Number"
                    class="clayinput w-full px-4 py-3 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    v-model="contactForm.agency"
                    type="text"
                    placeholder="Agency/Department Name"
                    class="clayinput w-full px-4 py-3 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>
                <div>
                  <input
                    v-model="contactForm.title"
                    type="text"
                    placeholder="Your Title/Position"
                    class="clayinput w-full px-4 py-3 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
              </div>

              <div>
                <textarea
                  v-model="contactForm.message"
                  placeholder="Tell us about your agency's needs and challenges..."
                  rows="4"
                  class="clayinput w-full px-4 py-3 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmittingContact"
                class="claybutton w-full inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 active:scale-95 transition-all duration-200 border-0 focus:outline-none focus:ring-2 focus:ring-white/30"
                :class="{ 'opacity-50 cursor-not-allowed': isSubmittingContact }"
              >
                <div
                  v-if="isSubmittingContact"
                  class="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"
                ></div>
                <svg
                  v-else
                  class="w-6 h-6"
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
                {{ isSubmittingContact ? 'Sending...' : 'Request Partnership Info' }}
              </button>
            </form>

            <div
              v-if="contactSuccess"
              class="mt-6 p-4 bg-success/20 border border-success/30 rounded-xl"
            >
              <p class="text-white font-medium">✅ Thank you! We'll contact you within 24 hours.</p>
            </div>
          </div>

          <!-- Alternative Contact Methods -->
          <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="claycard bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-6 h-6 text-white"
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
              </div>
              <h4 class="font-semibold text-white mb-2">Email Us</h4>
              <p class="text-white/80 text-sm">partnerships@fixnet.com</p>
            </div>

            <div class="claycard bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h4 class="font-semibold text-white mb-2">Call Us</h4>
              <p class="text-white/80 text-sm">+1 (555) 123-4567</p>
            </div>

            <div class="claycard bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 7V3a4 4 0 118 0v4m-4 0v12m0-12h4a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
                  />
                </svg>
              </div>
              <h4 class="font-semibold text-white mb-2">Schedule Demo</h4>
              <p class="text-white/80 text-sm">Book a personalized demo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue'

const benefitsSection: Ref<HTMLElement | null> = ref(null)
const contactSection: Ref<HTMLElement | null> = ref(null)

const contactForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  agency: '',
  title: '',
  message: '',
})

const isSubmittingContact = ref(false)
const contactSuccess = ref(false)

const scrollToBenefits = () => {
  if (benefitsSection.value) {
    benefitsSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToContact = () => {
  if (contactSection.value) {
    contactSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleContactSubmit = async () => {
  isSubmittingContact.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    Object.keys(contactForm).forEach((key) => {
      contactForm[key as keyof typeof contactForm] = ''
    })

    contactSuccess.value = true

    // Hide success message after 5 seconds
    setTimeout(() => {
      contactSuccess.value = false
    }, 5000)
  } catch (error) {
    console.error('Failed to submit contact form:', error)
  } finally {
    isSubmittingContact.value = false
  }
}
</script>

<style scoped>
.landing-page {
  overflow-x: hidden;
}

.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.stat-item {
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.step {
  transition: transform 0.3s ease;
}

.step:hover {
  transform: translateY(-10px);
}

.benefit-card {
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
}

.testimonial {
  transition: transform 0.3s ease;
}

.testimonial:hover {
  transform: translateY(-5px);
}
</style>
