<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <!-- Animated Background Pattern -->
  <div class="morphing-background">
    <div class="morphing-shape shape-1"></div>
    <div class="morphing-shape shape-2"></div>
    <div class="morphing-shape shape-3"></div>
    <div class="morphing-shape shape-4"></div>
    <div class="morphing-shape shape-5"></div>
    <div class="morphing-shape shape-6"></div>
  </div>

  <div>
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<style lang="css">
/* Morphing Background Styles */
.morphing-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.morphing-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(24px);
  opacity: 0.2;
  will-change: transform, border-radius;
}

/* Respect user preference for reduced motion and effects */
@media (prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce) {
  .morphing-shape {
    animation: none !important;
    transform: none !important;
    filter: blur(8px) !important;
  }
}

/* Shape 1 - Large primary gradient */
.shape-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  top: 10%;
  left: 10%;
  animation: morph1 20s ease-in-out infinite;
}

/* Shape 2 - Medium accent gradient */
.shape-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, var(--accent), var(--info));
  top: 60%;
  right: 15%;
  animation: morph2 25s ease-in-out infinite reverse;
}

/* Shape 3 - Small secondary gradient */
.shape-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(225deg, var(--secondary), var(--warning));
  bottom: 20%;
  left: 20%;
  animation: morph3 18s ease-in-out infinite;
}

/* Shape 4 - Medium primary gradient */
.shape-4 {
  width: 250px;
  height: 250px;
  background: linear-gradient(315deg, var(--primary), var(--accent));
  top: 30%;
  right: 30%;
  animation: morph4 22s ease-in-out infinite reverse;
}

/* Shape 5 - Small info gradient */
.shape-5 {
  width: 120px;
  height: 120px;
  background: linear-gradient(45deg, var(--info), var(--success));
  top: 70%;
  left: 60%;
  animation: morph5 16s ease-in-out infinite;
}

/* Shape 6 - Large accent gradient */
.shape-6 {
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, var(--accent), var(--primary));
  bottom: 10%;
  right: 5%;
  animation: morph6 24s ease-in-out infinite reverse;
}

/* Morphing animations */
@keyframes morph1 {
  0%,
  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  33% {
    transform: translate(100px, -50px) scale(1.2) rotate(120deg);
    border-radius: 60% 40% 30% 70%;
  }
  66% {
    transform: translate(-50px, 80px) scale(0.8) rotate(240deg);
    border-radius: 30% 70% 60% 40%;
  }
}

@keyframes morph2 {
  0%,
  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  25% {
    transform: translate(-80px, 60px) scale(1.3) rotate(90deg);
    border-radius: 70% 30% 50% 50%;
  }
  50% {
    transform: translate(120px, -40px) scale(0.9) rotate(180deg);
    border-radius: 40% 60% 30% 70%;
  }
  75% {
    transform: translate(-60px, -80px) scale(1.1) rotate(270deg);
    border-radius: 60% 40% 70% 30%;
  }
}

@keyframes morph3 {
  0%,
  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  50% {
    transform: translate(150px, -100px) scale(1.4) rotate(180deg);
    border-radius: 80% 20% 40% 60%;
  }
}

@keyframes morph4 {
  0%,
  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  20% {
    transform: translate(80px, 40px) scale(0.7) rotate(72deg);
    border-radius: 30% 70% 40% 60%;
  }
  40% {
    transform: translate(-120px, -60px) scale(1.2) rotate(144deg);
    border-radius: 70% 30% 60% 40%;
  }
  60% {
    transform: translate(60px, -80px) scale(0.9) rotate(216deg);
    border-radius: 40% 60% 30% 70%;
  }
  80% {
    transform: translate(-40px, 100px) scale(1.1) rotate(288deg);
    border-radius: 60% 40% 70% 30%;
  }
}

@keyframes morph5 {
  0%,
  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  33% {
    transform: translate(-70px, -50px) scale(1.3) rotate(120deg);
    border-radius: 80% 20% 60% 40%;
  }
  66% {
    transform: translate(90px, 70px) scale(0.8) rotate(240deg);
    border-radius: 20% 80% 40% 60%;
  }
}

@keyframes morph6 {
  0%,
  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    border-radius: 50% 50% 50% 50%;
  }
  25% {
    transform: translate(100px, -80px) scale(0.8) rotate(90deg);
    border-radius: 60% 40% 30% 70%;
  }
  50% {
    transform: translate(-120px, 60px) scale(1.2) rotate(180deg);
    border-radius: 30% 70% 60% 40%;
  }
  75% {
    transform: translate(80px, 100px) scale(0.9) rotate(270deg);
    border-radius: 70% 30% 40% 60%;
  }
}

/* Ensure shapes don't interfere with content on smaller screens */
@media (max-width: 768px) {
  .morphing-shape {
    opacity: 0.1;
    filter: blur(20px);
  }

  .shape-1,
  .shape-4,
  .shape-6 {
    transform: scale(0.6);
  }

  .shape-2,
  .shape-3,
  .shape-5 {
    transform: scale(0.5);
  }
}

/* High contrast mode adjustments */
@media (prefers-contrast: high) {
  .morphing-shape {
    opacity: 0.03;
  }
}
</style>
