<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import ToDoItem from './ToDoItem.vue'
import { useTodoStore } from '@/stores/TodoStore'
import Listbox from 'primevue/listbox'
import type { TodoItemInterface } from '@/shared/Interfaces'
import { ref, type Ref, watchEffect } from 'vue'

const todoStore = useTodoStore()

const todoList = ref([{}])

watchEffect(() => {
  // watchEffect to get the change in number of rows as one is deleted or added
  todoList.value = todoStore.todoList
})
todoStore.todoList
const todoItem: Ref<TodoItemInterface | null> = ref({
  id: 0,
  title: '',
  notes: '',
  isCompleted: false,
})

const selectedTodoItemId = ref(0)

const isAddingNewItem = ref(false)

const showTodoModal = ref(false)

const isDeleting = ref(false)
const changeCompletedStatus = ref(false)

function addNewTodoItem() {
  isAddingNewItem.value = true
  showTodoModal.value = true
}

function newItemSavedOrCancel() {
  isAddingNewItem.value = false
  showTodoModal.value = false
}

function checkItemSelected() {
  // Item has been selected on the list. Check action to take
  if (todoItem.value !== null) {
    // Store Id in another variable, as the main variable will be cleaned up to remove selection from the list
    selectedTodoItemId.value = todoItem.value.id
    if (isDeleting.value) {
      deleteTodoItem()
    } else if (changeCompletedStatus.value) {
      // Change if item has been completed
      todoItem.value.isCompleted = !todoItem.value.isCompleted
    } else {
      showTodoModal.value = true
    }
  } else {
    showTodoModal.value = false
  }
  // reset variable values
  changeCompletedStatus.value = false
  isDeleting.value = false
}

function deleteTodoItem() {
  if (todoItem.value !== null) {
    todoStore.deleteTodoItem(todoItem.value.id)
  }
}
function listChangedValue() {
  // clean up selection on the list
  todoItem.value = null
}
</script>

<template>
  <div class="flex flex-column w-20">
    <div class="mb-2 flex align-items-center justify-content-center">
      <Listbox
        v-model="todoItem"
        :options="todoList"
        filter
        option-label="title"
        class="w-full md:w-5"
        @update:model-value="checkItemSelected"
        @change="listChangedValue"
      >
        <template #option="slotProps">
          <div class="flex flex-row justify-content-between">
            <div class="flex">
              <span :class="slotProps.option.isCompleted ? 'line-through' : ''">
                {{ slotProps.option.title }}</span
              >
            </div>
            <div class="flex">
              <div>
                <i
                  v-if="!slotProps.option.isCompleted"
                  class="pi pi-check px-2"
                  style="color: green; font-weight: bold"
                  @click="changeCompletedStatus = true"
                ></i>
                <i
                  v-else
                  class="pi pi-undo px-2"
                  style="color: green; font-weight: bold"
                  @click="changeCompletedStatus = true"
                >
                </i>
              </div>
              <span>&#124;</span>
              <div>
                <i
                  class="pi pi-pencil px-2"
                  style="color: blue; font-weight: bold"
                ></i>
              </div>
              <span>&#124;</span>
              <div @click="isDeleting = true">
                <i
                  class="pi pi-times px-2"
                  style="color: red; font-weight: bold"
                ></i>
              </div>
            </div>
          </div>
        </template>
      </Listbox>
    </div>

    <div class="flex align-items-center justify-content-center">
      <Button
        icon="pi pi-plus"
        label="Add new item"
        @click="addNewTodoItem"
      ></Button>
    </div>
    <!--Modal to add/edit Todo item-->
    <Dialog v-model:visible="showTodoModal" :modal="true">
      <ToDoItem
        :todo-item-id="selectedTodoItemId"
        :is-adding-new-item="isAddingNewItem"
        @modal-closed="newItemSavedOrCancel"
      ></ToDoItem>
    </Dialog>
  </div>
</template>
