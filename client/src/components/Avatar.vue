<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const currentUser = userStore.currentUser
const props = defineProps({
  avatarUrl: {
    type: String,
    default: 'https://i.pravatar.cc/150?img=3',
  },
  level: {
    type: Number,
    default: 1,
  },
  currentExp: {
    type: Number,
    default: 0,
  },
  maxExp: {
    type: Number,
    default: 100,
  },
  size: {
    type: Number,
    default: 65,
  },
})

// Sprite sheet configuration
const spriteSheet = ref(
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7b6bc25b-164c-4553-80d7-fd3c6a97b455-Rdf4I0AJIx6avsR4gMpAu9AcuDZwQ4.png',
)
const progressSprites = [
  { row: 0, col: 0 }, // First blue circle
  { row: 1, col: 0 }, // Second blue circle
  { row: 2, col: 0 }, // Third blue circle
  { row: 3, col: 0 }, // Fourth blue circle
  { row: 4, col: 0 }, // Fifth blue circle
]

const effectSprites = [
  { row: 1, col: 2 }, // Gold burst effect 1
  { row: 2, col: 3 }, // Gold burst effect 2
  { row: 3, col: 2 }, // Gold burst effect 3
  { row: 4, col: 3 }, // Gold burst effect 4
  { row: 5, col: 2 }, // Gold burst effect 5
]

// State
const expPercentage = computed(() => (props.currentExp / props.maxExp) * 100)
const isGainingExp = ref(false)
const prevExp = ref(props.currentExp)
const currentEffectFrame = ref(0)
const effectInterval = ref(null)

// Watch for exp changes
watch(
  () => props.currentExp,
  (newExp, oldExp) => {
    if (newExp > oldExp) {
      // Experience gained
      prevExp.value = oldExp
      playExpGainAnimation()
    }
  },
)

// Animation for exp gain
function playExpGainAnimation() {
  isGainingExp.value = true
  currentEffectFrame.value = 0

  // Clear any existing interval
  if (effectInterval.value) {
    clearInterval(effectInterval.value)
  }

  // Animate through effect frames
  effectInterval.value = setInterval(() => {
    currentEffectFrame.value++
    if (currentEffectFrame.value >= effectSprites.length) {
      clearInterval(effectInterval.value)
      effectInterval.value = null
      isGainingExp.value = false
    }
  }, 100)
}

// Calculate which progress sprite to use based on exp percentage
const progressSpriteIndex = computed(() => {
  const index = Math.floor((expPercentage.value / 100) * progressSprites.length)
  return Math.min(index, progressSprites.length - 1)
})

// Calculate background positions for sprites
const progressSpritePosition = computed(() => {
  const sprite = progressSprites[progressSpriteIndex.value]
  return `${-sprite.col * props.size}px ${-sprite.row * props.size}px`
})

const effectSpritePosition = computed(() => {
  if (!isGainingExp.value || currentEffectFrame.value >= effectSprites.length) {
    return ''
  }
  const sprite = effectSprites[currentEffectFrame.value]
  return `${-sprite.col * props.size}px ${-sprite.row * props.size}px`
})

// Clean up on component unmount
function onUnmounted() {
  if (effectInterval.value) {
    clearInterval(effectInterval.value)
  }
}
</script>

<template>
  <div class="avatar-exp-container relative" :style="{ width: `${size}px`, height: `${size}px` }">
    <!-- Progress bar background -->
    <!-- <div class="progress-bar-bg"></div> -->
    <CircularProgress
      :percent="expPercentage"
      :viewport="true"
      :is-shadow="true"
      :is-bg-shadow="true"
      :show-percent="true"
      :unit="'%'"
    >
      <!-- <CircleProgress :viewport="true" :is-gradient="true" />
    <CircleProgress :viewport="true" :show-percent="true" :unit="'Acres'" />
    <CircleProgress
      :is-bg-shadow="true"
      :bg-shadow="{
        inset: true,
        vertical: 2,
        horizontal: 2,
        blur: 4,
        opacity: 0.4,
        color: '#000000',
      }"
      empty-color="#f7f7f7"
      :border-width="6"
      :border-bg-width="30"
    /> -->
      <!-- Progress bar fill using sprite -->
      <!-- <div
      class="progress-bar-fill"
      :style="{
        // backgroundImage: `url(${spriteSheet})`,
        backgroundColor: 'yellow',
        backgroundPosition: progressSpritePosition,
        backgroundSize: `${size * 6}px auto`,
        clipPath: `circle(${size / 2}px at center)`,
        opacity: 100,
      }"
    ></div> -->

      <!-- Avatar image -->
      <div class="avatar-container">
        <img :src="avatarUrl" alt="User avatar" class="avatar-image" />
        <div class="level-badge">{{ level }}</div>
      </div>

      <!-- Experience gain effect -->
      <div
        v-if="isGainingExp"
        class="exp-gain-effect"
        :style="{
          backgroundImage: `url(${spriteSheet})`,
          backgroundPosition: effectSpritePosition,
          backgroundSize: `${size * 6}px auto`,
        }"
      ></div>
    </CircularProgress>

    <!-- Experience text -->
    <div class="exp-text">{{ currentUser.name }}</div>
  </div>
</template>

<style scoped>
.circular-progress {
  --size: 60px;
  --half-size: calc(var(--size) / 2);
  --stroke-width: 5px;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--progress) * var(--circumference)) / 100);
  animation: progress-animation 5s linear 0s 1 forwards;
}
.circular-progress circle {
  cx: var(--half-size);
  cy: var(--half-size);
  r: var(--radius);
  stroke-width: var(--stroke-width);
  fill: none;
  stroke-linecap: round;
}
.circular-progress circle.bg {
  stroke: #ddd;
}
.circular-progress circle.fg {
  transform: rotate(-90deg);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: #5394fd;
}
@property --progress {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}
@keyframes progress-animation {
  from {
    --progress: 0;
  }
  to {
    --progress: 100;
  }
}
.avatar-exp-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
}

.progress-bar-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(200, 200, 200, 0.3);
  border: 2px solid rgba(100, 100, 255, 0.5);
}

.progress-bar-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: opacity 0.3s ease;
}

.avatar-container {
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.level-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #4a90e2;
  color: white;
  border-radius: 50%;
  width: 30%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.8rem;
  border: 2px solid white;
}

.exp-gain-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}

.exp-text {
  background-color: white;
  border-color: pink;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  line-wrap: nowrap;
  position: absolute;
  bottom: 0px;
  font-size: 1.2rem;
  padding: 0px;
  line-height: 1rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 1px;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 4;
  /* width: 100%; */
  height: 1rem;
  color: black;
  z-index: 5;
}

.exp-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  color: black;
  font-weight: bold;
  width: 100%;
  z-index: 5;
}
</style>
