import {
  Ref,
  ref,
  toValue,
  computed,
  onMounted,
  onBeforeUnmount,
  MaybeRefOrGetter,
  watch,
  provide,
} from 'vue-demi'
import { INJECT_CLIENT, INJECT_CLIENT_STATUS } from '../utils/keys.util'
import { WebSocketStatus } from '@vueuse/core'
import { CashflowClient, CashflowClientOptions } from '../../client/CashflowClient'

export type UserCashflowOptions = MaybeRefOrGetter<Partial<CashflowClientOptions>>

export type UseCashflowReturn = {
  data: Ref<any>
  status: Ref<WebSocketStatus>
  error: Ref<string | undefined>
  connect: () => void
  disconnect: () => void
  client: Ref<CashflowClient | undefined>
}

export function useCashflow(options: UserCashflowOptions): UseCashflowReturn {
  const _options = computed<Partial<CashflowClientOptions>>(() =>
    typeof options === 'function' ? options() : toValue(options),
  )
  const _optionsChanged = ref(false)
  watch(_options, () => (_optionsChanged.value = true), {
    deep: true,
    immediate: true,
  })

  const data = ref()
  const status = ref<WebSocketStatus>('CLOSED')
  const error = ref<string>()
  const clientRef = ref<CashflowClient>()

  function onConnect(data: any) {
    status.value = 'OPEN'
    error.value = undefined
    let cb = toValue(_options.value).onConnect
    cb?.(data)
  }

  function onDisconnect() {
    status.value = 'CLOSED'
    let cb = toValue(_options.value).onDisconnect
    cb?.()
  }

  function onError(err: Error) {
    error.value = err?.message ?? 'Unkown Error'
    status.value = 'CLOSED'
    let cb = toValue(_options.value).onError
    cb?.(err)
  }

  function onData(payload: any) {
    data.value = payload
    let cb = toValue(_options.value).onData
    cb?.(payload)
  }

  async function connect() {
    await disconnect()
    status.value = 'CONNECTING'
    if (_optionsChanged.value) {
      await _init(true)
    } else {
      await clientRef.value?.connect()
    }
  }

  async function disconnect() {
    if (!clientRef.value) return
    try {
      clientRef.value.disconnect()
    } catch (e) {
      console.error(e)
    }
    status.value = 'CLOSED'
  }

  let _client: CashflowClient | undefined
  const _clientHandler = {
    get(target: CashflowClient, prop: string, receiver: any) {
      // Make sure we always force a full disconnect before reconnecting
      if (prop === 'connect') {
        return async () => {
          try {
            await target.disconnect()
            status.value = 'CONNECTING'
            await target.connect()
          } catch (e) {}
        }
      }
      return Reflect.get(target, prop, receiver)
    },
  }

  async function _init(immediate: boolean = false) {
    if (clientRef.value) {
      await disconnect()
      clientRef.value = undefined
    }
    console.debug('Initializing Streamer.bot Client...')

    if (immediate) status.value = 'CONNECTING'

    _client = new Proxy(
      new CashflowClient({
        scheme: toValue(_options.value.scheme) || 'ws',
        host: toValue(_options.value.host) || '127.0.0.1',
        port: toValue(_options.value.port) || 3000,
        token: toValue(_options.value.token),
        endpoint: toValue(_options.value.endpoint) || '/',
        password: toValue(_options.value.password) || '',
        immediate: immediate,
        subscribe: toValue(_options.value.subscribe),
        autoReconnect: toValue(_options.value.autoReconnect) ?? true,
        retries: toValue(_options.value.retries) ?? -1,
        onConnect,
        onDisconnect,
        onError,
        onData,
      }),
      _clientHandler,
    )
    clientRef.value = _client
    _optionsChanged.value = false
  }

  provide(INJECT_CLIENT, clientRef)
  provide(INJECT_CLIENT_STATUS, status)

  onMounted(() => {
    _init(!!toValue(_options.value)?.immediate)
  })

  onBeforeUnmount(() => {
    disconnect()
  })

  return {
    data,
    status,
    error,
    connect,
    disconnect,
    client: clientRef,
  }
}
