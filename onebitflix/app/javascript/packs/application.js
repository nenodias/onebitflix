import Vue from 'vue'

import vuetify from './plugin.vuetify'
import App from './app.vue'
import 'vuetify/dist/vuetify.min.css'


document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    vuetify,
    el: '#app',
    render: h => h(App)
  })
})