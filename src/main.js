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
        dark: false,
        colors: {
          primary:         '#6B21A8',
          'primary-light': '#9333EA',
          'primary-soft':  '#F3E8FF',
          secondary:       '#00C8B4',
          background:      '#F8F7FF',
          surface:         '#FFFFFF',
          'surface-alt':   '#F3E8FF',
          'on-background': '#1E1B4B',
          'on-surface':    '#1E1B4B',
          'on-primary':    '#FFFFFF',
          'on-secondary':  '#FFFFFF',
          success:         '#059669',
          error:           '#DC2626',
          warning:         '#D97706',
          info:            '#0EA5E9',
        }
      },
      qumitic_dark: {
        dark: true,
        colors: {
          primary:         '#9333EA',
          'primary-light': '#A855F7',
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