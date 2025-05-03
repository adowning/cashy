<script setup lang="ts">
import { ref, computed, toRefs, onMounted, onUnmounted } from 'vue'
// Removed useI18n import
// import { useI18n } from "vue-i18n";
// Removed useDisplay import
// import { useDisplay } from "vuetify";

// Define props
const props = defineProps<{ validationText2: string }>()

// Use toRefs to maintain reactivity for props
const { validationText2 } = toRefs(props)

// Removed useI18n instance
// const { t } = useI18n();

// Manual screen width tracking for responsiveness
const screenWidth = ref(window.innerWidth)
const isMobile = computed(() => screenWidth.value < 600) // Define mobile breakpoint based on original media query

// Update screenWidth on window resize
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

// Add and remove resize listener
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})
</script>

<template>
  <div
    class="validation-box-container pa-2 animate glow delay-1 fade-in"
    :class="{ 'mobile-view': isMobile }"
  >
    <div class="validation-row d-flex justify-center ma-2">
      <img
        src="@/assets/public/svg/icon_public_03.svg"
        width="16"
        class="validation-caution-img"
        alt="Caution Icon"
      />
      <span class="label-text-sm ml-2 mt-1 slate-gray"> Invalid amount </span>
    </div>
    <div class="validation-row justify-center mt-0 mb-2">
      <span class="label-text-sm ml-2 mt-1 slate-gray">
        {{ validationText2 }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Base styles for the validation box container */
.validation-box-container {
  position: absolute;
  bottom: 64px;
  width: 380px; /* Default desktop width */
  background: #15161c;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  margin: 12px; /* Default desktop margin */
  padding: 8px; /* Match pa-2 */
  padding-bottom: 0px; /* Match original override */
  margin-left: 58px; /* Default desktop margin-left */
  z-index: 2;
}

/* Mobile specific styles */
.validation-box-container.mobile-view {
  width: 94%; /* Mobile width */
  margin: 12px; /* Mobile margin */
  margin-left: auto; /* Center on mobile */
  margin-right: auto; /* Center on mobile */
}

.validation-row {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Vertically center items */
}

.validation-row.justify-center {
  justify-content: center; /* Center items horizontally */
}

// .validation-row.d-flex {
//     /* d-flex is already handled by .validation-row */
// }

.validation-row.ma-2 {
  margin: 8px; /* Match ma-2 */
}

.validation-row.mt-0 {
  margin-top: 0; /* Match mt-0 */
}

.validation-row.mb-2 {
  margin-bottom: 8px; /* Match mb-2 */
}

.validation-caution-img {
  position: relative;
  top: 2px;
}

/* Removed .validation-title as it was not used in the template */
/* .validation-title {
  margin-top: 22px !important;
  margin-left: 10px;
} */

/* Pseudo-element for the pointer/arrow */
.validation-box-container::after {
  display: flex;
  content: '';
  position: absolute; /* Changed from relative to absolute for correct positioning */
  bottom: -9px; /* Position below the box (adjust based on border width) */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Adjust for the element's own width */
  width: 0;
  height: 0;
  border: 9px solid transparent; /* Transparent borders */
  border-top-color: #15161c; /* Color of the pointer (match background) */
  z-index: 2;
}

/* Animation styles (kept as is) */
.animate {
  animation-duration: 0.15s;
  animation-delay: 0.1s;
  animation-name: animate-fade; /* animate-fade is not defined, might be intended as animate-glow */
  animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
  animation-fill-mode: backwards;
}

.animate.glow {
  animation-name: animate-glow;
  animation-timing-function: ease;
}

@keyframes animate-glow {
  0% {
    opacity: 0;
    filter: brightness(3) saturate(3);
    transform: scale(0.8, 0.8);
  }

  100% {
    opacity: 1;
    filter: brightness(1) saturate(1);
    transform: scale(1, 1);
  }
}

/* Added fade-in animation if animate-fade was intended */
@keyframes animate-fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.delay-1 {
  animation-delay: 0.1s;
}

/* General utility classes (if not using a utility framework) */
.d-flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
.ma-2 {
  margin: 8px;
}
.ml-2 {
  margin-left: 8px;
}
.mt-1 {
  margin-top: 4px;
}
.mt-0 {
  margin-top: 0;
}
.mb-2 {
  margin-bottom: 8px;
}
.pa-2 {
  padding: 8px;
}
.relative {
  position: relative;
} /* Added if needed for parent container */

/* Text styles (adjust font families and sizes as needed) */
.label-text-sm {
  font-size: 12px;
} /* Assuming label-text-sm maps to 12px */
.slate-gray {
  color: #7782aa;
} /* Assuming slate-gray maps to this color */
</style>
