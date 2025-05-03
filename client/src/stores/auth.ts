import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import reactive functions
import { NETWORK_CONFIG } from 'shared/types/NetworkCfg'
import type * as SignIn from 'shared/interface'
import type * as SignUp from 'shared/interface/signup'
import type * as User from 'shared/interface/user'
import type { User as IUser } from 'shared/'
import { Network } from '@/net/Network'
import { NetworkData } from '@/net/NetworkData'
import { Netcfg } from '@/net/NetCfg'
import { handleException } from './exception' // Assuming this path is correct
import { router } from '@/router'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // State properties converted to reactive references
    const success = ref(false)
    const errMessage = ref('')
    const authModalType = ref('')
    const dialogCheckbox = ref(false)
    const authDialogVisible = ref(false)
    const signUpForm = ref(false)
    const nickNameDialogVisible = ref(false)
    const token = ref<string | undefined>(NetworkData.getInstance().getToken())
    const userInfo = ref<IUser>({
      id: '',
      name: '',
      email: '',
      emailVerified: false,
      image: '',
      createdAt: undefined,
      updatedAt: undefined,
      lastDailySpin: undefined,
      twoFactorEnabled: false,
      role: '',
      banned: false,
      banReason: '',
      banExpires: undefined,
      username: '',
      passwordHash: '',
      totalXp: 0,
      balance: 0,
      isVerified: false,
      active: false,
      lastLogin: undefined,
      verificationToken: '',
      avatar: '',
      activeProfileId: '',
      gender: 'BOY',
      status: 'ACTIVE',
      cashtag: '',
      phpId: 0,
      accessToken: '',
      VipInfo: undefined,
      activeProfile: {
        transactions: [],
        id: '',
        balance: 0,
        xpEarned: 0,
        isActive: false,
        lastPlayed: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        phpId: 0,
        userId: '',
        currency: '',
        shopId: '',
      },
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
        id: '',
        name: '',
        email: '',
        emailVerified: false,
        image: '',
        createdAt: undefined,
        updatedAt: undefined,
        twoFactorEnabled: false,
        role: '',
        banned: false,
        banReason: '',
        lastDailySpin: undefined,
        banExpires: undefined,
        username: '',
        passwordHash: '',
        totalXp: 0,
        balance: 0,
        isVerified: false,
        active: false,
        lastLogin: undefined,
        verificationToken: '',
        avatar: '',
        activeProfileId: '',
        gender: 'BOY',
        status: 'ACTIVE',
        cashtag: '',
        phpId: 0,
        accessToken: '',
        VipInfo: undefined,
        activeProfile: {
          transactions: [],
          id: '',
          balance: 0,
          xpEarned: 0,
          isActive: false,
          lastPlayed: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          phpId: 0,
          userId: '',
          currency: '',
          shopId: '',
        },
      }
    }

    const setUserInfo = (info: IUser) => {
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
      const route: string = NETWORK_CONFIG.LOGIN.LOGIN
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
      const route: string = NETWORK_CONFIG.LOGIN.REGISTER
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
      const route: string = NETWORK_CONFIG.PERSONAL_INFO_PAGE.USER_INFO
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
      const route: string = NETWORK_CONFIG.PERSONAL_INFO_PAGE.USER_AMOUNT
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
      const route: string = NETWORK_CONFIG.PERSONAL_INFO_PAGE.USER_CHANGE
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
      const route: string = NETWORK_CONFIG.PERSONAL_INFO_PAGE.USER_EMAIL
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
      const route: string = NETWORK_CONFIG.PERSONAL_INFO_PAGE.USER_PASSWORD
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
      const route: string = NETWORK_CONFIG.PERSONAL_INFO_PAGE.USER_SUSPEND
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
  },
  { persist: true },
)

// export const authStore = useAuthStore()
