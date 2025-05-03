<script lang="ts" setup>
import { eventBus } from '@/composables/eventBus'

const target = ref()
const showWheel = ref(true)

async function close() {
  if (target.value !== undefined) {
    target!.value!.classList.add(`animate__animated`, 'animate__bounceOut')
    setTimeout(() => {
      eventBus.emit('wheelPageOpen', false)
      // $bus.$emit(eventTypes.change_page, 0)
      // delay(300)
      // $bus.$emit(eventTypes.show_bars, true)
    }, 500)
  } else {
    //console.log('target is undefined')
  }
}
// $bus.$on(eventTypes.close_wheel, close())

const mounted = ref(false)
onBeforeMount(() => {
  showWheel.value = true
})
onMounted(() => {
  showWheel.value = true
  mounted.value = true
})
</script>

<template>
  <div class="animate__animated animate__bounceIn fixed left-0 top-10">
    <div
      ref="target"
      class="fixed left-0 top-10 flex flex-col items-center justify-start overflow-y-hidden"
      style="
        background-image: url('/images/generic-back2.avif');
        width: 100vw;
        height: 85vh;
        /* border-image-slice: 15px; */
        border-image-slice: calc(50 / 184 * 100%) calc(80 / 284 * 100%) fill;

        border-image-repeat: round;
        border-image-width: 22px;
        padding: 2px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      "
    >
      <img
        src="/images/close.avif"
        style="z-index: 999; width: 50px; height: 50px; position: absolute; right: 0px; top: 0px"
        @click="close()"
      />
      <div style="margin: auto; font-size: 50px" class="onacona">
        <AuroraText>DAILY SPIN</AuroraText>
      </div>
      <DailyWheel style="width: 98vw; height: 100%" />
    </div>
  </div>
</template>
<style scoped>
.roxdisplay {
  /* color: #ffea00; A bright yellow */
  /* text-shadow: 0 0 1px black; */

  /* First layer: a subtle yellow glow */
  /* Make the text bold */
  /* font-weight: bold; */

  font-family: 'Rox Display', sans-serif;
  /* font-size: xx-large;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px; */
}
</style>
