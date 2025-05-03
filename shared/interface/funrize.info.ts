// To parse this data:
//
//   import { Convert, User } from "./file";
//
//   const user = Convert.toUser(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type User = {
  isGuest: boolean;
  gameOfWeek: UserGameOfWeek;
  newGames: NewGames;
  gameCategories: GameCategory[];
  statusFeatures: StatusFeatures;
  featuresInfo: FeaturesInfo;
  status: Status;
  currentOffer: CurrentOffer;
  availableWheel: AvailableWheel;
};

export type AvailableWheel = {
  id: number;
  wheelIcon: string;
  wheelIconLatestWinners: string;
  data: AvailableWheelData;
};

export type AvailableWheelData = {
  available: boolean;
  visible: boolean;
  prize2X: boolean;
  prizes: any[];
  reasonType: string;
  reasonValue: string;
  error: string;
  endpoint: string;
  auto: boolean;
  availableDate: string;
  wheels: Wheels;
};

export type Wheels = {
  id: number;
  title: string;
  sectors: Sector[];
  template: string;
  imageBackground: string;
  imageBackgroundMobile: string;
  imageArrow: string;
  imageBorder: string;
  imageButton: string;
  imageSectorLight: string;
  imageSectors: string;
  imageBorderLights: string;
  imageWheelFull: string;
  imageIcon: string;
  imageMainPrize: string;
  tooltip: string;
  withSegments: boolean;
  soundBackground: string;
  soundSpin: string;
  soundPrize: string;
};

export type Sector = {
  id: number;
  prizes: PrizeElement[];
};

export type PrizeElement = {
  type: PrizeType;
  value: number;
  icon: null;
  iconWin: null;
};

export enum PrizeType {
  Coins = "coins",
  Entries = "entries",
}

export type CurrentOffer = {
  id: number;
  coins: string;
  entries: string;
  bestDeal: boolean;
  mostPopular: null;
  isWelcomeOffer: boolean;
  isPeriodic: boolean;
  money: string;
  usualPrice: string;
  title: string;
  badgeLabel: string;
  imageCash: string;
  imageBanner: string;
  imageBannerMobile: string;
  imagePopup: string;
  imagePopupMobile: null;
  imageMenu: string;
  imageBadge: string;
  image: null;
  image2X: null;
  imageMobile: null;
  imageMobile2X: null;
  secondImage: null;
  secondImage2X: null;
  secondImageMobile: null;
  secondImageMobile2X: null;
  bannerTextColor: string;
  text: string;
  subTitle: string;
  labelText: string;
};

export type FeaturesInfo = {
  depositStreakInfo: DepositStreakInfo;
  playerReferralInfo: PlayerReferralInfo;
  seasonsInfo: null;
  prizeDropsInfo: PrizeDropsInfo;
  moneyBoxInfo: null;
  scratchCardLotteryInfo: ScratchCardLotteryInfo;
  questInfo: QuestInfo;
  rankLeagueCashback: RankLeagueCashback;
};

export type DepositStreakInfo = {
  success: boolean;
  currentCountDeposit: number;
  depositAmounts: any[];
  deposits: any[];
  minDepositValue: number;
  percentEnabled: boolean;
  secondsToResetStreakCounter: null;
  resetStreakAt: null;
  dailyWinStreakLimitExceeded: boolean;
  maxPercentage: number;
  streakEventID: number;
  maxNumberOfDeposit: number;
  finishedAt: Date;
  expiredAt: Date;
  balanceLimit: number;
  settings: any[];
  images: null;
  depositStreakSkin: string;
  wheelSkin: null;
};

export type PlayerReferralInfo = {
  success: boolean;
  data: PlayerReferralInfoData;
};

export type PlayerReferralInfoData = {
  friendsQualifies: number;
  friendsInvited: number;
  coinsSum: number;
  entriesSum: number;
  prizeCoins: number;
  prizeEntries: number;
  depositCondition: number;
  referralURL: string;
  refcode: string;
  qrCodeURL: string;
  howWorks: string;
  invitedFriends: any[];
};

export type PrizeDropsInfo = {
  isActive: boolean;
  dailyPrizePool: number;
  finishedAt: Date;
};

export type QuestInfo = {
  isActive: boolean;
  data: QuestInfoData;
};

export type QuestInfoData = {
  questInfo: QuestInfoClass;
  dayInfo: DayInfo;
  isSubscribed: boolean;
};

export type DayInfo = {
  day: number;
  totalPoints: number;
  logo: null;
  isCompleted: boolean;
  isEnded: boolean;
  isLocked: boolean;
  start: string;
  end: string;
  tasks: Task[];
};

export type Task = {
  title: Title;
  shortTitle: Title;
  logo: Logo;
  type: TaskType;
  isCompleted: boolean;
  progress: Progress;
  action: Action;
  prize: TaskPrize;
  executionTimeData: null;
  order: number;
  isLocked: boolean;
  repeat: null;
  isSweepStakesModeAvailable: boolean;
  isTournamentPointsModeAvailable: boolean;
  minBetForModeTournamentPoints: number;
  minBetForModeSweepstakes: number;
  gameIDS: number[];
};

export type Action = {
  type: ActionType;
  details: null;
};

export enum ActionType {
  GamesList = "gamesList",
}

export enum Logo {
  UploadsQuestPointsDisciplineFrame366598PNG = "/uploads/quest_points_discipline/Frame-366598.png",
}

export type TaskPrize = {
  entries: number;
  coins: number;
  freeSpin: FreeSpin;
  points: number;
};

export type FreeSpin = {
  gameID: number;
  freeSpinID: number;
  freeSpinCount: number;
  betLevel: number;
};

export type Progress = {
  complete: number;
  goal: number;
};

export enum Title {
  Play = "Play",
}

export enum TaskType {
  Count = "count",
}

export type QuestInfoClass = {
  title: string;
  start: string;
  end: string;
  daysCount: number;
  isSweepStakesModeAvailable: boolean;
  isTournamentPointsModeAvailable: boolean;
  grandPrize: null;
  activeQuestID: number;
  prizes: any[];
  isAutoSubscription: boolean;
  withOrder: boolean;
  type: string;
  isAvailabilityByDeposit: boolean;
  minDepositAmount: number;
  isAvailable: boolean;
  minRankLeagueSection: MinRankLeagueSection;
};

export type MinRankLeagueSection = {
  id: number;
  title: string;
};

export type RankLeagueCashback = {
  success: boolean;
  data: RankLeagueCashbackData;
};

export type RankLeagueCashbackData = {
  sections: Section[];
  status: string;
  statusCalculation: boolean;
  currentReward: number;
  nextReward: number;
  availableAfterDateTime: Date;
  availableAfterDay: string;
  maxReward: MaxReward;
};

export type MaxReward = {
  entries: number;
  coins: number;
};

export type Section = {
  id: number;
  title: string;
  weeklyReward: number;
  maxReward: MaxReward;
};

export type ScratchCardLotteryInfo = {
  isActive: boolean;
  message: null;
};

export type GameCategory = {
  title: string;
  slug: string;
  img: null | string;
  showInMenu: boolean;
  total: number;
};

export type UserGameOfWeek = {
  gameOfWeek: GameOfWeekGameOfWeek;
};

export type GameOfWeekGameOfWeek = {
  id: number;
  slug: string;
  title: string;
  img: string;
  imageBackground: string;
  image2X: string;
  imageBanner: string;
  imageBanner2X: string;
};

export type NewGames = {
  id: string;
  slug: string;
  bannerTitle: string;
  buttonText: string;
  background: string;
  image: string;
  image2X: string;
  imageBanner: string;
  imageBanner2X: string;
};

export type Status = {
  affiliatePartner: AffiliatePartner;
  redeem: AffiliatePartner;
  topEmailNotification: AffiliatePartner;
  rankLeague: AffiliatePartner;
  bundles: Bundles;
};

export type AffiliatePartner = {
  isActive: boolean;
};

export type Bundles = {
  bundleVip: boolean;
  bundleWelcome: boolean;
};

export type StatusFeatures = {
  bingoLottery: AffiliatePartner;
  scratchCardLottery: AffiliatePartner;
  magicBox: AffiliatePartner;
  depositStreak: AffiliatePartner;
  prizeDrops: AffiliatePartner;
  seasonsTower: AffiliatePartner;
  dailyChests: DailyChests;
  promoLottery: AffiliatePartner;
};

export type DailyChests = {
  isActive: boolean;
  isSkin: boolean;
};

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toUser(json: string): User {
    return cast(JSON.parse(json), r("User"));
  }

  public static userToJson(value: User): string {
    return JSON.stringify(uncast(value, r("User")), null, 2);
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
  User: o(
    [
      { json: "isGuest", js: "isGuest", typ: true },
      { json: "gameOfWeek", js: "gameOfWeek", typ: r("UserGameOfWeek") },
      { json: "newGames", js: "newGames", typ: r("NewGames") },
      { json: "gameCategories", js: "gameCategories", typ: a(r("GameCategory")) },
      { json: "statusFeatures", js: "statusFeatures", typ: r("StatusFeatures") },
      { json: "featuresInfo", js: "featuresInfo", typ: r("FeaturesInfo") },
      { json: "status", js: "status", typ: r("Status") },
      { json: "currentOffer", js: "currentOffer", typ: r("CurrentOffer") },
      { json: "availableWheel", js: "availableWheel", typ: r("AvailableWheel") },
    ],
    false
  ),
  AvailableWheel: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "wheelIcon", js: "wheelIcon", typ: "" },
      { json: "wheelIconLatestWinners", js: "wheelIconLatestWinners", typ: "" },
      { json: "data", js: "data", typ: r("AvailableWheelData") },
    ],
    false
  ),
  AvailableWheelData: o(
    [
      { json: "available", js: "available", typ: true },
      { json: "visible", js: "visible", typ: true },
      { json: "prize2x", js: "prize2X", typ: true },
      { json: "prizes", js: "prizes", typ: a("any") },
      { json: "reasonType", js: "reasonType", typ: "" },
      { json: "reasonValue", js: "reasonValue", typ: "" },
      { json: "error", js: "error", typ: "" },
      { json: "endpoint", js: "endpoint", typ: "" },
      { json: "auto", js: "auto", typ: true },
      { json: "availableDate", js: "availableDate", typ: "" },
      { json: "wheels", js: "wheels", typ: r("Wheels") },
    ],
    false
  ),
  Wheels: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "title", js: "title", typ: "" },
      { json: "sectors", js: "sectors", typ: a(r("Sector")) },
      { json: "template", js: "template", typ: "" },
      { json: "imageBackground", js: "imageBackground", typ: "" },
      { json: "imageBackgroundMobile", js: "imageBackgroundMobile", typ: "" },
      { json: "imageArrow", js: "imageArrow", typ: "" },
      { json: "imageBorder", js: "imageBorder", typ: "" },
      { json: "imageButton", js: "imageButton", typ: "" },
      { json: "imageSectorLight", js: "imageSectorLight", typ: "" },
      { json: "imageSectors", js: "imageSectors", typ: "" },
      { json: "imageBorderLights", js: "imageBorderLights", typ: "" },
      { json: "imageWheelFull", js: "imageWheelFull", typ: "" },
      { json: "imageIcon", js: "imageIcon", typ: "" },
      { json: "imageMainPrize", js: "imageMainPrize", typ: "" },
      { json: "tooltip", js: "tooltip", typ: "" },
      { json: "withSegments", js: "withSegments", typ: true },
      { json: "soundBackground", js: "soundBackground", typ: "" },
      { json: "soundSpin", js: "soundSpin", typ: "" },
      { json: "soundPrize", js: "soundPrize", typ: "" },
    ],
    false
  ),
  Sector: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "prizes", js: "prizes", typ: a(r("PrizeElement")) },
    ],
    false
  ),
  PrizeElement: o(
    [
      { json: "type", js: "type", typ: r("PrizeType") },
      { json: "value", js: "value", typ: 0 },
      { json: "icon", js: "icon", typ: null },
      { json: "iconWin", js: "iconWin", typ: null },
    ],
    false
  ),
  CurrentOffer: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "coins", js: "coins", typ: "" },
      { json: "entries", js: "entries", typ: "" },
      { json: "bestDeal", js: "bestDeal", typ: true },
      { json: "mostPopular", js: "mostPopular", typ: null },
      { json: "isWelcomeOffer", js: "isWelcomeOffer", typ: true },
      { json: "isPeriodic", js: "isPeriodic", typ: true },
      { json: "money", js: "money", typ: "" },
      { json: "usualPrice", js: "usualPrice", typ: "" },
      { json: "title", js: "title", typ: "" },
      { json: "badgeLabel", js: "badgeLabel", typ: "" },
      { json: "imageCash", js: "imageCash", typ: "" },
      { json: "imageBanner", js: "imageBanner", typ: "" },
      { json: "imageBannerMobile", js: "imageBannerMobile", typ: "" },
      { json: "imagePopup", js: "imagePopup", typ: "" },
      { json: "imagePopupMobile", js: "imagePopupMobile", typ: null },
      { json: "imageMenu", js: "imageMenu", typ: "" },
      { json: "imageBadge", js: "imageBadge", typ: "" },
      { json: "image", js: "image", typ: null },
      { json: "image2x", js: "image2X", typ: null },
      { json: "imageMobile", js: "imageMobile", typ: null },
      { json: "imageMobile2x", js: "imageMobile2X", typ: null },
      { json: "secondImage", js: "secondImage", typ: null },
      { json: "secondImage2x", js: "secondImage2X", typ: null },
      { json: "secondImageMobile", js: "secondImageMobile", typ: null },
      { json: "secondImageMobile2x", js: "secondImageMobile2X", typ: null },
      { json: "bannerTextColor", js: "bannerTextColor", typ: "" },
      { json: "text", js: "text", typ: "" },
      { json: "subTitle", js: "subTitle", typ: "" },
      { json: "labelText", js: "labelText", typ: "" },
    ],
    false
  ),
  FeaturesInfo: o(
    [
      { json: "deposit-streak-info", js: "depositStreakInfo", typ: r("DepositStreakInfo") },
      { json: "player-referral-info", js: "playerReferralInfo", typ: r("PlayerReferralInfo") },
      { json: "seasons-info", js: "seasonsInfo", typ: null },
      { json: "prize-drops-info", js: "prizeDropsInfo", typ: r("PrizeDropsInfo") },
      { json: "money-box-info", js: "moneyBoxInfo", typ: null },
      { json: "scratch-card-lottery-info", js: "scratchCardLotteryInfo", typ: r("ScratchCardLotteryInfo") },
      { json: "quest-info", js: "questInfo", typ: r("QuestInfo") },
      { json: "rank-league-cashback", js: "rankLeagueCashback", typ: r("RankLeagueCashback") },
    ],
    false
  ),
  DepositStreakInfo: o(
    [
      { json: "success", js: "success", typ: true },
      { json: "currentCountDeposit", js: "currentCountDeposit", typ: 0 },
      { json: "depositAmounts", js: "depositAmounts", typ: a("any") },
      { json: "deposits", js: "deposits", typ: a("any") },
      { json: "minDepositValue", js: "minDepositValue", typ: 3.14 },
      { json: "percentEnabled", js: "percentEnabled", typ: true },
      { json: "secondsToResetStreakCounter", js: "secondsToResetStreakCounter", typ: null },
      { json: "resetStreakAt", js: "resetStreakAt", typ: null },
      { json: "dailyWinStreakLimitExceeded", js: "dailyWinStreakLimitExceeded", typ: true },
      { json: "maxPercentage", js: "maxPercentage", typ: 0 },
      { json: "streakEventId", js: "streakEventID", typ: 0 },
      { json: "maxNumberOfDeposit", js: "maxNumberOfDeposit", typ: 0 },
      { json: "finishedAt", js: "finishedAt", typ: Date },
      { json: "expiredAt", js: "expiredAt", typ: Date },
      { json: "balanceLimit", js: "balanceLimit", typ: 0 },
      { json: "settings", js: "settings", typ: a("any") },
      { json: "images", js: "images", typ: null },
      { json: "depositStreakSkin", js: "depositStreakSkin", typ: "" },
      { json: "wheelSkin", js: "wheelSkin", typ: null },
    ],
    false
  ),
  PlayerReferralInfo: o(
    [
      { json: "success", js: "success", typ: true },
      { json: "data", js: "data", typ: r("PlayerReferralInfoData") },
    ],
    false
  ),
  PlayerReferralInfoData: o(
    [
      { json: "friendsQualifies", js: "friendsQualifies", typ: 0 },
      { json: "friendsInvited", js: "friendsInvited", typ: 0 },
      { json: "coinsSum", js: "coinsSum", typ: 0 },
      { json: "entriesSum", js: "entriesSum", typ: 0 },
      { json: "prizeCoins", js: "prizeCoins", typ: 0 },
      { json: "prizeEntries", js: "prizeEntries", typ: 0 },
      { json: "depositCondition", js: "depositCondition", typ: 3.14 },
      { json: "referralUrl", js: "referralURL", typ: "" },
      { json: "refcode", js: "refcode", typ: "" },
      { json: "qrCodeUrl", js: "qrCodeURL", typ: "" },
      { json: "howWorks", js: "howWorks", typ: "" },
      { json: "invitedFriends", js: "invitedFriends", typ: a("any") },
    ],
    false
  ),
  PrizeDropsInfo: o(
    [
      { json: "isActive", js: "isActive", typ: true },
      { json: "dailyPrizePool", js: "dailyPrizePool", typ: 0 },
      { json: "finishedAt", js: "finishedAt", typ: Date },
    ],
    false
  ),
  QuestInfo: o(
    [
      { json: "isActive", js: "isActive", typ: true },
      { json: "data", js: "data", typ: r("QuestInfoData") },
    ],
    false
  ),
  QuestInfoData: o(
    [
      { json: "questInfo", js: "questInfo", typ: r("QuestInfoClass") },
      { json: "dayInfo", js: "dayInfo", typ: r("DayInfo") },
      { json: "isSubscribed", js: "isSubscribed", typ: true },
    ],
    false
  ),
  DayInfo: o(
    [
      { json: "day", js: "day", typ: 0 },
      { json: "totalPoints", js: "totalPoints", typ: 0 },
      { json: "logo", js: "logo", typ: null },
      { json: "isCompleted", js: "isCompleted", typ: true },
      { json: "isEnded", js: "isEnded", typ: true },
      { json: "isLocked", js: "isLocked", typ: true },
      { json: "start", js: "start", typ: "" },
      { json: "end", js: "end", typ: "" },
      { json: "tasks", js: "tasks", typ: a(r("Task")) },
    ],
    false
  ),
  Task: o(
    [
      { json: "title", js: "title", typ: r("Title") },
      { json: "shortTitle", js: "shortTitle", typ: r("Title") },
      { json: "logo", js: "logo", typ: r("Logo") },
      { json: "type", js: "type", typ: r("TaskType") },
      { json: "isCompleted", js: "isCompleted", typ: true },
      { json: "progress", js: "progress", typ: r("Progress") },
      { json: "action", js: "action", typ: r("Action") },
      { json: "prize", js: "prize", typ: r("TaskPrize") },
      { json: "executionTimeData", js: "executionTimeData", typ: null },
      { json: "order", js: "order", typ: 0 },
      { json: "isLocked", js: "isLocked", typ: true },
      { json: "repeat", js: "repeat", typ: null },
      { json: "isSweepStakesModeAvailable", js: "isSweepStakesModeAvailable", typ: true },
      { json: "isTournamentPointsModeAvailable", js: "isTournamentPointsModeAvailable", typ: true },
      { json: "minBetForModeTournamentPoints", js: "minBetForModeTournamentPoints", typ: 0 },
      { json: "minBetForModeSweepstakes", js: "minBetForModeSweepstakes", typ: 0 },
      { json: "gameIds", js: "gameIDS", typ: a(0) },
    ],
    false
  ),
  Action: o(
    [
      { json: "type", js: "type", typ: r("ActionType") },
      { json: "details", js: "details", typ: null },
    ],
    false
  ),
  TaskPrize: o(
    [
      { json: "entries", js: "entries", typ: 0 },
      { json: "coins", js: "coins", typ: 0 },
      { json: "freeSpin", js: "freeSpin", typ: r("FreeSpin") },
      { json: "points", js: "points", typ: 0 },
    ],
    false
  ),
  FreeSpin: o(
    [
      { json: "gameId", js: "gameID", typ: 0 },
      { json: "freeSpinId", js: "freeSpinID", typ: 0 },
      { json: "freeSpinCount", js: "freeSpinCount", typ: 0 },
      { json: "betLevel", js: "betLevel", typ: 0 },
    ],
    false
  ),
  Progress: o(
    [
      { json: "complete", js: "complete", typ: 0 },
      { json: "goal", js: "goal", typ: 0 },
    ],
    false
  ),
  QuestInfoClass: o(
    [
      { json: "title", js: "title", typ: "" },
      { json: "start", js: "start", typ: "" },
      { json: "end", js: "end", typ: "" },
      { json: "daysCount", js: "daysCount", typ: 0 },
      { json: "isSweepStakesModeAvailable", js: "isSweepStakesModeAvailable", typ: true },
      { json: "isTournamentPointsModeAvailable", js: "isTournamentPointsModeAvailable", typ: true },
      { json: "grandPrize", js: "grandPrize", typ: null },
      { json: "activeQuestId", js: "activeQuestID", typ: 0 },
      { json: "prizes", js: "prizes", typ: a("any") },
      { json: "isAutoSubscription", js: "isAutoSubscription", typ: true },
      { json: "withOrder", js: "withOrder", typ: true },
      { json: "type", js: "type", typ: "" },
      { json: "isAvailabilityByDeposit", js: "isAvailabilityByDeposit", typ: true },
      { json: "minDepositAmount", js: "minDepositAmount", typ: 0 },
      { json: "isAvailable", js: "isAvailable", typ: true },
      { json: "minRankLeagueSection", js: "minRankLeagueSection", typ: r("MinRankLeagueSection") },
    ],
    false
  ),
  MinRankLeagueSection: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "title", js: "title", typ: "" },
    ],
    false
  ),
  RankLeagueCashback: o(
    [
      { json: "success", js: "success", typ: true },
      { json: "data", js: "data", typ: r("RankLeagueCashbackData") },
    ],
    false
  ),
  RankLeagueCashbackData: o(
    [
      { json: "sections", js: "sections", typ: a(r("Section")) },
      { json: "status", js: "status", typ: "" },
      { json: "statusCalculation", js: "statusCalculation", typ: true },
      { json: "currentReward", js: "currentReward", typ: 0 },
      { json: "nextReward", js: "nextReward", typ: 0 },
      { json: "availableAfterDateTime", js: "availableAfterDateTime", typ: Date },
      { json: "availableAfterDay", js: "availableAfterDay", typ: "" },
      { json: "maxReward", js: "maxReward", typ: r("MaxReward") },
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
  Section: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "title", js: "title", typ: "" },
      { json: "weeklyReward", js: "weeklyReward", typ: 0 },
      { json: "maxReward", js: "maxReward", typ: r("MaxReward") },
    ],
    false
  ),
  ScratchCardLotteryInfo: o(
    [
      { json: "isActive", js: "isActive", typ: true },
      { json: "message", js: "message", typ: null },
    ],
    false
  ),
  GameCategory: o(
    [
      { json: "title", js: "title", typ: "" },
      { json: "slug", js: "slug", typ: "" },
      { json: "img", js: "img", typ: u(null, "") },
      { json: "showInMenu", js: "showInMenu", typ: true },
      { json: "total", js: "total", typ: 0 },
    ],
    false
  ),
  UserGameOfWeek: o([{ json: "gameOfWeek", js: "gameOfWeek", typ: r("GameOfWeekGameOfWeek") }], false),
  GameOfWeekGameOfWeek: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "slug", js: "slug", typ: "" },
      { json: "title", js: "title", typ: "" },
      { json: "img", js: "img", typ: "" },
      { json: "image_background", js: "imageBackground", typ: "" },
      { json: "image_2x", js: "image2X", typ: "" },
      { json: "image_banner", js: "imageBanner", typ: "" },
      { json: "image_banner_2x", js: "imageBanner2X", typ: "" },
    ],
    false
  ),
  NewGames: o(
    [
      { json: "id", js: "id", typ: "" },
      { json: "slug", js: "slug", typ: "" },
      { json: "bannerTitle", js: "bannerTitle", typ: "" },
      { json: "buttonText", js: "buttonText", typ: "" },
      { json: "background", js: "background", typ: "" },
      { json: "image", js: "image", typ: "" },
      { json: "image2x", js: "image2X", typ: "" },
      { json: "imageBanner", js: "imageBanner", typ: "" },
      { json: "imageBanner2x", js: "imageBanner2X", typ: "" },
    ],
    false
  ),
  Status: o(
    [
      { json: "affiliatePartner", js: "affiliatePartner", typ: r("AffiliatePartner") },
      { json: "redeem", js: "redeem", typ: r("AffiliatePartner") },
      { json: "topEmailNotification", js: "topEmailNotification", typ: r("AffiliatePartner") },
      { json: "rankLeague", js: "rankLeague", typ: r("AffiliatePartner") },
      { json: "bundles", js: "bundles", typ: r("Bundles") },
    ],
    false
  ),
  AffiliatePartner: o([{ json: "isActive", js: "isActive", typ: true }], false),
  Bundles: o(
    [
      { json: "bundleVip", js: "bundleVip", typ: true },
      { json: "bundleWelcome", js: "bundleWelcome", typ: true },
    ],
    false
  ),
  StatusFeatures: o(
    [
      { json: "bingoLottery", js: "bingoLottery", typ: r("AffiliatePartner") },
      { json: "scratchCardLottery", js: "scratchCardLottery", typ: r("AffiliatePartner") },
      { json: "magicBox", js: "magicBox", typ: r("AffiliatePartner") },
      { json: "depositStreak", js: "depositStreak", typ: r("AffiliatePartner") },
      { json: "prizeDrops", js: "prizeDrops", typ: r("AffiliatePartner") },
      { json: "seasonsTower", js: "seasonsTower", typ: r("AffiliatePartner") },
      { json: "dailyChests", js: "dailyChests", typ: r("DailyChests") },
      { json: "promoLottery", js: "promoLottery", typ: r("AffiliatePartner") },
    ],
    false
  ),
  DailyChests: o(
    [
      { json: "isActive", js: "isActive", typ: true },
      { json: "isSkin", js: "isSkin", typ: true },
    ],
    false
  ),
  PrizeType: ["coins", "entries"],
  ActionType: ["gamesList"],
  Logo: ["/uploads/quest_points_discipline/Frame-366598.png"],
  Title: ["Play"],
  TaskType: ["count"],
};

/*

    "isGuest": false,
    "gameOfWeek": {
        "gameOfWeek": {
            "id": 2584,
            "slug": "frontier-gold-cash-pool",
            "title": "Frontier Gold Cash Pool",
            "img": "\/uploads\/banners\/Frontier Gold.png",
            "image_background": "",
            "image_2x": "\/uploads\/banners\/Frontier Gold.png",
            "image_banner": "\/uploads\/banners\/Frontier Gold.png",
            "image_banner_2x": "\/uploads\/banners\/Frontier Gold.png"
        }
    },
    "newGames": {
        "id": "",
        "slug": "",
        "bannerTitle": "",
        "buttonText": "",
        "background": "",
        "image": "",
        "image2x": "",
        "imageBanner": "",
        "imageBanner2x": ""
    },
    "gameCategories": [
        {
            "title": "Bonus Mania",
            "slug": "bonus-mania",
            "img": "\/uploads\/games_issues\/bonus.svg",
            "showInMenu": true,
            "total": 343
        },
        {
            "title": "Instant Games",
            "slug": "instant-games",
            "img": "\/uploads\/games_issues\/plinko_FR-2x.svg",
            "showInMenu": true,
            "total": 42
        },
        {
            "title": "VIP Games",
            "slug": "vip-games",
            "img": "\/uploads\/games_issues\/vip.svg",
            "showInMenu": false,
            "total": 160
        },
        {
            "title": "Index",
            "slug": "index",
            "img": null,
            "showInMenu": false,
            "total": 1035
        },
        {
            "title": "1spin4win",
            "slug": "new-provider",
            "img": "\/uploads\/games_issues\/1spin4win-1.svg",
            "showInMenu": false,
            "total": 19
        },
        {
            "title": "How it works",
            "slug": "how-it-works",
            "img": null,
            "showInMenu": false,
            "total": 3
        },
        {
            "title": "Favorites",
            "slug": "favorites",
            "img": "\/uploads\/games_issues\/favorite.svg",
            "showInMenu": true,
            "total": 0
        },
        {
            "title": "New",
            "slug": "new-games",
            "img": "\/uploads\/games_issues\/new-1.svg",
            "showInMenu": true,
            "total": 30
        },
        {
            "title": "Fun Pool",
            "slug": "fun-pool",
            "img": "\/uploads\/games_issues\/funrize-cash-pool1-2x.png",
            "showInMenu": true,
            "total": 5
        },
        {
            "title": "Summer Specials",
            "slug": "summer-specials",
            "img": null,
            "showInMenu": false,
            "total": 0
        },
        {
            "title": "Jackpot",
            "slug": "jackpot",
            "img": "\/uploads\/games_issues\/slots-1.svg",
            "showInMenu": false,
            "total": 32
        },
        {
            "title": "Joker Stoker",
            "slug": "jokers-stoker",
            "img": "\/uploads\/games_issues\/joker.svg",
            "showInMenu": false,
            "total": 16
        },
        {
            "title": "Hot",
            "slug": "hot-games",
            "img": "\/uploads\/games_issues\/hot-1.svg",
            "showInMenu": true,
            "total": 30
        },
        {
            "title": "All games",
            "slug": "all-games",
            "img": "\/uploads\/games_issues\/all-g.svg",
            "showInMenu": true,
            "total": 1020
        },
        {
            "title": "Winter's Tale",
            "slug": "season-specials",
            "img": "\/uploads\/games_issues\/winter.svg",
            "showInMenu": false,
            "total": 28
        },
        {
            "title": "Octoplay",
            "slug": "special-provider",
            "img": "\/uploads\/games_issues\/octoplayLogo-1.svg",
            "showInMenu": true,
            "total": 70
        },
        {
            "title": "Megaways",
            "slug": "megaways",
            "img": "\/uploads\/games_issues\/megaways.svg",
            "showInMenu": true,
            "total": 25
        },
        {
            "title": "Betsoft",
            "slug": "special-provider-betsoft",
            "img": "\/uploads\/games_issues\/Bet-soft-1.svg",
            "showInMenu": true,
            "total": 123
        },
        {
            "title": "Big Catch",
            "slug": "big-catch",
            "img": "\/uploads\/games_issues\/9042425_fishing_icon-1.svg",
            "showInMenu": false,
            "total": 18
        },
        {
            "title": "Play\u2019n\u2019Win",
            "slug": "rapid-link",
            "img": "\/uploads\/games_issues\/hold-and-win-1733307752.svg",
            "showInMenu": true,
            "total": 118
        },
        {
            "title": "Bonus Combo",
            "slug": "bonus-combo",
            "img": "\/uploads\/games_issues\/bonus-combo.svg",
            "showInMenu": false,
            "total": 22
        },
        {
            "title": "Gems",
            "slug": "gems",
            "img": "\/uploads\/games_issues\/gems.svg",
            "showInMenu": false,
            "total": 51
        },
        {
            "title": "Hold\u2019n\u2019win",
            "slug": "holdnwin",
            "img": "\/uploads\/games_issues\/hold-and-win.svg",
            "showInMenu": false,
            "total": 0
        },
        {
            "title": "Retro Reels",
            "slug": "classic-reels",
            "img": "\/uploads\/games_issues\/retro.svg",
            "showInMenu": false,
            "total": 50
        },
        {
            "title": "Classic Reels",
            "slug": "3x3",
            "img": "\/uploads\/games_issues\/3x3.svg",
            "showInMenu": true,
            "total": 74
        },
        {
            "title": "Popular Games",
            "slug": "popular-games",
            "img": "\/uploads\/games_issues\/popular.svg",
            "showInMenu": true,
            "total": 30
        },
        {
            "title": "TOP Of The Week",
            "slug": "top-of-the-week",
            "img": "\/uploads\/games_issues\/reward.svg",
            "showInMenu": false,
            "total": 9
        },
        {
            "title": "Lucky Games",
            "slug": "lucky-games",
            "img": "\/uploads\/games_issues\/FR.svg",
            "showInMenu": false,
            "total": 23
        },
        {
            "title": "Pragmatic Play",
            "slug": "special-provider-pragmatic",
            "img": "\/uploads\/games_issues\/pragmatic_1-97672-3.svg",
            "showInMenu": true,
            "total": 51
        },
        {
            "title": "AvatarUX",
            "slug": "avatarux",
            "img": "\/uploads\/games_issues\/avatarUX-2.svg",
            "showInMenu": false,
            "total": 20
        },
        {
            "title": "Treasure Hunts",
            "slug": "treasure-hunts",
            "img": "\/uploads\/games_issues\/treasure.svg",
            "showInMenu": false,
            "total": 76
        },
        {
            "title": "Magic Worlds",
            "slug": "magic-worlds",
            "img": "\/uploads\/games_issues\/magic.svg",
            "showInMenu": false,
            "total": 56
        },
        {
            "title": "TaDa Gaming",
            "slug": "special-provider-tada",
            "img": "\/uploads\/games_issues\/Tada-gaming.svg",
            "showInMenu": false,
            "total": 33
        },
        {
            "title": "Kalamba Games",
            "slug": "kalamba-games",
            "img": "\/uploads\/games_issues\/kalamba-1.svg",
            "showInMenu": true,
            "total": 20
        },
        {
            "title": "Cascading Games",
            "slug": "cascade",
            "img": "\/uploads\/games_issues\/cascade.svg",
            "showInMenu": false,
            "total": 70
        },
        {
            "title": "Novomatic",
            "slug": "novomatic",
            "img": "\/uploads\/games_issues\/novomatic-logo-2-lines-11.svg",
            "showInMenu": true,
            "total": 12
        },
        {
            "title": "Fishing",
            "slug": "fishing",
            "img": "\/uploads\/games_issues\/Frame-366595.svg",
            "showInMenu": true,
            "total": 9
        },
        {
            "title": "NetGame",
            "slug": "special-provider-netgame",
            "img": "\/uploads\/games_issues\/netgame_01.svg",
            "showInMenu": false,
            "total": 140
        },
        {
            "title": "Special From Funrize",
            "slug": "video-section",
            "img": "\/uploads\/games_issues\/b-day.svg",
            "showInMenu": false,
            "total": 10
        }
    ],
    "statusFeatures": {
        "bingoLottery": {
            "isActive": false
        },
        "scratchCardLottery": {
            "isActive": false
        },
        "magicBox": {
            "isActive": false
        },
        "depositStreak": {
            "isActive": true
        },
        "prizeDrops": {
            "isActive": false
        },
        "seasonsTower": {
            "isActive": false
        },
        "dailyChests": {
            "isActive": false,
            "isSkin": false
        },
        "promoLottery": {
            "isActive": false
        }
    },
    "featuresInfo": {
        "deposit-streak-info": {
            "success": true,
            "currentCountDeposit": 0,
            "depositAmounts": [],
            "deposits": [],
            "minDepositValue": 19.99,
            "percentEnabled": true,
            "secondsToResetStreakCounter": null,
            "resetStreakAt": null,
            "dailyWinStreakLimitExceeded": false,
            "maxPercentage": 100,
            "streakEventId": 7,
            "maxNumberOfDeposit": 5,
            "finishedAt": "2025-05-05 00:00:00",
            "expiredAt": "2025-05-05 00:00:00",
            "balanceLimit": 0,
            "settings": [],
            "images": null,
            "depositStreakSkin": "neutral_wheel_of_wins",
            "wheelSkin": null
        },
        "player-referral-info": {
            "success": true,
            "data": {
                "friendsQualifies": 0,
                "friendsInvited": 0,
                "coinsSum": 0,
                "entriesSum": 0,
                "prizeCoins": 900000,
                "prizeEntries": 2500,
                "depositCondition": 29.99,
                "referralUrl": "https:\/\/funrize.com\/?invited_by=FEZV6O",
                "refcode": "FEZV6O",
                "qrCodeUrl": "\/downloads\/qr_code\/invite\/FEZV6O.png",
                "howWorks": "<div class=\"invite-description\">\r\n  <div class=\"invite-description__title\">How does it work?<\/div>\r\n  <div class=\"invite-description__box\">\r\n    <div>\r\n      <img class=\"invite-description__img\"\r\n           src='\/statics\/referral\/description-1.png'\r\n           srcset='\/statics\/referral\/description-1@2x.png 2x'\r\n           alt=\"description-1\">\r\n      <div>\r\n        <div class=\"invite-description__subtitle\">You send an invitation<\/div>\r\n        <div class=\"invite-description__text\">\r\n          Invite your friend to join Funrize using referral link, QR-code, or promo code.\r\n        <\/div>\r\n      <\/div>\r\n    <\/div>\r\n    <div>\r\n      <img class=\"invite-description__img\"\r\n           src='\/statics\/referral\/description-2.png'\r\n           srcset='\/statics\/referral\/description-2@2x.png 2x'\r\n           alt=\"description-2\">\r\n      <div>\r\n        <div class=\"invite-description__subtitle\">Your friend joins and get qualified<\/div>\r\n        <div class=\"invite-description__text\">\r\n          Your friend should <span class=\"text-white text-weight-bold\">join Funrize by clicking on the link shared by you<\/span>\r\n          and purchase Tournament Coin packages worth $29.99 in total.\r\n        <\/div>\r\n      <\/div>\r\n    <\/div>\r\n    <div>\r\n      <img class=\"invite-description__img\"\r\n           src='\/statics\/referral\/description-3.png'\r\n           srcset='\/statics\/referral\/description-3@2x.png 2x'\r\n           alt=\"description-3\">\r\n      <div>\r\n        <div class=\"invite-description__subtitle\">You both get rewarded!<\/div>\r\n        <div class=\"invite-description__text\">\r\n          You receive <span class=\"text-coins text-weight-bold\">500,000<\/span> Coins\r\n          and <span class=\"text-entries text-weight-bold\">2,000<\/span> Free Entries.\r\n          Your friend gets a reward of <span class=\"text-coins text-weight-bold\">400,000<\/span> Coins\r\n          and <span class=\"text-entries text-weight-bold\">500<\/span> Free Entries.\r\n        <\/div>\r\n      <\/div>\r\n    <\/div>\r\n  <\/div>\r\n<\/div>",
                "invitedFriends": []
            }
        },
        "seasons-info": null,
        "prize-drops-info": {
            "isActive": false,
            "dailyPrizePool": 100000,
            "finishedAt": "2025-02-24T23:59:00-05:00"
        },
        "money-box-info": null,
        "scratch-card-lottery-info": {
            "isActive": false,
            "message": null
        },
        "quest-info": {
            "isActive": true,
            "data": {
                "questInfo": {
                    "title": "FP Challenge",
                    "start": "Mon, 21 Apr 2025 02:50:01 -0500",
                    "end": "Sun, 04 May 2025 22:59:00 -0500",
                    "daysCount": 1,
                    "isSweepStakesModeAvailable": true,
                    "isTournamentPointsModeAvailable": false,
                    "grandPrize": null,
                    "activeQuestId": 225,
                    "prizes": [],
                    "isAutoSubscription": false,
                    "withOrder": true,
                    "type": "fp_challenge",
                    "isAvailabilityByDeposit": false,
                    "minDepositAmount": 1,
                    "isAvailable": false,
                    "minRankLeagueSection": {
                        "id": 2,
                        "title": "Silver"
                    }
                },
                "dayInfo": {
                    "day": 1,
                    "totalPoints": 0,
                    "logo": null,
                    "isCompleted": false,
                    "isEnded": false,
                    "isLocked": false,
                    "start": "Mon, 21 Apr 2025 03:50:01 -0400",
                    "end": "Mon, 21 Apr 2025 23:59:00 -0400",
                    "tasks": [
                        {
                            "title": "Play",
                            "shortTitle": "Play",
                            "logo": "\/uploads\/quest_points_discipline\/Frame-366598.png",
                            "type": "count",
                            "isCompleted": false,
                            "progress": {
                                "complete": 0,
                                "goal": 10000
                            },
                            "action": {
                                "type": "gamesList",
                                "details": null
                            },
                            "prize": {
                                "entries": 0,
                                "coins": 0,
                                "freeSpin": {
                                    "gameId": 1991,
                                    "freeSpinId": 12,
                                    "freeSpinCount": 15,
                                    "betLevel": 0
                                },
                                "points": 0
                            },
                            "executionTimeData": null,
                            "order": 1,
                            "isLocked": false,
                            "repeat": null,
                            "isSweepStakesModeAvailable": true,
                            "isTournamentPointsModeAvailable": false,
                            "minBetForModeTournamentPoints": 0,
                            "minBetForModeSweepstakes": 10,
                            "gameIds": [
                                3166,
                                2584,
                                2889,
                                2347,
                                3172,
                                3174
                            ]
                        },
                        {
                            "title": "Play",
                            "shortTitle": "Play",
                            "logo": "\/uploads\/quest_points_discipline\/Frame-366598.png",
                            "type": "count",
                            "isCompleted": false,
                            "progress": {
                                "complete": 0,
                                "goal": 120000
                            },
                            "action": {
                                "type": "gamesList",
                                "details": null
                            },
                            "prize": {
                                "entries": 0,
                                "coins": 0,
                                "freeSpin": {
                                    "gameId": 1287,
                                    "freeSpinId": 15,
                                    "freeSpinCount": 50,
                                    "betLevel": 0
                                },
                                "points": 0
                            },
                            "executionTimeData": null,
                            "order": 4,
                            "isLocked": true,
                            "repeat": null,
                            "isSweepStakesModeAvailable": true,
                            "isTournamentPointsModeAvailable": false,
                            "minBetForModeTournamentPoints": 0,
                            "minBetForModeSweepstakes": 10,
                            "gameIds": [
                                3166,
                                2584,
                                2889,
                                
                                3178,
                                3077,
                                3172,
                                3174
                            ]
                        },
                        {
                            "title": "Play",
                            "shortTitle": "Play",
                            "logo": "\/uploads\/quest_points_discipline\/Frame-366598.png",
                            "type": "count",
                            "isCompleted": false,
                            "progress": {
                                "complete": 0,
                                "goal": 3000000
                            },
                            "action": {
                                "type": "gamesList",
                                "details": null
                            },
                            "prize": {
                                "entries": 0,
                                "coins": 0,
                                "freeSpin": {
                                    "gameId": 2097,
                                    "freeSpinId": 38,
                                    "freeSpinCount": 200,
                                    "betLevel": 0
                                },
                                "points": 0
                            },
                            "executionTimeData": null,
                            "order": 15,
                            "isLocked": true,
                            "repeat": null,
                            "isSweepStakesModeAvailable": true,
                            "isTournamentPointsModeAvailable": false,
                            "minBetForModeTournamentPoints": 0,
                            "minBetForModeSweepstakes": 10,
                            "gameIds": [
                                3166,
                                3077,
                                3172,
                                3174
                            ]
                        }
                    ]
                },
                "isSubscribed": false
            }
        },
        "rank-league-cashback": {
            "success": true,
            "data": {
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
        }
    },
    "status": {
        "affiliatePartner": {
            "isActive": false
        },
        "redeem": {
            "isActive": false
        },
        "topEmailNotification": {
            "isActive": true
        },
        "rankLeague": {
            "isActive": false
        },
        "bundles": {
            "bundleVip": false,
            "bundleWelcome": false
        }
    },
    "currentOffer": {
        "id": 731,
        "coins": "2250.00",
        "entries": "20.00",
        "bestDeal": true,
        "mostPopular": null,
        "isWelcomeOffer": false,
        "isPeriodic": false,
        "money": "4.99",
        "usualPrice": "0.00",
        "title": "YOUR PERSONAL OFFER",
        "badgeLabel": "{\"percent\": \"350%\", \"text\": \"EXTRA COINS\"}",
        "imageCash": "\/uploads\/promo_offers_presets\/2-1731441779.png",
        "imageBanner": "\/uploads\/promo_offers_presets\/reactivation-10.png",
        "imageBannerMobile": "\/uploads\/promo_offers_presets\/reactivation_mob-4.png",
        "imagePopup": "\/uploads\/promo_offers_presets\/reactivation-4.png",
        "imagePopupMobile": null,
        "imageMenu": "\/uploads\/promo_offers_presets\/4-1731441779.png",
        "imageBadge": "\/uploads\/promo_offers_presets\/3-1731441779.png",
        "image": null,
        "image2x": null,
        "imageMobile": null,
        "imageMobile2x": null,
        "secondImage": null,
        "secondImage2x": null,
        "secondImageMobile": null,
        "secondImageMobile2x": null,
        "bannerTextColor": "",
        "text": "<h1 class=\"banner-title text-uppercase\">Your Personal offer<\/h1>",
        "subTitle": "",
        "labelText": "<h1 class=\"banner-title text-uppercase\">Your Personal offer<\/h1>"
    },
    "availableWheel": {
        "id": 30,
        "wheelIcon": "",
        "wheelIconLatestWinners": "",
        "data": {
            "available": false,
            "visible": true,
            "prize2x": false,
            "prizes": [],
            "reasonType": "phoneAndProfile",
            "reasonValue": "empty",
            "error": "",
            "endpoint": "\/rest\/wheel\/spin\/",
            "auto": false,
            "availableDate": "Wed, 27 Mar 2024 14:22:15 +0200",
            "wheels": {
                "id": 30,
                "title": "Bronze Dailly Wheel default",
                "sectors": [
                    {
                        "id": 1,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 0,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 100000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 150,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 60000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 0,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 220000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 300,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 0,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 5,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 100,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 100000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 6,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 200,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 0,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 0,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 20000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 8,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 400,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 20000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 9,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 0,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 140000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 10,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 100,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 20000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 11,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 0,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 60000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 12,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 250,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 0,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 13,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 200,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 140000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 14,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 100,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 0,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 15,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 0,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 150000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    },
                    {
                        "id": 16,
                        "prizes": [
                            {
                                "type": "entries",
                                "value": 400,
                                "icon": null,
                                "iconWin": null
                            },
                            {
                                "type": "coins",
                                "value": 180000,
                                "icon": null,
                                "iconWin": null
                            }
                        ]
                    }
                ],
                "template": "1",
                "imageBackground": "",
                "imageBackgroundMobile": "",
                "imageArrow": "",
                "imageBorder": "",
                "imageButton": "",
                "imageSectorLight": "",
                "imageSectors": "",
                "imageBorderLights": "",
                "imageWheelFull": "",
                "imageIcon": "",
                "imageMainPrize": "",
                "tooltip": "",
                "withSegments": false,
                "soundBackground": "",
                "soundSpin": "",
                "soundPrize": ""
            }
        }
    }
}*/
