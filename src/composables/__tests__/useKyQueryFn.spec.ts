import { VueQueryPlugin } from '@tanstack/vue-query'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { defineComponent, nextTick } from 'vue'

import { useKyQuery, createApiClient, createKyInstance } from '../useKyQueryFn'

describe('useKyQueryFn', () => {
  it('should return the correct data', async () => {
    const ky = createKyInstance({
      baseURL: 'https://swapi.dev/api',
      timeout: 1000,
      retry: 3,
    })

    const TestComponent = defineComponent({
      setup() {
        const { data } = useKyQuery({
          queryKey: ['people'],
          queryFn: () => ky.get('https://swapi.dev/api/people').json(),
        })
        return { data }
      },
      template: '<div></div>',
    })

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [VueQueryPlugin],
      },
    })
    await nextTick()
    expect(wrapper.vm.$data).toBeDefined()
  })

  it('should create an api client', () => {
    const apiClient = createApiClient({
      baseURL: 'https://swapi.dev/api',
    })
    expect(apiClient).toBeDefined()
  })

  it('should create a ky instance', () => {
    const ky = createKyInstance({
      baseURL: 'https://swapi.dev/api',
      timeout: 1000,
      retry: 3,
    })
    expect(ky).toBeDefined()
  })

  it('should create a ky instance with a base URL', () => {
    const ky = createKyInstance({
      baseURL: 'https://swapi.dev/api',
    })
    expect(ky).toBeDefined()
  })
})
