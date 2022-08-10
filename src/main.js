import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import '@/assets/base.css'
import App from './App.vue'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core"
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faTrashCan)

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"