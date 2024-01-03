<template>
  <div class="mt-10 w-3/4 lg:w-1/2">
    <h2 class="font-extrabold tracking-tigh text-3xl leading-10">Countries</h2>
    <div
      v-if="!isLoading"
      class="flex-column mt-5"
    >
      <div
        v-for="country in fetchedCountries"
        v-bind:key="country.name"
      >
        <CountryComponent
          v-bind:name="country.name"
          v-bind:emoji="country.emoji"
          v-bind:code="country.code"
        />
      </div>
    </div>
    <JumpingCloud v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchCountries } from "./countries.service";
import { ListCountry } from "./countries.types";
import CountryComponent from "./components/CountryComponent.vue";
import JumpingCloud from "../../components/loaders/JumpingCloud.vue";

const fetchedCountries = ref<ListCountry[]>();
const isLoading = ref(false);

onMounted(() => {
  const cachedCountries = localStorage.getItem("countries");

  if (cachedCountries) {
    fetchedCountries.value = JSON.parse(cachedCountries);
  } else {
    isLoading.value = true;

    fetchCountries()
      .then((countries: ListCountry[]) => {
        fetchedCountries.value = countries;
        localStorage.setItem("countries", JSON.stringify(countries));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
});
</script>

<style scoped></style>
