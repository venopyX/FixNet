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
              <h2 class="text-2xl font-bold text-text-primary">Edit Profile</h2>
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

            <!-- Profile Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6" v-if="user">
              <!-- Avatar Section -->
              <div class="text-center mb-6">
                <div class="inline-block relative">
                  <div
                    class="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <span class="text-3xl font-bold text-primary">
                      {{ getInitials(form.firstName, form.lastName) }}
                    </span>
                  </div>
                  <button
                    type="button"
                    class="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
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
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
                <p class="text-sm text-text-muted">Click to change avatar (Coming Soon)</p>
              </div>

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
                    :class="{ 'border-error focus:ring-error/20': errors.firstName }"
                    placeholder="Enter first name"
                    required
                  />
                  <p v-if="errors.firstName" class="text-sm text-error mt-1">
                    {{ errors.firstName }}
                  </p>
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
                    :class="{ 'border-error focus:ring-error/20': errors.lastName }"
                    placeholder="Enter last name"
                    required
                  />
                  <p v-if="errors.lastName" class="text-sm text-error mt-1">
                    {{ errors.lastName }}
                  </p>
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
                  :class="{ 'border-error focus:ring-error/20': errors.email }"
                  placeholder="Enter email address"
                  required
                />
                <p v-if="errors.email" class="text-sm text-error mt-1">{{ errors.email }}</p>
              </div>

              <!-- Privacy Settings -->
              <div class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl">
                <h3 class="font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-primary"
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
                  Privacy Settings
                </h3>

                <div class="space-y-3">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <div class="relative">
                      <input v-model="form.contactEnabled" type="checkbox" class="sr-only" />
                      <div
                        class="w-12 h-6 rounded-full transition-all duration-200"
                        :class="form.contactEnabled ? 'bg-primary' : 'bg-border'"
                      >
                        <div
                          class="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5"
                          :class="form.contactEnabled ? 'translate-x-6' : 'translate-x-0.5'"
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div class="font-medium text-text-primary">Allow Contact</div>
                      <div class="text-sm text-text-secondary">
                        Let other community members contact you
                      </div>
                    </div>
                  </label>

                  <label class="flex items-center gap-3 cursor-pointer">
                    <div class="relative">
                      <input v-model="form.publicProfile" type="checkbox" class="sr-only" />
                      <div
                        class="w-12 h-6 rounded-full transition-all duration-200"
                        :class="form.publicProfile ? 'bg-primary' : 'bg-border'"
                      >
                        <div
                          class="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5"
                          :class="form.publicProfile ? 'translate-x-6' : 'translate-x-0.5'"
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div class="font-medium text-text-primary">Public Profile</div>
                      <div class="text-sm text-text-secondary">
                        Make your profile visible to everyone
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Error Display -->
              <div
                v-if="submitError"
                class="claycard bg-error/10 border border-error/20 text-error p-4 rounded-2xl"
              >
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="font-medium">{{ submitError }}</span>
                </div>
              </div>

              <!-- Success Display -->
              <div
                v-if="submitSuccess"
                class="claycard bg-success/10 border border-success/20 text-success p-4 rounded-2xl"
              >
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="font-medium">Profile updated successfully!</span>
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
                  {{ isSubmitting ? 'Updating...' : 'Update Profile' }}
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
import { mockUsers, type User } from '@/data/mockData'

interface Props {
  show: boolean
  user: User | null
}

interface Emits {
  close: []
  updated: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  contactEnabled: false,
  publicProfile: true,
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
})

const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

// Watch for user changes and populate form
watch(
  () => props.user,
  (user) => {
    if (user) {
      form.firstName = user.first_name
      form.lastName = user.last_name
      form.email = user.email
      form.contactEnabled = user.contact_enabled || false
      form.publicProfile = true // Default to public
    }
  },
  { immediate: true },
)

// Reset form when modal opens/closes
watch(
  () => props.show,
  (show) => {
    if (!show) {
      // Clear messages when closing
      submitError.value = ''
      submitSuccess.value = false
      Object.keys(errors).forEach((key) => {
        errors[key as keyof typeof errors] = ''
      })
    }
  },
)

const validateForm = () => {
  let isValid = true

  // Clear previous errors
  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = ''
  })
  submitError.value = ''

  // Validate first name
  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  } else if (form.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters'
    isValid = false
  }

  // Validate last name
  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  } else if (form.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters'
    isValid = false
  }

  // Validate email
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!props.user || !validateForm()) {
    return
  }

  isSubmitting.value = true
  submitSuccess.value = false

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update user in mock data
    const userIndex = mockUsers.findIndex((u) => u.id === props.user!.id)
    if (userIndex !== -1) {
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        contact_enabled: form.contactEnabled,
        updated_at: new Date().toISOString(),
      }
    }

    submitSuccess.value = true

    // Emit success and close after delay
    setTimeout(() => {
      emit('updated')
    }, 1500)
  } catch (error) {
    submitError.value = 'Failed to update profile. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
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
