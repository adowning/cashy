// To parse this data:
//
//   import { Convert, SettingsResponse } from "./file";
//
//   const settingsResponse = Convert.toSettingsResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type SettingsResponse = {
  success: boolean;
  result: Result;
};

type Result = {
  transactions: Transactions;
  user: User;
  game: Game;
  jackpots: null;
  bonusChance: null;
};

type Game = {
  win: Win;
  winsMultipliers: Win;
  stake: string;
  multiplier: number;
  winLines: any[];
  scatters: any[];
  reelsBuffer: Array<Array<number[]>>;
  features: any[];
  hasState: boolean;
};

type Win = {
  lines: string;
  total: string;
};

type Transactions = {
  roundId: number;
};

type User = {
  balance: Balance;
  canGamble: boolean;
  userId: number;
  sessionId: string;
  sessionNetPosition: string;
  token: string;
  bonuses: any[];
  tournaments: any[];
  vouchers: any[];
  messages: any[];
  limits: Limits;
  serverTime: Date;
};

type Balance = {
  cash: Bonus;
  freeBets: Bonus;
  bonus: Bonus;
  sessionCash: Bonus;
  sessionFreeBets: Bonus;
};

type Bonus = {
  atStart: string;
  afterBet: string;
  atEnd: string;
};

type Limits = {
  betThresholdTime: number;
};

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class ConvertSettingsResponse {
  public static toSettingsResponse(json: string): SettingsResponse {
    return cast(JSON.parse(json), r("SettingsResponse"));
  }

  public static settingsResponseToJson(value: SettingsResponse): string {
    return JSON.stringify(uncast(value, r("SettingsResponse")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val
    )}`
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = ""
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  SettingsResponse: o(
    [
      { json: "success", js: "success", typ: true },
      { json: "result", js: "result", typ: r("Result") },
    ],
    false
  ),
  Result: o(
    [
      { json: "transactions", js: "transactions", typ: r("Transactions") },
      { json: "user", js: "user", typ: r("User") },
      { json: "game", js: "game", typ: r("Game") },
      { json: "jackpots", js: "jackpots", typ: null },
      { json: "bonusChance", js: "bonusChance", typ: null },
    ],
    false
  ),
  Game: o(
    [
      { json: "win", js: "win", typ: r("Win") },
      { json: "winsMultipliers", js: "winsMultipliers", typ: r("Win") },
      { json: "stake", js: "stake", typ: "" },
      { json: "multiplier", js: "multiplier", typ: 0 },
      { json: "winLines", js: "winLines", typ: a("any") },
      { json: "scatters", js: "scatters", typ: a("any") },
      { json: "reelsBuffer", js: "reelsBuffer", typ: a(a(a(0))) },
      { json: "features", js: "features", typ: a("any") },
      { json: "hasState", js: "hasState", typ: true },
    ],
    false
  ),
  Win: o(
    [
      { json: "lines", js: "lines", typ: "" },
      { json: "total", js: "total", typ: "" },
    ],
    false
  ),
  Transactions: o([{ json: "roundId", js: "roundId", typ: 0 }], false),
  User: o(
    [
      { json: "balance", js: "balance", typ: r("Balance") },
      { json: "canGamble", js: "canGamble", typ: true },
      { json: "userId", js: "userId", typ: 0 },
      { json: "sessionId", js: "sessionId", typ: "" },
      { json: "sessionNetPosition", js: "sessionNetPosition", typ: "" },
      { json: "token", js: "token", typ: "" },
      { json: "bonuses", js: "bonuses", typ: a("any") },
      { json: "tournaments", js: "tournaments", typ: a("any") },
      { json: "vouchers", js: "vouchers", typ: a("any") },
      { json: "messages", js: "messages", typ: a("any") },
      { json: "limits", js: "limits", typ: r("Limits") },
      { json: "serverTime", js: "serverTime", typ: Date },
    ],
    false
  ),
  Balance: o(
    [
      { json: "cash", js: "cash", typ: r("Bonus") },
      { json: "freeBets", js: "freeBets", typ: r("Bonus") },
      { json: "bonus", js: "bonus", typ: r("Bonus") },
      { json: "sessionCash", js: "sessionCash", typ: r("Bonus") },
      { json: "sessionFreeBets", js: "sessionFreeBets", typ: r("Bonus") },
    ],
    false
  ),
  Bonus: o(
    [
      { json: "atStart", js: "atStart", typ: "" },
      { json: "afterBet", js: "afterBet", typ: "" },
      { json: "atEnd", js: "atEnd", typ: "" },
    ],
    false
  ),
  Limits: o(
    [{ json: "betThresholdTime", js: "betThresholdTime", typ: 0 }],
    false
  ),
};
/*
{
    "success": true,
    "result": {
        "user": {
            "balance": {
                "cash": "100.00",
                "freeBets": "0.00",
                "sessionCash": "0.00",
                "sessionFreeBets": "0.00",
                "bonus": "0.00"
            },
            "notifications": [],
            "messages": [],
            "bonuses": [],
            "tournaments": [],
            "vouchers": [],
            "userId": 7559039,
            "country": "US",
            "casino": "NONE",
            "vertical": "Default",
            "currency": {
                "code": "GBP",
                "symbol": "£"
            },
            "token": "be55120bfeb1d2f2e6172e5422f33a19c06600a6db9a12c0658a62b848fd384f50d4c82059a7f51622e37958e1aa582ee77cded55db8519ad3863b593abbb725",
            "sessionId": "0",
            "sessionNetPosition": "0.00",
            "aamsParticipationId": null,
            "aamsSessionId": null,
            "depositedAmount": "0.00",
            "maxDeposit": "0.00",
            "canGamble": false,
            "lastWin": "0.00",
            "prevRounds": [],
            "limits": {
                "maxGambleStake": "10000.00",
                "maxTotalStake": {
                    "total": "35.00"
                },
                "minTotalStake": {
                    "total": "0.20"
                },
                "spinDuration": null
            },
            "stakes": {
                "defaultIndex": 5,
                "lastIndex": 5,
                "types": [
                    "0.2",
                    "0.4",
                    "0.6",
                    "0.8",
                    "1",
                    "2",
                    "4",
                    "6",
                    "8",
                    "10",
                    "20"
                ]
            },
            "autoplay": {
                "type": "modal",
                "options": {
                    "spins": {
                        "values": [
                            "10",
                            "20",
                            "30",
                            "50",
                            "100"
                        ],
                        "default": 10
                    },
                    "stopOnFeature": {
                        "enabled": true
                    },
                    "stopOnLossLimits": {
                        "mandatory": true,
                        "enabled": true,
                        "values": [
                            "10",
                            "20",
                            "30",
                            "50",
                            "100",
                            "200",
                            "500",
                            "1000",
                            "5000",
                            "10000"
                        ],
                        "default": 0
                    },
                    "stopOnWin": {
                        "enabled": true,
                        "values": [
                            "10",
                            "20",
                            "30",
                            "50",
                            "100",
                            "200",
                            "500",
                            "1000",
                            "5000",
                            "10000",
                            "50000",
                            "100000"
                        ]
                    },
                    "hasRestart": false
                }
            },
            "serverTime": "2025-03-06 12:15:35",
            "additional": null
        },
        "game": {
            "cols": 5,
            "rows": 3,
            "offset": 5,
            "extraWin": {
                "bigWin": "15.00",
                "superWin": "50.00",
                "megaWin": "100.00"
            },
            "lines": [
                [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                [
                    1,
                    1,
                    1,
                    1,
                    1
                ],
                [
                    2,
                    2,
                    2,
                    2,
                    2
                ],
                [
                    0,
                    1,
                    2,
                    1,
                    0
                ],
                [
                    2,
                    1,
                    0,
                    1,
                    2
                ],
                [
                    1,
                    0,
                    0,
                    0,
                    1
                ],
                [
                    1,
                    2,
                    2,
                    2,
                    1
                ],
                [
                    0,
                    0,
                    1,
                    2,
                    2
                ],
                [
                    2,
                    2,
                    1,
                    0,
                    0
                ],
                [
                    1,
                    2,
                    1,
                    0,
                    1
                ]
            ],
            "tiles": [
                {
                    "id": 1,
                    "type": "normal",
                    "pays": [
                        "0.00",
                        "0.00",
                        "0.60",
                        "1.20",
                        "2.40"
                    ]
                },
                {
                    "id": 2,
                    "type": "normal",
                    "pays": [
                        "0.00",
                        "0.00",
                        "0.70",
                        "1.40",
                        "2.80"
                    ]
                },
                {
                    "id": 3,
                    "type": "normal",
                    "pays": [
                        "0.00",
                        "0.00",
                        "0.90",
                        "1.80",
                        "3.60"
                    ]
                },
                {
                    "id": 4,
                    "type": "normal",
                    "pays": [
                        "0.00",
                        "0.00",
                        "1.30",
                        "2.60",
                        "5.20"
                    ]
                },
                {
                    "id": 5,
                    "type": "normal",
                    "pays": [
                        "0.00",
                        "0.00",
                        "2.30",
                        "4.60",
                        "9.20"
                    ]
                },
                {
                    "id": 6,
                    "type": "normal",
                    "pays": [
                        "0.00",
                        "0.00",
                        "3.00",
                        "7.00",
                        "23.00"
                    ]
                },
                {
                    "id": 7,
                    "type": "normal",
                    "pays": [
                        "0.00",
                        "0.00",
                        "5.00",
                        "11.00",
                        "35.00"
                    ]
                },
                {
                    "id": 8,
                    "type": "normal",
                    "pays": [
                        "0.00",
                        "0.00",
                        "7.00",
                        "15.00",
                        "47.00"
                    ]
                },
                {
                    "id": 9,
                    "type": "normal",
                    "pays": [
                        "0.00",
                        "0.00",
                        "10.00",
                        "21.00",
                        "77.00"
                    ]
                },
                {
                    "id": 10,
                    "type": "wild",
                    "pays": [
                        "0.00",
                        "0.00",
                        "0.00",
                        "0.00",
                        "77.00"
                    ]
                },
                {
                    "id": 11,
                    "type": "scatters",
                    "pays": [
                        "0.00",
                        "0.00",
                        "0.00",
                        "0.00",
                        "0.00"
                    ]
                },
                {
                    "id": 12,
                    "type": "scatters",
                    "pays": [
                        "0.00",
                        "0.00",
                        "0.00",
                        "0.00",
                        "0.00"
                    ]
                },
                {
                    "id": 13,
                    "type": "scatters",
                    "pays": [
                        "0.00",
                        "0.00",
                        "0.00",
                        "0.00",
                        "0.00"
                    ]
                }
            ],
            "reelsBuffer": [
                [
                    [
                        5,
                        5,
                        1,
                        1,
                        5
                    ],
                    [
                        5,
                        5,
                        8
                    ],
                    [
                        8,
                        8,
                        1,
                        1,
                        1
                    ]
                ],
                [
                    [
                        6,
                        6,
                        6,
                        4,
                        4
                    ],
                    [
                        9,
                        9,
                        3
                    ],
                    [
                        3,
                        4,
                        4,
                        7,
                        7
                    ]
                ],
                [
                    [
                        5,
                        4,
                        4,
                        4,
                        7
                    ],
                    [
                        7,
                        2,
                        2
                    ],
                    [
                        3,
                        3,
                        5,
                        5,
                        5
                    ]
                ],
                [
                    [
                        2,
                        2,
                        1,
                        1,
                        1
                    ],
                    [
                        2,
                        2,
                        2
                    ],
                    [
                        1,
                        1,
                        1,
                        5,
                        5
                    ]
                ],
                [
                    [
                        7,
                        7,
                        7,
                        4,
                        4
                    ],
                    [
                        3,
                        3,
                        9
                    ],
                    [
                        9,
                        4,
                        4,
                        4,
                        6
                    ]
                ]
            ],
            "features": [
                "FreeSpins_cheap",
                "FreeSpins_normal",
                "FreeSpins_expensive",
                "FreeSpins"
            ],
            "singlePayline": true,
            "hasState": false,
            "version": "4.0.1",
            "rtp": {
                "game": {
                    "default": "95.80"
                }
            },
            "volatilityIndex": "2.59",
            "maxMultiplier": "2830.30",
            "maxWinlineHitRate": "1.440000",
            "maxMultiplierHitRate": "0.000701",
            "maxMultiplierHitFrequency": "142653",
            "maxMultiplierWinLines": "770.00",
            "maxMultiplierWinLinesHitRate": "0.0000000001000000",
            "maxMultiplierWinLinesHitFrequency": "1000000000000",
            "hasGambleGame": false,
            "gameType": "slot",
            "stateful": false,
            "hasChoices": false,
            "stateExpireDays": null,
            "hasBonuses": false,
            "pendingRoundDays": 0,
            "skin": null,
            "hasFeatureBuy": false
        },
        "launcher": {
            "version": "1.31.3"
        },
        "jackpots": null
    }
}*/
