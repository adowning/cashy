// To parse this data:
//
//   import { Convert, SpinResponse } from "./file";
//
//   const spinResponse = Convert.toSpinResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type SpinResponse = {
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
  winLines: WinLine[];
  scatters: any[];
  reelsBuffer: Array<Array<number[]>>;
  features: any[];
  hasState: boolean;
};

type Win = {
  lines: string;
  total: string;
};

type WinLine = {
  index: number;
  start: number;
  length: number;
  tiles: number[];
  tile: number;
  multiplier: number;
  amount: string;
  multipliedAmount: string;
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
export class ConvertSpinResponse {
  public static toSpinResponse(json: string): SpinResponse {
    return cast(JSON.parse(json), r("SpinResponse"));
  }

  public static spinResponseToJson(value: SpinResponse): string {
    return JSON.stringify(uncast(value, r("SpinResponse")), null, 2);
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
  SpinResponse: o(
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
      { json: "winLines", js: "winLines", typ: a(r("WinLine")) },
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
  WinLine: o(
    [
      { json: "index", js: "index", typ: 0 },
      { json: "start", js: "start", typ: 0 },
      { json: "length", js: "length", typ: 0 },
      { json: "tiles", js: "tiles", typ: a(0) },
      { json: "tile", js: "tile", typ: 0 },
      { json: "multiplier", js: "multiplier", typ: 0 },
      { json: "amount", js: "amount", typ: "" },
      { json: "multipliedAmount", js: "multipliedAmount", typ: "" },
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
