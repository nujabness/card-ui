import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createApiClient } from './plugins/api'

loadFonts()

createApp(App)
    .use(vuetify)
    .use(createApiClient({ apiUrl: 'http://localhost:8080' }))
    .mount('#app')
