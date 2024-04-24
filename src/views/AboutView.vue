<script lang="ts" setup>
import Card from 'primevue/card'
</script>

<template>
  <div class="flex justify-content-center">
    <Card class="w-50rem" style="max-width: 700px; min-width: 500px">
      <template #header>
        <div class="flex justify-content-center">
          <img src="/to-do-list-logo.png" class="w-10rem" />
        </div>
      </template>
      <template #title>
        <span class="flex justify-content-center">To Do App</span>
      </template>
      <template #content>
        <p>To Do app developed by Henrique Belotto for fun</p>
        <p>Tech Stack:</p>
        <ul>
          <li>Vue.JS 3</li>
          <li>PrimeVue for components</li>
          <li>PrimeFlex for some CSS</li>
          <li>Pinia for State Management</li>
          <li>Vue Router for routing</li>
        </ul>
        <div class="text-center">
          <small>Feel free to copy it or give me suggestions</small>
        </div>
      </template>
    </Card>
  </div>
</template>
