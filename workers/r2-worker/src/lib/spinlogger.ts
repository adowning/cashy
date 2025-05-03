//@ts-nocheck

// import type { Spin } from '../../types/supabase'
// import * as flatten from 'flatten'

const knownKeys = [
  'balance_cash',
  'bonus_afterBet',
  'bonus_atEnd',
  'bonus_atStart',
  'bonuses',
  'canGamble',
  'cash_afterBet',
  'cash_atEnd',
  'cash_atStart',
  'features',
  'freeBets_afterBet',
  'freeBets_atEnd',
  'freeBets_atStart',
  'gameName',
  'hasState',
  'limits_betThresholdTime',
  'multiplier',
  'reelsBuffer',
  'result_bonusChance',
  'result_jackpots',
  'roundId',
  'scatters',
  'session_net_position',
  'serverTime',
  'spinMode',
  'stake',
  'token',
  'userId',
  'ways_0',
  'ways_1',
  'ways_2',
  'ways_3',
  'ways_4',
  'ways_5',
  'win_lines',
  'win_respin',
  'win_total',
  'winLines',
  'winsMultipliers_lines',
  'winsMultipliers_respin',
  'winsMultipliers_total',
]
function isBuffer(obj: { constructor: { isBuffer: (arg0: any) => any } }) {
  return (
    obj &&
    obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  )
}

function keyIdentity(key: any) {
  return key
}

export function flatten(target: any, opts?: number) {
  opts = opts || {}

  const delimiter = opts.delimiter || '.'
  const maxDepth = opts.maxDepth
  const transformKey = opts.transformKey || keyIdentity
  const output = {}

  function step(
    object: { [x: string]: any },
    prev: undefined,
    currentDepth: number | undefined,
  ) {
    currentDepth = currentDepth || 1
    Object.keys(object).forEach(function (key) {
      const value = object[key]
      const isarray = opts.safe && Array.isArray(value)
      const type = Object.prototype.toString.call(value)
      const isbuffer = isBuffer(value)
      const isobject = type === '[object Object]' || type === '[object Array]'

      const newKey = prev
        ? prev + delimiter + transformKey(key)
        : transformKey(key)

      if (
        !isarray &&
        !isbuffer &&
        isobject &&
        Object.keys(value).length &&
        (!opts.maxDepth || currentDepth < maxDepth)
      ) {
        return step(value, newKey, currentDepth + 1)
      }

      output[newKey] = value
    })
  }

  step(target)

  return output
}

export function unflatten(
  target: { [x: string]: any },
  opts: { delimiter?: any; overwrite?: any; transformKey?: any; object?: any },
) {
  opts = opts || {}

  const delimiter = opts.delimiter || '.'
  const overwrite = opts.overwrite || false
  const transformKey = opts.transformKey || keyIdentity
  const result = {}

  const isbuffer = isBuffer(target)
  if (
    isbuffer ||
    Object.prototype.toString.call(target) !== '[object Object]'
  ) {
    return target
  }

  // safely ensure that the key is
  // an integer.
  function getkey(key: unknown) {
    const parsedKey = Number(key)

    return isNaN(parsedKey) || key.indexOf('.') !== -1 || opts.object
      ? key
      : parsedKey
  }

  function addKeys(
    keyPrefix: string,
    recipient: null,
    target: { [x: string]: any },
  ) {
    return Object.keys(target).reduce(function (result, key) {
      result[keyPrefix + delimiter + key] = target[key]

      return result
    }, recipient)
  }

  function isEmpty(val: string | any[]) {
    const type = Object.prototype.toString.call(val)
    const isArray = type === '[object Array]'
    const isObject = type === '[object Object]'

    if (!val) {
      return true
    } else if (isArray) {
      return !val.length
    } else if (isObject) {
      return !Object.keys(val).length
    }
  }

  target = Object.keys(target).reduce(function (result, key) {
    const type = Object.prototype.toString.call(target[key])
    const isObject = type === '[object Object]' || type === '[object Array]'
    if (!isObject || isEmpty(target[key])) {
      result[key] = target[key]
      return result
    } else {
      return addKeys(key, result, flatten(target[key], opts))
    }
  }, {})

  Object.keys(target).forEach(function (key) {
    const split = key.split(delimiter).map(transformKey)
    let key1 = getkey(split.shift())
    let key2 = getkey(split[0])
    let recipient = result

    while (key2 !== undefined) {
      if (key1 === '__proto__') {
        return
      }

      const type = Object.prototype.toString.call(recipient[key1])
      const isobject = type === '[object Object]' || type === '[object Array]'

      // do not write over falsey, non-undefined values if overwrite is false
      if (!overwrite && !isobject && typeof recipient[key1] !== 'undefined') {
        return
      }

      if ((overwrite && !isobject) || (!overwrite && recipient[key1] == null)) {
        recipient[key1] = typeof key2 === 'number' && !opts.object ? [] : {}
      }

      recipient = recipient[key1]
      if (split.length > 0) {
        key1 = getkey(split.shift())
        key2 = getkey(split[0])
      }
    }

    // unflatten again for 'messy objects'
    recipient[key1] = unflatten(target[key], opts)
  })

  return result
}
// function flattenx(list: any[], depth: number) {
//   depth = typeof depth === 'number' ? depth : Infinity

//   function coreFlatten(list: any[], d: number): any {
//     return list.reduce(function (acc, item) {
//       if (Array.isArray(item) && d < depth) {
//         return acc.concat(coreFlatten(item, d + 1))
//       }
//       return acc.concat(item)
//     }, [])
//   }

//   if (depth > 0) {
//     return coreFlatten(list, 1)
//   }
//   if (Array.isArray(list)) {
//     return list.slice()
//   }
//   return list
// }
export function logSpinInit(
  gameResultFromDeveloper: any,
  // supabase: any,
  // gameName: string,
  // userId: string,
): string {
  try {
    gameResultFromDeveloper.result.user['coins.cash.atStart'] =
      gameResultFromDeveloper.result.user.balance.cash.atStart
    gameResultFromDeveloper.result.user['coins.cash.afterBet'] =
      gameResultFromDeveloper.result.user.balance.cash.afterBet
    gameResultFromDeveloper.result.user['coins.cash.atEnd'] =
      gameResultFromDeveloper.result.user.balance.cash.atEnd
    gameResultFromDeveloper.result.user['coins.freeBets.atStart'] =
      gameResultFromDeveloper.result.user.balance.freeBets.atStart
    gameResultFromDeveloper.result.user['coins.freeBets.afterBet'] =
      gameResultFromDeveloper.result.user.balance.freeBets.afterBet
    gameResultFromDeveloper.result.user['coins.freeBets.atEnd'] =
      gameResultFromDeveloper.result.user.balance.freeBets.atEnd
    gameResultFromDeveloper.result.user['coins.bonus.atStart'] =
      gameResultFromDeveloper.result.user.balance.bonus.atStart
    gameResultFromDeveloper.result.user['coins.bonus.afterBet'] =
      gameResultFromDeveloper.result.user.balance.bonus.afterBet
    gameResultFromDeveloper.result.user['coins.bonus.atEnd'] =
      gameResultFromDeveloper.result.user.balance.bonus.atEnd
    gameResultFromDeveloper.result.user['coins.sessionCash.atStart'] =
      gameResultFromDeveloper.result.user.balance.sessionCash.atStart
    gameResultFromDeveloper.result.user['coins.sessionCash.afterBet'] =
      gameResultFromDeveloper.result.user.balance.sessionCash.afterBet
    gameResultFromDeveloper.result.user['coins.sessionCash.atEnd'] =
      gameResultFromDeveloper.result.user.balance.sessionCash.atEnd
    gameResultFromDeveloper.result.user['coins.sessionFreeBets.atStart'] =
      gameResultFromDeveloper.result.user.balance.sessionFreeBets.atStart
    gameResultFromDeveloper.result.user['coins.sessionFreeBets.afterBet'] =
      gameResultFromDeveloper.result.user.balance.sessionFreeBets.afterBet
    gameResultFromDeveloper.result.user['coins.sessionFreeBets.atEnd'] =
      gameResultFromDeveloper.result.user.balance.sessionFreeBets.atEnd
    gameResultFromDeveloper.result.user['limits.betThresholdTime'] =
      gameResultFromDeveloper.result.user.limits.betThresholdTime
    gameResultFromDeveloper.result.game['win.total'] =
      gameResultFromDeveloper.result.game.win.total

    return gameResultFromDeveloper
  } catch (e: any) {
    console.error('error logging spin')
    console.error(e.message)
  }
  return gameResultFromDeveloper
}
export async function logSpin(
  gameResultFromDeveloper: any,
  supabase: any,
  gameName: string,
  userId: string,
) {
  try {
    const winlines = gameResultFromDeveloper.result.game.winLines
    const reelsBuffer = gameResultFromDeveloper.result.game.reelsBuffer
    const lockedTiles = gameResultFromDeveloper.result.game.lockedTiles
    const lightningLinks = gameResultFromDeveloper.result.game.lightningLinks
    const randomWilds = gameResultFromDeveloper.result.game.randomWilds

    delete gameResultFromDeveloper.result.game.winLines
    delete gameResultFromDeveloper.result.game.reelsBuffer
    delete gameResultFromDeveloper.result.game.lockedTiles
    delete gameResultFromDeveloper.result.game.lightningLinks
    delete gameResultFromDeveloper.result.game.randomWilds
    delete gameResultFromDeveloper.result.user.balance.freeBets
    delete gameResultFromDeveloper.result.user.balance.sessionCash.atStart
    delete gameResultFromDeveloper.result.user.balance.sessionCash.atEnd
    delete gameResultFromDeveloper.result.user.balance.sessionCash.afterBet
    delete gameResultFromDeveloper.result.user.balance.sessionFreeBets
    delete gameResultFromDeveloper.result.user.balance.bonus
    delete gameResultFromDeveloper.result.user.bonus
    delete gameResultFromDeveloper.result.user.vouchers
    delete gameResultFromDeveloper.result.user.messages
    delete gameResultFromDeveloper.result.user.tournaments
    delete gameResultFromDeveloper.result.game.respin
    delete gameResultFromDeveloper.result.game.chainReactor

    const flat: any = flatten(gameResultFromDeveloper)

    Object.keys(flat).forEach((key: string) => {
      let nkey = key.replace('result.user.', '')
      nkey = nkey.replace('result.game.', '')
      nkey = nkey.replace('coins.', '')
      nkey = nkey.replace('coins.', '')
      nkey = nkey.replace('coins.', '')
      nkey = nkey.replace('.', '_')
      nkey = nkey.replace('.', '_')
      nkey = nkey.replace('result_transactions_', '')

      Object.defineProperty(
        flat,
        nkey,

        // @ts-expect-error
        Object.getOwnPropertyDescriptor(flat, key),
      )
      delete flat[key]
    })

    // eslint-disable-next-line prefer-const
    for (let [key, value] of Object.entries(flat)) {
      if (
        key.includes('_at') ||
        key.includes('_af') ||
        key.includes('win') ||
        key === 'sessionNetPosition' ||
        key === 'stake'
      ) {
        if (key === 'sessionNetPosition') key = 'session_net_position'

        // @ts-expect-error
        const f = Math.round(value * 100) / 100

        flat[key] = f
      }

      if (key.includes('sessionId')) delete flat[key]
      if (value === undefined) flat[key] = null
    }

    flat['userId'] = userId
    if (winlines !== undefined) flat['winLines'] = winlines
    if (reelsBuffer !== undefined) flat['reelsBuffer'] = reelsBuffer
    if (lockedTiles !== undefined) flat['lockedTiles'] = lockedTiles
    if (lightningLinks !== undefined) flat['lightningLinks'] = lightningLinks
    if (randomWilds !== undefined) flat['randomWilds'] = randomWilds

    flat.gameName = gameName

    const misc: any[] = []
    for (const [key, value] of Object.entries(flat)) {
      if (!knownKeys.includes(key)) {
        misc.push({ key, value })

        delete flat[key]
      }
    }
    flat.stake = flat.stake * 100
    flat.misc = misc

    const value: Spin = flat
    console.log(value)
    // const { error: errorx } = await supabase
    //   .from('spins')
    //   .insert(value)
    //   .select()
    // if (errorx) {
    //   console.log('value')
    //   console.log(value)
    //   console.error(errorx)
    // }
  } catch (e: any) {
    console.error('error logging spin')
    console.error(e.message)
  }
}
{
  // { "success": true, "result": { "transactions": { "roundId": 72383333 }, "user": { "balance": { "cash": 156340, "sessionCash": { } }, "canGamble": false, "userId": 2154636, "sessionId": "0", "sessionNetPosition": "-2.00", "token": "f82f0535cf40c128ffa9aac83b21f18cc77c12d8e7a2f06fb039064461d09665146fa4a32b4ef18b16a1612b823badaa1ab18d211881c2e1832dc63e250caa37", "bonuses": [], "limits": { "betThresholdTime": 923 }, "serverTime": "2024-01-20 23:34:21", "coins.cash.atStart": "100.00", "coins.cash.afterBet": "98.00", "coins.cash.atEnd": "98.00", "coins.freeBets.atStart": "0.00", "coins.freeBets.afterBet": "0.00", "coins.freeBets.atEnd": "0.00", "coins.bonus.atStart": "0.00", "coins.bonus.afterBet": "0.00", "coins.bonus.atEnd": "0.00", "coins.sessionCash.atStart": "0.00", "coins.sessionCash.afterBet": "0.00", "coins.sessionCash.atEnd": "0.00", "coins.sessionFreeBets.atStart": "0.00", "coins.sessionFreeBets.afterBet": "0.00", "coins.sessionFreeBets.atEnd": "0.00", "limits.betThresholdTime": 923 }, "game": { "win": { "lines": "0.00", "total": "0.00" }, "winsMultipliers": { "lines": "0.00", "total": "0.00" }, "stake": "2.00", "multiplier": 1, "spinMode": "Normal", "scatters": [], "features": [], "hasState": false, "win.total": "0.00" }, "jackpots": null, "bonusChance": null }, "rtg": { "atStart": "100.00", "afterBet": "98.00", "atEnd": "98.00" } }
}
