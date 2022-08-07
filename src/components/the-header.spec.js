import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheHeader from '@/components/the-header.vue'

describe('TheHeader', () => {
  it('renders the component', () => {
    const wrapper = mountComponent()
    expect(wrapper.html()).toMatchSnapshot()
  })

  const mountComponent = () =>
    mount(TheHeader)
})