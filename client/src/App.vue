<script setup lang="ts">
import { onMounted } from 'vue'
// import LevelUpPopup from './components/LevelUpPopup.vue'
import LoginView from '@/views/LoginView.vue'
// import { initializeWebSocket } from './composables/useWebsocket' // Adjust path
// import { hydrateStores } from './stores'
// import { useUserStore } from './stores/user'
// import { router } from './router'
// import { loadingFadeOut } from 'virtual:app-loading'
// import { EventManager } from './composables/EventManager'
import { useAuthStore } from './stores/auth'
// import { useUserStore } from './stores/user'
// import { createAuthClient } from 'better-auth/vue'
import { loadingFadeOut } from 'virtual:app-loading'
import { useGlobalStore } from './stores/global'

// const authClient = createAuthClient()
const globalStore = useGlobalStore()

// const levelPopup = ref()
// // Get access to the shared state/functions
const { isLoading, stopLoading } = useLoading()
const { isMobile } = useIsMobile()
// const storesHydrated = ref(false)
// const showLevelUp = ref(false)
// const userStore = useUserStore()
// const userStore = useUserStore()
const authStore = useAuthStore()
// const eventManager = EventManager.getInstance()
// const currentUser = userStore.currentUser
// eventManager.on(
//   'level-up',
//   (level) => {
//     if (currentUser.vipRankLevel >= level) return
//     showLevelUp.value = true
//   },
//   levelPopup.value,
// )
watch(authStore.userInfo, (user) => {
  console.log('user', user)
  if (!user) return

  // showLevelUp.value = true
})
// onMounted(async () => {
//   // await hydrateStores()
//   // storesHydrated.value = true
//   // await authClient.init()
//   // await router.isReady()
//   // loadingFadeOut()
//   // stopLoading()
//

onMounted(async () => {
  var myHeaders = new Headers()
  // myHeaders.append("Cookie", "cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZjZGVlNTc4LWUxZmMtNDQ4MS1iMTEwLWVkOWNjMjVjNjc4MCIsImlhdCI6MTc0NTg4MjYwNCwiZXhwIjoxNzc3NDQwMjA0fQ.vk9EhUe88SnFBayXasBNcSYU14shCoOJR69wS67gGbY");
  // const token = localStorage.getItem('token')
  const token = authStore.token
  if (token !== undefined) {
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', `Bearer ${token}`)
    var requestOptions = {
      headers: myHeaders,
    }
    const user = await fetch('/api/auth/me', requestOptions)
    const _code = await user.json()
    if (_code.code != 200) authStore.isAuthenticated = false
    stopLoading()
    console.log(isLoading.value)
    loadingFadeOut()
  }
  // const { data, error } = await authClient.signUp.email({
  //   fetchOptions: {
  //     baseURL: 'http://localhost:3001/api/auth',
  //   },
  //   name: 'ash',
  //   email: 'ash@asdf.com',
  //   password: 'asdfasdf',
  // })
  // console.log(data, error)

  // try {
  //   // // Replace with your actual WebSocket server URL
  //   let WEBSOCKET_URL = 'wss://mobile.cashflowcasino.com/api/setup' // Test echo server
  //   // // Call this only ONCE!
  //   console.log(userStore.isAuthenticated)
  //   if (userStore.isAuthenticated == true) {
  //     storesHydrated.value = await hydrateStores()
  //     if (storesHydrated.value == true) {
  //       let token = userStore.token
  //       if (!token) token = localStorage.getItem('access_token')
  //       WEBSOCKET_URL += `?token=${token}`
  //       initializeWebSocket(WEBSOCKET_URL)
  //     } else {
  //       console.log('pushing to login')
  //       localStorage.clear()
  //       router.push('/login')
  //       loadingFadeOut()
  //     }
  //   } else {
  //     console.log('pushing to login')
  //     localStorage.clear()
  //     // stopLoading()
  //     router.push('/login')
  //     loadingFadeOut()
  //   }
  // } catch (e) {
  //   console.log(e)
  // }
})
</script>

<template>
  <div class="onacona">
    <template v-if="authStore.isAuthenticated">
      <DesktopSection v-if="!isMobile">
        <RouterView />
      </DesktopSection>
      <MobileSection v-if="isMobile">
        <GlobalLoading v-if="globalStore.isLoading"></GlobalLoading>
        <RouterView v-else />
      </MobileSection>
    </template>
    <template v-else-if="!authStore.isAuthenticated">
      <LoginView />
    </template>
    <!-- <LevelUpPopup ref="levelPopup" v-if="showLevelUp" :vipLevel="authStore.userInfo.vipRankLevel" /> -->
    <ShowToasts />
  </div>
</template>

<style scoped>
/* .glowing {
  @apply glowing-text;
} */
</style>
