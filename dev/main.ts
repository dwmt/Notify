import { createApp } from 'vue'
import { createNotify } from '../src/Notify'
import App from './App.vue'

const notify = createNotify()

createApp(App).use(notify).mount('#app')
