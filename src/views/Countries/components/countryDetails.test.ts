import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CountryDetails from './CountryDetails.vue'
import * as countriesService from '../countries.service'
import { Country } from '../countries.types'

describe('CountryDetails Component', () => {
  const mockCountry: Country = {
    name: 'Mock Country',
    emoji: '🌍',
    code: 'MC',
    continent: { name: 'Mock Continent', code: 'MO', countries: [] },
    capital: 'Mock Capital',
    languages: [
      { name: 'English', native: 'English', rtl: false, code: 'en' },
      { name: 'French', native: 'French', rtl: false, code: 'fr' },
    ],
    currencies: ['USD', 'EUR'],
    phone: '+123456789',
    phones: ['+123456789'],
    awsRegion: 'MO',
    states: [],
    subdivisions: [],
    currency: 'USD',
    emojiU: '1f30d',
    native: 'Mock Country',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
    localStorage.clear()
  })

  it('renders country details when loaded not from cache', async () => {
    const fetchCountrySpy = vi.spyOn(countriesService, 'fetchCountryByCode')
    fetchCountrySpy.mockResolvedValue(mockCountry)

    vi.mock('vue-router', () => ({
      useRoute: vi.fn(() => ({ params: { code: 'MC' } })),
      useRouter: vi.fn(() => ({ push: vi.fn() })),
    }))

    const wrapper = mount(CountryDetails, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })

    await wrapper.vm.$nextTick()

    // wait until animation is complete
    await new Promise((resolve) => {
      setTimeout(resolve, 50)
    })

    expect(fetchCountrySpy).toHaveBeenCalledWith('MC')
    expect(fetchCountrySpy).toHaveReturnedWith(mockCountry)
    expect(wrapper.html()).toContain('Mock Country')

    // Check if toast was there
    expect(document.body.innerHTML).toContain(
      `Fetched country ${mockCountry.name}`,
    )
  })

  it('renders country details when loaded from cache', async () => {
    const fetchCountrySpy = vi.spyOn(countriesService, 'fetchCountryByCode')
    fetchCountrySpy.mockResolvedValue(mockCountry)

    localStorage.setItem('country', JSON.stringify(mockCountry))

    vi.mock('vue-router', () => ({
      useRoute: vi.fn(() => ({ params: { code: 'MC' } })),
      useRouter: vi.fn(() => ({ push: vi.fn() })),
    }))

    const wrapper = mount(CountryDetails, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })

    await wrapper.vm.$nextTick()

    // wait until animation is complete
    await new Promise((resolve) => {
      setTimeout(resolve, 50)
    })

    expect(fetchCountrySpy).toHaveBeenCalledTimes(0)

    // Check if toast was there
    expect(document.body.innerHTML).toContain(`Loaded country from cache`)
  })

  it('displays error message on fetch failure', async () => {
    const fetchCountrySpy = vi.spyOn(countriesService, 'fetchCountryByCode')
    fetchCountrySpy.mockRejectedValueOnce(new Error('Failed to fetch country'))

    const wrapper = mount(CountryDetails, {
      global: {
        stubs: {
          RouterLink: true,
        },
        mocks: {
          route: { params: { code: 'MC' } },
        },
      },
    })

    await wrapper.vm.$nextTick()

    // wait until animation is complete
    await new Promise((resolve) => {
      setTimeout(resolve, 50)
    })

    expect(wrapper.html()).toContain('N/A')

    // Check if toast was there
    expect(document.body.innerHTML).toContain('Failed to fetch country')
  })
})
