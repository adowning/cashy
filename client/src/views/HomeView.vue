<script setup lang="ts">
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useIsMobile } from '@/composables/useIsMobile'
import MobileDeposit from '@/components/deposit/mobile/index.vue'
const isMobile = useIsMobile()

// 监听 roomStore.participants 的变化，并更新 roomInfo.participants
</script>

<template>
  <LayoutAuthenticated>
    <TopBar class="animate__animated animate__slideInDown animate__delay-1s" />
    <div
      class="flex flex-col items-center justify-start"
      style="
        margin-top: 20px;
        z-index: 0;
        height: 90vh;
        overflow-y: scroll !important;
        overflow-x: hidden !important;
        padding-bottom: 70px;
      "
    >
      <!-- <BigWinsCarousel /> -->
      <!-- <LiveWin />
      <GameCarousel />
      <FilterBar />
      <AdCarousel /> -->
      <Deposit />
      <!-- <MobileDeposit /> -->
    </div>

    <FooterBar v-if="isMobile" class="animate__animated animate__slideInUp animate__delay-1s" />
    <CoinExplosion />
    <MBonusDashboard />
    <WheelPage />
  </LayoutAuthenticated>
</template>
