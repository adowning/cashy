// To parse this data:
//
//   import { Convert, SettingsReq } from "./file";
//
//   const settingsReq = Convert.toSettingsReq(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type SettingsReq = {
  token: string;
  sessionId: string;
  playMode: string;
  gameId: string;
  userData: UserData;
  custom: Custom;
};

 type Custom = {
  siteId: string;
  extras: string;
};

 type UserData = {
  userId: string;
  hash: string;
  affiliate: string;
  lang: string;
  channel: string;
  userType: string;
  fingerprint: string;
};

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class ConvertSettingsRequest {
  public static toSettingsReq(json: string): SettingsReq {
    return cast(JSON.parse(json), r("SettingsReq"));
  }

  public static settingsReqToJson(value: SettingsReq): string {
    return JSON.stringify(uncast(value, r("SettingsReq")), null, 2);
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
    typ = settingsRequestTypemap[typ.ref];
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

const settingsRequestTypemap: any = {
  SettingsReq: o(
    [
      { json: "token", js: "token", typ: "" },
      { json: "sessionId", js: "sessionId", typ: "" },
      { json: "playMode", js: "playMode", typ: "" },
      { json: "gameId", js: "gameId", typ: "" },
      { json: "userData", js: "userData", typ: r("UserData") },
      { json: "custom", js: "custom", typ: r("Custom") },
    ],
    false
  ),
  Custom: o(
    [
      { json: "siteId", js: "siteId", typ: "" },
      { json: "extras", js: "extras", typ: "" },
    ],
    false
  ),
  UserData: o(
    [
      { json: "userId", js: "userId", typ: "" },
      { json: "hash", js: "hash", typ: "" },
      { json: "affiliate", js: "affiliate", typ: "" },
      { json: "lang", js: "lang", typ: "" },
      { json: "channel", js: "channel", typ: "" },
      { json: "userType", js: "userType", typ: "" },
      { json: "fingerprint", js: "fingerprint", typ: "" },
    ],
    false
  ),
};
export type SettingsRes = {
  success: boolean;
  result: Result;
};

export type Result = {
  user: User;
  game: ResultGame;
  launcher: Launcher;
  jackpots: null;
};

export type ResultGame = {
  cols: number;
  rows: number;
  offset: number;
  extraWin: ExtraWin;
  lines: Array<number[]>;
  tiles: Tile[];
  reelsBuffer: Array<Array<number[]>>;
  features: string[];
  singlePayline: boolean;
  hasState: boolean;
  version: string;
  rtp: RTP;
  volatilityIndex: string;
  maxMultiplier: string;
  maxWinlineHitRate: string;
  maxMultiplierHitRate: string;
  maxMultiplierHitFrequency: string;
  maxMultiplierWinLines: string;
  maxMultiplierWinLinesHitRate: string;
  maxMultiplierWinLinesHitFrequency: string;
  hasGambleGame: boolean;
  gameType: string;
  stateful: boolean;
  hasChoices: boolean;
  stateExpireDays: null;
  hasBonuses: boolean;
  pendingRoundDays: number;
  skin: null;
  hasFeatureBuy: boolean;
};

export type ExtraWin = {
  bigWin: string;
  superWin: string;
  megaWin: string;
};

export type RTP = {
  game: RTPGame;
};

export type RTPGame = {
  default: string;
};

export type Tile = {
  id: number;
  type: Type;
  pays: string[];
};

export enum Type {
  Normal = "normal",
  Scatters = "scatters",
  Wild = "wild",
}

export type Launcher = {
  version: string;
};

export type User = {
  balance: Balance;
  notifications: any[];
  messages: any[];
  bonuses: any[];
  tournaments: any[];
  vouchers: any[];
  userId: number;
  country: string;
  casino: string;
  vertical: string;
  currency: Currency;
  token: string;
  sessionId: string;
  sessionNetPosition: string;
  aamsParticipationId: null;
  aamsSessionId: null;
  depositedAmount: string;
  maxDeposit: string;
  canGamble: boolean;
  lastWin: string;
  prevRounds: any[];
  limits: Limits;
  stakes: Stakes;
  autoplay: Autoplay;
  serverTime: Date;
  additional: null;
};

export type Autoplay = {
  type: string;
  options: Options;
};

export type Options = {
  spins: Spins;
  stopOnFeature: StopOnFeature;
  stopOnLossLimits: StopOnLossLimits;
  stopOnWin: StopOnWin;
  hasRestart: boolean;
};

export type Spins = {
  values: string[];
  default: number;
};

export type StopOnFeature = {
  enabled: boolean;
};

export type StopOnLossLimits = {
  mandatory: boolean;
  enabled: boolean;
  values: string[];
  default: number;
};

export type StopOnWin = {
  enabled: boolean;
  values: string[];
};

export type Balance = {
  cash: string;
  freeBets: string;
  sessionCash: string;
  sessionFreeBets: string;
  bonus: string;
};

export type Currency = {
  code: string;
  symbol: string;
};

export type Limits = {
  maxGambleStake: string;
  maxTotalStake: TotalStake;
  minTotalStake: TotalStake;
  spinDuration: null;
};

export type TotalStake = {
  total: string;
};

export type Stakes = {
  defaultIndex: number;
  lastIndex: number;
  types: string[];
};

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toSettingsRes(json: string): SettingsRes {
    return cast(JSON.parse(json), r("SettingsRes"));
  }

  public static settingsResToJson(value: SettingsRes): string {
    return JSON.stringify(uncast(value, r("SettingsRes")), null, 2);
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
  SettingsRes: o(
    [
      { json: "success", js: "success", typ: true },
      { json: "result", js: "result", typ: r("Result") },
    ],
    false
  ),
  Result: o(
    [
      { json: "user", js: "user", typ: r("User") },
      { json: "game", js: "game", typ: r("ResultGame") },
      { json: "launcher", js: "launcher", typ: r("Launcher") },
      { json: "jackpots", js: "jackpots", typ: null },
    ],
    false
  ),
  ResultGame: o(
    [
      { json: "cols", js: "cols", typ: 0 },
      { json: "rows", js: "rows", typ: 0 },
      { json: "offset", js: "offset", typ: 0 },
      { json: "extraWin", js: "extraWin", typ: r("ExtraWin") },
      { json: "lines", js: "lines", typ: a(a(0)) },
      { json: "tiles", js: "tiles", typ: a(r("Tile")) },
      { json: "reelsBuffer", js: "reelsBuffer", typ: a(a(a(0))) },
      { json: "features", js: "features", typ: a("") },
      { json: "singlePayline", js: "singlePayline", typ: true },
      { json: "hasState", js: "hasState", typ: true },
      { json: "version", js: "version", typ: "" },
      { json: "rtp", js: "rtp", typ: r("RTP") },
      { json: "volatilityIndex", js: "volatilityIndex", typ: "" },
      { json: "maxMultiplier", js: "maxMultiplier", typ: "" },
      { json: "maxWinlineHitRate", js: "maxWinlineHitRate", typ: "" },
      { json: "maxMultiplierHitRate", js: "maxMultiplierHitRate", typ: "" },
      {
        json: "maxMultiplierHitFrequency",
        js: "maxMultiplierHitFrequency",
        typ: "",
      },
      { json: "maxMultiplierWinLines", js: "maxMultiplierWinLines", typ: "" },
      {
        json: "maxMultiplierWinLinesHitRate",
        js: "maxMultiplierWinLinesHitRate",
        typ: "",
      },
      {
        json: "maxMultiplierWinLinesHitFrequency",
        js: "maxMultiplierWinLinesHitFrequency",
        typ: "",
      },
      { json: "hasGambleGame", js: "hasGambleGame", typ: true },
      { json: "gameType", js: "gameType", typ: "" },
      { json: "stateful", js: "stateful", typ: true },
      { json: "hasChoices", js: "hasChoices", typ: true },
      { json: "stateExpireDays", js: "stateExpireDays", typ: null },
      { json: "hasBonuses", js: "hasBonuses", typ: true },
      { json: "pendingRoundDays", js: "pendingRoundDays", typ: 0 },
      { json: "skin", js: "skin", typ: null },
      { json: "hasFeatureBuy", js: "hasFeatureBuy", typ: true },
    ],
    false
  ),
  ExtraWin: o(
    [
      { json: "bigWin", js: "bigWin", typ: "" },
      { json: "superWin", js: "superWin", typ: "" },
      { json: "megaWin", js: "megaWin", typ: "" },
    ],
    false
  ),
  RTP: o([{ json: "game", js: "game", typ: r("RTPGame") }], false),
  RTPGame: o([{ json: "default", js: "default", typ: "" }], false),
  Tile: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "type", js: "type", typ: r("Type") },
      { json: "pays", js: "pays", typ: a("") },
    ],
    false
  ),
  Launcher: o([{ json: "version", js: "version", typ: "" }], false),
  User: o(
    [
      { json: "balance", js: "balance", typ: r("Balance") },
      { json: "notifications", js: "notifications", typ: a("any") },
      { json: "messages", js: "messages", typ: a("any") },
      { json: "bonuses", js: "bonuses", typ: a("any") },
      { json: "tournaments", js: "tournaments", typ: a("any") },
      { json: "vouchers", js: "vouchers", typ: a("any") },
      { json: "userId", js: "userId", typ: 0 },
      { json: "country", js: "country", typ: "" },
      { json: "casino", js: "casino", typ: "" },
      { json: "vertical", js: "vertical", typ: "" },
      { json: "currency", js: "currency", typ: r("Currency") },
      { json: "token", js: "token", typ: "" },
      { json: "sessionId", js: "sessionId", typ: "" },
      { json: "sessionNetPosition", js: "sessionNetPosition", typ: "" },
      { json: "aamsParticipationId", js: "aamsParticipationId", typ: null },
      { json: "aamsSessionId", js: "aamsSessionId", typ: null },
      { json: "depositedAmount", js: "depositedAmount", typ: "" },
      { json: "maxDeposit", js: "maxDeposit", typ: "" },
      { json: "canGamble", js: "canGamble", typ: true },
      { json: "lastWin", js: "lastWin", typ: "" },
      { json: "prevRounds", js: "prevRounds", typ: a("any") },
      { json: "limits", js: "limits", typ: r("Limits") },
      { json: "stakes", js: "stakes", typ: r("Stakes") },
      { json: "autoplay", js: "autoplay", typ: r("Autoplay") },
      { json: "serverTime", js: "serverTime", typ: Date },
      { json: "additional", js: "additional", typ: null },
    ],
    false
  ),
  Autoplay: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "options", js: "options", typ: r("Options") },
    ],
    false
  ),
  Options: o(
    [
      { json: "spins", js: "spins", typ: r("Spins") },
      { json: "stopOnFeature", js: "stopOnFeature", typ: r("StopOnFeature") },
      {
        json: "stopOnLossLimits",
        js: "stopOnLossLimits",
        typ: r("StopOnLossLimits"),
      },
      { json: "stopOnWin", js: "stopOnWin", typ: r("StopOnWin") },
      { json: "hasRestart", js: "hasRestart", typ: true },
    ],
    false
  ),
  Spins: o(
    [
      { json: "values", js: "values", typ: a("") },
      { json: "default", js: "default", typ: 0 },
    ],
    false
  ),
  StopOnFeature: o([{ json: "enabled", js: "enabled", typ: true }], false),
  StopOnLossLimits: o(
    [
      { json: "mandatory", js: "mandatory", typ: true },
      { json: "enabled", js: "enabled", typ: true },
      { json: "values", js: "values", typ: a("") },
      { json: "default", js: "default", typ: 0 },
    ],
    false
  ),
  StopOnWin: o(
    [
      { json: "enabled", js: "enabled", typ: true },
      { json: "values", js: "values", typ: a("") },
    ],
    false
  ),
  Balance: o(
    [
      { json: "cash", js: "cash", typ: "" },
      { json: "freeBets", js: "freeBets", typ: "" },
      { json: "sessionCash", js: "sessionCash", typ: "" },
      { json: "sessionFreeBets", js: "sessionFreeBets", typ: "" },
      { json: "bonus", js: "bonus", typ: "" },
    ],
    false
  ),
  Currency: o(
    [
      { json: "code", js: "code", typ: "" },
      { json: "symbol", js: "symbol", typ: "" },
    ],
    false
  ),
  Limits: o(
    [
      { json: "maxGambleStake", js: "maxGambleStake", typ: "" },
      { json: "maxTotalStake", js: "maxTotalStake", typ: r("TotalStake") },
      { json: "minTotalStake", js: "minTotalStake", typ: r("TotalStake") },
      { json: "spinDuration", js: "spinDuration", typ: null },
    ],
    false
  ),
  TotalStake: o([{ json: "total", js: "total", typ: "" }], false),
  Stakes: o(
    [
      { json: "defaultIndex", js: "defaultIndex", typ: 0 },
      { json: "lastIndex", js: "lastIndex", typ: 0 },
      { json: "types", js: "types", typ: a("") },
    ],
    false
  ),
  Type: ["normal", "scatters", "wild"],
};