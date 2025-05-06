<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Define the number of coin elements to create the "rain" effect
const numberOfCoins = 50 // Adjust this number to control density

// Reference to the container element for calculating positions (not strictly needed for this approach but kept)
const container = ref<HTMLElement | null>(null)

// Array to hold the style properties for each coin element
const coinStyles = ref<Array<{ left: string; animationDelay: string; animationDuration: string }>>(
  [],
)

// Spritesheet frame data from the plist JSON
const frameData = {
  frames: {
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0000.png': {
      textureRect: '{{1,266},{45,45}}',
      textureRotated: false,
    },
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0001.png': {
      textureRect: '{{1,313},{45,45}}',
      textureRotated: false,
    },
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0002.png': {
      textureRect: '{{1,180},{41,45}}',
      textureRotated: true,
    },
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0003.png': {
      textureRect: '{{1,145},{33,45}}',
      textureRotated: true,
    },
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0004.png': {
      textureRect: '{{1,81},{29,45}}',
      textureRotated: true,
    },
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0005.png': {
      textureRect: '{{1,18},{17,45}}',
      textureRotated: true,
    },
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0006.png': {
      textureRect: '{{1,1},{15,45}}',
      textureRotated: true,
    },
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0007.png': {
      textureRect: '{{1,37},{17,45}}',
      textureRotated: true,
    },
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0008.png': {
      textureRect: '{{1,56},{23,45}}',
      textureRotated: true,
    },
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0009.png': {
      textureRect: '{{1,112},{31,45}}',
      textureRotated: true,
    },
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0010.png': {
      textureRect: '{{1,223},{41,45}}',
      textureRotated: true,
    },
    'CoinFallAnimationSmall_00/CoinFallAnimationSmall_0011.png': {
      textureRect: '{{1,360},{45,45}}',
      textureRotated: false,
    },
  },
  metadata: {
    size: '{47,406}',
  },
}

// Extract frame names and sort them to ensure correct animation order
const frameNames = Object.keys(frameData.frames).sort()
const totalFrames = frameNames.length
const spritesheetWidth = parseInt(frameData.metadata.size.match(/\{(\d+),\d+\}/)?.[1] || '47')
const spritesheetHeight = parseInt(frameData.metadata.size.match(/\{\d+,(\d+)\}/)?.[1] || '406')
const frameWidth = 45 // Source sprite width
const frameHeight = 45 // Source sprite height

// Function to generate random styles for each coin
const generateCoinStyles = () => {
  const styles = []
  for (let i = 0; i < numberOfCoins; i++) {
    // Random horizontal position across the screen
    const left = Math.random() * 100 // Percentage
    // Random animation delay to stagger the rain effect
    const animationDelay = Math.random() * 5 // Seconds
    // Random animation duration for varying fall speeds
    const animationDuration = 2 + Math.random() * 3 // Seconds (between 2s and 5s)

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

// Generate CSS keyframes dynamically based on frame data
// This approach is more complex and often better handled by CSS preprocessors
// or build tools that understand spritesheet data.
// For a direct CSS approach, we'll hardcode the keyframes based on the parsed data.
// If the spritesheet or plist changes frequently, consider a build step to generate this CSS.
</script>

<template>
  <div class="coin-rain-overlay">
    <div v-for="(style, index) in coinStyles" :key="index" class="coin" :style="style"></div>
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
  top: -50px; /* Start coins above the viewport by roughly their height */
  width: 45px; /* Set width to the source sprite width */
  height: 45px; /* Set height to the source sprite height */
  background-image: url('@/assets/anim/CoinFallAnimationSmall_00-hd.png'); /* Path to your spritesheet */
  background-size: 47px 406px; /* Set background size to the exact spritesheet dimensions */

  /* Animation properties */
  animation-name: fall, sprite-animation; /* Combine falling and sprite animation */
  animation-timing-function: linear, steps(12); /* Linear fall, step animation for 12 frames */
  animation-iteration-count: infinite, infinite; /* Loop animations infinitely */
  /* animation-duration and animation-delay are set inline based on generated styles */

  /* The steps() value is set to 12, matching the number of frames in the plist data. */
  /* The sprite-animation keyframes use pixel values derived from the textureRect */
  /* in the plist data to position the background image for each frame. */
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
  Frame data from plist:
  "CoinFallAnimationSmall_0000.png": {{1,266},{45,45}}, rotated: false -> bg-position: -1px -266px
  "CoinFallAnimationSmall_0001.png": {{1,313},{45,45}}, rotated: false -> bg-position: -1px -313px
  "CoinFallAnimationSmall_0002.png": {{1,180},{41,45}}, rotated: true  -> bg-position: -180px -1px (swapped and adjusted for rotation)
  "CoinFallAnimationSmall_0003.png": {{1,145},{33,45}}, rotated: true  -> bg-position: -145px -1px
  "CoinFallAnimationSmall_0004.png": {{1,81},{29,45}}, rotated: true   -> bg-position: -81px -1px
  "CoinFallAnimationSmall_0005.png": {{1,18},{17,45}}, rotated: true   -> bg-position: -18px -1px
  "CoinFallAnimationSmall_0006.png": {{1,1},{15,45}}, rotated: true    -> bg-position: -1px -1px
  "CoinFallAnimationSmall_0007.png": {{1,37},{17,45}}, rotated: true   -> bg-position: -37px -1px
  "CoinFallAnimationSmall_0008.png": {{1,56},{23,45}}, rotated: true   -> bg-position: -56px -1px
  "CoinFallAnimationSmall_0009.png": {{1,112},{31,45}}, rotated: true  -> bg-position: -112px -1px
  "CoinFallAnimationSmall_0010.png": {{1,223},{41,45}}, rotated: true  -> bg-position: -223px -1px
  "CoinFallAnimationSmall_0011.png": {{1,360},{45,45}}, rotated: false -> bg-position: -1px -360px
  */

  0% {
    background-position: -1px -266px;
  } /* Frame 0000 */
  8.33% {
    background-position: -1px -313px;
  } /* Frame 0001 (100% / 12 frames * 1) */
  16.66% {
    background-position: -180px -1px;
  } /* Frame 0002 (100% / 12 frames * 2) */
  25% {
    background-position: -145px -1px;
  } /* Frame 0003 (100% / 12 frames * 3) */
  33.33% {
    background-position: -81px -1px;
  } /* Frame 0004 (100% / 12 frames * 4) */
  41.66% {
    background-position: -18px -1px;
  } /* Frame 0005 (100% / 12 frames * 5) */
  50% {
    background-position: -1px -1px;
  } /* Frame 0006 (100% / 12 frames * 6) */
  58.33% {
    background-position: -37px -1px;
  } /* Frame 0007 (100% / 12 frames * 7) */
  66.66% {
    background-position: -56px -1px;
  } /* Frame 0008 (100% / 12 frames * 8) */
  75% {
    background-position: -112px -1px;
  } /* Frame 0009 (100% / 12 frames * 9) */
  83.33% {
    background-position: -223px -1px;
  } /* Frame 0010 (100% / 12 frames * 10) */
  91.66% {
    background-position: -1px -360px;
  } /* Frame 0011 (100% / 12 frames * 11) */
  100% {
    background-position: -1px -266px;
  } /* Loop back to Frame 0000 */
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
