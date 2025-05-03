<script setup lang="ts">
// import { useRequest } from '@/composables/useRequest'
// import type { User } from '@/hyper-fetch.request'

const wheel = ref()
const chocklight = ref()
const arr = [
  18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, 234, 252, 270, 288, 306, 324, 342,
]
const angle = ref()
function findClosest(target: number) {
  let closest = arr[0]
  let minDiff = Math.abs(arr[0] - target)

  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(arr[i] - target)

    if (diff < minDiff) {
      minDiff = diff
      closest = arr[i]
    }
  }

  return closest
}
// function setDegs(amt) {
//   const nli = li.sort((a, b) => Math.abs(amt - a) - Math.abs(amt - b))
//   //console.log(nli)
// }
// const { api } = useRequest()
// const state = useGlobalState()
const finished = ref(false)
const spinning = ref(false)
onMounted(() => {
  const wheel = document.querySelector('.wheel')
  const startButton = document.querySelector('.button')
  let deg = 0
  if (startButton == null) return
  startButton.addEventListener('click', () => {
    spinning.value = true
    // Disable button during spin
    // @ts-ignore
    startButton.style.pointerEvents = 'none'
    // Calculate a new rotation between 5000 and 10 000
    deg = Math.floor(1000 + Math.random() * 1000)
    //console.log(deg)
    // Set the transition on the wheel
    // @ts-ignore
    wheel.style.transition = 'all 4s ease-out'
    // Rotate the wheel
    // @ts-ignore
    wheel.style.transform = `rotate(${deg}deg)`
    // Apply the blur
    // wheel.classList.add('blur')
  })
  //   const r = ref(wheel?.value.style.transform)
  //   watch(r, w => {
  //     //console.log(w)
  //   })
  if (wheel == null) return
  wheel.addEventListener('transitionend', () => {
    // Remove blur
    // wheel.classList.remove('blur')
    // Enable button when spin is over
    // @ts-ignore
    startButton.style.pointerEvents = 'auto'
    finished.value = true
    // Need to set transition to none as we want to rotate instantly
    // @ts-ignore
    wheel.style.transition = 'none'
    // Calculate degree on a 360 degree basis to get the "natural" real rotation
    // Important because we want to start the next spin from that one
    // Use modulus to get the rest value from 360
    const actualDeg = deg % 360

    // Set the real rotation instantly without animation
    //console.log(actualDeg)
    //console.log(findClosest(actualDeg))
    // @ts-ignore
    wheel.style.transform = `rotate(${findClosest(actualDeg)}deg)`
    chocklight.value!.classList.remove(`animate__animated`, 'animate__pulse')
    chocklight.value!.classList.add(`animate__animated`, 'animate__fadeOut')
    finished.value = true

    setTimeout(async () => {
      // const u = await api.userControllerLastSpinUpdate.send()
      // state.value.currentUser.lastDailySpin = u.lastDailySpin
      spinning.value = false
    }, 500)
    setTimeout(() => {
      //   finished.value = false
      // @ts-ignore
      startButton.style.pointerEvents = 'click'
    }, 6000)
  })

  // })()
})
</script>

<template>
  <div
    ref="background"
    style="
      width: 100vw;
      margin-top: 105px;
      height: 100vh;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url('/images/wheel/wheel_background.png');
      position: relative;
    "
  >
    <img
      ref="wheel"
      class="wheel"
      :style="{ transform: `rotate(${angle}deg)` }"
      src="/images/wheel/wheel_board.png"
      style="position: absolute; padding: 10px"
    />
    <img
      class="chock"
      src="/images/wheel/wheel_chock.png"
      style="position: absolute; width: 100px; left: calc(50% - 50px); top: 4px"
    />
    <img
      v-show="spinning"
      ref="chocklight"
      class="chocklight animate__animated animate__pulse animate__infinite infinite animate__faster"
      src="/images/wheel/wheel_chocklight.png"
      style="
        position: absolute;
        width: 100px;
        left: calc(50% - 35px);
        top: 5px;
        height: 150px;
        width: 70px;
      "
    />
    <img
      class="button animate__animated animate__fadeIn"
      src="/images/wheel/wheel_button.png"
      style="position: absolute; padding: 50px"
      @click=""
    />
    <img
      v-if="spinning"
      class="button animate__animated animate__fadeIn"
      src="/images/logo.png"
      style="
        position: absolute;
        padding: 0px;
        width: 120px;
        left: calc(50% - 60px);
        top: calc(50% - 140px);
      "
    />
    <div
      v-if="finished"
      class="flex flex-col items-center justify-center"
      style="
        width: 100%;
        /* max-width: 335px; */
        position: absolute;
        bottom: 4px;
        top: 0px;
        margin: auto;
      "
    >
      <!-- <div class="flex" style="width: 5vw" /> -->
      <div
        class="button animate__animated animate__fadeIn flex flex-col items-center justify-end py-4 h-screen"
        style="
          background-size: 100% 100%;
          background-repeat: no-repeat;
          /* background-image: url('/images/wheel/wheel_scroll.avif'); */
          /* position: absolute; */
          padding: 0px;
          margin: 0px;
          left: 0px;
          bottom: 0px;
          height: 90%;
          width: 95%;
        "
      >
        <div
          class="flex flex-col items-center justify-center gap-0 pt-12 h-screen"
          style="
            width: 100%;
            margin: auto;
            padding-left: 12px;
            background-color: rgba(0, 0, 0, 0.5);
          "
        >
          <img
            class="button animate__animated animate__fadeIn animate__delay-.5s"
            src="/images/wheel/wheel_daybonus.png"
            style="margin: auto"
          />
          <img
            class="button animate__animated animate__fadeIn animate__delay-1s"
            src="/images/wheel/wheel_vipbonus.png"
            style="margin: auto"
          />
          <img
            class="button animate__animated animate__fadeIn animate__delay-2s"
            src="/images/wheel/wheel_friendbonus.png"
            style="margin: auto"
          />
          <!-- </div> -->
          <div
            v-if="finished"
            class="bungee flex flex-row animate__animated animate__bounceIn animate__delay-3s justify-center items-center pb-4"
            style="
              font-size: 60px;
              /* background: black; */
              /* color: black;/ */
              /* font-size: 4rem; */
              /* font-family: serif; */
              text-align: center;
              color: yellow;

              /* Text Shadow Property */
              -webkit-text-stroke-width: 1px;
              -webkit-text-stroke-color: black;
              background-size: contain;
              /* background-image: url('/images/wheel/patch.png'); */
              min-width: 50vw;
              /* letter-spacing: 3px; */
              /* width: 120px; */
            "
          >
            $55.03
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
