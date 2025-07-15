<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { onMounted, onUnmounted } from 'vue'

// Performance optimization: Use requestAnimationFrame for smooth animations
let animationFrame: number
let isReducedMotion = false

onMounted(() => {
  // Check for reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  isReducedMotion = mediaQuery.matches

  // Listen for changes to motion preference
  const handleMotionChange = (e: MediaQueryListEvent) => {
    isReducedMotion = e.matches
    updateAnimationState()
  }

  mediaQuery.addEventListener('change', handleMotionChange)

  // Start performance monitoring
  startPerformanceOptimization()

  // Cleanup on unmount
  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handleMotionChange)
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
  })
})

function updateAnimationState() {
  const shapes = document.querySelectorAll('.morphing-shape')
  shapes.forEach(shape => {
    if (isReducedMotion) {
      shape.classList.add('reduced-motion')
    } else {
      shape.classList.remove('reduced-motion')
    }
  })
}

function startPerformanceOptimization() {
  // Use Intersection Observer to pause animations when not visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('paused')
      } else {
        entry.target.classList.add('paused')
      }
    })
  })

  // Observe all morphing shapes
  const shapes = document.querySelectorAll('.morphing-shape')
  shapes.forEach(shape => observer.observe(shape as Element))
}
</script>

<template>
  <!-- Enhanced Animated Background with Patterns -->
  <div class="morphing-background">
    <!-- Background Pattern Layer -->
    <div class="pattern-layer">
      <div class="pattern-grid"></div>
      <div class="pattern-dots"></div>
      <div class="pattern-waves"></div>
    </div>

    <!-- Morphing Shapes Layer -->
    <div class="shapes-layer">
      <div class="morphing-shape shape-1">
        <div class="shape-inner"></div>
      </div>
      <div class="morphing-shape shape-2">
        <div class="shape-inner"></div>
      </div>
      <div class="morphing-shape shape-3">
        <div class="shape-inner"></div>
      </div>
      <div class="morphing-shape shape-4">
        <div class="shape-inner"></div>
      </div>
      <div class="morphing-shape shape-5">
        <div class="shape-inner"></div>
      </div>
      <div class="morphing-shape shape-6">
        <div class="shape-inner"></div>
      </div>
      <div class="morphing-shape shape-7">
        <div class="shape-inner"></div>
      </div>
      <div class="morphing-shape shape-8">
        <div class="shape-inner"></div>
      </div>
    </div>

    <!-- Floating Particles Layer -->
    <div class="particles-layer">
      <div class="particle" v-for="i in 12" :key="i" :style="{ animationDelay: `${i * 0.5}s` }"></div>
    </div>

    <!-- Gradient Overlays -->
    <div class="gradient-overlay overlay-1"></div>
    <div class="gradient-overlay overlay-2"></div>
  </div>

  <div class="app-content">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<style lang="css">
/* Enhanced Morphing Background System */
.morphing-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  /* background: var(--background); */
}

.app-content {
  position: relative;
  z-index: 0;
}

/* Pattern Layer Styles */
.pattern-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 1;
}

.pattern-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 107, 107, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 107, 107, 0.1) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridMove 30s linear infinite;
}

.pattern-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 50% 50%, rgba(171, 71, 188, 0.2) 2px, transparent 2px);
  background-size: 80px 80px;
  animation: dotsFloat 25s ease-in-out infinite;
}

.pattern-waves {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(ellipse at top, rgba(255, 167, 38, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at bottom, rgba(66, 165, 245, 0.1) 0%, transparent 50%);
  animation: wavesFlow 40s ease-in-out infinite;
}

/* Shapes Layer */
.shapes-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.morphing-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.15;
  will-change: transform, border-radius;
  backdrop-filter: blur(2px);
  transition: opacity 0.3s ease;
}

.shape-inner {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: inherit;
  filter: blur(10px);
  opacity: 0.6;
}

/* Performance optimizations */
.morphing-shape.paused {
  animation-play-state: paused !important;
}

.morphing-shape.reduced-motion {
  animation: none !important;
  transform: none !important;
  filter: blur(20px) !important;
  opacity: 0.08 !important;
}

/* Enhanced Shape Definitions */
.shape-1 {
  width: 320px;
  height: 320px;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  top: 5%;
  left: 8%;
  animation: morph1 28s ease-in-out infinite;
}

.shape-2 {
  width: 240px;
  height: 240px;
  background: linear-gradient(135deg, var(--accent), var(--info));
  top: 55%;
  right: 12%;
  animation: morph2 35s ease-in-out infinite reverse;
}

.shape-3 {
  width: 180px;
  height: 180px;
  background: linear-gradient(225deg, var(--secondary), var(--warning));
  bottom: 25%;
  left: 18%;
  animation: morph3 24s ease-in-out infinite;
}

.shape-4 {
  width: 280px;
  height: 280px;
  background: linear-gradient(315deg, var(--primary), var(--accent));
  top: 25%;
  right: 25%;
  animation: morph4 32s ease-in-out infinite reverse;
}

.shape-5 {
  width: 160px;
  height: 160px;
  background: linear-gradient(45deg, var(--info), var(--success));
  top: 75%;
  left: 55%;
  animation: morph5 20s ease-in-out infinite;
}

.shape-6 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, var(--accent), var(--primary));
  bottom: 15%;
  right: 8%;
  animation: morph6 30s ease-in-out infinite reverse;
}

.shape-7 {
  width: 140px;
  height: 140px;
  background: linear-gradient(225deg, var(--warning), var(--error));
  top: 40%;
  left: 5%;
  animation: morph7 18s ease-in-out infinite;
}

.shape-8 {
  width: 200px;
  height: 200px;
  background: linear-gradient(315deg, var(--success), var(--info));
  top: 10%;
  right: 45%;
  animation: morph8 26s ease-in-out infinite reverse;
}

/* Particles Layer */
.particles-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.6) 0%, transparent 70%);
  border-radius: 50%;
  animation: particleFloat 15s ease-in-out infinite;
}

.particle:nth-child(odd) {
  background: radial-gradient(circle, rgba(171, 71, 188, 0.6) 0%, transparent 70%);
}

.particle:nth-child(3n) {
  background: radial-gradient(circle, rgba(66, 165, 245, 0.6) 0%, transparent 70%);
}

/* Gradient Overlays */
.gradient-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 4;
}

.overlay-1 {
  background: radial-gradient(circle at 20% 30%, rgba(255, 107, 107, 0.02) 0%, transparent 60%);
  animation: overlayMove1 45s ease-in-out infinite;
}

.overlay-2 {
  background: radial-gradient(circle at 80% 70%, rgba(171, 71, 188, 0.02) 0%, transparent 60%);
  animation: overlayMove2 50s ease-in-out infinite reverse;
}

/* Enhanced Animation Keyframes */
@keyframes morph1 {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  25% {
    transform: translate(120px, -60px) scale(1.1) rotate(90deg);
    border-radius: 60% 40% 35% 65%;
  }
  50% {
    transform: translate(-40px, 100px) scale(0.9) rotate(180deg);
    border-radius: 35% 65% 60% 40%;
  }
  75% {
    transform: translate(80px, 40px) scale(1.2) rotate(270deg);
    border-radius: 70% 30% 50% 50%;
  }
}

@keyframes morph2 {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  20% {
    transform: translate(-90px, 70px) scale(1.3) rotate(72deg);
    border-radius: 70% 30% 45% 55%;
  }
  40% {
    transform: translate(140px, -50px) scale(0.8) rotate(144deg);
    border-radius: 40% 60% 25% 75%;
  }
  60% {
    transform: translate(-70px, -90px) scale(1.1) rotate(216deg);
    border-radius: 55% 45% 70% 30%;
  }
  80% {
    transform: translate(60px, 120px) scale(0.95) rotate(288deg);
    border-radius: 25% 75% 40% 60%;
  }
}

@keyframes morph3 {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  33% {
    transform: translate(160px, -120px) scale(1.4) rotate(120deg);
    border-radius: 80% 20% 35% 65%;
  }
  66% {
    transform: translate(-80px, 80px) scale(0.7) rotate(240deg);
    border-radius: 20% 80% 55% 45%;
  }
}

@keyframes morph4 {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  16% {
    transform: translate(100px, 60px) scale(0.8) rotate(60deg);
    border-radius: 30% 70% 40% 60%;
  }
  33% {
    transform: translate(-140px, -80px) scale(1.2) rotate(120deg);
    border-radius: 70% 30% 55% 45%;
  }
  50% {
    transform: translate(80px, -120px) scale(0.9) rotate(180deg);
    border-radius: 40% 60% 25% 75%;
  }
  66% {
    transform: translate(-60px, 140px) scale(1.1) rotate(240deg);
    border-radius: 65% 35% 70% 30%;
  }
  83% {
    transform: translate(120px, 40px) scale(0.85) rotate(300deg);
    border-radius: 25% 75% 45% 55%;
  }
}

@keyframes morph5 {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  40% {
    transform: translate(-90px, -70px) scale(1.3) rotate(144deg);
    border-radius: 80% 20% 60% 40%;
  }
  80% {
    transform: translate(110px, 90px) scale(0.8) rotate(288deg);
    border-radius: 20% 80% 35% 65%;
  }
}

@keyframes morph6 {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  30% {
    transform: translate(130px, -100px) scale(0.8) rotate(108deg);
    border-radius: 60% 40% 25% 75%;
  }
  60% {
    transform: translate(-150px, 80px) scale(1.2) rotate(216deg);
    border-radius: 25% 75% 60% 40%;
  }
  90% {
    transform: translate(90px, 130px) scale(0.9) rotate(324deg);
    border-radius: 70% 30% 35% 65%;
  }
}

@keyframes morph7 {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  50% {
    transform: translate(180px, -80px) scale(1.5) rotate(180deg);
    border-radius: 90% 10% 30% 70%;
  }
}

@keyframes morph8 {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  25% {
    transform: translate(-70px, 90px) scale(0.7) rotate(90deg);
    border-radius: 40% 60% 70% 30%;
  }
  50% {
    transform: translate(140px, -70px) scale(1.3) rotate(180deg);
    border-radius: 70% 30% 40% 60%;
  }
  75% {
    transform: translate(-90px, -110px) scale(0.85) rotate(270deg);
    border-radius: 30% 70% 60% 40%;
  }
}

/* Pattern Animations */
@keyframes gridMove {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 30px); }
}

@keyframes dotsFloat {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(20px, -15px) rotate(120deg); }
  66% { transform: translate(-15px, 25px) rotate(240deg); }
}

@keyframes wavesFlow {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(180deg); }
}

@keyframes particleFloat {
  0% {
    transform: translate(0, 100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--random-x, 100px), -100px) scale(1);
    opacity: 0;
  }
}

@keyframes overlayMove1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(100px, 50px) scale(1.1); }
}

@keyframes overlayMove2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-80px, -60px) scale(0.9); }
}

/* Generate random positions for particles */
.particle:nth-child(1) { left: 10%; --random-x: 50px; }
.particle:nth-child(2) { left: 20%; --random-x: -30px; }
.particle:nth-child(3) { left: 30%; --random-x: 80px; }
.particle:nth-child(4) { left: 40%; --random-x: -60px; }
.particle:nth-child(5) { left: 50%; --random-x: 40px; }
.particle:nth-child(6) { left: 60%; --random-x: -70px; }
.particle:nth-child(7) { left: 70%; --random-x: 90px; }
.particle:nth-child(8) { left: 80%; --random-x: -40px; }
.particle:nth-child(9) { left: 90%; --random-x: 60px; }
.particle:nth-child(10) { left: 15%; --random-x: -80px; }
.particle:nth-child(11) { left: 85%; --random-x: 70px; }
.particle:nth-child(12) { left: 45%; --random-x: -50px; }

/* Responsive optimizations */
@media (max-width: 1024px) {
  .morphing-shape {
    opacity: 0.1;
    filter: blur(25px);
  }

  .shape-1, .shape-4, .shape-6 {
    transform: scale(0.7);
  }

  .shape-2, .shape-3, .shape-5, .shape-7, .shape-8 {
    transform: scale(0.6);
  }
}

@media (max-width: 768px) {
  .morphing-shape {
    opacity: 0.08;
    filter: blur(20px);
  }

  .particles-layer {
    display: none;
  }

  .pattern-layer {
    opacity: 0.02;
  }
}

@media (max-width: 480px) {
  .morphing-shape {
    opacity: 0.05;
    filter: blur(15px);
  }

  .shape-7, .shape-8 {
    display: none;
  }
}

/* Accessibility and Performance */
@media (prefers-reduced-motion: reduce) {
  .morphing-shape,
  .particle,
  .pattern-grid,
  .pattern-dots,
  .pattern-waves,
  .gradient-overlay {
    animation: none !important;
    transform: none !important;
    filter: blur(8px) !important;
    opacity: 0.03 !important;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .morphing-shape {
    opacity: 0.02 !important;
    filter: blur(5px) !important;
  }
}

@media (prefers-contrast: high) {
  .morphing-shape,
  .particle,
  .pattern-layer {
    opacity: 0.01 !important;
  }
}

/* Performance optimization for low-end devices */
@media (max-resolution: 150dpi) {
  .morphing-shape {
    filter: blur(15px);
  }

  .shape-inner {
    display: none;
  }
}
</style>
