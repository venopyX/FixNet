<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Modal Overlay -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>

        <!-- Modal Content -->
        <div class="claycard bg-surface rounded-3xl max-w-lg w-full relative z-10 shadow-2xl">
          <div class="p-8">
            <!-- Modal Header -->
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-text-primary">Share Profile</h2>
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

            <!-- Profile Info -->
            <div
              v-if="user"
              class="claycard bg-background/50 border border-border/50 p-4 rounded-2xl mb-6"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
                >
                  <span class="text-primary font-bold text-xl">
                    {{ getInitials(user.first_name, user.last_name) }}
                  </span>
                </div>
                <div>
                  <h3 class="font-semibold text-text-primary">
                    {{ user.first_name }} {{ user.last_name }}
                  </h3>
                  <p class="text-text-secondary text-sm capitalize">{{ user.role }}</p>
                  <p class="text-text-muted text-xs">Community Member</p>
                </div>
              </div>
            </div>

            <!-- Share URL -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-text-secondary mb-3">Profile URL</label>
              <div
                class="claycard bg-background/50 border border-border/50 rounded-2xl p-4 flex items-center gap-3"
              >
                <input
                  :value="profileUrl"
                  readonly
                  class="flex-1 bg-transparent text-text-primary text-sm focus:outline-none"
                />
                <button
                  @click="copyUrl"
                  class="claybutton inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  :class="{ 'bg-success/10 text-success': copied }"
                >
                  <svg
                    v-if="!copied"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ copied ? 'Copied!' : 'Copy' }}
                </button>
              </div>
            </div>

            <!-- Share Options -->
            <div class="space-y-4">
              <h3 class="font-semibold text-text-primary">Share via</h3>

              <div class="grid grid-cols-2 gap-3">
                <!-- WhatsApp -->
                <button
                  @click="shareVia('whatsapp')"
                  class="claybutton flex items-center gap-3 p-4 rounded-2xl bg-background/50 border border-border/50 hover:bg-success/5 hover:border-success/20 text-text-secondary hover:text-success transition-all duration-200"
                >
                  <div class="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <span class="text-success text-lg">💬</span>
                  </div>
                  <span class="font-medium">WhatsApp</span>
                </button>

                <!-- Twitter -->
                <button
                  @click="shareVia('twitter')"
                  class="claybutton flex items-center gap-3 p-4 rounded-2xl bg-background/50 border border-border/50 hover:bg-info/5 hover:border-info/20 text-text-secondary hover:text-info transition-all duration-200"
                >
                  <div class="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center">
                    <span class="text-info text-lg">🐦</span>
                  </div>
                  <span class="font-medium">Twitter</span>
                </button>

                <!-- Facebook -->
                <button
                  @click="shareVia('facebook')"
                  class="claybutton flex items-center gap-3 p-4 rounded-2xl bg-background/50 border border-border/50 hover:bg-primary/5 hover:border-primary/20 text-text-secondary hover:text-primary transition-all duration-200"
                >
                  <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span class="text-primary text-lg">📘</span>
                  </div>
                  <span class="font-medium">Facebook</span>
                </button>

                <!-- Email -->
                <button
                  @click="shareVia('email')"
                  class="claybutton flex items-center gap-3 p-4 rounded-2xl bg-background/50 border border-border/50 hover:bg-secondary/5 hover:border-secondary/20 text-text-secondary hover:text-secondary transition-all duration-200"
                >
                  <div class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <span class="text-secondary text-lg">📧</span>
                  </div>
                  <span class="font-medium">Email</span>
                </button>
              </div>
            </div>

            <!-- Native Share (if available) -->
            <div v-if="canNativeShare" class="mt-6 pt-6 border-t border-border/50">
              <button
                @click="nativeShare"
                class="claybutton w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all duration-200"
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                <span class="font-medium">Share via Device</span>
              </button>
            </div>

            <!-- Success Message -->
            <div
              v-if="shareSuccess"
              class="mt-4 claycard bg-success/10 border border-success/20 text-success p-3 rounded-xl"
            >
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-sm font-medium">{{ shareMessage }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User } from '@/data/mockData'

interface Props {
  show: boolean
  user: User | null
}

interface Emits {
  close: []
}

const props = defineProps<Props>()
defineEmits<Emits>()

const copied = ref(false)
const shareSuccess = ref(false)
const shareMessage = ref('')

const profileUrl = computed(() => {
  if (!props.user) return ''
  return `${window.location.origin}/profile/${props.user.id}`
})

const canNativeShare = computed(() => {
  return 'share' in navigator
})

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(profileUrl.value)
    copied.value = true
    showShareSuccess('Profile URL copied to clipboard!')

    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = profileUrl.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)

    copied.value = true
    showShareSuccess('Profile URL copied to clipboard!')

    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

const shareVia = (platform: string) => {
  if (!props.user) return

  const text = `Check out ${props.user.first_name} ${props.user.last_name}'s community profile on FixMyArea!`
  const url = profileUrl.value

  let shareUrl = ''

  switch (platform) {
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
      break
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      break
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      break
    case 'email':
      shareUrl = `mailto:?subject=${encodeURIComponent('Community Profile Share')}&body=${encodeURIComponent(`${text}\n\n${url}`)}`
      break
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
    showShareSuccess(`Opened ${platform} share dialog!`)
  }
}

const nativeShare = async () => {
  if (!props.user || !canNativeShare.value) return

  try {
    await navigator.share({
      title: `${props.user.first_name} ${props.user.last_name} - FixMyArea Profile`,
      text: `Check out ${props.user.first_name} ${props.user.last_name}'s community profile on FixMyArea!`,
      url: profileUrl.value,
    })
    showShareSuccess('Profile shared successfully!')
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('Error sharing:', error)
    }
  }
}

const showShareSuccess = (message: string) => {
  shareMessage.value = message
  shareSuccess.value = true

  setTimeout(() => {
    shareSuccess.value = false
  }, 3000)
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
