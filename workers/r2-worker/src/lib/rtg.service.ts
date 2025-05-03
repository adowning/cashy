import { Injectable } from "@nestjs/common";
import { SpinDataService } from "../spin-data.service";
import { buildJson, buildJsonForSpin } from "./buildjson";
import { RTGSpinDto, RTGSpinResult } from "./rtg.dto";
import { UserService } from "src/modules/user/user.service";
import { PrismaService } from "src/prisma/prisma.service";

const isTesting = <boolean>true;

@Injectable()
export class RtgService {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly spinDataService: SpinDataService,
    protected readonly userService: UserService
  ) {}

  async getSettings(session: any, dataFromClient: any) {
    console.log(dataFromClient);
    const profile = await this.prisma.profile.findUnique({
      // where: { id: 'cm79nl2440007cvy5znxbndw9' },
      where: { id: session.profileId || "cm79nl2440007cvy5znxbndw9" },
      include: { owner: true },
    });
    if (profile === undefined || profile === null)
      throw new Error("Account not found");
    // const init = {
    //   body: JSON.stringify({
    //     token:
    //       '68b622ddc5ea550ef7b99e7898d2f18934fad492015a941aa93b82e0b7040a3ffe401ff0fc76cae1a29d2c9593ab6a623f4b75d8ae878b77c664b308c94dc1bd',
    //     sessionId: '0',
    //     playMode: 'demo',
    //     gameId: dataFromClient.gameName,
    //     userData: {
    //       userId: 'demo-user',
    //       affiliate: '',
    //       lang: 'en',
    //       channel: 'I',
    //       userType: 'U',
    //       fingerprint: 'c474d2e1-a19e-4a40-8d32-58b02b0c1034',
    //       hash: '',

    //       // fingerprint: '5d21efc1-bd63-4bc0-8cae-a61849fe221f2',
    //     },
    //     custom: { siteId: '', extras: '' },
    //   }),
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json;charset=UTF-8',
    //   },
    // }
    let gameSettingsFromDeveloper: any;
    if (isTesting === false) {
      const init = {
        body: JSON.stringify(dataFromClient),
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      };
      const _gameSettingsFromDeveloper = await fetch(
        "https://gserver-rtg.redtiger.com/rtg/platform/game/settings",
        init
      );
      gameSettingsFromDeveloper = await _gameSettingsFromDeveloper.json();
    } else {
      gameSettingsFromDeveloper = await import(
        "./data/BassBoss/settings-result.json"
      );
    }
    console.log("gameSettingsFromDeveloper", gameSettingsFromDeveloper);
    console.log(
      buildJson(
        gameSettingsFromDeveloper,
        profile.balance,
        profile.balance,
        profile.owner?.vipRank as number
      )
    );
    return buildJson(
      gameSettingsFromDeveloper,
      profile.balance,
      profile.balance,
      profile.owner?.vipRank as number
    );
  }

  // public SaveLogReport(
  //   spinSymbols: string,
  //   game: Game,
  //   bet: number,
  //   lines: number,
  //   win: number,
  //   slotState: string,
  //   slotId: string,
  //   user: User,
  //   account: Profile,
  // ) {
  //   let reportName: string = slotId + ' ' + slotState
  //   if (slotState === 'freespin') {
  //     reportName = slotId + ' FG'
  //   } else if (slotState === 'bet') {
  //     reportName = slotId + ''
  //   } else if (slotState === 'slotGamble') {
  //     reportName = slotId + ' DG'
  //   }
  //   if (slotState === 'bet') {
  //     this.userService.updateLevel('bet', bet * game.denomination!, account.id)
  //   }
  //   if (slotState !== 'freespin') {
  //     game.increment('stat_in', bet * game.denomination!)
  //   }
  //   game.increment('stat_out', win * CurrentDenom)
  //   game.tournament_stat(
  //     slotState,
  //     user.id,
  //     bet * CurrentDenom,
  //     win * CurrentDenom,
  //   )
  //   user.update({ last_bid: new Date() })
  //   if (!hasOwnProperty('betProfit')) {
  //     betProfit = 0
  //     toGameBanks = 0
  //     toSlotJackBanks = 0
  //     toSysJackBanks = 0
  //   }
  //   if (!hasOwnProperty('toGameBanks')) {
  //     toGameBanks = 0
  //   }
  //   game.increment('bids')
  //   game.refresh()
  //   const gamebank = prisma.gameBank.where({ shop_id: game.shop_id }).first()
  //   let slotsBank: number,
  //     bonusBank: number,
  //     fishBank: number,
  //     tableBank: number,
  //     littleBank: number
  //   if (gamebank) {
  //     ;[slotsBank, bonusBank, fishBank, tableBank, littleBank] =
  //       bankerService.get_all_banks(game.shop_id)
  //   } else {
  //     slotsBank = game.get_gamebank('', 'slots')
  //     bonusBank = game.get_gamebank('bonus', 'bonus')
  //     fishBank = game.get_gamebank('', 'fish')
  //     tableBank = game.get_gamebank('', 'table_bank')
  //     littleBank = game.get_gamebank('', 'little')
  //   }
  //   const totalBank: number =
  //     slotsBank + bonusBank + fishBank + tableBank + littleBank
  //   GameLog.create({
  //     game_id: slotDBId,
  //     user_id: playerId,
  //     ip: _SERVER['REMOTE_ADDR'],
  //     str: spinSymbols,
  //     shop_id: shop_id,
  //   })
  //   this.prisma.statGame.create({
  //     userId: playerId,
  //     balance: Balance * CurrentDenom,
  //     bet: bet * CurrentDenom,
  //     win: win * CurrentDenom,
  //     game: reportName,
  //     in_game: toGameBanks,
  //     in_jpg: toSlotJackBanks,
  //     in_profit: betProfit,
  //     denomination: CurrentDenom,
  //     shop_id: shop_id,
  //     slots_bank: slotsBank,
  //     bonus_bank: bonusBank,
  //     fish_bank: fishBank,
  //     table_bank: tableBank,
  //     little_bank: littleBank,
  //     total_bank: totalBank,
  //     date_time: new Date(),
  //   })
  // }
  async updateBalancesAndStats(
    balanceChange: number,
    rtGSpinDto: RTGSpinDto,
    winAmount: number,
    betAmount: number,
    session: any
  ) {
    return await this.prisma.$transaction(async () => {
      await this.prisma.profile.update({
        data: {
          balance: {
            increment: balanceChange,
          },
          vipPoints: {
            increment: rtGSpinDto.stake * 100,
          },
          totalSpins: {
            increment: 1,
          },
          totalWon: {
            increment: winAmount,
          },
          totalBet: {
            increment: betAmount,
          },
        },
        where: {
          id: session.profileId,
        },
      });

      // 3. decrement buyer's ballance
      // NOTE: using `prismaTransaction` instead of `this.prismaService`
      await this.prisma.shop.update({
        data: {
          balance: {
            increment: balanceChange * -1,
          },
        },
        where: {
          id: session.shopId,
        },
      });
    });
  }

  async checkIfValid(
    session: any,
    dataFromClient: RTGSpinDto
  ): Promise<string | any> {
    const profile = await this.prisma.profile.findUnique({
      where: { id: session.profileId || "cm79nl2440007cvy5znxbndw9" },
      include: { owner: true },
    });
    if (profile === undefined || profile === null) return "Profile not found!";
    if (profile.balance < dataFromClient.stake) return "Insufficient Funds!";
    return profile;
  }
  async doSpin(session: any, dataFromClient: RTGSpinDto) {
    const profile = await this.checkIfValid(session, dataFromClient);
    if (typeof profile == "string")
      return JSON.stringify({
        success: false,
        error: {
          msg: profile,
          details: {
            info: [{ isReal: true }],
          },
          code: 775,
        },
      });

    let spinResultsFromDeveloper: any;
    const originalBalance = profile.balance;

    try {
      if (isTesting === false) {
        const init = {
          body: JSON.stringify(dataFromClient),
          method: "POST",
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
        };
        const _spinResultsFromDeveloper = await fetch(
          "https://gserver-rtg.redtiger.com/rtg/platform/game/spin",
          init
        );
        spinResultsFromDeveloper = await _spinResultsFromDeveloper.json();
      } else {
        spinResultsFromDeveloper = await import(
          "./data/BassBoss/spin.result.lose.json"
        );
      }
      if (!spinResultsFromDeveloper.success) {
        const spinResult = new RTGSpinResult(
          spinResultsFromDeveloper.success,
          spinResultsFromDeveloper.result
        );

        // const hasState = gameResultFromDeveloper.result.game.hasState;
        const winAmount = this.spinDataService.formatCentsAmount(
          spinResult.result.game.win.total
        );
        const betAmount = this.spinDataService.formatCentsAmount(
          spinResult.result.game.stake
        );
        const balanceChange = winAmount - betAmount;
        console.log(
          "betAmount: ",
          betAmount,
          " winAmount: ",
          winAmount,
          " balanceChange: ",
          balanceChange
        );
        console.log(JSON.stringify(spinResult));
        console.log(spinResult.result.user.balance);

        this.updateBalancesAndStats(
          balanceChange,
          dataFromClient,
          winAmount,
          betAmount,
          session
        );
        try {
          // gameResultFromDeveloper = logSpinInit(
          //   gameResultFromDeveloper,
          //   this.prisma,
          //   dataFromClient.gameId,
          //   profile.owner.id,
          // )
          // logSpin(
          //   gameResultFromDeveloper,
          //   this.prisma,
          //   dataFromClient.gameId,
          //   profile.owner.id,
          // )

          return buildJsonForSpin(
            spinResult
            // profile.balance,
            // dataFromClient.stake,
            // originalBalance,
            // profile.balance,
            // profile.owner.vipLevel as number,
          );
        } catch (e) {
          console.log(e);
          return JSON.stringify(spinResultsFromDeveloper);
        }
      } else {
        if (spinResultsFromDeveloper.error.code === 5)
          spinResultsFromDeveloper.error.details.info = { isReal: false };

        return JSON.stringify(spinResultsFromDeveloper);
      }
    } catch (e) {
      console.log(e);
      return JSON.stringify(spinResultsFromDeveloper);
    }
  }
}
/*




export async function handleRequest(
  request: Request,
  userId: string,
  gameName: string,
  command: string,
  body: any,
) {
  //   request = await setRealIP(request)
  const corsHeaders = {
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Max-Age': '86400',
  };

  if (request.method === 'OPTIONS') {
    return new Response('200', {
      // headers: {
      ...corsHeaders,
      'Access-Control-Allow-Headers': request.headers.get(
        'Access-Control-Request-Headers',
      ),
      Allow: 'OPTIONS, GET, HEAD, POST',

      // },
    });
  }
  if (request.method === 'GET') return new Response('500');

  //   async function MethodNotAllowed(request) {
  //     return new Response(`Method ${request.method} not allowed.`, {
  //       status: 405,
  //       headers: {
  //         Allow: 'GET'
  //       }
  //     })
  //   }
  //   const userId = request.url.split('/')[3]
  //   const gameName = request.url.split('/')[4]
  //   const pathWay = request.url
  //     .replace('http://localhost:8787', '')
  //     .replace('https://vite.ashdevtools.com', '')
  //     .replace('https://interceptor.andrews.workers.dev', '')
  //     .replace('https://dragonmirror.andrews.workers.dev', '')
  //     .replace('https://apidev.ashdevtools.com', '')
  //     .replace('http://apidev.ashdevtools.com', '')
  //     .replace('http://192.168.1.29:3000', '')
  //     .replace(`/${userId}/${gameName}`, '')
  //   const cookie = parse(request.headers.get('Cookie') || '')
  const SUPABASE_URL = 'https://nnzmufhldbsvvztlrrau.supabase.co';

  const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uem11ZmhsZGJzdnZ6dGxycmF1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzc3ODQ5NiwiZXhwIjoyMDE5MzU0NDk2fQ.4-ueO8usfuzpFfs9ImU5qNBZXl6TBY6dqyIjRJi8xjw';

  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

  // console.log(command)

  //   let dataFromClient
  if (command === 'settings') {
    // console.log(command)

    return await handleSettings(
      request,
      gameName,
      supabase,
      userId,
      corsHeaders,
      body,
    );
  }
  if (command === 'spin') {
    console.log(command);

    return await handleSpin(
      request,
      gameName,
      supabase,
      userId,
      corsHeaders,
      body,
    );
  }
  if (command === 'choice') {
    console.log(command);

    return await handleChoice(
      request,
      gameName,
      supabase,
      userId,
      corsHeaders,
      body,
    );
  }

  // console.log('path not found')
  return new Response('Invalid Path');
}
*/
