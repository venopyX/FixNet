<template>
  <div class="claycard bg-surface rounded-3xl overflow-hidden">
    <!-- Map Header -->
    <div class="bg-background/50 p-6 border-b border-border/50">
      <h3 class="text-lg font-semibold text-text-primary mb-2">Reports Map View</h3>
      <p class="text-text-secondary text-sm">
        {{ reportsWithCoordinates.length }} of {{ reports.length }} reports have location
        coordinates
      </p>
    </div>

    <!-- Simple Coordinate Map -->
    <div class="relative">
      <div
        ref="mapContainer"
        class="w-full h-96 bg-gradient-to-br from-background to-muted relative overflow-hidden"
        @mousemove="handleMouseMove"
        @click="handleMapClick"
      >
        <!-- Grid Background -->
        <div class="absolute inset-0 opacity-10">
          <div
            v-for="i in 20"
            :key="`h-${i}`"
            class="absolute border-t border-border"
            :style="{ top: `${i * 5}%`, width: '100%' }"
          ></div>
          <div
            v-for="i in 20"
            :key="`v-${i}`"
            class="absolute border-l border-border"
            :style="{ left: `${i * 5}%`, height: '100%' }"
          ></div>
        </div>

        <!-- Coordinate System Labels -->
        <div class="absolute top-2 left-2 text-xs text-text-muted bg-surface/80 px-2 py-1 rounded">
          Lat: {{ bounds.maxLat.toFixed(4) }}
        </div>
        <div
          class="absolute bottom-2 left-2 text-xs text-text-muted bg-surface/80 px-2 py-1 rounded"
        >
          Lat: {{ bounds.minLat.toFixed(4) }}
        </div>
        <div
          class="absolute bottom-2 left-2 text-xs text-text-muted bg-surface/80 px-2 py-1 rounded"
        >
          Lng: {{ bounds.minLng.toFixed(4) }}
        </div>
        <div
          class="absolute bottom-2 right-2 text-xs text-text-muted bg-surface/80 px-2 py-1 rounded"
        >
          Lng: {{ bounds.maxLng.toFixed(4) }}
        </div>

        <!-- Report Markers -->
        <div
          v-for="report in reportsWithCoordinates"
          :key="report.id"
          class="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          :style="getMarkerPosition(report)"
          @click="handleMarkerClick(report)"
          @mouseenter="showTooltip(report, $event)"
          @mouseleave="hideTooltip"
        >
          <!-- Marker -->
          <div
            class="w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-200 group-hover:scale-125"
            :class="getMarkerColor(report.status)"
          >
            <div class="w-full h-full rounded-full flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          <!-- Pulse Animation -->
          <div
            class="absolute inset-0 rounded-full border-2 animate-ping opacity-30"
            :class="getMarkerColor(report.status)"
          ></div>
        </div>

        <!-- Mouse Position Indicator -->
        <div
          v-if="mousePosition"
          class="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          :style="{ left: mousePosition.x + 'px', top: mousePosition.y + 'px' }"
        >
          <div class="bg-text-primary/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {{ mouseCoordinates.lat.toFixed(4) }}, {{ mouseCoordinates.lng.toFixed(4) }}
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="absolute top-4 right-4 claycard bg-surface/90 backdrop-blur-sm p-4 rounded-xl">
        <h4 class="text-sm font-semibold text-text-primary mb-3">Status Legend</h4>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-warning rounded-full border border-white"></div>
            <span class="text-xs text-text-secondary">Pending</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-info rounded-full border border-white"></div>
            <span class="text-xs text-text-secondary">Under Review</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-success rounded-full border border-white"></div>
            <span class="text-xs text-text-secondary">Resolved</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-error rounded-full border border-white"></div>
            <span class="text-xs text-text-secondary">Rejected</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tooltip -->
    <Teleport to="body">
      <div
        v-if="tooltip.show"
        class="fixed z-50 pointer-events-none"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        <div class="claycard bg-surface border border-border/50 p-4 rounded-xl shadow-lg max-w-sm">
          <div class="flex items-center gap-2 mb-2">
            <StatusBadge :status="tooltip.report!.status" />
            <span class="text-xs text-text-muted">#{{ tooltip.report!.id }}</span>
          </div>
          <h4 class="font-semibold text-text-primary mb-1">{{ tooltip.report!.title }}</h4>
          <p class="text-sm text-text-secondary mb-2 line-clamp-2">
            {{ tooltip.report!.description }}
          </p>
          <div class="flex items-center gap-2 text-xs text-text-muted">
            <svg
              class="w-3 h-3"
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
            <span>{{ tooltip.report!.location }}</span>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- No Coordinates Message -->
    <div v-if="reportsWithCoordinates.length === 0" class="p-12 text-center">
      <div class="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          class="w-8 h-8 text-text-muted"
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
      </div>
      <h3 class="text-lg font-semibold text-text-primary mb-2">No Location Data</h3>
      <p class="text-text-secondary">
        None of the filtered reports have GPS coordinates available for map display.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { type Report } from '@/data/mockData'
import StatusBadge from '@/components/shared/StatusBadge.vue'

interface Props {
  reports: Report[]
}

interface Emits {
  viewReport: [reportId: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const mapContainer = ref<HTMLElement>()
const mousePosition = ref<{ x: number; y: number } | null>(null)

const tooltip = reactive<{
  show: boolean
  x: number
  y: number
  report: Report | null
}>({
  show: false,
  x: 0,
  y: 0,
  report: null,
})

// Filter reports that have coordinates
const reportsWithCoordinates = computed(() => {
  return props.reports.filter(
    (report) =>
      report.latitude !== undefined &&
      report.longitude !== undefined &&
      report.latitude !== null &&
      report.longitude !== null,
  )
})

// Calculate map bounds
const bounds = computed(() => {
  if (reportsWithCoordinates.value.length === 0) {
    return { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 }
  }

  const lats = reportsWithCoordinates.value.map((r) => r.latitude!)
  const lngs = reportsWithCoordinates.value.map((r) => r.longitude!)

  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  // Add padding
  const latPadding = (maxLat - minLat) * 0.1 || 0.01
  const lngPadding = (maxLng - minLng) * 0.1 || 0.01

  return {
    minLat: minLat - latPadding,
    maxLat: maxLat + latPadding,
    minLng: minLng - lngPadding,
    maxLng: maxLng + lngPadding,
  }
})

// Calculate mouse coordinates
const mouseCoordinates = computed(() => {
  if (!mousePosition.value || !mapContainer.value) {
    return { lat: 0, lng: 0 }
  }

  const rect = mapContainer.value.getBoundingClientRect()
  const x = mousePosition.value.x - rect.left
  const y = mousePosition.value.y - rect.top

  const lat = bounds.value.maxLat - (y / rect.height) * (bounds.value.maxLat - bounds.value.minLat)
  const lng = bounds.value.minLng + (x / rect.width) * (bounds.value.maxLng - bounds.value.minLng)

  return { lat, lng }
})

const getMarkerPosition = (report: Report) => {
  if (!mapContainer.value) return { left: '0px', top: '0px' }

  const rect = mapContainer.value.getBoundingClientRect()

  const x =
    ((report.longitude! - bounds.value.minLng) / (bounds.value.maxLng - bounds.value.minLng)) * 100
  const y =
    ((bounds.value.maxLat - report.latitude!) / (bounds.value.maxLat - bounds.value.minLat)) * 100

  return {
    left: `${Math.max(0, Math.min(100, x))}%`,
    top: `${Math.max(0, Math.min(100, y))}%`,
  }
}

const getMarkerColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-warning border-warning',
    under_review: 'bg-info border-info',
    resolved: 'bg-success border-success',
    rejected: 'bg-error border-error',
  }
  return colors[status] || 'bg-gray-500 border-gray-500'
}

const handleMouseMove = (event: MouseEvent) => {
  mousePosition.value = { x: event.clientX, y: event.clientY }
}

const handleMapClick = () => {
  hideTooltip()
}

const handleMarkerClick = (report: Report) => {
  emit('viewReport', report.id)
}

const showTooltip = (report: Report, event: MouseEvent) => {
  tooltip.show = true
  tooltip.x = event.clientX + 10
  tooltip.y = event.clientY - 10
  tooltip.report = report
}

const hideTooltip = () => {
  tooltip.show = false
  tooltip.report = null
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
