import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TodoItemInterface } from '@/shared/Interfaces'

export const useTodoStore = defineStore('TodoStore', () => {
  // state
  const todoList = ref<TodoItemInterface[]>([])
  // actions
  function addNewTodoItem(todoItem: TodoItemInterface) {
    todoItem.id = todoList.value.length + 1
    todoList.value.push(todoItem)
  }
  function updateTodoItem(todoItem: TodoItemInterface | null) {
    if (todoItem !== null) {
      const itemToUpdate = todoList.value.find((x) => x.id === todoItem.id)
      if (itemToUpdate) {
        itemToUpdate.title = todoItem.title
        itemToUpdate.notes = todoItem.notes
        itemToUpdate.isCompleted = todoItem.isCompleted
      }
    }
  }
  function deleteTodoItem(id: number) {
    todoList.value = todoList.value.filter((object) => {
      return object.id !== id
    })
  }
  function getTodoItem(id: number) {
    const { ...todoItem } = todoList.value.find(
      (x) => x.id === id
    ) as TodoItemInterface
    return todoItem
  }

  // getters

  return {
    todoList,
    addNewTodoItem,
    updateTodoItem,
    deleteTodoItem,
    getTodoItem,
  }
})
