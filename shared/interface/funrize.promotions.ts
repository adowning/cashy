// To parse this data:
//
//   import { Convert, Promotions } from "./file";
//
//   const promotions = Convert.toPromotions(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type Promotions = {
  pageType: string;
  seo: null;
  banner: null;
  payload: Payload;
};

export type Payload = {
  promotions: Promotion[];
  availableSoon: AvailableSoon[];
};

export type AvailableSoon = {
  type: string;
  data: AvailableSoonData;
};

export type AvailableSoonData = {
  promoOfferPreset: PromoOfferPreset;
  needDeposits: number;
  preset: Preset;
  money: string;
  enabled: boolean;
};

export type Preset = {
  id: number;
  coins: number;
  entries: number;
  additionalData: null;
  moneyBoxAmount: null;
  accumulatedMoneyBoxAmount: null;
  availableTill: null;
};

export type PromoOfferPreset = {
  imageBanner: string;
  imageBannerMobile: string;
  imagePopup: string;
  imagePopupMobile: null;
  imageMenu: string;
  availableTill: null;
  title: string;
  subTitle: string;
  labelText: string;
  isPeriodic: boolean;
  forCompleteProfile: boolean;
  dayOfWeek: any[];
  isLimitPerDayReason: boolean;
  activeInHours: null;
  additionalData: any[];
  image: null;
  image2X: null;
  imageMobile: null;
  imageMobile2X: null;
  secondImage: null;
  secondImage2X: null;
  secondImageMobile: null;
  secondImageMobile2X: null;
  bannerTextColor: string;
  freeSpin: boolean;
  moneyBoxAmount: null;
  id: number;
  coins: number;
  entries: number;
  bestDeal: boolean;
  mostPopular: boolean;
  rankLeague: boolean;
  imageBadge: string;
  usualPrice: number;
  badgeLabel: string;
  savingsPercent: string;
  subType: string;
  levelUpSectionID: null;
  accumulatedMoneyBoxAmount: null;
};

export type Promotion = {
  type: string;
  data: DataUnion;
  available?: boolean;
};

export type DataUnion = any[] | DataData;

export type DataData = {
  enabled?: boolean;
  dailyLoginInfo?: DailyLoginInfo;
  id?: number;
  dataHistoryID?: number;
  historyID?: number;
  title?: string;
  image?: string;
  images?: Images;
  isActive?: boolean;
  currentTime?: Date;
  start?: string;
  end?: string;
  betMin?: number;
  betsMin?: BetsMin;
  betLimit?: number;
  minBetLimit?: number;
  maxBetLimitShort?: string;
  duration?: string;
  prizeFund?: string;
  prize?: string;
  info?: string;
  isOpen?: boolean;
  isMajor?: boolean;
  startDate?: Date;
  startTime?: string;
  mode?: string;
  prizeLimit?: null;
  games?: Game[];
  gameSlug?: string;
  totalGamesCount?: number;
  raceType?: string;
  prizes?: { [key: string]: PrizeValue }[];
  additionalPrizes?: any[];
  winners?: any[];
  gamesIDS?: number[];
  isAutoSubscription?: boolean;
  betsOn?: string;
  outplayAttempts?: null;
  isTeamBased?: boolean;
  teams?: Team[];
  prizeTotal?: MaxReward;
  available?: boolean;
  type?: string;
  isSubscribed?: boolean;
  grandPrize?: any[];
  isAvailabilityByDeposit?: boolean;
  minDepositAmount?: number;
  isAvailable?: boolean;
  freeSpinsCount?: number;
  sections?: Section[];
  status?: string;
  statusCalculation?: boolean;
  currentReward?: number;
  nextReward?: number;
  availableAfterDateTime?: Date;
  availableAfterDay?: string;
  maxReward?: MaxReward;
  depositStreakInfo?: DepositStreakInfo;
  applePayEnabled?: boolean;
  lastPayProvider?: any[];
  promoOfferPreset?: PromoOfferPreset;
  needDeposits?: number;
  money?: string;
  preset?: Preset;
  prizeEntries?: number;
  prizeCoins?: number;
  depositCondition?: null;
  referralURL?: string;
  package?: null;
};

export type BetsMin = {
  usd: string;
};

export type DailyLoginInfo = {
  levels: number;
  activeLevel: number;
  prizes: PrizeElement[];
};

export type PrizeElement = {
  entries?: number;
  coins?: number;
  freeSpinID?: number;
  freeSpinCount?: number;
  gameID?: number;
};

export type DepositStreakInfo = {
  success: boolean;
  maxNumberOfDeposit: number;
  currentCountDeposit: number;
  finishedAt: Date;
  expiredAt: Date;
  depositAmounts: any[];
  deposits: any[];
  minDepositValue: number;
  percentEnabled: boolean;
  secondsToResetStreakCounter: null;
  resetStreakAt: null;
  dailyWinStreakLimitExceeded: boolean;
  balanceLimit: number;
  maxPercentage: number;
  streakEventID: number;
  settings: any[];
  images: null;
  depositStreakSkin: string;
  wheelSkin: null;
};

export type Game = {
  slug: string;
  imageBig: null | string;
  imageSmall: null;
  imageMobile: string;
  title: string;
};

export type Images = {
  imagePrizeCard: string;
  bannerDesktop: string;
  bannerMobile: string;
  imageBanner: string;
  imageBannerMobile: string;
};

export type MaxReward = {
  entries: number;
  coins: number;
};

export type PrizeValue = {
  entries: number;
};

export type Section = {
  id: number;
  title: string;
  weeklyReward: number;
  maxReward: MaxReward;
};

export type Team = {
  id: number;
  title: string;
  totalPoints: number;
  isPlayerTeam: boolean;
};

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toPromotions(json: string): Promotions {
    return cast(JSON.parse(json), r("Promotions"));
  }

  public static promotionsToJson(value: Promotions): string {
    return JSON.stringify(uncast(value, r("Promotions")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
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

function transform(val: any, typ: any, getProps: any, key: any = "", parent: any = ""): any {
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

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
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
  Promotions: o(
    [
      { json: "pageType", js: "pageType", typ: "" },
      { json: "seo", js: "seo", typ: null },
      { json: "banner", js: "banner", typ: null },
      { json: "payload", js: "payload", typ: r("Payload") },
    ],
    false
  ),
  Payload: o(
    [
      { json: "promotions", js: "promotions", typ: a(r("Promotion")) },
      { json: "available_soon", js: "availableSoon", typ: a(r("AvailableSoon")) },
    ],
    false
  ),
  AvailableSoon: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "data", js: "data", typ: r("AvailableSoonData") },
    ],
    false
  ),
  AvailableSoonData: o(
    [
      { json: "promoOfferPreset", js: "promoOfferPreset", typ: r("PromoOfferPreset") },
      { json: "needDeposits", js: "needDeposits", typ: 0 },
      { json: "preset", js: "preset", typ: r("Preset") },
      { json: "money", js: "money", typ: "" },
      { json: "enabled", js: "enabled", typ: true },
    ],
    false
  ),
  Preset: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "coins", js: "coins", typ: 0 },
      { json: "entries", js: "entries", typ: 0 },
      { json: "additionalData", js: "additionalData", typ: null },
      { json: "moneyBoxAmount", js: "moneyBoxAmount", typ: null },
      { json: "accumulatedMoneyBoxAmount", js: "accumulatedMoneyBoxAmount", typ: null },
      { json: "availableTill", js: "availableTill", typ: null },
    ],
    false
  ),
  PromoOfferPreset: o(
    [
      { json: "imageBanner", js: "imageBanner", typ: "" },
      { json: "imageBannerMobile", js: "imageBannerMobile", typ: "" },
      { json: "imagePopup", js: "imagePopup", typ: "" },
      { json: "imagePopupMobile", js: "imagePopupMobile", typ: null },
      { json: "imageMenu", js: "imageMenu", typ: "" },
      { json: "availableTill", js: "availableTill", typ: null },
      { json: "title", js: "title", typ: "" },
      { json: "subTitle", js: "subTitle", typ: "" },
      { json: "labelText", js: "labelText", typ: "" },
      { json: "isPeriodic", js: "isPeriodic", typ: true },
      { json: "forCompleteProfile", js: "forCompleteProfile", typ: true },
      { json: "dayOfWeek", js: "dayOfWeek", typ: a("any") },
      { json: "isLimitPerDayReason", js: "isLimitPerDayReason", typ: true },
      { json: "activeInHours", js: "activeInHours", typ: null },
      { json: "additionalData", js: "additionalData", typ: a("any") },
      { json: "image", js: "image", typ: null },
      { json: "image2x", js: "image2X", typ: null },
      { json: "imageMobile", js: "imageMobile", typ: null },
      { json: "imageMobile2x", js: "imageMobile2X", typ: null },
      { json: "secondImage", js: "secondImage", typ: null },
      { json: "secondImage2x", js: "secondImage2X", typ: null },
      { json: "secondImageMobile", js: "secondImageMobile", typ: null },
      { json: "secondImageMobile2x", js: "secondImageMobile2X", typ: null },
      { json: "bannerTextColor", js: "bannerTextColor", typ: "" },
      { json: "freeSpin", js: "freeSpin", typ: true },
      { json: "moneyBoxAmount", js: "moneyBoxAmount", typ: null },
      { json: "id", js: "id", typ: 0 },
      { json: "coins", js: "coins", typ: 0 },
      { json: "entries", js: "entries", typ: 0 },
      { json: "bestDeal", js: "bestDeal", typ: true },
      { json: "mostPopular", js: "mostPopular", typ: true },
      { json: "rankLeague", js: "rankLeague", typ: true },
      { json: "imageBadge", js: "imageBadge", typ: "" },
      { json: "usualPrice", js: "usualPrice", typ: 0 },
      { json: "badgeLabel", js: "badgeLabel", typ: "" },
      { json: "savingsPercent", js: "savingsPercent", typ: "" },
      { json: "subType", js: "subType", typ: "" },
      { json: "levelUpSectionId", js: "levelUpSectionID", typ: null },
      { json: "accumulatedMoneyBoxAmount", js: "accumulatedMoneyBoxAmount", typ: null },
    ],
    false
  ),
  Promotion: o(
    [
      { json: "type", js: "type", typ: "" },
      { json: "data", js: "data", typ: u(a("any"), r("DataData")) },
      { json: "available", js: "available", typ: u(undefined, true) },
    ],
    false
  ),
  DataData: o(
    [
      { json: "enabled", js: "enabled", typ: u(undefined, true) },
      { json: "dailyLoginInfo", js: "dailyLoginInfo", typ: u(undefined, r("DailyLoginInfo")) },
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "history_id", js: "dataHistoryID", typ: u(undefined, 0) },
      { json: "historyId", js: "historyID", typ: u(undefined, 0) },
      { json: "title", js: "title", typ: u(undefined, "") },
      { json: "image", js: "image", typ: u(undefined, "") },
      { json: "images", js: "images", typ: u(undefined, r("Images")) },
      { json: "isActive", js: "isActive", typ: u(undefined, true) },
      { json: "currentTime", js: "currentTime", typ: u(undefined, Date) },
      { json: "start", js: "start", typ: u(undefined, "") },
      { json: "end", js: "end", typ: u(undefined, "") },
      { json: "betMin", js: "betMin", typ: u(undefined, 0) },
      { json: "betsMin", js: "betsMin", typ: u(undefined, r("BetsMin")) },
      { json: "betLimit", js: "betLimit", typ: u(undefined, 0) },
      { json: "minBetLimit", js: "minBetLimit", typ: u(undefined, 0) },
      { json: "maxBetLimitShort", js: "maxBetLimitShort", typ: u(undefined, "") },
      { json: "duration", js: "duration", typ: u(undefined, "") },
      { json: "prizeFund", js: "prizeFund", typ: u(undefined, "") },
      { json: "prize", js: "prize", typ: u(undefined, "") },
      { json: "info", js: "info", typ: u(undefined, "") },
      { json: "isOpen", js: "isOpen", typ: u(undefined, true) },
      { json: "isMajor", js: "isMajor", typ: u(undefined, true) },
      { json: "startDate", js: "startDate", typ: u(undefined, Date) },
      { json: "startTime", js: "startTime", typ: u(undefined, "") },
      { json: "mode", js: "mode", typ: u(undefined, "") },
      { json: "prizeLimit", js: "prizeLimit", typ: u(undefined, null) },
      { json: "games", js: "games", typ: u(undefined, a(r("Game"))) },
      { json: "gameSlug", js: "gameSlug", typ: u(undefined, "") },
      { json: "totalGamesCount", js: "totalGamesCount", typ: u(undefined, 0) },
      { json: "raceType", js: "raceType", typ: u(undefined, "") },
      { json: "prizes", js: "prizes", typ: u(undefined, a(m(r("PrizeValue")))) },
      { json: "additionalPrizes", js: "additionalPrizes", typ: u(undefined, a("any")) },
      { json: "winners", js: "winners", typ: u(undefined, a("any")) },
      { json: "gamesIds", js: "gamesIDS", typ: u(undefined, a(0)) },
      { json: "isAutoSubscription", js: "isAutoSubscription", typ: u(undefined, true) },
      { json: "betsOn", js: "betsOn", typ: u(undefined, "") },
      { json: "outplayAttempts", js: "outplayAttempts", typ: u(undefined, null) },
      { json: "isTeamBased", js: "isTeamBased", typ: u(undefined, true) },
      { json: "teams", js: "teams", typ: u(undefined, a(r("Team"))) },
      { json: "prizeTotal", js: "prizeTotal", typ: u(undefined, r("MaxReward")) },
      { json: "available", js: "available", typ: u(undefined, true) },
      { json: "type", js: "type", typ: u(undefined, "") },
      { json: "isSubscribed", js: "isSubscribed", typ: u(undefined, true) },
      { json: "grandPrize", js: "grandPrize", typ: u(undefined, a("any")) },
      { json: "isAvailabilityByDeposit", js: "isAvailabilityByDeposit", typ: u(undefined, true) },
      { json: "minDepositAmount", js: "minDepositAmount", typ: u(undefined, 0) },
      { json: "isAvailable", js: "isAvailable", typ: u(undefined, true) },
      { json: "freeSpinsCount", js: "freeSpinsCount", typ: u(undefined, 0) },
      { json: "sections", js: "sections", typ: u(undefined, a(r("Section"))) },
      { json: "status", js: "status", typ: u(undefined, "") },
      { json: "statusCalculation", js: "statusCalculation", typ: u(undefined, true) },
      { json: "currentReward", js: "currentReward", typ: u(undefined, 0) },
      { json: "nextReward", js: "nextReward", typ: u(undefined, 0) },
      { json: "availableAfterDateTime", js: "availableAfterDateTime", typ: u(undefined, Date) },
      { json: "availableAfterDay", js: "availableAfterDay", typ: u(undefined, "") },
      { json: "maxReward", js: "maxReward", typ: u(undefined, r("MaxReward")) },
      { json: "depositStreakInfo", js: "depositStreakInfo", typ: u(undefined, r("DepositStreakInfo")) },
      { json: "applePayEnabled", js: "applePayEnabled", typ: u(undefined, true) },
      { json: "lastPayProvider", js: "lastPayProvider", typ: u(undefined, a("any")) },
      { json: "promoOfferPreset", js: "promoOfferPreset", typ: u(undefined, r("PromoOfferPreset")) },
      { json: "needDeposits", js: "needDeposits", typ: u(undefined, 0) },
      { json: "money", js: "money", typ: u(undefined, "") },
      { json: "preset", js: "preset", typ: u(undefined, r("Preset")) },
      { json: "prizeEntries", js: "prizeEntries", typ: u(undefined, 0) },
      { json: "prizeCoins", js: "prizeCoins", typ: u(undefined, 0) },
      { json: "depositCondition", js: "depositCondition", typ: u(undefined, null) },
      { json: "referralUrl", js: "referralURL", typ: u(undefined, "") },
      { json: "package", js: "package", typ: u(undefined, null) },
    ],
    false
  ),
  BetsMin: o([{ json: "USD", js: "usd", typ: "" }], false),
  DailyLoginInfo: o(
    [
      { json: "levels", js: "levels", typ: 0 },
      { json: "activeLevel", js: "activeLevel", typ: 0 },
      { json: "prizes", js: "prizes", typ: a(r("PrizeElement")) },
    ],
    false
  ),
  PrizeElement: o(
    [
      { json: "entries", js: "entries", typ: u(undefined, 0) },
      { json: "coins", js: "coins", typ: u(undefined, 0) },
      { json: "freeSpinId", js: "freeSpinID", typ: u(undefined, 0) },
      { json: "freeSpinCount", js: "freeSpinCount", typ: u(undefined, 0) },
      { json: "gameId", js: "gameID", typ: u(undefined, 0) },
    ],
    false
  ),
  DepositStreakInfo: o(
    [
      { json: "success", js: "success", typ: true },
      { json: "maxNumberOfDeposit", js: "maxNumberOfDeposit", typ: 0 },
      { json: "currentCountDeposit", js: "currentCountDeposit", typ: 0 },
      { json: "finishedAt", js: "finishedAt", typ: Date },
      { json: "expiredAt", js: "expiredAt", typ: Date },
      { json: "depositAmounts", js: "depositAmounts", typ: a("any") },
      { json: "deposits", js: "deposits", typ: a("any") },
      { json: "minDepositValue", js: "minDepositValue", typ: 3.14 },
      { json: "percentEnabled", js: "percentEnabled", typ: true },
      { json: "secondsToResetStreakCounter", js: "secondsToResetStreakCounter", typ: null },
      { json: "resetStreakAt", js: "resetStreakAt", typ: null },
      { json: "dailyWinStreakLimitExceeded", js: "dailyWinStreakLimitExceeded", typ: true },
      { json: "balanceLimit", js: "balanceLimit", typ: 0 },
      { json: "maxPercentage", js: "maxPercentage", typ: 0 },
      { json: "streakEventId", js: "streakEventID", typ: 0 },
      { json: "settings", js: "settings", typ: a("any") },
      { json: "images", js: "images", typ: null },
      { json: "depositStreakSkin", js: "depositStreakSkin", typ: "" },
      { json: "wheelSkin", js: "wheelSkin", typ: null },
    ],
    false
  ),
  Game: o(
    [
      { json: "slug", js: "slug", typ: "" },
      { json: "image_big", js: "imageBig", typ: u(null, "") },
      { json: "image_small", js: "imageSmall", typ: null },
      { json: "image_mobile", js: "imageMobile", typ: "" },
      { json: "title", js: "title", typ: "" },
    ],
    false
  ),
  Images: o(
    [
      { json: "imagePrizeCard", js: "imagePrizeCard", typ: "" },
      { json: "bannerDesktop", js: "bannerDesktop", typ: "" },
      { json: "bannerMobile", js: "bannerMobile", typ: "" },
      { json: "imageBanner", js: "imageBanner", typ: "" },
      { json: "imageBannerMobile", js: "imageBannerMobile", typ: "" },
    ],
    false
  ),
  MaxReward: o(
    [
      { json: "entries", js: "entries", typ: 0 },
      { json: "coins", js: "coins", typ: 0 },
    ],
    false
  ),
  PrizeValue: o([{ json: "entries", js: "entries", typ: 0 }], false),
  Section: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "title", js: "title", typ: "" },
      { json: "weeklyReward", js: "weeklyReward", typ: 0 },
      { json: "maxReward", js: "maxReward", typ: r("MaxReward") },
    ],
    false
  ),
  Team: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "title", js: "title", typ: "" },
      { json: "totalPoints", js: "totalPoints", typ: 0 },
      { json: "isPlayerTeam", js: "isPlayerTeam", typ: true },
    ],
    false
  ),
};
/*
{
    "pageType": "",
    "seo": null,
    "banner": null,
    "payload": {
        "promotions": [
            {
                "type": "dailyLogin",
                "data": {
                    "enabled": true,
                    "dailyLoginInfo": {
                        "levels": 7,
                        "activeLevel": 1,
                        "prizes": [
                            {
                                "entries": 20,
                                "coins": 0
                            },
                            {
                                "freeSpinId": 109,
                                "freeSpinCount": 2,
                                "gameId": 1741
                            },
                            {
                                "entries": 20,
                                "coins": 0
                            },
                            {
                                "freeSpinId": 110,
                                "freeSpinCount": 4,
                                "gameId": 1736
                            },
                            {
                                "entries": 20,
                                "coins": 0
                            },
                            {
                                "entries": 20,
                                "coins": 0
                            },
                            {
                                "freeSpinId": 111,
                                "freeSpinCount": 10,
                                "gameId": 2036
                            }
                        ]
                    }
                }
            },
            {
                "type": "teamTournament",
                "data": {
                    "id": 1312,
                    "history_id": 14287,
                    "historyId": 14287,
                    "title": "Hunt for Victory",
                    "image": "\/uploads\/tournaments\/681372b9db3b8.png",
                    "images": {
                        "imagePrizeCard": "",
                        "bannerDesktop": "",
                        "bannerMobile": "",
                        "imageBanner": "",
                        "imageBannerMobile": ""
                    },
                    "isActive": true,
                    "currentTime": "2025-05-02",
                    "start": "Thu, 01 May 2025 17:00:02 +0300",
                    "end": "Fri, 02 May 2025 06:58:00 +0300",
                    "betMin": 20,
                    "betsMin": {
                        "USD": "0.2"
                    },
                    "betLimit": 1000,
                    "minBetLimit": 0,
                    "maxBetLimitShort": "",
                    "duration": "13 h 58 m",
                    "prizeFund": "100000",
                    "prize": "100000",
                    "info": "",
                    "isOpen": true,
                    "isMajor": false,
                    "startDate": "2025-05-01",
                    "startTime": "17:00",
                    "mode": "wins",
                    "prizeLimit": null,
                    "games": [
                        {
                            "slug": "luxor-relics",
                            "image_big": null,
                            "image_small": null,
                            "image_mobile": "\/uploads\/games_items\/LuxorRelics-min.jpg",
                            "title": "Luxor Relics <span>Hold'N'Link<\/span>"
                        },
                        {
                            "slug": "hot-cash-holdnlink",
                            "image_big": null,
                            "image_small": null,
                            "image_mobile": "\/uploads\/games_items\/HotCash-min.jpg",
                            "title": "Hot Cash <span>Hold'N'Link<\/span>"
                        },
                        {
                            "slug": "african-king-holdnlink",
                            "image_big": "\/uploads\/games_items\/AfricanKing.webp",
                            "image_small": null,
                            "image_mobile": "\/uploads\/games_items\/African-King-HnL-2x.png",
                            "title": "African King <span>Hold'N'Link<\/span>"
                        },
                        {
                            "slug": "squid-slot",
                            "image_big": null,
                            "image_small": null,
                            "image_mobile": "\/uploads\/games_items\/Squid-Slot-min.jpg",
                            "title": "Squid Slot"
                        },
                        {
                            "slug": "just-gems-holdnlink",
                            "image_big": null,
                            "image_small": null,
                            "image_mobile": "\/uploads\/games_items\/JustGems-min.jpg",
                            "title": "Just Gems <span>Hold'N'Link<\/span>"
                        },
                        {
                            "slug": "charming-gold-holdnlink",
                            "image_big": null,
                            "image_small": null,
                            "image_mobile": "\/uploads\/games_items\/CharmingGold-min.jpg",
                            "title": "Charming Gold <span>Hold'N'Link<\/span>"
                        },
                        {
                            "slug": "royal-fruits-5-holdnlink",
                            "image_big": null,
                            "image_small": null,
                            "image_mobile": "\/uploads\/games_items\/Royal-Fruits-30-min.jpg",
                            "title": "Royal Fruits 5 <span>Hold'N'Link<\/span>"
                        },
                        {
                            "slug": "dolphin-queen-holdnlink",
                            "image_big": null,
                            "image_small": null,
                            "image_mobile": "\/uploads\/games_items\/Dolphin-Queen_Hold-n-link-min.jpg",
                            "title": "Dolphin Queen <span>Hold'N'Link<\/span>"
                        }
                    ],
                    "gameSlug": "luxor-relics",
                    "totalGamesCount": 983,
                    "raceType": "small",
                    "prizes": [
                        {
                            "1": {
                                "entries": 7500
                            },
                            "2": {
                                "entries": 5000
                            },
                            "3": {
                                "entries": 4000
                            },
                            "4": {
                                "entries": 3500
                            },
                            "5": {
                                "entries": 3500
                            },
                            "6": {
                                "entries": 3000
                            },
                            "7": {
                                "entries": 3000
                            },
                            "8": {
                                "entries": 3000
                            },
                            "9": {
                                "entries": 2500
                            },
                            "10": {
                                "entries": 2500
                            },
                            "11": {
                                "entries": 2500
                            },
                            "12": {
                                "entries": 2500
                            },
                            "13": {
                                "entries": 1500
                            },
                            "14": {
                                "entries": 1500
                            },
                            "15": {
                                "entries": 1500
                            },
                            "16": {
                                "entries": 1500
                            },
                            "17": {
                                "entries": 1500
                            },
                            "18": {
                                "entries": 1000
                            },
                            "19": {
                                "entries": 1000
                            },
                            "20": {
                                "entries": 1000
                            },
                            "21": {
                                "entries": 1000
                            },
                            "22": {
                                "entries": 1000
                            },
                            "23": {
                                "entries": 1000
                            },
                            "24": {
                                "entries": 900
                            },
                            "25": {
                                "entries": 900
                            },
                            "26": {
                                "entries": 900
                            },
                            "27": {
                                "entries": 900
                            },
                            "28": {
                                "entries": 900
                            },
                            "29": {
                                "entries": 900
                            },
                            "30": {
                                "entries": 900
                            },
                            "31": {
                                "entries": 800
                            },
                            "32": {
                                "entries": 800
                            },
                            "33": {
                                "entries": 800
                            },
                            "34": {
                                "entries": 800
                            },
                            "35": {
                                "entries": 700
                            },
                            "36": {
                                "entries": 700
                            },
                            "37": {
                                "entries": 700
                            },
                            "38": {
                                "entries": 700
                            },
                            "39": {
                                "entries": 600
                            },
                            "40": {
                                "entries": 600
                            },
                            "41": {
                                "entries": 600
                            },
                            "42": {
                                "entries": 600
                            },
                            "43": {
                                "entries": 600
                            },
                            "44": {
                                "entries": 600
                            },
                            "45": {
                                "entries": 600
                            },
                            "46": {
                                "entries": 500
                            },
                            "47": {
                                "entries": 500
                            },
                            "48": {
                                "entries": 500
                            },
                            "49": {
                                "entries": 500
                            },
                            "50": {
                                "entries": 500
                            }
                        },
                        {
                            "1": {
                                "entries": 2500
                            },
                            "2": {
                                "entries": 1700
                            },
                            "3": {
                                "entries": 1400
                            },
                            "4": {
                                "entries": 1200
                            },
                            "5": {
                                "entries": 1200
                            },
                            "6": {
                                "entries": 1000
                            },
                            "7": {
                                "entries": 1000
                            },
                            "8": {
                                "entries": 1000
                            },
                            "9": {
                                "entries": 800
                            },
                            "10": {
                                "entries": 800
                            },
                            "11": {
                                "entries": 800
                            },
                            "12": {
                                "entries": 800
                            },
                            "13": {
                                "entries": 500
                            },
                            "14": {
                                "entries": 500
                            },
                            "15": {
                                "entries": 500
                            },
                            "16": {
                                "entries": 500
                            },
                            "17": {
                                "entries": 500
                            },
                            "18": {
                                "entries": 300
                            },
                            "19": {
                                "entries": 300
                            },
                            "20": {
                                "entries": 300
                            },
                            "21": {
                                "entries": 300
                            },
                            "22": {
                                "entries": 300
                            },
                            "23": {
                                "entries": 300
                            },
                            "24": {
                                "entries": 300
                            },
                            "25": {
                                "entries": 300
                            },
                            "26": {
                                "entries": 300
                            },
                            "27": {
                                "entries": 300
                            },
                            "28": {
                                "entries": 300
                            },
                            "29": {
                                "entries": 300
                            },
                            "30": {
                                "entries": 300
                            },
                            "31": {
                                "entries": 300
                            },
                            "32": {
                                "entries": 300
                            },
                            "33": {
                                "entries": 300
                            },
                            "34": {
                                "entries": 300
                            },
                            "35": {
                                "entries": 200
                            },
                            "36": {
                                "entries": 200
                            },
                            "37": {
                                "entries": 200
                            },
                            "38": {
                                "entries": 200
                            },
                            "39": {
                                "entries": 200
                            },
                            "40": {
                                "entries": 200
                            },
                            "41": {
                                "entries": 200
                            },
                            "42": {
                                "entries": 200
                            },
                            "43": {
                                "entries": 200
                            },
                            "44": {
                                "entries": 200
                            },
                            "45": {
                                "entries": 200
                            },
                            "46": {
                                "entries": 200
                            },
                            "47": {
                                "entries": 200
                            },
                            "48": {
                                "entries": 200
                            },
                            "49": {
                                "entries": 200
                            },
                            "50": {
                                "entries": 200
                            }
                        }
                    ],
                    "additionalPrizes": [],
                    "winners": [],
                    "gamesIds": [
                        1734,
                        1735,
                        1736,
                        1737,
                        1738,
                        1739,
                        1740,

                        2835,
                        2836,
                        2837,
                        2838,
                        2839,
                        2840,
                        2841,
                        2842,
                        2843,
                        3156,
                        3199,
                        3200,
                        3201,
                        3202,
                        1718,
                        1719,
                        1728,
                        1731,
                        1733,
                        3203,
                        3217,
                        3218,
                        3219,
                        3224,
                        3225,
                        3227
                    ],
                    "isAutoSubscription": false,
                    "betsOn": "entries",
                    "outplayAttempts": null,
                    "isTeamBased": true,
                    "teams": [
                        {
                            "id": 1,
                            "title": "Lucky Rollers",
                            "totalPoints": 79563,
                            "isPlayerTeam": false
                        },
                        {
                            "id": 2,
                            "title": "Game Changers",
                            "totalPoints": 81318,
                            "isPlayerTeam": false
                        }
                    ],
                    "prizeTotal": {
                        "entries": 100000,
                        "coins": 0
                    }
                }
            },
            {
                "type": "quest",
                "data": {
                    "available": true,
                    "title": "FP Challenge",
                    "type": "fp_challenge",
                    "isSubscribed": false,
                    "grandPrize": [],
                    "isAvailabilityByDeposit": false,
                    "minDepositAmount": 1,
                    "isAvailable": false,
                    "freeSpinsCount": 1500
                }
            },
            {
                "type": "rankLeagueCashback",
                "data": {
                    "enabled": true,
                    "sections": [
                        {
                            "id": 1,
                            "title": "Bronze",
                            "weeklyReward": 5,
                            "maxReward": {
                                "entries": 10000,
                                "coins": 100000
                            }
                        },
                        {
                            "id": 2,
                            "title": "Silver",
                            "weeklyReward": 5,
                            "maxReward": {
                                "entries": 10000,
                                "coins": 100000
                            }
                        },
                        {
                            "id": 3,
                            "title": "Gold",
                            "weeklyReward": 5,
                            "maxReward": {
                                "entries": 10000,
                                "coins": 100000
                            }
                        },
                        {
                            "id": 4,
                            "title": "Platinum",
                            "weeklyReward": 5,
                            "maxReward": {
                                "entries": 10000,
                                "coins": 100000
                            }
                        },
                        {
                            "id": 5,
                            "title": "Sapphire",
                            "weeklyReward": 5,
                            "maxReward": {
                                "entries": 10000,
                                "coins": 100000
                            }
                        },
                        {
                            "id": 6,
                            "title": "Diamond",
                            "weeklyReward": 5,
                            "maxReward": {
                                "entries": 10000,
                                "coins": 100000
                            }
                        },
                        {
                            "id": 7,
                            "title": "VIP",
                            "weeklyReward": 5,
                            "maxReward": {
                                "entries": 10000,
                                "coins": 100000
                            }
                        }
                    ],
                    "status": "waiting",
                    "statusCalculation": false,
                    "currentReward": 5,
                    "nextReward": 5,
                    "availableAfterDateTime": "2025-05-05T00:00:00-04:00",
                    "availableAfterDay": "monday",
                    "maxReward": {
                        "entries": 10000,
                        "coins": 100000
                    }
                }
            },
            {
                "type": "depositStreak",
                "data": {
                    "enabled": true,
                    "depositStreakInfo": {
                        "success": true,
                        "maxNumberOfDeposit": 5,
                        "currentCountDeposit": 0,
                        "finishedAt": "2025-05-05 00:00:00",
                        "expiredAt": "2025-05-05 00:00:00",
                        "depositAmounts": [],
                        "deposits": [],
                        "minDepositValue": 19.99,
                        "percentEnabled": true,
                        "secondsToResetStreakCounter": null,
                        "resetStreakAt": null,
                        "dailyWinStreakLimitExceeded": false,
                        "balanceLimit": 0,
                        "maxPercentage": 100,
                        "streakEventId": 7,
                        "settings": [],
                        "images": null,
                        "depositStreakSkin": "neutral_wheel_of_wins",
                        "wheelSkin": null
                    }
                }
            },
            {
                "type": "offerDeposit",
                "data": {
                    "applePayEnabled": true,
                    "lastPayProvider": [],
                    "promoOfferPreset": {
                        "imageBanner": "\/uploads\/promo_offers_presets\/reactivation-10.png",
                        "imageBannerMobile": "\/uploads\/promo_offers_presets\/reactivation_mob-4.png",
                        "imagePopup": "\/uploads\/promo_offers_presets\/reactivation-4.png",
                        "imagePopupMobile": null,
                        "imageMenu": "\/uploads\/promo_offers_presets\/4-1731441779.png",
                        "availableTill": null,
                        "title": "YOUR PERSONAL OFFER",
                        "subTitle": "",
                        "labelText": "<h1 class=\"banner-title text-uppercase\">Your Personal offer<\/h1>",
                        "isPeriodic": false,
                        "forCompleteProfile": false,
                        "dayOfWeek": [],
                        "isLimitPerDayReason": false,
                        "activeInHours": null,
                        "additionalData": [],
                        "image": null,
                        "image2x": null,
                        "imageMobile": null,
                        "imageMobile2x": null,
                        "secondImage": null,
                        "secondImage2x": null,
                        "secondImageMobile": null,
                        "secondImageMobile2x": null,
                        "bannerTextColor": "",
                        "freeSpin": false,
                        "moneyBoxAmount": null,
                        "id": 731,
                        "coins": 225000,
                        "entries": 2000,
                        "bestDeal": true,
                        "mostPopular": false,
                        "rankLeague": false,
                        "imageBadge": "\/uploads\/promo_offers_presets\/3-1731441779.png",
                        "usualPrice": 0,
                        "badgeLabel": "{\"percent\": \"350%\", \"text\": \"EXTRA COINS\"}",
                        "savingsPercent": "",
                        "subType": "",
                        "levelUpSectionId": null,
                        "accumulatedMoneyBoxAmount": null
                    },
                    "needDeposits": 0,
                    "money": "4.99",
                    "preset": {
                        "id": 18,
                        "coins": 50000,
                        "entries": 500,
                        "additionalData": null,
                        "moneyBoxAmount": null,
                        "accumulatedMoneyBoxAmount": null,
                        "availableTill": null
                    },
                    "enabled": true
                }
            },
            {
                "type": "offerDeposit",
                "data": {
                    "applePayEnabled": true,
                    "lastPayProvider": [],
                    "promoOfferPreset": {
                        "imageBanner": "\/uploads\/promo_offers_presets\/welcome-pack_most-popular.png",
                        "imageBannerMobile": "\/uploads\/promo_offers_presets\/welcome-pack_most-popular_mob.png",
                        "imagePopup": "\/uploads\/promo_offers_presets\/mostpopular.png",
                        "imagePopupMobile": null,
                        "imageMenu": "\/uploads\/promo_offers_presets\/678698585acc8.jpg",
                        "availableTill": null,
                        "title": "YOUR PERSONAL OFFER",
                        "subTitle": "OFFER ONLY AVAILABLE ONCE",
                        "labelText": "",
                        "isPeriodic": false,
                        "forCompleteProfile": false,
                        "dayOfWeek": [],
                        "isLimitPerDayReason": false,
                        "activeInHours": null,
                        "additionalData": [],
                        "image": null,
                        "image2x": null,
                        "imageMobile": null,
                        "imageMobile2x": null,
                        "secondImage": null,
                        "secondImage2x": null,
                        "secondImageMobile": null,
                        "secondImageMobile2x": null,
                        "bannerTextColor": "",
                        "freeSpin": false,
                        "moneyBoxAmount": null,
                        "id": 647,
                        "coins": 875000,
                        "entries": 5000,
                        "bestDeal": false,
                        "mostPopular": true,
                        "rankLeague": false,
                        "imageBadge": "\/uploads\/promo_offers_presets\/circle_final-33496-87357-11351.png",
                        "usualPrice": 0,
                        "badgeLabel": "{\"percent\": \"250%\", \"text\": \"EXTRA COINS\"}",
                        "savingsPercent": "",
                        "subType": "",
                        "levelUpSectionId": null,
                        "accumulatedMoneyBoxAmount": null
                    },
                    "needDeposits": 0,
                    "money": "24.99",
                    "preset": {
                        "id": 23,
                        "coins": 250000,
                        "entries": 2500,
                        "additionalData": null,
                        "moneyBoxAmount": null,
                        "accumulatedMoneyBoxAmount": null,
                        "availableTill": null
                    },
                    "enabled": true
                }
            },
            {
                "type": "invite",
                "available": true,
                "data": {
                    "prizeEntries": 2500,
                    "prizeCoins": 900000,
                    "depositCondition": null,
                    "referralUrl": "https:\/\/funrize.com\/?invited_by=FEZV6O",
                    "package": null
                }
            },
            {
                "type": "tournament",
                "data": []
            },
            {
                "type": "dailyWheel",
                "data": {
                    "enabled": false
                }
            }
        ],
        "available_soon": [
            {
                "type": "offerDeposit",
                "data": {
                    "promoOfferPreset": {
                        "imageBanner": "\/uploads\/promo_offers_presets\/welcome-pack_best-deal-1.png",
                        "imageBannerMobile": "\/uploads\/promo_offers_presets\/welcome-pack_best-deal_mob-1.png",
                        "imagePopup": "\/uploads\/promo_offers_presets\/best-deal-6.png",
                        "imagePopupMobile": null,
                        "imageMenu": "\/uploads\/promo_offers_presets\/4-1731429608.jpg",
                        "availableTill": null,
                        "title": "YOUR PERSONAL OFFER",
                        "subTitle": "",
                        "labelText": "",
                        "isPeriodic": false,
                        "forCompleteProfile": false,
                        "dayOfWeek": [],
                        "isLimitPerDayReason": false,
                        "activeInHours": null,
                        "additionalData": [],
                        "image": null,
                        "image2x": null,
                        "imageMobile": null,
                        "imageMobile2x": null,
                        "secondImage": null,
                        "secondImage2x": null,
                        "secondImageMobile": null,
                        "secondImageMobile2x": null,
                        "bannerTextColor": "",
                        "freeSpin": false,
                        "moneyBoxAmount": null,
                        "id": 16,
                        "coins": 1200000,
                        "entries": 6000,
                        "bestDeal": true,
                        "mostPopular": false,
                        "rankLeague": false,
                        "imageBadge": "\/uploads\/promo_offers_presets\/more-84038-16319.png",
                        "usualPrice": 0,
                        "badgeLabel": "{\"percent\": \"300%\", \"text\": \"EXTRA COINS\"}",
                        "savingsPercent": "",
                        "subType": "",
                        "levelUpSectionId": null,
                        "accumulatedMoneyBoxAmount": null
                    },
                    "needDeposits": 1,
                    "preset": {
                        "id": 7,
                        "coins": 300000,
                        "entries": 3000,
                        "additionalData": null,
                        "moneyBoxAmount": null,
                        "accumulatedMoneyBoxAmount": null,
                        "availableTill": null
                    },
                    "money": "29.99",
                    "enabled": false
                }
            },
            {
                "type": "offerDeposit",
                "data": {
                    "promoOfferPreset": {
                        "imageBanner": "\/uploads\/promo_offers_presets\/welcome-pack_most-popular-1.png",
                        "imageBannerMobile": "\/uploads\/promo_offers_presets\/welcome-pack_most-popular_mob-1.png",
                        "imagePopup": "\/uploads\/promo_offers_presets\/most-popular-6.png",
                        "imagePopupMobile": null,
                        "imageMenu": "\/uploads\/promo_offers_presets\/444-1732635714.png",
                        "availableTill": null,
                        "title": "YOUR EXCLUSIVE OFFER",
                        "subTitle": "",
                        "labelText": "<h1 class=\"banner-title text-uppercase\">Your Personal offer<\/h1>",
                        "isPeriodic": false,
                        "forCompleteProfile": false,
                        "dayOfWeek": [],
                        "isLimitPerDayReason": false,
                        "activeInHours": null,
                        "additionalData": [],
                        "image": null,
                        "image2x": null,
                        "imageMobile": null,
                        "imageMobile2x": null,
                        "secondImage": null,
                        "secondImage2x": null,
                        "secondImageMobile": null,
                        "secondImageMobile2x": null,
                        "bannerTextColor": "",
                        "freeSpin": false,
                        "moneyBoxAmount": null,
                        "id": 754,
                        "coins": 450000,
                        "entries": 3000,
                        "bestDeal": false,
                        "mostPopular": true,
                        "rankLeague": false,
                        "imageBadge": "\/uploads\/promo_offers_presets\/333-1732635714.png",
                        "usualPrice": 0,
                        "badgeLabel": "{\"percent\": \"200%\", \"text\": \"EXTRA COINS\"}",
                        "savingsPercent": "",
                        "subType": "",
                        "levelUpSectionId": null,
                        "accumulatedMoneyBoxAmount": null
                    },
                    "needDeposits": 1,
                    "preset": {
                        "id": 109,
                        "coins": 150000,
                        "entries": 1500,
                        "additionalData": null,
                        "moneyBoxAmount": null,
                        "accumulatedMoneyBoxAmount": null,
                        "availableTill": null
                    },
                    "money": "14.99",
                    "enabled": false
                }
            }
        ]
    }
}*/
