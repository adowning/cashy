<script setup lang="ts">
import LeaderJson from '@/assets/anim/leadernew.json'
import Part3Json from '@/assets/anim/part3.json'
import { useUserStore } from '@/stores/user'
import { useAppBarStore } from '@/stores/appBar'
import { useDepositStore } from '@/stores/deposit'
import { ref } from 'vue'
import { eventBus } from '@/composables/eventBus'
import VaultJson from '@/assets/anim/vault.json'

const target = ref()

const userStore = useUserStore
const depositStore = useDepositStore()
const appBarStore = useAppBarStore()
// const coinframes = {
//   frames: {
//     'CoinRotation/CoinAnim_0000.png': {
//       textureRect: '{{1,70},{66,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//     'CoinRotation/CoinAnim_0001.png': {
//       textureRect: '{{1,1},{68,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//     'CoinRotation/CoinAnim_0002.png': {
//       textureRect: '{{1,139},{66,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//     'CoinRotation/CoinAnim_0003.png': {
//       textureRect: '{{1,208},{60,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//     'CoinRotation/CoinAnim_0004.png': {
//       textureRect: '{{69,70},{50,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//     'CoinRotation/CoinAnim_0005.png': {
//       textureRect: '{{69,139},{42,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//     'CoinRotation/CoinAnim_0006.png': {
//       textureRect: '{{63,277},{24,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//     'CoinRotation/CoinAnim_0007.png': {
//       textureRect: '{{97,208},{20,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//     'CoinRotation/CoinAnim_0008.png': {
//       textureRect: '{{89,277},{24,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//     'CoinRotation/CoinAnim_0009.png': {
//       textureRect: '{{63,208},{32,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//     'CoinRotation/CoinAnim_0010.png': {
//       textureRect: '{{71,1},{44,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//     'CoinRotation/CoinAnim_0011.png': {
//       textureRect: '{{1,277},{60,67}}',
//       textureRotated: false,
//       spriteSourceSize: '{122,89}',
//     },
//   },
// }

const currentUser = userStore.currentUser
const showFab = ref(true)
const pressed = ref(false)
const isMobile = useIsMobile()
const shopOpen = ref(false)
const leaderBoardOpen = ref(false)
const rightDrawer = ref(false)
const bonusDrawer = ref(false)
const wheelPageOpen = ref(false)
function toggleChat() {
  rightDrawer.value = !rightDrawer.value
  // console.log(appBarStore.rightBarToggle)
  appBarStore.setRightBarToggle(rightDrawer.value)
  // appBarStore.setRightBarToggle(!appBarStore.getRightBarToggle())
}
function toggleBonusDrawer() {
  bonusDrawer.value = !bonusDrawer.value
  // console.log(appBarStore.rightBarToggle)
  appBarStore.setBonusDashboardDialogVisible(bonusDrawer.value)
  // appBarStore.setRightBarToggle(!appBarStore.getRightBarToggle())
}

// function changeShopOpen() {
//   shopOpen.value = true
//   console.log(shopOpen.value)
//   eventBus.emit('shopOpen', shopOpen.value)
// }
function _toggleShopOpen() {
  console.log('asdf')
  depositStore.toggleShopOpen()
}
function changeLeaderBoardOpen() {
  console.log(leaderBoardOpen)
  leaderBoardOpen.value = true
  eventBus.emit('leaderBoardOpen', leaderBoardOpen.value)
}
function changeWheelPageOpen() {
  pressed.value = !pressed.value
  leaderBoardOpen.value = true
  eventBus.emit('wheelPageOpen', wheelPageOpen.value)
}
</script>

<template>
  <div
    ref="target"
    class="bbar animate__animated animate__slideInUp flex"
    style="width: 100vw"
    :style="isMobile === false ? 'max-width: 480px' : ''"
  >
    <!-- <BaseLevel> -->
    <div
      class="animate__animated animate__slideInUp animate__delay-1s flex flex-row justify-start gap-12 px-6"
      style="
        width: 100%;
        z-index: 888;
        background-image: url('/images/slice.avif');
        background-size: contain;
      "
    >
      <div
        class="items-end justify-start"
        style="display: flex; flex-wrap: nowrap; grid-gap: 0px; padding: 2px"
      >
        <div class="wn-btn-item" @click="changeWheelPageOpen">
          <WheelIcon
            :pressed="pressed"
            :current-user="currentUser"
            style="z-index: 999; margin-bottom: 35px; margin-left: -32px"
          />
        </div>
        <div class="flex w-9" />

        <div class="wn-btn-item" @click="changeLeaderBoardOpen()">
          <VGSprite
            id="leader"
            class="flex"
            image-src="/images/bottom/leadernew.png"
            :sprite-sheet-data="LeaderJson"
            style="background-repeat: no-repeat; z-index: 10; margin-top: -58px; margin-right: 5px"
            :speed="30"
            :delay="3500"
            :offset="12000"
            :autoplay="true"
          />
          <span class="glow rounded-lg px-1" style="font-size: 16px; line-height: 1.3"
            >Battles</span
          >
        </div>
        <div class="flex w-5" />
        <div class="wn-btn-item mr-3 pt-22" style="margin-top: 19px" @click="_toggleShopOpen">
          <VGSprite
            id="vaultIcon"
            class="flex"
            image-src="/images/vault.png"
            :sprite-sheet-data="VaultJson"
            style="
              background-repeat: no-repeat;
              z-index: 10;
              margin-top: -200px;
              padding-top: 30px;
              margin-right: -27px;
              transform: scale(0.6) translateY(55px);
            "
            :speed="60"
            :delay="6000"
            :offset="5000"
            :autoplay="true"
          />
          <span
            class="glow align-center justify-center rounded-lg px-1"
            style="font-size: 16px; line-height: 1.3"
            >Deposit</span
          >
        </div>
      </div>

      <!-- <div
        v-if="showFab"
        class="w-full relative items-end justify-end"
        style="
          width: 80px;
          height: 80px;
          max-width: 80px;
          max-height: 80px;
          background-color: green;
        "
        @click="toggleBonusDrawer()"
      > -->
      <div
        style="
          position: absolute;
          right: 0px;
          bottom: 11px;
          background-repeat: no-repeat;
          padding: 0px;
          background-size: cover;
          min-height: 90px;
          height: 90px;
          z-index: 99999;
          width: 90px;
          /* margin-left: 50px; */
          background-image: url('/images/bottom/bottombarback-center3.avif');
        "
      />
      <VGSprite
        id="part3Icon"
        class="flex"
        image-src="/images/part3_blue.png"
        :sprite-sheet-data="Part3Json"
        style="
          position: absolute;
          background-repeat: no-repeat;
          z-index: 10;
          /* margin-top: -100px; */
          right: 0px;
          bottom: 17px;
          margin-top: -6px;
          margin-right: 3.5px;
          /* transform: translateY(55px); */
        "
        :speed="30"
        :delay="0"
        :offset="0"
        :autoplay="true"
      />
      <!-- </div> -->
    </div>
    <!-- </BaseLevel> -->
  </div>
</template>

<style scoped>
.bbar {
  background-size: cover;
  position: absolute;
  height: 47px;
  background-position: center;
  bottom: 0px;
  left: 0px;
  background-repeat: no-repeat;
}

.wn-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-basis: 100%;
  transition: all 0.3s;
  box-sizing: border-box;
}

@media (min-width: 576px) {
  .wn-btn-container {
    cursor: pointer;
  }
}

.wn-btn-item {
  width: 62px;
  max-width: 62px;
  min-width: 62px;
  color: white;
  height: 70%;
  max-height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  position: relative;
}
</style>
