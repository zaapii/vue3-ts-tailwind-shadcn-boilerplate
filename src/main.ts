import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import en from '@/locale/en.json'
import es from '@/locale/es.json'

import App from './App.vue'
import router from './router'
import './style.css'
import { SUPPORTED_LOCALES } from '@/composables/useI18n'

const getInitialLocale = (): string => {
  const savedLocale = localStorage.getItem('preferred-locale')
  const browserLocale = navigator.language.split('-')[0]
  
  if (savedLocale && SUPPORTED_LOCALES.some(l => l.code === savedLocale)) {
    return savedLocale
  }
  
  if (SUPPORTED_LOCALES.some(l => l.code === browserLocale)) {
    return browserLocale
  }
  
  return 'en'
}

const initialLocale = getInitialLocale()

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    es,
  },
})

document.documentElement.lang = initialLocale

const app = createApp(App)
app.use(router)
app.use(i18n)

app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
})

app.mount('#app')
