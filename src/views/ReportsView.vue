<template>
    <div class="min-h-screen bg-background py-20">
      <div class="container mx-auto px-6">
        <div class="max-w-7xl mx-auto">
          <!-- Reports Header -->
          <ReportsHeader :stats="reportsStats" />
  
          <!-- Main Content -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Filters Sidebar -->
            <div class="lg:col-span-1">
              <ReportsFilters 
                v-model:status="filters.status"
                v-model:category="filters.category"
                v-model:priority="filters.priority"
                v-model:dateRange="filters.dateRange"
                @clear="clearFilters"
              />
            </div>
  
            <!-- Main Content Area -->
            <div class="lg:col-span-3 space-y-6">
              <!-- Search and Controls -->
              <div class="claycard bg-surface rounded-3xl p-6">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div class="flex-1">
                    <ReportsSearch v-model="searchQuery" />
                  </div>
                  
                  <div class="flex items-center gap-3">
                    <ReportsSorting v-model="sortBy" />
                    
                    <!-- View Toggle -->
                    <div class="claycard bg-background border border-border rounded-xl p-1 flex">
                      <button
                        @click="viewMode = 'grid'"
                        class="claybutton px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        :class="viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:text-primary'"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                      <button
                        @click="viewMode = 'map'"
                        class="claybutton px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        :class="viewMode === 'map' ? 'bg-primary text-white' : 'text-text-secondary hover:text-primary'"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Results Summary -->
                <div class="mt-4 flex items-center justify-between text-sm text-text-muted">
                  <span>{{ filteredReports.length }} report{{ filteredReports.length !== 1 ? 's' : '' }} found</span>
                  <button
                    v-if="hasActiveFilters"
                    @click="clearFilters"
                    class="text-primary hover:text-secondary font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
  
              <!-- Grid View -->
              <div v-if="viewMode === 'grid'">
                <ReportsGrid 
                  :reports="paginatedReports"
                  @view-report="viewReport"
                />
                
                <!-- Pagination -->
                <ReportsPagination
                  v-if="totalPages > 1"
                  :current-page="currentPage"
                  :total-pages="totalPages"
                  :total-items="filteredReports.length"
                  @page-change="handlePageChange"
                />
              </div>
  
              <!-- Map View -->
              <div v-else>
                <ReportsMap 
                  :reports="filteredReports"
                  @view-report="viewReport"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, reactive, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { mockReports, type Report } from '@/data/mockData'
  import ReportsHeader from '@/components/reports/ReportsHeader.vue'
  import ReportsFilters from '@/components/reports/ReportsFilters.vue'
  import ReportsSearch from '@/components/reports/ReportsSearch.vue'
  import ReportsSorting from '@/components/reports/ReportsSorting.vue'
  import ReportsGrid from '@/components/reports/ReportsGrid.vue'
  import ReportsMap from '@/components/reports/ReportsMap.vue'
  import ReportsPagination from '@/components/reports/ReportsPagination.vue'
  
  const router = useRouter()
  
  // State
  const searchQuery = ref('')
  const viewMode = ref<'grid' | 'map'>('grid')
  const sortBy = ref<'newest' | 'oldest' | 'priority' | 'status'>('newest')
  const currentPage = ref(1)
  const itemsPerPage = 12
  
  // Filters
  const filters = reactive({
    status: 'all' as 'all' | 'pending' | 'under_review' | 'resolved' | 'rejected',
    category: 'all' as 'all' | 'roads' | 'electricity' | 'water' | 'waste' | 'safety' | 'other',
    priority: 'all' as 'all' | 'high' | 'medium' | 'low',
    dateRange: 'all' as 'all' | 'today' | 'week' | 'month' | 'year'
  })
  
  // Calculate stats
  const reportsStats = computed(() => {
    const total = mockReports.length
    const pending = mockReports.filter(r => r.status === 'pending').length
    const resolved = mockReports.filter(r => r.status === 'resolved').length
    const thisMonth = mockReports.filter(r => {
      const reportDate = new Date(r.created_at)
      const now = new Date()
      return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear()
    }).length
  
    return { total, pending, resolved, thisMonth }
  })
  
  // Check if filters are active
  const hasActiveFilters = computed(() => {
    return filters.status !== 'all' || 
           filters.category !== 'all' || 
           filters.priority !== 'all' || 
           filters.dateRange !== 'all' ||
           searchQuery.value.trim() !== ''
  })
  
  // Filter reports
  const filteredReports = computed(() => {
    let reports = [...mockReports]
  
    // Apply search
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      reports = reports.filter(report => 
        report.title.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.location.toLowerCase().includes(query)
      )
    }
  
    // Apply filters
    if (filters.status !== 'all') {
      reports = reports.filter(report => report.status === filters.status)
    }
  
    if (filters.category !== 'all') {
      reports = reports.filter(report => report.category === filters.category)
    }
  
    if (filters.priority !== 'all') {
      reports = reports.filter(report => report.priority === filters.priority)
    }
  
    if (filters.dateRange !== 'all') {
      const now = new Date()
      const filterDate = new Date()
  
      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }
  
      reports = reports.filter(report => new Date(report.created_at) >= filterDate)
    }
  
    // Apply sorting
    switch (sortBy.value) {
      case 'newest':
        reports.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'oldest':
        reports.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case 'priority':
        const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 }
        reports.sort((a, b) => priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder])
        break
      case 'status':
        const statusOrder = { 'pending': 0, 'under_review': 1, 'resolved': 2, 'rejected': 3 }
        reports.sort((a, b) => statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder])
        break
    }
  
    return reports
  })
  
  // Pagination
  const totalPages = computed(() => Math.ceil(filteredReports.value.length / itemsPerPage))
  
  const paginatedReports = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredReports.value.slice(start, end)
  })
  
  // Reset pagination when filters change
  watch([searchQuery, filters, sortBy], () => {
    currentPage.value = 1
  })
  
  const clearFilters = () => {
    filters.status = 'all'
    filters.category = 'all'
    filters.priority = 'all'
    filters.dateRange = 'all'
    searchQuery.value = ''
    currentPage.value = 1
  }
  
  const handlePageChange = (page: number) => {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const viewReport = (reportId: string) => {
    router.push(`/report/${reportId}`)
  }
  </script>