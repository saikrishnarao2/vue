import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TodoItem from '@/components/todo-item.vue'

describe('TodoItem', () => {
  it('renders the component', () => {
    const wrapper = mountComponent()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits on-change event when checkbox is clicked', () => {
    const wrapper = mountComponent()
    wrapper.find('[data-test="todo-item__checkbox"]').trigger('change')
    expect(wrapper.emitted('on-change')).toEqual([[false]])
  })

  it('emits update:model-value event when input is blur', async () => {
    const wrapper = mountComponent()
    await wrapper.find('[data-test="todo-item__label"]').trigger('dblclick')
    await wrapper.find('[data-test="todo-item__input"]').trigger('blur')
    expect(wrapper.emitted('update:model-value')).toBeTruthy()
  })

  it('active and disactive input when enter key is pressed', async () => {
    const wrapper = mountComponent()
    await wrapper.find('[data-test="todo-item__label"]').trigger('dblclick')
    await wrapper.find('[data-test="todo-item__input"]').trigger('keydown', { keyCode: 27 })
    expect(wrapper.find('[data-test="todo-item__label"]').exists()).toBeTruthy()
  })

  const mountComponent = (props = {}) =>
    mount(TodoItem, {
      props: { 
        modelValue: {
          title: 'Title',
          completed: false
        },
        ...props
      }
    })
})