import { describe, it, expect, vi } from 'vitest'

import { mount, RouterLinkStub } from '@vue/test-utils'
import { getTodoList } from '@/models/todoList'
import TodoList from '@/views/todo-list.vue'

vi.mock('@/models/todoList')

describe('TodoList', () => {
  it('renders the component', () => {
    const wrapper = mountComponent()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the component 2', () => {
    getTodoList.mockReturnValue([{ title: 'todo 1', completed: false }])
    const wrapper = mountComponent()
    expect(wrapper.html()).toMatchSnapshot()
  })

  const mountComponent = () =>
    mount(TodoList, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
})