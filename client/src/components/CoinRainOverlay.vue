<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import CoinRotationJson from '@/assets/anim/coinrotation.json'
//import CoinRotationImg from '@/assets/anim/CoinRotation-hd.png'
// Define the number of coin elements to create the "rain" effect
const numberOfCoins = 50 // Adjust this number to control density

// Reference to the container element for calculating positions (not strictly needed for this approach but kept)
const container = ref<HTMLElement | null>(null)

// Array to hold the style properties for each coin element
const coinStyles = ref<Array<{ left: string; animationDelay: string; animationDuration: string }>>(
  [],
)

// Spritesheet frame data from the plist JSON (UPDATED for CoinRotation-hd.png)
const frameData = {
  frames: {
    'CoinRotation/CoinAnim_0000.png': {
      textureRect: '{{1,70},{66,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
    'CoinRotation/CoinAnim_0001.png': {
      textureRect: '{{1,1},{68,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
    'CoinRotation/CoinAnim_0002.png': {
      textureRect: '{{1,139},{66,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
    'CoinRotation/CoinAnim_0003.png': {
      textureRect: '{{1,208},{60,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
    'CoinRotation/CoinAnim_0004.png': {
      textureRect: '{{69,70},{50,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
    'CoinRotation/CoinAnim_0005.png': {
      textureRect: '{{69,139},{42,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
    'CoinRotation/CoinAnim_0006.png': {
      textureRect: '{{63,277},{24,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
    'CoinRotation/CoinAnim_0007.png': {
      textureRect: '{{97,208},{20,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
    'CoinRotation/CoinAnim_0008.png': {
      textureRect: '{{89,277},{24,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
    'CoinRotation/CoinAnim_0009.png': {
      textureRect: '{{63,208},{32,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
    'CoinRotation/CoinAnim_0010.png': {
      textureRect: '{{71,1},{44,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
    'CoinRotation/CoinAnim_0011.png': {
      textureRect: '{{1,277},{60,67}}',
      textureRotated: false,
      spriteSourceSize: '{122,89}',
    },
  },
  metadata: {
    size: '{120,345}',
  },
}

// Extract frame names and sort them to ensure correct animation order
const frameNames = Object.keys(frameData.frames).sort()
// Use spriteSourceSize for element dimensions
const sourceSpriteSizeMatch =
  frameData.frames[frameNames[0]].spriteSourceSize.match(/\{(\d+),(\d+)\}/)

// Function to generate random styles for each coin
const generateCoinStyles = () => {
  const styles = []
  for (let i = 0; i < numberOfCoins; i++) {
    // Random horizontal position across the screen
    const left = Math.random() * 100 // Percentage
    // Random animation delay to stagger the rain effect
    const animationDelay = Math.random() * 3 // Seconds
    // Random animation duration for varying fall speeds
    const animationDuration = 0.5 + Math.random() * 1 // Seconds (between 2s and 5s)

    styles.push({
      left: `${left}vw`,
      animationDelay: `${animationDelay}s`,
      animationDuration: `${animationDuration}s`,
    })
  }
  coinStyles.value = styles
}

// Generate styles when the component is mounted
onMounted(() => {
  generateCoinStyles()
  // Regenerate styles on window resize to adjust positions if needed
  window.addEventListener('resize', generateCoinStyles)
})

// Clean up resize listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener('resize', generateCoinStyles)
})

// Generate CSS keyframes dynamically based on frame data (Not implemented in this direct CSS approach)
// This approach is more complex and often better handled by CSS preprocessors
// or build tools that understand spritesheet data.
// For a direct CSS approach, we'll hardcode the keyframes based on the parsed data.
// If the spritesheet or plist changes frequently, consider a build step to generate this CSS.
</script>

<template>
  <div class="coin-rain-overlay">
    <div v-for="(style, index) in coinStyles" :key="index" class="coin" :style="style">
      <VGSprite
        id="coinFrames"
        class="flex"
        image-src="/images/CoinRotation-hd.png"
        :sprite-sheet-data="CoinRotationJson"
        style="
          background-repeat: no-repeat;
          z-index: 10;
          margin-top: -63px;
          margin-right: -1px;
          transform: rotate(90deg);
        "
        :speed="30"
        :delay="0"
        :offset="0"
        :autoplay="true"
      />
    </div>
  </div>
</template>

<style scoped>
/* Fullscreen overlay styles */
.coin-rain-overlay {
  position: fixed; /* Fixed position to cover the entire viewport */
  top: 0;
  left: 0;
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  pointer-events: none; /* Allows clicks to pass through the overlay */
  overflow: hidden; /* Hide coins that fall outside the viewport */
  z-index: 1000; /* Ensure it's above most other content */
  background-color: transparent; /* Transparent background */
}

/* Styles for individual coin elements */
.coin {
  position: absolute; /* Position coins relative to the overlay */
  top: -89px; /* Start coins above the viewport by roughly their height (using source height) */
  /* width: 122px; Set width to the source sprite width */
  /* height: 89px; Set height to the source sprite height */
  /* background-image: url('@/assets/anim/CoinRotation-hd.png'); Path to your NEW spritesheet */
  /* background-size: 120px 345px; Set background size to the exact spritesheet dimensions */
  /* Animation properties */
  animation-name: fall; /* Combine falling and sprite animation */
  animation-timing-function: linear, steps(12); /* Linear fall, step animation for 12 frames */
  animation-iteration-count: infinite, infinite; /* Loop animations infinitely */
  /* animation-duration and animation-delay are set inline based on generated styles */

  /* The steps() value is set to 12, matching the number of frames in the plist data. */
  /* The sprite-animation keyframes use pixel values derived from the textureRect */
  /* in the plist data to position the background image for each frame. */
  /* None of the frames in this plist are rotated. */
}

/* Keyframes for the falling animation */
@keyframes fall {
  0% {
    transform: translateY(0); /* Start at the top */
  }
  100% {
    transform: translateY(100vh); /* Fall to the bottom of the viewport */
  }
}

/* Keyframes for the spritesheet animation */
/* This animates the background-position to cycle through frames based on plist data */
@keyframes sprite-animation {
  /*
  Frame data from plist (textureRect: {{x,y},{width,height}}):
  "CoinRotation/CoinAnim_0000.png": {{1,70},{66,67}}, rotated: false -> bg-position: -1px -70px
  "CoinRotation/CoinAnim_0001.png": {{1,1},{68,67}}, rotated: false -> bg-position: -1px -1px
  "CoinRotation/CoinAnim_0002.png": {{1,139},{66,67}}, rotated: false -> bg-position: -1px -139px
  "CoinRotation/CoinAnim_0003.png": {{1,208},{60,67}}, rotated: false -> bg-position: -1px -208px
  "CoinRotation/CoinAnim_0004.png": {{69,70},{50,67}}, rotated: false -> bg-position: -69px -70px
  "CoinRotation/CoinAnim_0005.png": {{69,139},{42,67}}, rotated: false -> bg-position: -69px -139px
  "CoinRotation/CoinAnim_0006.png": {{63,277},{24,67}}, rotated: false -> bg-position: -63px -277px
  "CoinRotation/CoinAnim_0007.png": {{97,208},{20,67}}, rotated: false -> bg-position: -97px -208px
  "CoinRotation/CoinAnim_0008.png": {{89,277},{24,67}}, rotated: false -> bg-position: -89px -277px
  "CoinRotation/CoinAnim_0009.png": {{63,208},{32,67}}, rotated: false -> bg-position: -63px -208px
  "CoinRotation/CoinAnim_0010.png": {{71,1},{44,67}}, rotated: false -> bg-position: -71px -1px
  "CoinRotation/CoinAnim_0011.png": {{1,277},{60,67}}, rotated: false -> bg-position: -1px -277px
  */
}

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
