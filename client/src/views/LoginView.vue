<script lang="ts" setup>
import { useLoading } from '@/composables/useLoading'
import { useAppBarStore } from '@/stores/appBar'
import { useAuthStore } from '@/stores/auth'
import { useCurrencyStore } from '@/stores/currency'
import { useGameStore } from '@/stores/game'
import { useNotificationStore } from '@/stores/notifications'
import { useRefferalStore } from '@/stores/refferal'
import { useSocketStore } from '@/stores/socket'
import { useUserStore } from '@/stores/user'
import { useVipStore } from '@/stores/vip'
// import { posthog } from '@/bootstrap'
import { loadingFadeOut } from 'virtual:app-loading'

const { isLoading, withLoading, stopLoading } = useLoading()
let x = 0
// posthog.capture('Login Page Viewed', { page: window.location.pathname })
// var executed = false
const authStore = useAuthStore()

const {
  dispatchSignIn,
  dispatchSignUp,
  setNickNameDialogVisible,
  dispatchUserProfile,
  setAuthModalType,
  setAuthDialogVisible,
  getSuccess,
  isAuthenticated,
} = authStore
const userStore = useUserStore()
const notificationStore = useNotificationStore()
const appBarStore = useAppBarStore()
const refferalStore = useRefferalStore()
const socketStore = useSocketStore()
const currencyStore = useCurrencyStore()
const vipStore = useVipStore()
const gameStore = useGameStore()
const { dispatchUserBalance } = userStore
const { dispatchVipInfo, dispatchVipLevels, dispatchVipLevelAward } = vipStore
const { setOverlayScrimShow } = appBarStore
const { setRefferalDialogShow } = refferalStore
const { dispatchSocketConnect } = socketStore
const { dispatchGameSearch, dispatchGameBigWin } = gameStore
const { dispatchCurrencyList } = currencyStore
const success = computed(() => getSuccess)
const formData = reactive({
  username: 'ash',
  password: 'asdfasdf',
  confirm: 'asdfasdf',
  faceIndex: 0,
  loginErr: '',
  passwErr: '',
  agentCode: '',
  promoCode: '',
})
const errMessage = ref()
const currentPage = ref()
const handleSignupFormSubmit = async () => {
  isLoading.value = true

  isLoading.value = true
  const r = await withLoading(
    dispatchSignUp({
      username: formData.username,
      password: formData.password,
      referral_code: formData.promoCode,
      browser: '',
      device: '',
      model: '',
      brand: '',
      imei: '',
    }),
  )
  console.log(r)
  console.log(authStore.getSuccess)
  if (authStore.getSuccess) {
    await withLoading(dispatchUserProfile())
    await withLoading(dispatchUserBalance())
    await withLoading(dispatchSocketConnect())
    await withLoading(dispatchCurrencyList())
    await withLoading(dispatchGameSearch(''))
    setAuthDialogVisible(false)
    setNickNameDialogVisible(true)
    // const toast = useToast();
    notificationStore.addNotification('success', 'success')

    // toast.success(t("signup.submit_result.success_text"), {
    //   timeout: 3000,
    //   closeOnClick: false,
    //   pauseOnFocusLoss: false,
    //   pauseOnHover: false,
    //   draggable: false,
    //   showCloseButtonOnHover: false,
    //   hideProgressBar: true,
    //   closeButton: "button",
    //   icon: SuccessIcon,
    //   rtl: false,
    // });
    console.log(process.env.NODE_ENV)
    console.log(process.env.NODE_ENV)
    // if (process.env.NODE_ENV == 'development') {
    setTimeout(() => {
      console.log('asdfasdf')

      isLoading.value = false
    }, 3000)
    // } else {
    //   isLoading.value = false

    // }
  } else {
    console.log('wtf error')
    isLoading.value = false

    if (
      errMessage.value ==
      'The account you entered has been used by someone else, please input again'
    ) {
      currentPage.value = 'already regged' //PAGE_TYPE.ALREADY_REGISTERED;
    } else {
      // const toast = useToast();
      notificationStore.addNotification('error', 'error')

      // toast.success(errMessage.value, {
      //   timeout: 3000,
      //   closeOnClick: false,
      //   pauseOnFocusLoss: false,
      //   pauseOnHover: false,
      //   draggable: false,
      //   showCloseButtonOnHover: false,
      //   hideProgressBar: true,
      //   closeButton: "button",
      //   icon: WarningIcon,
      //   rtl: false,
      // });
    }
    // }
  }
}

const handleLoginFormSubmit = async () => {
  isLoading.value = true

  const r = await withLoading(
    dispatchSignIn({
      username: formData.username,
      password: formData.password,
    }),
  )
  console.log(r)
  console.log(success.value)
  console.log(r)
  if (r == true) {
    await withLoading(dispatchUserProfile())
    await withLoading(dispatchUserBalance())
    await withLoading(dispatchCurrencyList())
    await withLoading(dispatchVipInfo())
    await withLoading(dispatchVipLevels())
    await withLoading(dispatchVipLevelAward())
    await withLoading(dispatchGameSearch('?limit=200'))
    await withLoading(dispatchGameBigWin())
    setOverlayScrimShow(false)
    setRefferalDialogShow(true)
    userStore.setCurrentUser(authStore.userInfo)
    authStore.setIsAuthenticated(true)
    userStore.isAuthenticated = true
    // const toast = useToast();
    // toast.success("success_text", {
    //   timeout: 3000,
    //   closeOnClick: false,
    //   pauseOnFocusLoss: false,
    //   pauseOnHover: false,
    //   draggable: false,
    //   showCloseButtonOnHover: false,
    //   hideProgressBar: true,
    //   closeButton: "button",
    //   icon: SuccessIcon,
    //   rtl: false,

    // });
    setTimeout(() => {
      setAuthModalType('')
      setAuthDialogVisible(false)
    }, 100)
    // await dispatchSocketConnect()
    setTimeout(() => {
      isLoading.value = false
      notificationStore.addNotification('success', 'success')
    }, 100)
  } else {
    // const toast = useToast();
    notificationStore.addNotification('error', 'error')

    // toast.success("err_text", {
    //   timeout: 3000,
    //   closeOnClick: false,
    //   pauseOnFocusLoss: false,
    //   pauseOnHover: false,
    //   draggable: false,
    //   showCloseButtonOnHover: false,
    //   hideProgressBar: true,
    //   closeButton: "button",
    //   icon: WarningIcon,
    //   rtl: false,
    // });
  }

  isLoading.value = false
}

async function sendEmit1() {
  // posthog.capture('Form Submitted', { formData })
  const user = useUserStore()
  // let success
  // if (executed === false)
  try {
    await withLoading(user.login2({ username: formData.username, password: formData.password }))
  } catch (e) {
    console.log(e)
  }
  // console.log(success)
  // if (success === true) {
  // router.push('/home')
  // } else {
  //   router.push('/login')
  // }
}
async function register() {
  // posthog.capture('Form Submitted', { formData })
  const user = useUserStore()
  const userStore = useUserStore()
  let success
  // if (executed === false)
  console.log(formData.password)
  success = await withLoading(user.register(formData.username, formData.password))
  // success = await userStore.register(formData.username, formData.password)
  // executed = true

  // if (success === true) {
  //   router.push('/home/lobby')
  //   // } else {
  //   //   router.push('/login')
  // }
}

onMounted(() => {
  stopLoading()
  loadingFadeOut()
})
</script>

<template>
  <div
    v-if="!isLoading"
    class="max-w-[520px] w-[100vw] mt-7 flex flex-col justify-center items-center"
    style="height: 100vh; width: 100vw; max-width: 520px; justify-content: center"
  >
    <div
      class="wrapper color-white flex-col justify-center w-full mx-0 px-0"
      style="height: 100vh; width: 80vw; max-width: 520px; margin-auto"
    >
      <Logo class="mb-52" />
      <div class="mt-52 flex" style="margin-top: 200px">
        <label class="switch">
          <input class="toggle" type="checkbox" />
          <span class="slider" />
          <span class="card-side" />
          <div class="flip-card__inner">
            <div class="flip-card__front">
              <div class="title">Log inx</div>
              <div class="flip-card__form">
                <form>
                  <input
                    v-model="formData.username"
                    type="required"
                    placeholder="Username"
                    name="username"
                    class="flip-card__input"
                  />
                  <input
                    v-model="formData.password"
                    type="password"
                    autocomplete="new-password"
                    placeholder="Password"
                    name="password"
                    class="flip-card__input"
                  />

                  <button class="flip-card__btn" @click="handleLoginFormSubmit">Lets go!</button>
                </form>
              </div>
            </div>
            <div class="flip-card__back">
              <div class="title">Sign up</div>
              <div action="" class="flip-card__form">
                <form>
                  <input
                    v-model="formData.username"
                    type="name"
                    placeholder="Name"
                    class="flip-card__input"
                  />
                  <input
                    v-model="formData.password"
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                    name="password"
                    class="flip-card__input"
                  />
                  <input
                    v-model="formData.confirm"
                    type="password"
                    placeholder="Confirm"
                    autocomplete="new-password"
                    name="confirm"
                    class="flip-card__input"
                  />
                  <button class="flip-card__btn" @click="handleSignupFormSubmit">Confirm!</button>
                </form>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>
  <div v-else>
    <GlobalLoading />
  </div>
</template>

<style scoped>
/* From Uiverse.io by andrew-demchenk0 */
.wrapper {
  position: relative;
  /* margin-top: 150px; */
  --input-focus: #2d8cf0;
  --font-color: #fefefe;
  --font-color-sub: #7e7e7e;
  --bg-color: #111;
  --bg-color-alt: #7e7e7e;
  --main-color: #b954f3;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.wrapper2 {
  position: relative;
  --input-focus: #2d8cf0;
  --font-color: #fefefe;
  --font-color-sub: #7e7e7e;
  --bg-color: #111;
  --bg-color-alt: #7e7e7e;
  --main-color: #b954f3;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* switch card */
.switch {
  transform: translateY(-200px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 50px;
  height: 20px;
}

.card-side::before {
  position: absolute;
  content: 'Log in';
  left: -70px;
  top: 0;
  width: 100px;
  text-decoration: underline;
  color: var(--font-color);
  font-weight: 600;
}

.card-side::after {
  position: absolute;
  content: 'Sign up';
  left: 70px;
  top: 0;
  width: 100px;
  text-decoration: none;
  color: var(--font-color);
  font-weight: 600;
}

.toggle {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-color);
  transition: 0.3s;
}

.slider:before {
  box-sizing: border-box;
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  border: 2px solid var(--main-color);
  border-radius: 5px;
  left: -2px;
  bottom: 2px;
  background-color: var(--bg-color);
  box-shadow: 0 3px 0 var(--main-color);
  transition: 0.3s;
}

.toggle:checked + .slider {
  background-color: var(--input-focus);
}

.toggle:checked + .slider:before {
  transform: translateX(30px);
}

.toggle:checked ~ .card-side:before {
  text-decoration: none;
}

.toggle:checked ~ .card-side:after {
  text-decoration: underline;
}

/* card */

.flip-card__inner {
  width: 80vw;
  max-width: 420px;
  height: 350px;
  position: relative;
  background-color: transparent;
  perspective: 1000px;
  /* width: 100%;
    height: 100%; */
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  margin-top: 16px;
}

.toggle:checked ~ .flip-card__inner {
  transform: rotateY(180deg);
}

.toggle:checked ~ .flip-card__front {
  box-shadow: none;
}

.flip-card__front,
.flip-card__back {
  width: 80vw;
  max-width: 420px;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: var(--bg-color);
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
}

.flip-card__back {
  /* width: 100%; */
  width: 80vw;

  transform: rotateY(180deg);
}

.flip-card__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.title {
  margin: 10px 0 10px 0;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  color: white;
}

.flip-card__input {
  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.flip-card__input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.flip-card__input:focus {
  border: 2px solid var(--input-focus);
}

.flip-card__btn:active,
.button-confirm:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}

.flip-card__btn {
  margin: 20px 0 20px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
}
</style>
