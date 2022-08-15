import { reactive } from 'vue'

const state = reactive({
  todoList:localStorage.getItem('todos')?JSON.parse(localStorage.getItem('todos')):[]
})

export const getTodoList = () => localStorage.getItem('todos')?JSON.parse(localStorage.getItem('todos')):[]
export const setTodoList = todoList => { state.todoList = todoList 
  localStorage.setItem('todos',JSON.stringify(state.todoList))
}
export const setTodoItem = todo => { 
  state.todoList.push(todo)
  localStorage.setItem('todos',JSON.stringify(state.todoList))
}

export const markAllTodos = status => { 
  setTodoList(state.todoList.map(item => ({ ...item, completed: status })))
}
