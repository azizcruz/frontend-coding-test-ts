<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="localShow"
        class="fixed top-[5rem] right-[10%] text-white py-[0.6rem] px-[1.2rem] rounded index-10"
        data-test="toast"
        v-bind:class="{
          'bg-blue-400': type === 'info',
          'bg-green-400': type === 'success',
          'bg-red-400': type === 'error',
        }"
      >
        {{ props.message }}
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'

interface Props {
  show: boolean
  message: string
  type: 'info' | 'success' | 'error'
  duration: number
}

const props = defineProps<Props>()

const localShow = ref<boolean>(props.show)

let durationTimer: number

watch(
  () => props.show,
  (newValue) => {
    localShow.value = newValue
    if (newValue) {
      durationTimer = setTimeout(() => {
        localShow.value = false
      }, props.duration)
    }
  },
)

onUnmounted(() => {
  clearTimeout(durationTimer)
})
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
