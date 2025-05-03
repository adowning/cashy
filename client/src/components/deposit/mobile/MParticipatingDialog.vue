<script setup lang="ts">
import { ref } from 'vue'
// Removed useI18n import
// import { useI18n } from "vue-i18n";

// Define emitted events
const emit = defineEmits<{ (e: 'promotionDialogHide', type: string): void }>()

const loading = ref<boolean>(false)

// Handle the "Ok" button click
const submitPromotion = async () => {
  loading.value = true
  // Simulate an async action if needed, then emit
  // await someAsyncOperation();
  emit('promotionDialogHide', 'ok')
  // loading.value = false; // Reset loading state after emitting
}

// Handle the "Cancel" button click is done directly in the template
</script>

<template>
  <div class="m-promotion-dialog-container">
    <div class="message-text-row mx-4 mt-10 text-700-12 text-gray">
      <p class="text-center" style="width: 100%">Not participating in promotional activities</p>
    </div>

    <div class="action-buttons-row mx-10 mt-12 text-700-14">
      <div class="promotion-confirm-btn">
        <button class="button-bright text-none" :disabled="loading" @click="submitPromotion">
          <span v-if="!loading">Ok</span>
          <span v-else>Loading...</span>
        </button>
      </div>
      <div class="promotion-cancel-btn ml-auto">
        <button class="button-bright text-none" @click="emit('promotionDialogHide', 'cancel')">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Main container styles for the dialog */
.m-promotion-dialog-container {
  background-color: #1d2027;
  border-radius: 16px;
  height: 173px; /* Fixed height */
  padding: 0; /* Remove default padding */
  overflow: hidden; /* Hide overflowing content */
  display: flex; /* Use flexbox for layout */
  flex-direction: column; /* Stack content vertically */
  justify-content: center; /* Center content vertically */
}

/* Styles for the message text row */
.message-text-row {
  margin-left: 1rem; /* Match mx-4 */
  margin-right: 1rem;
  margin-top: 2.5rem; /* Match mt-10 */
  font-weight: 700;
  font-size: 12px;
  color: gray; /* Assuming text-gray maps to gray color */
}

.message-text-row p {
  text-align: center;
  width: 100%;
}

/* Styles for the action buttons row */
.action-buttons-row {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Vertically center buttons */
  margin-left: 2.5rem; /* Match mx-10 */
  margin-right: 2.5rem;
  margin-top: 3rem; /* Match mt-12 */
  font-weight: 700;
  font-size: 14px;
}

// .promotion-confirm-btn, .promotion-cancel-btn {
//     /* Container for each button to control spacing */
// }

.promotion-cancel-btn {
  margin-left: auto; /* Push cancel button to the right */
}

/* Button styles */
button {
  height: 40px; /* Fixed height */
  width: 88px; /* Fixed width */
  border: none;
  cursor: pointer;
  display: flex; /* Use flexbox to center text */
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 10px;
  text-transform: none; /* Prevent uppercase text */
}

.button-bright {
  /* Assuming this is a base style, adjust as needed */
  background-color: #f9bc01; /* Example bright color */
  color: #000; /* Example text color */
  border-radius: 8px; /* Match original border-radius */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21); /* Match original shadow */
}

.promotion-cancel-btn button {
  background: #23262f; /* Match background color */
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21); /* Match shadow */
  border-radius: 26px; /* Match border-radius */
  color: #ffffff; /* Match text color */
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* General utility classes (if not using a utility framework) */
.text-center {
  text-align: center;
}
.mx-4 {
  margin-left: 1rem;
  margin-right: 1rem;
}
.mt-10 {
  margin-top: 2.5rem;
}
.mx-10 {
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}
.mt-12 {
  margin-top: 3rem;
}
.ml-auto {
  margin-left: auto;
}

/* Text styles (adjust font families and sizes as needed) */
.text-700-12 {
  font-size: 12px;
  font-weight: 700;
}
.text-700-14 {
  font-size: 14px;
  font-weight: 700;
}
.text-gray {
  color: gray;
} /* Define gray color if not defined elsewhere */
</style>
