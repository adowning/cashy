<template>
  <div class="sprite-container" :style="containerStyle">
    <div class="sprite" :style="spriteStyle" @animationend="handleAnimationEnd"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'

interface SpriteFrame {
  textureRect: { x: number; y: number; width: number; height: number }
  spriteOffset: { x: number; y: number }
  spriteSize: { width: number; height: number }
  spriteSourceSize: { width: number; height: number }
  textureRotated: boolean
}

export default defineComponent({
  name: 'CoinAnimation',
  props: {
    scale: {
      type: Number,
      default: 1,
    },
    speed: {
      type: Number,
      default: 1,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    // Parse the plist data
    const frames: SpriteFrame[] = [
      // Frame 0
      {
        textureRect: { x: 1, y: 266, width: 45, height: 45 },
        spriteOffset: { x: 0, y: 0 },
        spriteSize: { width: 45, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: false,
      },
      // Frame 1
      {
        textureRect: { x: 1, y: 313, width: 45, height: 45 },
        spriteOffset: { x: 0, y: 0 },
        spriteSize: { width: 45, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: false,
      },
      // Frame 2
      {
        textureRect: { x: 1, y: 180, width: 41, height: 45 },
        spriteOffset: { x: -2, y: 0 },
        spriteSize: { width: 41, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: true,
      },
      // Frame 3
      {
        textureRect: { x: 1, y: 145, width: 33, height: 45 },
        spriteOffset: { x: -3, y: 0 },
        spriteSize: { width: 33, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: true,
      },
      // Frame 4
      {
        textureRect: { x: 1, y: 81, width: 29, height: 45 },
        spriteOffset: { x: -5, y: 0 },
        spriteSize: { width: 29, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: true,
      },
      // Frame 5
      {
        textureRect: { x: 1, y: 18, width: 17, height: 45 },
        spriteOffset: { x: -3, y: 0 },
        spriteSize: { width: 17, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: true,
      },
      // Frame 6
      {
        textureRect: { x: 1, y: 1, width: 15, height: 45 },
        spriteOffset: { x: -1, y: 0 },
        spriteSize: { width: 15, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: true,
      },
      // Frame 7
      {
        textureRect: { x: 1, y: 37, width: 17, height: 45 },
        spriteOffset: { x: 1, y: 0 },
        spriteSize: { width: 17, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: true,
      },
      // Frame 8
      {
        textureRect: { x: 1, y: 56, width: 23, height: 45 },
        spriteOffset: { x: 1, y: 0 },
        spriteSize: { width: 23, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: true,
      },
      // Frame 9
      {
        textureRect: { x: 1, y: 112, width: 31, height: 45 },
        spriteOffset: { x: 1, y: 0 },
        spriteSize: { width: 31, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: true,
      },
      // Frame 10
      {
        textureRect: { x: 1, y: 223, width: 41, height: 45 },
        spriteOffset: { x: 1, y: 0 },
        spriteSize: { width: 41, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: true,
      },
      // Frame 11
      {
        textureRect: { x: 1, y: 360, width: 45, height: 45 },
        spriteOffset: { x: 0, y: 0 },
        spriteSize: { width: 45, height: 45 },
        spriteSourceSize: { width: 45, height: 45 },
        textureRotated: false,
      },
    ]

    const currentFrame = ref(0)
    const isPlaying = ref(props.autoplay)
    const animationInterval = ref<number | null>(null)

    // Calculate animation duration based on speed prop
    const frameDuration = computed(() => 100 / props.speed)

    // Sprite sheet dimensions
    const spriteSheetWidth = 47
    const spriteSheetHeight = 406

    // Calculate styles
    const containerStyle = computed(() => ({
      width: `${frames[0].spriteSourceSize.width * props.scale}px`,
      height: `${frames[0].spriteSourceSize.height * props.scale}px`,
      position: 'relative',
      overflow: 'hidden',
    }))

    const spriteStyle = computed(() => {
      const frame = frames[currentFrame.value]
      const bgX = -frame.textureRect.x * props.scale
      const bgY = -frame.textureRect.y * props.scale

      return {
        position: 'absolute',
        width: `${spriteSheetWidth * props.scale}px`,
        height: `${spriteSheetHeight * props.scale}px`,
        backgroundImage: `url('/images/CoinFallAnimationSmall_00-hd.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${spriteSheetWidth * props.scale}px ${spriteSheetHeight * props.scale}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        transform: frame.textureRotated ? 'rotate(90deg)' : 'none',
        left: `${frame.spriteOffset.x * props.scale}px`,
        top: `${frame.spriteOffset.y * props.scale}px`,
      }
    })

    // Animation control
    const startAnimation = () => {
      if (animationInterval.value) {
        clearInterval(animationInterval.value)
      }

      isPlaying.value = true
      animationInterval.value = window.setInterval(() => {
        currentFrame.value = (currentFrame.value + 1) % frames.length

        // If not looping and we've reached the last frame, stop
        if (!props.loop && currentFrame.value === frames.length - 1) {
          stopAnimation()
          emit('animationend')
        }
      }, frameDuration.value)
    }

    const stopAnimation = () => {
      if (animationInterval.value) {
        clearInterval(animationInterval.value)
        animationInterval.value = null
      }
      isPlaying.value = false
    }

    const resetAnimation = () => {
      currentFrame.value = 0
    }

    const handleAnimationEnd = () => {
      emit('animationend')
    }

    // Lifecycle hooks
    onMounted(() => {
      if (props.autoplay) {
        startAnimation()
      }
    })

    onBeforeUnmount(() => {
      if (animationInterval.value) {
        clearInterval(animationInterval.value)
      }
    })

    // Expose methods
    return {
      currentFrame,
      isPlaying,
      containerStyle,
      spriteStyle,
      startAnimation,
      stopAnimation,
      resetAnimation,
      handleAnimationEnd,
    }
  },
})
</script>

<style scoped>
.sprite-container {
  display: inline-block;
}

.sprite {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
