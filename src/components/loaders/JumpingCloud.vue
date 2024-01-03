<template>
  <div class="flex justify-center items-center mt-20">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-10 h-10 animate-jump"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes jump {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(
      -20px
    ); /* Adjust the value to control the height of the jump */
  }
}

.animate-jump {
  animation: jump 1s ease-in-out infinite;
}
</style>
