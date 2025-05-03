import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { NETWORK } from '@/net/NetworkCfg'
import type * as SignIn from '@/interface/signin'
import type * as SignUp from '@/interface/signup'
import type * as User from '@/interface/user'
import { Network } from '@/net/Network'
import { NetworkData } from '@/net/NetworkData'
import { Netcfg } from '@/net/NetCfg'
import { handleException } from './exception' // Assuming this path is correct
import { router } from '@/router'

export const useAuthStore = defineStore('auth', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const authModalType = ref('')
  const dialogCheckbox = ref(false)
  const authDialogVisible = ref(false)
  const signUpForm = ref(false)
  const nickNameDialogVisible = ref(false)
  const token = ref<string | undefined>(NetworkData.getInstance().getToken())
  const userInfo = ref<User.GetUserInfo>({
    uid: 'User6696608024',
    name: 'Little Planes',
    email: 'anderson.brazstar@gmail.com',
    phone: '+5517991696669',
    avatar: new URL('@/assets/public/image/ua_public_10.png', import.meta.url).href,
    // Add other fields from the original userInfo default if they are required by the type
    first_name: '',
    last_name: '',
    id: 0,
    id_number: '',
    email_confirmd: false,
    phone_confirmd: false,
    date_of_birth: '',
    county: '',
    state: '',
    city: '',
    address: '',
    postal_code: '',
    language: '',
    locale: '',
    initial_profile_complete: false,
    is_supended: 0,
    sys_communications: false,
    locked_personal_info_fields: [],
    create_at: 0,
  })
  const userAmount = ref({
    amount: 111111,
    currency: {
      fiat: true,
      name: '',
      symbol: 'R$',
      type: 'BRL',
    },
    withdraw: 111111,
    rate: 1000,
  })

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getAuthModalType = computed(() => authModalType.value)
  const getToken = computed(() => token.value)
  const getUserInfo = computed(() => userInfo.value)
  const getUserAmount = computed(() => userAmount.value)
  const getDialogCheckbox = computed(() => dialogCheckbox.value)
  const getAuthDialogVisible = computed(() => authDialogVisible.value)
  const getSignUpForm = computed(() => signUpForm.value)
  const getNickNameDialogVisible = computed(() => nickNameDialogVisible.value)
  const isAuthenticated = ref(false)
  // Actions converted to regular functions
  const setAuthModalType = (type: string) => {
    authModalType.value = type
  }

  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }
  const setIsAuthenticated = (b: boolean) => {
    isAuthenticated.value = b
    console.log(router.currentRoute.value.path)
    if (router.currentRoute.value.path == '/login') router.push('/home')
  }
  const setToken = (newToken: string) => {
    const networkData: NetworkData = NetworkData.getInstance()
    const netCfg: Netcfg = Netcfg.getInstance()
    networkData.setToken(newToken)
    netCfg.setToken(newToken)
    token.value = newToken
  }

  const removeToken = () => {
    token.value = undefined
    const networkData: NetworkData = NetworkData.getInstance()
    networkData.resetData()
    // Reset userInfo to its initial state
    userInfo.value = {
      uid: 'User6696608024',
      name: 'Little Planes',
      avatar: new URL('@/assets/public/image/ua_public_10.png', import.meta.url).href,
      first_name: '',
      last_name: '',
      id: 0,
      id_number: '',
      email: '',
      email_confirmd: false,
      phone: '',
      phone_confirmd: false,
      date_of_birth: '',
      county: '',
      state: '',
      city: '',
      address: '',
      postal_code: '',
      language: '',
      locale: '',
      initial_profile_complete: false,
      is_supended: 0,
      sys_communications: false,
      locked_personal_info_fields: [],
      create_at: 0,
    }
  }

  const setUserInfo = (info: User.GetUserInfo) => {
    userInfo.value = info
  }

  const setUserAmount = (amount: User.GetUserAmount) => {
    userAmount.value = amount
  }

  const setDialogCheckbox = (checked: boolean) => {
    dialogCheckbox.value = checked
  }

  const setAuthDialogVisible = (visible: boolean) => {
    authDialogVisible.value = visible
  }

  const setSignUpForm = (isSignUp: boolean) => {
    signUpForm.value = isSignUp
  }

  const setNickNameDialogVisible = (visible: boolean) => {
    nickNameDialogVisible.value = visible
  }

  // Dispatch functions (actions)
  const dispatchSignIn = async (msg: SignIn.SigninRequestData) => {
    setSuccess(false)
    const route: string = NETWORK.LOGIN.LOGIN
    const network: Network = Network.getInstance()

    const next = (response: SignIn.GetSigninResponseData) => {
      if (response.code == 200) {
        console.log(response.token)
        setToken(response.token)
        setSuccess(true)
        console.log(success.value)
        return success.value
      } else {
        setErrorMessage(handleException(response.code))
        return success.value
      }
    }
    await network.sendMsg(route, msg, next, 1)
    return success.value
  }

  const dispatchSignUp = async (msg: SignUp.SignupRequestData) => {
    setSuccess(false)
    const route: string = NETWORK.LOGIN.REGISTER
    const network: Network = Network.getInstance()

    const next = (response: SignUp.GetSignupResponseData) => {
      console.log(response.code)
      if (response.code == 200) {
        setToken(response.token)
        setSuccess(true)
        console.log(success.value)
        return success.value
      } else {
        setErrorMessage(handleException(response.code))
        return success.value
      }
    }
    await network.sendMsg(route, msg, next, 1)
  }

  const dispatchUserProfile = async () => {
    setSuccess(false)
    const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_INFO
    const network: Network = Network.getInstance()

    const next = (response: User.GetUserInfoResponseData) => {
      if (response.code == 200) {
        if (response.data.avatar == '') {
          response.data.avatar = new URL(
            '@/assets/public/image/ua_public_10.png',
            import.meta.url,
          ).href
        }
        setErrorMessage('')
        setUserInfo(response.data)
        setSuccess(true)
      } else {
        if (response.code == 101004) {
          dispatchSignout()
        }
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  const dispatchUserAmount = async () => {
    setSuccess(false)
    const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_AMOUNT
    const network: Network = Network.getInstance()

    const next = (response: User.GetUserAmountResponseData) => {
      if (response.code == 200) {
        setUserAmount(response.data)
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  const dispatchUpdateUserInfo = async (data: any) => {
    setSuccess(false)
    const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_CHANGE
    const network: Network = Network.getInstance()

    const next = (response: User.GetUserInfoResponseData) => {
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  const dispatchUpdateEmail = async (data: User.UpdateEmail) => {
    setSuccess(false)
    const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_EMAIL
    const network: Network = Network.getInstance()

    const next = (response: User.GetUserInfoResponseData) => {
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  const dispatchUpdatePassword = async (data: User.UpdatePassword) => {
    setSuccess(false)
    const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_PASSWORD
    const network: Network = Network.getInstance()

    const next = (response: User.GetUserInfoResponseData) => {
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  const dispatchSuspendUser = async (data: User.UpdateSuspendUser) => {
    setSuccess(false)
    const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_SUSPEND
    const network: Network = Network.getInstance()

    const next = (response: User.GetUserInfoResponseData) => {
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  const dispatchSignout = () => {
    removeToken()
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    authModalType,
    dialogCheckbox,
    authDialogVisible,
    signUpForm,
    nickNameDialogVisible,
    token,
    userInfo,
    userAmount,
    isAuthenticated,
    getSuccess,
    getErrMessage,
    getAuthModalType,
    getToken,
    getUserInfo,
    getUserAmount,
    getDialogCheckbox,
    getAuthDialogVisible,
    getSignUpForm,
    getNickNameDialogVisible,
    setIsAuthenticated,
    setAuthModalType,
    setSuccess,
    setErrorMessage,
    setToken,
    removeToken,
    setUserInfo,
    setUserAmount,
    setDialogCheckbox,
    setAuthDialogVisible,
    setSignUpForm,
    setNickNameDialogVisible,
    dispatchSignIn,
    dispatchSignUp,
    dispatchUserProfile,
    dispatchUserAmount,
    dispatchUpdateUserInfo,
    dispatchUpdateEmail,
    dispatchUpdatePassword,
    dispatchSuspendUser,
    dispatchSignout,
  }
})

// Utilities
import { createPinia } from 'pinia'
// Import stores using the new setup syntax naming convention
import { useAboutStore } from './about'
import { useAchievementStore } from './achievement'
import { useAgentStore } from './agent'
import { useGameStore } from './game'
import { useHomeStore } from './home' // Assuming you also have a home store
import { useInviteStore } from './invite' // Assuming you have an invite store
import { useLoginBonusStore } from './loginBonus' // Assuming you have a loginBonus store
import { useMailStore } from './mail' // Assuming you have a mail store
import { useMainStore } from './main' // Assuming you have a main store
import { useMenuStore } from './menu' // Assuming you have a menu store
import { usePromoStore } from './promo' // Assuming you have a promo store
import { useRefferalStore } from './refferal' // Assuming you have a refferal store

const pinia = createPinia()

export function resetAllStores() {
  // Call the use...Store hooks to get the store instances
  const stores = [
    useAboutStore(pinia),
    useAchievementStore(pinia),
    useAgentStore(pinia),
    useGameStore(pinia),
    useHomeStore(pinia),
    useInviteStore(pinia),
    useLoginBonusStore(pinia),
    useMailStore(pinia),
    useMainStore(pinia),
    useMenuStore(pinia),
    usePromoStore(pinia),
    useRefferalStore(pinia),
  ] // Add more stores as needed

  stores.forEach((instance) => {
    // Check if the store instance has a $reset method (setup stores don't have it by default)
    // If you need $reset functionality in setup stores, you need to manually add it.
    // For now, we'll just log the state as the original code did.
    console.log(instance) // Log the instance instead of $state as $state is not directly available
    // If you implement $reset in your setup stores, you can uncomment the line below
    // instance.$reset();
  })
}

export default pinia // Export the pinia instance

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { handleException } from './exception' // Assuming this path is correct

export const useLoginBonusStore = defineStore('loginBonus', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const loginBonusDialogVisible = ref(false)
  const rouletteBonusDialogVisible = ref(false)
  const getBonusDialogVisible = ref(false) // Renamed from getBonusDialogVisible in getters

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getLoginBonusDialogVisible = computed(() => loginBonusDialogVisible.value)
  const getRouletteBonusDialogVisible = computed(() => rouletteBonusDialogVisible.value)
  const getDepositAndBonusDialogVisible = computed(() => getBonusDialogVisible.value) // Using the ref name

  // Actions converted to regular functions
  const setLoginBonusDialogVisible = (visible: boolean) => {
    console.log(visible) // Keeping original console log
    loginBonusDialogVisible.value = visible
  }

  const setRouletteBonusDialogVisible = (visible: boolean) => {
    rouletteBonusDialogVisible.value = visible
  }

  const setGetBonusDialogVisible = (visible: boolean) => {
    getBonusDialogVisible.value = visible
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    loginBonusDialogVisible,
    rouletteBonusDialogVisible,
    getBonusDialogVisible, // Expose the ref with the original getter name if needed for consistency, or use the ref name directly

    getSuccess,
    getErrMessage,
    getLoginBonusDialogVisible,
    getRouletteBonusDialogVisible,
    getDepositAndBonusDialogVisible,

    setLoginBonusDialogVisible,
    setRouletteBonusDialogVisible,
    setGetBonusDialogVisible,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'
import type * as Reward from '@/interface/reward'
import { handleException } from './exception' // Assuming this path is correct

export const useRewardStore = defineStore('reward', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')

  const rewardList = ref<Reward.GetRewardCenterList>({} as Reward.GetRewardCenterList) // Keeping type assertion as in original

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getRewardList = computed(() => rewardList.value)

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setRewardList = (list: Reward.GetRewardCenterList) => {
    rewardList.value = list
  }

  const dispatchRewardList = async () => {
    setSuccess(false)
    const route: string = NETWORK.Reward.REWARD_LIST
    const network: Network = Network.getInstance()

    const next = (response: Reward.GetRewardCenterListResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setRewardList(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  const dispatchReceiveAchievementBonus = async () => {
    setSuccess(false)
    const route: string = NETWORK.Reward.RECIEVE_ACHIV_BONUS
    const network: Network = Network.getInstance()

    const next = (response: Reward.GetBonusResponse) => {
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    rewardList,

    getSuccess,
    getErrMessage,
    getRewardList,

    setSuccess,
    setErrorMessage,
    setRewardList,
    dispatchRewardList,
    dispatchReceiveAchievementBonus,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Cookies from 'js-cookie'
import { CacheKey } from '@/utils/cache-key'
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'
import { Network as Network1 } from '@/net/Network1'
import { useAuthStore } from './auth'
// import { NETWORK } from '@/utils/socket/NetworkCfg'
// import { Network } from '@/utils/socket/network'

export const createWebSocket = (route: string) => {
  console.log(`${import.meta.env.VITE_SOKET_URL}${route}?token=${Cookies.get(CacheKey.TOKEN)}`)
  const socket = new WebSocket(
    `wss://mobile.cashflowcasino.com/api/setup?token=mock_token`, //?token=${Cookies.get(CacheKey.TOKEN)}`,
    // `${import.meta.env.VITE_SOKET_URL}${route}?token=${Cookies.get(CacheKey.TOKEN)}`,
  )
  return socket
}

export interface GetUserBalance {
  bal: string | number
  cur: string
  mt: number
}
export const useSocketStore = defineStore('socket', () => {
  // State
  const success = ref<boolean>(false)
  const errMessage = ref<string>('')
  const socket = ref<any>(null)
  const socketBalance = ref<GetUserBalance>({
    bal: '',
    cur: '',
    mt: 0,
  })

  // Getters
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getSocketBalance = computed(() => socketBalance.value)

  // Actions
  function setSuccess(newSuccess: boolean) {
    success.value = newSuccess
  }

  function setErrorMessage(newMessage: string) {
    errMessage.value = newMessage
  }

  function setSocketBalance(newSocketBalance: GetUserBalance) {
    socketBalance.value = newSocketBalance
  }
  async function connected(x: any) {
    console.log('connected ', x)
  }
  // socket connect check
  async function dispatchSocketConnect() {
    console.log('dispatchSocketConnect')
    setSuccess(false)
    const route: string = NETWORK.WEB_SOCKET.SOCKET_CONNECT
    console.log(route)
    const network: Network = Network.getInstance()
    const network1: Network1 = Network1.getInstance()
    network1.connect(connected)
    console.log('x')
    socket.value = createWebSocket(route)
    console.log(socket.value)
    if (socket.value) {
      socket.value.onopen = handleOpen
      socket.value.onmessage = handleMessage
      socket.value.onerror = handleError
      socket.value.onclose = handleClose
    }
  }

  function handleOpen() {
    const authStore = useAuthStore()
    console.log('WebSocket connection established')
    authStore.setIsAuthenticated(true)
  }

  function handleMessage(event: MessageEvent) {
    // console.log('Received message:', event.data)
    try {
      const response = JSON.parse(event.data)
      console.log(response)
      if (response.onFundMessage !== undefined) {
        console.log(response.onFundMessage.mt)
        switch (response.onFundMessage.mt) {
          case 101:
            setSocketBalance(response.onFundMessage.data as GetUserBalance)
            break
        }
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error)
    }
  }

  function handleError(event: Event) {
    console.error('WebSocket error:', event)
  }

  function handleClose(event: CloseEvent) {
    console.log('WebSocket connection closed:', event)
  }

  return {
    success,
    errMessage,
    socket,
    socketBalance,
    getSuccess,
    getErrMessage,
    getSocketBalance,
    setSuccess,
    setErrorMessage,
    setSocketBalance,
    dispatchSocketConnect,
    handleOpen,
    handleMessage,
    handleError,
    handleClose,
  }
})
// // import { useUserStore } from '@/stores/modules/user';
// import { eventBus } from '@/composables/eventBus';
// import { CHANNEL_DEFAULT, CHANNEL_KICK_OFF, UPGRADE_CHANNEL } from '@/utils/constants';
// import { defineStore } from 'pinia';
// // import { LOGIN_URL } from '@/config';
// import { ref } from 'vue';
// // import { ElMessageBox } from 'element-plus';
// import { useUserStore } from '@/stores/user';

// // 是否使用socket 当 import.meta.env.VITE_SOCKET_URL 不为空时，启用websocket
// const useSocket = Object.prototype.hasOwnProperty.call(import.meta.env, 'VITE_SOCKET_URL');
// const socketUrl = import.meta.env.VITE_SOCKET_URL;
// const MAX_RECONNECT_COUNT = 10;

// /**
//  * 使用socket
//  * @param url
//  * @returns {{init: (function(): void), socket: null}}
//  */
// export const useSocketStore = defineStore('socket', () => {
//   /**
//    * 定义socket变量
//    *
//    * @type {WebSocket|null}
//    */
//   const socket = ref<WebSocket | null>(null);

//   const canReconnect = ref(true);

//   const reconnectCount = ref(0);

//   const _onOpen = () => {
//     canReconnect.value = true;
//     reconnectCount.value = 0;
//   };

//   const _onMessage = (event: MessageEvent) => {
//     const { data } = event;
//     const userStore = useUserStore();
//     // const authStore = useAuthStore();
//     try {
//       const res = JSON.parse(data);
//       switch (res.channel) {
//         case CHANNEL_DEFAULT:
//           break;
//         case CHANNEL_KICK_OFF:
//           close();
//           // 1.清除 Token
//           // userStore.clear();
//           userStore.$reset()
//           // authStore.clear();
//           console.log('kicked off')
//           // ElMessageBox.alert('您已经被强制踢下线了！', '温馨提示', {
//           //   confirmButtonText: '确定',
//           //   type: 'warning',
//           //   callback: () => {
//           //     // 2.重定向到登陆页
//           //     router.replace(LOGIN_URL);
//           //   }
//           // });
//           break;
//         case UPGRADE_CHANNEL:
//           close();
//           // 1.清除 Token
//           // userStore.clear();
//           // authStore.clear();
//           // authStore.clear();
//           console.log('UPGRADE_CHANNEL')

//           // ElMessageBox.alert(res.data + '！', '温馨提示', {
//           //   confirmButtonText: '确定',
//           //   type: 'warning',
//           //   callback: () => {
//           //     // 2.重定向到登陆页
//           //     router.replace(LOGIN_URL);
//           //   }
//           // });
//           break;

//         default:
//           eventBus.emit(`socket.${res.channel}`, res.data);
//       }
//       console.log('接收到的消息：', res);
//     } catch (e) {
//       /* empty */
//     }
//   };

//   const _onError = (event: Event) => {
//     eventBus.emit('socket.error', event);
//   };

//   const _onClose = () => {
//     socket.value = null;
//     if (canReconnect.value) {
//       handleReconnect();
//     }
//   };

//   const handleReconnect = () => {
//     let timeout;
//     if (reconnectCount.value < MAX_RECONNECT_COUNT) {
//       timeout = Math.min(10000 * Math.pow(2, reconnectCount.value), 30000); // 指数退避算法
//     } else {
//       timeout = 60000; // 超过最大次数次后，每分钟重试一次
//     }
//     setTimeout(() => {
//       reconnectCount.value++;
//       open();
//     }, timeout);
//   };

//   /**
//    * 初始化开启socket
//    */
//   const open = () => {
//     if (!useSocket) return;
//     if (socket.value) return;
//     const userStore = useUserStore();
//     // 建立WebSocket连接
//     const webSocket = new WebSocket(socketUrl, [userStore.token]);
//     const { status, data, send, open, close } = useWebSocket(socketUrl, {
//       autoReconnect: {
//         retries: 2,
//         delay: 1000,
//         onFailed() {
//           Message.error('连接失败,请去GrasscuttersWebDashboard查看处理方法')
//           localStorage.removeItem("WSS")
//         },
//       },
//       // 监听WebSocket事件
//       webSocket.onopen = _onOpen;
//       webSocket.onmessage = _onMessage;
//       webSocket.onerror = _onError;
//       webSocket.onclose = _onClose;

//       // 连接时处理
//       socket.value = webSocket;
//     };

//     /**
//      * 关闭socket
//      */
//     const close = () => {
//       if (!useSocket) return;
//       if (!socket.value) return;
//       canReconnect.value = false;
//       reconnectCount.value = 0;
//       socket.value.close();
//       socket.value = null;
//     };

//     const send = (data: any, channel: string = CHANNEL_DEFAULT) => {
//       if (!socket.value || socket.value.readyState !== 1) return;
//       if (typeof data !== 'object') {
//         data = { data };
//       }
//       const msgData = {
//         channel,
//         data
//       };
//       socket.value.send(JSON.stringify(msgData));
//     };

//     return {
//       open,
//       send,
//       close
//     };
//   });

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { handleException } from './exception' // Assuming this path is correct

export const useHomeStore = defineStore('home', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const searchDialogShow = ref(false)

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getSearchDialogShow = computed(() => searchDialogShow.value)

  // Actions converted to regular functions
  const setSearchDialogShow = (show: boolean) => {
    searchDialogShow.value = show
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    searchDialogShow,

    getSuccess,
    getErrMessage,
    getSearchDialogShow,

    setSearchDialogShow,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'
import type * as Deposit from '@/interface/deposit'
import { handleException } from './exception' // Assuming this path is correct

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

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
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

  // user deposit configuration
  const dispatchUserDepositCfg = async () => {
    setSuccess(false)
    const route: string = NETWORK.DEPOSIT_PAGE.DEPOSIT_CONFIG
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
    const route: string = NETWORK.DEPOSIT_PAGE.DEPOSIT_SUBMIT
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
    const route: string = NETWORK.DEPOSIT_PAGE.DEPOSIT_HISTORY
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
    success,
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

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { handleException } from './exception' // Assuming this path is correct
import type * as Promo from '@/interface/promo' // Assuming this path is correct
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'

export const usePromoStore = defineStore('promo', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const userActivityList = ref<Promo.PromoGroupData>({
    group_data: [
      {
        group_id: 0,
        group_name: '',
        list_data: [],
      },
    ],
  })

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getUserActivityList = computed(() => userActivityList.value)

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setUserActivityList = (activityList: any) => {
    // Keeping 'any' type as in original
    userActivityList.value = activityList
  }

  // user activity list api
  const dispatchUserActivityList = async () => {
    setSuccess(false)
    const route: string = NETWORK.ACTIVITY.USER_ACTIVITY_LIST
    const network: Network = Network.getInstance()

    const next = (response: any) => {
      // Note: response type is 'any' in original
      if (response.code == 200) {
        setSuccess(true)
        setUserActivityList(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    userActivityList,

    getSuccess,
    getErrMessage,
    getUserActivityList,

    setSuccess,
    setErrorMessage,
    setUserActivityList,
    dispatchUserActivityList,
  }
})

// src/stores/notificationStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Define the structure of a notification
export interface Notification {
  id: number // Use timestamp or a more robust UUID in production
  message: string
  type: 'info' | 'success' | 'warning' | 'error' // Optional type for styling
  duration: number // Duration in milliseconds
}

export const useNotificationStore = defineStore('notifications', () => {
  // State: Array to hold active notifications
  const notifications = ref<Notification[]>([])

  // Getters (optional, but good practice)
  const activeNotifications = computed(() => notifications.value)

  // Actions
  function addNotification(
    message: string,
    type: Notification['type'] = 'info', // Default type
    duration: number = 5000, // Default duration 5 seconds
  ) {
    const newNotification: Notification = {
      id: Date.now(), // Simple unique ID
      message,
      type,
      duration,
    }

    notifications.value.push(newNotification)

    // Automatically remove the notification after its duration
    setTimeout(() => {
      removeNotification(newNotification.id)
    }, duration)
  }

  function removeNotification(id: number) {
    notifications.value = notifications.value.filter((notification) => notification.id !== id)
  }

  return {
    notifications, // Expose raw state if needed directly
    activeNotifications,
    addNotification,
    removeNotification,
  }
})
import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { handleException } from './exception' // Assuming this path is correct

export const useAboutStore = defineStore('about_us', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const activeAboutIndex = ref(0)

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getActiveAboutIndex = computed(() => activeAboutIndex.value)

  // Actions converted to regular functions
  const setActiveAboutIndex = (index: number) => {
    activeAboutIndex.value = index
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    activeAboutIndex,

    getSuccess,
    getErrMessage,
    getActiveAboutIndex,

    setActiveAboutIndex,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { type GetMailData } from '@/interface/mail' // Assuming this path is correct
import { handleException } from './exception' // Assuming this path is correct

export const useMailStore = defineStore('mail', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const mailList = ref<GetMailData[]>([
    {
      id: 1,
      icon: new URL('@/assets/public/svg/icon_public_14.svg', import.meta.url).href,
      offset: 0,
      mail_content_1: {
        color: 'text-color-white text-500-12',
        content: 'Subscribe to notifications',
      },
      mail_content_2: {
        color: 'text-color-gray text-500-10',
        content: 'Enable push notifications to receive exclusive bonuses!',
      },
      mail_rail_1: {
        color: '',
        content: '',
      },
      mail_rail_2: {
        color: '',
        content: '',
      },
    },
    {
      id: 2,
      icon: new URL('@/assets/public/svg/icon_public_15.svg', import.meta.url).href,
      offset: 0,
      mail_content_1: {
        color: 'text-color-white text-500-12',
        content: 'Refer a friend',
      },
      mail_content_2: {
        color: 'text-color-gray text-500-10',
        content: 'lnvite Friends, Earn $10 Per lnvite',
      },
      mail_rail_1: {
        color: '',
        content: '',
      },
      mail_rail_2: {
        color: '',
        content: '',
      },
    },
  ])
  const mailMenuShow = ref(false)
  const mobileMenuMailToggle = ref(false)

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getMailList = computed(() => mailList.value)
  const getMailMenuShow = computed(() => mailMenuShow.value)
  const getMobileMenuMailToggle = computed(() => mobileMenuMailToggle.value)

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setMailList = (mailItem: GetMailData) => {
    mailList.value.unshift(mailItem)
  }

  const setMailMenuShow = (show: boolean) => {
    mailMenuShow.value = show
  }

  const setMobileMenuMailToggle = (toggle: boolean) => {
    mobileMenuMailToggle.value = toggle
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    mailList,
    mailMenuShow,
    mobileMenuMailToggle,

    getSuccess,
    getErrMessage,
    getMailList,
    getMailMenuShow,
    getMobileMenuMailToggle,

    setSuccess,
    setErrorMessage,
    setMailList,
    setMailMenuShow,
    setMobileMenuMailToggle,
  }
})

import { hydrateStores, store } from '@/stores'
import { setToken as _setToken, getToken, removeToken } from '@/utils/cache/cookies'
import Cookies from 'js-cookie'
// import { useLoading } from '@/composables/useLoading'
import type * as SignIn from '@/interface/signin'
// import type * as SignUp from '@/interface/signup'
// import type * as User from "@/interface/user";
import { authController } from '../sdk/authModule'
import { useNotificationStore } from './notifications'
import { handleException } from './exception'

// import { useSocketStore } from './socket'
// import type { IUser } from '@/sdk/_types/src/prisma/types'
// import { useCashflowStore } from './cashflow.store'
// import { User } from '@/types/user'
// import { Network } from '@/libs/cashflowClient'
// import { NETWORK } from '@/utils/socket/NetworkCfg'
// import { CashflowRequestName } from '@/libs/cashflowClient/client/types'
// import { SENDTYPE } from '@/libs/cashflowClient/NetCfg'
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'
import { User } from '@/types/user'
import { GetUserBalance, GetUserBalanceResponseData } from '@/interface/user'
const expScale = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000]
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>(getToken() || '')
    const currentUser = ref<User>()
    const isAuthenticated = ref<boolean>(false)
    const roles = ref<string[]>([])
    const success = ref<boolean>(false)
    const errMessage = ref<string>('')
    const userBalance = ref<GetUserBalance>()

    const percentOfVipLevel = computed(() => {
      if (currentUser.value === undefined) return 0
      const nextXpLevel = expScale[currentUser.value.vipRankLevel as number]
      console.log(nextXpLevel)
      console.log(currentUser.value.vipPoints / nextXpLevel)
      return (15 / nextXpLevel) * 100
    })
    const setUserBalance = (_userBalance: GetUserBalance) => {
      console.log('金额', userBalance)
      userBalance.value = _userBalance
    }
    const getUserBalance = () => {
      return userBalance
    }
    const setToken = (value: string) => {
      _setToken(value)
      token.value = value
    }
    const setSuccess = (value: boolean) => {
      success.value = value
    }
    const setErrorMessage = (value: string) => {
      errMessage.value = value
    }
    const updateInfo = async () => {
      const result = await api.userControllerFindCurerentUser.send()
      const data = result.data
      if (data === null) return false
      console.log(data)
      currentUser.value = data
      // roles.value = data.activeProfile.roles
      return data
    }
    const updateCurrentUserBalance = (balanceUpdate: any | number) => {
      console.log(balanceUpdate)
      if (currentUser.value == undefined) return
      // currentUser.value = userInfo
      if (typeof balanceUpdate !== 'number') {
        if (balanceUpdate.new_balance) {
          currentUser.value.balance = balanceUpdate.new_balance
        }
      }
      if (typeof balanceUpdate === 'number') {
        currentUser.value.balance = balanceUpdate
      }
    }
    const setUserInfo = (userInfo: User) => {
      currentUser.value = userInfo
    }

    const setUserGameStat = (stat: string, value: number) => {
      //@ts-ignore
      currentUser.value[stat] = value
      //@ts-ignore
      console.log(currentUser.value[stat])
      // }
    }
    const changeRoles = (role: string) => {
      const newToken = `token-${role}`
      token.value = newToken
      _setToken(newToken)
      location.reload()
    }

    const resetToken = () => {
      removeToken()
      token.value = ''
      roles.value = []
    }
    const register = async (username: string, password: string): Promise<boolean> => {
      console.log(username)
      const avatar = '11'
      const shopId = 'house'
      const result = await authController.register(
        {},
        {
          username,
          password,
          avatar,
          shopId,
        },
      )
      console.log(result)
      console.log(result.token.token)
      if (result.code !== 0) return false
      if (result.data === null) return false
      setToken(result.token.token)
      Cookies.set('laravel_session', result.token.token)
      localStorage.setItem('access_token', result.token.token)
      const hydrated = await hydrateStores()
      console.log(hydrated)
      localStorage.setItem('isAuthenticated', 'true')
      isAuthenticated.value = hydrated
      const ablyToken = result.ablyToken
      localStorage.set('ably-token', ablyToken)
      return hydrated
    }

    const login = async (name: string, password: string): Promise<boolean> => {
      // const { stopLoading } = useLoading()
      // const cashflowStore = useCashflowStore()
      // const socketStore = useSocketStore()
      // const notificationStore = useNotificationStore()
      // // const result = await authController.login({}, { username: name, password })
      // await cashflowStore.connect(name, password)
      // if (result.status === 401) {
      //   notificationStore.addNotification('Invalid credentials', 'error')
      //   return false
      // }
      // if (typeof result.access_token !== 'string') return false
      // setToken(result.access_token)
      // Cookies.set('laravel_session', result.access_token)
      // localStorage.setItem('access_token', result.access_token)
      // const hydrated = await hydrateStores()
      // localStorage.setItem('isAuthenticated', hydrated.toString())
      // isAuthenticated.value = hydrated
      // socketStore.dispatchSocketConnect()
      // console.log('user hydrated ? ', hydrated)
      // setTimeout(() => {
      //   console.log('delaying 5k to watch loading')
      //   router.push('/home')
      //   stopLoading()
      // }, 5000)
      return true
    }
    // async dispatchSetUserCurrency(currency:string) {
    const dispatchSetUserCurrency = async (currency: string) => {
      // this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.SET_USER_CURRENCY
      const network: Network = Network.getInstance()
      // response call back function
      const next = (response: any) => {
        if (response.code == 200) {
          setSuccess(true)
        } else {
          setErrorMessage(handleException(response.code))
        }
      }
      await network.sendMsg(route, { currency_type: currency }, next, 1)
    }
    const dispatchUserBalance = async () => {
      setSuccess(false)
      const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_BALANCE
      const network: Network = Network.getInstance()
      // response call back function
      const next = (response: GetUserBalanceResponseData) => {
        if (response.code == 200) {
          setSuccess(true)
          setUserBalance(response.data)
        } else {
          setErrorMessage(handleException(response.code))
        }
      }
      await network.sendMsg(route, {}, next, 1, 4)
    }
    const login2 = async (msg: SignIn.SigninRequestData) => {
      const notificationStore = useNotificationStore()
      setSuccess(false)
      const route: string = NETWORK.LOGIN.LOGIN
      const network: Network = Network.getInstance()

      // response call back function
      console.log(route)
      console.log(msg)
      const next = (response: SignIn.GetSigninResponseData) => {
        console.log(response)
        if (response.code == 200) {
          Cookies.set('laravel_session', response.token)
          Cookies.set('token', response.token)
          setToken(response.token)
          setUserInfo(response.user)
          setSuccess(true)
        } else {
          console.log(response.code)
          notificationStore.addNotification(handleException(response.code), 'error')
          setErrorMessage(handleException(response.code))
        }
      }
      await network.sendMsg(route, msg, next, 2)
    }
    const dispatchSignout = async (): Promise<void> => {
      removeToken()
    }

    return {
      dispatchSignout,
      currentUser,
      setUserGameStat,
      dispatchUserBalance,
      token,
      updateCurrentUserBalance,
      roles,
      setUserInfo,
      register,
      getUserBalance,
      dispatchSetUserCurrency,
      login,
      // username,
      login2,
      setToken,
      updateInfo,
      percentOfVipLevel,
      changeRoles,
      resetToken,
      isAuthenticated,
    }
  },
  {
    persist: true,
  },
)

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useUserStoreOutside() {
  return useUserStore(store)
}

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'
import type * as Currency from '@/interface/currency'
import { handleException } from './exception'

export const useCurrencyStore = defineStore('useCurrencyStore', () => {
  const success = ref(false)
  const errMessage = ref('')
  const currencyList = ref<Array<Currency.GetCurrencyBalanceList>>([])

  const getCurrencyList = computed(() => currencyList.value)

  const dispatchCurrencyList = async () => {
    success.value = false
    const route: string = NETWORK.Currency.CURRENCY_LIST
    const network: Network = Network.getInstance()

    // response call back function
    const next = (response: Currency.GetCurrencyBalanceListResponse) => {
      if (response.code == 200) {
        success.value = true
        currencyList.value = response.data
      } else {
        errMessage.value = handleException(response.code)
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  return {
    success,
    errMessage,
    currencyList,
    getCurrencyList,
    dispatchCurrencyList,
  }
})
import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'
import * as Bonus from '@/interface/bonus'
import { handleException } from './exception' // Assuming this path is correct

export const useBonusStore = defineStore('bonus', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const bonusList = ref<Bonus.GetBonusList>({
    list: [],
  })

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getBonusList = computed(() => bonusList.value)

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setBonusList = (list: Bonus.GetBonusList) => {
    bonusList.value = list
  }

  // user bonus
  const dispatchUserBonus = async () => {
    setSuccess(false)
    const route: string = NETWORK.BONUS_PAGE.USER_BONUS
    const network: Network = Network.getInstance()

    const next = (response: Bonus.GetUserBonusResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setBonusList(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  // bonus cancel
  const dispatchBonusCancel = async (data: any) => {
    setSuccess(false)
    const route: string = NETWORK.BONUS_PAGE.BONUS_CANCEL
    const network: Network = Network.getInstance()

    const next = (response: any) => {
      // Note: response type is 'any' in original
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    bonusList,

    getSuccess,
    getErrMessage,
    getBonusList,

    setSuccess,
    setErrorMessage,
    setBonusList,
    dispatchUserBonus,
    dispatchBonusCancel,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
// import { over } from 'lodash-es'; // Removed lodash import as it wasn't used in the original logic

export const useAppBarStore = defineStore('appBar', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const rightBarToggle = ref(false)
  const navBarToggle = ref(true)
  const cashDialogToggle = ref(false)
  const depositDialogToggle = ref(false)
  const withdrawDialogToggle = ref(false)
  const userNavBarToggle = ref(false)
  const mainBlurEffectShow = ref(false)
  const overlayScrimShow = ref(false)
  const accountDialogShow = ref(false)
  const depositBlurEffectShow = ref(false)
  const fixPositionEnable = ref(false)
  const headerBlurEffectShow = ref(false)
  const menuBlurEffectShow = ref(false)
  const depositHeaderBlurEffectShow = ref(false)
  const depositWithdrawToggle = ref(false)
  const bonusDashboardDialogVisible = ref(false)
  const activeAccountIndex = ref(0)

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getRightBarToggle = computed(() => rightBarToggle.value)
  const getNavBarToggle = computed(() => navBarToggle.value)
  const getDepositDialogToggle = computed(() => depositDialogToggle.value)
  const getWithdrawDialogToggle = computed(() => withdrawDialogToggle.value)
  const getCashDialogToggle = computed(() => cashDialogToggle.value)
  const getUserNavBarToggle = computed(() => userNavBarToggle.value)
  const getMainBlurEffectShow = computed(() => mainBlurEffectShow.value)
  const getOverlayScrimShow = computed(() => overlayScrimShow.value)
  const getAccountDialogShow = computed(() => accountDialogShow.value)
  const getDepositBlurEffectShow = computed(() => depositBlurEffectShow.value)
  const getFixPositionEnable = computed(() => fixPositionEnable.value)
  const getHeaderBlurEffectShow = computed(() => headerBlurEffectShow.value)
  const getMenuBlurEffectShow = computed(() => menuBlurEffectShow.value)
  const getDepositHeaderBlurEffectShow = computed(() => depositHeaderBlurEffectShow.value)
  const getDepositWithdrawToggle = computed(() => depositWithdrawToggle.value)
  const getBonusDashboardDialogVisible = computed(() => bonusDashboardDialogVisible.value)
  const getActiveAccountIndex = computed(() => activeAccountIndex.value)

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setRightBarToggle = (toggle: boolean) => {
    rightBarToggle.value = toggle
  }

  const setNavBarToggle = (toggle: boolean) => {
    navBarToggle.value = toggle
  }

  const setDepositDialogToggle = (toggle: boolean) => {
    console.log('rrrrrrrrrrrrrrrrrrrrrrrr', toggle) // Keeping original console log
    depositDialogToggle.value = toggle
  }

  const setWithdrawDialogToggle = (toggle: boolean) => {
    withdrawDialogToggle.value = toggle
  }

  const setCashDialogToggle = (toggle: boolean) => {
    cashDialogToggle.value = toggle
  }

  const setUserNavBarToggle = (toggle: boolean) => {
    userNavBarToggle.value = toggle
  }

  const setMainBlurEffectShow = (show: boolean) => {
    mainBlurEffectShow.value = show
  }

  const setOverlayScrimShow = (show: boolean) => {
    overlayScrimShow.value = show
  }

  const setAccountDialogShow = (show: boolean) => {
    accountDialogShow.value = show
  }

  const setDepositBlurEffectShow = (show: boolean) => {
    depositBlurEffectShow.value = show
  }

  const setFixPositionEnable = (enable: boolean) => {
    fixPositionEnable.value = enable
  }

  const setHeaderBlurEffectShow = (show: boolean) => {
    headerBlurEffectShow.value = show
  }

  const setMenuBlurEffectShow = (show: boolean) => {
    menuBlurEffectShow.value = show
  }

  const setDepositHeaderBlurEffectShow = (show: boolean) => {
    depositHeaderBlurEffectShow.value = show
  }

  const setDepositWithdrawToggle = (toggle: boolean) => {
    depositWithdrawToggle.value = toggle
  }

  const setBonusDashboardDialogVisible = (visible: boolean) => {
    bonusDashboardDialogVisible.value = visible
  }

  const setActiveAccountIndex = (index: number) => {
    activeAccountIndex.value = index
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    rightBarToggle,
    navBarToggle,
    cashDialogToggle,
    depositDialogToggle,
    withdrawDialogToggle,
    userNavBarToggle,
    mainBlurEffectShow,
    overlayScrimShow,
    accountDialogShow,
    depositBlurEffectShow,
    fixPositionEnable,
    headerBlurEffectShow,
    menuBlurEffectShow,
    depositHeaderBlurEffectShow,
    depositWithdrawToggle,
    bonusDashboardDialogVisible,
    activeAccountIndex,

    getSuccess,
    getErrMessage,
    getRightBarToggle,
    getNavBarToggle,
    getDepositDialogToggle,
    getWithdrawDialogToggle,
    getCashDialogToggle,
    getUserNavBarToggle,
    getMainBlurEffectShow,
    getOverlayScrimShow,
    getAccountDialogShow,
    getDepositBlurEffectShow,
    getFixPositionEnable,
    getHeaderBlurEffectShow,
    getMenuBlurEffectShow,
    getDepositHeaderBlurEffectShow,
    getDepositWithdrawToggle,
    getBonusDashboardDialogVisible,
    getActiveAccountIndex,

    setSuccess,
    setErrorMessage,
    setRightBarToggle,
    setNavBarToggle,
    setDepositDialogToggle,
    setWithdrawDialogToggle,
    setCashDialogToggle,
    setUserNavBarToggle,
    setMainBlurEffectShow,
    setOverlayScrimShow,
    setAccountDialogShow,
    setDepositBlurEffectShow,
    setFixPositionEnable,
    setHeaderBlurEffectShow,
    setMenuBlurEffectShow,
    setDepositHeaderBlurEffectShow,
    setDepositWithdrawToggle,
    setBonusDashboardDialogVisible,
    setActiveAccountIndex,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'
import type * as Banner from '@/interface/banner'
import { handleException } from './exception' // Assuming this path is correct

export const useBannerStore = defineStore('banner', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const bannerList = ref<Array<Banner.GetBannerList>>([])

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getBannerList = computed(() => bannerList.value)

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setBannerList = (list: Array<Banner.GetBannerList>) => {
    bannerList.value = list
  }

  const dispatchBannerList = async () => {
    setSuccess(false)
    const route: string = NETWORK.Banner.BANNER_LIST
    const network: Network = Network.getInstance()

    const next = (response: Banner.GetBannerListResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setBannerList(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    bannerList,

    getSuccess,
    getErrMessage,
    getBannerList,

    setSuccess,
    setErrorMessage,
    setBannerList,
    dispatchBannerList,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { handleException } from './exception' // Assuming this path is correct
import { type TransactionHistoryResponse } from '@/interface/transaction'
import type * as Transaction from '@/interface/transaction'
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'

export const useBonusTransactionStore = defineStore('bonusTransaction', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const bonusTabIndex = ref(0)
  const transactionTab = ref('')
  const transactionHistoryItem = ref<TransactionHistoryResponse>({
    total_pages: 0,
    record: [],
  })
  const moreTransactionHistoryFlag = ref(true)

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getBonusTabIndex = computed(() => bonusTabIndex.value)
  const getTransactionTab = computed(() => transactionTab.value)
  const getTransactionHistoryItem = computed(() => transactionHistoryItem.value)
  const getMoreTransactionHistoryFlag = computed(() => moreTransactionHistoryFlag.value)

  // Actions converted to regular functions
  const setBonusTabIndex = (index: number) => {
    bonusTabIndex.value = index
  }

  const setTransactionTab = (tab: string) => {
    console.log(tab) // Keeping original console log
    transactionTab.value = tab
  }

  const setTransactionHistoryItem = (item: TransactionHistoryResponse) => {
    if (item.record.length == 0) {
      moreTransactionHistoryFlag.value = false
    } else {
      // Concatenate records
      transactionHistoryItem.value.record = [...transactionHistoryItem.value.record, ...item.record]
      transactionHistoryItem.value.total_pages = item.total_pages
      moreTransactionHistoryFlag.value = true
    }
  }

  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  // transaction history api response
  const dispatchTransactionHistory = async (data: any) => {
    setSuccess(false)
    const route: string = NETWORK.TRANSACTION_PAGE.TRANSACTION_HISTORY
    const network: Network = Network.getInstance()

    const next = (response: Transaction.GetTransactionHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setTransactionHistoryItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    bonusTabIndex,
    transactionTab,
    transactionHistoryItem,
    moreTransactionHistoryFlag,

    getSuccess,
    getErrMessage,
    getBonusTabIndex,
    getTransactionTab,
    getTransactionHistoryItem,
    getMoreTransactionHistoryFlag,

    setBonusTabIndex,
    setTransactionTab,
    setTransactionHistoryItem,
    setSuccess,
    setErrorMessage,
    dispatchTransactionHistory,
  }
})
s

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { handleException } from './exception' // Assuming this path is correct

export const useAgentStore = defineStore('agent', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const agentNavBarToggle = ref(false)

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getAgentNavBarToggle = computed(() => agentNavBarToggle.value)

  // Actions converted to regular functions
  const setAgentNavBarToggle = (toggle: boolean) => {
    agentNavBarToggle.value = toggle
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    agentNavBarToggle,

    getSuccess,
    getErrMessage,
    getAgentNavBarToggle,

    setAgentNavBarToggle,
  }
})

import { useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import Timestamp from 'timestamp-nano'
import { v4 as uuidv4 } from 'uuid'
// import { useCookies } from '@vueuse/integrations/useCookies'

import { computed, ref, watch } from 'vue'
import { DefaultCashflowClientOptions } from '@/libs/cashflowClient/client/CashflowClient'
import { CashflowInfo, CashflowAction, CashflowViewer } from '@/libs/cashflowClient/client/types'
import { useCashflow } from '@/libs/cashflowClient/vue'

export const useCashflowStore = defineStore('streamerbot', () => {
  const MAX_LOGS_LENGTH = 1000

  // Configuration (LocalStorage)
  const host = useStorage('sb:toolkit:host', () => DefaultCashflowClientOptions.host)
  const token = useStorage('sb:toolkit:token', () => DefaultCashflowClientOptions.password)
  const password = useStorage('sb:toolkit:password', () => DefaultCashflowClientOptions.password)
  const port = useStorage('sb:toolkit:port', () => DefaultCashflowClientOptions.port)
  const endpoint = useStorage('sb:toolkit:endpoint', () => DefaultCashflowClientOptions.endpoint)
  const isNewConnection = useStorage('sb:toolkit:new', () => true)
  // if (token.value == null || !token) token.value = null
  // if (password.value == null) password.value = null
  console.log(token.value)
  const settings = computed(() => ({
    host: host.value,
    port: port.value,
    endpoint: endpoint.value,
    token: token.value,
    password: password.value,
    immediate: !isNewConnection.value,
    subscribe: '*' as any,
    onConnect,
  }))

  // Client Connection State
  const { client, error, status, connect: _connect, data } = useCashflow(settings)
  const isConnected = computed(() => status.value === 'OPEN')
  const isConnecting = computed(() => status.value === 'CONNECTING')

  // Client Data
  const instance = useStorage<Partial<CashflowInfo>>(
    'sb:toolkit:instance',
    {
      instanceId: undefined,
      name: undefined,
      os: undefined,
      version: undefined,
    },
    localStorage,
    { mergeDefaults: true },
  )
  const connect = async function (username: string, password: string) {
    // const { get, getAll, set, remove, addChangeListener, removeChangeListener } = useCookies(
    //   ['cookie-name'],
    //   {
    //     doNotParse: false,
    //     autoUpdateDependencies: false,
    //   },
    // )

    console.log(username, password)

    const response = await fetch(`http://localhost:3001/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    const data = await response.json()

    if (data.error > 400) {
      return
    }
    if (!data.token || data.token == null) {
      return
    }
    const x = data.token
    console.log(x)
    localStorage.setItem('sb:toolkit:token', x)
    const t = localStorage.getItem('sb:toolkit:token')
    // set('token', data.token)
    settings.value.token = t as string
    console.log(settings.value.token)
    _connect()
  }

  const actions = useStorage<Array<CashflowAction>>('sb:toolkit:actions', [])
  const variables = ref<Array<unknown>>()
  const activeViewers = ref<Array<CashflowViewer>>()
  // const broadcaster = useStorage<Partial<GetBroadcasterResponse>>(
  //   'sb:toolkit:broadcaster',
  //   {
  //     platforms: undefined,
  //     connected: [],
  //     disconnected: [],
  //   },
  //   localStorage,
  //   { mergeDefaults: true },
  // )
  const broadcasterAvatar = useStorage<string | null>('sb:toolkit:avatar', null)

  // Logger Data
  const logs = useStorage<
    Array<{
      id: string
      title: string
      timeStamp: string
      event: {
        source: string
        type: string
      }
      data: any
      raw: any
    }>
  >('sb:toolkit:logs:v2', [])

  async function onConnect(data: CashflowInfo) {
    // save instance info
    instance.value = data && data.instanceId ? data : instance.value

    // load data
    actions.value = (await client.value?.getActions())?.actions ?? []
    // broadcaster.value = await client.value?.getBroadcaster()

    // toggle flag to reconnect next time automatically
    isNewConnection.value = false

    // attach listeners to update actions on change
    client.value?.on('Application.*', async () => {
      actions.value = (await client.value?.getActions())?.actions ?? []
    })
  }

  async function fetchActions() {
    actions.value = (await client.value?.getActions())?.actions ?? []
  }

  async function fetchActiveViewers() {
    activeViewers.value = (await client.value?.getActiveViewers())?.viewers
  }

  async function fetchAvatar(username: string = '') {
    if (!username || broadcasterAvatar.value) return
    const res = await fetch(`https://decapi.me/twitch/avatar/${username}`, {
      mode: 'cors',
      credentials: 'omit',
    })
    broadcasterAvatar.value = await res.text()
    return broadcasterAvatar.value
  }

  function clearLogs(options: { type?: string } = {}) {
    if (options?.type) {
      logs.value = logs.value.filter((log: any) => log.event.type !== options.type)
    } else {
      logs.value = []
    }
  }

  // watch(broadcaster, () => {
  //   fetchAvatar(broadcaster.value?.platforms?.twitch?.broadcastUserName)
  // })

  watch(data, (val: any) => {
    if (val?.event) {
      // normalize timestamp
      val._time = Timestamp.fromDate(new Date()).addNano(performance.now()).toJSON()

      // add our own unique id and title for indexing/searching
      val.id = val.id ?? uuidv4()

      // add custom string for search text
      val._search = `${val.event.source} - ${val.event.type}`

      logs.value.push(val)
    }

    if (logs.value?.length > MAX_LOGS_LENGTH) {
      logs.value.slice(-MAX_LOGS_LENGTH)
    }
  })

  return {
    status,
    host,
    port,
    token,
    endpoint,
    isNewConnection,
    client,
    connect,
    error,
    isConnected,
    isConnecting,
    instance,
    actions,
    variables,
    activeViewers,
    // broadcaster,
    broadcasterAvatar,
    logs,
    fetchActions,
    fetchActiveViewers,
    fetchAvatar,
    clearLogs,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCashflowStore, import.meta.hot))
}

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { handleException } from './exception' // Assuming this path is correct

export const useMenuStore = defineStore('mobile_menu', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const selectedItem = ref('Promo')
  const semiCircleShow = ref(false)
  const rewardNavShow = ref(false)

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getSelectedItem = computed(() => selectedItem.value)
  const getSemiCircleShow = computed(() => semiCircleShow.value)
  const getRewardNavShow = computed(() => rewardNavShow.value)

  // Actions converted to regular functions
  const setSelectedItem = (item: string) => {
    selectedItem.value = item
  }

  const setSemiCircleShow = (show: boolean) => {
    semiCircleShow.value = show
  }

  const setRewardNavShow = (show: boolean) => {
    rewardNavShow.value = show
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    selectedItem,
    semiCircleShow,
    rewardNavShow,

    getSuccess,
    getErrMessage,
    getSelectedItem,
    getSemiCircleShow,
    getRewardNavShow,

    setSelectedItem,
    setSemiCircleShow,
    setRewardNavShow,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import type * as Vip from '@/interface/vip'
// import { i18n } from '@/locale/index' // Assuming this path is correct and i18n is initialized
import { Network } from '@/net/Network'
import { NETWORK } from '@/net/NetworkCfg'
// import * as Toast from "vue-toastification/dist/index.mjs"; // Replaced with Nuxt UI useToast if applicable
import { handleException } from './exception' // Assuming this path is correct

// Assuming SuccessIcon and WarningIcon are available or replaced by Nuxt UI icons
// import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
// import WarningIcon from "@/components/global/notification/WarningIcon.vue";

// If using Nuxt UI Pro, you would use:
// import { useI18n } from 'vue-i18n'
// const toast = useToast();

export const useVipStore = defineStore('vip', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const levelUpDialogVisible = ref(false)
  const vipInfo = ref<Vip.VipInfo>({} as Vip.VipInfo) // Keeping type assertion as in original
  const vipLevels = ref<Array<Vip.VipLevel>>([])
  const vipTasks = ref<Array<Vip.VipTaskItem>>([])
  const vipRebateHistory = ref<Vip.VipRebateHistoryData>({
    total: 0,
    list: [],
  })
  const vipLevelRewardHistory = ref<Vip.VipLevelRewardHistoryData>({
    total: 0,
    list: [],
  })
  const vipTimesHistory = ref<Vip.VipTimesHistoryData>({
    total: 0,
    list: [],
  })
  const vipSignIn = ref<Vip.VipSignInData>({
    award: [],
    signin_day: 0,
    is_signin: 0,
    limited_bet: 0,
    limited_deposit: 0,
    vip_level: 0,
  })
  const vipLevelUpList = ref<Vip.VipLevelUpListData>({} as Vip.VipLevelUpListData) // Keeping type assertion as in original
  const vipLevelUpReceive = ref<Vip.VipLevelUpReceiveData>({} as Vip.VipLevelUpReceiveData) // Keeping type assertion as in original
  const vipNavBarToggle = ref(localStorage.getItem('vipBar') || '') // Initialize from localStorage
  const vipCycleawardList = ref<Vip.VipCycleawardListData>({} as Vip.VipCycleawardListData) // Keeping type assertion as in original
  const vipLevelAward = ref<Vip.VipLevelAwardData>({} as Vip.VipLevelAwardData) // Keeping type assertion as in original
  const vipBetawardList = ref<Vip.vipBetawardListData>({} as Vip.vipBetawardListData) // Keeping type assertion as in original

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getVipInfo = computed(() => vipInfo.value)
  const getVipLevels = computed(() => vipLevels.value)
  const getVipTasks = computed(() => vipTasks.value)
  const getVipRebateHistory = computed(() => vipRebateHistory.value)
  const getVipLevelRewardHistory = computed(() => vipLevelRewardHistory.value)
  const getVipTimesHistory = computed(() => vipTimesHistory.value)
  const getVipSignIn = computed(() => vipSignIn.value)
  const getLevelUpDialogVisible = computed(() => levelUpDialogVisible.value)
  const getVipLevelUpList = computed(() => vipLevelUpList.value)
  const getVipLevelUpReceive = computed(() => vipLevelUpReceive.value)
  const getVipNavBarToggle = computed(() => vipNavBarToggle.value)
  const getVipCycleawardList = computed(() => vipCycleawardList.value)
  const getVipLevelAward = computed(() => vipLevelAward.value)
  const getVipBetawardList = computed(() => vipBetawardList.value)

  // const { t } = useI18n()

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setVipInfo = (info: Vip.VipInfo) => {
    vipInfo.value = info
  }

  const setVipLevels = (levels: Array<Vip.VipLevel>) => {
    vipLevels.value = levels
  }

  const setVipTasks = (tasks: Array<Vip.VipTaskItem>) => {
    vipTasks.value = tasks
  }

  const setVipRebateHistory = (history: Vip.VipRebateHistoryData) => {
    vipRebateHistory.value = history
  }

  const setVipLevelRewardHistory = (history: Vip.VipLevelRewardHistoryData) => {
    vipLevelRewardHistory.value = history
  }

  const setVipTimesHistory = (history: Vip.VipTimesHistoryData) => {
    vipTimesHistory.value = history
  }

  const setVipSignIn = (signInData: Vip.VipSignInData) => {
    vipSignIn.value = signInData
  }

  const setLevelUpDialogVisible = (visible: boolean) => {
    levelUpDialogVisible.value = visible
  }

  const setVipLevelUpList = (list: Vip.VipLevelUpListData) => {
    vipLevelUpList.value = list
  }

  const setVipLevelUpReceive = (receiveData: Vip.VipLevelUpReceiveData) => {
    vipLevelUpReceive.value = receiveData
  }

  const setVipNavBarToggle = (toggle: string) => {
    vipNavBarToggle.value = toggle
    localStorage.setItem('vipBar', toggle) // Update localStorage
  }

  // Storing periodic rewards  存储周期性奖励
  const setVipCycleawardList = (list: Vip.VipCycleawardListData) => {
    vipCycleawardList.value = list
  }

  // Storage level related rewards  存储等级相关奖励
  const setVipLevelAward = (awardData: Vip.VipLevelAwardData) => {
    vipLevelAward.value = awardData
  }

  // Storage coding rebate  存储打码返利
  const setVipBetawardList = (list: Vip.vipBetawardListData) => {
    vipBetawardList.value = list
  }

  // Reward collection prompt information  奖励领取提示信息
  const alertMessage = (successMessage: Vip.SuccessMessageParams, message?: string) => {
    // If using Nuxt UI Pro, uncomment and use toast:
    // toast.add({
    //     title: successMessage.message,
    //     icon: successMessage.type == 1 ? 'i-heroicons-check-circle' : 'i-heroicons-exclamation-circle', // Example icons
    //     color: successMessage.type == 1 ? 'green' : 'red',
    //     timeout: 3000,
    // });
    // Otherwise, implement your custom notification logic here
    const text = message || successMessage.message
    console.log('Alert Message:', text, 'Type:', successMessage.type) // Placeholder
  }

  // Get VIP check-in content
  async function dispatchVipSignIn() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_SIGNIN
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipSignInResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipSignIn(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  async function dispatchVipSigninawardReceive() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_SIGNINAWARD_RECEIVE
    const network: Network = Network.getInstance()

    const next = (response: any) => {
      // Note: response type is 'any' in original
      if (response.code == 200) {
        setSuccess(true)
        dispatchVipSignIn() // Call the action
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  // Receive VIP sign-in rewards
  async function dispatchVipSignInReward() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_SIGNIN_REWARDS
    const network: Network = Network.getInstance()

    const next = (response: any) => {
      // Note: response type is 'any' in original
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  // user vip information api
  async function dispatchVipInfo() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_INFO
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipInfoResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipInfo(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // user vip level api
  async function dispatchVipLevels() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_LEVEL
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipLevels(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // user vip task api
  async function dispatchVipTasks() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_TASKS
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipTaskResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipTasks(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // receive VIP code rebate rewards
  async function dispatchVipRebateAward(data: any) {
    // Keeping 'any' type as in original
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_REBATE_AWARD
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipRebateAwardResponse) => {
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // get vip coding record
  async function dispatchVipRebateHistory(data: Vip.VipRebateHistoryRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_REBATE_HISTORY
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipRebateHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipRebateHistory(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Obtain VIP level reward record
  async function dispatchVipLevelRewardHistory(data: Vip.VipLevelRewardHistoryRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_LEVEL_AWARD_HISTORY
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelRewardHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipLevelRewardHistory(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Get VIP weekly and monthly reward records
  async function dispatchVipTimesHistory(data: Vip.VipTimesHistoryRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_TIMES_HISTORY
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipTimesHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipTimesHistory(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Get VIP upgrade reward information
  async function dispatchVipLevelUpList() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_LEVELUP_LIST
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelUpListResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipLevelUpList(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // Receive VIP upgrade rewards
  async function dispatchVipLevelUpReceive() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_LEVELUP_RECEIVE
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelUpReceiveResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipLevelUpReceive(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  /**
   * Get periodic rewards  获取周期性奖励
   */
  async function dispatchVipCycleawardList() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_CYCLEAWARD_LIST
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        setVipCycleawardList(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  /**
   * Receive periodic rewards  领取周期性奖励
   * @param data Reward type 1: Member day 2: Daily reward 3: Weekly reward 4: Monthly reward
   * @param data 领取奖励类型 1: 会员日 2: 日奖励 3:周奖励 4: 月奖励
   */
  async function dispatchVipCycleawardReceive(data: Vip.VipCycleawardReceiveRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_CYCLEAWARD_RECEIVE
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        alertMessage(
          {
            type: 1,
            message: '',
          },
          'reward.success_text',
        )
        dispatchVipCycleawardList() // Call the action
      } else {
        setErrorMessage(handleException(response.code))
        alertMessage(
          {
            type: 0,
            message: '',
          },
          response.message,
        )
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  /**
   * Get level-related rewards  获取等级相关奖励
   */
  async function dispatchVipLevelAward() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_LEVELAWARD_LIST
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        setVipLevelAward(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  /**
   * Receive level-related rewards  领取等级相关奖励
   * @param data Reward type 5: Upgrade reward 6: Upgrade reward
   * @param data 领取奖励类型 5: 升级奖励 6: 升段奖励
   */
  async function dispatchVipLevelAwardReceive(data: Vip.VipLevelAwardReceiveRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_LEVELAWARD_RECEIVE
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        alertMessage(
          {
            type: 1,
            message: '',
          },
          'reward.success_text',
        )
        dispatchVipLevelAward() // Call the action
      } else {
        setErrorMessage(handleException(response.code))
        alertMessage(
          {
            type: 0,
            message: '',
          },
          response.message,
        )
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  /**
   * Get coding rebates  获取打码返利
   */
  async function dispatchVipBetawardList() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_BETAWARD_LIST
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        setVipBetawardList(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  /**
   * Get coding rebates  领取打码返利
   * @param data Reward type 7: Coding rewards
   * @param data 领取奖励类型 7: 打码奖励
   */
  async function dispatchVipBetawardReceive(data: Vip.VipBetawardReceiveRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_BETAWARD_RECEIVE
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        alertMessage(
          {
            type: 1,
            message: '',
          },
          'reward.success_text',
        )
        dispatchVipBetawardList() // Call the action
      } else {
        setErrorMessage(handleException(response.code))
        alertMessage(
          {
            type: 0,
            message: '',
          },
          response.message,
        )
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    levelUpDialogVisible,
    vipInfo,
    vipLevels,
    vipTasks,
    vipRebateHistory,
    vipLevelRewardHistory,
    vipTimesHistory,
    vipSignIn,
    vipLevelUpList,
    vipLevelUpReceive,
    vipNavBarToggle,
    vipCycleawardList,
    vipLevelAward,
    vipBetawardList,

    getSuccess,
    getErrMessage,
    getVipInfo,
    getVipLevels,
    getVipTasks,
    getVipRebateHistory,
    getVipLevelRewardHistory,
    getVipTimesHistory,
    getVipSignIn,
    getLevelUpDialogVisible,
    getVipLevelUpList,
    getVipLevelUpReceive,
    getVipNavBarToggle,
    getVipCycleawardList,
    getVipLevelAward,
    getVipBetawardList,

    setSuccess,
    setErrorMessage,
    setVipInfo,
    setVipLevels,
    setVipTasks,
    setVipRebateHistory,
    setVipLevelRewardHistory,
    setVipTimesHistory,
    setVipSignIn,
    setLevelUpDialogVisible,
    setVipLevelUpList,
    setVipLevelUpReceive,
    setVipNavBarToggle,
    setVipCycleawardList,
    setVipLevelAward,
    setVipBetawardList,
    alertMessage,
    dispatchVipSignIn,
    dispatchVipSigninawardReceive,
    dispatchVipSignInReward,
    dispatchVipInfo,
    dispatchVipLevels,
    dispatchVipTasks,
    dispatchVipRebateAward,
    dispatchVipRebateHistory,
    dispatchVipLevelRewardHistory,
    dispatchVipTimesHistory,
    dispatchVipLevelUpList,
    dispatchVipLevelUpReceive,
    dispatchVipCycleawardList,
    dispatchVipCycleawardReceive,
    dispatchVipLevelAward,
    dispatchVipLevelAwardReceive,
    dispatchVipBetawardList,
    dispatchVipBetawardReceive,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions

export const useRefferalStore = defineStore('refferal', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const refferalAppBarShow = ref(true)
  const refferalDialogVisible = ref(false)

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getRefferalAppBarShow = computed(() => refferalAppBarShow.value)
  const getRefferalDialogVisible = computed(() => refferalDialogVisible.value)

  // Actions converted to regular functions
  const setRefferalAppBarShow = (show: boolean) => {
    refferalAppBarShow.value = show
  }

  const setRefferalDialogShow = (visible: boolean) => {
    refferalDialogVisible.value = visible
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    refferalAppBarShow,
    refferalDialogVisible,

    getSuccess,
    getErrMessage,
    getRefferalAppBarShow,
    getRefferalDialogVisible,

    setRefferalAppBarShow,
    setRefferalDialogShow,
  }
})

import type { RouteRecordRaw } from 'vue-router'

import type { MenuRecordRaw } from '@/types'

import { acceptHMRUpdate, defineStore } from 'pinia'

type AccessToken = null | string

interface AccessState {
  /**
   * 权限码
   */
  accessCodes: string[]
  /**
   * 可访问的菜单列表
   */
  accessMenus: MenuRecordRaw[]
  /**
   * 可访问的路由列表
   */
  accessRoutes: RouteRecordRaw[]
  /**
   * 登录 accessToken
   */
  accessToken: AccessToken
  /**
   * 是否已经检查过权限
   */
  isAccessChecked: boolean
  /**
   * 登录是否过期
   */
  loginExpired: boolean
  /**
   * 登录 accessToken
   */
  refreshToken: AccessToken
}

/**
 * @zh_CN 访问权限相关
 */
export const useAccessStore = defineStore('core-access', {
  actions: {
    getMenuByPath(path: string) {
      function findMenu(menus: MenuRecordRaw[], path: string): MenuRecordRaw | undefined {
        for (const menu of menus) {
          if (menu.path === path) {
            return menu
          }
          if (menu.children) {
            const matched = findMenu(menu.children, path)
            if (matched) {
              return matched
            }
          }
        }
      }
      return findMenu(this.accessMenus, path)
    },
    setAccessCodes(codes: string[]) {
      this.accessCodes = codes
    },
    setAccessMenus(menus: MenuRecordRaw[]) {
      this.accessMenus = menus
    },
    setAccessRoutes(routes: RouteRecordRaw[]) {
      this.accessRoutes = routes
    },
    setAccessToken(token: AccessToken) {
      this.accessToken = token
    },
    setIsAccessChecked(isAccessChecked: boolean) {
      this.isAccessChecked = isAccessChecked
    },
    setLoginExpired(loginExpired: boolean) {
      this.loginExpired = loginExpired
    },
    setRefreshToken(token: AccessToken) {
      this.refreshToken = token
    },
  },
  persist: {
    // 持久化
    pick: ['accessToken', 'refreshToken', 'accessCodes'],
  },
  state: (): AccessState => ({
    accessCodes: [],
    accessMenus: [],
    accessRoutes: [],
    accessToken: null,
    isAccessChecked: false,
    loginExpired: false,
    refreshToken: null,
  }),
})

// 解决热更新问题
const hot = import.meta.hot
if (hot) {
  hot.accept(acceptHMRUpdate(useAccessStore, hot))
}

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'
import type * as Withdraw from '@/interface/withdraw'
import { handleException } from './exception' // Assuming this path is correct

export const useWithdrawStore = defineStore('withdraw', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const withdrawConfig = ref<any>({}) // Keeping 'any' type as in original
  const withdrawSubmit = ref<any>({}) // Keeping 'any' type as in original
  const withdrawHistoryItem = ref<Withdraw.WithdrawalHistoryResponse>({
    total_pages: 0,
    record: [],
  })

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getWithdrawCfg = computed(() => withdrawConfig.value)
  const getWithdrawSubmit = computed(() => withdrawSubmit.value)
  const getWithdrawHistoryItem = computed(() => withdrawHistoryItem.value)

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setWithdrawCfg = (config: any) => {
    // Keeping 'any' type as in original
    withdrawConfig.value = config
  }

  const setWithdrawSubmit = (submit: any) => {
    // Keeping 'any' type as in original
    withdrawSubmit.value = submit
  }

  const setWithdrawHistoryItem = (item: Withdraw.WithdrawalHistoryResponse) => {
    // Concatenate records as in original
    withdrawHistoryItem.value.record = [...withdrawHistoryItem.value.record, ...item.record]
    withdrawHistoryItem.value.total_pages = item.total_pages
  }

  // user withdraw configuration
  const dispatchUserWithdrawCfg = async () => {
    setSuccess(false)
    const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_CONFIG
    const network: Network = Network.getInstance()

    const next = (response: Withdraw.GetWithdrawResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setWithdrawCfg(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // user withdraw submit
  const dispatchUserWithdrawSubmit = async (data: Withdraw.WithdrawItem) => {
    setSuccess(false)
    const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_SUBMIT
    const network: Network = Network.getInstance()

    const next = (response: Withdraw.SubmitWithdrawResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setWithdrawSubmit(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // user withdrawal history api response
  const dispatchWithdrawalHistory = async (data: any) => {
    // Keeping 'any' type as in original
    setSuccess(false)
    const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_HISTORY
    const network: Network = Network.getInstance()

    const next = (response: Withdraw.GetWithdrawalHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setWithdrawHistoryItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // user withdrawal refund api response
  const dispatchWithdrawalRefund = async (data: any) => {
    // Keeping 'any' type as in original
    setSuccess(false)
    const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_REFUND
    const network: Network = Network.getInstance()

    const next = (response: Withdraw.GetWithdrawalHistoryResponse) => {
      // Note: response type is GetWithdrawalHistoryResponse in original, check if correct
      if (response.code == 200) {
        // Manually update the status in the existing history record
        withdrawHistoryItem.value.record.forEach((item: Withdraw.WithdrawalHistoryItem) => {
          if (item.id == data.id) {
            item.status = 3 // Assuming status 3 means refunded based on original logic
          }
        })
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    withdrawConfig,
    withdrawSubmit,
    withdrawHistoryItem,

    getSuccess,
    getErrMessage,
    getWithdrawCfg,
    getWithdrawSubmit,
    getWithdrawHistoryItem,

    setSuccess,
    setErrorMessage,
    setWithdrawCfg,
    setWithdrawSubmit,
    setWithdrawHistoryItem,
    dispatchUserWithdrawCfg,
    dispatchUserWithdrawSubmit,
    dispatchWithdrawalHistory,
    dispatchWithdrawalRefund,
  }
})

import { createPinia } from 'pinia'
import type { Pinia } from 'pinia'
import { useShopStore } from './shop'
import { useUserStore } from './user'
import userController from '../sdk/userModule/userController'
import shopController from '../sdk/shopModule/shopController'
import spinDataController from '../sdk/spinDataModule/spinDataController'

const pinia: Pinia = createPinia()
const { stopLoading } = useLoading()

export async function setupStore(app: App<Element>) {
  const env = import.meta.env.PROD ? 'prod' : 'dev'
  const appVersion = import.meta.env.VITE_APP_VERSION
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`
  const { createPersistedState } = await import('pinia-plugin-persistedstate')
  // const { namespace } = options
  pinia.use(
    createPersistedState({
      // key $appName-$store.id
      key: (storeKey) => `${namespace}-${storeKey}`,
      storage: localStorage,
    }),
  )
  app.use(pinia)
  return pinia
}

export function resetAllStores() {
  if (!pinia) {
    console.error('Pinia is not installed')
    return
  }
  const allStores = (pinia as any)._s
  for (const [_key, store] of allStores) {
    store.$reset()
  }
}
async function getMultipleResources(calls) {
  try {
    const promises = calls //urls.map((url) => fetch(url).then((response) => response.json()))
    const results = await Promise.all(promises)
    return results
  } catch (error) {
    // Handle errors here
    console.log('Error fetching resources:', error)
    return false // Re-throw the error to propagate it further if needed
  }
}

export async function hydrateStores(): Promise<boolean> {
  const userStore = useUserStore()
  const shopStore = useShopStore()
  const crudQuery = {
    where: {
      OR: [
        {
          isActive: true,
        },
      ],
    },
    orderBy: [{ name: 'asc' }, { featured: 'desc' }],
    page: 1,
    pageSize: 100,
  }

  try {
    const fetchList = [
      userController.getUserList(),
      // api.userControllerGetUserListGet.send(),
      userController.getCurrentUser(),
      // api.userControllerFindCurerentUser.send(),
      spinDataController.top(),
      // api.spinDataControllerTopGet.send(),
      shopController.findMyShop(),
      // api.shopControllerFindMyShopGet.send(),
      shopController.getGameList({}, { data: { crudQuery } }, {}),
    ]

    // getMultipleResources(fetchList)
    // .then((data) => console.log('Fetched data:', data))
    // .catch((err) => console.error('Failed to fetch:', err))
    const p = await getMultipleResources(fetchList)
    if (p === false) {
      console.log('returning false from store/index')
      return false
    }
    console.log(p)
    shopStore.setUsers(p[0])
    userStore.setUserInfo(p[1])
    if (p[2] !== Error) shopStore.setSpinDatas(p[2])
    shopStore.setShop(p[3])
    shopStore.setGames(p[4])
    shopStore.setBigWins()
    stopLoading()
    console.log('returning true from store/index')
    return true
    // }
  } catch (e) {
    console.log(e)
    console.log('returning false from store/index')
    return false
  }
}

export async function startSubscriptions(): Promise<boolean> {
  const userStore = useUserStore()
  userStore.startSubscription()
  return true
}
export { pinia as store }

import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'
import { handleException } from './exception'
import { useAuthStore } from '@/stores/auth'
import { useAppBarStore } from '@/stores/appBar'

type dialogType = 'login' | 'signup'

namespace Game {
  export type Category = any
  export type GameSearchResponse = {
    list: any[]
    total: number
  }
  export type GameEnterResponse = {
    method: string
    parames: string
    provider: string
    reserve: string
    weburl: string
  }
  export type Search = any
  export type GameHistoryResponse = {
    total_pages: number
    record: any[]
  }
  export type GameBigWinData = {
    high_rollers: any[]
    lucky_bets: any[]
  }
  export type GetGameCategoriesResponse = {
    code: number
    data: Category[]
  }
  export type GetGameSearchResponse = {
    code: number
    data: GameSearchResponse
  }
  export type GameUserBody = any
  export type GetGameEnterResponse = {
    code: number
    data: GameEnterResponse
  }
  export type GetGameHistoryResponse = {
    code: number
    data: GameHistoryResponse
  }
  export type GetGameBigWinResponse = {
    code: number
    data: GameBigWinData
  }
  export type GetGameFavoriteListResponse = {
    code: number
    data: (number | string)[]
  }
  export type GameEnterBody = {
    id: string | string[]
    demo: boolean
  }
}

export const useGameStore = defineStore('game', () => {
  /**
   * @state success - Indicates if the last operation was successful.
   */
  const success = ref<boolean>(false)
  /**
   * @state errMessage - Stores the error message if an operation fails.
   */
  const errMessage = ref<string>('')

  /**
   * @state gameCategories - An array of game categories.
   */
  const gameCategories = ref<Array<Game.Category>>([])

  /**
   * @state gameProviders - An array of game providers.
   */
  const gameProviders = ref<Array<Game.Category>>([])

  /**
   * @state gameSearchList - Contains the list of searched games and the total count.
   */
  const gameSearchList = ref<Game.GameSearchResponse>({
    list: [],
    total: 0,
  })

  /**
   * @state enterGameItem - Contains data required to enter a game.
   */
  const enterGameItem = ref<Game.GameEnterResponse>({
    method: '',
    parames: '',
    provider: '',
    reserve: '',
    weburl: '',
  })

  /**
   * @state searchGameDialogShow - Controls the visibility of the search game dialog.
   */
  const searchGameDialogShow = ref<boolean>(false)

  /**
   * @state mobileMenuShow - Controls the visibility of the mobile menu.
   */
  const mobileMenuShow = ref<boolean>(true)

  /**
   * @state searchTextList - An array of search terms.
   */
  const searchTextList = ref<Array<string>>([])

  /**
   * @state gameFilterText - The current text used for filtering games.
   */
  const gameFilterText = ref<string>('')

  /**
   * @state originalGames - An array to store the original list of games.
   */
  const originalGames = ref<Array<Game.Search>>([])

  /**
   * @state gameHistoryItem - Contains the game history.
   */
  const gameHistoryItem = ref<Game.GameHistoryResponse>({
    total_pages: 0,
    record: [],
  })

  /**
   * @state userSpinPage - Contains data about the user's spin page.
   */
  const userSpinPage = ref<any>({})

  /**
   * @state userSpin - Contains data about the user's spin.
   */
  const userSpin = ref<any>({})

  /**
   * @state language - The current language setting.
   */
  const language = ref<string>(localStorage.getItem('lang') || 'en')

  /**
   * @state betby - Stores the betby instance.
   */
  const betby = ref<any>(null)

  /**
   * @state gameBigWinItem - Contains data about big game wins.
   */
  const gameBigWinItem = ref<Game.GameBigWinData>({
    high_rollers: [],
    lucky_bets: [],
  })

  /**
   * @state favoriteGameList - Stores the list of favorite games.
   */
  const favoriteGameList = ref<Array<number | string>>([])
  var injected: boolean = false

  const styles: string = ''
  const scriptSrc: string = ''
  const initializeParams = {}

  const target = 'bettech'

  var BTRenderer: any = null
  //  private styleElement: HTMLStyleElement;
  const initialElement: HTMLMetaElement | null = null
  const scriptElement: HTMLScriptElement | null = null

  /**
   * @action setSuccess - Sets the success state.
   * @param success - The new success value.
   */
  function setSuccess(_success: boolean) {
    success.value = _success
  }

  /**
   * @action setErrorMessage - Sets the errMessage state.
   * @param message - The new error message.
   */
  function setErrorMessage(message: string) {
    errMessage.value = message
  }

  /**
   * @action setGameCategories - Sets the gameCategories state.
   * @param gameCategories - The new game categories.
   */
  function setGameCategories(_gameCategories: Array<Game.Category>) {
    gameCategories.value = _gameCategories
  }

  /**
   * @action setGameProviders - Sets the gameProviders state.
   * @param gameProviders - The new game providers.
   */
  function setGameProviders(_gameProviders: Array<Game.Category>) {
    gameProviders.value = _gameProviders
  }

  /**
   * @action setGameSearchList - Sets the gameSearchList state.
   * @param gameSearchList - The new game search list.
   */
  function setGameSearchList(_gameSearchList: Game.GameSearchResponse) {
    gameSearchList.value = _gameSearchList
  }

  /**
   * @action setGameEnterItem - Sets the enterGameItem state.
   * @param enterGameItem - The new game enter item.
   */
  function setGameEnterItem(_enterGameItem: Game.GameEnterResponse) {
    enterGameItem.value = _enterGameItem
  }

  /**
   * @action setSearchGameDialogShow - Sets the searchGameDialogShow state.
   * @param searchGameDialogShow - The new search game dialog show value.
   */
  function setSearchGameDialogShow(_searchGameDialogShow: boolean) {
    searchGameDialogShow.value = _searchGameDialogShow
  }

  /**
   * @action setSearchTextList - Adds a search text if not already in the array.
   * @param searchText - The search text to add.
   */
  function setSearchTextList(searchText: string) {
    const sameSearchText = searchTextList.value.filter((item) => item == searchText)
    if (sameSearchText.length == 0) {
      searchTextList.value.push(searchText)
    }
  }

  /**
   * @action removeSearchTextList - Removes a search text by index.
   * @param index - The index of the search text to remove.
   */
  function removeSearchTextList(index: number) {
    searchTextList.value.splice(index, 1)
  }

  /**
   * @action removeAllSearchTextList - Removes all search texts.
   */
  function removeAllSearchTextList() {
    searchTextList.value = []
  }

  /**
   * @action setGameFilterText - Sets the gameFilterText state.
   * @param gameFilterText - The new game filter text.
   */
  function setGameFilterText(_gameFilterText: string) {
    gameFilterText.value = _gameFilterText
  }

  /**
   * @action setOriginalGames - Sets the originalGames state.
   * @param originalGames - The new original games array.
   */
  function setOriginalGames(_originalGames: Array<Game.Search>) {
    originalGames.value = _originalGames
  }

  /**
   * @action setMobileMenuShow - Sets the mobileMenuShow state.
   * @param mobileMenuShow - The new mobile menu show value.
   */
  function setMobileMenuShow(_mobileMenuShow: boolean) {
    mobileMenuShow.value = _mobileMenuShow
  }

  /**
   * @action setGameHistoryItem - Sets the gameHistoryItem state.
   * @param gameHistoryItem - The new game history item.
   */
  function setGameHistoryItem(_gameHistoryItem: Game.GameHistoryResponse) {
    gameHistoryItem.value = _gameHistoryItem
  }

  /**
   * @action setUserSpinPage - Sets the userSpinPage state.
   * @param userSpinPage - The new user spin page data.
   */
  function setUserSpinPage(_userSpinPage: any) {
    userSpinPage.value = _userSpinPage
  }

  /**
   * @action setUserSpin - Sets the userSpin state.
   * @param userSpin - The new user spin data.
   */
  function setUserSpin(userSpin: any) {
    userSpin.value = userSpin
  }

  /**
   * @action setLanguage - Sets the language state.
   * @param lang - The new language.
   */
  function setLanguage(lang: string) {
    language.value = lang
  }

  /**
   * @action setFavoriteGameList - Sets the favoriteGameList state.
   * @param favoriteGameList - The new favoriteGameList.
   */
  function setFavoriteGameList(_favoriteGameList: Array<number | string>) {
    favoriteGameList.value = _favoriteGameList
  }

  /**
   * @action openDialog - Opens a dialog, sets the authModalType and authDialogVisible.
   * @param type - The type of the dialog to open.
   */
  function openDialog(type: dialogType) {
    const { setAuthModalType, setAuthDialogVisible } = useAuthStore()
    const { setOverlayScrimShow } = useAppBarStore()
    setAuthModalType(type)
    setAuthDialogVisible(true)
    setOverlayScrimShow(false)
  }

  /**
   * @action closeKill - Calls kill on betby.
   */
  function closeKill() {
    betby.value?.kill()
  }

  /**
   * @action setGameBigWinItem - Sets the gameBigWinItem state.
   * @param gameBigWinItem - The new game big win item.
   */
  function setGameBigWinItem(_gameBigWinItem: Game.GameBigWinData) {
    gameBigWinItem.value = _gameBigWinItem
  }

  function inject(_gameBigWinItem: Game.GameBigWinData) {
    if (injected) {
      return
    }

    injected = true

    // styleElement = document.createElement('style');
    // styleElement.textContent = styles;
    // document.head.appendChild(styleElement);

    var initialElement = document.createElement('meta')
    initialElement.name = 'betting-marker'
    initialElement.content = 'initial'
    document.head.appendChild(initialElement)

    var scriptElement = document.createElement('script')
    scriptElement.src = scriptSrc
    scriptElement.async = true
    document.body.appendChild(scriptElement)

    scriptElement.onload = () => {
      try {
        BTRenderer = new (window as any).BTRenderer().initialize(initializeParams)
      } catch {
        //   cleanup();
      }
    }
    scriptElement.onabort = () => {}
  }
  /**
   * @action getGameBetbyInit - Gets the betby game init, and sets the callbacks.
   */
  async function getGameBetbyInit() {
    if (!enterGameItem.value.reserve) {
      await dispatchGameEnter({ id: '9999', demo: false })
    }
    betby.value = new BTRenderer().initialize({
      token: enterGameItem.value.reserve || '',
      lang: language,
      target: document.getElementById('betby'),
      brand_id: '2331516940205559808',
      betSlipOffsetTop: 0,
      betslipZIndex: 999,
      themeName: 'default',
      onLogin: () => {
        openDialog('login')
      },
      onRegister: () => {
        openDialog('signup')
      },
      onTokenExpired: async () => {
        closeKill()
        await dispatchGameEnter({ id: '9999', demo: false })
        await getGameBetbyInit()
      },
      onSessionRefresh: async () => {
        closeKill()
        await getGameBetbyInit()
      },
    })
  }

  /**
   * @action dispatchGameCategories - Makes a network call to get categories.
   * @param sub_api - The sub api path.
   */
  async function dispatchGameCategories(sub_api: string) {
    setSuccess(false)
    const route: string = NETWORK.GAME_INFO.GAME_CATEGORY + sub_api
    const network: Network = Network.getInstance()
    const next = (response: Game.GetGameCategoriesResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        if (sub_api == '?type=providers') {
          setGameProviders(response.data)
        } else {
          setGameCategories(response.data)
        }
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  /**
   * @action dispatchGameSearch - Makes a network call to search for games.
   * @param sub_api - The sub api path.
   */
  async function dispatchGameSearch(sub_api: string) {
    setSuccess(false)
    const route: string = NETWORK.GAME_INFO.GAME_SEARCH + sub_api
    const network: Network = Network.getInstance()
    const next = (response: Game.GetGameSearchResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setGameSearchList(response.data)
      } else {
        setGameSearchList({ list: [], total: 0 })
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  /**
   * @action dispatchUserGame - Makes a network call to get user games.
   * @param data - The request data.
   */
  async function dispatchUserGame(data: Game.GameUserBody) {
    setSuccess(false)
    const route: string = NETWORK.GAME_INFO.USER_GAME
    const network: Network = Network.getInstance()
    const next = (response: Game.GetGameSearchResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setGameSearchList(response.data)
      } else {
        setGameSearchList({ list: [], total: 0 })
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1, 4)
  }

  /**
   * @action dispatchFavoriteGame - Makes a network call to favorite games.
   * @param data - The request data.
   */
  async function dispatchFavoriteGame(data: any) {
    setSuccess(false)
    const route: string = NETWORK.GAME_INFO.FAVORITE_GAME
    const network: Network = Network.getInstance()
    const next = (response: any) => {
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  /**
   * @action dispatchGameEnter - Makes a network call to enter game.
   * @param data - The request data.
   */
  async function dispatchGameEnter(data: Game.GameEnterBody) {
    setSuccess(false)
    const route: string = NETWORK.GAME_INFO.GAME_ENTER
    const network: Network = Network.getInstance()
    const next = (response: Game.GetGameEnterResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setErrorMessage('')
        setGameEnterItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  /**
   * @action dispatchGameHistory - Makes a network call to get game history.
   * @param data - The request data.
   */
  async function dispatchGameHistory(data: any) {
    setSuccess(false)
    const route: string = NETWORK.GAME_INFO.GAME_HISTORY
    const network: Network = Network.getInstance()
    const next = (response: Game.GetGameHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setGameHistoryItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  /**
   * @action dispatchUserSpinPage - Makes a network call to get user spin page.
   * @param data - The request data.
   */
  async function dispatchUserSpinPage(data: any) {
    setSuccess(false)
    const route: string = NETWORK.GAME_INFO.SPINPAGE
    const network: Network = Network.getInstance()
    const next = (response: any) => {
      if (response.code == 200) {
        setSuccess(true)
        setUserSpinPage(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  /**
   * @action dispatchUserSpin - Makes a network call to get user spin.
   */
  async function dispatchUserSpin() {
    setSuccess(false)
    const route: string = NETWORK.GAME_INFO.SPIN
    const network: Network = Network.getInstance()
    const next = (response: any) => {
      if (response.code == 200) {
        setSuccess(true)
        setUserSpin(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  /**
   * @action dispatchGameBigWin - Makes a network call to get game big win.
   */
  async function dispatchGameBigWin() {
    setSuccess(false)
    const route: string = NETWORK.GAME_INFO.GAME_BIGWIN
    const network: Network = Network.getInstance()
    const next = (response: Game.GetGameBigWinResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setGameBigWinItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  /**
   * @action dispatchGameFavoriteList - Makes a network call to get game favorite list.
   */
  async function dispatchGameFavoriteList() {
    setSuccess(false)
    const route: string = NETWORK.GAME_INFO.FAVORITE_GAME_LIST
    const network: Network = Network.getInstance()
    const next = (response: Game.GetGameFavoriteListResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setFavoriteGameList(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  return {
    success,
    errMessage,
    gameCategories,
    gameProviders,
    gameSearchList,
    enterGameItem,
    searchGameDialogShow,
    mobileMenuShow,
    searchTextList,
    gameFilterText,
    originalGames,
    gameHistoryItem,
    userSpinPage,
    userSpin,
    language,
    betby,
    gameBigWinItem,
    favoriteGameList,
    setSuccess,
    setErrorMessage,
    setGameCategories,
    setGameProviders,
    setGameSearchList,
    setGameEnterItem,
    setSearchGameDialogShow,
    setSearchTextList,
    removeSearchTextList,
    removeAllSearchTextList,
    setGameFilterText,
    setOriginalGames,
    setMobileMenuShow,
    setGameHistoryItem,
    setUserSpinPage,
    setUserSpin,
    setLanguage,
    setFavoriteGameList,
    openDialog,
    closeKill,
    setGameBigWinItem,
    getGameBetbyInit,
    dispatchGameCategories,
    dispatchGameSearch,
    dispatchUserGame,
    dispatchFavoriteGame,
    dispatchGameEnter,
    dispatchGameHistory,
    dispatchUserSpinPage,
    dispatchUserSpin,
    dispatchGameBigWin,
    dispatchGameFavoriteList,
  }
})
import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { handleException } from './exception' // Assuming this path is correct

export const useMainStore = defineStore('main', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const searchDialogShow = ref(false)

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getSearchDialogShow = computed(() => searchDialogShow.value)

  // Actions converted to regular functions
  const setSearchDialogShow = (show: boolean) => {
    searchDialogShow.value = show
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    searchDialogShow,

    getSuccess,
    getErrMessage,
    getSearchDialogShow,

    setSearchDialogShow,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { NETWORK } from '@/net/NetworkCfg'
import { Network } from '@/net/Network'
import * as Achievement from '@/interface/achievement'
import { handleException } from './exception' // Assuming this path is correct

export const useAchievementStore = defineStore('achievement', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const achievementItem = ref<Achievement.GetAchievementItem>({
    achievement_progress: 0,
    achievement_explain: [],
    award_progress: 0,
    award_explain: [],
    rate: 0,
  })

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getAchievementItem = computed(() => achievementItem.value)

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setAchievementItem = (item: Achievement.GetAchievementItem) => {
    achievementItem.value = item
  }

  // get achievement list
  const dispatchAchievementList = async () => {
    setSuccess(false)
    const route: string = NETWORK.ACHIEVEMENT_PAGE.ACHIEVEMENT_LIST
    const network: Network = Network.getInstance()

    const next = (response: Achievement.GetAchievementResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setAchievementItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  // get achievement config
  const dispatchAchievementConfig = async () => {
    setSuccess(false)
    const route: string = NETWORK.ACHIEVEMENT_PAGE.ACHIEVEMENT_CONFIG
    const network: Network = Network.getInstance()

    const next = (response: Achievement.GetAchievementResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setAchievementItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // dispatch stage award
  const dispatchStageAward = async (data: any) => {
    setSuccess(false)
    const route: string = NETWORK.ACHIEVEMENT_PAGE.STAGE_AWARD
    const network: Network = Network.getInstance()

    const next = (response: Achievement.GetAchievementResponse) => {
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // dispatch achievement award
  const dispatchAchievementAward = async (data: any) => {
    setSuccess(false)
    const route: string = NETWORK.ACHIEVEMENT_PAGE.ACHIEVEMENT_AWARD
    const network: Network = Network.getInstance()

    const next = (response: Achievement.GetAchievementResponse) => {
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    achievementItem,

    getSuccess,
    getErrMessage,
    getAchievementItem,

    setSuccess,
    setErrorMessage,
    setAchievementItem,
    dispatchAchievementList,
    dispatchAchievementConfig,
    dispatchStageAward,
    dispatchAchievementAward,
  }
})

// error handle function
export const handleException = (code: number) => {
  let errorMsg = '' as string
  switch (code) {
    case 0:
      errorMsg = '失败'
      break
    case 401:
      errorMsg = 'The login account or password is wrong'
      break
    case 101004:
      errorMsg = 'Credentials have expired. Please log in again'
      break
    case 100000:
      errorMsg = 'The data passed is abnormal'
      break
    case 100001:
      errorMsg = 'The password does not meet the requirements'
      break
    case 100002:
      errorMsg = 'User account is locked'
      break
    case 101001:
      errorMsg = 'Login data exception'
      break
    case 101002:
      errorMsg = 'The login account or password is wrong'
      break
    case 101003:
      errorMsg = 'Login account does not exist'
      break
    case 102001:
      errorMsg = 'Failed to register data'
      break
    case 102002:
      errorMsg = 'Registration data exception'
      break
    case 102003:
      errorMsg = 'The account you entered has been used by someone else, please input again'
      break
    case 103001:
      errorMsg = 'Abnormal nickname format (abnormal length or illegal identifier)'
      break
    case 103002:
      errorMsg = 'Nickname is the same as email'
      break
    case 103003:
      errorMsg = 'Email format exception (abnormal length or illegal identifier)'
      break
    case 103004:
      errorMsg = 'Phone format exception (abnormal length or illegal identifier)'
      break
    case 103005:
      errorMsg = 'The same password needs to be changed'
      break
    case 103006:
      errorMsg = 'The current password is wrong'
      break
    case 103007:
      errorMsg = 'The emails that need to be modified are the same'
      break
    case 103008:
      errorMsg = 'The message that needs to be modified is already taken'
      break
    case 103009:
      errorMsg = 'The avatar index that needs to be modified is wrong'
      break
    case 103010:
      errorMsg = 'wrong birthday format'
      break
    case 106001:
      errorMsg = '存款人信息未提交'
      break
    case 106002:
      errorMsg = '存款人id重复'
      break
    case 106003:
      errorMsg = '金額不符合區間值'
      break
    case 106004:
      errorMsg = '存款失敗'
      break
    case 106005:
      errorMsg = '存款人id格式異常'
      break
    case 106101:
      errorMsg = '可提金額不符合'
      break
    case 106202:
      errorMsg = '存款失敗'
      break
    case 107001:
      errorMsg = 'vip数据异常'
      break
    case 107002:
      errorMsg = 'vip任務异常'
      break
    case 107003:
      errorMsg = 'vip任務領取失敗'
      break
    case 107004:
      errorMsg = 'vip獲取獎勵失敗'
      break
    case 107005:
      errorMsg = 'vip獎勵已領取'
      break
    case 107006:
      errorMsg = 'vip任務獎勵領取 查詢不到任務'
      break
    case 107007:
      errorMsg = 'vip任務獎勵領取 已領取'
      break
    case 107008:
      errorMsg = 'vip任務獎勵領取 未達領取條件'
      break
    case 107009:
      errorMsg = 'vip簽到不滿足條件'
      break
    case 108001:
      errorMsg = '遊戲id有誤'
      break
    case 108002:
      errorMsg = '遊戲分頁異常'
      break
    case 108003:
      errorMsg = '遊戲最大分頁'
      break
    case 108004:
      errorMsg = '遊戲類型異常'
      break
  }
  return errorMsg
}

export const useInviteStore = defineStore('invite', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const inviteItem = ref<Invite.InviteData>({
    bonus_month: 0,
    bonus_today: 0,
    bonus_total: 0,
    bonus_yesterdays: 0,
    deposit_users: 0,
    deposit_users_month: 0,
    deposit_users_today: 0,
    deposit_users_yesterdays: 0,
    invite_code: '',
    invited_users: 0,
    web_invite_url: import.meta.env.VITE_BASE_URL,
    available_bonus: 0,
  })
  const personalInvitationInfo = ref<Invite.PersonalInvitationInformation>({
    total_profit: '19,34',
    invitation_bonus: 25.916,
    bettion_commission: '40.533,73',
    achievement_bonus: 3.225,
    deposited_users: 3972,
    profit_today: {
      profit: '19,34',
      bettion_commission: '19,34',
      invite_bonus: 0,
    },
    profit_week: {
      profit: '19,34',
      bettion_commission: '19,34',
      invite_bonus: 0,
    },
    profit_month: {
      profit: '19,34',
      bettion_commission: '19,34',
      invite_bonus: 0,
    },
  })
  const inviteHistoryConfig = ref<Invite.InviteHistoryConfig>({} as Invite.InviteHistoryConfig) // Keeping type assertion as in original
  const statisticsItem = ref<Invite.StatisticsData>({
    today_profit: {
      register_user: [],
      deposit_user: [],
      deposit_bonus: 0,
      deposit_amount: [],
      bet_amount: [],
      bet_bonus: [],
      achievement_award: 0,
    },
    week_profit: {
      register_user: [],
      deposit_user: [],
      deposit_bonus: 0,
      deposit_amount: [],
      bet_amount: [],
      bet_bonus: [],
      achievement_award: 0,
    },
    month_profit: {
      register_user: [],
      deposit_user: [],
      deposit_bonus: 0,
      deposit_amount: [],
      bet_amount: [],
      bet_bonus: [],
      achievement_award: 0,
    },
    receive_profit: 0,
  })
  const inviteHistoryItem = ref<Invite.InviteHistoryData>({
    total_pages: 0,
    list: [],
  })

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getInviteItem = computed(() => inviteItem.value)
  const getPersonalInvitationInfo = computed(() => personalInvitationInfo.value)
  const getInviteHistoryConfig = computed(() => inviteHistoryConfig.value)
  const getStatisticsItem = computed(() => statisticsItem.value)
  const getInviteHistoryItem = computed(() => inviteHistoryItem.value)

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setInviteItem = (item: Invite.InviteData) => {
    inviteItem.value = item
  }

  const setPersonalInvitationInfo = (info: Invite.PersonalInvitationInformation) => {
    personalInvitationInfo.value = info
  }

  const setInviteHistoryConfig = (config: Invite.InviteHistoryConfig) => {
    inviteHistoryConfig.value = config
  }

  const setStatisticsItem = (item: Invite.StatisticsData) => {
    statisticsItem.value = item
  }

  const setInviteHistoryItem = (item: Invite.InviteHistoryData) => {
    inviteHistoryItem.value = item
  }

  // user invitation information
  const dispatchUserInvite = async () => {
    setSuccess(false)
    const route: string = NETWORK.INVITE_PAGE.INVITE_INFO
    const network: Network = Network.getInstance()

    const next = (response: Invite.GetInviteResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setInviteItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  // get invitation activity commission record
  const dispatchUserInviteHistory = async (formData: Invite.InviteHistoryFormData) => {
    setSuccess(false)
    const route: string = NETWORK.INVITE_PAGE.INVITE_HISTORY
    const network: Network = Network.getInstance()

    const next = (response: Invite.InviteHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setInviteHistoryItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, formData, next, 1)
  }

  // get agent achievement information
  const dispatchStatisticsList = async () => {
    setSuccess(false)
    const route: string = NETWORK.INVITE_PAGE.STATISTICS_LIST
    const network: Network = Network.getInstance()

    const next = (response: Invite.GetStatisticsResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setStatisticsItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  // receive invitation achievement commissions
  const dispatchInviteAward = async (data: any) => {
    // Keeping 'any' type as in original
    setSuccess(false)
    const route: string = NETWORK.INVITE_PAGE.INVITER_AWARD
    const network: Network = Network.getInstance()

    const next = (response: Invite.GetInviteResponse) => {
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // personal invitation information
  const dispatchInviteSelf = async () => {
    setSuccess(false)
    const route: string = NETWORK.INVITE_PAGE.INVITE_SELF
    const network: Network = Network.getInstance()

    const next = (response: Invite.GetInviteSelfResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setPersonalInvitationInfo(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  // invitation event commission record configuration
  const dispatchInviteHistoryCfg = async () => {
    setSuccess(false)
    const route: string = NETWORK.INVITE_PAGE.INVITE_HISTORY_CONFIG
    const network: Network = Network.getInstance()

    const next = (response: Invite.GetInviteHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setInviteHistoryConfig(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    inviteItem,
    personalInvitationInfo,
    inviteHistoryConfig,
    statisticsItem,
    inviteHistoryItem,

    getSuccess,
    getErrMessage,
    getInviteItem,
    getPersonalInvitationInfo,
    getInviteHistoryConfig,
    getStatisticsItem,
    getInviteHistoryItem,

    setSuccess,
    setErrorMessage,
    setInviteItem,
    setPersonalInvitationInfo,
    setInviteHistoryConfig,
    setStatisticsItem,
    setInviteHistoryItem,
    dispatchUserInvite,
    dispatchUserInviteHistory,
    dispatchStatisticsList,
    dispatchInviteAward,
    dispatchInviteSelf,
    dispatchInviteHistoryCfg,
  }
})

import type { IShop, IUser, IGame, IProduct } from '@/sdk/_types/src/prisma/interfaces.ts'
import { defineStore } from 'pinia'
import { store } from './index.js'
import type { SpinData } from '@/sdk/_types/src/prisma/types.ts'

export const useShopStore = defineStore(
  'shop',
  () => {
    //   const { api } = useRequest()
    const currentShop = ref<IShop>()
    const userList = ref<Partial<IUser[]>>([])
    const gameList = ref<IGame[]>([])
    const spinDatas = ref<SpinData[]>([])
    const bigWins = ref<any[]>([])
    const products = ref<IProduct[]>([])
    const setBigWins = () => {
      const wins: any[] = []
      spinDatas.value.forEach((bet: SpinData) => {
        let game = gameList.value.find((game) => game.title.replace(/\s+/g, '') == bet.gameId)
        console.log(bet)
        // developer = developer.developer
        if (game !== undefined) {
          bet.developer = game.developer
          bet.gameId = game.name.toLowerCase()
        }
        // if (bet.gameId.includes('NLC')) {
        //   bet.developer = 'nolimit'
        //   bet.gameId = bet.gameId.toLowerCase()
        // }
        // if (bet.gameId.includes('RTG')) {
        //   bet.developer = 'redtiger'
        //   bet.gameId = bet.gameId.toLowerCase()
        // }
        // if (bet.gameId.includes('NET')) {
        //   bet.developer = 'netent'
        //   bet.gameId = bet.gameId.toLowerCase()
        // }
        // if (bet.gameId.includes('NG')) {
        //   bet.developer = 'netgame'
        //   bet.gameId = bet.gameId.toLowerCase()
        // }
        // if (bet.gameId.includes('KA')) {
        //   bet.developer = 'kickass'
        //   bet.gameId = bet.gameId.toLowerCase()
        // }
        if (bet.amount > 0) {
          const user = userList.value.find((u: any) => u.activeProfileId === bet.profileId)
          if (user === undefined) return
          console.log(user.avatar)
          bet.username = user.username
          bet.avatar = user.avatar
          wins.push(bet)
        }
      })
      bigWins.value = wins
    }
    const setShop = (shopInfo: IShop) => {
      currentShop.value = shopInfo
    }

    const setUsers = (list: Partial<IUser[]>) => {
      userList.value = list
    }
    const setSpinDatas = (bets: any[]) => {
      spinDatas.value = bets
    }

    function groupGames(games: IGame[]) {
      // Separate games into featured and non-featured lists
      const featuredGames = games.filter((game) => game.featured)
      const nonFeaturedGames = games.filter((game) => !game.featured)

      const numberOfGroups = featuredGames.length

      // If there are no featured games, return the original array
      if (numberOfGroups === 0) {
        console.warn('No featured games found. Returning the original array.')
        return games
      }

      const totalNonFeaturedGames = nonFeaturedGames.length
      // Base number of non-featured games per group (integer division)
      const baseGamesPerGroup = Math.floor(totalNonFeaturedGames / numberOfGroups)
      // Number of groups that will receive one extra non-featured game
      const remainder = totalNonFeaturedGames % numberOfGroups

      // Create a single array to hold the flattened result
      const flattenedGroups = []

      let nonFeaturedIndex = 0
      for (let i = 0; i < numberOfGroups; i++) {
        // Add the current featured game to the result array
        flattenedGroups.push(featuredGames[i])

        // Determine how many non-featured games this group should get
        const gamesForThisGroup = baseGamesPerGroup + (i < remainder ? 1 : 0)

        // Add the allocated non-featured games to the result array
        for (let j = 0; j < gamesForThisGroup; j++) {
          if (nonFeaturedIndex < totalNonFeaturedGames) {
            flattenedGroups.push(nonFeaturedGames[nonFeaturedIndex])
            nonFeaturedIndex++
          } else {
            // Should not happen if calculations are correct, but good safeguard
            break
          }
        }
      }

      // Add any remaining non-featured games if the distribution didn't use them all
      // This could happen if the number of non-featured games is less than the number of featured games
      while (nonFeaturedIndex < totalNonFeaturedGames) {
        flattenedGroups.push(nonFeaturedGames[nonFeaturedIndex])
        nonFeaturedIndex++
      }

      // Return the single flattened array
      return flattenedGroups
    }
    const setGames = (allGames: IGame[]) => {
      let x = 0
      // function groupGames(games) {
      // Separate games into featured and non-featured lists
      const totalGamesCount = allGames.length
      const hotCount = Math.floor(totalGamesCount / 5)
      const coldCount = Math.floor(totalGamesCount / 5)

      let currentHot = 0
      let currentCold = 0

      // Shuffle the array to ensure random distribution
      // Fisher-Yates (Knuth) Shuffle Algorithm
      for (let i = allGames.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[allGames[i], allGames[j]] = [allGames[j], allGames[i]] // Swap elements
      }

      allGames.forEach((game) => {
        // Default temperature is 'none'
        game.temperature = 'none'

        // Randomly assign 'hot' or 'cold' based on counts
        const randomValue = Math.random() // Value between 0 (inclusive) and 1 (exclusive)

        if (currentHot < hotCount && randomValue < 0.5) {
          // Simple split probability
          game.temperature = 'hot'
          currentHot++
        } else if (currentCold < coldCount) {
          // Assign cold if not hot and cold count not reached
          game.temperature = 'cold'
          currentCold++
        }
        // If neither condition is met, temperature remains 'none'
      })

      // Shuffle again to mix games with temperatures back into a somewhat random order
      // before grouping, while preserving the assigned temperatures.
      for (let i = allGames.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[allGames[i], allGames[j]] = [allGames[j], allGames[i]] // Swap elements
      }
      // --- END ADDED ---

      console.log('Original Games Array (with Temperature):')
      console.log(allGames)

      const groupedResult = groupGames(allGames)

      console.log('\nGrouped Games Result (Flattened):')
      console.log(groupedResult)

      gameList.value = groupedResult
    }
    return {
      products,
      setUsers,
      setShop,
      bigWins,
      setBigWins,
      setGames,
      setSpinDatas,
      currentShop,
      gameList,
    }
  },
  {
    persist: {
      pick: ['gameList', 'products', 'currentShop'],
    },
  },
)

export function useShopStoreOutside() {
  return useShopStore(store)
}

const expScale = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000]
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>(getToken() || '')
    const currentUser = ref<User>()
    const isAuthenticated = ref<boolean>(false)
    const roles = ref<string[]>([])
    const success = ref<boolean>(false)
    const errMessage = ref<string>('')
    const userBalance = ref<GetUserBalance>()

    const percentOfVipLevel = computed(() => {
      if (currentUser.value === undefined) return 0
      const nextXpLevel = expScale[currentUser.value.vipRankLevel as number]
      console.log(nextXpLevel)
      console.log(currentUser.value.vipPoints / nextXpLevel)
      return (15 / nextXpLevel) * 100
    })
    const setUserBalance = (_userBalance: GetUserBalance) => {
      console.log('金额', userBalance)
      userBalance.value = _userBalance
    }
    const getUserBalance = () => {
      return userBalance
    }
    const setToken = (value: string) => {
      _setToken(value)
      token.value = value
    }
    const setSuccess = (value: boolean) => {
      success.value = value
    }
    const setErrorMessage = (value: string) => {
      errMessage.value = value
    }
    const updateInfo = async () => {
      const result = await api.userControllerFindCurerentUser.send()
      const data = result.data
      if (data === null) return false
      console.log(data)
      currentUser.value = data
      // roles.value = data.activeProfile.roles
      return data
    }
    const updateCurrentUserBalance = (balanceUpdate: any | number) => {
      console.log(balanceUpdate)
      if (currentUser.value == undefined) return
      // currentUser.value = userInfo
      if (typeof balanceUpdate !== 'number') {
        if (balanceUpdate.new_balance) {
          currentUser.value.balance = balanceUpdate.new_balance
        }
      }
      if (typeof balanceUpdate === 'number') {
        currentUser.value.balance = balanceUpdate
      }
    }
    const setUserInfo = (userInfo: User) => {
      currentUser.value = userInfo
    }

    const setUserGameStat = (stat: string, value: number) => {
      //@ts-ignore
      currentUser.value[stat] = value
      //@ts-ignore
      console.log(currentUser.value[stat])
      // }
    }
    const changeRoles = (role: string) => {
      const newToken = `token-${role}`
      token.value = newToken
      _setToken(newToken)
      location.reload()
    }

    const resetToken = () => {
      removeToken()
      token.value = ''
      roles.value = []
    }
    const register = async (username: string, password: string): Promise<boolean> => {
      console.log(username)
      const avatar = '11'
      const shopId = 'house'
      const result = await authController.register(
        {},
        {
          username,
          password,
          avatar,
          shopId,
        },
      )
      console.log(result)
      console.log(result.token.token)
      if (result.code !== 0) return false
      if (result.data === null) return false
      setToken(result.token.token)
      Cookies.set('laravel_session', result.token.token)
      localStorage.setItem('access_token', result.token.token)
      const hydrated = await hydrateStores()
      console.log(hydrated)
      localStorage.setItem('isAuthenticated', 'true')
      isAuthenticated.value = hydrated
      const ablyToken = result.ablyToken
      localStorage.set('ably-token', ablyToken)
      return hydrated
    }

    const login = async (name: string, password: string): Promise<boolean> => {
      // const { stopLoading } = useLoading()
      // const cashflowStore = useCashflowStore()
      // const socketStore = useSocketStore()
      // const notificationStore = useNotificationStore()
      // // const result = await authController.login({}, { username: name, password })
      // await cashflowStore.connect(name, password)
      // if (result.status === 401) {
      //   notificationStore.addNotification('Invalid credentials', 'error')
      //   return false
      // }
      // if (typeof result.access_token !== 'string') return false
      // setToken(result.access_token)
      // Cookies.set('laravel_session', result.access_token)
      // localStorage.setItem('access_token', result.access_token)
      // const hydrated = await hydrateStores()
      // localStorage.setItem('isAuthenticated', hydrated.toString())
      // isAuthenticated.value = hydrated
      // socketStore.dispatchSocketConnect()
      // console.log('user hydrated ? ', hydrated)
      // setTimeout(() => {
      //   console.log('delaying 5k to watch loading')
      //   router.push('/home')
      //   stopLoading()
      // }, 5000)
      return true
    }
    // async dispatchSetUserCurrency(currency:string) {
    const dispatchSetUserCurrency = async (currency: string) => {
      // this.setSuccess(false);
      const route: string = NETWORK.PERSONAL_INFO_PAGE.SET_USER_CURRENCY
      const network: Network = Network.getInstance()
      // response call back function
      const next = (response: any) => {
        if (response.code == 200) {
          setSuccess(true)
        } else {
          setErrorMessage(handleException(response.code))
        }
      }
      await network.sendMsg(route, { currency_type: currency }, next, 1)
    }
    const dispatchUserBalance = async () => {
      setSuccess(false)
      const route: string = NETWORK.PERSONAL_INFO_PAGE.USER_BALANCE
      const network: Network = Network.getInstance()
      // response call back function
      const next = (response: GetUserBalanceResponseData) => {
        if (response.code == 200) {
          setSuccess(true)
          setUserBalance(response.data)
        } else {
          setErrorMessage(handleException(response.code))
        }
      }
      await network.sendMsg(route, {}, next, 1, 4)
    }
    const login2 = async (msg: SignIn.SigninRequestData) => {
      const notificationStore = useNotificationStore()
      setSuccess(false)
      const route: string = NETWORK.LOGIN.LOGIN
      const network: Network = Network.getInstance()

      // response call back function
      console.log(route)
      console.log(msg)
      const next = (response: SignIn.GetSigninResponseData) => {
        console.log(response)
        if (response.code == 200) {
          Cookies.set('laravel_session', response.token)
          Cookies.set('token', response.token)
          setToken(response.token)
          setUserInfo(response.user)
          setSuccess(true)
        } else {
          console.log(response.code)
          notificationStore.addNotification(handleException(response.code), 'error')
          setErrorMessage(handleException(response.code))
        }
      }
      await network.sendMsg(route, msg, next, 2)
    }
    const dispatchSignout = async (): Promise<void> => {
      removeToken()
    }

    return {
      dispatchSignout,
      currentUser,
      setUserGameStat,
      dispatchUserBalance,
      token,
      updateCurrentUserBalance,
      roles,
      setUserInfo,
      register,
      getUserBalance,
      dispatchSetUserCurrency,
      login,
      // username,
      login2,
      setToken,
      updateInfo,
      percentOfVipLevel,
      changeRoles,
      resetToken,
      isAuthenticated,
    }
  },
  {
    persist: true,
  },
)

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useUserStoreOutside() {
  return useUserStore(store)
}
import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import type * as Vip from '@/interface/vip'
// import { i18n } from '@/locale/index' // Assuming this path is correct and i18n is initialized
import { Network } from '@/net/Network'
import { NETWORK } from '@/net/NetworkCfg'
// import * as Toast from "vue-toastification/dist/index.mjs"; // Replaced with Nuxt UI useToast if applicable
import { handleException } from './exception' // Assuming this path is correct

// Assuming SuccessIcon and WarningIcon are available or replaced by Nuxt UI icons
// import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
// import WarningIcon from "@/components/global/notification/WarningIcon.vue";

// If using Nuxt UI Pro, you would use:
// import { useI18n } from 'vue-i18n'
// const toast = useToast();

export const useVipStore = defineStore('vip', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const levelUpDialogVisible = ref(false)
  const vipInfo = ref<Vip.VipInfo>({} as Vip.VipInfo) // Keeping type assertion as in original
  const vipLevels = ref<Array<Vip.VipLevel>>([])
  const vipTasks = ref<Array<Vip.VipTaskItem>>([])
  const vipRebateHistory = ref<Vip.VipRebateHistoryData>({
    total: 0,
    list: [],
  })
  const vipLevelRewardHistory = ref<Vip.VipLevelRewardHistoryData>({
    total: 0,
    list: [],
  })
  const vipTimesHistory = ref<Vip.VipTimesHistoryData>({
    total: 0,
    list: [],
  })
  const vipSignIn = ref<Vip.VipSignInData>({
    award: [],
    signin_day: 0,
    is_signin: 0,
    limited_bet: 0,
    limited_deposit: 0,
    vip_level: 0,
  })
  const vipLevelUpList = ref<Vip.VipLevelUpListData>({} as Vip.VipLevelUpListData) // Keeping type assertion as in original
  const vipLevelUpReceive = ref<Vip.VipLevelUpReceiveData>({} as Vip.VipLevelUpReceiveData) // Keeping type assertion as in original
  const vipNavBarToggle = ref(localStorage.getItem('vipBar') || '') // Initialize from localStorage
  const vipCycleawardList = ref<Vip.VipCycleawardListData>({} as Vip.VipCycleawardListData) // Keeping type assertion as in original
  const vipLevelAward = ref<Vip.VipLevelAwardData>({} as Vip.VipLevelAwardData) // Keeping type assertion as in original
  const vipBetawardList = ref<Vip.vipBetawardListData>({} as Vip.vipBetawardListData) // Keeping type assertion as in original

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getVipInfo = computed(() => vipInfo.value)
  const getVipLevels = computed(() => vipLevels.value)
  const getVipTasks = computed(() => vipTasks.value)
  const getVipRebateHistory = computed(() => vipRebateHistory.value)
  const getVipLevelRewardHistory = computed(() => vipLevelRewardHistory.value)
  const getVipTimesHistory = computed(() => vipTimesHistory.value)
  const getVipSignIn = computed(() => vipSignIn.value)
  const getLevelUpDialogVisible = computed(() => levelUpDialogVisible.value)
  const getVipLevelUpList = computed(() => vipLevelUpList.value)
  const getVipLevelUpReceive = computed(() => vipLevelUpReceive.value)
  const getVipNavBarToggle = computed(() => vipNavBarToggle.value)
  const getVipCycleawardList = computed(() => vipCycleawardList.value)
  const getVipLevelAward = computed(() => vipLevelAward.value)
  const getVipBetawardList = computed(() => vipBetawardList.value)

  // const { t } = useI18n()

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setVipInfo = (info: Vip.VipInfo) => {
    vipInfo.value = info
  }

  const setVipLevels = (levels: Array<Vip.VipLevel>) => {
    vipLevels.value = levels
  }

  const setVipTasks = (tasks: Array<Vip.VipTaskItem>) => {
    vipTasks.value = tasks
  }

  const setVipRebateHistory = (history: Vip.VipRebateHistoryData) => {
    vipRebateHistory.value = history
  }

  const setVipLevelRewardHistory = (history: Vip.VipLevelRewardHistoryData) => {
    vipLevelRewardHistory.value = history
  }

  const setVipTimesHistory = (history: Vip.VipTimesHistoryData) => {
    vipTimesHistory.value = history
  }

  const setVipSignIn = (signInData: Vip.VipSignInData) => {
    vipSignIn.value = signInData
  }

  const setLevelUpDialogVisible = (visible: boolean) => {
    levelUpDialogVisible.value = visible
  }

  const setVipLevelUpList = (list: Vip.VipLevelUpListData) => {
    vipLevelUpList.value = list
  }

  const setVipLevelUpReceive = (receiveData: Vip.VipLevelUpReceiveData) => {
    vipLevelUpReceive.value = receiveData
  }

  const setVipNavBarToggle = (toggle: string) => {
    vipNavBarToggle.value = toggle
    localStorage.setItem('vipBar', toggle) // Update localStorage
  }

  // Storing periodic rewards  存储周期性奖励
  const setVipCycleawardList = (list: Vip.VipCycleawardListData) => {
    vipCycleawardList.value = list
  }

  // Storage level related rewards  存储等级相关奖励
  const setVipLevelAward = (awardData: Vip.VipLevelAwardData) => {
    vipLevelAward.value = awardData
  }

  // Storage coding rebate  存储打码返利
  const setVipBetawardList = (list: Vip.vipBetawardListData) => {
    vipBetawardList.value = list
  }

  // Reward collection prompt information  奖励领取提示信息
  const alertMessage = (successMessage: Vip.SuccessMessageParams, message?: string) => {
    // If using Nuxt UI Pro, uncomment and use toast:
    // toast.add({
    //     title: successMessage.message,
    //     icon: successMessage.type == 1 ? 'i-heroicons-check-circle' : 'i-heroicons-exclamation-circle', // Example icons
    //     color: successMessage.type == 1 ? 'green' : 'red',
    //     timeout: 3000,
    // });
    // Otherwise, implement your custom notification logic here
    const text = message || successMessage.message
    console.log('Alert Message:', text, 'Type:', successMessage.type) // Placeholder
  }

  // Get VIP check-in content
  async function dispatchVipSignIn() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_SIGNIN
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipSignInResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipSignIn(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  async function dispatchVipSigninawardReceive() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_SIGNINAWARD_RECEIVE
    const network: Network = Network.getInstance()

    const next = (response: any) => {
      // Note: response type is 'any' in original
      if (response.code == 200) {
        setSuccess(true)
        dispatchVipSignIn() // Call the action
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  // Receive VIP sign-in rewards
  async function dispatchVipSignInReward() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_SIGNIN_REWARDS
    const network: Network = Network.getInstance()

    const next = (response: any) => {
      // Note: response type is 'any' in original
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  // user vip information api
  async function dispatchVipInfo() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_INFO
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipInfoResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipInfo(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // user vip level api
  async function dispatchVipLevels() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_LEVEL
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipLevels(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // user vip task api
  async function dispatchVipTasks() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_TASKS
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipTaskResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipTasks(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // receive VIP code rebate rewards
  async function dispatchVipRebateAward(data: any) {
    // Keeping 'any' type as in original
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_REBATE_AWARD
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipRebateAwardResponse) => {
      if (response.code == 200) {
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // get vip coding record
  async function dispatchVipRebateHistory(data: Vip.VipRebateHistoryRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_REBATE_HISTORY
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipRebateHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipRebateHistory(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Obtain VIP level reward record
  async function dispatchVipLevelRewardHistory(data: Vip.VipLevelRewardHistoryRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_LEVEL_AWARD_HISTORY
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelRewardHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipLevelRewardHistory(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Get VIP weekly and monthly reward records
  async function dispatchVipTimesHistory(data: Vip.VipTimesHistoryRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_TIMES_HISTORY
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipTimesHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipTimesHistory(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Get VIP upgrade reward information
  async function dispatchVipLevelUpList() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_LEVELUP_LIST
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelUpListResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipLevelUpList(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // Receive VIP upgrade rewards
  async function dispatchVipLevelUpReceive() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.VIP_LEVELUP_RECEIVE
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelUpReceiveResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setVipLevelUpReceive(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1)
  }

  /**
   * Get periodic rewards  获取周期性奖励
   */
  async function dispatchVipCycleawardList() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_CYCLEAWARD_LIST
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        setVipCycleawardList(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  /**
   * Receive periodic rewards  领取周期性奖励
   * @param data Reward type 1: Member day 2: Daily reward 3: Weekly reward 4: Monthly reward
   * @param data 领取奖励类型 1: 会员日 2: 日奖励 3:周奖励 4: 月奖励
   */
  async function dispatchVipCycleawardReceive(data: Vip.VipCycleawardReceiveRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_CYCLEAWARD_RECEIVE
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        alertMessage(
          {
            type: 1,
            message: '',
          },
          'reward.success_text',
        )
        dispatchVipCycleawardList() // Call the action
      } else {
        setErrorMessage(handleException(response.code))
        alertMessage(
          {
            type: 0,
            message: '',
          },
          response.message,
        )
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  /**
   * Get level-related rewards  获取等级相关奖励
   */
  async function dispatchVipLevelAward() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_LEVELAWARD_LIST
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        setVipLevelAward(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  /**
   * Receive level-related rewards  领取等级相关奖励
   * @param data Reward type 5: Upgrade reward 6: Upgrade reward
   * @param data 领取奖励类型 5: 升级奖励 6: 升段奖励
   */
  async function dispatchVipLevelAwardReceive(data: Vip.VipLevelAwardReceiveRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_LEVELAWARD_RECEIVE
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        alertMessage(
          {
            type: 1,
            message: '',
          },
          'reward.success_text',
        )
        dispatchVipLevelAward() // Call the action
      } else {
        setErrorMessage(handleException(response.code))
        alertMessage(
          {
            type: 0,
            message: '',
          },
          response.message,
        )
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  /**
   * Get coding rebates  获取打码返利
   */
  async function dispatchVipBetawardList() {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_BETAWARD_LIST
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        setVipBetawardList(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  /**
   * Get coding rebates  领取打码返利
   * @param data Reward type 7: Coding rewards
   * @param data 领取奖励类型 7: 打码奖励
   */
  async function dispatchVipBetawardReceive(data: Vip.VipBetawardReceiveRequest) {
    setSuccess(false)
    const route: string = NETWORK.VIP_INFO.USER_VIP_BETAWARD_RECEIVE
    const network: Network = Network.getInstance()

    const next = (response: Vip.GetVipLevelAwardResponse) => {
      // Note: response type is Vip.GetVipLevelAwardResponse in original, check if correct
      if (response.code == 200) {
        setSuccess(true)
        alertMessage(
          {
            type: 1,
            message: '',
          },
          'reward.success_text',
        )
        dispatchVipBetawardList() // Call the action
      } else {
        setErrorMessage(handleException(response.code))
        alertMessage(
          {
            type: 0,
            message: '',
          },
          response.message,
        )
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    levelUpDialogVisible,
    vipInfo,
    vipLevels,
    vipTasks,
    vipRebateHistory,
    vipLevelRewardHistory,
    vipTimesHistory,
    vipSignIn,
    vipLevelUpList,
    vipLevelUpReceive,
    vipNavBarToggle,
    vipCycleawardList,
    vipLevelAward,
    vipBetawardList,

    getSuccess,
    getErrMessage,
    getVipInfo,
    getVipLevels,
    getVipTasks,
    getVipRebateHistory,
    getVipLevelRewardHistory,
    getVipTimesHistory,
    getVipSignIn,
    getLevelUpDialogVisible,
    getVipLevelUpList,
    getVipLevelUpReceive,
    getVipNavBarToggle,
    getVipCycleawardList,
    getVipLevelAward,
    getVipBetawardList,

    setSuccess,
    setErrorMessage,
    setVipInfo,
    setVipLevels,
    setVipTasks,
    setVipRebateHistory,
    setVipLevelRewardHistory,
    setVipTimesHistory,
    setVipSignIn,
    setLevelUpDialogVisible,
    setVipLevelUpList,
    setVipLevelUpReceive,
    setVipNavBarToggle,
    setVipCycleawardList,
    setVipLevelAward,
    setVipBetawardList,
    alertMessage,
    dispatchVipSignIn,
    dispatchVipSigninawardReceive,
    dispatchVipSignInReward,
    dispatchVipInfo,
    dispatchVipLevels,
    dispatchVipTasks,
    dispatchVipRebateAward,
    dispatchVipRebateHistory,
    dispatchVipLevelRewardHistory,
    dispatchVipTimesHistory,
    dispatchVipLevelUpList,
    dispatchVipLevelUpReceive,
    dispatchVipCycleawardList,
    dispatchVipCycleawardReceive,
    dispatchVipLevelAward,
    dispatchVipLevelAwardReceive,
    dispatchVipBetawardList,
    dispatchVipBetawardReceive,
  }
})

export const useWithdrawStore = defineStore('withdraw', () => {
  // State properties converted to reactive references
  const success = ref(false)
  const errMessage = ref('')
  const withdrawConfig = ref<any>({}) // Keeping 'any' type as in original
  const withdrawSubmit = ref<any>({}) // Keeping 'any' type as in original
  const withdrawHistoryItem = ref<Withdraw.WithdrawalHistoryResponse>({
    total_pages: 0,
    record: [],
  })

  // Getters converted to computed properties
  const getSuccess = computed(() => success.value)
  const getErrMessage = computed(() => errMessage.value)
  const getWithdrawCfg = computed(() => withdrawConfig.value)
  const getWithdrawSubmit = computed(() => withdrawSubmit.value)
  const getWithdrawHistoryItem = computed(() => withdrawHistoryItem.value)

  // Actions converted to regular functions
  const setSuccess = (isSuccess: boolean) => {
    success.value = isSuccess
  }

  const setErrorMessage = (message: string) => {
    errMessage.value = message
  }

  const setWithdrawCfg = (config: any) => {
    // Keeping 'any' type as in original
    withdrawConfig.value = config
  }

  const setWithdrawSubmit = (submit: any) => {
    // Keeping 'any' type as in original
    withdrawSubmit.value = submit
  }

  const setWithdrawHistoryItem = (item: Withdraw.WithdrawalHistoryResponse) => {
    // Concatenate records as in original
    withdrawHistoryItem.value.record = [...withdrawHistoryItem.value.record, ...item.record]
    withdrawHistoryItem.value.total_pages = item.total_pages
  }

  // user withdraw configuration
  const dispatchUserWithdrawCfg = async () => {
    setSuccess(false)
    const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_CONFIG
    const network: Network = Network.getInstance()

    const next = (response: Withdraw.GetWithdrawResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setWithdrawCfg(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, {}, next, 1, 4)
  }

  // user withdraw submit
  const dispatchUserWithdrawSubmit = async (data: Withdraw.WithdrawItem) => {
    setSuccess(false)
    const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_SUBMIT
    const network: Network = Network.getInstance()

    const next = (response: Withdraw.SubmitWithdrawResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setWithdrawSubmit(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // user withdrawal history api response
  const dispatchWithdrawalHistory = async (data: any) => {
    // Keeping 'any' type as in original
    setSuccess(false)
    const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_HISTORY
    const network: Network = Network.getInstance()

    const next = (response: Withdraw.GetWithdrawalHistoryResponse) => {
      if (response.code == 200) {
        setSuccess(true)
        setWithdrawHistoryItem(response.data)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // user withdrawal refund api response
  const dispatchWithdrawalRefund = async (data: any) => {
    // Keeping 'any' type as in original
    setSuccess(false)
    const route: string = NETWORK.WITHDRAW_PAGE.WITHDRAWAL_REFUND
    const network: Network = Network.getInstance()

    const next = (response: Withdraw.GetWithdrawalHistoryResponse) => {
      // Note: response type is GetWithdrawalHistoryResponse in original, check if correct
      if (response.code == 200) {
        // Manually update the status in the existing history record
        withdrawHistoryItem.value.record.forEach((item: Withdraw.WithdrawalHistoryItem) => {
          if (item.id == data.id) {
            item.status = 3 // Assuming status 3 means refunded based on original logic
          }
        })
        setSuccess(true)
      } else {
        setErrorMessage(handleException(response.code))
      }
    }
    await network.sendMsg(route, data, next, 1)
  }

  // Return all state, getters, and actions
  return {
    success,
    errMessage,
    withdrawConfig,
    withdrawSubmit,
    withdrawHistoryItem,

    getSuccess,
    getErrMessage,
    getWithdrawCfg,
    getWithdrawSubmit,
    getWithdrawHistoryItem,

    setSuccess,
    setErrorMessage,
    setWithdrawCfg,
    setWithdrawSubmit,
    setWithdrawHistoryItem,
    dispatchUserWithdrawCfg,
    dispatchUserWithdrawSubmit,
    dispatchWithdrawalHistory,
    dispatchWithdrawalRefund,
  }
})
