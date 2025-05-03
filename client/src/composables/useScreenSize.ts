import { tryOnMounted, tryOnUnmounted, useDebounceFn } from '@vueuse/core'
import { onMounted, onUnmounted, reactive, toRefs } from 'vue'

interface UseWindowSizeOptions {
  wait?: number
  once?: boolean
  immediate?: boolean
  listenerOptions?: AddEventListenerOptions | boolean
}

function useWindowSizeFn(fn: any, options: UseWindowSizeOptions = {}) {
  const { wait = 150, immediate } = options
  let handler = () => {
    fn()
  }
  const handleSize = useDebounceFn(handler, wait)
  handler = handleSize

  const start = () => {
    if (immediate) handler()

    window.addEventListener('resize', handler)
  }

  const stop = () => {
    window.removeEventListener('resize', handler)
  }

  tryOnMounted(() => {
    start()
  })

  tryOnUnmounted(() => {
    stop()
  })
  return { start, stop }
}

export { useWindowSizeFn, type UseWindowSizeOptions }

export function useMonitorSize() {
  const MOBILE_WIDTH = 600
  const sizes = reactive({
    browserWidth: window.innerWidth,
    browserHeight: window.innerHeight,
    deviceWidth: screen.width,
    isMobile: false,
  })

  const browserResized = () => {
    sizes.browserWidth = window.innerWidth
    sizes.browserHeight = window.innerHeight
    sizes.deviceWidth = screen.width
    sizes.isMobile = isMobile()
  }

  const isMobile = () => {
    return window.innerWidth <= MOBILE_WIDTH ? true : false
  }

  onMounted(() => {
    window.addEventListener('resize', browserResized)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', browserResized)
  })

  return { ...toRefs(sizes) }
}
