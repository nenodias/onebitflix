import Vue from 'vue'

import vuetify from './plugin.vuetify'
import App from './app.vue'
import router from './routes.js';
import store from './store';
import 'vuetify/dist/vuetify.min.css'
import 'vue-dplayer/dist/vue-dplayer.css';
import 'slick-carousel/slick/slick.css';


document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    vuetify,
    router,
    store,
    el: '#app',
    render: h => h(App)
  })
})