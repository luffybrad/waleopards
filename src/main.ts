import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
//fileuploads
import { VFileUpload } from 'vuetify/labs/VFileUpload'


import App from './App.vue'
import router from './router'



const app = createApp(App)
const vuetify = createVuetify({
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
  })


app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
