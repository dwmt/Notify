import { createApp } from 'vue'
import { createLib } from '../src/Lib'
import App from './App.vue'

const lib = createLib('example')

createApp(App).use(lib).mount('#app')
