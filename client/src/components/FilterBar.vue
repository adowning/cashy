<script lang="ts" setup>
const display = ref(true)
const shakeIt = ref(false)
function changeGallery(x) {
  console.log(x)
}
</script>

<template>
  <!-- <div class="animate__animated animate__slideInUp"> -->
  <div
    class="flex flex-row justify-center mt-3"
    style="max-width: fit-content; margin-inline: auto"
  >
    <div
      v-show="display"
      class="basis-1/2 animate__animated animate__slideInUp flex"
      style="
        background-color: white !important;
        z-index: 21;
        background-repeat: no-repeat;
        background-color: transparent;
        justify-content: center;
        max-height: 50px;
        align-items: center;
      "
    >
      <img src="/images/side-arrow-prev.avif " class="mr-2 flex" style="text-align: center">
      <div class="animate__animated animate__slideInUp bottomDropper ml-2 flex p-0">
        <AllIcon :shake="shakeIt" />
      </div>
      <div class="animate__animated animate__slideInUp bottomDropper flex">
        <FishIcon :shake="shakeIt" />
      </div>
      <div class="animate__animated animate__slideInUp bottomDropper flex" @click="changeGallery(2)">
        <SlotsIcon :shake="shakeIt" />
      </div>
      <div
        class="animate__animated animate__slideInUp bottomDropper flex justify-center align-middle"
        @click="changeGallery(3)"
      />
      <img src="/images/side-arrow.avif" class="ml-2 flex" style="text-align: center">
    </div>
  </div>
</template>

<style scoped>
.bottomDropper {
  --animate-duration: 0.3s;
}

.div --active {
  /* color: var(--div -active-color); */
  background-color: transparent;
}

.div --active {
  /* color: var(--div -active-color); */
  background-color: transparent;
  margin-top: 5px;
}

.van-tabbar {
  height: 42px;
  font-family: 'bungeecolor';
}
</style>
