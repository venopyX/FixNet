<template>
  <div class="min-h-screen bg-background py-20">
    <div class="container mx-auto px-6">
      <div class="max-w-7xl mx-auto space-y-8">
        <!-- User Management Header -->
        <UserManagementHeader
          :stats="userStats"
          :selected-users="selectedUsers"
          @add-user="openAddUserModal"
          @bulk-action="handleBulkAction"
          @export="exportUsers"
        />

        <!-- Filters and Search -->
        <div class="claycard bg-surface rounded-3xl p-6">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div class="flex-1">
              <UserSearch v-model="searchQuery" />
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <UserFilters
                v-model:role="filters.role"
                v-model:status="filters.status"
                v-model:agency="filters.agency"
                v-model:dateRange="filters.dateRange"
                @clear="clearFilters"
              />
            </div>
          </div>

          <!-- Results Summary -->
          <div class="mt-4 flex items-center justify-between text-sm text-text-muted">
            <span
              >{{ filteredUsers.length }} user{{
                filteredUsers.length !== 1 ? 's' : ''
              }}
              found</span
            >
            <button
              v-if="hasActiveFilters"
              @click="clearFilters"
              class="text-primary hover:text-secondary font-medium"
            >
              Clear all filters
            </button>
          </div>
        </div>

        <!-- Users Table -->
        <UserTable
          :users="paginatedUsers"
          :selected-users="selectedUsers"
          :sort-by="sortBy"
          :sort-order="sortOrder"
          @select-user="toggleUserSelection"
          @select-all="toggleSelectAll"
          @sort="handleSort"
          @edit-user="openEditUserModal"
          @view-profile="viewUserProfile"
          @toggle-status="toggleUserStatus"
        />

        <!-- Pagination -->
        <UserPagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="filteredUsers.length"
          @page-change="handlePageChange"
        />

        <!-- User Modal -->
        <UserModal
          :show="showUserModal"
          :user="editingUser"
          :mode="modalMode"
          @close="closeUserModal"
          @save="handleUserSave"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { mockUsers, type User } from '@/data/mockData'
import { currentUser } from '@/utils/auth'
import UserManagementHeader from '@/components/admin/UserManagementHeader.vue'
import UserSearch from '@/components/admin/UserSearch.vue'
import UserFilters from '@/components/admin/UserFilters.vue'
import UserTable from '@/components/admin/UserTable.vue'
import UserPagination from '@/components/admin/UserPagination.vue'
import UserModal from '@/components/admin/UserModal.vue'

const router = useRouter()

// Check if current user is super admin
if (currentUser.value?.role !== 'super_admin') {
  router.push('/admin')
}

// State
const searchQuery = ref('')
const selectedUsers = ref<string[]>([])
const sortBy = ref<keyof User>('created_at')
const sortOrder = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const itemsPerPage = 10

// Modal state
const showUserModal = ref(false)
const editingUser = ref<User | null>(null)
const modalMode = ref<'add' | 'edit'>('add')

// Filters
const filters = reactive({
  role: 'all' as 'all' | 'resident' | 'agency_staff' | 'admin' | 'super_admin',
  status: 'all' as 'all' | 'active' | 'inactive' | 'suspended',
  agency: 'all' as string,
  dateRange: 'all' as 'all' | 'today' | 'week' | 'month' | 'year',
})

// Calculate user stats
const userStats = computed(() => {
  const total = mockUsers.length
  const residents = mockUsers.filter((u) => u.role === 'resident').length
  const staff = mockUsers.filter((u) => u.role === 'agency_staff').length
  const admins = mockUsers.filter((u) => ['admin', 'super_admin'].includes(u.role)).length
  const active = mockUsers.filter((u) => u.status === 'active').length
  const suspended = mockUsers.filter((u) => u.status === 'suspended').length

  return { total, residents, staff, admins, active, suspended }
})

// Check if filters are active
const hasActiveFilters = computed(() => {
  return (
    filters.role !== 'all' ||
    filters.status !== 'all' ||
    filters.agency !== 'all' ||
    filters.dateRange !== 'all' ||
    searchQuery.value.trim() !== ''
  )
})

// Filter users
const filteredUsers = computed(() => {
  let users = [...mockUsers]

  // Apply search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    users = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(query) ||
        user.last_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        (user.agency && user.agency.toLowerCase().includes(query)),
    )
  }

  // Apply filters
  if (filters.role !== 'all') {
    users = users.filter((user) => user.role === filters.role)
  }

  if (filters.status !== 'all') {
    users = users.filter((user) => user.status === filters.status)
  }

  if (filters.agency !== 'all') {
    users = users.filter((user) => user.agency === filters.agency)
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

    users = users.filter((user) => new Date(user.created_at) >= filterDate)
  }

  // Apply sorting
  users.sort((a, b) => {
    const aValue = a[sortBy.value]
    const bValue = b[sortBy.value]

    if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })

  return users
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredUsers.value.slice(start, end)
})

// Reset pagination when filters change
watch([searchQuery, filters, sortBy, sortOrder], () => {
  currentPage.value = 1
  selectedUsers.value = []
})

const clearFilters = () => {
  filters.role = 'all'
  filters.status = 'all'
  filters.agency = 'all'
  filters.dateRange = 'all'
  searchQuery.value = ''
  currentPage.value = 1
  selectedUsers.value = []
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSort = (column: keyof User) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortOrder.value = 'asc'
  }
}

const toggleUserSelection = (userId: string) => {
  const index = selectedUsers.value.indexOf(userId)
  if (index > -1) {
    selectedUsers.value.splice(index, 1)
  } else {
    selectedUsers.value.push(userId)
  }
}

const toggleSelectAll = () => {
  if (selectedUsers.value.length === paginatedUsers.value.length) {
    selectedUsers.value = []
  } else {
    selectedUsers.value = paginatedUsers.value.map((u) => u.id)
  }
}

const openAddUserModal = () => {
  editingUser.value = null
  modalMode.value = 'add'
  showUserModal.value = true
}

const openEditUserModal = (user: User) => {
  editingUser.value = user
  modalMode.value = 'edit'
  showUserModal.value = true
}

const closeUserModal = () => {
  showUserModal.value = false
  editingUser.value = null
}

const handleUserSave = (userData: Partial<User>) => {
  if (modalMode.value === 'add') {
    // Add new user
    const newUser: User = {
      id: String(mockUsers.length + 1),
      first_name: userData.first_name!,
      last_name: userData.last_name!,
      email: userData.email!,
      password: 'hashedpassword',
      role: userData.role!,
      status: userData.status || 'active',
      contact_enabled: userData.contact_enabled || false,
      agency: userData.agency,
      permissions: userData.permissions || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    mockUsers.push(newUser)
  } else if (editingUser.value) {
    // Update existing user
    const index = mockUsers.findIndex((u) => u.id === editingUser.value!.id)
    if (index !== -1) {
      mockUsers[index] = {
        ...mockUsers[index],
        ...userData,
        updated_at: new Date().toISOString(),
      }
    }
  }

  closeUserModal()
}

const viewUserProfile = (userId: string) => {
  router.push(`/profile/${userId}`)
}

const toggleUserStatus = (userId: string, newStatus: User['status']) => {
  const user = mockUsers.find((u) => u.id === userId)
  if (user) {
    user.status = newStatus
    user.updated_at = new Date().toISOString()
  }
}

const handleBulkAction = (action: string) => {
  console.log('Bulk action:', action, 'for users:', selectedUsers.value)
  // Implement bulk actions here
}

const exportUsers = (format: string) => {
  console.log('Export users as:', format)
  // Implement export functionality here
}
</script>
