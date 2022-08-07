import { reactive } from 'vue'

const state = reactive({
  todoList: []
})

export const getTodoList = () => state.todoList
export const setTodoList = todoList => { state.todoList = todoList }
export const setTodoItem = todo => { state.todoList.push(todo) }

export const markAllTodos = status => { 
  setTodoList(state.todoList.map(item => ({ ...item, completed: status })))
}
