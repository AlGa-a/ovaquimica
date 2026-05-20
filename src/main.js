import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import router from './router'
import App from './App.vue'
import './assets/main.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'qumitic',
    themes: {
      qumitic: {
        dark: true,
        colors: {
          primary:         '#7C3AED',
          'primary-soft':  '#2D1B6E',
          secondary:       '#00C8B4',
          background:      '#0B0620',
          surface:         '#140B33',
          'surface-alt':   '#1C1040',
          'on-background': '#F1F5F9',
          'on-surface':    '#F1F5F9',
          'on-primary':    '#FFFFFF',
          'on-secondary':  '#FFFFFF',
          success:         '#10B981',
          error:           '#F87171',
          warning:         '#FBBF24',
          info:            '#38BDF8',
        }
      }
    }
  }
})

createApp(App).use(vuetify).use(router).mount('#app')