<template>
  <div class="flex-column">
    <div
      class="cursor-pointer text-3xl px-2 py-1 rounded active:scale-90 my-3 max-w-[5em] m-auto mt-10"
      v-on:click="router.go(-1)"
    >
      &#x2190;
    </div>
    <Teleport to="body">
      <Toast
        v-bind:message="toastMessage"
        v-bind:show="showToast"
        v-bind:duration="1000"
        v-bind:type="toastType"
      />
    </Teleport>
    <div v-if="!isLoading">
      <div class="rounded w-[20em] md:w-[20em] py-3 px-1 mt-4">
        <div class="text-8xl">{{ countryDetails?.emoji }}</div>
        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Name:</div>
          <div class="w-2/4 md:text-left">
            {{ countryDetails?.name ?? "N/A" }}
          </div>
        </div>

        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Code:</div>
          <div class="w-2/4 md:text-left">
            {{ countryDetails?.code ?? "N/A" }}
          </div>
        </div>
        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Continent:</div>
          <div class="w-2/4 md:text-left">
            {{ countryDetails?.continent?.name ?? "N/A" }}
          </div>
        </div>
        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Capital:</div>
          <div class="w-2/4 md:text-left">
            {{ countryDetails?.capital ?? "N/A" }}
          </div>
        </div>
        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Languages:</div>
          <div class="w-2/4 md:text-left">
            {{
              countryDetails?.languages
                .map((language) => language.name)
                .join(", ") ?? "N/A"
            }}
          </div>
        </div>
        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Currencies:</div>
          <div class="w-2/4 md:text-left">
            {{ countryDetails?.currencies.join(", ") ?? "N/A" }}
          </div>
        </div>
        <div class="flex items-center m-3">
          <div class="w-2/4 md:w-2/4 inline-block text-left font-bold">
            Phone Code:
          </div>
          <div class="w-2/4 md:text-left">
            +{{ countryDetails?.phone ?? "N/A" }}
          </div>
        </div>
      </div>
    </div>
    <JumpingCloud v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Country } from "../countries.types";
import { fetchCountryByCode } from "../countries.service";
import JumpingCloud from "../../../components/loaders/JumpingCloud.vue";
import Toast from "../../../components/Toast.vue";

const route = useRoute();
const router = useRouter();

const countryDetails = ref<Country>();
const isLoading = ref(false);

const showToast = ref<boolean>(false);
const toastMessage = ref<string>("");
const toastType = ref<"info" | "success" | "error">("info");

onMounted(() => {
  const cachedCountry = localStorage.getItem("country");

  if (cachedCountry && JSON.parse(cachedCountry).code === route.params.code) {
    toastMessage.value = `Loaded country from cache`;
    showToast.value = true;
    countryDetails.value = JSON.parse(cachedCountry);
  } else {
    isLoading.value = true;
    fetchCountryByCode(route.params.code as string)
      .then((data: Country | null) => {
        if (data) {
          toastMessage.value = `Fetched country ${data.name}`;
          showToast.value = true;
          toastType.value = "success";
          countryDetails.value = data;
          localStorage.setItem("country", JSON.stringify(countryDetails.value));
        }
      })
      .catch((error) => {
        toastMessage.value = `Failed to fetch country`;
        showToast.value = true;
        toastType.value = "error";
        console.error(error);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
});
</script>

<style scoped></style>
