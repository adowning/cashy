<script setup lang="ts">
import { computed, onMounted, ref, watch, onUnmounted } from 'vue' // Import onUnmounted
import ValidationBox from '@/components/deposit/ValidationBox.vue' // Assuming this is a custom component
import { type GetCurrencyItem, type GetPaymentItem } from '@/interface/deposit' // Assuming these interfaces are still needed
// import { type GetUserInfo } from "@/interface/user"; // Assuming this interface is still needed
import { useAppBarStore } from '@/stores/appBar'
import { useAuthStore } from '@/stores/auth'
import { useDepositStore } from '@/stores/deposit'
import { router } from '@/router' // Assuming Vue Router is used
import { storeToRefs } from 'pinia'
// Removed useI18n import
// import { useI18n } from 'vue-i18n';
// Removed useDisplay import
// import { useDisplay } from 'vuetify';
// Removed Element Plus Notification import
// import { ElNotification } from 'element-plus'
// Removed vue-toastification imports
// import * as Toast from "vue-toastification/dist/index.mjs"
// import SimpleToast from '@/components/SimpleToast/SimpleToast.vue'

// Assuming MDepositInfoDialog and MParticipatingDialog are custom components
import MDepositInfoDialog from '@/components/deposit/mobile/MDepositInfoDialog.vue'
import MParticipatingDialog from '@/components/deposit/mobile/MParticipatingDialog.vue'

// Removed useToast
// const { useToast } = Toast
const appBarStore = useAppBarStore()
const authStore = useAuthStore()
const depositStore = useDepositStore()
// const { depositDialogToggle, withdrawDialogToggle, mainBlurEffectShow, headerBlurEffectShow } = storeToRefs(appBarStore)
// const { userInfo } = storeToRefs(authStore)
// const { depositInfo } = storeToRefs(depositStore)

// Removed useToast
// Pinia Store actions and state access
const { setDepositDialogToggle } = appBarStore
const { setWithdrawDialogToggle } = appBarStore
const { setMainBlurEffectShow } = appBarStore
const { setHeaderBlurEffectShow } = appBarStore
const { setMenuBlurEffectShow } = appBarStore
// const { setDepositWithdrawToggle } = appBarStore;
const { setDepositBlurEffectShow } = appBarStore
const { setDepositHeaderBlurEffectShow } = appBarStore
const { setCashDialogToggle } = appBarStore
const { dispatchUserDepositCfg } = depositStore
const { dispatchUserDepositSubmit } = depositStore
const { setPixInfoToggle } = depositStore
const { dispatchUserProfile } = authStore
const { setOverlayScrimShow } = appBarStore

// Removed useI18n instance
// const { t } = useI18n();

// Manual screen width tracking for responsiveness
const screenWidth = ref(window.innerWidth)
// const isMobile = computed(() => screenWidth.value < 600); // Define mobile breakpoint

// State for currency and payment selection
const selectedCurrencyItem = ref<GetCurrencyItem>({
  icon: new URL('@/assets/public/svg/icon_public_84.svg', import.meta.url).href,
  name: 'BRL',
  value: 5.25,
})
const selectedPaymentItem = ref<GetPaymentItem>({
  id: '',
  icon: new URL('@/assets/public/svg/icon_public_74.svg', import.meta.url).href,
  name: 'PIX',
  description: '20~150.000 BRL',
  min: 149,
  max: 588.88,
})

// Hardcoded currency template list (assuming this is static)
const currencyTemplateList = [
  {
    icon: new URL('@/assets/public/svg/icon_public_84.svg', import.meta.url).href,
    name: 'BRL',
    value: 5.25,
  },
  {
    icon: new URL('@/assets/public/svg/icon_public_85.svg', import.meta.url).href,
    name: 'PHP',
    value: 0,
  },
  {
    icon: new URL('@/assets/public/svg/icon_public_86.svg', import.meta.url).href,
    name: 'PEN',
    value: 0,
  },
  {
    icon: new URL('@/assets/public/svg/icon_public_87.svg', import.meta.url).href,
    name: 'MXN',
    value: 0,
  },
  {
    icon: new URL('@/assets/public/svg/icon_public_88.svg', import.meta.url).href,
    name: 'CLP',
    value: 0,
  },
  {
    icon: new URL('@/assets/public/svg/icon_public_89.svg', import.meta.url).href,
    name: 'USD',
    value: 0,
  },
  {
    icon: new URL('@/assets/public/svg/icon_public_90.svg', import.meta.url).href,
    name: 'COP',
    value: 0,
  },
]

const currencyList = ref<Array<GetCurrencyItem>>([])
const paymentList = ref<Array<GetPaymentItem>>([]) // Will be populated from depositConfig

// Deposit amount selection and input state
const depositAmountList = ref<Array<any>>([]) // Will be populated from depositConfig
const depositAmountUnit = ref<string>('R$') // Assuming default unit
const depositRate = ref<number>(0) // Bonus rate/amount
const depositAmount = ref<string | number>(0) // User input deposit amount
const depositAmountWithCurrency = ref<string>('') // Formatted amount for display
const depositAmountWithBonus = ref<string | number>(0) // Amount including bonus
const bonusCheck = ref<boolean>(false) // Checkbox state for not participating in promo

// Dialog and loading states
const codeUrl = ref<string>('') // Pix code URL
const loading = ref<boolean>(false) // Loading state for deposit submission
const promotionDialogVisible = ref<boolean>(false) // Visibility of promotion dialog
const depositInfoDialogVisible = ref<boolean>(false) // Visibility of deposit info dialog

// Validation and button state
const isShowAmountValidation = ref<boolean>(false) // Show validation message
const isDepositBtnReady = ref<boolean>(false) // Is deposit button enabled

// Menu visibility states (for custom dropdowns)
const currencyMenuShow = ref<boolean>(false)
const paymentMenuShow = ref<boolean>(false)

// Notification state (simplified, as toast is removed)
// const notificationShow = ref<boolean>(false); // Not directly used without toast
// const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href); // Not directly used without toast
// const notificationText = ref<string>(""); // Not directly used without toast

// // Bonus amount state (seems redundant with depositRate)
// const bonusAmount = ref<number>(0); // Check if this is still needed or can be removed

// // Pinia Store state access using storeToRefs
// const userInfo = computed((): GetUserInfo => {
//   const { getUserInfo } = storeToRefs(authStore());
//   return getUserInfo.value;
// });

const pixInfo = computed(() => {
  const { getPixInfo } = storeToRefs(depositStore)
  return getPixInfo.value
})

const depositConfig = computed(() => {
  const { getDepositCfg } = storeToRefs(depositStore)
  return getDepositCfg.value
})

const depositSubmit = computed(() => {
  const { getDepositSubmit } = storeToRefs(depositStore)
  return getDepositSubmit.value
})

const depositBlurEffectShow = computed(() => {
  const { getDepositBlurEffectShow } = storeToRefs(appBarStore)
  return getDepositBlurEffectShow.value
})

// const promoBlurEffectShow = computed(() => {
//   const { getMainBlurEffectShow } = storeToRefs(appBarStore);
//   return getMainBlurEffectShow.value;
// });

// Watchers
watch(
  depositConfig,
  (newValue) => {
    depositAmountList.value = []
    paymentList.value = []

    // Populate payment methods based on selected currency
    const currencyCfg = newValue?.['cfg']?.[selectedCurrencyItem.value.name]
    if (currencyCfg) {
      currencyCfg.map((item: any) => {
        paymentList.value.push({
          id: item.channel_id,
          icon: new URL('@/assets/public/svg/icon_public_74.svg', import.meta.url).href, // Assuming a default icon
          name: item.channel_name,
          description: `${item.min}~${item.max} ${item.channel_type}`,
          min: item.min,
          max: item.max,
        })
      })
      // Select the first payment method by default
      if (paymentList.value.length > 0) {
        selectedPaymentItem.value = paymentList.value[0]
      }
    }

    // Filter and populate available currencies
    const availableCurrencyNames = Object.keys(newValue?.['cfg'] || {})
    currencyList.value = currencyTemplateList.filter((currency) =>
      availableCurrencyNames.includes(currency.name),
    )
    // Ensure selected currency is in the available list, default if not
    if (
      !currencyList.value.some((c) => c.name === selectedCurrencyItem.value.name) &&
      currencyList.value.length > 0
    ) {
      selectedCurrencyItem.value = currencyList.value[0]
    }

    // Populate deposit amount options and calculate potential bonus
    newValue?.['list']?.map((item: string) => {
      let bonusAmountValue: number = 0
      let bonusType: number = 0
      newValue?.['bonus']?.map((bonusItem: any) => {
        if (bonusItem['type'] == 0) {
          // Fixed amount bonus
          if (
            Number(item) >= bonusItem['min'] &&
            (bonusItem['max'] == 0 || Number(item) <= bonusItem['max'])
          ) {
            bonusAmountValue = bonusItem['award']
            bonusType = bonusItem['type']
          }
        } else if (bonusItem['type'] == 1) {
          // Percentage bonus
          if (
            Number(item) >= bonusItem['min'] &&
            (bonusItem['max'] == 0 || Number(item) <= bonusItem['max'])
          ) {
            bonusAmountValue = bonusItem['rate']
            bonusType = bonusItem['type']
          }
        }
      })
      depositAmountList.value.push({
        depositSelect: item,
        bonus: bonusAmountValue,
        type: bonusType,
      })
    })

    // Update deposit rate based on initial amount if any
    if (parseInt(depositAmount.value as string) > 0) {
      updateDepositRate(Number(depositAmount.value))
    }
  },
  { deep: true },
)

// Watch for changes in bonusCheck (promo participation)
watch(bonusCheck, (newValue) => {
  if (newValue) {
    // If not participating, show promo dialog and reset deposit rate
    setOverlayScrimShow(true)
    setDepositHeaderBlurEffectShow(true)
    setDepositBlurEffectShow(true)
    setTimeout(() => {
      promotionDialogVisible.value = newValue
    }, 10)
    depositRate.value = 0 // Reset bonus rate if not participating
  } else {
    // If participating, update deposit rate based on current amount
    updateDepositRate(Number(depositAmount.value))
  }
})

// Watch for changes in depositAmount input
watch(depositAmount, (newValue) => {
  const amount = Number(newValue)
  // Update deposit rate based on new amount if participating
  if (!bonusCheck.value) {
    updateDepositRate(amount)
  } else {
    depositRate.value = 0 // Ensure rate is 0 if not participating
  }

  // Update validation state and button readiness
  const isValid = validateAmount(amount)
  isShowAmountValidation.value = !isValid
  isDepositBtnReady.value = isValid
})

// Watch for changes in depositToggleSwitch (Deposit/Withdraw toggle)
const depositToggleSwitch = computed(() => {
  const { getDepositWithdrawToggle } = storeToRefs(appBarStore)
  return getDepositWithdrawToggle.value
})

watch(depositToggleSwitch, (newValue) => {
  if (newValue) {
    // If switched to Withdraw
    setWithdrawDialogToggle(true)
    setDepositDialogToggle(false)
    setMainBlurEffectShow(true)
    setHeaderBlurEffectShow(true)
    setMenuBlurEffectShow(true)
    setDepositBlurEffectShow(false) // Ensure deposit blur is off
  } else {
    // If switched to Deposit
    setWithdrawDialogToggle(false)
    setDepositDialogToggle(true)
    setMainBlurEffectShow(true)
    setHeaderBlurEffectShow(true)
    setMenuBlurEffectShow(true)
    // setDepositBlurEffectShow(true); // You might want to control this based on dialog visibility
  }
})

watch(currencyMenuShow, () => {
  // Keep the original logic if you need to prevent opening the menu with less than 2 currencies
  // if (currencyMenuShow.value && currencyList.value.length < 2) {
  //   currencyMenuShow.value = false
  // }
})

// Helper function to filter array by key and value array (kept as is)
// const filterByKeyArray = (arr: any, key: any, valueArr: any) => {
//   return arr.filter((obj: any) => {
//     const objValues = obj[key];
//     return valueArr.every((value: any) => objValues.includes(value));
//   });
// };

// Helper function to update deposit rate based on amount
const updateDepositRate = (amount: number) => {
  depositRate.value = 0 // Reset before calculating
  depositConfig.value?.['bonus']?.map((bonusItem: any) => {
    if (bonusItem['type'] == 0) {
      // Fixed amount bonus
      if (amount >= bonusItem['min'] && (bonusItem['max'] == 0 || amount <= bonusItem['max'])) {
        depositRate.value = bonusItem['award']
      }
    } else if (bonusItem['type'] == 1) {
      // Percentage bonus
      if (amount >= bonusItem['min'] && (bonusItem['max'] == 0 || amount <= bonusItem['max'])) {
        depositRate.value = bonusItem['rate']
      }
    }
  })
}

// Event handlers
const handleDepositAmount = (amount: string) => {
  depositAmount.value = amount
  // Validation and button readiness are handled by the depositAmount watcher
}

const handleSelectCurrency = (item: GetCurrencyItem) => {
  selectedCurrencyItem.value = item
  paymentList.value = []
  currencyMenuShow.value = false // Close menu

  // Repopulate payment methods for the new currency
  const currencyCfg = depositConfig.value?.['cfg']?.[selectedCurrencyItem.value.name]
  if (currencyCfg) {
    currencyCfg.map((item: any) => {
      paymentList.value.push({
        id: item.channel_id,
        icon: new URL('@/assets/public/svg/icon_public_74.svg', import.meta.url).href, // Assuming a default icon
        name: item.channel_name,
        description: `${item.min}~${item.max} ${item.channel_type}`,
        min: item.min,
        max: item.max,
      })
    })
    // Select the first payment method for the new currency
    if (paymentList.value.length > 0) {
      selectedPaymentItem.value = paymentList.value[0]
    } else {
      // Handle case where no payment methods are available for the selected currency
      selectedPaymentItem.value = { id: '', icon: '', name: 'N/A', description: '', min: 0, max: 0 }
    }
  } else {
    // Handle case where no config exists for the selected currency
    paymentList.value = []
    selectedPaymentItem.value = { id: '', icon: '', name: 'N/A', description: '', min: 0, max: 0 }
  }

  // Update deposit rate based on the current amount and new currency config
  updateDepositRate(Number(depositAmount.value))
}

// Helper function to format currency (kept as is)
const formatCurrency = (currency: number, locale: string, currencyUnit: string) => {
  const fomarttedAmount = currency.toLocaleString(locale, {
    style: 'currency',
    currency: currencyUnit,
  })
  return fomarttedAmount
}

const handleSelectPayment = (item: GetPaymentItem) => {
  selectedPaymentItem.value = item
  paymentMenuShow.value = false // Close menu
  // Validation and button readiness are handled by the depositAmount watcher
}

const validateAmount = (amount: number): boolean => {
  // Ensure selectedPaymentItem and its min/max are defined
  if (
    !selectedPaymentItem.value ||
    typeof selectedPaymentItem.value.min === 'undefined' ||
    typeof selectedPaymentItem.value.max === 'undefined'
  ) {
    return false // Cannot validate if payment method min/max are unknown
  }
  return (
    amount >= Number(selectedPaymentItem.value.min) &&
    amount <= Number(selectedPaymentItem.value.max)
  )
}

const handleAmountInputFocus = (): void => {
  // Validation check is now primarily in the depositAmount watcher
  // isShowAmountValidation.value = !validateAmount(Number(depositAmount.value));
}

const handleAmountInputChange = (): void => {
  // Validation check is now primarily in the depositAmount watcher
  // isShowAmountValidation.value = !validateAmount(Number(depositAmount.value));
}

const handleAmountInputBlur = (): void => {
  // Validation check is now primarily in the depositAmount watcher
  // isShowAmountValidation.value = !validateAmount(Number(depositAmount.value));
}

const handleDepositSubmit = async () => {
  const amount = Number(depositAmount.value)
  if (amount <= 0) return
  if (!validateAmount(amount)) {
    // Optionally show a notification here if validation fails on submit click
    console.warn('Deposit amount is outside the valid range.')
    return
  }

  // If deposit user switch is on, show pix info dialog
  if (depositConfig.value?.deposit_user_switch) {
    setPixInfoToggle(true) // Assuming this action shows a separate dialog for user info
    return
  }

  loading.value = true
  let formData = {} as any

  // Include user info in formData only if deposit_user_switch is on and pixInfo is available
  if (depositConfig.value?.deposit_user_switch && pixInfo.value) {
    formData.id_number = pixInfo.value.id
    formData.first_name = pixInfo.value.first_name
    formData.last_name = pixInfo.value.last_name
  }

  formData.channels_id = selectedPaymentItem.value.id
  // Calculate final amount including bonus if participating
  formData.amount = bonusCheck.value
    ? amount // If not participating, use the input amount
    : depositConfig.value?.['bonus']?.[0]?.['type'] == 0
      ? amount + Number(depositRate.value) // Fixed bonus
      : Number((amount * (1 + Number(depositRate.value))).toFixed(2)) // Percentage bonus

  formData.is_bonus = !bonusCheck.value // is_bonus is true if NOT bonusCheck (participating)

  await dispatchUserDepositSubmit(formData)
  loading.value = false

  if (depositStore.success) {
    // Access success from the store instance
    await dispatchUserProfile() // Refresh user profile

    // Handle different response types (code_url or url)
    if (depositSubmit.value?.code_url) {
      // Calculate and format amount for display
      depositAmountWithBonus.value = bonusCheck.value
        ? amount // If not participating, use the input amount
        : depositConfig.value?.['bonus']?.[0]?.['type'] == 0
          ? amount + Number(depositRate.value) // Fixed bonus
          : Number((amount * (1 + Number(depositRate.value))).toFixed(2)) // Percentage bonus

      let locale = 'pt-BR' // Default locale
      switch (selectedCurrencyItem.value.name) {
        case 'BRL':
          locale = 'pt-BR'
          break
        case 'PHP':
          locale = 'en-PH'
          break
        case 'PEN':
          locale = 'en-PE'
          break
        case 'MXN':
          locale = 'en-MX'
          break
        case 'CLP':
          locale = 'es-CL'
          break
        case 'USD':
          locale = 'en-US'
          break
        case 'COP':
          locale = 'es-CO'
          break
      }
      depositAmountWithCurrency.value = formatCurrency(
        amount,
        locale,
        selectedCurrencyItem.value.name,
      )
      codeUrl.value = depositSubmit.value.code_url

      // Hide main UI elements and show deposit info dialog
      setMainBlurEffectShow(false)
      setOverlayScrimShow(false)
      setDepositHeaderBlurEffectShow(false)
      setDepositBlurEffectShow(false)
      setTimeout(() => {
        depositInfoDialogVisible.value = true
      }, 10)
      return // Stop further execution
    } else if (depositSubmit.value?.url) {
      // Open the provided URL in a new tab
      window.open(depositSubmit.value.url, '_blank')

      // Show success notification (replace with custom notification logic)
      console.log('Successfully submitted, redirecting to:', depositSubmit.value.url) // Placeholder notification

      // Close dialogs and reset states
      setDepositDialogToggle(false)
      setCashDialogToggle(false) // Assuming CashDialog is related
      setMainBlurEffectShow(false)
      setHeaderBlurEffectShow(false)
      setMenuBlurEffectShow(false)
      router.push({ name: 'Dashboard' }) // Navigate to Dashboard
    } else {
      // Handle case where neither code_url nor url is provided
      console.error('Deposit submission response did not contain code_url or url.')
      // Show error notification (replace with custom notification logic)
      console.log('Deposit submission failed: Invalid response from server.') // Placeholder notification
    }
  } else {
    // Show error notification (replace with custom notification logic)
    console.error('Deposit submission failed:', depositStore.errMessage) // Placeholder notification
    console.log('Deposit submission failed:', depositStore.errMessage) // Placeholder notification
  }
}

const handleParticipate = (type: string) => {
  if (type == 'ok') {
    bonusCheck.value = true // User chose NOT to participate
    depositRate.value = 0 // Reset bonus rate
  } else {
    bonusCheck.value = false // User chose to participate
    // Deposit rate is updated by the bonusCheck watcher
  }

  setDepositBlurEffectShow(false)
  setDepositHeaderBlurEffectShow(false)
  setTimeout(() => {
    promotionDialogVisible.value = false
  }, 10)
}

const handleDepositInformation = () => {
  setDepositBlurEffectShow(false)
  setDepositHeaderBlurEffectShow(false)
  setTimeout(() => {
    depositInfoDialogVisible.value = false
  }, 10)
}

// Update screenWidth on window resize
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

// Add and remove resize listener
onMounted(async () => {
  window.addEventListener('resize', updateScreenWidth)
  // Fetch initial deposit configuration
  await dispatchUserDepositCfg()

  // Initial state settings if needed (commented out as in original)
  // setOverlayScrimShow(true);
  // setDepositHeaderBlurEffectShow(true);
  // setDepositBlurEffectShow(true);
  // setTimeout(() => {let locale = 'pt-BR';
  //     switch (selectedCurrencyItem.value.name) {
  //       case "BRL":
  //         locale = 'pt-BR';
  //         break;
  //       case "PHP":
  //         locale = 'en-PH';
  //         break;
  //       case "PEN":
  //         locale = 'en-PE';
  //         break;
  //       case "MXN":
  //         locale = 'en-MX';
  //         break;
  //       case "CLP":
  //         locale = 'es-CL';
  //         break;
  //       case "USD":
  //         locale = 'en-US';
  //       case "COP":
  //         locale = 'es-CO';
  //         break;
  //     }
  //     depositAmountWithCurrency.value = formatCurrency(Number(depositAmount.value), locale, selectedCurrencyItem.value.name);
  //   depositInfoDialogVisible.value = true;
  // }, 10)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
  // Clean up Pinia store states if necessary when component is unmounted
  // setDepositDialogToggle(false);
  // setMainBlurEffectShow(false);
  // setOverlayScrimShow(false);
  // setDepositHeaderBlurEffectShow(false);
  // setDepositBlurEffectShow(false);
})
</script>

<template>
  <div class="mobile-deposit-container" :class="depositBlurEffectShow ? 'deposit-bg-blur' : ''">
    <div class="section-title mt-6 mx-6">Deposit Currency</div>
    <div class="custom-dropdown mx-4 mt-4" @click="currencyMenuShow = !currencyMenuShow">
      <div class="selected-item">
        <img :src="selectedCurrencyItem.icon" width="20" alt="Currency Icon" />
        <span class="ml-2">{{ selectedCurrencyItem.name }}</span>
        <span class="dropdown-arrow">{{ currencyMenuShow ? '▼' : '►' }}</span>
      </div>
      <ul v-if="currencyMenuShow" class="dropdown-list">
        <li
          v-for="(currencyItem, currencyIndex) in currencyList"
          :key="currencyIndex"
          :class="selectedCurrencyItem.name == currencyItem.name ? 'selected' : ''"
          @click.stop="handleSelectCurrency(currencyItem)"
        >
          <img :src="currencyItem.icon" width="20" alt="Currency Icon" />
          <span class="ml-2">{{ currencyItem.name }}</span>
        </li>
        <li v-if="currencyList.length === 0">No currencies available</li>
      </ul>
    </div>

    <div class="section-title mt-6 mx-6">Choose Payment Method</div>
    <div class="custom-dropdown mx-4 mt-4" @click="paymentMenuShow = !paymentMenuShow">
      <div class="selected-item">
        <img :src="selectedPaymentItem.icon" width="52" alt="Payment Icon" />
        <span class="ml-2">{{ selectedPaymentItem.name }}</span>
        <span class="dropdown-arrow">{{ paymentMenuShow ? '▼' : '►' }}</span>
      </div>
      <ul v-if="paymentMenuShow" class="dropdown-list payment-dropdown-list">
        <div class="payment-grid-container">
          <div
            v-for="(paymentItem, paymentIndex) in paymentList"
            :key="paymentIndex"
            class="payment-grid-item"
            @click.stop="handleSelectPayment(paymentItem)"
          >
            <div class="payment-select-item">
              <img :src="paymentItem.icon" width="62" alt="Payment Icon" />
              <span class="text-400-10">{{ paymentItem.name }}</span>
              <span class="text-400-10">{{ paymentItem.description }}</span>
            </div>
          </div>
          <div v-if="paymentList.length === 0" class="no-payment-methods">
            No payment methods available
          </div>
        </div>
      </ul>
    </div>

    <div class="section-title mt-6 mx-6">Deposit Amount</div>
    <div class="deposit-amount-buttons mt-2 mx-2">
      <div
        class="amount-button-wrapper py-1 px-2"
        v-for="(depositAmountItem, depositAmountIndex) in depositAmountList"
        :key="depositAmountIndex"
      >
        <button
          class="amount-button"
          :class="[
            depositAmountItem.depositSelect == depositAmount
              ? 'amount-btn-selected'
              : 'amount-btn-default',
          ]"
          @click="handleDepositAmount(depositAmountItem.depositSelect)"
        >
          {{ depositAmountUnit }} {{ depositAmountItem.depositSelect }}
          <div class="deposit-amount-area" v-if="!bonusCheck && depositAmountItem.bonus != 0">
            <div class="deposit-amount-rate-text">
              {{
                depositAmountItem.type == 0
                  ? depositAmountItem.bonus
                  : depositAmountItem.bonus + '%'
              }}
            </div>
          </div>
        </button>
      </div>
      <div v-if="depositAmountList.length === 0" class="no-amount-options">
        No predefined amounts available
      </div>
    </div>

    <div class="amount-input-container mt-4 mx-1 relative">
      <input
        type="number"
        :placeholder="`Amount(${selectedCurrencyItem.name})`"
        class="form-input dark-input amount-text-field"
        v-model="depositAmount"
        @focus="handleAmountInputFocus"
        @blur="handleAmountInputBlur"
        @input="handleAmountInputChange"
      />
      <ValidationBox
        v-if="isShowAmountValidation"
        :validationText2="`Minimum: ${selectedPaymentItem.min}, Maximum: ${selectedPaymentItem.max}.`"
      />
    </div>

    <div class="mt-0 mx-4 d-flex align-center">
      <label class="custom-checkbox-container">
        <input type="checkbox" v-model="bonusCheck" />
        <span class="checkmark"></span>
        Not participating in promotional activities
      </label>
      <img
        src="@/assets/public/svg/icon_public_22.svg"
        class="ml-auto"
        width="16"
        alt="Info Icon"
      />
    </div>

    <div class="deposit-footer-text-position text-600-10 white justify-center mx-2">
      R${{ depositAmount }} + R${{
        depositConfig?.['bonus']?.[0]?.['type'] == 0 && depositConfig?.['bonus'] != undefined
          ? depositRate
          : (Number(depositAmount) * depositRate).toFixed(2)
      }}
      Bonus will be added.
    </div>

    <div class="deposit-btn-position">
      <button
        class="deposit-btn"
        :class="isDepositBtnReady ? 'deposit-btn-ready' : ''"
        :disabled="!isDepositBtnReady || loading"
        @click="handleDepositSubmit"
      >
        <span v-if="!loading">Deposit</span>
        <span v-else>Loading...</span>
      </button>
    </div>

    <MParticipatingDialog v-if="promotionDialogVisible" @promotionDialogHide="handleParticipate" />

    <MDepositInfoDialog
      v-if="depositInfoDialogVisible"
      :selectedPaymentItem="selectedPaymentItem"
      :selectedCurrencyItem="selectedCurrencyItem"
      :depositAmount="depositAmount"
      :depositAmountWithCurrency="depositAmountWithCurrency"
      :codeUrl="codeUrl"
      @depositInfoDialogClose="handleDepositInformation"
    />
  </div>
</template>

<style scoped lang="scss">
/* Main container styles */
.mobile-deposit-container {
  background-color: #1d2027;
  height: 100%;
  padding-bottom: 160px; /* Add padding at the bottom to prevent content being hidden by fixed button/text */
  position: relative; /* Needed for absolute positioning of footer elements */
  overflow-y: auto; /* Enable scrolling for the main content */
}

/* Blur effect class */
.deposit-bg-blur {
  filter: blur(3px);
  -webkit-filter: blur(3px);
}

/* Section title styles */
.section-title {
  font-size: 12px;
  font-weight: 400;
  color: #7782aa;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

/* Custom Dropdown Styles (Currency and Payment) */
.custom-dropdown {
  position: relative;
  background-color: #15161c;
  border-radius: 8px;
  cursor: pointer;
  margin: 1rem 1rem 0 1rem; /* Top, Right, Bottom, Left margin */
  height: 40px; /* Match original card height */
  display: flex;
  align-items: center;
  padding: 0 1rem; /* Add padding */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset; /* Match original card shadow */
}

.custom-dropdown .selected-item {
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
}

.custom-dropdown .dropdown-arrow {
  margin-left: auto; /* Push arrow to the right */
  font-size: 0.8em;
}

.custom-dropdown .dropdown-list {
  position: absolute;
  top: 100%; /* Position below the selected item */
  left: 0;
  right: 0;
  background-color: #15161c;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10; /* Ensure dropdown is above other content */
  max-height: 200px; /* Limit height for scrolling */
  overflow-y: auto; /* Enable scrolling */
}

.custom-dropdown .dropdown-list li {
  padding: 8px 1rem;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
}

.custom-dropdown .dropdown-list li:hover {
  background-color: #23262f;
}

.custom-dropdown .dropdown-list li.selected {
  background-color: #009b3a; /* Highlight selected item */
}

.custom-dropdown .dropdown-list li img {
  margin-right: 8px; /* Space between icon and text in dropdown list */
}

.custom-dropdown .dropdown-list .no-currencies-available,
.custom-dropdown .dropdown-list .no-payment-methods {
  padding: 8px 1rem;
  text-align: center;
  color: #999;
  font-style: italic;
}

/* Payment Dropdown Specific Styles */
.payment-dropdown-list {
  max-height: 290px; /* Match original max height */
  padding: 4px; /* Add padding */
}

.payment-grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
  gap: 4px; /* Gap between grid items */
}

.payment-grid-item {
  background-color: #23262f; /* Match original card color */
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.payment-grid-item:hover {
  background-color: #353652;
}

.payment-select-item {
  padding: 8px; /* Match original padding */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.payment-select-item span {
  display: block; /* Ensure name and description are on separate lines */
  margin-top: 4px; /* Space between text lines */
}

.payment-select-item .text-400-10 {
  font-size: 10px;
  font-weight: 400;
  color: #ffffff;
}

/* Deposit Amount Buttons */
.deposit-amount-buttons {
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap to the next line */
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.amount-button-wrapper {
  flex-basis: 33.33%; /* Three columns */
  max-width: 33.33%;
  padding: 0.25rem 0.5rem; /* Adjust padding */
  box-sizing: border-box; /* Include padding in width */
}

.amount-button {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
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
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  position: relative; /* Needed for bonus area positioning */
  overflow: hidden; /* Hide overflowing bonus area */
}

.amount-btn-selected {
  background: #009b3a;
  color: white;
}

.amount-btn-default {
  background: #23262f;
  color: #ffffff;
}

.deposit-amount-area {
  width: 37px;
  position: absolute;
  top: 0;
  right: 0;
  background: #f97001;
  border-radius: 0px 4px;
  height: 11px;
}

.deposit-amount-rate-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8px;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: normal;
}

.no-amount-options {
  text-align: center;
  width: 100%;
  color: #999;
  font-style: italic;
  margin-top: 10px;
}

/* Amount Input Field */
.amount-input-container {
  margin-top: 1rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  position: relative;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background-color: #15161c;
  color: #ffffff;
  font-size: 14px;
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
  outline: none;
}

.form-input::placeholder {
  color: #7782aa;
}

// .amount-text-field {
//     /* Specific styles for the amount input if needed */
// }

/* Custom Checkbox */
.custom-checkbox-container {
  display: block;
  position: relative;
  padding-left: 25px; /* Space for the custom checkbox */
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 10px; /* Match original label font size */
  font-weight: 400;
  color: #7782aa; /* Match original label color */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.custom-checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 16px; /* Match original icon size */
  width: 16px; /* Match original icon size */
  background-color: #15161c; /* Match original background */
  border-radius: 4px; /* Match original border radius */
  box-shadow: inset 1px 0px 2px 1px rgba(0, 0, 0, 0.11); /* Match original shadow */
}

/* On hover, add a lighter background color */
.custom-checkbox-container:hover input ~ .checkmark {
  background-color: #353652;
}

/* When the checkbox is checked, add a green background */
.custom-checkbox-container input:checked ~ .checkmark {
  background-color: #01983a; /* Match original checked color */
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.custom-checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.custom-checkbox-container .checkmark:after {
  left: 5px; /* Adjust position */
  top: 2px; /* Adjust position */
  width: 5px;
  height: 10px;
  border: solid white; /* White checkmark color */
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* Footer Text with Bonus Calculation */
.deposit-footer-text-position {
  position: absolute;
  bottom: 128px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  text-align: center; /* Center the text */
  font-weight: 600;
  font-size: 10px;
  color: white;
}

/* Deposit Button */
.deposit-btn-position {
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 1.5rem * 2); /* Adjust width to match margins */
  margin: 0 1.5rem; /* Add horizontal margins */
}

.deposit-btn {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
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
  background: #23262f; /* Default background */
  color: #fff; /* Default text color */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.deposit-btn-ready {
  background: #009b3a; /* Green background when ready */
  color: white;
}

.deposit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Dialog Positions (Assuming MParticipatingDialog and MDepositInfoDialog are custom components) */
/* These styles might need to be applied globally or to the components themselves */
/* .m-promotion-dialog-position { z-index: 2550; } */
/* .m-deposit-info-dialog-position { z-index: 2550; } */

/* General utility classes (if not using a utility framework) */
.d-flex {
  display: flex;
}
.align-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.ml-auto {
  margin-left: auto;
}
.mx-4 {
  margin-left: 1rem;
  margin-right: 1rem;
}
.mt-6 {
  margin-top: 1.5rem;
}
.mx-6 {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.mt-0 {
  margin-top: 0;
}
.relative {
  position: relative;
}

/* Text styles (adjust font families and sizes as needed) */
.text-400-12 {
  font-size: 12px;
  font-weight: 400;
}
.gray {
  color: #7782aa;
}
.white {
  color: white;
}
.text-600-10 {
  font-size: 10px;
  font-weight: 600;
}
</style>
