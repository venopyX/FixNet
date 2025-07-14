<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Modal Overlay -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>

        <!-- Modal Content -->
        <div
          class="claycard bg-surface rounded-3xl max-w-4xl w-full relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div class="p-8">
            <!-- Modal Header -->
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-text-primary">Edit Report</h2>
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

            <!-- Edit Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6" v-if="report">
              <!-- Title Input -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-medium text-text-secondary">
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
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z"
                    />
                  </svg>
                  Report Title
                  <span class="text-error">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="form.title"
                    type="text"
                    placeholder="Brief description of the issue"
                    class="clayinput w-full px-4 py-3 text-text-primary placeholder-text-text-muted rounded-2xl transition-all duration-200"
                    :class="{ 'border-error focus:ring-error/20': errors.title }"
                    maxlength="100"
                    required
                  />
                  <div class="absolute right-3 top-3 text-xs text-text-muted">
                    {{ form.title.length }}/100
                  </div>
                </div>
                <p v-if="errors.title" class="text-sm text-error flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ errors.title }}
                </p>
              </div>

              <!-- Description -->
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-medium text-text-secondary">
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
                  Detailed Description
                  <span class="text-error">*</span>
                </label>
                <div class="relative">
                  <textarea
                    v-model="form.description"
                    placeholder="Provide detailed information about the issue..."
                    class="clayinput w-full px-4 py-3 text-text-primary placeholder-text-text-muted rounded-2xl resize-none transition-all duration-200"
                    :class="{ 'border-error focus:ring-error/20': errors.description }"
                    rows="5"
                    maxlength="1000"
                    required
                  ></textarea>
                  <div class="absolute right-3 bottom-3 text-xs text-text-muted">
                    {{ form.description.length }}/1000
                  </div>
                </div>
                <p v-if="errors.description" class="text-sm text-error flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ errors.description }}
                </p>
              </div>

              <!-- Category and Location Row -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Category -->
                <div class="space-y-2">
                  <label class="flex items-center gap-2 text-sm font-medium text-text-secondary">
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    Issue Category
                    <span class="text-error">*</span>
                  </label>
                  <div class="relative">
                    <select
                      v-model="form.category"
                      class="clayinput w-full px-4 py-3 text-text-primary rounded-2xl appearance-none cursor-pointer transition-all duration-200"
                      required
                    >
                      <option value="roads">🛣️ Roads & Infrastructure</option>
                      <option value="electricity">⚡ Electrical Issues</option>
                      <option value="water">💧 Water & Plumbing</option>
                      <option value="waste">🗑️ Waste Management</option>
                      <option value="safety">🛡️ Public Safety</option>
                      <option value="other">📋 Other Issues</option>
                    </select>
                    <div
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Location -->
                <div class="space-y-2">
                  <label class="flex items-center gap-2 text-sm font-medium text-text-secondary">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Location
                    <span class="text-error">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="form.location"
                      type="text"
                      placeholder="e.g., 'Main Street & Oak Avenue'"
                      class="clayinput w-full px-4 py-3 pl-12 text-text-primary placeholder-text-text-muted rounded-2xl transition-all duration-200"
                      :class="{ 'border-error focus:ring-error/20': errors.location }"
                      required
                    />
                    <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <svg
                        class="w-5 h-5 text-text-muted"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p v-if="errors.location" class="text-sm text-error flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ errors.location }}
                  </p>
                </div>
              </div>

              <!-- Coordinates (Optional) -->
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <label class="flex items-center gap-2 text-sm font-medium text-text-secondary">
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
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    GPS Coordinates (Optional)
                  </label>
                  <button
                    type="button"
                    @click="getCurrentLocation"
                    :disabled="isGettingLocation"
                    class="claybutton inline-flex items-center gap-2 text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-xl text-sm font-medium transition-all duration-200"
                    :class="{ 'opacity-50 cursor-not-allowed': isGettingLocation }"
                  >
                    <svg
                      v-if="!isGettingLocation"
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 7a2 2 0 100 4 2 2 0 000-4z"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-4 h-4 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 4v5h5M20 20v-5h-5M13 3l4 4-4 4M11 21l-4-4 4-4"
                      />
                    </svg>
                    {{ isGettingLocation ? 'Getting Location...' : 'Update Location' }}
                  </button>
                </div>

                <div class="claycard bg-primary/5 border border-primary/20 rounded-2xl p-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-2">
                        Latitude
                      </label>
                      <input
                        v-model.number="form.latitude"
                        type="number"
                        step="any"
                        placeholder="e.g., 40.7128"
                        class="clayinput w-full px-3 py-2 text-text-primary placeholder-text-text-muted rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-2">
                        Longitude
                      </label>
                      <input
                        v-model.number="form.longitude"
                        type="number"
                        step="any"
                        placeholder="e.g., -74.0060"
                        class="clayinput w-full px-3 py-2 text-text-primary placeholder-text-text-muted rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div v-if="locationError" class="mt-3 text-sm text-error flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ locationError }}
                  </div>

                  <div
                    v-if="form.latitude && form.longitude"
                    class="mt-3 text-sm text-success flex items-center gap-1"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Location coordinates set
                  </div>

                  <p class="text-xs text-text-muted mt-3">
                    💡 Tip: Providing coordinates helps agencies locate the issue more precisely
                  </p>
                </div>
              </div>

              <!-- Photo Upload Info (Read-only for now) -->
              <div v-if="report.photo_url" class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-medium text-text-secondary">
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
                  Current Photo
                </label>
                <div class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl">
                  <img
                    :src="report.photo_url"
                    :alt="report.title"
                    class="w-full h-32 object-cover rounded-xl mb-2"
                  />
                  <p class="text-sm text-text-muted">
                    Photo updates will be available in a future update
                  </p>
                </div>
              </div>

              <!-- Permission Check for Resolved Reports -->
              <div
                v-if="report.status === 'resolved' && !isAdmin"
                class="claycard bg-warning/10 border border-warning/20 text-warning p-4 rounded-2xl"
              >
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="font-medium"
                    >Note: This report has been resolved. Changes may require admin approval.</span
                  >
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
                  <span class="font-medium">Report updated successfully!</span>
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
                  {{ isSubmitting ? 'Updating...' : 'Update Report' }}
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
import { ref, reactive, watch, computed } from 'vue'
import { mockReports, type Report } from '@/data/mockData'
import { currentUser } from '@/utils/auth'

interface Props {
  show: boolean
  report: Report | null
}

interface Emits {
  close: []
  updated: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = reactive({
  title: '',
  description: '',
  category: 'roads' as Report['category'],
  location: '',
  latitude: undefined as number | undefined,
  longitude: undefined as number | undefined,
})

const errors = reactive({
  title: '',
  description: '',
  location: '',
})

const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)
const isGettingLocation = ref(false)
const locationError = ref('')

// Check if current user is admin
const isAdmin = computed(() => {
  return currentUser.value?.role === 'admin' || currentUser.value?.role === 'super_admin'
})

// Watch for report changes and populate form
watch(
  () => props.report,
  (report) => {
    if (report) {
      form.title = report.title
      form.description = report.description
      form.category = report.category
      form.location = report.location
      form.latitude = report.latitude
      form.longitude = report.longitude
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

  // Validate title
  if (!form.title.trim()) {
    errors.title = 'Title is required'
    isValid = false
  } else if (form.title.length < 5) {
    errors.title = 'Title must be at least 5 characters long'
    isValid = false
  } else if (form.title.length > 100) {
    errors.title = 'Title must be less than 100 characters'
    isValid = false
  }

  // Validate description
  if (!form.description.trim()) {
    errors.description = 'Description is required'
    isValid = false
  } else if (form.description.length < 20) {
    errors.description = 'Description must be at least 20 characters long'
    isValid = false
  } else if (form.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters'
    isValid = false
  }

  // Validate location
  if (!form.location.trim()) {
    errors.location = 'Location is required'
    isValid = false
  } else if (form.location.length < 5) {
    errors.location = 'Location must be at least 5 characters long'
    isValid = false
  }

  return isValid
}

const getCurrentLocation = async () => {
  if (!navigator.geolocation) {
    locationError.value = 'Geolocation is not supported by this browser'
    return
  }

  isGettingLocation.value = true
  locationError.value = ''

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      })
    })

    form.latitude = Number(position.coords.latitude.toFixed(6))
    form.longitude = Number(position.coords.longitude.toFixed(6))
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          locationError.value = 'Location access denied. Please enable location permissions.'
          break
        case error.POSITION_UNAVAILABLE:
          locationError.value = 'Location information is unavailable.'
          break
        case error.TIMEOUT:
          locationError.value = 'Location request timed out.'
          break
        default:
          locationError.value = 'An unknown error occurred while retrieving location.'
          break
      }
    } else {
      locationError.value = 'Failed to get current location'
    }
  } finally {
    isGettingLocation.value = false
  }
}

const handleSubmit = async () => {
  if (!props.report || !validateForm()) {
    return
  }

  isSubmitting.value = true
  submitSuccess.value = false

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update report in mock data
    const reportIndex = mockReports.findIndex((r) => r.id === props.report!.id)
    if (reportIndex !== -1) {
      mockReports[reportIndex] = {
        ...mockReports[reportIndex],
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        location: form.location.trim(),
        latitude: form.latitude,
        longitude: form.longitude,
        updated_at: new Date().toISOString(),
      }
    }

    submitSuccess.value = true

    // Emit success and close after delay
    setTimeout(() => {
      emit('updated')
    }, 1500)
  } catch (error) {
    submitError.value = 'Failed to update report. Please try again.'
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
