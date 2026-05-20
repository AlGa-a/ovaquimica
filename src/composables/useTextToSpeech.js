import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export function useTextToSpeech() {
  const speakingId  = ref(null)
  const ttsEnabled  = useLocalStorage('ova-tts-enabled', true)
  const ttsRate     = useLocalStorage('ova-tts-rate', 0.9)

  const speak = (text, id) => {
    if (!ttsEnabled.value || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    speakingId.value = id
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'es-ES'
    u.rate = ttsRate.value
    u.pitch = 1.05
    u.onend  = () => { speakingId.value = null }
    u.onerror = () => { speakingId.value = null }
    window.speechSynthesis.speak(u)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    speakingId.value = null
  }

  return { speak, stop, speakingId, ttsEnabled, ttsRate }
}