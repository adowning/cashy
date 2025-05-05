<script setup lang="ts">
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useIsMobile } from '@/composables/useIsMobile'
// import MobileDeposit from '@/components/deposit/mobile/index.vue'
const isMobile = useIsMobile()

// // 监听 roomStore.participants 的变化，并更新 roomInfo.participants
// const coinRainActive = ref(false)

// const toggleCoinRain = () => {
//   coinRainActive.value = !coinRainActive.value
// }
</script>

<template>
  <LayoutAuthenticated>
    <TopBar class="animate__animated animate__slideInDown animate__delay-1s" />
    <div
      class="flex flex-col items-center justify-start"
      style="
        margin-top: 70px;
        z-index: 0;
        height: 90vh;
        overflow-y: scroll !important;
        overflow-x: hidden !important;
        padding-bottom: 70px;
      "
    >
      <!-- <button @click="toggleCoinRain">
        {{ coinRainActive ? 'Stop Coin Rain' : 'Start Coin Rain' }}
      </button> -->
      <!-- <CoinRainOverlay /> -->
      <!-- <Coinfall />
      <CoinRainAnimation /> -->
      <!-- <Coin :scale="2" :speed="1.5" :loop="true" @animationend="handleAnimationEnd" />
      <button @click="toggleAnimation">
        {{ animation.isPlaying ? 'Stop' : 'Play' }}
      </button> -->
      <!-- <BigWinsCarousel /> -->
      <LiveWin />
      <GameCarousel />
      <FilterBar />
      <AdCarousel />
      <!-- <FlyingCoins /> -->
      <test />
      <!-- <Deposit />
      <Deposit /> -->
    </div>

    <FooterBar v-if="isMobile" class="animate__animated animate__slideInUp animate__delay-1s" />
    <CoinExplosion />
    <MBonusDashboard />
    <WheelPage />
  </LayoutAuthenticated>
</template>
