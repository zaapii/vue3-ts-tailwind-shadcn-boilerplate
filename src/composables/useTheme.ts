import { ref, computed } from 'vue'

export type Theme = 'light' | 'dark'

const currentTheme = ref<Theme>('light')

export function useTheme() {
  const isDark = computed(() => currentTheme.value.includes('dark'))
  const isLight = computed(() => currentTheme.value.includes('light'))

  function setTheme(newTheme: Theme) {
    const html = document.documentElement
    html.classList.add(newTheme)

    if (newTheme.includes('dark')) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    currentTheme.value = newTheme
    localStorage.setItem('app-theme', newTheme)
  }

  function setMode(mode: Theme) {
    setTheme(mode)
  }

  function toggleMode() {
    setMode(isDark.value ? 'light' : 'dark')
  }

  function loadSavedTheme() {
    const saved = localStorage.getItem('app-theme') as Theme | null
    if (saved) {
      setTheme(saved)
    } else {
      setTheme('light')
    }
  }

  return {
    // State
    currentTheme,
    isDark,
    isLight,

    // Actions
    setTheme,
    setMode,
    toggleMode,
    loadSavedTheme,
  }
}
