<template>
  <div class="space-y-2">
    <label class="flex items-center gap-2 text-sm font-medium text-text-secondary">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      Photo Evidence (Optional)
    </label>

    <div
      class="claycard bg-surface border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-6 transition-all duration-200"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />

      <!-- Upload Area -->
      <div v-if="!previewUrl" class="text-center">
        <div
          class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-primary"
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
        </div>
        <h3 class="text-lg font-medium text-text-primary mb-2">Add a Photo</h3>
        <p class="text-text-secondary mb-4">
          Help agencies understand the issue better with a clear photo
        </p>
        <button
          type="button"
          @click="triggerFileInput"
          class="claybutton inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl font-medium hover:scale-105 transition-all duration-200"
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
          Choose Photo
        </button>
        <p class="text-xs text-text-muted mt-2">
          Maximum file size: 5MB. Supported formats: JPG, PNG, WebP
        </p>
      </div>

      <!-- Preview Area -->
      <div v-else class="space-y-4">
        <div class="relative">
          <img :src="previewUrl" :alt="fileName" class="w-full h-48 object-cover rounded-xl" />
          <button
            type="button"
            @click="removePhoto"
            class="absolute top-2 right-2 claybutton w-8 h-8 bg-error text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-sm text-text-secondary">
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
            <span>{{ fileName }}</span>
          </div>
          <button
            type="button"
            @click="triggerFileInput"
            class="claybutton text-primary hover:text-secondary text-sm font-medium px-3 py-1 rounded-lg hover:bg-primary/10 transition-all duration-200"
          >
            Change Photo
          </button>
        </div>
      </div>
    </div>

    <p v-if="uploadError" class="text-sm text-error flex items-center gap-1">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      {{ uploadError }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue?: File
}

interface Emits {
  'update:modelValue': [value: File | undefined]
  change: [value: File | undefined]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fileInput = ref<HTMLInputElement>()
const previewUrl = ref<string>('')
const fileName = ref<string>('')
const uploadError = ref<string>('')

const localValue = computed({
  get: () => props.modelValue,
  set: (value: File | undefined) => {
    emit('update:modelValue', value)
    emit('change', value)
  },
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  uploadError.value = ''

  if (!file) {
    return
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    uploadError.value = 'Please select a valid image file'
    return
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = 'File size must be less than 5MB'
    return
  }

  // Set file and create preview
  localValue.value = file
  fileName.value = file.name

  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const removePhoto = () => {
  localValue.value = undefined
  previewUrl.value = ''
  fileName.value = ''
  uploadError.value = ''

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>
