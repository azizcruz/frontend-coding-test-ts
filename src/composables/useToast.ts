import { ref } from 'vue'

type ToastTypes = 'info' | 'success' | 'error'

export default function useToast() {
  const isToastShown = ref<boolean>(false)
  const toastMessage = ref<string>('')
  const toastType = ref<ToastTypes>('info')

  function showToast(message: string, type: ToastTypes = 'info') {
    isToastShown.value = true
    toastMessage.value = message
    toastType.value = type
  }

  return {
    isToastShown,
    toastMessage,
    toastType,
    showToast,
  }
}
