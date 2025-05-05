import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { NETWORK_CONFIG } from 'shared/types/NetworkCfg'
import { Network } from '@/net/Network'
import type * as Deposit from 'shared/interface/deposit'
import { handleException } from './exception' // Assuming this path is correct
import type { Product } from 'shared/prisma/interfaces'

export const useDepositStore = defineStore('deposit', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const depositConfig = ref<any>({
    // Keeping 'any' type as in original
    bonus: [
      {
        type: 0,
      },
    ],
  })
  const depositSubmit = ref<any>({}) // Keeping 'any' type as in original
  const pixInfo = ref<Deposit.GetPixInfo>({} as Deposit.GetPixInfo) // Keeping type assertion as in original
  const pixInfoToggle = ref(false)
  const shopOpen = ref(false)
  const products = ref<Product[]>([])
  const selectedPaymentMethod = ref<string>('')
  const selectedProduct = ref<Product>()
  const operatorData = ref<Deposit.OperatorData>()
  const depositHistoryItem = ref<Deposit.DepositHistoryResponse>(
    {} as Deposit.DepositHistoryResponse,
  ) // Keeping type assertion as in original

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getDepositCfg = computed(() => depositConfig.value)
  const getDepositSubmit = computed(() => depositSubmit.value)
  const getPixInfo = computed(() => pixInfo.value)
  const getPixInfoToggle = computed(() => pixInfoToggle.value)
  const getDepositHistoryItem = computed(() => depositHistoryItem.value)
  const getProducts = computed(() => products.value)
  const getOperatorData = computed(() => operatorData.value)
  const getSelectedPaymentMethod = computed(() => selectedPaymentMethod.value)
  const getSelectedProduct = computed(() => selectedProduct.value)

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }
  const toggleShopOpen = () => {
    shopOpen.value = !shopOpen.value
    console.log(shopOpen.value)
  }
  const setSelectedPaymentMethod = (method: string) => {
    selectedPaymentMethod.value = method
  }
  const setSelectedProduct = (product: Product) => {
    selectedProduct.value = product
  }
  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setDepositCfg = (config: any) => {
    // Keeping 'any' type as in original
    depositConfig.value = config
  }

  const setDepositSubmit = (submit: any) => {
    // Keeping 'any' type as in original
    depositSubmit.value = submit
  }

  const setPixInfo = (info: Deposit.GetPixInfo) => {
    pixInfo.value = info
  }

  const setPixInfoToggle = (toggle: boolean) => {
    pixInfoToggle.value = toggle
  }

  const setDepositHistoryItem = (item: Deposit.DepositHistoryResponse) => {
    depositHistoryItem.value = item
  }

  const setProducts = (item: Product[]) => {
    products.value = item
  }
  const setOperatorData = (item: Deposit.OperatorData) => {
    operatorData.value = item
  }
  const dispatchProducts = async () => {
    setSuccess(false)
    const route: string = NETWORK_CONFIG.DEPOSIT_PAGE.PRODUCTS
    const network: Network = Network.getInstance()

    const next = (response: Deposit.GetProductsResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setProducts(response.products)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }
  const dispatchOperatorData = async () => {
    setSuccess(false)
    const route: string = NETWORK_CONFIG.DEPOSIT_PAGE.OPERATOR_DATA
    const network: Network = Network.getInstance()

    const next = (response: Deposit.GetOperatorDataResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setOperatorData(response.operator)
        setProducts(response.operator.products)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }
  // user deposit configuration
  const dispatchUserDepositCfg = async () => {
    setSuccess(false)
    const route: string = NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_CONFIG
    const network: Network = Network.getInstance()

    const next = (response: Deposit.GetDepositResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setDepositCfg(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // user deposit submit
  const dispatchUserDepositSubmit = async (data: Deposit.DepositItem) => {
    setSuccess(false)
    const route: string = NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_SUBMIT
    const network: Network = Network.getInstance()

    const next = (response: Deposit.SubmitDepositResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setDepositSubmit(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // user deposit history
  const dispatchUserDepositHistory = async (data: any) => {
    // Keeping 'any' type as in original
    setSuccess(false)
    const route: string = NETWORK_CONFIG.DEPOSIT_PAGE.DEPOSIT_HISTORY
    const network: Network = Network.getInstance()

    const next = (response: Deposit.GetDepositHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setDepositHistoryItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Return all state, getters, and actions
  return {
    shopOpen,
    toggleShopOpen,
    dispatchProducts,
    getProducts,
    dispatchOperatorData,
    getOperatorData,
    getSelectedPaymentMethod,
    setSelectedPaymentMethod,
    getSelectedProduct,
    setSelectedProduct,
    errMessage,
    depositConfig,
    depositSubmit,
    pixInfo,
    pixInfoToggle,
    depositHistoryItem,

    getSuccess,
    getErrMessage,
    getDepositCfg,
    getDepositSubmit,
    getPixInfo,
    getPixInfoToggle,
    getDepositHistoryItem,

    setSuccess,
    setErrorMessage,
    setDepositCfg,
    setDepositSubmit,
    setPixInfo,
    setPixInfoToggle,
    setDepositHistoryItem,
    dispatchUserDepositCfg,
    dispatchUserDepositSubmit,
    dispatchUserDepositHistory,
  }
})

// export const depositStore = useDepositStore()
