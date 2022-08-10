<template>
  <div class="todo-item">
    <div class="todo-item__checkbox">
      <input 
        v-model="isCompleted"
        type="checkbox"
        data-test="todo-item__checkbox"
        @change="$emit('on-change', isCompleted)"
      />
    </div>
    <div>
      <div
        v-if="!isActive"
         data-test="todo-item__label"
        v-text="inputValue"
        @dblclick="onDbClick"
      />
      <input 
        v-else
        data-test="todo-item__input"
        ref="inputElement"
        v-model="inputValue"
        type="text"
        @blur="onBlur"
        @keydown="onKeyDown"
      />
    </div>
    <a 
      href="" 
      class="todo-item__clear link-danger"
      data-test="todo-item__clear"
      @click.prevent="$emit('on-clear')"
    >
      <font-awesome-icon icon="fa-solid fa-trash-can" />
    </a>
  </div>
</template>

<script>
import { nextTick, reactive, ref, toRefs, watch } from 'vue'

export default {
  name: 'TodoItem',
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:model-value', 'on-change', 'on-clear'],
  setup (props, { emit }) {
    const inputElement = ref(null)
    const state = reactive({
      isActive: false,
      inputValue: '',
      isCompleted: false
    })

    watch(
      () => props.modelValue, 
      () => {
        state.inputValue = props.modelValue.title
        state.isCompleted = props.modelValue.completed
      }, 
      { immediate: true }
    )

    const onBlur = () => {
      state.isActive = false
      emit('update:model-value', state.inputValue)
    }

    const onDbClick = () => {
      state.isActive = true
      nextTick(() => inputElement.value.focus())
    }

    const onKeyDown = event => {
      if (event.keyCode === 27) {
        state.inputValue = props.modelValue.title
        state.isActive = false
      }
      if (event.keyCode === 13) state.isActive = false
    }

    return { ...toRefs(state), inputElement, onBlur, onDbClick, onKeyDown }
  }
}
</script>
<style>
.todo-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--size-base);
  border-bottom: 1px solid var( --color-main);
}

.todo-item__clear {
  position: absolute;
  top: 50%;
  right: var(--size-base);
  transform: translate(0, -50%);
  color: var(--color-link);
  text-decoration: none;
}

.todo-item__checkbox {
  margin-right: var(--size-base);
}
</style>