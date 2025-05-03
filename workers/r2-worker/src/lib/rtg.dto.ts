import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class RTGSpinDto {
  gameId: string
  custom: {
    siteId: string
    extras: string
  }
  bonusId: any
  extras: any
  siteId: string
  userType: string
  lang: number
  fingerprint: number
  channel: number
  affiliate: number
  userData: {
    userId: number
    affiliate: string
    lang: string
    channel: string
    userType: string
  }
  token: string

  stake: number
  sessionId: string
  playMode: string
}

export class RTGSettingsDto {
  token: string
  gameId: string
  userData: {
    userId: string
    hash: string
    affiliate: string
    lang: string
    channel: string
    userType: string
    fingerprint: string
  }
  custom: {
    siteId: string
    extras: string
  }
}

// export class Currency {
//   @ApiProperty({ example: 'GBP' })
//   code: string

//   @ApiProperty({ example: '£' })
//   symbol: string
// }

// export class Balance {
//   @ApiProperty({ example: '100.00' })
//   cash: string

//   @ApiProperty({ example: '0.00' })
//   freeBets: string

//   @ApiProperty({ example: '0.00' })
//   sessionCash: string

//   @ApiProperty({ example: '0.00' })
//   sessionFreeBets: string

//   @ApiProperty({ example: '0.00' })
//   bonus: string
// }

// export class Limits {
//   @ApiProperty({ example: '10000.00' })
//   maxGambleStake: string

//   @ApiProperty({ example: { total: '42.00' } })
//   maxTotalStake: { total: string }

//   @ApiProperty({ example: { total: '0.20' } })
//   minTotalStake: { total: string }

//   spinDuration: null
// }

// export class Stakes {
//   @ApiProperty({ example: 5 })
//   defaultIndex: number

//   @ApiProperty({ example: 5 })
//   lastIndex: number

//   @ApiProperty({
//     example: [
//       '0.2',
//       '0.4',
//       '0.6',
//       '0.8',
//       '1',
//       '2',
//       '4',
//       '6',
//       '8',
//       '10',
//       '20',
//       '40',
//     ],
//   })
//   types: string[]
// }

// export class Options {
//   @ApiProperty({ example: ['10', '20', '30', '50', '100'] })
//   values: string[]

//   @ApiProperty({ example: 10 })
//   default: number
// }

// export class StopOnFeature {
//   @ApiProperty({ example: true })
//   enabled: boolean
// }

// export class StopOnLossLimits {
//   @ApiProperty({ example: true })
//   mandatory: boolean

//   @ApiProperty({ example: true })
//   enabled: boolean

//   @ApiProperty({
//     example: [
//       '10',
//       '20',
//       '30',
//       '50',
//       '100',
//       '200',
//       '500',
//       '1000',
//       '5000',
//       '10000',
//     ],
//   })
//   values: string[]

//   @ApiProperty({ example: 0 })
//   default: number
// }

// export class StopOnWin {
//   @ApiProperty({ example: true })
//   enabled: boolean

//   @ApiProperty({
//     example: [
//       '10',
//       '20',
//       '30',
//       '50',
//       '100',
//       '200',
//       '500',
//       '1000',
//       '5000',
//       '10000',
//       '50000',
//       '100000',
//     ],
//   })
//   values: string[]
// }

// export class AutoplayOptions {
//   @ApiProperty({ example: 'modal' })
//   type: string

//   @ApiProperty({
//     example: { values: ['10', '20', '30', '50', '100'], default: 10 },
//   })
//   spins: Options

//   @ApiProperty({ example: { enabled: true } })
//   stopOnFeature: StopOnFeature

//   @ApiProperty({
//     example: {
//       mandatory: true,
//       enabled: true,
//       values: [
//         '10',
//         '20',
//         '30',
//         '50',
//         '100',
//         '200',
//         '500',
//         '1000',
//         '5000',
//         '10000',
//       ],
//       default: 0,
//     },
//   })
//   stopOnLossLimits: StopOnLossLimits

//   @ApiProperty({
//     example: {
//       enabled: true,
//       values: [
//         '10',
//         '20',
//         '30',
//         '50',
//         '100',
//         '200',
//         '500',
//         '1000',
//         '5000',
//         '10000',
//         '50000',
//         '100000',
//       ],
//     },
//   })
//   stopOnWin: StopOnWin

//   @ApiProperty({ example: false })
//   hasRestart: boolean
// }

// export class User {
//   @ApiProperty({
//     example: {
//       cash: '100.00',
//       freeBets: '0.00',
//       sessionCash: '0.00',
//       sessionFreeBets: '0.00',
//       bonus: '0.00',
//     },
//   })
//   balance: Balance

//   notifications: any[]

//   messages: any[]

//   bonuses: any[]

//   tournaments: any[]

//   vouchers: any[]

//   @ApiProperty({ example: 6818568 })
//   userId: number

//   @ApiProperty({ example: 'US' })
//   country: string

//   @ApiProperty({ example: 'NONE' })
//   casino: string

//   @ApiProperty({ example: 'Default' })
//   vertical: string

//   @ApiProperty({ example: { code: 'GBP', symbol: '£' } })
//   currency: Currency

//   @ApiProperty({
//     example:
//       'aeaa1e66a5029727675c9e8816ab34bf8aa90385513e8d63426452be578354cc5c7d2f10090185a21b78468ecc82229cd32b6ba46a7a5c8715a5e0202c727c72',
//   })
//   token: string

//   @ApiProperty({ example: '0' })
//   sessionId: string

//   @ApiProperty({ example: '0.00' })
//   sessionNetPosition: string

//   @ApiProperty({ example: null })
//   aamsParticipationId: null

//   @ApiProperty({ example: null })
//   aamsSessionId: null

//   @ApiProperty({ example: '0.00' })
//   depositedAmount: string

//   @ApiProperty({ example: '0.00' })
//   maxDeposit: string

//   @ApiProperty({ example: false })
//   canGamble: boolean

//   @ApiProperty({ example: '0.00' })
//   lastWin: string

//   prevRounds: any[]

//   @ApiProperty({
//     example: {
//       maxGambleStake: '10000.00',
//       maxTotalStake: { total: '42.00' },
//       minTotalStake: { total: '0.20' },
//       spinDuration: null,
//     },
//   })
//   limits: Limits

//   @ApiProperty({
//     example: {
//       defaultIndex: 5,
//       lastIndex: 5,
//       types: [
//         '0.2',
//         '0.4',
//         '0.6',
//         '0.8',
//         '1',
//         '2',
//         '4',
//         '6',
//         '8',
//         '10',
//         '20',
//         '40',
//       ],
//     },
//   })
//   stakes: Stakes

//   @ApiProperty({
//     example: {
//       type: 'modal',
//       options: {
//         spins: { values: ['10', '20', '30', '50', '100'], default: 10 },
//         stopOnFeature: { enabled: true },
//         stopOnLossLimits: {
//           mandatory: true,
//           enabled: true,
//           values: [
//             '10',
//             '20',
//             '30',
//             '50',
//             '100',
//             '200',
//             '500',
//             '1000',
//             '5000',
//             '10000',
//           ],
//           default: 0,
//         },
//         stopOnWin: {
//           enabled: true,
//           values: [
//             '10',
//             '20',
//             '30',
//             '50',
//             '100',
//             '200',
//             '500',
//             '1000',
//             '5000',
//             '10000',
//             '50000',
//             '100000',
//           ],
//         },
//         hasRestart: false,
//       },
//     },
//   })
//   autoplay: AutoplayOptions

//   @ApiProperty({ example: '2024-12-19 09:05:39' })
//   serverTime: string

//   @ApiProperty({ example: null })
//   additional: null
// }

// export class ExtraWin {
//   @ApiProperty({ example: '15.00' })
//   bigWin: string

//   @ApiProperty({ example: '50.00' })
//   superWin: string

//   @ApiProperty({ example: '100.00' })
//   megaWin: string
// }

// export class RTP {
//   @ApiProperty({ example: { default: '95.68' } })
//   game: { default: string }
// }

// export class Game {
//   @ApiProperty({ example: 5 })
//   cols: number

//   @ApiProperty({ example: 4 })
//   rows: number

//   @ApiProperty({ example: 4 })
//   offset: number

//   @ApiProperty({
//     example: { bigWin: '15.00', superWin: '50.00', megaWin: '100.00' },
//   })
//   extraWin: ExtraWin

//   multiplierSequence: any[]

//   lines: number[][]

//   tiles: {
//     id: number
//     type: string
//     pays: string[]
//   }[]

//   reelsBuffer: number[][][]

//   @ApiProperty({ example: 'LTR' })
//   paysType: string

//   featureBuy: any[]

//   @ApiProperty({
//     example: [
//       'FreeSpins',
//       'FreeSpins_expensive',
//       'FreeSpins_normal',
//       'FreeSpins_cheap',
//     ],
//   })
//   features: string[]

//   @ApiProperty({ example: true })
//   singlePayline: boolean

//   @ApiProperty({ example: false })
//   hasState: boolean

//   @ApiProperty({ example: '4.0.1' })
//   version: string

//   @ApiProperty({ example: { game: { default: '95.68' } } })
//   rtp: RTP

//   @ApiProperty({ example: '2.94' })
//   volatilityIndex: string

//   @ApiProperty({ example: '2372.30' })
//   maxMultiplier: string

//   @ApiProperty({ example: '0.003331' })
//   maxWinlineHitRate: string

//   @ApiProperty({ example: '0.003331' })
//   maxMultiplierHitRate: string

//   @ApiProperty({ example: '30021' })
//   maxMultiplierHitFrequency: string

//   @ApiProperty({ example: null })
//   maxMultiplierWinLines: null

//   @ApiProperty({ example: null })
//   maxMultiplierWinLinesHitRate: null

//   @ApiProperty({ example: null })
//   maxMultiplierWinLinesHitFrequency: null

//   @ApiProperty({ example: false })
//   hasGambleGame: boolean

//   @ApiProperty({ example: 'slot' })
//   gameType: string

//   @ApiProperty({ example: true })
//   stateful: boolean

//   @ApiProperty({ example: false })
//   hasChoices: boolean

//   @ApiProperty({ example: 12 })
//   stateExpireDays: number

//   @ApiProperty({ example: false })
//   hasBonuses: boolean

//   @ApiProperty({ example: 0 })
//   pendingRoundDays: number

//   @ApiProperty({ example: null })
//   skin: null

//   @ApiProperty({ example: false })
//   hasFeatureBuy: boolean
// }

// export class Launcher {
//   @ApiProperty({ example: '1.31.2' })
//   version: string
// }

interface UserData {
  balance: {
    cash: {
      atStart: string
      afterBet: string
      atEnd: string
    }
    freeBets: {
      atStart: string
      afterBet: string
      atEnd: string
    }
    bonus: {
      atStart: string
      afterBet: string
      atEnd: string
    }
    sessionCash: {
      atStart: string
      afterBet: string
      atEnd: string
    }
    sessionFreeBets: {
      atStart: string
      afterBet: string
      atEnd: string
    }
  }
  canGamble: boolean
  userId: number
  sessionId: string
  sessionNetPosition: string
  token: string
  bonuses: any[]
  tournaments: any[]
  vouchers: any[]
  messages: any[]
  limits: {
    betThresholdTime: number
  }
  serverTime: string
}

interface GameData {
  win: {
    lines: string
    total: string
  }
  winsMultipliers: {
    lines: string
    total: string
  }
  stake: string
  multiplier: number
  winLines: any[]
  spinMode: string
  fatTiles: any[]
  scatters: any[]
  reelsBuffer: any[][][]
  features: any[]
  hasState: boolean
}

export class RTGSpinResult {
  public 'success': boolean
  public 'result': {
    user: UserData
    game: GameData
  }

  constructor(
    success: boolean,
    result: {
      user: UserData
      game: GameData
    },
  ) {
    this.success = success
    this.result = result
  }

  static async save(spinResult: RTGSpinResult): Promise<void> {
    await prisma.rTGSpinResult.create({
      data: {
        success: spinResult.success,
        result: JSON.stringify(spinResult.result),
        user: JSON.stringify(spinResult.result.user),
        game: JSON.stringify(spinResult.result.game),
      },
    })
  }

  static async find(): Promise<RTGSpinResult[]> {
    const rtgSpinResultDatas = await prisma.rTGSpinResult.findMany()
    return rtgSpinResultDatas.map(
      (result: { success: boolean; result: any; user: any; game: any }) => {
        return {
          success: result.success,
          result: JSON.parse(result.result),
        }
      },
    )
  }
}

export interface SpinResultWithError {
  error: {
    code: number
  }
}
