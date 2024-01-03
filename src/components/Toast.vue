<template>
  <div
    v-if="localShow"
    class="fixed top-[5rem] right-[10%] text-white py-[0.6rem] px-[1.2rem] rounded index-10"
    v-bind:class="{
      'bg-blue-400': type === 'info',
      'bg-green-400': type === 'success',
      'bg-red-400': type === 'error',
    }"
  >
    {{ props.message }}
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  show: boolean;
  message: string;
  type: "info" | "success" | "error";
  duration: number;
}

const props = defineProps<Props>();

const localShow = ref<boolean>(props.show);

watch(
  () => props.show,
  (newValue) => {
    localShow.value = newValue;
    if (newValue) {
      setTimeout(() => {
        localShow.value = false;
      }, props.duration);
    }
  },
);
</script>

<style scoped></style>
