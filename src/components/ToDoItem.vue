<script setup lang="ts">
import { type Ref, ref, computed } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import type { TodoItemInterface } from '@/shared/Interfaces'
import { useTodoStore } from '@/stores/TodoStore'

const todoStore = useTodoStore()

const emit = defineEmits(['modal-closed'])

const props = defineProps({
  todoItemId: {
    type: Number,
    default: 0,
  },
  isAddingNewItem: {
    type: Boolean,
    default: true,
  },
})

const todoItem: Ref<TodoItemInterface> = ref({
  id: 0,
  title: '',
  notes: '',
  isCompleted: false,
})

if (!props.isAddingNewItem) {
  todoItem.value = todoStore.getTodoItem(props.todoItemId)
} else {
  todoItem.value = {
    id: 0,
    title: '',
    notes: '',
    isCompleted: false,
  }
}

const cardTitle = computed(() => {
  return props.isAddingNewItem ? 'Add a new item' : 'Edit your item'
})

function addOrUpdateItem() {
  if (props.isAddingNewItem) {
    if (todoItem.value !== null) {
      todoStore.addNewTodoItem(todoItem.value)
      // resetTodoItem()
    }
  }
  todoStore.updateTodoItem(todoItem.value)
  emit('modal-closed')
}

function cancel() {
  emit('modal-closed')
}
</script>

<template>
  <div style="max-width: 700px; min-width: 500px">
    <Card>
      <template #title>
        <div class="flex justify-content-center">
          {{ cardTitle }}
        </div>
      </template>
      <template #content>
        <div class="flex flex-column">
          <div class="mb-3 field grid">
            <label for="title" class="col-2 mb-0">Title:</label>
            <div class="col-10">
              <InputText
                id="title"
                v-model="todoItem.title"
                maxlength="36"
                class="w-full"
              ></InputText>
            </div>
          </div>
          <div class="mb-3 field grid">
            <label for="notes" class="col-2 mb-0">Notes:</label>
            <div class="col-10">
              <Textarea
                id="notes"
                v-model="todoItem.notes"
                class="w-full"
                rows="3"
                cols="40"
                maxlength="108"
                style="max-height: 80px"
              ></Textarea>
            </div>
          </div>
          <div class="mb-3">
            <label for="isCompleted" class="mr-2">Is it completed?</label>
            <Checkbox v-model="todoItem.isCompleted" :binary="true" />
          </div>
        </div>
      </template>
      <template #footer>
        <Divider></Divider>
        <div clas="flex flex-row">
          <div class="flex align-items-center justify-content-center">
            <Button
              label="Cancel"
              severity="danger"
              class="mr-3"
              @click="cancel"
            ></Button>
            <Button
              label="Save"
              severity="success"
              @click="addOrUpdateItem"
            ></Button>
          </div></div
      ></template>
    </Card>
  </div>
</template>
