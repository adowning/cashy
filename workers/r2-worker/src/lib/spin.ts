// /* eslint-disable no-var */
// import { buildJsonForSpin } from './buildjson'
// import { logSpin, logSpinInit } from './spinlogger'
// import PocketBase from 'pocketbase';
// var hasState = false

// export const handleSpin = async (
//   gameName: string,
//   pb: PocketBase,
//   userId: string,
//   // corsHeaders: any,
//   dataFromClient: any,
// ): Promise<string> => {
//   console.log('---------------------spinning---------------------')
//   try {

//     const data = await pb.collection('users').getOne(userId);

//     // console.log(data)

//     const original_crystals = data.crystals
//     const crystals = data.crystals
//     let coins = data.coins
//     let experience = data.experience
//     let bet: number
//     // console.log(dataFromClient.token)
//     bet = dataFromClient.stake
//     // console.log('coins ',coins)
//     // console.log(bet)

//     bet = bet * 100
//     if (crystals < bet) {
//       console.log('no funds')

//        return JSON.stringify({
//           success: false,
//           error: {
//             msg: 'Insufficient Funds!',
//             details: {
//               info: [{ isReal: true }],
//             },
//             code: 775,
//           },
//         })
//       }

//     const newCrystals = crystals - bet

//     const init = {
//       body: JSON.stringify(dataFromClient),
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json;charset=UTF-8',
//       },
//     }

//     const response = await fetch(
//       'https://gserver-rtg.redtiger.com/rtg/platform/game/spin',
//       init,
//     )
//     // const { data: data1, error: error1 } = await supabase
//     //   .from('w_users')
//     //   .update({ crystals: newCrystals })
//     //   .eq('id', userId)
//     //   .select()

//     const data1 = await pb.collection('users').update(userId, { crystals: newCrystals });

//     let gameResultFromDeveloper: any = await response.json()

//     if (!gameResultFromDeveloper.success) {
//       // console.log(gameResultFromDeveloper.error)
//       if (gameResultFromDeveloper.error.code === 5)
//         gameResultFromDeveloper.error.details.info = { isReal: false }

//       return JSON.stringify(gameResultFromDeveloper)

//     } else {
//       // console.log('total ', gameResultFromDeveloper.result.game.win.total)
//       hasState = gameResultFromDeveloper.result.game.hasState

//       coins +=  gameResultFromDeveloper.result.game.win.total * 100
//       let _experience = bet
//       _experience += (  gameResultFromDeveloper.result.game.win.total * 100) * 1.3
//       _experience = Math.floor(_experience)
//       experience += _experience
//       // const { error: error4 } = await supabase.rpc('update_player_after_spin', {
//       //   exp,
//       //   win,
//       //   bet,
//       //   user_id: userId,
//       // })
//       // const { data: data4, error: error4 } = await supabase
//       //   .from('w_users')
//       //   .update({ experience, coins })
//       //   .eq('id', userId)
//       //   .select()
//     const data4 = await pb.collection('users').update(userId, { experience, coins });

//       // console.log('data4 = ',data4)

//       // console.log(
//       //   'gameResultFromDeveloper1',
//       //   gameResultFromDeveloper.result.user.balance,
//       // )
//       //  logSpinInit(gameResultFromDeveloper)
//       try {
//         const name = gameName + 'RTG'
//         let gameRecord = await pb.collection('games').getFirstListItem(`name="${name}"`);
//         gameRecord = gameRecord
//         console.log(gameRecord)
//         const stat_in = gameRecord.stat_in
//         const stat_out = gameRecord.stat_out
//         const bids = gameRecord.bids
//         await pb.collection('games').update(gameRecord.id, {bids: bids +1, stat_in: stat_in + (dataFromClient['stake'] * 100), stat_out: stat_out + (parseFloat(gameResultFromDeveloper.result.game.win.total) * 100)});
//       } catch (e) {
//         console.log(e)
//       }

//       gameResultFromDeveloper = logSpinInit(
//         gameResultFromDeveloper,
//         pb,
//         gameName,
//         userId,
//       )
//       // console.log(
//       //   'gameResultFromDeveloper2',
//       //   gameResultFromDeveloper.result.user.balance,
//       // )

//       //   console.log('gameResultFromDeveloper', gameResultFromDeveloper.result)
//       // console.log(
//       //   'buildJsonForSpin',
//       //   buildJsonForSpin(gameResultFromDeveloper, win,bet, original_crystals ),
//       // )

//       // if (request.method === 'POST') {
//       return buildJsonForSpin(gameResultFromDeveloper, newCrystals, bet , original_crystals, coins, experience)

//       // }
//       // gameResultFromDeveloper = await logSpin(gameResultFromDeveloper, supabase, gameName, userId)
//       // }

//       // if (request.method !== 'POST') {
//       //   return new Response(JSON.stringify(data), {
//       //     headers: {
//       //       ...corsHeaders,

//       //       'Content-Type': 'application/json',
//       //     },
//       //   })
//       // }
//     }
//   } catch (e) {
//     console.log(e)
//     return JSON.stringify(e)
//   }
// }
