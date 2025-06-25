import { computed, readonly, ref, watch } from 'vue'
import { useI18n as useVueI18n } from 'vue-i18n'

export type SupportedLocale = 'en' | 'es'

export interface LocaleInfo {
  code: SupportedLocale
  name: string
  nativeName: string
  flag: string
}

export const SUPPORTED_LOCALES: LocaleInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸'
  },
]

export function useI18n() {
  const { t, locale } = useVueI18n()

  const currentLocale = ref<SupportedLocale>(locale.value as SupportedLocale)

  watch(locale, (newLocale) => {
    currentLocale.value = newLocale as SupportedLocale
  }, { immediate: true })

  const currentLocaleInfo = computed(() =>
    SUPPORTED_LOCALES.find(l => l.code === currentLocale.value) || SUPPORTED_LOCALES[0]
  )

  const availableLocales = computed(() =>
    SUPPORTED_LOCALES.filter(l => l.code !== currentLocale.value)
  )

  const changeLocale = (newLocale: SupportedLocale) => {
    currentLocale.value = newLocale
    locale.value = newLocale

    document.documentElement.lang = newLocale

    localStorage.setItem('preferred-locale', newLocale)
  }

  const translate = (key: string, params?: Record<string, unknown>) => {
    return params ? t(key, params) : t(key)
  }

  return {
    currentLocale: readonly(currentLocale),
    currentLocaleInfo: readonly(currentLocaleInfo),
    availableLocales: readonly(availableLocales),

    changeLocale,

    t: translate,

    SUPPORTED_LOCALES
  }
} 