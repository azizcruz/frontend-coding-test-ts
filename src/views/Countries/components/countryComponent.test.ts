import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import CountryComponent from './CountryComponent.vue'

describe('CountryComponent', () => {
  it('renders correctly with props', () => {
    const country = {
      name: 'Test Country',
      emoji: '🌍',
      code: 'TC',
    }

    const wrapper = mount(CountryComponent, {
      props: country,
    })

    expect(wrapper.text()).toContain(country.name)
    expect(wrapper.text()).toContain(country.emoji)
  })

  it('triggers router navigation on click', async () => {
    const country = {
      name: 'Test Country',
      emoji: '🌍',
      code: 'TC',
    }

    const mockRouter = {
      push: vi.fn(),
    }

    const wrapper = mount(CountryComponent, {
      props: country,
      global: {
        mocks: {
          router: mockRouter,
        },
      },
    })

    const detailsLink = wrapper.find('[data-test="details-link"]')
    await detailsLink.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'country-details',
      params: { code: country.code },
    })
  })
})
