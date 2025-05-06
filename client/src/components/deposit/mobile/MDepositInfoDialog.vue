<script setup lang="ts">
import { ref, toRefs } from 'vue'
// Removed useI18n import
// import { useI18n } from "vue-i18n";
import { type GetPaymentItem } from 'shared/interface/deposit' // Assuming this interface is still needed
import { type GetCurrencyItem } from 'shared/interface/deposit' // Assuming this interface is still needed
import QrcodeVue from 'qrcode.vue' // Assuming this is a custom component for QR code generation
// Removed vue-toastification imports
// import * as Toast from "vue-toastification/dist/index.mjs"
// import SimpleToast from '@/components/SimpleToast/SimpleToast.vue'

// Assuming SuccessIcon and WarningIcon are custom components for notifications
// import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
// import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import * as clipboard from 'clipboard-polyfill' // Assuming clipboard-polyfill is used for copying

// Removed useToast
// const { useToast } = Toast; // You will need to integrate a custom notification system

// Define emitted events
const emit = defineEmits<{ (e: 'depositInfoDialogClose'): void }>()

// Define component props
const props = defineProps<{
  selectedPaymentItem: GetPaymentItem // Selected payment method details
  selectedCurrencyItem: GetCurrencyItem // Selected currency details
  depositAmount: string | number // The deposit amount
  codeUrl: string // The URL or code for the deposit (e.g., PIX code)
  depositAmountWithCurrency: string // Formatted deposit amount with currency symbol
}>()

// Use toRefs to maintain reactivity for props
const {
  selectedPaymentItem,
  selectedCurrencyItem,
  depositAmount,
  codeUrl,
  depositAmountWithCurrency,
} = toRefs(props)

// Function to close the dialog by emitting an event to the parent
const closeDepositInfoDialog = async () => {
  emit('depositInfoDialogClose')
}

// State for the QR code size
const size = ref<number>(132)

// Notification text for successful copy (hardcoded)
const notificationText = ref<string>('successful copied') // Replaced t('successful copied')

// Handle copying the code URL to the clipboard
const handleCopyUrlCode = async () => {
  try {
    await clipboard.writeText(codeUrl.value)
    console.log('Copied to clipboard!')
    // --- Replace with your custom notification logic ---
    // Example using a simple console log:
    console.log('Notification: ' + notificationText.value)
    // If you have a custom notification component/service, call it here:
    // showCustomNotification({ message: notificationText.value, type: 'success', icon: SuccessIcon });
    // ---------------------------------------------------
  } catch (error) {
    console.error('Could not copy text: ', error)
    // --- Replace with your custom error notification logic ---
    // Example using a simple console log:
    console.error('Notification: Could not copy text.')
    // If you have a custom notification component/service, call it here:
    // showCustomNotification({ message: 'Could not copy text', type: 'warning', icon: WarningIcon });
    // -------------------------------------------------------
  }
}
</script>

<template>
  <div class="m-depositinfo-dialog-container">
    <button class="m-close-button" @click="closeDepositInfoDialog">
      <img src="@/assets/public/svg/icon_public_52.svg" width="18" alt="Close Icon" />
    </button>

    <div class="text-center text-700-14 white mt-5">Deposit Information</div>

    <div class="m-deposit-channel-info mx-5 mt-5">
      <div class="channel-info-header mx-5 pt-3 d-flex">
        <img :src="selectedPaymentItem.icon" alt="Payment Method Icon" />
        <p class="text-900-20 white">{{ selectedCurrencyItem.name }}&nbsp;{{ depositAmount }}</p>
      </div>

      <div class="m-deposit-info-qr-code">
        <div class="m-deposit-info-qr-code-body text-center">
          <QrcodeVue :value="codeUrl" :size="size" level="H" class="mt-2" />
        </div>
      </div>

      <div class="mt-1">
        <div class="code-url-row px-5">
          <div class="code-url-text text-left text-500-12 white">
            {{ codeUrl }}
          </div>
          <button class="m-deposit-url-copy-btn ml-2" @click="handleCopyUrlCode">
            <img src="@/assets/public/svg/icon_public_71.svg" width="16" alt="Copy Icon" />
          </button>
        </div>
      </div>
    </div>

    <div class="info-text-section mt-4 mx-11">
      <p class="text-400-12 color-524D72">Please make the payment within the specified time.</p>
      <p class="text-400-12 color-524D72 mt-1">
        After the payment is completed, the deposit amount will be automatically credited to your
        account.
      </p>
      <p class="text-400-12 color-524D72 mt-1">
        Please ensure the payment amount is exactly
        <font color="white">{{ depositAmountWithCurrency }}</font>
        to avoid any issues.
      </p>
    </div>

    <div class="bottom-button-position mt-10 mx-6">
      <button class="m-deposit-btn m-deposit-btn-ready" @click="handleCopyUrlCode">
        Copy Code
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Main container for the dialog content */
.m-depositinfo-dialog-container {
  width: 328px; /* Fixed width */
  height: 545px; /* Fixed height */
  border-radius: 20px;
  background: #1d2027;
  overflow-y: auto; /* Enable scrolling if content exceeds height */
  position: relative; /* Needed for absolute positioning of close button */
  padding-bottom: 20px; /* Add padding at the bottom */
}

/* Hide scrollbar */
.m-depositinfo-dialog-container::-webkit-scrollbar {
  width: 0px;
}

/* Close button */
.m-close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 30px; /* Set button size */
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; /* Ensure button is above other content */
}

/* Deposit Channel Info Section */
.m-deposit-channel-info {
  width: 288px; /* Fixed width */
  height: 252px; /* Fixed height */
  border-radius: 8px;
  background: #15161c; /* Match background color */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset; /* Match inner shadow */
  margin-left: auto; /* Center the block */
  margin-right: auto;
  margin-top: 1.25rem; /* Match mt-5 */
}

.channel-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertically center items */
  margin-left: 1.25rem; /* Match mx-5 */
  margin-right: 1.25rem;
  padding-top: 0.75rem; /* Match pt-3 */
}

.channel-info-header img {
  width: auto; /* Adjust width as needed, or keep original width */
  height: auto; /* Adjust height as needed */
}

/* QR Code Section */
.m-deposit-info-qr-code {
  margin-top: 18px;
}

.m-deposit-info-qr-code-body {
  width: 148px; /* Fixed size for the QR code container */
  height: 148px;
  background: #ffffff; /* White background for QR code */
  margin: auto; /* Center the QR code container */
  display: flex; /* Use flex to center QR code inside */
  justify-content: center;
  align-items: center;
}

.m-deposit-info-qr-code-body .mt-2 {
  margin-top: 8px; /* Adjust margin for the QrcodeVue component */
}

/* Code URL and Copy Button */
.code-url-row {
  display: flex;
  align-items: center;
  padding: 0 1.25rem; /* Match px-5 */
  margin-top: 0.25rem; /* Match mt-1 */
}

.code-url-text {
  flex-grow: 1; /* Allow text to take available space */
  word-break: break-all; /* Break long URLs */
  overflow-wrap: break-word; /* Ensure long words wrap */
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.m-deposit-url-copy-btn {
  background-color: #23262f; /* Match background color */
  border-radius: 4px;
  width: 24px; /* Button size */
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none; /* Remove default button border */
  flex-shrink: 0; /* Prevent button from shrinking */
  margin-left: 8px; /* Match ml-2 */
}

/* Information Text Section */
.info-text-section {
  margin-top: 1rem; /* Match mt-4 */
  margin-left: 2.75rem; /* Match mx-11 */
  margin-right: 2.75rem;
}

.info-text-section p {
  font-size: 12px;
  font-weight: 400;
  color: #524d72; /* Match color */
  margin-top: 0.25rem; /* Match mt-1 */
}

.info-text-section p:first-child {
  margin-top: 0; /* Remove top margin from the first paragraph */
}

.info-text-section font {
  color: white; /* Match font color */
}

/* Bottom Button (Copy Code) */
.bottom-button-position {
  margin-top: 2.5rem; /* Match mt-10 */
  margin-left: 1.5rem; /* Match mx-6 */
  margin-right: 1.5rem;
}

.m-deposit-btn {
  width: 100%; /* Full width button */
  height: 48px; /* Fixed height */
  border: none;
  border-radius: 8px;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21); /* Match shadow */
  text-align: center;
  font-family:
    Inter,
    -apple-system,
    Framedcn,
    Helvetica Neue,
    Condensed,
    DisplayRegular,
    Helvetica,
    Arial,
    PingFang SC,
    Hiragino Sans GB,
    WenQuanYi Micro Hei,
    Microsoft Yahei,
    sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  display: flex; /* Use flex to center text */
  justify-content: center;
  align-items: center;
}

.m-deposit-btn-ready {
  background: #009b3a; /* Green background when ready (assuming this class is used for the bottom button) */
  color: white;
}

/* General utility classes (if not using a utility framework) */
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.white {
  color: white;
}
.mt-5 {
  margin-top: 1.25rem;
}
.mx-5 {
  margin-left: 1.25rem;
  margin-right: 1.25rem;
}
.pt-3 {
  padding-top: 0.75rem;
}
.d-flex {
  display: flex;
}
.ml-2 {
  margin-left: 8px;
}
.mt-1 {
  margin-top: 0.25rem;
}
.px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mx-11 {
  margin-left: 2.75rem;
  margin-right: 2.75rem;
}
.mt-10 {
  margin-top: 2.5rem;
}
.mx-6 {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

/* Text styles (adjust font families and sizes as needed) */
.text-700-14 {
  font-size: 14px;
  font-weight: 700;
}
.text-900-20 {
  font-size: 20px;
  font-weight: 900;
}
.text-500-12 {
  font-size: 12px;
  font-weight: 500;
}
.text-400-12 {
  font-size: 12px;
  font-weight: 400;
}
.color-524D72 {
  color: #524d72;
}
</style>
