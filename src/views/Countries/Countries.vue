<template>
  <div class="mt-10 w-3/4 lg:w-1/2">
    <Teleport to="body">
      <Toast
        v-bind:message="toastMessage"
        v-bind:show="showToast"
        v-bind:duration="1000"
        v-bind:type="toastType"
      />
    </Teleport>
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
import Toast from "../../components/Toast.vue";

const fetchedCountries = ref<ListCountry[]>();
const isLoading = ref<boolean>(false);
const showToast = ref<boolean>(false);
const toastMessage = ref<string>("");
const toastType = ref<"info" | "success" | "error">("info");

onMounted(() => {
  const cachedCountries = localStorage.getItem("countries");

  if (cachedCountries) {
    fetchedCountries.value = JSON.parse(cachedCountries);
    toastMessage.value = `Loaded countries from cache`;
    showToast.value = true;
  } else {
    isLoading.value = true;
    fetchCountries()
      .then((countries: ListCountry[]) => {
        toastMessage.value = `Fetched ${countries.length} countries`;
        showToast.value = true;
        toastType.value = "success";
        fetchedCountries.value = countries;
        localStorage.setItem("countries", JSON.stringify(countries));
      })
      .catch((error) => {
        toastMessage.value = `Failed to fetch countries`;
        console.error(error);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
});
</script>

<style scoped></style>
