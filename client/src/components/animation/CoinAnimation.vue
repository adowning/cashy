<template>
  <div>
    <CoinAnimation :scale="2" :speed="1.5" :loop="true" @animationend="handleAnimationEnd" />
    <button @click="toggleAnimation">
      {{ animation.isPlaying ? 'Stop' : 'Play' }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CoinRotation from './CoinRotation.vue'

export default defineComponent({
  components: {
    CoinRotation,
  },
  setup() {
    const animation = ref({
      isPlaying: true,
    })

    const toggleAnimation = () => {
      if (animation.value.isPlaying) {
        // You would call stopAnimation() here via ref if needed
      } else {
        // You would call startAnimation() here via ref if needed
      }
      animation.value.isPlaying = !animation.value.isPlaying
    }

    const handleAnimationEnd = () => {
      console.log('Animation ended')
    }

    return {
      animation,
      toggleAnimation,
      handleAnimationEnd,
    }
  },
})
</script>
