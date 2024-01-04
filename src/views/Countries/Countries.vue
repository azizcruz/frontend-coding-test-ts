<template>
  <div class="mt-10 w-3/4 lg:w-1/2">
    <Toast
      v-bind:message="toastMessage"
      v-bind:show="isToastShown"
      v-bind:duration="1000"
      v-bind:type="toastType"
    />
    <h2 class="font-extrabold tracking-tigh text-3xl leading-10">Countries</h2>
    <div class="mt-10">
      <input
        v-model="search"
        type="text"
        placeholder="Search..."
        class="p-1 rounded border border-gray-300 w-[20em]"
      />
    </div>
    <div
      v-if="!isLoading"
      class="flex-column mt-5"
    >
      <div
        v-for="country in countries"
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
import { computed, onMounted, ref, watch } from 'vue'
import { fetchCountries } from './countries.service'
import { ListCountry } from './countries.types'
import CountryComponent from './components/CountryComponent.vue'
import JumpingCloud from '../../components/loaders/JumpingCloud.vue'
import Toast from '../../components/Toast/Toast.vue'
import useToast from '../../composables/useToast'

const fetchedCountries = ref<ListCountry[]>()
const filtered = ref<ListCountry[]>([])
const { showToast, isToastShown, toastType, toastMessage } = useToast()
const isLoading = ref<boolean>(false)
const search = ref<string>('')

async function loadCountries() {
  isLoading.value = true

  fetchCountries()
    .then((countries: ListCountry[]) => {
      showToast(`Fetched ${countries.length} countries`, 'success')

      fetchedCountries.value = countries
      localStorage.setItem('countries', JSON.stringify(countries))
    })
    .catch((error) => {
      showToast('Failed to fetch countries', 'error')
      console.error(error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

watch(search, () => {
  filtered.value = fetchedCountries.value?.filter((country) =>
    country.name.toLowerCase().startsWith(search.value.toLowerCase()),
  ) as ListCountry[]
  if (filtered.value.length === 0) {
    const cachedCountries = localStorage.getItem('countries')
    if (cachedCountries) {
      fetchedCountries.value = JSON.parse(cachedCountries)
    } else {
      loadCountries()
    }
  }
})

onMounted(() => {
  const cachedCountries = localStorage.getItem('countries')
  if (cachedCountries) {
    fetchedCountries.value = JSON.parse(cachedCountries)
    showToast('Loaded countries from cache', 'info')
  } else {
    loadCountries()
  }
})

const countries = computed(() => {
  if (filtered.value.length > 0) {
    return filtered.value
  }
  return fetchedCountries.value
})
</script>

<style scoped></style>
