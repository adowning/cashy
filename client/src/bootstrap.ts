// import { router } from '@/router'
import { createApp } from 'vue'
// import Vue3Marquee from 'vue3-marquee'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { setupStore } from './stores'
// import { posthog } from 'posthog-js'
import { router } from './router'
import InlineSvg from 'vue-inline-svg'

const app = createApp(App)
// const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY
// const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST

// posthog.init(POSTHOG_API_KEY, {
//   api_host: POSTHOG_HOST,
//   // Other PostHog options can be added here
// })
// // export  posthog
// export { posthog }

async function bootstrap(namespace: string) {
  // posthog.init(POSTHOG_API_KEY, {
  //   api_host: POSTHOG_HOST,
  //   // Other PostHog options can be added here
  // })
  app.use(VueQueryPlugin)
  // ;(window as any).posthog = posthog
  await setupStore(app)
  app.component('inline-svg', InlineSvg)

  app.use(router)
  // app.use(Vue3Marquee)
  app.mount('#app')
  // const playerId = ''
  // startSubscriptions()
}

export { bootstrap }
export default app
