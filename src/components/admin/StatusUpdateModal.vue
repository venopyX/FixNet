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
              <h2 class="text-2xl font-bold text-text-primary">Update Report Status</h2>
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

            <!-- Report Summary -->
            <div v-if="report" class="space-y-6">
              <ReportSummary :report="report" />

              <!-- Status Update Form -->
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Current Status -->
                <div class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-text-secondary">Current Status:</span>
                    <StatusBadge :status="report.status" />
                  </div>
                </div>

                <!-- New Status Selection -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium text-text-secondary">
                    Update Status
                    <span class="text-error">*</span>
                  </label>
                  <StatusSelect v-model="form.newStatus" :error="errors.newStatus" />
                </div>

                <!-- Admin Comment -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium text-text-secondary">
                    Admin Comment
                    <span class="text-error">*</span>
                  </label>
                  <CommentTextarea
                    v-model="form.adminComment"
                    :error="errors.adminComment"
                    :placeholder="getCommentPlaceholder(form.newStatus)"
                  />
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

                <!-- Action Buttons -->
                <div class="flex gap-4">
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
                    {{ isSubmitting ? 'Updating...' : 'Update Status' }}
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
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { type Report, mockStatusUpdates, mockUsers } from '@/data/mockData'
import { currentUser } from '@/utils/auth'
import ReportSummary from './ReportSummary.vue'
import StatusSelect from './StatusSelect.vue'
import CommentTextarea from './CommentTextarea.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'

interface Props {
  show: boolean
  report: Report | null
}

interface Emits {
  close: []
  updated: [report: Report]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = reactive({
  newStatus: 'pending' as Report['status'],
  adminComment: '',
})

const errors = reactive({
  newStatus: '',
  adminComment: '',
})

const isSubmitting = ref(false)
const submitError = ref('')

// Reset form when modal opens
watch(
  () => props.show,
  (show) => {
    if (show && props.report) {
      form.newStatus = props.report.status
      form.adminComment = ''
      Object.keys(errors).forEach((key) => {
        errors[key as keyof typeof errors] = ''
      })
      submitError.value = ''
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

  // Validate status change
  if (form.newStatus === props.report?.status) {
    errors.newStatus = 'Please select a different status'
    isValid = false
  }

  // Validate admin comment
  if (!form.adminComment.trim()) {
    errors.adminComment = 'Admin comment is required'
    isValid = false
  } else if (form.adminComment.length < 10) {
    errors.adminComment = 'Comment must be at least 10 characters long'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!props.report || !validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create status update
    const statusUpdate = {
      id: String(mockStatusUpdates.length + 1),
      report_id: props.report.id,
      admin_id: currentUser.value?.id,
      previous_status: props.report.status,
      new_status: form.newStatus,
      admin_comment: form.adminComment,
      updated_by: `${currentUser.value?.first_name} ${currentUser.value?.last_name}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Add to mock data
    mockStatusUpdates.push(statusUpdate)

    // Update report
    const updatedReport: Report = {
      ...props.report,
      status: form.newStatus,
      updated_at: new Date().toISOString(),
    }

    emit('updated', updatedReport)
  } catch (error) {
    submitError.value = 'Failed to update status. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const getCommentPlaceholder = (status: string) => {
  const placeholders: Record<string, string> = {
    pending: 'Explain why this report is being set back to pending...',
    under_review: 'Describe the review process and next steps...',
    resolved: 'Explain how the issue was resolved and any follow-up actions...',
    rejected: 'Provide a clear reason why this report cannot be processed...',
  }
  return placeholders[status] || 'Add your comment here...'
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
