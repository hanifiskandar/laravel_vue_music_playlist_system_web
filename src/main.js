import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import router from './router'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Notifications from '@kyvg/vue3-notification'

import '../axios'; 

const app = createApp(App);
const pinia = createPinia();

const vuetify = createVuetify({
    components,
    directives,
  })

app.use(pinia)
app.use(router)
app.use(Notifications)
app.use(vuetify)

app.mount("#app")

// createApp(App).mount('#app')
