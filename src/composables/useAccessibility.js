import { useLocalStorage } from '@vueuse/core'
import { watch } from 'vue'

export function useAccessibility() {
  const isDark = useLocalStorage('ova-dark-mode', false)

  const toggleDark = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  const applyTheme = () => {
    const root = document.documentElement
    if (isDark.value) {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }
  }

  // Aplica al cargar
  applyTheme()
  watch(isDark, applyTheme)

  return { isDark, toggleDark }
}