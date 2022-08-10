<template>
  <main class="todo-list">
    <div class="todo-list__header">
      <input 
        v-if="todoList.length"
        class="todo-list__header-checkbox"
        v-model="mainCheckbox"
        type="checkbox"
        @change="onChangeMainCheckbox"
      >
      <input 
        v-model="newTodo"
        class="form-control form-control-sm"
        type="text"
        placeholder="Enter to-do activity here..."
        autofocus
        @keydown="onInputKeyDown"
      >
    </div>
    <todo-item
      v-for="(todo, index) in todoList"
      :key="index"
      :model-value="todo"
      type="text"
      @update:model-value="value => onUpdateTodoItem(value, index)"
      @on-change="value => onChangeTodoItem(value, index)"
      @on-clear="onClear(index)"
    />
    <div 
      v-if="todoList.length || filter"
      class="todo-list__footer"
    >
      <div>
        <strong>{{ todoList.length }}</strong>
        <span>{{ counterLabel }}</span>
      </div>
      <nav class="todo-list__nav">
        <router-link 
          :to="{ name: 'home' }"
          class="todo-list__nav-item"
        >
          <button :href="href" @click="navigate" class='btn btn-sm btn-outline-secondary'>
            All
          </button>
        </router-link>
        <router-link 
          :to="{ name: 'active' }"
          class="todo-list__nav-item"
        >
          <button :href="href" @click="navigate" class='btn btn-sm btn-outline-primary'>
            Active
          </button>
        </router-link>
        <router-link 
          :to="{ name: 'completed' }"
          class="todo-list__nav-item"
        >
          <button :href="href" @click="navigate" class='btn btn-sm btn-outline-success'>
            Completed
          </button>
        </router-link>
      </nav>
      <div 
        class="todo-list__clear"
        :class="{ 'todo-list__clear--shown': showCompletedButton && !filter }"
      >
        <a 
          href=""
          class="link-danger"
          @click.prevent="clearCompletedItems"
        >
          Clear completed
        </a>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, reactive, toRefs, watch } from 'vue'
import {getTodoList, markAllTodos, setTodoList, setTodoItem} from '@/models/todoList'
import TodoItem from '@/components/todo-item.vue'

export default {
  name: 'TodoList',
  components: { TodoItem },
  props: {
    filter: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const state = reactive({
      todoList: [],
      mainCheckbox: false,
      newTodo: '',
      todoValue: '',
      showCompletedButton: false,
      counterLabel: computed(() => {
        const label = state.todoList.length === 1 ? 'task' : 'tasks'
        return ` ${label} in list`
      })
    })

    watch(
      () => state.todoList, 
      list => {
        state.showCompletedButton = list.some(({ completed }) => completed)
        state.mainCheckbox = list.every(({ completed }) => completed)
      }, 
      { deep: true }
    )

    watch(
      () => props.filter, 
      () => { filterTodoList() }
    )

    const onClear = index => state.todoList.splice(index, 1)

    const onInputKeyDown = event => {
      if (event.keyCode === 13 && state.newTodo) {
        setTodoItem({ title: state.newTodo, completed: false })
        state.todoList = getTodoList()
        state.newTodo = ''
        filterTodoList()
      }
    }

    const onChangeTodoItem = (value, index) => {
      state.todoList[index].completed = value
      setTodoList(state.todoList)
      filterTodoList()
    }

    const onUpdateTodoItem = (value, index) => {
      if (!value) state.todoList.splice(index, 1)
      else state.todoList[index].title = value

      setTodoList(state.todoList)
    }

    const filterTodoList = () => {
      if (!props.filter) return state.todoList = getTodoList()

      state.todoList = getTodoList().filter(({ completed }) => {
        return props.filter === 'active' ? !completed : completed
      }) 
    }

    const clearCompletedItems = () => {
      state.todoList = getTodoList().filter(({ completed }) => !completed)
    }

    const onChangeMainCheckbox = () => {
      markAllTodos(state.mainCheckbox)
      state.todoList = getTodoList()
    }

    return { ...toRefs(state), onClear, onInputKeyDown, onChangeTodoItem, onUpdateTodoItem, clearCompletedItems, onChangeMainCheckbox }
  }
}
</script>

<style>
.todo-list {
  margin-top: var(--size-base-x-3);
}

.todo-list__header {
  display: flex;
  margin-bottom: var(--size-base-x-3);
}

.todo-list__header-checkbox {
  margin-right: var(--size-base);
}

.todo-list__footer {
  display: flex;
  justify-content: space-between;
  margin-top: var(--size-base-x-3);
  font-size: var(--font-size-m);
}

.todo-list__nav-item:nth-child(even) {
  margin: 0 8px;
}

.todo-list__clear {
  opacity: 0;
}

.todo-list__clear--shown {
  opacity: 1;
}
</style>
