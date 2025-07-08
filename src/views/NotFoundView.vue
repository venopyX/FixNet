<template>
  <div class="flex flex-col items-center justify-center min-h-screen-nonav text-center px-4">
    <h1 class="text-9xl font-extrabold text-indigo-600">404</h1>
    <h2 class="text-4xl font-bold text-gray-800 mt-4">Not Found View</h2>
    <p class="text-2xl text-gray-700 mt-2">Sorry, the page you are looking for does not exist.</p>
    <router-link
      :to="{ name: 'Home' }"
      class="mt-8 inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors text-lg"
    >
      Go Back Home
    </router-link>
  </div>
</template>

<script setup>
// No script logic needed for this simple component
</script>

<style scoped>
.min-h-screen-nonav {
  min-height: calc(100vh - 8rem); /* 100vh minus navbar and footer height */
}
</style>
