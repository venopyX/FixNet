<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <label class="flex items-center gap-2 text-sm font-medium text-text-secondary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
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
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 7a2 2 0 100 4 2 2 0 000-4z" />
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
        {{ isGettingLocation ? 'Getting Location...' : 'Use My Location' }}
      </button>
    </div>

    <div class="claycard bg-primary/5 border border-primary/20 rounded-2xl p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="latitude" class="block text-sm font-medium text-text-secondary mb-2">
            Latitude
          </label>
          <input
            id="latitude"
            v-model.number="localLatitude"
            type="number"
            step="any"
            placeholder="e.g., 40.7128"
            class="clayinput w-full px-3 py-2 text-text-primary placeholder-text-text-muted rounded-xl text-sm"
          />
        </div>
        <div>
          <label for="longitude" class="block text-sm font-medium text-text-secondary mb-2">
            Longitude
          </label>
          <input
            id="longitude"
            v-model.number="localLongitude"
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
        v-if="localLatitude && localLongitude"
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
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  latitude?: number
  longitude?: number
  location: string
}

interface Emits {
  'update:latitude': [value: number | undefined]
  'update:longitude': [value: number | undefined]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isGettingLocation = ref(false)
const locationError = ref('')

const localLatitude = computed({
  get: () => props.latitude,
  set: (value: number | undefined) => {
    emit('update:latitude', value)
  },
})

const localLongitude = computed({
  get: () => props.longitude,
  set: (value: number | undefined) => {
    emit('update:longitude', value)
  },
})

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

    localLatitude.value = Number(position.coords.latitude.toFixed(6))
    localLongitude.value = Number(position.coords.longitude.toFixed(6))
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

// Clear error when coordinates change
watch([localLatitude, localLongitude], () => {
  if (locationError.value) {
    locationError.value = ''
  }
})
</script>
