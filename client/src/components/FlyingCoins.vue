<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
// Assuming coinrotation.json is accessible at this path
import CoinRotationJson from '@/assets/anim/coinrotation.json'
// Assuming VGSprite component is accessible at this path
import VGSprite from './VGSprite.vue' // Adjust the import path as necessary
// import type { SpriteSheetData } from './VGSprite.vue' // Import the SpriteSheetData type

// Define the number of coin elements for the flight effect
const numberOfCoins = 5 // A group of 10 coins

// Array to hold the style properties for each coin element's container
const coinContainerStyles = ref<
  Array<{
    left: string
    top: string
    animationDelay: string
    animationDuration: string
  }>
>([])

// Spritesheet frame data directly from the imported JSON (matches updated SpriteSheetData interface)
// Cast the imported JSON to the SpriteSheetData type
// const frameData: SpriteSheetData = coinRotationJson as SpriteSheetData

// // Use the source size for the original sprite dimensions
// // Add checks to ensure frames array is not empty and the first frame exists before accessing sourceSize
// const sourceFrameWidth =
//   frameData.frames.length > 0 && frameData.frames[0].sourceSize
//     ? frameData.frames[0].sourceSize.w
//     : 0
// const sourceFrameHeight =
//   frameData.frames.length > 0 && frameData.frames[0].sourceSize
//     ? frameData.frames[0].sourceSize.h
//     : 0

// Calculate the desired display size (half the source size)
// const displayWidth = sourceFrameWidth > 0 ? sourceFrameWidth / 4 : 0
// const displayHeight = sourceFrameHeight > 0 ? sourceFrameHeight / 2 : 0

// Define the actual spritesheet dimensions (from the original plist data)
// This is required by the VGSprite component now
// const actualSpritesheetDimensions = { w: 120, h: 345 }

// Function to generate random styles for each coin container
const generateCoinContainerStyles = () => {
  const styles = []
  for (let i = 0; i < numberOfCoins; i++) {
    // Start position: Center-right of the screen
    // Add some randomness around the center-right point
    const startLeft = 50 + Math.random() * 2 // Between 50vw and 70vw
    const startTop = 100 + Math.random() * 2 // Between 50vh and 70vh

    // Stagger animation delay by a fixed amount for each coin (Increased to 0.4 seconds)
    const animationDelay = i * 0.2 // Stagger start by 0.4s for each coin
    // Random animation duration for varying flight speeds (halved for 2x speed)
    const animationDuration = (1.5 + Math.random() * 2) / 3 // Seconds (between 0.75s and 1.5s)

    styles.push({
      left: `${startLeft}vw`, // Initial horizontal position
      top: `${startTop}vh`, // Initial vertical position
      animationDelay: `${animationDelay}s`,
      animationDuration: `${animationDuration}s`,
    })
  }
  coinContainerStyles.value = styles
}

// Generate styles when the component is mounted
onMounted(() => {
  generateCoinContainerStyles()
  // Optionally regenerate styles on window resize if start/end points need adjustment
  // window.addEventListener('resize', generateCoinContainerStyles);
})

// Clean up resize listener when the component is unmounted
onUnmounted(() => {
  // window.removeEventListener('resize', generateCoinContainerStyles);
})
</script>

<template>
  <div class="coin-flight-overlay">
    <div
      v-for="(style, index) in coinContainerStyles"
      :key="index"
      class="flying-coin-container"
      :style="style"
    >
      <VGSprite
        id="coinFrames"
        class="flex"
        image-src="/images/CoinRotation-hd.png"
        :sprite-sheet-data="CoinRotationJson"
        style="
          background-repeat: no-repeat;
          z-index: 10;
          margin-top: -3px;
          margin-right: -1px;
          transform: scale(0.5) rotate(90deg);
        "
        :speed="30"
        :delay="index"
        :offset="0"
        :autoplay="true"
      />
    </div>
  </div>
</template>

<style scoped>
/* Fullscreen overlay styles */
.coin-flight-overlay {
  position: fixed; /* Fixed position to cover the entire viewport */
  top: 0;
  left: 0;
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  pointer-events: none; /* Allows clicks to pass through the overlay */
  overflow: hidden; /* Hide coins that fly outside the viewport */
  z-index: 1000; /* Ensure it's above most other content */
  background-color: transparent; /* Transparent background */
}

/* Styles for the container of each flying coin */
/* This container handles the flight animation and initial positioning */
.flying-coin-container {
  position: absolute; /* Position containers relative to the overlay */
  /* Initial 'left', 'top', 'animation-delay', 'animation-duration' are set inline based on generated styles */

  /* Set the size of the container to match the scaled coin size */
  /* The VGSprite component inside handles the actual sprite size and scaling */
  width: v-bind('displayWidth + "px"'); /* Refactored v-bind syntax */
  height: v-bind('displayHeight + "px"'); /* Refactored v-bind syntax */

  animation-name: fly-up; /* Apply the flight animation */
  animation-timing-function: ease-in-out; /* Smooth flight */
  animation-iteration-count: 1; /* Fly up once */
  animation-fill-mode: forwards; /* Keep the final state of the fly-up animation */

  /* The VGSprite component inside will handle the sprite animation and background */
}

/* Keyframes for the flying animation */
@keyframes fly-up {
  0% {
    /* Start from the initial position set by inline styles */
    transform: translate(0, 0);
    opacity: 0; /* Start visible */
  }
  10% {
    opacity: 1;
  }
  80% {
    /* Maintain full opacity until the last 10% of the animation */
    /* Adjust the translate values based on the element's starting point */
    /* For a start at 50vw, 50vh, flying to 0,0 requires moving -45vw and -45vh relative to start */
    /* transform: translate(-45vw, -90vh); Continue moving towards top-left */
    opacity: 1;
  }
  100% {
    /* Fly to the top-left corner and fade out over the last 10% of the animation duration */
    /* Adjust the translate values based on the element's starting point */
    /* For a start at 50vw, 50vh, flying to 0,0 requires moving -50vw and -50vh relative to start */
    transform: translate(-50vw, -95vh); /* Reach top-left */
    opacity: 0; /* Fade out */
  }
}

/* Remove the old sprite animation keyframes as VGSprite handles this */
/* @keyframes sprite-animation { ... } */

/* Utility classes for positioning (optional, can be done with inline styles) */
.d-flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
.align-center {
  align-items: center;
}
</style>
