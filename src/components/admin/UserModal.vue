<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Modal Overlay -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>

        <!-- Modal Content -->
        <div
          class="claycard bg-surface rounded-3xl max-w-2xl w-full relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div class="p-8">
            <!-- Modal Header -->
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-text-primary">
                {{ mode === 'add' ? 'Add New User' : 'Edit User' }}
              </h2>
              <button
                @click="$emit('close')"
                class="claybutton w-10 h-10 bg-muted hover:bg-border text-text-secondary rounded-xl flex items-center justify-center transition-all duration-200"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- User Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Personal Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">
                    First Name
                    <span class="text-error">*</span>
                  </label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl transition-all duration-200"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">
                    Last Name
                    <span class="text-error">*</span>
                  </label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl transition-all duration-200"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">
                  Email Address
                  <span class="text-error">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl transition-all duration-200"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <!-- Role and Status -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">
                    Role
                    <span class="text-error">*</span>
                  </label>
                  <select
                    v-model="form.role"
                    class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                    required
                  >
                    <option value="resident">👤 Resident</option>
                    <option value="agency_staff">🏢 Agency Staff</option>
                    <option value="admin">👨‍💼 Admin</option>
                    <option value="super_admin">⚡ Super Admin</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2"> Status </label>
                  <select
                    v-model="form.status"
                    class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="active">✅ Active</option>
                    <option value="inactive">⏸️ Inactive</option>
                    <option value="suspended">🚫 Suspended</option>
                  </select>
                </div>
              </div>

              <!-- Agency (if applicable) -->
              <div v-if="['agency_staff', 'admin', 'super_admin'].includes(form.role)">
                <label class="block text-sm font-medium text-text-secondary mb-2">
                  Agency/Department
                </label>
                <input
                  v-model="form.agency"
                  type="text"
                  class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl transition-all duration-200"
                  placeholder="Enter agency or department name"
                />
              </div>

              <!-- Password (for new users) -->
              <div v-if="mode === 'add'">
                <label class="block text-sm font-medium text-text-secondary mb-2">
                  Password
                  <span class="text-error">*</span>
                </label>
                <input
                  v-model="form.password"
                  type="password"
                  class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl transition-all duration-200"
                  placeholder="Enter password"
                  required
                />
              </div>

              <!-- Additional Settings -->
              <div class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl">
                <h3 class="font-semibold text-text-primary mb-4">Additional Settings</h3>

                <div class="space-y-3">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      v-model="form.contactEnabled"
                      type="checkbox"
                      class="clayinput w-4 h-4 text-primary rounded border-border focus:ring-primary/30"
                    />
                    <div>
                      <div class="font-medium text-text-primary">Allow Contact</div>
                      <div class="text-sm text-text-secondary">
                        Allow other users to contact this user
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-4 pt-6">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="claybutton flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-all duration-200"
                  :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
                >
                  <div
                    v-if="isSubmitting"
                    class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  ></div>
                  <svg
                    v-else
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ isSubmitting ? 'Saving...' : mode === 'add' ? 'Create User' : 'Update User' }}
                </button>

                <button
                  type="button"
                  @click="$emit('close')"
                  :disabled="isSubmitting"
                  class="claybutton px-6 py-3 border border-border text-text-secondary bg-surface rounded-2xl font-medium hover:bg-muted transition-all duration-200"
                  :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { type User } from '@/data/mockData'

interface Props {
  show: boolean
  user: User | null
  mode: 'add' | 'edit'
}

interface Emits {
  close: []
  save: [userData: Partial<User>]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  role: 'resident' as User['role'],
  status: 'active' as User['status'],
  agency: '',
  password: '',
  contactEnabled: false,
})

const isSubmitting = ref(false)

// Watch for user changes and populate form
watch(
  () => props.user,
  (user) => {
    if (user && props.mode === 'edit') {
      form.firstName = user.first_name
      form.lastName = user.last_name
      form.email = user.email
      form.role = user.role
      form.status = user.status
      form.agency = user.agency || ''
      form.contactEnabled = user.contact_enabled || false
    } else {
      // Reset form for add mode
      form.firstName = ''
      form.lastName = ''
      form.email = ''
      form.role = 'resident'
      form.status = 'active'
      form.agency = ''
      form.password = ''
      form.contactEnabled = false
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData: Partial<User> = {
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      email: form.email.trim(),
      role: form.role,
      status: form.status,
      contact_enabled: form.contactEnabled,
    }

    if (form.agency.trim()) {
      userData.agency = form.agency.trim()
    }

    if (props.mode === 'add' && form.password) {
      userData.password = form.password
    }

    emit('save', userData)
  } catch (error) {
    console.error('Failed to save user:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
