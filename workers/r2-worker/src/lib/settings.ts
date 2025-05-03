// import { buildJson } from './buildjson'
// import PocketBase from 'pocketbase';

// export const handleSettings = async (
//   gameName: string,
//   pb: PocketBase,
//   userId: string,
//   body: any,
// ): Promise<string> => {
//   console.log(userId)
//   const data2 = await pb.collection('users').getOne(userId);

//   if (!data2) console.error(data2)
//   console.log('------------- settings --------------')
//   console.log(body.token)
//   const zr = Math.floor(Math.random() * 10)
//   const zr1 = Math.floor(Math.random() * 10)
//   const zr2 = Math.floor(Math.random() * 10)
//   const zr3 = Math.floor(Math.random() * 10)

//   console.log(zr, zr1, zr2, zr3)
//   const characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   function generateString(length: number) {
//     let result = ' '
//     const charactersLength = characters.length
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength))
//     }

//     return result
//   }
//   const init = {
//     body: JSON.stringify({
//       token:
//         '0ce6f9affc8d4ad36862938a29748e2e68c15f47ee0a449075e478b6a21d421be7abd1c31d530982182dbf0e05b518e9645149e446a5d5ec7a13dc029ccd56e0',
//       sessionId: '0',
//       playMode: 'demo',
//       gameId: gameName,
//       userData: {
//           userId: 2502924,
//           affiliate: '',
//           lang: 'en',
//           channel: 'I',
//           userType: 'U',
//           fingerprint: 'c474d2e1-a19e-4a40-8d32-58b02b0c1034',
//         hash: '',

//         // fingerprint: '5d21efc1-bd63-4bc0-8cae-a61849fe221f2',
//       },
//       custom: { siteId: '', extras: '' },
//     }),
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json;charset=UTF-8',
//     },
//   }
//   let type = 'game'
//   if (gameName === 'EuropeanRoulette') type = 'roulette'

//   const r = await fetch(
//     `https://gserver-rtg.redtiger.com/rtg/platform/${type}/settings`,
//     init,
//   )
//   const gameSettingsFromDeveloper: any = await r.json()
//   console.log('gameSettingsFromDeveloper', gameSettingsFromDeveloper)
//   return buildJson(gameSettingsFromDeveloper, data2.crystals, data2.coins, data2.experience)

//     //   {
//     //     headers: {
//     //       ...corsHeaders,
//     //       'Access-Control-Allow-Headers': request.headers.get(
//     //         'Access-Control-Request-Headers'
//     //       ),
//     //       'Content-Type': 'application/json'
//     //     }
//     //   }

//   // }
//   // if (request.method !== 'POST') {
//   //   return new Response(JSON.stringify({ status: 200 }), {
//   //     headers: {
//   //       ...corsHeaders,

//   //       'Content-Type': 'application/json',
//   //     },
//   //   })
//   // }
// }
