import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import Ripple from 'primevue/ripple'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })
app.component('CardComponent', Card)
app.directive('ripple', Ripple)

app.mount('#app')
