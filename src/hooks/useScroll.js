import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from '@/utils/300tools'

export default function useScroll(reachBottomCB) {
  const isReachBottom = ref(false)

  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 节流处理
  const scrollListenerHandler = throttle(() => {
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      // if (reachBottomCB) reachBottomCB()
      isReachBottom.value = true
    }
    console.log(1111)
  }, 100)

  onMounted(() => {
    window.addEventListener('scroll', scrollListenerHandler)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}
