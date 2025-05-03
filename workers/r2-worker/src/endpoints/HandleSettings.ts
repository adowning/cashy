import { raw } from "@prisma/client/runtime/library";
import { ConvertSettingsRequest, SettingsRequest } from "../types";

// export class HandleSettings extends OpenAPIRoute {
// 定义API的路由schema，包括标签、摘要、请求体和响应体
// 定义API的路由schema，包括标签、摘要、请求体和响应体
//   schema = {
//     tags: ["Settings"],
//     summary: "Create a new Task",
//     request: {
//       body: {
//         content: {
//           "application/json": {
//             // schema: SettingsReq,
//           },
//         },
//       },
//     },
//     responses: {
//       "200": {
//         description: "Returns the created task",
//         content: {
//           "application/json": {
//             schema: z.object({
//               series: z.object({
//                 success: Bool(),
//                 result: z.object({
//                   //   task: SettingsRes,
//                 }),
//               }),
//             }),
//           },
//         },
//       },
//     },
//   };
// 处理设置请求的异步方法
async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json());
  } else if (contentType.includes("application/text")) {
    return response.text();
  } else if (contentType.includes("text/html")) {
    return response.text();
  } else {
    return response.text();
  }
}

export async function handleSettings(c, userId, gameName, prisma) {
  console.log(userId, gameName);
  // console.log(prisma, c);
  const rawDataFromClient = await c.req.json();
  // 将原始数据解析为SettingsRequest类型
  // const parsedDataFromClient: SettingsRequest =
  //   ConvertSettingsRequest.toSettingsRequest(JSON.stringify(rawDataFromClient));
  // console.log(rawDataFromClient);
  rawDataFromClient.token =
    "68b622ddc5ea550ef7b99e7898d2f18934fad492015a941aa93b82e0b7040a3ffe401ff0fc76cae1a29d2c9593ab6a623f4b75d8ae878b77c664b308c94dc1bd";
  // const body = {
  //   method: "POST",
  //   body: JSON.stringify(rawDataFromClient),
  //   headers: {
  //     "content-type": "application/json;charset=UTF-8",
  //   },
  // };
  // const body = rawDataFromClient;
  const init = {
    body: JSON.stringify(rawDataFromClient),
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      accepts: "application/json",
    },
  };
  console.log(init);
  // const _gameSettingsFromDeveloper = await fetch(
  //   "https://gserver-rtg.redtiger.com/rtg/platform/game/settings",
  //   init
  // );
  const response = await fetch(
    "https://gserver-rtg.redtiger.com/rtg/platform/game/settings",
    {
      body: JSON.stringify(rawDataFromClient),
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accepts: "application/json",
      },
    }
  );

  // console.log(await response.json());
  // const results = await gatherResponse(response);
  console.log(JSON.stringify(await response.json()));

  //   // 如果客户端提供的gameId不匹配gameName，返回错误信息
  //   if (parsedDataFromClient.gameId !== gameName)
  //     return c.json({
  //       success: false,
  //       result: { gameId: gameName, settings: parsedDataFromClient },
  //     });
  //   const user = prisma.user.findUnique({ where: { id: userId } });
  //   const game = prisma.game.findFirst({ where: { name: gameName } });
  //   if (!user || !game)
  //     return c.json({
  //       success: false,
  //       result: { gameId: gameName, settings: parsedDataFromClient },
  //     });

  // console.log(parsedDataFromClient);
  // console.log(rawDataFromClient);
  return c.json({ response });
}

// const taskToCreate = c.body();
// console.log(taskToCreate);

// console.log(parsedDataFromClient);
// const profile = await this.prisma.profile.findUnique({
//   // where: { id: 'cm79nl2440007cvy5znxbndw9' },
//   where: { id: session.profileId || "cm79nl2440007cvy5znxbndw9" },
//   include: { owner: true },
// });
// if (profile === undefined || profile === null)
//   throw new Error("Account not found");
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
// let gameSettingsFromDeveloper: any;
// if (isTesting === false) {
//   const init = {
//     body: JSON.stringify(dataFromClient),
//     method: "POST",
//     headers: {
//       "content-type": "application/json;charset=UTF-8",
//     },
//   };
//   const _gameSettingsFromDeveloper = await fetch(
//     "https://gserver-rtg.redtiger.com/rtg/platform/game/settings",
//     init
//   );
//   gameSettingsFromDeveloper = await _gameSettingsFromDeveloper.json();
// } else {
//   gameSettingsFromDeveloper = await import(
//     "./data/BassBoss/settings-result.json"
//   );
// }
// console.log("gameSettingsFromDeveloper", gameSettingsFromDeveloper);
// console.log(
//   buildJson(
//     gameSettingsFromDeveloper,
//     profile.balance,
//     profile.balance,
//     profile.owner?.vipRank as number
//   )
// );
// return buildJson(
//   gameSettingsFromDeveloper,
//   profile.balance,
//   profile.balance,
//   profile.owner?.vipRank as number
// );
//   }

//     // return the new task
//     return {
//       success: true,
//       task: {
//         name: taskToCreate.name,
//         slug: taskToCreate.slug,
//         description: taskToCreate.description,
//         completed: taskToCreate.completed,
//         due_date: taskToCreate.due_date,
//       },
//     };
//   }
// }

// {
//     "success": true,
//     "result": {
//         "user": {
//             "balance": {
//                 "cash": "100.00",
//                 "freeBets": "0.00",
//                 "sessionCash": "0.00",
//                 "sessionFreeBets": "0.00",
//                 "bonus": "0.00"
//             },
//             "notifications": [],
//             "messages": [],
//             "bonuses": [],
//             "tournaments": [],
//             "vouchers": [],
//             "userId": 7558219,
//             "country": "US",
//             "casino": "NONE",
//             "vertical": "Default",
//             "currency": {
//                 "code": "GBP",
//                 "symbol": "£"
//             },
//             "token": "cf330de320e7ba0c79510d060ebabb33d9987794928e2061b10a4e91f90a7b85e6b9cc786b5b4a40ff7c9f89e7dcba35ed2d6fd9e9c9b46a516ce73877c44c2f",
//             "sessionId": "0",
//             "sessionNetPosition": "0.00",
//             "aamsParticipationId": null,
//             "aamsSessionId": null,
//             "depositedAmount": "0.00",
//             "maxDeposit": "0.00",
//             "canGamble": false,
//             "lastWin": "0.00",
//             "prevRounds": [],
//             "limits": {
//                 "maxGambleStake": "10000.00",
//                 "maxTotalStake": {
//                     "total": "35.00"
//                 },
//                 "minTotalStake": {
//                     "total": "0.20"
//                 },
//                 "spinDuration": null
//             },
//             "stakes": {
//                 "defaultIndex": 5,
//                 "lastIndex": 5,
//                 "types": [
//                     "0.2",
//                     "0.4",
//                     "0.6",
//                     "0.8",
//                     "1",
//                     "2",
//                     "4",
//                     "6",
//                     "8",
//                     "10",
//                     "20"
//                 ]
//             },
//             "autoplay": {
//                 "type": "modal",
//                 "options": {
//                     "spins": {
//                         "values": [
//                             "10",
//                             "20",
//                             "30",
//                             "50",
//                             "100"
//                         ],
//                         "default": 10
//                     },
//                     "stopOnFeature": {
//                         "enabled": true
//                     },
//                     "stopOnLossLimits": {
//                         "mandatory": true,
//                         "enabled": true,
//                         "values": [
//                             "10",
//                             "20",
//                             "30",
//                             "50",
//                             "100",
//                             "200",
//                             "500",
//                             "1000",
//                             "5000",
//                             "10000"
//                         ],
//                         "default": 0
//                     },
//                     "stopOnWin": {
//                         "enabled": true,
//                         "values": [
//                             "10",
//                             "20",
//                             "30",
//                             "50",
//                             "100",
//                             "200",
//                             "500",
//                             "1000",
//                             "5000",
//                             "10000",
//                             "50000",
//                             "100000"
//                         ]
//                     },
//                     "hasRestart": false
//                 }
//             },
//             "serverTime": "2025-03-06 10:10:42",
//             "additional": null
//         },
//         "game": {
//             "cols": 5,
//             "rows": 3,
//             "offset": 5,
//             "extraWin": {
//                 "bigWin": "15.00",
//                 "superWin": "50.00",
//                 "megaWin": "100.00"
//             },
//             "lines": [
//                 [
//                     0,
//                     0,
//                     0,
//                     0,
//                     0
//                 ],
//                 [
//                     1,
//                     1,
//                     1,
//                     1,
//                     1
//                 ],
//                 [
//                     2,
//                     2,
//                     2,
//                     2,
//                     2
//                 ],
//                 [
//                     0,
//                     1,
//                     2,
//                     1,
//                     0
//                 ],
//                 [
//                     2,
//                     1,
//                     0,
//                     1,
//                     2
//                 ],
//                 [
//                     1,
//                     0,
//                     0,
//                     0,
//                     1
//                 ],
//                 [
//                     1,
//                     2,
//                     2,
//                     2,
//                     1
//                 ],
//                 [
//                     0,
//                     0,
//                     1,
//                     2,
//                     2
//                 ],
//                 [
//                     2,
//                     2,
//                     1,
//                     0,
//                     0
//                 ],
//                 [
//                     1,
//                     2,
//                     1,
//                     0,
//                     1
//                 ]
//             ],
//             "tiles": [
//                 {
//                     "id": 1,
//                     "type": "normal",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "0.60",
//                         "1.20",
//                         "2.40"
//                     ]
//                 },
//                 {
//                     "id": 2,
//                     "type": "normal",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "0.70",
//                         "1.40",
//                         "2.80"
//                     ]
//                 },
//                 {
//                     "id": 3,
//                     "type": "normal",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "0.90",
//                         "1.80",
//                         "3.60"
//                     ]
//                 },
//                 {
//                     "id": 4,
//                     "type": "normal",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "1.30",
//                         "2.60",
//                         "5.20"
//                     ]
//                 },
//                 {
//                     "id": 5,
//                     "type": "normal",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "2.30",
//                         "4.60",
//                         "9.20"
//                     ]
//                 },
//                 {
//                     "id": 6,
//                     "type": "normal",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "3.00",
//                         "7.00",
//                         "23.00"
//                     ]
//                 },
//                 {
//                     "id": 7,
//                     "type": "normal",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "5.00",
//                         "11.00",
//                         "35.00"
//                     ]
//                 },
//                 {
//                     "id": 8,
//                     "type": "normal",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "7.00",
//                         "15.00",
//                         "47.00"
//                     ]
//                 },
//                 {
//                     "id": 9,
//                     "type": "normal",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "10.00",
//                         "21.00",
//                         "77.00"
//                     ]
//                 },
//                 {
//                     "id": 10,
//                     "type": "wild",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "0.00",
//                         "0.00",
//                         "77.00"
//                     ]
//                 },
//                 {
//                     "id": 11,
//                     "type": "scatters",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "0.00",
//                         "0.00",
//                         "0.00"
//                     ]
//                 },
//                 {
//                     "id": 12,
//                     "type": "scatters",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "0.00",
//                         "0.00",
//                         "0.00"
//                     ]
//                 },
//                 {
//                     "id": 13,
//                     "type": "scatters",
//                     "pays": [
//                         "0.00",
//                         "0.00",
//                         "0.00",
//                         "0.00",
//                         "0.00"
//                     ]
//                 }
//             ],
//             "reelsBuffer": [
//                 [
//                     [
//                         2,
//                         2,
//                         5,
//                         5,
//                         2
//                     ],
//                     [
//                         2,
//                         2,
//                         2
//                     ],
//                     [
//                         8,
//                         8,
//                         1,
//                         1,
//                         1
//                     ]
//                 ],
//                 [
//                     [
//                         4,
//                         4,
//                         4,
//                         7,
//                         7
//                     ],
//                     [
//                         7,
//                         3,
//                         3
//                     ],
//                     [
//                         4,
//                         4,
//                         4,
//                         9,
//                         9
//                     ]
//                 ],
//                 [
//                     [
//                         5,
//                         5,
//                         5,
//                         6,
//                         6
//                     ],
//                     [
//                         6,
//                         2,
//                         2
//                     ],
//                     [
//                         1,
//                         1,
//                         8,
//                         8,
//                         3
//                     ]
//                 ],
//                 [
//                     [
//                         1,
//                         1,
//                         2,
//                         2,
//                         5
//                     ],
//                     [
//                         5,
//                         5,
//                         8
//                     ],
//                     [
//                         8,
//                         1,
//                         1,
//                         5,
//                         5
//                     ]
//                 ],
//                 [
//                     [
//                         6,
//                         6,
//                         4,
//                         4,
//                         4
//                     ],
//                     [
//                         4,
//                         7,
//                         7
//                     ],
//                     [
//                         7,
//                         3,
//                         3,
//                         3,
//                         6
//                     ]
//                 ]
//             ],
//             "features": [
//                 "FreeSpins_cheap",
//                 "FreeSpins_normal",
//                 "FreeSpins_expensive",
//                 "FreeSpins"
//             ],
//             "singlePayline": true,
//             "hasState": false,
//             "version": "4.0.1",
//             "rtp": {
//                 "game": {
//                     "default": "95.80"
//                 }
//             },
//             "volatilityIndex": "2.59",
//             "maxMultiplier": "2830.30",
//             "maxWinlineHitRate": "1.440000",
//             "maxMultiplierHitRate": "0.000701",
//             "maxMultiplierHitFrequency": "142653",
//             "maxMultiplierWinLines": "770.00",
//             "maxMultiplierWinLinesHitRate": "0.0000000001000000",
//             "maxMultiplierWinLinesHitFrequency": "1000000000000",
//             "hasGambleGame": false,
//             "gameType": "slot",
//             "stateful": false,
//             "hasChoices": false,
//             "stateExpireDays": null,
//             "hasBonuses": false,
//             "pendingRoundDays": 0,
//             "skin": null,
//             "hasFeatureBuy": false
//         },
//         "launcher": {
//             "version": "1.31.3"
//         },
//         "jackpots": null
//     }
// }
