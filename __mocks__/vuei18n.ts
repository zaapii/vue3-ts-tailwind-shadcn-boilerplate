import { vi } from 'vitest'
import { ref } from 'vue'


const locale = ref('en')

const translations: Record<string, Record<string, string>> = {
  en: {
    'common.hello': 'Hello',
  },
  es: {
    'common.hello': 'Hola',
  },
  de: {
    'common.hello': 'Hallo',
  },
}

const t = vi.fn((key: string) => {
  return translations[locale.value]?.[key] ?? key
})

const useVueI18n = vi.fn(() => ({
  t,
  locale
}))

vi.mock('vue-i18n', () => ({
  createI18n: vi.fn(() => ({
    install: vi.fn(),
    global: {
      locale,
      t
    }
  })),
  useI18n: useVueI18n
}))