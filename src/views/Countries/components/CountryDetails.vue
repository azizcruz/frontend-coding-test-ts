<template>
  <div class="flex-column">
    <div
      class="cursor-pointer text-3xl px-2 py-1 rounded active:scale-90 my-3 max-w-[5em] m-auto mt-10"
      v-on:click="router.go(-1)"
    >
      &#x2190;
    </div>
    <Toast
      v-bind:message="toastMessage"
      v-bind:show="isToastShown"
      v-bind:duration="1000"
      v-bind:type="toastType"
    />
    <div v-if="!isLoading">
      <div class="rounded w-[20em] py-3 px-1 mt-4">
        <div class="text-8xl">{{ countryDetails?.emoji }}</div>
        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Name:</div>
          <div class="w-2/4 md:text-left">
            {{ countryDetails?.name ?? 'N/A' }}
          </div>
        </div>

        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Code:</div>
          <div class="w-2/4 md:text-left">
            {{ countryDetails?.code ?? 'N/A' }}
          </div>
        </div>
        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Continent:</div>
          <div class="w-2/4 md:text-left">
            {{ countryDetails?.continent?.name ?? 'N/A' }}
          </div>
        </div>
        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Capital:</div>
          <div class="w-2/4 md:text-left">
            {{ countryDetails?.capital ?? 'N/A' }}
          </div>
        </div>
        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Languages:</div>
          <div class="w-2/4 md:text-left">
            {{
              countryDetails?.languages
                .map((language) => language.name)
                .join(', ') ?? 'N/A'
            }}
          </div>
        </div>
        <div class="flex items-center m-3">
          <div class="w-2/4 inline-block text-left font-bold">Currencies:</div>
          <div class="w-2/4 md:text-left">
            {{ countryDetails?.currencies.join(', ') ?? 'N/A' }}
          </div>
        </div>
        <div class="flex items-center m-3">
          <div class="w-2/4 md:w-2/4 inline-block text-left font-bold">
            Phone Code:
          </div>
          <div class="w-2/4 md:text-left">
            {{ countryDetails?.phone && '+' }}
            {{ countryDetails?.phone ?? 'N/A' }}
          </div>
        </div>
      </div>
    </div>
    <JumpingCloud v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Country } from '../countries.types'
import { fetchCountryByCode } from '../countries.service'
import JumpingCloud from '../../../components/loaders/JumpingCloud.vue'
import Toast from '../../../components/Toast/Toast.vue'
import useToast from '../../../composables/useToast'

const route = useRoute()
const router = useRouter()

const countryDetails = ref<Country>()
const isLoading = ref(false)
const { showToast, toastMessage, toastType, isToastShown } = useToast()

onMounted(() => {
  const cachedCountry = localStorage.getItem('country')
  const countryCode = route.params?.code as string

  if (cachedCountry && JSON.parse(cachedCountry).code === countryCode) {
    showToast('Loaded country from cache', 'info')
    countryDetails.value = JSON.parse(cachedCountry)
  } else {
    isLoading.value = true
    fetchCountryByCode(countryCode)
      .then((data: Country | null) => {
        if (data) {
          showToast(`Fetched country ${data.name}`, 'success')
          countryDetails.value = data
          localStorage.setItem('country', JSON.stringify(countryDetails.value))
        }
      })
      .catch((error) => {
        showToast('Failed to fetch country', 'error')
        console.error(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
})
</script>

<style scoped></style>
