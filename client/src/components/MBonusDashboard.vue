<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
// Removed useI18n import
// import { useI18n } from 'vue-i18n';
// Removed setLang as it's related to vue-i18n
// import { setLang } from "@/locale/index";
// Removed useDisplay from vuetify
// import { useDisplay } from 'vuetify'
import { useAppBarStore } from '@/stores/appBar'
import { useLoginBonusStore } from '@/stores/loginBonus'
import { useRefferalStore } from '@/stores/refferal'
import { useMailStore } from '@/stores/mail'
// import { useGameStore } from "@/stores/game";
import { storeToRefs } from 'pinia'

const appBarStore = useAppBarStore()
const loginBonusStore = useLoginBonusStore()
const refferalStore = useRefferalStore()
// const mailStore = useMailStore();
// const gameStore = useGameStore();

// const { bonusDashboardDialogVisible } = storeToRefs(appBarStore);
// const { loginBonusDialogVisible } = storeToRefs(loginBonusStore);
// const { refferalDialogVisible } = storeToRefs(refferalStore);
// const { mailDialogVisible } = storeToRefs(mailStore);
// const { gameDialogVisible } = storeToRefs(gameStore);
const { setRightBarToggle } = useAppBarStore()
const { setMainBlurEffectShow } = useAppBarStore()
const { setBonusDashboardDialogVisible } = useAppBarStore()
const { setOverlayScrimShow } = useAppBarStore()
// const { setRouletteBonusDialogVisible } = useLoginBonusStore();
// const { setLoginBonusDialogVisible } = useLoginBonusStore();
// const { setRefferalDialogShow } = useRefferalStore();
const { setMailMenuShow } = useMailStore()
// const { setSearchGameDialogShow } = useGameStore();
// const { setHeaderBlurEffectShow } = useGameStore();
// const { setMenuBlurEffectShow } = useGameStore();

// Removed useI18n instance
// const { t } = useI18n();

// Manual screen width tracking
const screenWidth = ref(window.innerWidth)
const isMobile = computed(() => screenWidth.value < 600) // Define mobile breakpoint

// const open = ref<Array<string>>(['']);
// const language = ref<string>('English'); // Kept but not used for i18n
const drawer = ref<boolean>(false) // Controls the visibility of the sidebar/modal
// const languageMenu = ref<boolean>(false); // Kept but not used for Vuetify menu
// const originalMenu = ref<boolean>(false); // Kept but not used for Vuetify menu
// const navDrawer = ref<any>(null); // Removed as v-navigation-drawer is removed

// Hardcoded strings instead of using t()
// const transactionTabs = ref<Array<string>>([
//   "Promotions",
//   "VIP Bonus",
//   "Special Bonus"
// ]);

const selectedBtn = ref<string>('Promotions')

// Hardcoded string instead of using t()
// const selectedTab = ref("Game History"); // Replaced t("transaction.tab.game_history")

// Removed mobileVersion computed property as useDisplay is removed
// const mobileVersion = computed(() => {
//   return name.value
// });

// Removed mobileWidth computed property as useDisplay is removed
// const mobileWidth = computed(() => {
//   return width.value
// })

// const refferalAppBarShow = computed(() => {
//   const { getRefferalAppBarShow } = storeToRefs(refferalStore);
//   return getRefferalAppBarShow.value
// })

const bonusDashboardToggle = computed(() => {
  const { getBonusDashboardDialogVisible } = storeToRefs(appBarStore)
  return getBonusDashboardDialogVisible.value
})

// const loginBonusDialog = computed(() => {
//   const { getLoginBonusDialogVisible } = storeToRefs(loginBonusStore);
//   return getLoginBonusDialogVisible.value;
// })

const rouletteBonusDialog = computed(() => {
  const { getRouletteBonusDialogVisible } = storeToRefs(loginBonusStore)
  return getRouletteBonusDialogVisible.value
})

watch(drawer, (newValue: boolean) => {
  setBonusDashboardDialogVisible(newValue)
  setMailMenuShow(newValue)
  if (!newValue && !rouletteBonusDialog.value) {
    setMainBlurEffectShow(false)
    setOverlayScrimShow(false)
  }
  if (newValue) {
    setMainBlurEffectShow(true)
    setOverlayScrimShow(true)
  }
})

watch(bonusDashboardToggle, (newValue) => {
  drawer.value = newValue
  // Use isMobile computed property based on manual screenWidth
  if (isMobile.value && newValue) {
    setRightBarToggle(false)
    // setNavBarToggle(false);
  }
})

const handleSelectBonusBtn = (selBtn: string) => {
  console.log('>>>>>>>>>')
  selectedBtn.value = selBtn
}

const handleClose = () => {
  drawer.value = !drawer.value
}

// Update screenWidth on window resize
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

// Add and remove resize listener
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
  // Initial state setting based on screen width if needed
  // drawer.value = screenWidth.value >= 1280;
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
  // Clean up Pinia store states if necessary when component is unmounted
  // For example, if this component controls global states that should be reset
  // setBonusDashboardDialogVisible(false);
  // setMainBlurEffectShow(false);
  // setOverlayScrimShow(false);
})
</script>

<template>
  <div :class="['bonus-dashboard-sidebar', { open: drawer, 'mobile-view': isMobile }]">
    <div class="bonus-dashboard-header" @click="handleClose">
      <div class="header-content">
        <div class="bonus-dashboard-title">Bonus Dashboard</div>
        <div class="bonus-dashboard-img">
          <img
            src="@/assets/public/image/img_public_43.png"
            width="95"
            height="73"
            style="float: right"
          />
        </div>
      </div>
    </div>

    <div class="bonus-btns">
      <div class="bonus-btns-body">
        <div
          class="bonus-type-btn"
          :class="selectedBtn == 'Promotions' ? 'bonus-btn-selected' : ''"
          @click="handleSelectBonusBtn('Promotions')"
        >
          Promotions
        </div>

        <div
          class="bonus-type-btn"
          :class="selectedBtn == 'VIP Bonus' ? 'bonus-btn-selected' : ''"
          @click="handleSelectBonusBtn('VIP Bonus')"
        >
          VIP Bonus
        </div>

        <div
          class="bonus-type-btn"
          :class="selectedBtn == 'Special Bonus' ? 'bonus-btn-selected' : ''"
          @click="handleSelectBonusBtn('Special Bonus')"
        >
          Special Bonus
        </div>
      </div>
    </div>

    <div class="nav-drawer-content">
      <div class="recharge-bonus-body">
        <div class="recharge-bonus-description">
          <div class="recharge-col description-text-col">
            <div class="recharge-col-title">
              <p class="text-800-16 white mb-2" style="width: 180px; text-align: center">
                First Deposit Bonus
              </p>
              <p class="text-800-16 white" style="margin-bottom: 14px">Up to $1000</p>
            </div>
            <div>
              <p class="text-600-8 white" style="margin-bottom: 6px">
                Get a 100% bonus on your first deposit.
              </p>
              <p class="text-600-8 white">
                Minimum deposit applies. Wagering requirements may vary.
              </p>
            </div>
          </div>
          <div class="recharge-col description-img-col">
            <img
              src="@/assets/public/image/img_public_44.png"
              width="81"
              height="91"
              style="float: right"
            />
          </div>
        </div>
        <div class="recharge-bonus-actions">
          <div class="recharge-col action-btn-col">
            <button class="recharge-more-btn">
              <div class="d-flex" style="font-size: 12px; color: rgba(18, 255, 118, 1)">
                <p>View details</p>
                <img
                  src="@/assets/public/image/img-public-50.png"
                  width="16"
                  class="ml-1"
                  color="rgba(18, 255, 118, 1);"
                />
              </div>
            </button>
          </div>
          <div class="recharge-col action-btn-col right-aligned">
            <div style="float: right">
              <button class="recharge-more-btn">
                <div
                  class="d-flex justify-center"
                  style="
                    width: 122px;
                    height: 32px;
                    font-size: 14px;
                    font-weight: 700;
                    border-radius: 8px;
                    background: rgba(249, 188, 1, 1);
                    color: #000;
                    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
                    align-items: center;
                    justify-content: center; /* Added justify-content */
                  "
                >
                  <p>First Deposit</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="recharge-bonus-body">
        <div class="deposit-bonus-description">
          <div class="recharge-col description-text-col">
            <div class="recharge-col-title d-flex">
              <p
                class="text-400-12 white mb-2"
                style="
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 34px;
                "
              >
                1st
              </p>
              <p
                class="text-400-12 white"
                style="
                  margin-left: 4px;
                  margin-bottom: 8px;
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 97px;
                "
              >
                180% Bonus
              </p>
            </div>
            <div class="recharge-col-title d-flex">
              <p
                class="text-400-12 white mb-2"
                style="
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 34px;
                "
              >
                2nd
              </p>
              <p
                class="text-400-12 white"
                style="
                  margin-left: 4px;
                  margin-bottom: 8px;
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 97px;
                "
              >
                180% Bonus
              </p>
            </div>
            <div class="recharge-col-title d-flex">
              <p
                class="text-400-12 white mb-2"
                style="
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 34px;
                "
              >
                3rd
              </p>
              <p
                class="text-400-12 white"
                style="
                  margin-left: 4px;
                  margin-bottom: 8px;
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 97px;
                "
              >
                180% Bonus
              </p>
            </div>
            <div class="recharge-col-title d-flex">
              <p
                class="text-400-12 white mb-2"
                style="
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 34px;
                "
              >
                4th
              </p>
              <p
                class="text-400-12 white"
                style="
                  margin-left: 4px;
                  margin-bottom: 8px;
                  text-align: center;
                  background: rgba(34, 31, 50, 1);
                  height: 18px;
                  border-radius: 27px;
                  width: 97px;
                "
              >
                180% Bonus
              </p>
            </div>
          </div>
          <div class="recharge-col description-img-col">
            <div class="deposit-bonus-img-text">
              <p>Deposit Bonus</p>
            </div>
            <img
              src="@/assets/public/image/img_public_45.png"
              width="146"
              height="63"
              style="float: right"
            />
          </div>
        </div>
        <div class="recharge-bonus-actions">
          <div class="recharge-col action-btn-col">
            <button class="recharge-more-btn">
              <div class="d-flex" style="font-size: 12px; color: rgba(18, 255, 118, 1)">
                <p>View details</p>
                <img
                  src="@/assets/public/image/img-public-50.png"
                  width="16"
                  class="ml-1"
                  color="rgba(18, 255, 118, 1);"
                />
              </div>
            </button>
          </div>
          <div class="recharge-col action-btn-col right-aligned">
            <div style="float: right">
              <button class="recharge-more-btn">
                <div
                  class="d-flex justify-center"
                  style="
                    width: 122px;
                    height: 32px;
                    font-size: 14px;
                    font-weight: 700;
                    border-radius: 8px;
                    background: rgba(249, 188, 1, 1);
                    color: #000;
                    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
                    align-items: center;
                    justify-content: center; /* Added justify-content */
                  "
                >
                  <p>First Deposit</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 100px; background: rgba(41, 37, 60, 1)"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Base styles for the bonus dashboard sidebar/modal */
.bonus-dashboard-sidebar {
  position: fixed;
  bottom: -593px; /* Start off-screen below */
  left: 0;
  width: 100%;
  height: 593px; /* Fixed height as in original */
  background-color: transparent; /* Transparent background for the container */
  transition: bottom 0.3s ease; /* Animation for sliding in/out */
  z-index: 1000; /* Ensure it's above other content */
  display: flex;
  flex-direction: column;
  box-shadow: none; /* Remove box shadow from the main container */
  border: none; /* Remove border from the main container */
}

/* Class to open the sidebar */
.bonus-dashboard-sidebar.open {
  bottom: 0;
}

/* Specific styles for mobile view (adjust breakpoint if needed) */
// .bonus-dashboard-sidebar.mobile-view {
//   /* Add any mobile-specific adjustments here if needed */
// }

/* Header styles */
.bonus-dashboard-header {
  /* The original header was a v-btn, replicating click area */
  cursor: pointer;
  padding: 0; /* Remove default padding */
  background: transparent; /* Transparent background */
  box-shadow: none; /* Remove box shadow */
  height: fit-content; /* Adjust height based on content */
  display: flex; /* Use flex to align content */
  justify-content: center; /* Center content horizontally */
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%; /* Take full width */
  max-width: 340px; /* Match the original drawer width for content alignment */
  padding: 0 8px; /* Add some padding */
  box-sizing: border-box; /* Include padding in width */
}

.bonus-dashboard-title {
  flex-grow: 1; /* Allow title to take available space */
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
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 16px;
  color: rgba(255, 255, 255, 1);
  position: relative; /* Needed for top positioning */
  top: 24px; /* Adjust based on image size and desired alignment */
}
.bonus-dashboard-img {
  flex-shrink: 0; /* Prevent image from shrinking */
  position: relative; /* Needed for top positioning */
  top: 0px; /* Adjust based on desired alignment */
  margin-left: 27px; /* Space between title and image */
}

.bonus-dashboard-img img {
  display: block; /* Prevent extra space below image */
  float: right; /* Keep float right as in original */
}

/* Bonus Type Buttons */
.bonus-btns {
  position: relative;
  height: 60px;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  padding: 10px;
  border-radius: 37px;
  background: rgba(41, 37, 60, 1);
  border: none;
  z-index: 1010;
  margin: 0 8px; /* Add horizontal margin */
}

.bonus-btns-body {
  background: rgba(34, 31, 50, 1);
  border-radius: 37px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bonus-type-btn {
  background: rgba(34, 31, 50, 1);
  padding-top: 8px; /* Adjust padding for text alignment */
  border-radius: 37px;
  width: 113px;
  height: 38px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: rgba(119, 130, 170, 1);
  margin: auto 5px; /* Center vertically and add horizontal margin */
  cursor: pointer; /* Indicate clickable */
  display: flex; /* Use flex to center text */
  justify-content: center;
  align-items: center;
}

.bonus-btn-selected {
  background:
    linear-gradient(90deg, #4522c1 0.01%, #6c43f7 100%),
    linear-gradient(180deg, #6d44f8 0%, #5726fc 100%);
  color: white;
}

/* Content Area */
.nav-drawer-content {
  margin-top: -30px;
  padding-top: 46px;
  background: rgba(41, 37, 60, 1);
  flex-grow: 1; /* Allow content to fill remaining space */
  overflow-y: auto; /* Enable scrolling for content */
}

.recharge-bonus-body {
  margin: 16px 8px 26px 8px; /* Top, Right, Bottom, Left margin */
  background: rgba(34, 31, 50, 1);
  height: 176px;
  border-radius: 4px;
  padding: 0; /* Remove default padding */
}

/* Layout for description and actions sections */
.recharge-bonus-description,
.deposit-bonus-description {
  height: 124px;
  border-radius: 4px;
  padding: 16px;
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Vertically center items */
}

.recharge-bonus-description {
  background: linear-gradient(90deg, #384140 0%, #7bca1b 100%);
}

.deposit-bonus-description {
  background: linear-gradient(90deg, #3b2a5a 0%, #6a42f4 100%);
}

.recharge-bonus-actions {
  margin-top: 16px;
  height: 40px;
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Vertically center items */
}

.recharge-col {
  padding: 0; /* Remove default padding */
  /* Adjust width or flex-basis as needed for column layout */
  flex-basis: 0; /* Allow flex items to grow */
  flex-grow: 1; /* Allow flex items to grow */
}

.description-text-col {
  flex-basis: 75%; /* Allocate 75% width for text column */
  max-width: 75%;
}

.description-img-col {
  flex-basis: 25%; /* Allocate 25% width for image column */
  max-width: 25%;
  display: flex; /* Use flex to align image */
  justify-content: flex-end; /* Align image to the right */
  align-items: center;
}

.action-btn-col {
  flex-basis: 50%; /* Allocate 50% width for each button column */
  max-width: 50%;
}

.right-aligned {
  display: flex;
  justify-content: flex-end; /* Align content to the right */
}

// .recharge-col-title {
//   /* Styles for titles within recharge/deposit sections */
//   /* Add flex or block display as needed */
// }

.deposit-bonus-img-text {
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
  font-size: 16px;
  font-weight: 800;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  padding-left: 24px;
  color: white;
  margin-bottom: 14px;
}

.recharge-more-btn {
  background-color: transparent;
  box-shadow: none;
  border: none;
  cursor: pointer;
  padding: 0; /* Remove default button padding */
  text-transform: initial; /* Keep text as is */
}

.recharge-more-btn div {
  /* Styles for the inner div used for button content */
  display: flex;
  align-items: center;
}

/* Text styles (adjust font families and sizes as needed) */
.text-800-16.white {
  font-size: 16px;
  font-weight: 800;
  color: white;
}

.text-600-8.white {
  font-size: 8px;
  font-weight: 600;
  color: white;
}

.text-400-12.white {
  font-size: 12px;
  font-weight: 400;
  color: white;
}

.ml-1 {
  margin-left: 4px;
} /* Equivalent to ml-1 in some frameworks */
.ml-2 {
  margin-left: 8px;
} /* Equivalent to ml-2 */
.mb-2 {
  margin-bottom: 8px;
} /* Equivalent to mb-2 */

/* Bottom spacing div */
.nav-drawer-content > div:last-child {
  height: 100px;
  background: rgba(41, 37, 60, 1);
}
</style>
