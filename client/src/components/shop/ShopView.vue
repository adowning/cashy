<script setup lang="ts">
import { eventBus } from '@/composables/eventBus'
import { useUserStore } from '@/stores/user'
import { useDepositStore } from '@/stores/deposit'
import type { Product } from 'shared'
import { onMounted } from 'vue'

// import { eventTypes, useEventsBus } from '@/hooks/events'
// import { useUserStore } from '@/store/user.store'
// import type { Product, Shop } from '@/api/v1/client'
// import type { ShopDetailed } from '@/store/shop.store'

const activeName = ref('selectProduct')
eventBus.on('activeName', (val) => {
  activeName.value = val
  if (val === 'none') close()
})
const target = ref()
const userStore = useUserStore()
const depositStore = useDepositStore()
const { dispatchOperatorData } = depositStore
const { dispatchUserDepositHistory } = depositStore

// const shop = store.shop
// const products = store.products
const currentUser = userStore.currentUser
const closePressed = ref(false)
const products = ref([])
const pendingTransaction = ref()
export interface ProductWithSelected extends Product {
  selected: false
}
// onMounted(async () => {
//   //console.log(currentUser.value)
//   if (currentUser.value === undefined)
//     return
//   // currentUser.value = await authStore.fetchUserInfo()
//   recipient.value = currentUser.value
//   _cashtag.value = currentUser.value.cashtag as string
//   recipients.value.push(currentUser.value)
// })
const selectedProduct = ref<ProductWithSelected>({
  id: '0  ',
  amountToReceiveInCredits: 0,
  description: '',
  type: '',
  shopId: '1',
  bonusSpins: 0,
  selected: false,
  title: '',
  url: '',
  priceInCents: 0,
  isPromo: false,
  // createdAt: new Date(),
  bonusCode: '',
  bonusTotalInCredits: 0,
  discountInCents: 0,
  totalDiscountInCents: 0,
  transactions: [],
  bestValue: 0,
  createdAt: new Date(),
  updatedAt: null,
  operator: null,
})
// const { isLoading, clients, currentPage, totalPages, getPage } = useClients();

// $bus.$on(eventTypes.shopSelectProduct, (product: any) => {
//   //console.log('shopSelectProduct ', product)
//   selectedProduct.value = product.value
// })
// eventBus.on(eventTypes.shopSelectPayment, (payment: string) => {
//   //console.log('shopSelectPayment ', payment)
//   paymentMethod.value = payment
// })
// $bus.$on(eventTypes.closeShop, () => {
//   close()
// })
// function selectRecipient(val: any) {
//   recipients.value.forEach((product) => {
//     product.selected = false
//   })
//   recipient.value.id = val.id
//   //console.log(recipient.value)
// }
// const currentUser.value = ref<WUser>()
// async function close() {
//     //console.log('tick')
//     // target!.value!.classList.add(`animate__animated`, 'animate__bounceOut');
//     eventBus.emit(show_shop, false)
//     // delay(300)
//     eventBus.emit(show_bars, true)
//     // await delay(1000)
//     // target!.value!.classList.remove(`animate__animated`, 'animate__bounceOut');
// }
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function close() {
  // console.log('adding fadeout anim and refreshing user')
  target!.value!.classList.add(`animate__animated`, 'animate__fadeOut')
  // await refreshState()
  setTimeout(() => {
    // console.log('firing shop close')
    eventBus.emit('shopOpen', false)
  }, 500)
}

// if (
//   currentUser.value.user.shopId !== 'dxsxjssj9ecw32z' &&
//   currentUser.value.user.shopId !== undefined &&
//   currentUser.value.user.shopId !== ''
// ) {
//   method.value = 0
//   activeName.value = 'b'
// }

// function selectProduct(val: any) {
//   //console.log(val.id)
//   if (val.id !== '0') {
//     usingCustom.value = false
//     tempDepositAmount.value = val.price
//   } else {
//     //console.log(stepperAmount.value)
//     usingCustom.value = true
//     tempDepositAmount.value = stepperAmount.value * 100
//   }
//   productList.value.forEach((product) => {
//     product.selected = false
//   })
//   val.selected = true
//   selectedProduct.value = val
//   //console.log(val)
// }

// const shade = ref<HTMLElement>()

// Get the variant from target motion instance.
// const { variant } = useMotion(shade, {
//   initial: {
//     scale: 1,
//     opacity: 0,
//   },
//   enter: {
//     opacity: 1,
//     transition: {
//       // This will go to `custom` when enter is complete.
//       onComplete: () => (variant.value = 'custom'),
//     },
//   },
//   custom: {
//     scale: 2,
//     transition: {
//       type: 'spring',
//       damping: 100,
//     },
//   },
// })

// const { customElement } = useMotions()

// Dummy custom event function
// const yourCustomEvent = () => {
//   // Edit the variant using the motion instance.
//   customElement.variant.value = 'custom'
// }
// const screenWidth = ref(window.innerWidth)

// const updateScreenWidth = () => {
//   screenWidth.value = window.innerWidth
// }
async function cancelBalanceTransactions() {
  await api.transactionControllerCancelPending.send()
  // // //console.log(canceled)
  // await loaduser()
  // $bus.$emit(eventTypes.transaction_updated, [])
  // // //console.log(canceled)
  // // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  // if (typeof canceled === 'number') {
  balancetransactionsCanceled.value = true
  setTimeout(() => {
    // hasPendingBalanceTransaction.value = false
    // balancetransactionsCanceled.value = false
    close()
  }, 2000)
  // }
}
onMounted(async () => {
  // window.addEventListener('resize', updateScreenWidth)
  // Fetch initial deposit configuration
  await dispatchOperatorData()
  await dispatchUserDepositHistory(null)
  console.log(depositStore.getOperatorData)
  console.log(depositStore.getProducts)
  products.value = depositStore.getProducts
  for (const item of depositStore.getDepositHistoryItem.record) {
    console.log(item)
    if (item.status === 'PENDING') {
      activeName.value = 'pendingTransaction'
      pendingTransaction.value = item
    }
  }
})
</script>

<template>
  <div
    ref="target"
    class="animate__animated animate__fadeIn"
    style="
      /* */
      border-radius: 20px;
      padding: 10px;
      width: 100vw;
      margin-top: 50px;
      height: 100vh;
      z-index: 9999;
      overflow-y: scroll;
    "
  >
    <div
      class="fixed left-0 top-0 flex flex-col items-center justify-start overflow-y-hidden"
      style="
        width: 100vw;
        margin: auto;
        height: 90vh;
        background-repeat: no-repeat;
        border-image: url('/images/cell-2.png') 20 20 20 20 fill / 20px 20px 20px 20px;
        padding: 20px 20px 20px 20px;
        max-width: 480px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      "
    >
      <div
        class="w-full mt-3 flex flex-row items-center justify-center"
        style="
          margin: auto;
          max-width: 480px;
          margin-top: 12px;
          margin-bottom: 0px;
          padding: 0px;
          background-color: transparent;
        "
      >
        <div class="glow pt-3" style="font-size: 50px">DEPOSIT</div>
        <div class="absolute right-0 top-1 flex">
          <img
            :src="`${closePressed ? '/images/close.avif' : '/images/close.avif'}`"
            style="z-index: 999; width: 40px; height: 40px; right: 0px; top: 0px"
            @click="close()"
          />
        </div>
      </div>
      <img
        src="/images/shop/store-banner.png"
        style="z-index: 899; width: 85vw; height: 100px; right: 0px; top: 0px"
      />
      <div
        v-if="currentUser !== undefined && products.length > 0"
        class="min-h-100 w-100 flex flex-col items-center justify-center"
        style="max-width: 100%"
      >
        <div class="w-full flex items-center justify-stretch px-1" style="width: 100vw">
          <div class="absolute left-12 top-13 flex">
            <img
              v-if="activeName !== 'selectProduct'"
              src="/images/side-arrow-prev.avif"
              style="height: 30px; z-index: 999"
              @click="
                activeName === 'selectPayment'
                  ? (activeName = 'selectProduct')
                  : activeName === 'shopConfirm'
                    ? (activeName = 'selectPayment')
                    : (activeName = 'selectProduct')
              "
            />
          </div>
          <div
            style="margin: auto; font-size: 36px"
            class="glow flex items-center justify-center py-5 pl-5"
          />
        </div>
        <div v-if="activeName === 'hasPending'">
          <div class="futex-cell-2 glow-light">
            You already have a pending balancetransaction. Would you like to cancel it?
          </div>
          <div
            class="mx-16 mb-12 flex flex-row justify-center gap-3"
            style="margin-bottom: 150px; margin-top: 16px"
          >
            <div @click="close()">
              <GlassButton color="red"> No </GlassButton>
            </div>
            <div @click="cancelBalanceTransactions()">
              <GlassButton color="green"> Yes </GlassButton>
            </div>
          </div>
        </div>
        <div v-if="activeName === 'selectProduct' && depositStore.getProducts !== undefined">
          <SelectProduct :current-user="currentUser" />
        </div>

        <div v-if="activeName === 'selectPayment'">
          <SelectPayment :current-user="currentUser" />
        </div>

        <div v-if="activeName === 'enterStoreId'">
          <StoreId :current-user="currentUser" />
        </div>
        <div v-if="activeName === 'shopConfirm'">
          <ShopConfirm :selected-product="selectedProduct" :current-user="currentUser" />
        </div>

        <!-- <div class="mx-12 flex flex-row justify-between"></div> -->
      </div>
      <div
        style="
          position: absolute;
          bottom: 19px;
          left: 15px;
          width: 92%;
          height: 115px;
          z-index: 20;
          /* margin-left: 8px; */
          /* margin-top: 40px; */
          background-position-y: top;
          background-size: 92vw 115px;
          background: url('/images/shop/gold-bottom2.avif');
        "
      />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.Tabs__nav {
  background-color: transparent !important;
  color: transparent !important;
}

.glow {
  font-size: 30px;
  font-weight: 800;
  color: #fff;
  text-align: end;
  /* text-shadow:  #FC0 1px 0 10px; */
  text-shadow:
    0px 0px 10px #fff,
    0 0 20px #c74dff,
    0 0 30px #720fc4;
}

.not-glow {
  font-size: 18px;
  font-weight: 900;
  color: #fff;
  text-align: center;
  /* -webkit-animation: glow 1s ease-in-out infinite alternate;
    -moz-animation: glow 1s ease-in-out infinite alternate;
    animation: glow 1s ease-in-out infinite alternate; */
}
</style>
