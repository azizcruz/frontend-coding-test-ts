<template>
  <div class="flex justify-between p-4 items-center">
    <div class="w-1/3 lg:w-1/4 text-left">{{ props.name }}</div>
    <div class="text-xl">{{ props.emoji }}</div>
    <div
      class="cursor-pointer active:scale-90"
      v-on:click="
        router.push({ name: 'country-details', params: { code: props.code } })
      "
    >
      Details &#x2192;
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ListCountry } from "../countries.types";

const props = defineProps<ListCountry>();

const router = useRouter();
</script>

<style scoped></style>
