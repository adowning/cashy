interface User {
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

interface Game {
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

export class SpinResult {
  private 'success': boolean
  private 'result': {
    user: User
    game: Game
  }

  constructor(
    success: boolean,
    result: {
      user: User
      game: Game
    },
  ) {
    this.success = success
    this.result = result
  }
}
