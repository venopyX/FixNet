<template>
  <div class="claycard bg-surface rounded-3xl p-8 shadow-lg">
    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Title Input -->
      <TitleInput v-model="form.title" :error="errors.title" @input="clearError('title')" />

      <!-- Description Textarea -->
      <DescriptionTextarea
        v-model="form.description"
        :error="errors.description"
        @input="clearError('description')"
      />

      <!-- Category and Location Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategorySelect
          v-model="form.category"
          :error="errors.category"
          @change="clearError('category')"
        />

        <LocationInput
          v-model="form.location"
          :error="errors.location"
          @input="clearError('location')"
        />
      </div>

      <!-- Coordinates (Optional) -->
      <CoordinatesInput
        v-model:latitude="form.latitude"
        v-model:longitude="form.longitude"
        :location="form.location"
      />

      <!-- Photo Upload -->
      <PhotoUpload v-model="form.photo" @change="clearError('photo')" />

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

      <!-- Submit Button -->
      <SubmitButton :loading="isSubmitting" @submit="handleSubmit" @cancel="$emit('cancel')" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import TitleInput from './TitleInput.vue'
import DescriptionTextarea from './DescriptionTextarea.vue'
import CategorySelect from './CategorySelect.vue'
import LocationInput from './LocationInput.vue'
import CoordinatesInput from './CoordinatesInput.vue'
import PhotoUpload from './PhotoUpload.vue'
import SubmitButton from './SubmitButton.vue'

interface ReportFormData {
  title: string
  description: string
  category: 'roads' | 'electricity' | 'water' | 'waste' | 'safety' | 'other'
  location: string
  latitude?: number
  longitude?: number
  photo?: File
}

const emit = defineEmits<{
  submit: [data: ReportFormData]
  cancel: []
}>()

const form = reactive<ReportFormData>({
  title: '',
  description: '',
  category: 'roads',
  location: '',
  latitude: undefined,
  longitude: undefined,
  photo: undefined,
})

const errors = reactive({
  title: '',
  description: '',
  category: '',
  location: '',
  photo: '',
})

const isSubmitting = ref(false)
const submitError = ref('')

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

const clearError = (field: keyof typeof errors) => {
  errors[field] = ''
  submitError.value = ''
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Emit form data to parent
    const formData = { ...form }
    await new Promise((resolve) => setTimeout(resolve, 100)) // Small delay for UX

    emit('submit', formData)
  } catch (error) {
    submitError.value = 'Failed to submit report. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>