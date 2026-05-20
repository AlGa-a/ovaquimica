import { useLocalStorage } from '@vueuse/core'
import { watch, onMounted } from 'vue'

export function useAccessibility() {
  const isDark = useLocalStorage('ova-dark-mode', false)

  const applyTheme = () => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark.value ? 'dark' : 'light'
    )
  }

  onMounted(applyTheme)
  watch(isDark, applyTheme)

  const toggleDark = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggleDark }
}