<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/',
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    route: 'about',
  },
])
</script>

<template>
  <header>
    <div class="w-full">
      <Menubar
        :model="items"
        :pt="{
          root: {
            class: 'border-0; mb-3',
          },
        }"
      >
        <template #start>
          <a href="/">
            <img
              src="/to-do-list-logo.png"
              alt="Robot Factory"
              class="border-round mr-2"
              style="max-height: 50px"
            />
          </a>
        </template>
        <template #item="{ item, props }">
          <router-link
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
        </template>
      </Menubar>
    </div>
  </header>
  <!-- <RouterView /> -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="$route.path" />
    </transition>
  </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
