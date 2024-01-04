import { describe, expect, it, test } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Toast from './Toast.vue'

describe('Toast Component', () => {
  it('renders with correct message and type', async () => {
    const wrapper: VueWrapper = mount(Toast, {
      props: {
        show: true,
        message: 'Test message',
        type: 'info',
        duration: 500,
      },
    })

    await wrapper.vm.$nextTick()

    expect(document.body.innerHTML).toContain('Test message')
    expect(document.body.innerHTML).toContain('bg-blue-400')
  })

  it('disappears after specified duration', async () => {
    const wrapper = mount(Toast, {
      props: {
        show: false,
        message: 'Test message',
        type: 'info',
        duration: 500, // shorter duration for testing
      },
    })

    await wrapper.vm.$nextTick()

    wrapper.setProps({ show: true })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.localShow).toBe(true)

    // Wait for the toast to fade out
    await new Promise((resolve) => {
      setTimeout(resolve, 700)
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.localShow).toBe(false)
  })

  // test if correct background color is applied for each type
  it('correct background color is applied for info type', async () => {
    const wrapper = mount(Toast, {
      props: {
        show: true,
        message: 'Test message',
        type: 'info',
        duration: 500,
      },
    })

    await wrapper.vm.$nextTick()

    expect(document.body.innerHTML).toContain('bg-blue-400')
  })

  it('correct background color is applied for success type', async () => {
    const wrapper = mount(Toast, {
      props: {
        show: true,
        message: 'Test message',
        type: 'success',
        duration: 500,
      },
    })

    await wrapper.vm.$nextTick()

    expect(document.body.innerHTML).toContain('bg-green-400')
  })

  it('correct background color is applied for error type', async () => {
    const wrapper = mount(Toast, {
      props: {
        show: true,
        message: 'Test message',
        type: 'error',
        duration: 500,
      },
    })

    await wrapper.vm.$nextTick()

    expect(document.body.innerHTML).toContain('bg-red-400')
  })
})
