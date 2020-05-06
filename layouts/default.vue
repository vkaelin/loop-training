<template>
  <div class="h-screen text-white bg-gray-900 bg-app">
    <h1
      class="flex items-center justify-between px-8 text-4xl text-center text-indigo-400 bg-gray-800 border-b border-indigo-300 border-opacity-50 font-title"
    >
      <div>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          />
        </svg>
      </div>
      <nuxt-link to="/" class="text-indigo-300">
        Loop
      </nuxt-link>
      <div>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </h1>
    <div class="px-2">
      <nuxt />
    </div>
  </div>
</template>

<style scoped>
/* .bg-app {
  background: #0f0c29;
  background: -webkit-linear-gradient(to bottom, #24243e, #302b63, #0f0c29);
  background: linear-gradient(to bottom, #24243e, #302b63, #0f0c29);
} */
</style>
