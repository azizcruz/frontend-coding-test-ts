import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as countriesService from './countries.service'

import Countries from './Countries.vue'
import { ListCountry } from './countries.types'

describe('Countries Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
    localStorage.clear()
  })

  it('fetches countries on mount not from cache', async () => {
    const fetchCountries = vi.spyOn(countriesService, 'fetchCountries')
    const countries: ListCountry[] = [
      { name: 'Test Country', emoji: '🌍', code: 'TC' },
      { name: 'Test Country 2', emoji: '🌍', code: 'TC2' },
      { name: 'Test Country 3', emoji: '🌍', code: 'TC3' },
    ]

    fetchCountries.mockResolvedValue(countries)

    const wrapper = mount(Countries)

    await wrapper.vm.$nextTick()

    // wait until animation is complete
    await new Promise((resolve) => {
      setTimeout(resolve, 50)
    })

    expect(fetchCountries).toHaveBeenCalled()
    expect(document.body.innerHTML).toContain(
      `Fetched ${countries.length} countries`,
    )
  })

  it('fetches countries on mount from cache', async () => {
    const fetchCountries = vi.spyOn(countriesService, 'fetchCountries')
    const countries: ListCountry[] = [
      { name: 'Test Country', emoji: '🌍', code: 'TC' },
      { name: 'Test Country 2', emoji: '🌍', code: 'TC2' },
      { name: 'Test Country 3', emoji: '🌍', code: 'TC3' },
    ]

    fetchCountries.mockResolvedValue(countries)

    localStorage.setItem('countries', JSON.stringify(countries))

    const wrapper = mount(Countries)

    await wrapper.vm.$nextTick()

    // wait until animation is complete
    await new Promise((resolve) => {
      setTimeout(resolve, 50)
    })

    expect(fetchCountries).toHaveBeenCalledTimes(0)
    expect(document.body.innerHTML).toContain(`Loaded countries from cache`)
  })

  it('displays error message on fetch failure', async () => {
    const fetchCountries = vi.spyOn(countriesService, 'fetchCountries')

    fetchCountries.mockRejectedValue(new Error('Failed to fetch countries'))

    const wrapper = mount(Countries)

    await wrapper.vm.$nextTick()

    // wait until animation is complete
    await new Promise((resolve) => {
      setTimeout(resolve, 50)
    })

    expect(fetchCountries).toHaveBeenCalledTimes(1)
    expect(document.body.innerHTML).toContain(`Failed to fetch countries`)
  })
})
