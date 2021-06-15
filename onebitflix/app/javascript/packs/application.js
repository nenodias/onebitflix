import Vue from 'vue'

import vuetify from './plugin.vuetify'
import App from './app.vue'
import router from './routes.js';
import 'vuetify/dist/vuetify.min.css'
import 'slick-carousel/slick/slick.css';


document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    vuetify,
    router,
    el: '#app',
    render: h => h(App)
  })
})