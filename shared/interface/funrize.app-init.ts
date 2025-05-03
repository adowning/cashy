// To parse this data:
//
//   import { Convert, AppInit } from "./file";
//
//   const appInit = Convert.toAppInit(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type AppInit = {
  data: AppInitData;
};

export type AppInitData = {
  isGuest: boolean;
  login: string;
  phone: null;
  nickname: null;
  emailConfirmed: boolean;
  phoneConfirmed: boolean;
  confirmed: boolean;
  primaryContact: string;
  preferredCountryCode: string;
  websocket: string;
  activeBonusID: null;
  firstBettingBonusID: null;
  hasActiveSportBettingBonus: boolean;
  activeBonus: null;
  birthdayBonus: null;
  isMobile: boolean;
  isMobileApp: boolean;
  documents: Documents;
  onesignalAppID: null;
  depositsTracker: boolean;
  labelBonusNumber: null;
  bonusLabel: null;
  tournamentsSubscriptions: any[];
  registration: Registration;
  countries: Country[];
  currency: string;
  currencySymbol: string;
  captcha: CAPTCHA;
  bonusPromoData: BonusPromoData;
  manager: null;
  profile: string;
  appName: string;
  confirmEmailByType: string;
  confirmPhoneByType: string;
  isVipTournamentAvailable: boolean;
  fingerprint: Fingerprint;
  charset: string;
  activeSocialAccounts: string[];
  closePopups: null;
  currencies: Currencies;
  agreementURL: string;
  agreementCPURL: string;
  agreementWithdrawalURL: string;
  agreementCodesURL: string;
  isModal: boolean;
  modalCommandClose: string;
  language: string;
  token: string;
  remarketingBannerSettings: null;
  header: Header;
  footer: Footer;
  license: null;
  authImages: any[];
  alternateDomains: any[];
  analyticsData: AnalyticsData;
  chat: string;
  cpaCallbacks: string;
  isSocialEnabled: boolean;
  isFullRegistration: boolean;
  isSubscribedEnabled: boolean;
  welcomeGift: number;
  cis: boolean;
  autoLock: null;
  emailNotify: boolean;
  smsNotify: boolean;
  email: string;
  name: string;
  surname: string;
  birthMonth: string;
  birthYear: string;
  birthDay: string;
  countryID: number;
  countryCode: string;
  city: null;
  address: null;
  hasPassword: boolean;
  hasAutoPassword: boolean;
  isPasswordEnabled: boolean;
  location: string;
  isQuestAvailableForPlayer: boolean;
  currentDate: string;
  showUserFillBar: null;
  isAllowFreespinNoDep: null;
  availableBonuses: null;
  freeSpinRandGame: null;
  freeSpinRandGameTitle: null;
  isFreeSpinActive: boolean;
  showDailyFreeSpin: null;
  uuid: string;
  isTournamentSubscribed: null;
  hasDeposits: boolean;
  depositsCount: number;
  depositsSum: string;
  firstDepositedAt: null;
  trustpilot: Trustpilot;
  playerSocLogin: PlayerSocLogin;
  gameMode: string;
  playersLastActionData: PlayersLastActionDAT[];
  playersLastActionDataLimited: PlayersLastActionDAT[];
  userBarCount: number;
  isBonusPopup: null;
  showBonusPopup: null;
  defaultSettings: string;
  verificationDone: boolean;
  startChain: null;
  isRegFinished: null;
  preferredCurrency: null;
  isLotteryActive: boolean;
  lotteryType: null;
  lotterySlug: null;
  favoriteGames: any[];
  isShowNodepFreeSpin: null;
  lastGames: number[];
  zip: string;
  noContact: boolean;
  isGameFiltersPromoDisplayed: boolean;
  lotteryPromoTicketData: null;
  vipTournamentType: null;
  hideNoDepOnBonusPage: boolean;
  isAutoCashRegister: boolean;
  isPushNotificationAvailable: null;
  webPushAlertAllowed: null;
  webPushBlockedDefault: null;
  webPushAlertNotificationShow: null;
  webPushAlertProposed: null;
  webPushProposed: null;
  webPushAccepted: null;
  webPushDeclined: null;
  webPushAlertIgnored: null;
  webPushAlertIgnoredCount: null;
  bonusPromoOffersSettings: BonusPromoOffersSettings;
  wheelOfFortune: null;
  siteNotifications: string;
  lotteryAmountTickets: number;
  showVersionLink: boolean;
  welcomePackage: WelcomePackage;
  isDebug: boolean;
  socialNetworks: any[];
  showInsuranceBonusInfo: boolean;
  showInsuranceBonusPopup: boolean;
  isDesignL: boolean;
  ludomanCheckEnabled: boolean;
  appleAppID: string;
  ssn: boolean;
  profileCompleted: boolean;
  state: string;
  address2: string;
  signUpBonus: SignUpBonus;
  isBonusesEnabled: boolean;
  androidAppID: string;
  showDownloadAppPopup: boolean;
  showAppFeaturesForGuest: boolean;
  bannerPresetPackage: PresetPackage;
  popupPresetPackages: PresetPackage[];
  isShowVerificationPromo: boolean;
  needConfirmPhone: boolean;
  isShowDailyWheelForGuest: boolean;
  fraudDetector: FraudDetector;
  isShowReferralsInfo: boolean;
  facebookJoinLink: string;
  showPopupRTPGamesIfLessAmount: number;
  showRTPGamesPopupAfter: number;
  twitterJoinLink: string;
  confirmContactsReward: ConfirmContactsReward;
  registrationTournamentPointsReward: number;
  registrationFormData: RegistrationFormData;
  enabledOneClickRegistration: boolean;
  cashback: null;
  visitedSections: string[];
  notificationCenter: NotificationCenter;
  externalScripts: ExternalScript[];
  canBeTransferred: boolean;
  rankLeague: RankLeague;
  wsConnectionData: WsConnectionData;
  uncollectedQuestPrize: null;
  accountStatus: string;
  isTokenizeCash: boolean;
  isEntriesTournamentAvailable: boolean;
  visitedRaces: any[];
  isAffiliate: boolean;
  isAffiliateAgreements: boolean;
  season: Season;
  depositStreak: DepositStreak;
  redeem: HistoryTransaction;
  historyTransaction: HistoryTransaction;
  adventureWheel: AdventureWheel;
  prizeDrops: Bingo;
  freeCoins: FreeCoins;
  popUpAds: Bingo;
  scratchCardLottery: Bingo;
  moneyBox: Bingo;
  magicBox: Bingo;
  bingo: Bingo;
  vipProgram: Bingo;
  rally: null;
  dailyLogin: DailyLogin;
  isBannerSliderEnabled: boolean;
  isCookiesNoticeEnabled: boolean;
  isDailyActivitiesEnabled: boolean;
  featuresPriority: FeaturesPriority;
  favLast: number[];
  playerInfo: PlayerInfo;
  payPal: PayPal;
  funMeter: FunMeter;
  playerRestrictionIDSHash: string;
  wheelForGuest: WheelForGuest;
  nextTemperatureUpdateTime: null;
  jackpotSevens: any[];
  starDrops: any[];
};

export type AdventureWheel = {
  isActive: boolean;
  isEnabledBannerForGuest: boolean;
};

export type AnalyticsData = {
  analytics: string;
  tagManagerScript: string;
  tagManagerNoscript: string;
};

export type PresetPackage = {
  preset: Preset;
  promoOfferPreset: PromoOfferPreset;
  money: number;
  usualPrice: number;
  imageCash: string;
  isWelcomeOffer: boolean;
  text: string;
  additionalData: any[];
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

export type Bingo = {
  isActive: boolean;
};

export type BonusPromoData = {
  show: boolean;
  bonusType: string;
  bonusData: any[];
};

export type BonusPromoOffersSettings = {
  enabled: boolean;
};

export type CAPTCHA = {
  isEnabled: boolean;
  isInternalEnabled: boolean;
  url: string;
  key: string;
  internalKey: string;
};

export type ConfirmContactsReward = {
  isAvailable: boolean;
  amount: number;
  freeSpinAmount: null;
  conditions: string[];
  prizeTitle: string;
};

export type Country = {
  id: number;
  iso: string;
  title: string;
  titleI18N: string;
  dialCode: string;
};

export type Currencies = {
  cis: boolean;
  currencies: Currency[];
};

export type Currency = {
  id: number;
  iso: string;
  symbol: string;
};

export type DailyLogin = {
  isActive: boolean;
  isUnlimited: boolean;
};

export type DepositStreak = {
  isActive: boolean;
  startedAt: string;
  finishedAt: string;
  percentEnabled: boolean;
  balanceLimit: number;
  skin: string;
  popUpSoundPath: string;
};

export type Documents = {
  maxDocuments: number;
  maxFileSize: number;
};

export type ExternalScript = {
  code: string;
  location: string;
};

export type FeaturesPriority = {
  offerComponents: string[];
  bannerInTheCashDesk: string[];
  cardsInMainMenu: string[];
  widgetInGamePopup: string[];
  onMainPage: string[];
};

export type Fingerprint = {
  isEnabled: boolean;
  url: string;
};

export type Footer = {};

export type FraudDetector = {
  enabled: boolean;
  verificationCompleted: boolean;
};

export type FreeCoins = {
  isActive: boolean;
  minSum: number;
  freeSum: number;
};

export type FunMeter = {
  isActive: boolean;
};

export type Header = {
  logo2X: string;
  logo: string;
  menu: Menu;
  menuBanner: null;
};

export type Menu = {
  main: any[];
  simple: any[];
  additional: any[];
  promo: any[];
};

export type HistoryTransaction = {
  show: boolean;
  isEntries: boolean;
  isCoins: boolean;
};

export type NotificationCenter = {
  onPage: number;
  messages: Message[];
  countPages: number;
  unreadMessagesCount: number;
};

export type Message = {
  systemAlias: string;
  ncMessageID: number;
  isReaded: boolean;
  type: string;
  title: string;
  message: string;
  link: string;
  image: string;
  buttonLabel: string;
  dateBegin: string;
  dateEnd: string;
  createdAt: string;
};

export type PayPal = {
  paymentsIn: PaymentsIn;
};

export type PaymentsIn = {
  keys: PaymentsInKeys;
};

export type PaymentsInKeys = {
  apiKey: null;
};

export type PlayerInfo = {
  playerDashboard: PlayerDashboard;
  playerBalance: PlayerBalance;
};

export type PlayerBalance = {
  balance: string;
  currency: string;
  main: string;
  bonus: any[];
  entries: number;
  winnings: string;
  tourPoints: number;
};

export type PlayerDashboard = {
  registerDate: string;
  settings: Settings;
  playerStatus: PlayerStatus;
};

export type PlayerStatus = {
  cashbackInfo: CashbackInfo;
  current: Current;
  next: Current;
};

export type CashbackInfo = {
  startFromTitle: string;
  minRate: string;
  maxRate: string;
};

export type Current = {
  id: number;
  title: string;
  minCp: string;
  rate: number;
  cashback: string;
  number: number;
  achieved: boolean;
  currency: string;
  currentCp: number;
  totalCp: number;
  code: string;
};

export type Settings = {
  smsNotify: boolean;
  pushMsg: boolean;
  emailNotify: boolean;
};

export type PlayerSocLogin = {
  enabled: boolean;
  credentials: Credentials;
};

export type Credentials = {
  google: Apple;
  facebook: Apple;
  apple: Apple;
  telegram: Telegram;
};

export type Apple = {
  enabled: boolean;
  callback: string;
  keys: AppleKeys;
  scope: string;
};

export type AppleKeys = {
  id: string;
};

export type Telegram = {
  enabled: boolean;
  callback: null;
  keys: TelegramKeys;
  scope: null;
};

export type TelegramKeys = {
  id: null;
  name: null;
};

export type PlayersLastActionDAT = {
  id: string;
  nickname: string;
  login: string;
  type: string;
  data: PlayersLastActionDatumData;
  city: string;
  state: string;
  surname: string;
  name: string;
  gameMode: string;
};

export type PlayersLastActionDatumData = {
  id: number;
  title: string;
  slug: string;
  logo: string;
  winAmount: number;
  betAmount: number;
  isOnlyForApp: boolean;
  gamePlayInfo: boolean;
  gameExclusiveData: any[];
  cover: null | string;
  maxWin: MaxBet;
  minBet: MaxBet;
  maxBet: MaxBet;
  volatility: number;
  rtp: string;
  maxMultiplier: number;
  isBonusFeature: boolean;
};

export type MaxBet = {
  entries: string;
  coins: string;
};

export type RankLeague = {
  enabled: boolean;
  progressData: null;
  activeBooster: null;
  availableSectionsBoosters: null;
  playerWheels: null;
  playerWheelsAvailable: null;
};

export type Registration = {
  isAvailable: boolean;
  complete: Complete;
  selectedBonusID: null;
  depositSelected: boolean;
  noDepositSelected: boolean;
  noDepositAvailable: boolean;
  noDepositApplied: boolean;
  bonusType: null;
  registrationFunnel: RegistrationFunnel;
  bonuses: null[];
  referrerInfo: null;
  optionsAB: any[];
  isBonusPopupAfterVerificationEnabled: boolean;
};

export type Complete = {
  id: number;
  iso: string;
  title: string;
  rate: string;
  enabled: boolean;
  sort: number;
  titleI18N: string;
  default: boolean;
  preset: string;
  rateGp: string;
  hidden: boolean;
  allowedSite: string;
  defaultAmount: null;
};

export type RegistrationFunnel = {
  title: string;
  isShowConfirmPopup: boolean;
  isShowGratitudePopup: boolean;
  isNeedConfirmAllContacts: boolean;
  popupTimeout: number;
  funnelType: string;
  version: null;
  trafficSource: null;
  isPasswordSet: boolean;
  labelBonusNumber: null;
  bonusLabel: null;
};

export type RegistrationFormData = {
  emailEnabled: boolean;
  phoneEnabled: boolean;
  facebookAuthEnabled: boolean;
  googleAuthEnabled: boolean;
  contactsOrder: string[];
};

export type Season = {
  isEnabled: boolean;
  isActive: boolean;
  isAvailable: boolean;
  isEnabledAvailabilityByDeposit: boolean;
  slug: string;
  totalProgressPercents: number;
  currentLevel: number;
  prize: number;
};

export type SignUpBonus = {
  available: boolean;
};

export type Trustpilot = {
  rate: number;
  reviewsCount: number;
};

export type WelcomePackage = {
  fsAmount: number;
  moneyAmount: string[];
};

export type WheelForGuest = {
  isActive: boolean;
  timeToAppear: null;
};

export type WsConnectionData = {
  centrifugo: Centrifugo;
};

export type Centrifugo = {
  url: string;
  connectionToken: string;
  connections: Connection[];
};

export type Connection = {
  token: string;
  channelName: string;
};

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toAppInit(json: string): AppInit {
    return cast(JSON.parse(json), r("AppInit"));
  }

  public static appInitToJson(value: AppInit): string {
    return JSON.stringify(uncast(value, r("AppInit")), null, 2);
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
  AppInit: o([{ json: "data", js: "data", typ: r("AppInitData") }], false),
  AppInitData: o(
    [
      { json: "isGuest", js: "isGuest", typ: true },
      { json: "login", js: "login", typ: "" },
      { json: "phone", js: "phone", typ: null },
      { json: "nickname", js: "nickname", typ: null },
      { json: "emailConfirmed", js: "emailConfirmed", typ: true },
      { json: "phoneConfirmed", js: "phoneConfirmed", typ: true },
      { json: "confirmed", js: "confirmed", typ: true },
      { json: "primaryContact", js: "primaryContact", typ: "" },
      { json: "preferredCountryCode", js: "preferredCountryCode", typ: "" },
      { json: "websocket", js: "websocket", typ: "" },
      { json: "activeBonusId", js: "activeBonusID", typ: null },
      { json: "firstBettingBonusId", js: "firstBettingBonusID", typ: null },
      { json: "hasActiveSportBettingBonus", js: "hasActiveSportBettingBonus", typ: true },
      { json: "activeBonus", js: "activeBonus", typ: null },
      { json: "birthdayBonus", js: "birthdayBonus", typ: null },
      { json: "isMobile", js: "isMobile", typ: true },
      { json: "isMobileApp", js: "isMobileApp", typ: true },
      { json: "documents", js: "documents", typ: r("Documents") },
      { json: "onesignalAppId", js: "onesignalAppID", typ: null },
      { json: "depositsTracker", js: "depositsTracker", typ: true },
      { json: "labelBonusNumber", js: "labelBonusNumber", typ: null },
      { json: "bonusLabel", js: "bonusLabel", typ: null },
      { json: "TournamentsSubscriptions", js: "tournamentsSubscriptions", typ: a("any") },
      { json: "Registration", js: "registration", typ: r("Registration") },
      { json: "countries", js: "countries", typ: a(r("Country")) },
      { json: "currency", js: "currency", typ: "" },
      { json: "currencySymbol", js: "currencySymbol", typ: "" },
      { json: "captcha", js: "captcha", typ: r("CAPTCHA") },
      { json: "bonusPromoData", js: "bonusPromoData", typ: r("BonusPromoData") },
      { json: "manager", js: "manager", typ: null },
      { json: "profile", js: "profile", typ: "" },
      { json: "appName", js: "appName", typ: "" },
      { json: "confirmEmailByType", js: "confirmEmailByType", typ: "" },
      { json: "confirmPhoneByType", js: "confirmPhoneByType", typ: "" },
      { json: "isVipTournamentAvailable", js: "isVipTournamentAvailable", typ: true },
      { json: "fingerprint", js: "fingerprint", typ: r("Fingerprint") },
      { json: "charset", js: "charset", typ: "" },
      { json: "activeSocialAccounts", js: "activeSocialAccounts", typ: a("") },
      { json: "closePopups", js: "closePopups", typ: null },
      { json: "currencies", js: "currencies", typ: r("Currencies") },
      { json: "agreementUrl", js: "agreementURL", typ: "" },
      { json: "agreementCPUrl", js: "agreementCPURL", typ: "" },
      { json: "agreementWithdrawalUrl", js: "agreementWithdrawalURL", typ: "" },
      { json: "agreementCodesUrl", js: "agreementCodesURL", typ: "" },
      { json: "isModal", js: "isModal", typ: true },
      { json: "modalCommandClose", js: "modalCommandClose", typ: "" },
      { json: "language", js: "language", typ: "" },
      { json: "token", js: "token", typ: "" },
      { json: "remarketingBannerSettings", js: "remarketingBannerSettings", typ: null },
      { json: "header", js: "header", typ: r("Header") },
      { json: "footer", js: "footer", typ: r("Footer") },
      { json: "license", js: "license", typ: null },
      { json: "authImages", js: "authImages", typ: a("any") },
      { json: "alternateDomains", js: "alternateDomains", typ: a("any") },
      { json: "analyticsData", js: "analyticsData", typ: r("AnalyticsData") },
      { json: "chat", js: "chat", typ: "" },
      { json: "cpaCallbacks", js: "cpaCallbacks", typ: "" },
      { json: "isSocialEnabled", js: "isSocialEnabled", typ: true },
      { json: "isFullRegistration", js: "isFullRegistration", typ: true },
      { json: "isSubscribedEnabled", js: "isSubscribedEnabled", typ: true },
      { json: "welcomeGift", js: "welcomeGift", typ: 0 },
      { json: "cis", js: "cis", typ: true },
      { json: "autoLock", js: "autoLock", typ: null },
      { json: "emailNotify", js: "emailNotify", typ: true },
      { json: "smsNotify", js: "smsNotify", typ: true },
      { json: "email", js: "email", typ: "" },
      { json: "name", js: "name", typ: "" },
      { json: "surname", js: "surname", typ: "" },
      { json: "birthMonth", js: "birthMonth", typ: "" },
      { json: "birthYear", js: "birthYear", typ: "" },
      { json: "birthDay", js: "birthDay", typ: "" },
      { json: "countryId", js: "countryID", typ: 0 },
      { json: "countryCode", js: "countryCode", typ: "" },
      { json: "city", js: "city", typ: null },
      { json: "address", js: "address", typ: null },
      { json: "hasPassword", js: "hasPassword", typ: true },
      { json: "hasAutoPassword", js: "hasAutoPassword", typ: true },
      { json: "isPasswordEnabled", js: "isPasswordEnabled", typ: true },
      { json: "location", js: "location", typ: "" },
      { json: "isQuestAvailableForPlayer", js: "isQuestAvailableForPlayer", typ: true },
      { json: "currentDate", js: "currentDate", typ: "" },
      { json: "showUserFillBar", js: "showUserFillBar", typ: null },
      { json: "isAllowFreespinNoDep", js: "isAllowFreespinNoDep", typ: null },
      { json: "availableBonuses", js: "availableBonuses", typ: null },
      { json: "freeSpinRandGame", js: "freeSpinRandGame", typ: null },
      { json: "freeSpinRandGameTitle", js: "freeSpinRandGameTitle", typ: null },
      { json: "isFreeSpinActive", js: "isFreeSpinActive", typ: true },
      { json: "showDailyFreeSpin", js: "showDailyFreeSpin", typ: null },
      { json: "uuid", js: "uuid", typ: "" },
      { json: "isTournamentSubscribed", js: "isTournamentSubscribed", typ: null },
      { json: "hasDeposits", js: "hasDeposits", typ: true },
      { json: "depositsCount", js: "depositsCount", typ: 0 },
      { json: "depositsSum", js: "depositsSum", typ: "" },
      { json: "firstDepositedAt", js: "firstDepositedAt", typ: null },
      { json: "trustpilot", js: "trustpilot", typ: r("Trustpilot") },
      { json: "playerSocLogin", js: "playerSocLogin", typ: r("PlayerSocLogin") },
      { json: "gameMode", js: "gameMode", typ: "" },
      { json: "playersLastActionData", js: "playersLastActionData", typ: a(r("PlayersLastActionDAT")) },
      {
        json: "playersLastActionDataLimited",
        js: "playersLastActionDataLimited",
        typ: a(r("PlayersLastActionDAT")),
      },
      { json: "userBarCount", js: "userBarCount", typ: 0 },
      { json: "isBonusPopup", js: "isBonusPopup", typ: null },
      { json: "showBonusPopup", js: "showBonusPopup", typ: null },
      { json: "defaultSettings", js: "defaultSettings", typ: "" },
      { json: "verificationDone", js: "verificationDone", typ: true },
      { json: "startChain", js: "startChain", typ: null },
      { json: "isRegFinished", js: "isRegFinished", typ: null },
      { json: "preferredCurrency", js: "preferredCurrency", typ: null },
      { json: "isLotteryActive", js: "isLotteryActive", typ: true },
      { json: "lotteryType", js: "lotteryType", typ: null },
      { json: "lotterySlug", js: "lotterySlug", typ: null },
      { json: "favoriteGames", js: "favoriteGames", typ: a("any") },
      { json: "isShowNodepFreeSpin", js: "isShowNodepFreeSpin", typ: null },
      { json: "lastGames", js: "lastGames", typ: a(0) },
      { json: "zip", js: "zip", typ: "" },
      { json: "noContact", js: "noContact", typ: true },
      { json: "isGameFiltersPromoDisplayed", js: "isGameFiltersPromoDisplayed", typ: true },
      { json: "lotteryPromoTicketData", js: "lotteryPromoTicketData", typ: null },
      { json: "vipTournamentType", js: "vipTournamentType", typ: null },
      { json: "hideNoDepOnBonusPage", js: "hideNoDepOnBonusPage", typ: true },
      { json: "isAutoCashRegister", js: "isAutoCashRegister", typ: true },
      { json: "isPushNotificationAvailable", js: "isPushNotificationAvailable", typ: null },
      { json: "webPushAlertAllowed", js: "webPushAlertAllowed", typ: null },
      { json: "webPushBlockedDefault", js: "webPushBlockedDefault", typ: null },
      { json: "webPushAlertNotificationShow", js: "webPushAlertNotificationShow", typ: null },
      { json: "webPushAlertProposed", js: "webPushAlertProposed", typ: null },
      { json: "webPushProposed", js: "webPushProposed", typ: null },
      { json: "webPushAccepted", js: "webPushAccepted", typ: null },
      { json: "webPushDeclined", js: "webPushDeclined", typ: null },
      { json: "webPushAlertIgnored", js: "webPushAlertIgnored", typ: null },
      { json: "webPushAlertIgnoredCount", js: "webPushAlertIgnoredCount", typ: null },
      { json: "bonusPromoOffersSettings", js: "bonusPromoOffersSettings", typ: r("BonusPromoOffersSettings") },
      { json: "wheelOfFortune", js: "wheelOfFortune", typ: null },
      { json: "siteNotifications", js: "siteNotifications", typ: "" },
      { json: "lotteryAmountTickets", js: "lotteryAmountTickets", typ: 0 },
      { json: "showVersionLink", js: "showVersionLink", typ: true },
      { json: "welcomePackage", js: "welcomePackage", typ: r("WelcomePackage") },
      { json: "isDebug", js: "isDebug", typ: true },
      { json: "socialNetworks", js: "socialNetworks", typ: a("any") },
      { json: "showInsuranceBonusInfo", js: "showInsuranceBonusInfo", typ: true },
      { json: "showInsuranceBonusPopup", js: "showInsuranceBonusPopup", typ: true },
      { json: "isDesignL", js: "isDesignL", typ: true },
      { json: "ludomanCheckEnabled", js: "ludomanCheckEnabled", typ: true },
      { json: "appleAppId", js: "appleAppID", typ: "" },
      { json: "ssn", js: "ssn", typ: true },
      { json: "profileCompleted", js: "profileCompleted", typ: true },
      { json: "state", js: "state", typ: "" },
      { json: "address2", js: "address2", typ: "" },
      { json: "signUpBonus", js: "signUpBonus", typ: r("SignUpBonus") },
      { json: "isBonusesEnabled", js: "isBonusesEnabled", typ: true },
      { json: "androidAppId", js: "androidAppID", typ: "" },
      { json: "showDownloadAppPopup", js: "showDownloadAppPopup", typ: true },
      { json: "showAppFeaturesForGuest", js: "showAppFeaturesForGuest", typ: true },
      { json: "bannerPresetPackage", js: "bannerPresetPackage", typ: r("PresetPackage") },
      { json: "popupPresetPackages", js: "popupPresetPackages", typ: a(r("PresetPackage")) },
      { json: "isShowVerificationPromo", js: "isShowVerificationPromo", typ: true },
      { json: "needConfirmPhone", js: "needConfirmPhone", typ: true },
      { json: "isShowDailyWheelForGuest", js: "isShowDailyWheelForGuest", typ: true },
      { json: "fraudDetector", js: "fraudDetector", typ: r("FraudDetector") },
      { json: "isShowReferralsInfo", js: "isShowReferralsInfo", typ: true },
      { json: "facebookJoinLink", js: "facebookJoinLink", typ: "" },
      { json: "showPopupRtpGamesIfLessAmount", js: "showPopupRTPGamesIfLessAmount", typ: 0 },
      { json: "showRtpGamesPopupAfter", js: "showRTPGamesPopupAfter", typ: 0 },
      { json: "twitterJoinLink", js: "twitterJoinLink", typ: "" },
      { json: "confirmContactsReward", js: "confirmContactsReward", typ: r("ConfirmContactsReward") },
      { json: "registrationTournamentPointsReward", js: "registrationTournamentPointsReward", typ: 0 },
      { json: "registrationFormData", js: "registrationFormData", typ: r("RegistrationFormData") },
      { json: "enabledOneClickRegistration", js: "enabledOneClickRegistration", typ: true },
      { json: "cashback", js: "cashback", typ: null },
      { json: "visitedSections", js: "visitedSections", typ: a("") },
      { json: "notificationCenter", js: "notificationCenter", typ: r("NotificationCenter") },
      { json: "externalScripts", js: "externalScripts", typ: a(r("ExternalScript")) },
      { json: "canBeTransferred", js: "canBeTransferred", typ: true },
      { json: "rankLeague", js: "rankLeague", typ: r("RankLeague") },
      { json: "wsConnectionData", js: "wsConnectionData", typ: r("WsConnectionData") },
      { json: "uncollectedQuestPrize", js: "uncollectedQuestPrize", typ: null },
      { json: "accountStatus", js: "accountStatus", typ: "" },
      { json: "isTokenizeCash", js: "isTokenizeCash", typ: true },
      { json: "isEntriesTournamentAvailable", js: "isEntriesTournamentAvailable", typ: true },
      { json: "visitedRaces", js: "visitedRaces", typ: a("any") },
      { json: "isAffiliate", js: "isAffiliate", typ: true },
      { json: "isAffiliateAgreements", js: "isAffiliateAgreements", typ: true },
      { json: "season", js: "season", typ: r("Season") },
      { json: "depositStreak", js: "depositStreak", typ: r("DepositStreak") },
      { json: "redeem", js: "redeem", typ: r("HistoryTransaction") },
      { json: "historyTransaction", js: "historyTransaction", typ: r("HistoryTransaction") },
      { json: "adventureWheel", js: "adventureWheel", typ: r("AdventureWheel") },
      { json: "prizeDrops", js: "prizeDrops", typ: r("Bingo") },
      { json: "freeCoins", js: "freeCoins", typ: r("FreeCoins") },
      { json: "popUpAds", js: "popUpAds", typ: r("Bingo") },
      { json: "scratchCardLottery", js: "scratchCardLottery", typ: r("Bingo") },
      { json: "moneyBox", js: "moneyBox", typ: r("Bingo") },
      { json: "magicBox", js: "magicBox", typ: r("Bingo") },
      { json: "bingo", js: "bingo", typ: r("Bingo") },
      { json: "vipProgram", js: "vipProgram", typ: r("Bingo") },
      { json: "rally", js: "rally", typ: null },
      { json: "dailyLogin", js: "dailyLogin", typ: r("DailyLogin") },
      { json: "isBannerSliderEnabled", js: "isBannerSliderEnabled", typ: true },
      { json: "isCookiesNoticeEnabled", js: "isCookiesNoticeEnabled", typ: true },
      { json: "isDailyActivitiesEnabled", js: "isDailyActivitiesEnabled", typ: true },
      { json: "featuresPriority", js: "featuresPriority", typ: r("FeaturesPriority") },
      { json: "favLast", js: "favLast", typ: a(0) },
      { json: "playerInfo", js: "playerInfo", typ: r("PlayerInfo") },
      { json: "payPal", js: "payPal", typ: r("PayPal") },
      { json: "funMeter", js: "funMeter", typ: r("FunMeter") },
      { json: "playerRestrictionIdsHash", js: "playerRestrictionIDSHash", typ: "" },
      { json: "wheelForGuest", js: "wheelForGuest", typ: r("WheelForGuest") },
      { json: "nextTemperatureUpdateTime", js: "nextTemperatureUpdateTime", typ: null },
      { json: "jackpotSevens", js: "jackpotSevens", typ: a("any") },
      { json: "starDrops", js: "starDrops", typ: a("any") },
    ],
    false
  ),
  AdventureWheel: o(
    [
      { json: "isActive", js: "isActive", typ: true },
      { json: "isEnabledBannerForGuest", js: "isEnabledBannerForGuest", typ: true },
    ],
    false
  ),
  AnalyticsData: o(
    [
      { json: "analytics", js: "analytics", typ: "" },
      { json: "tagManagerScript", js: "tagManagerScript", typ: "" },
      { json: "tagManagerNoscript", js: "tagManagerNoscript", typ: "" },
    ],
    false
  ),
  PresetPackage: o(
    [
      { json: "preset", js: "preset", typ: r("Preset") },
      { json: "promoOfferPreset", js: "promoOfferPreset", typ: r("PromoOfferPreset") },
      { json: "money", js: "money", typ: 3.14 },
      { json: "usualPrice", js: "usualPrice", typ: 0 },
      { json: "imageCash", js: "imageCash", typ: "" },
      { json: "isWelcomeOffer", js: "isWelcomeOffer", typ: true },
      { json: "text", js: "text", typ: "" },
      { json: "additionalData", js: "additionalData", typ: a("any") },
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
  Bingo: o([{ json: "isActive", js: "isActive", typ: true }], false),
  BonusPromoData: o(
    [
      { json: "show", js: "show", typ: true },
      { json: "bonusType", js: "bonusType", typ: "" },
      { json: "bonusData", js: "bonusData", typ: a("any") },
    ],
    false
  ),
  BonusPromoOffersSettings: o([{ json: "enabled", js: "enabled", typ: true }], false),
  CAPTCHA: o(
    [
      { json: "isEnabled", js: "isEnabled", typ: true },
      { json: "isInternalEnabled", js: "isInternalEnabled", typ: true },
      { json: "url", js: "url", typ: "" },
      { json: "key", js: "key", typ: "" },
      { json: "internalKey", js: "internalKey", typ: "" },
    ],
    false
  ),
  ConfirmContactsReward: o(
    [
      { json: "isAvailable", js: "isAvailable", typ: true },
      { json: "amount", js: "amount", typ: 0 },
      { json: "freeSpinAmount", js: "freeSpinAmount", typ: null },
      { json: "conditions", js: "conditions", typ: a("") },
      { json: "prizeTitle", js: "prizeTitle", typ: "" },
    ],
    false
  ),
  Country: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "iso", js: "iso", typ: "" },
      { json: "title", js: "title", typ: "" },
      { json: "title_i18n", js: "titleI18N", typ: "" },
      { json: "dialCode", js: "dialCode", typ: "" },
    ],
    false
  ),
  Currencies: o(
    [
      { json: "cis", js: "cis", typ: true },
      { json: "currencies", js: "currencies", typ: a(r("Currency")) },
    ],
    false
  ),
  Currency: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "iso", js: "iso", typ: "" },
      { json: "symbol", js: "symbol", typ: "" },
    ],
    false
  ),
  DailyLogin: o(
    [
      { json: "isActive", js: "isActive", typ: true },
      { json: "isUnlimited", js: "isUnlimited", typ: true },
    ],
    false
  ),
  DepositStreak: o(
    [
      { json: "isActive", js: "isActive", typ: true },
      { json: "startedAt", js: "startedAt", typ: "" },
      { json: "finishedAt", js: "finishedAt", typ: "" },
      { json: "percentEnabled", js: "percentEnabled", typ: true },
      { json: "balanceLimit", js: "balanceLimit", typ: 0 },
      { json: "skin", js: "skin", typ: "" },
      { json: "popUpSoundPath", js: "popUpSoundPath", typ: "" },
    ],
    false
  ),
  Documents: o(
    [
      { json: "max_documents", js: "maxDocuments", typ: 0 },
      { json: "max_file_size", js: "maxFileSize", typ: 0 },
    ],
    false
  ),
  ExternalScript: o(
    [
      { json: "code", js: "code", typ: "" },
      { json: "location", js: "location", typ: "" },
    ],
    false
  ),
  FeaturesPriority: o(
    [
      { json: "offerComponents", js: "offerComponents", typ: a("") },
      { json: "bannerInTheCashDesk", js: "bannerInTheCashDesk", typ: a("") },
      { json: "cardsInMainMenu", js: "cardsInMainMenu", typ: a("") },
      { json: "widgetInGamePopup", js: "widgetInGamePopup", typ: a("") },
      { json: "onMainPage", js: "onMainPage", typ: a("") },
    ],
    false
  ),
  Fingerprint: o(
    [
      { json: "isEnabled", js: "isEnabled", typ: true },
      { json: "url", js: "url", typ: "" },
    ],
    false
  ),
  Footer: o([], false),
  FraudDetector: o(
    [
      { json: "enabled", js: "enabled", typ: true },
      { json: "verificationCompleted", js: "verificationCompleted", typ: true },
    ],
    false
  ),
  FreeCoins: o(
    [
      { json: "isActive", js: "isActive", typ: true },
      { json: "minSum", js: "minSum", typ: 0 },
      { json: "freeSum", js: "freeSum", typ: 0 },
    ],
    false
  ),
  FunMeter: o([{ json: "is_active", js: "isActive", typ: true }], false),
  Header: o(
    [
      { json: "logo2x", js: "logo2X", typ: "" },
      { json: "logo", js: "logo", typ: "" },
      { json: "menu", js: "menu", typ: r("Menu") },
      { json: "menuBanner", js: "menuBanner", typ: null },
    ],
    false
  ),
  Menu: o(
    [
      { json: "main", js: "main", typ: a("any") },
      { json: "simple", js: "simple", typ: a("any") },
      { json: "additional", js: "additional", typ: a("any") },
      { json: "promo", js: "promo", typ: a("any") },
    ],
    false
  ),
  HistoryTransaction: o(
    [
      { json: "show", js: "show", typ: true },
      { json: "isEntries", js: "isEntries", typ: true },
      { json: "isCoins", js: "isCoins", typ: true },
    ],
    false
  ),
  NotificationCenter: o(
    [
      { json: "onPage", js: "onPage", typ: 0 },
      { json: "messages", js: "messages", typ: a(r("Message")) },
      { json: "countPages", js: "countPages", typ: 0 },
      { json: "unreadMessagesCount", js: "unreadMessagesCount", typ: 0 },
    ],
    false
  ),
  Message: o(
    [
      { json: "systemAlias", js: "systemAlias", typ: "" },
      { json: "ncMessageId", js: "ncMessageID", typ: 0 },
      { json: "isReaded", js: "isReaded", typ: true },
      { json: "type", js: "type", typ: "" },
      { json: "title", js: "title", typ: "" },
      { json: "message", js: "message", typ: "" },
      { json: "link", js: "link", typ: "" },
      { json: "image", js: "image", typ: "" },
      { json: "buttonLabel", js: "buttonLabel", typ: "" },
      { json: "dateBegin", js: "dateBegin", typ: "" },
      { json: "dateEnd", js: "dateEnd", typ: "" },
      { json: "createdAt", js: "createdAt", typ: "" },
    ],
    false
  ),
  PayPal: o([{ json: "paymentsIn", js: "paymentsIn", typ: r("PaymentsIn") }], false),
  PaymentsIn: o([{ json: "keys", js: "keys", typ: r("PaymentsInKeys") }], false),
  PaymentsInKeys: o([{ json: "api_key", js: "apiKey", typ: null }], false),
  PlayerInfo: o(
    [
      { json: "playerDashboard", js: "playerDashboard", typ: r("PlayerDashboard") },
      { json: "playerBalance", js: "playerBalance", typ: r("PlayerBalance") },
    ],
    false
  ),
  PlayerBalance: o(
    [
      { json: "balance", js: "balance", typ: "" },
      { json: "currency", js: "currency", typ: "" },
      { json: "main", js: "main", typ: "" },
      { json: "bonus", js: "bonus", typ: a("any") },
      { json: "entries", js: "entries", typ: 0 },
      { json: "winnings", js: "winnings", typ: "" },
      { json: "tourPoints", js: "tourPoints", typ: 0 },
    ],
    false
  ),
  PlayerDashboard: o(
    [
      { json: "registerDate", js: "registerDate", typ: "" },
      { json: "settings", js: "settings", typ: r("Settings") },
      { json: "playerStatus", js: "playerStatus", typ: r("PlayerStatus") },
    ],
    false
  ),
  PlayerStatus: o(
    [
      { json: "cashbackInfo", js: "cashbackInfo", typ: r("CashbackInfo") },
      { json: "current", js: "current", typ: r("Current") },
      { json: "next", js: "next", typ: r("Current") },
    ],
    false
  ),
  CashbackInfo: o(
    [
      { json: "startFromTitle", js: "startFromTitle", typ: "" },
      { json: "minRate", js: "minRate", typ: "" },
      { json: "maxRate", js: "maxRate", typ: "" },
    ],
    false
  ),
  Current: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "title", js: "title", typ: "" },
      { json: "minCp", js: "minCp", typ: "" },
      { json: "rate", js: "rate", typ: 0 },
      { json: "cashback", js: "cashback", typ: "" },
      { json: "number", js: "number", typ: 0 },
      { json: "achieved", js: "achieved", typ: true },
      { json: "currency", js: "currency", typ: "" },
      { json: "currentCp", js: "currentCp", typ: 0 },
      { json: "totalCp", js: "totalCp", typ: 0 },
      { json: "code", js: "code", typ: "" },
    ],
    false
  ),
  Settings: o(
    [
      { json: "sms_notify", js: "smsNotify", typ: true },
      { json: "push_msg", js: "pushMsg", typ: true },
      { json: "email_notify", js: "emailNotify", typ: true },
    ],
    false
  ),
  PlayerSocLogin: o(
    [
      { json: "enabled", js: "enabled", typ: true },
      { json: "credentials", js: "credentials", typ: r("Credentials") },
    ],
    false
  ),
  Credentials: o(
    [
      { json: "google", js: "google", typ: r("Apple") },
      { json: "facebook", js: "facebook", typ: r("Apple") },
      { json: "apple", js: "apple", typ: r("Apple") },
      { json: "telegram", js: "telegram", typ: r("Telegram") },
    ],
    false
  ),
  Apple: o(
    [
      { json: "enabled", js: "enabled", typ: true },
      { json: "callback", js: "callback", typ: "" },
      { json: "keys", js: "keys", typ: r("AppleKeys") },
      { json: "scope", js: "scope", typ: "" },
    ],
    false
  ),
  AppleKeys: o([{ json: "id", js: "id", typ: "" }], false),
  Telegram: o(
    [
      { json: "enabled", js: "enabled", typ: true },
      { json: "callback", js: "callback", typ: null },
      { json: "keys", js: "keys", typ: r("TelegramKeys") },
      { json: "scope", js: "scope", typ: null },
    ],
    false
  ),
  TelegramKeys: o(
    [
      { json: "id", js: "id", typ: null },
      { json: "name", js: "name", typ: null },
    ],
    false
  ),
  PlayersLastActionDAT: o(
    [
      { json: "id", js: "id", typ: "" },
      { json: "nickname", js: "nickname", typ: "" },
      { json: "login", js: "login", typ: "" },
      { json: "type", js: "type", typ: "" },
      { json: "data", js: "data", typ: r("PlayersLastActionDatumData") },
      { json: "city", js: "city", typ: "" },
      { json: "state", js: "state", typ: "" },
      { json: "surname", js: "surname", typ: "" },
      { json: "name", js: "name", typ: "" },
      { json: "gameMode", js: "gameMode", typ: "" },
    ],
    false
  ),
  PlayersLastActionDatumData: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "title", js: "title", typ: "" },
      { json: "slug", js: "slug", typ: "" },
      { json: "logo", js: "logo", typ: "" },
      { json: "winAmount", js: "winAmount", typ: 0 },
      { json: "betAmount", js: "betAmount", typ: 0 },
      { json: "isOnlyForApp", js: "isOnlyForApp", typ: true },
      { json: "gamePlayInfo", js: "gamePlayInfo", typ: true },
      { json: "gameExclusiveData", js: "gameExclusiveData", typ: a("any") },
      { json: "cover", js: "cover", typ: u(null, "") },
      { json: "maxWin", js: "maxWin", typ: r("MaxBet") },
      { json: "minBet", js: "minBet", typ: r("MaxBet") },
      { json: "maxBet", js: "maxBet", typ: r("MaxBet") },
      { json: "volatility", js: "volatility", typ: 0 },
      { json: "rtp", js: "rtp", typ: "" },
      { json: "maxMultiplier", js: "maxMultiplier", typ: 0 },
      { json: "isBonusFeature", js: "isBonusFeature", typ: true },
    ],
    false
  ),
  MaxBet: o(
    [
      { json: "entries", js: "entries", typ: "" },
      { json: "coins", js: "coins", typ: "" },
    ],
    false
  ),
  RankLeague: o(
    [
      { json: "enabled", js: "enabled", typ: true },
      { json: "progressData", js: "progressData", typ: null },
      { json: "activeBooster", js: "activeBooster", typ: null },
      { json: "availableSectionsBoosters", js: "availableSectionsBoosters", typ: null },
      { json: "playerWheels", js: "playerWheels", typ: null },
      { json: "playerWheelsAvailable", js: "playerWheelsAvailable", typ: null },
    ],
    false
  ),
  Registration: o(
    [
      { json: "isAvailable", js: "isAvailable", typ: true },
      { json: "complete", js: "complete", typ: r("Complete") },
      { json: "selectedBonusId", js: "selectedBonusID", typ: null },
      { json: "depositSelected", js: "depositSelected", typ: true },
      { json: "noDepositSelected", js: "noDepositSelected", typ: true },
      { json: "noDepositAvailable", js: "noDepositAvailable", typ: true },
      { json: "noDepositApplied", js: "noDepositApplied", typ: true },
      { json: "bonusType", js: "bonusType", typ: null },
      { json: "registrationFunnel", js: "registrationFunnel", typ: r("RegistrationFunnel") },
      { json: "Bonuses", js: "bonuses", typ: a(null) },
      { json: "referrerInfo", js: "referrerInfo", typ: null },
      { json: "optionsAB", js: "optionsAB", typ: a("any") },
      { json: "isBonusPopupAfterVerificationEnabled", js: "isBonusPopupAfterVerificationEnabled", typ: true },
    ],
    false
  ),
  Complete: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "iso", js: "iso", typ: "" },
      { json: "title", js: "title", typ: "" },
      { json: "rate", js: "rate", typ: "" },
      { json: "enabled", js: "enabled", typ: true },
      { json: "sort", js: "sort", typ: 0 },
      { json: "title_i18n", js: "titleI18N", typ: "" },
      { json: "default", js: "default", typ: true },
      { json: "preset", js: "preset", typ: "" },
      { json: "rate_gp", js: "rateGp", typ: "" },
      { json: "hidden", js: "hidden", typ: true },
      { json: "allowed_site", js: "allowedSite", typ: "" },
      { json: "default_amount", js: "defaultAmount", typ: null },
    ],
    false
  ),
  RegistrationFunnel: o(
    [
      { json: "title", js: "title", typ: "" },
      { json: "isShowConfirmPopup", js: "isShowConfirmPopup", typ: true },
      { json: "isShowGratitudePopup", js: "isShowGratitudePopup", typ: true },
      { json: "isNeedConfirmAllContacts", js: "isNeedConfirmAllContacts", typ: true },
      { json: "popupTimeout", js: "popupTimeout", typ: 0 },
      { json: "funnelType", js: "funnelType", typ: "" },
      { json: "version", js: "version", typ: null },
      { json: "trafficSource", js: "trafficSource", typ: null },
      { json: "isPasswordSet", js: "isPasswordSet", typ: true },
      { json: "labelBonusNumber", js: "labelBonusNumber", typ: null },
      { json: "bonusLabel", js: "bonusLabel", typ: null },
    ],
    false
  ),
  RegistrationFormData: o(
    [
      { json: "emailEnabled", js: "emailEnabled", typ: true },
      { json: "phoneEnabled", js: "phoneEnabled", typ: true },
      { json: "facebookAuthEnabled", js: "facebookAuthEnabled", typ: true },
      { json: "googleAuthEnabled", js: "googleAuthEnabled", typ: true },
      { json: "contactsOrder", js: "contactsOrder", typ: a("") },
    ],
    false
  ),
  Season: o(
    [
      { json: "isEnabled", js: "isEnabled", typ: true },
      { json: "isActive", js: "isActive", typ: true },
      { json: "isAvailable", js: "isAvailable", typ: true },
      { json: "isEnabledAvailabilityByDeposit", js: "isEnabledAvailabilityByDeposit", typ: true },
      { json: "slug", js: "slug", typ: "" },
      { json: "totalProgressPercents", js: "totalProgressPercents", typ: 0 },
      { json: "currentLevel", js: "currentLevel", typ: 0 },
      { json: "prize", js: "prize", typ: 0 },
    ],
    false
  ),
  SignUpBonus: o([{ json: "available", js: "available", typ: true }], false),
  Trustpilot: o(
    [
      { json: "rate", js: "rate", typ: 0 },
      { json: "reviewsCount", js: "reviewsCount", typ: 0 },
    ],
    false
  ),
  WelcomePackage: o(
    [
      { json: "fsAmount", js: "fsAmount", typ: 0 },
      { json: "moneyAmount", js: "moneyAmount", typ: a("") },
    ],
    false
  ),
  WheelForGuest: o(
    [
      { json: "isActive", js: "isActive", typ: true },
      { json: "timeToAppear", js: "timeToAppear", typ: null },
    ],
    false
  ),
  WsConnectionData: o([{ json: "centrifugo", js: "centrifugo", typ: r("Centrifugo") }], false),
  Centrifugo: o(
    [
      { json: "url", js: "url", typ: "" },
      { json: "connectionToken", js: "connectionToken", typ: "" },
      { json: "connections", js: "connections", typ: a(r("Connection")) },
    ],
    false
  ),
  Connection: o(
    [
      { json: "token", js: "token", typ: "" },
      { json: "channelName", js: "channelName", typ: "" },
    ],
    false
  ),
};
/*
{
    "data": {
        "isGuest": false,
        "login": "5401084",
        "phone": null,
        "nickname": null,
        "emailConfirmed": true,
        "phoneConfirmed": false,
        "confirmed": false,
        "primaryContact": "email",
        "preferredCountryCode": "us",
        "websocket": "wss:\/\/wss.funrize.com:",
        "activeBonusId": null,
        "firstBettingBonusId": null,
        "hasActiveSportBettingBonus": false,
        "activeBonus": null,
        "birthdayBonus": null,
        "isMobile": true,
        "isMobileApp": false,
        "documents": {
            "max_documents": 10,
            "max_file_size": 15
        },
        "onesignalAppId": null,
        "depositsTracker": false,
        "labelBonusNumber": null,
        "bonusLabel": null,
        "TournamentsSubscriptions": [],
        "Registration": {
            "isAvailable": true,
            "complete": {
                "id": 3,
                "iso": "USD",
                "title": "$ - USD",
                "rate": "1",
                "enabled": true,
                "sort": 5,
                "title_i18n": "USD",
                "default": true,
                "preset": "10,25,50,100,300",
                "rate_gp": "1",
                "hidden": false,
                "allowed_site": "all",
                "default_amount": null
            },
            "selectedBonusId": null,
            "depositSelected": false,
            "noDepositSelected": false,
            "noDepositAvailable": false,
            "noDepositApplied": false,
            "bonusType": null,
            "registrationFunnel": {
                "title": "Default",
                "isShowConfirmPopup": false,
                "isShowGratitudePopup": false,
                "isNeedConfirmAllContacts": false,
                "popupTimeout": 0,
                "funnelType": "conditionally_closed_funnel",
                "version": null,
                "trafficSource": null,
                "isPasswordSet": true,
                "labelBonusNumber": null,
                "bonusLabel": null
            },
            "Bonuses": [
                null
            ],
            "referrerInfo": null,
            "optionsAB": [],
            "isBonusPopupAfterVerificationEnabled": false
        },
        "countries": [
            {
                "id": 440,
                "iso": "us",
                "title": "United States of America",
                "title_i18n": "USA",
                "dialCode": "+1"
            }
        ],
        "currency": "USD",
        "currencySymbol": "$",
        "captcha": {
            "isEnabled": true,
            "isInternalEnabled": false,
            "url": "https:\/\/www.google.com\/recaptcha\/api.js?render=6Lc4J28qAAAAAPb0am55LI0co0MU8EBO64u5OBv9",
            "key": "6Lc4J28qAAAAAPb0am55LI0co0MU8EBO64u5OBv9",
            "internalKey": "6pt5ukbtwp4x2pbk"
        },
        "bonusPromoData": {
            "show": false,
            "bonusType": "",
            "bonusData": []
        },
        "manager": null,
        "profile": "NTQwMTA4NA==",
        "appName": "Funrize",
        "confirmEmailByType": "link",
        "confirmPhoneByType": "code",
        "isVipTournamentAvailable": false,
        "fingerprint": {
            "isEnabled": true,
            "url": "https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/fingerprintjs2\/2.1.0\/fingerprint2.js"
        },
        "charset": "UTF-8",
        "activeSocialAccounts": [
            "google"
        ],
        "closePopups": null,
        "currencies": {
            "cis": false,
            "currencies": [
                {
                    "id": 3,
                    "iso": "USD",
                    "symbol": "$"
                }
            ]
        },
        "agreementUrl": "\/agreement\/",
        "agreementCPUrl": "\/agreement\/#cp",
        "agreementWithdrawalUrl": "\/agreements\/#withdrawal",
        "agreementCodesUrl": "\/codes\/",
        "isModal": false,
        "modalCommandClose": "#ng-command:{\"close\":\"true\"}",
        "language": "en",
        "token": "92e70625408d3696fbc31ba5890475d3",
        "remarketingBannerSettings": null,
        "header": {
            "logo2x": "",
            "logo": "",
            "menu": {
                "main": [],
                "simple": [],
                "additional": [],
                "promo": []
            },
            "menuBanner": null
        },
        "footer": {
            "menu": [
                {
                    "title": "Games",
                    "slug": null,
                    "isScrollBlock": true,
                    "items": [
                        {
                            "title": "Play\u2019n\u2019Win",
                            "url": "\/game-issues\/rapid-link\/",
                            "slug": "rapid-link",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-issue"
                        },
                        {
                            "title": "Megaways",
                            "url": "\/game-issues\/megaways\/",
                            "slug": "megaways",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-issue"
                        },
                        {
                            "title": "Classic Reels",
                            "url": "\/game-issues\/3x3\/",
                            "slug": "3x3",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-issue"
                        },
                        {
                            "title": "Fun Pool",
                            "url": "\/game-issues\/fun-pool\/",
                            "slug": "fun-pool",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-issue"
                        },
                        {
                            "title": "Instant Games",
                            "url": "\/game-issues\/instant-games\/",
                            "slug": "instant-games",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-issue"
                        },
                        {
                            "title": "Betsoft",
                            "url": "\/game-issues\/special-provider-betsoft\/",
                            "slug": "special-provider-betsoft",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-issue"
                        },
                        {
                            "title": "Netgame",
                            "url": "\/game-vendors\/netgame\/",
                            "slug": "netgame",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "Kalamba",
                            "url": "\/game-vendors\/kalamba\/",
                            "slug": "kalamba",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "Slotmill",
                            "url": "\/game-vendors\/slotmill\/",
                            "slug": "slotmill",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "Spadegaming",
                            "url": "\/game-vendors\/spadegaming\/",
                            "slug": "spadegaming",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "Evoplay",
                            "url": "\/game-vendors\/evoplayaone\/",
                            "slug": "evoplayaone",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "Gaming Corps",
                            "url": "\/game-vendors\/gaming-corps\/",
                            "slug": "gaming-corps",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "TaDa Gaming",
                            "url": "\/game-vendors\/tada-gaming\/",
                            "slug": "tada-gaming",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "Popiplay",
                            "url": "\/game-vendors\/popiplay\/",
                            "slug": "popiplay",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "1spin4win",
                            "url": "\/game-vendors\/onespinfourwin\/",
                            "slug": "onespinfourwin",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "Pragmatic",
                            "url": "\/game-vendors\/pragmaticswst\/",
                            "slug": "pragmaticswst",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "Novomatic",
                            "url": "\/game-vendors\/novomatic\/",
                            "slug": "novomatic",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "AvatarUX",
                            "url": "\/game-vendors\/avatarux\/",
                            "slug": "avatarux",
                            "seoMetaRobotsEnabled": false,
                            "type": "game-tag"
                        },
                        {
                            "title": "Invite friend",
                            "url": "\/referrals\/",
                            "slug": "referrals",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "Funrize: Free to Play Social Casino",
                            "url": "\/index\/",
                            "slug": "index",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "How it works",
                            "url": "\/how-it-works\/",
                            "slug": "how-it-works",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "Tournament rules",
                            "url": "\/tournaments-rules\/",
                            "slug": "tournaments-rules",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "Tournaments ",
                            "url": "\/tournaments\/",
                            "slug": "tournaments",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "Register",
                            "url": "\/register\/",
                            "slug": "register",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        }
                    ]
                },
                {
                    "title": "first_column",
                    "slug": "first_column",
                    "isScrollBlock": false,
                    "items": []
                },
                {
                    "title": "second_column",
                    "slug": "second_column",
                    "isScrollBlock": false,
                    "items": [
                        {
                            "title": "Alternative Method of Promotion Entry",
                            "url": "\/alternative-method-of-entry\/",
                            "slug": "alternative-method-of-entry",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "Terms of Use & Service Agreement",
                            "url": "\/agreement\/",
                            "slug": "agreement",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "Privacy Policy",
                            "url": "\/privacy\/",
                            "slug": "privacy",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "Funrize\u2122 Award Rules",
                            "url": "\/promotional-games-rules\/",
                            "slug": "promotional-games-rules",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "Refund Policy",
                            "url": "\/refund-policy\/",
                            "slug": "refund-policy",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "California Privacy Notice ",
                            "url": "\/california-privacy-notice\/",
                            "slug": "california-privacy-notice",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "Affiliate Terms and Conditions",
                            "url": "\/affiliate-agreement\/",
                            "slug": "affiliate-agreement",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        },
                        {
                            "title": "Cookie notice",
                            "url": "\/cookie-notice\/",
                            "slug": "cookie-notice",
                            "seoMetaRobotsEnabled": false,
                            "type": null
                        }
                    ]
                }
            ],
            "dmcaUrl": "",
            "copyright": "\u00a9 2025 Funrize."
        },
        "license": null,
        "authImages": [],
        "alternateDomains": [],
        "analyticsData": {
            "analytics": "<!-- Analytic metric -->\n<!-- End Analytic metric -->",
            "tagManagerScript": "\n<script>dataLayer = [{\"Player_ID\": \"5401084\"}];<\/script>\n\n<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n        'https:\/\/www.googletagmanager.com\/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n    })(window,document,'script','dataLayer','');<\/script>\n<!-- End Google Tag Manager -->\n",
            "tagManagerNoscript": "\n<!-- Google Tag Manager (noscript) -->\n<noscript>\n    <iframe src=\"https:\/\/www.googletagmanager.com\/ns.html?id=\"\n            height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"><\/iframe>\n<\/noscript>\n<!-- End Google Tag Manager (noscript) -->\n"
        },
        "chat": "\n  <script>\n      var playerInfo = {\n          name: \"ash\",\n          email: \"ashdowning@gmail.com\",\n          custom: {\n              idpolzovatelya: \"5401084\"\n          }\n      }\n  <\/script>\n\n<script>\n    var newScript = document.createElement('script');\r\nnewScript.src = 'https:\/\/static.zdassets.com\/ekr\/snippet.js?key=e96ff61c-e356-4154-b2bf-0baf255d7997';\r\nnewScript.id = 'ze-snippet';\r\ndocument.head.appendChild(newScript);\r\nconst data = {\r\n    name: window.__INITIAL_STATE__.player.profile.data.name,\r\n    login: window.__INITIAL_STATE__.player.profile.data.login,\r\n    email: window.__INITIAL_STATE__.player.profile.data.email,\r\n}\r\n\r\nconst zIndex = { value: 0 };\r\nwindow.supportAPI = {\r\n    id: 'zendesk',\r\n    open: function(){\r\n        zE('messenger', 'open');\r\n        zIndex.value = 999999;\r\n        zE(\"messenger:set\", \"zIndex\", 999999);\r\n\r\n        return;\r\n    },\r\n};\r\n\r\nconst queryParams = new URLSearchParams(document.location.search);\r\nnewScript.addEventListener('load', () => {\r\n     if(!window.__INITIAL_STATE__.player.profile.data.isGuest) {\r\n        fetch('\/chat\/auth\/', {\r\n          method: 'POST',\r\n          headers: {\r\n            'Accept': 'application\/json',\r\n            'Content-Type': 'application\/json',\r\n          },\r\n          body: JSON.stringify(data)\r\n        })\r\n          .then((response) => response.text())\r\n          .then((responseData) => {\r\n             setTimeout(()=>{\r\n              zE(\"messenger\", \"loginUser\", (callback) => {\r\n                callback( responseData);\r\n              } )\r\n             },500)\r\n          })\r\n    };\r\n   \r\n    zE(\"messenger:set\", \"zIndex\", 2000)\r\n    zIndex.value = 2000;\r\n    zE(\"messenger:on\", \"open\", () => {\r\n        if (zIndex.value !== 999999) {\r\n            zIndex.value = 999999;\r\n            zE(\"messenger:set\", \"zIndex\", 999999);\r\n            zE(\"messenger\", 'show');\r\n            document.getElementById(\"support\").style.display = \"none\";\r\n        }\r\n    });\r\n    zE(\"messenger:on\", \"close\", () => {\r\n        if (zIndex.value !== 2000) {\r\n            zIndex.value = 2000;\r\n            zE(\"messenger:set\", \"zIndex\", 2000)\r\n            zE(\"messenger\", 'hide');\r\n            setTimeout(()=> {\r\n                document.getElementById(\"support\").style.display = \"block\";\r\n            },1000);\r\n        }\r\n    })\r\n    if (queryParams.get(\"openSupport\")) {\r\n        zE('messenger', 'open');\r\n    }\r\n    if (window.location.pathname === '\/referral-info\/' || window.location.pathname === '\/affiliates\/') {\r\n        zE('messenger', 'hide');\r\n    } else {\r\n        zE('messenger', 'show');\r\n    }\r\n})<\/script>\n",
        "cpaCallbacks": "",
        "isSocialEnabled": false,
        "isFullRegistration": false,
        "isSubscribedEnabled": false,
        "welcomeGift": 0,
        "cis": false,
        "autoLock": null,
        "emailNotify": true,
        "smsNotify": false,
        "email": "ashdowning@gmail.com",
        "name": "ash",
        "surname": "downing",
        "birthMonth": "3",
        "birthYear": "1975",
        "birthDay": "6",
        "countryId": 440,
        "countryCode": "us",
        "city": null,
        "address": null,
        "hasPassword": true,
        "hasAutoPassword": true,
        "isPasswordEnabled": true,
        "location": "all",
        "isQuestAvailableForPlayer": false,
        "currentDate": "2025-05-02T01:47:26+0300",
        "showUserFillBar": null,
        "isAllowFreespinNoDep": null,
        "availableBonuses": null,
        "freeSpinRandGame": null,
        "freeSpinRandGameTitle": null,
        "isFreeSpinActive": false,
        "showDailyFreeSpin": null,
        "uuid": "2c40269ebed2bdd59149963d7b13f3cd",
        "isTournamentSubscribed": null,
        "hasDeposits": false,
        "depositsCount": 0,
        "depositsSum": "0.00",
        "firstDepositedAt": null,
        "trustpilot": {
            "rate": 0,
            "reviewsCount": 0
        },
        "playerSocLogin": {
            "enabled": true,
            "credentials": {
                "google": {
                    "enabled": true,
                    "callback": "https:\/\/funrize.com\/auth\/google",
                    "keys": {
                        "id": "847362386754-ic5p3rek2ad81a4l4fg3fmjqclt58e59.apps.googleusercontent.com"
                    },
                    "scope": "https:\/\/www.googleapis.com\/auth\/userinfo.profile https:\/\/www.googleapis.com\/auth\/userinfo.email"
                },
                "facebook": {
                    "enabled": true,
                    "callback": "https:\/\/funrize.com\/auth\/facebook",
                    "keys": {
                        "id": "664476325771526"
                    },
                    "scope": "email, public_profile"
                },
                "apple": {
                    "enabled": true,
                    "callback": "https:\/\/funrize.com\/auth\/apple",
                    "keys": {
                        "id": "authweb.funrize.com"
                    },
                    "scope": "name email"
                },
                "telegram": {
                    "enabled": false,
                    "callback": null,
                    "keys": {
                        "id": null,
                        "name": null
                    },
                    "scope": null
                }
            }
        },
        "gameMode": "SweepStakes",
        "playersLastActionData": [
            {
                "id": "6813f9fe43871",
                "nickname": "6919***",
                "login": "6919544",
                "type": "win",
                "data": {
                    "id": 2848,
                    "title": "Fire Stampede",
                    "slug": "fire-stampede",
                    "logo": "\/uploads\/games_items\/Fire-Stampede-320x400.png",
                    "winAmount": 2300,
                    "betAmount": 4600,
                    "isOnlyForApp": false,
                    "gamePlayInfo": true,
                    "gameExclusiveData": [],
                    "cover": "\/uploads\/games_items\/Fire-Stampede-700x394.png",
                    "maxWin": {
                        "entries": "24795000",
                        "coins": "42750000"
                    },
                    "minBet": {
                        "entries": "20",
                        "coins": "100"
                    },
                    "maxBet": {
                        "entries": "5800",
                        "coins": "10000"
                    },
                    "volatility": 3,
                    "rtp": "",
                    "maxMultiplier": 4275,
                    "isBonusFeature": true
                },
                "city": "Hobart",
                "state": "IN",
                "surname": "S",
                "name": "Tammy",
                "gameMode": "TournamentPoints"
            },
            {
                "id": "6813f9fe07930",
                "nickname": "6144***",
                "login": "6144102",
                "type": "win",
                "data": {
                    "id": 2205,
                    "title": "Shark Frenzy",
                    "slug": "shark-frenzy",
                    "logo": "\/uploads\/games_items\/Shark-Frenzy-min.jpg",
                    "winAmount": 4620,
                    "betAmount": 1050,
                    "isOnlyForApp": false,
                    "gamePlayInfo": true,
                    "gameExclusiveData": [],
                    "cover": "\/uploads\/games_items\/screen_Shark-Frenzy-min.jpg",
                    "maxWin": {
                        "entries": "2333100",
                        "coins": "29163750"
                    },
                    "minBet": {
                        "entries": "15",
                        "coins": "150"
                    },
                    "maxBet": {
                        "entries": "300",
                        "coins": "3750"
                    },
                    "volatility": 3,
                    "rtp": "",
                    "maxMultiplier": 7777,
                    "isBonusFeature": true
                },
                "city": "Fresno",
                "state": "CA",
                "surname": "V",
                "name": "Aaron",
                "gameMode": "TournamentPoints"
            },
            {
                "id": "6813f9fda3208",
                "nickname": "4789***",
                "login": "4789291",
                "type": "win",
                "data": {
                    "id": 2308,
                    "title": "Rich Piggies 2 <span>Bonus Combo<\/span>",
                    "slug": "rich-piggies-2-bonus-combo",
                    "logo": "\/uploads\/games_items\/Rich-Piggies-2_-Bonus-Combo.png",
                    "winAmount": 4600,
                    "betAmount": 200,
                    "isOnlyForApp": false,
                    "gamePlayInfo": true,
                    "gameExclusiveData": [],
                    "cover": "\/uploads\/games_items\/skrin_Rich-Piggies-2_-Bonus-Combo.png",
                    "maxWin": {
                        "entries": "6500000",
                        "coins": "13000000"
                    },
                    "minBet": {
                        "entries": "20",
                        "coins": "100"
                    },
                    "maxBet": {
                        "entries": "5000",
                        "coins": "10000"
                    },
                    "volatility": 3,
                    "rtp": "",
                    "maxMultiplier": 1300,
                    "isBonusFeature": true
                },
                "city": "Huntsville",
                "state": "AL",
                "surname": "J",
                "name": "Latoya",
                "gameMode": "SweepStakes"
            },
            {
                "id": "6813f9fd5e046",
                "nickname": "5315***",
                "login": "5315039",
                "type": "win",
                "data": {
                    "id": 3186,
                    "title": "3 Coin Treasure 2",
                    "slug": "3-coin-treasure-2",
                    "logo": "\/uploads\/games_items\/3-Coin-Treasure-2_320_400.png",
                    "winAmount": 3600,
                    "betAmount": 3000,
                    "isOnlyForApp": false,
                    "gamePlayInfo": true,
                    "gameExclusiveData": [],
                    "cover": null,
                    "maxWin": {
                        "entries": "20800000",
                        "coins": "104000000"
                    },
                    "minBet": {
                        "entries": "10",
                        "coins": "100"
                    },
                    "maxBet": {
                        "entries": "2000",
                        "coins": "10000"
                    },
                    "volatility": 3,
                    "rtp": "",
                    "maxMultiplier": 10400,
                    "isBonusFeature": true
                },
                "city": "",
                "state": "",
                "surname": "W",
                "name": "Dacha",
                "gameMode": "TournamentPoints"
            }
        ],
        "playersLastActionDataLimited": [
            {
                "id": "6813f9fe43871",
                "nickname": "6919***",
                "login": "6919544",
                "type": "win",
                "data": {
                    "id": 2848,
                    "title": "Fire Stampede",
                    "slug": "fire-stampede",
                    "logo": "\/uploads\/games_items\/Fire-Stampede-320x400.png",
                    "winAmount": 2300,
                    "betAmount": 4600,
                    "isOnlyForApp": false,
                    "gamePlayInfo": true,
                    "gameExclusiveData": [],
                    "cover": "\/uploads\/games_items\/Fire-Stampede-700x394.png",
                    "maxWin": {
                        "entries": "24795000",
                        "coins": "42750000"
                    },
                    "minBet": {
                        "entries": "20",
                        "coins": "100"
                    },
                    "maxBet": {
                        "entries": "5800",
                        "coins": "10000"
                    },
                    "volatility": 3,
                    "rtp": "",
                    "maxMultiplier": 4275,
                    "isBonusFeature": true
                },
                "city": "Hobart",
                "state": "IN",
                "surname": "S",
                "name": "Tammy",
                "gameMode": "TournamentPoints"
            },
            {
                "id": "6813f9fe07930",
                "nickname": "6144***",
                "login": "6144102",
                "type": "win",
                "data": {
                    "id": 2205,
                    "title": "Shark Frenzy",
                    "slug": "shark-frenzy",
                    "logo": "\/uploads\/games_items\/Shark-Frenzy-min.jpg",
                    "winAmount": 4620,
                    "betAmount": 1050,
                    "isOnlyForApp": false,
                    "gamePlayInfo": true,
                    "gameExclusiveData": [],
                    "cover": "\/uploads\/games_items\/screen_Shark-Frenzy-min.jpg",
                    "maxWin": {
                        "entries": "2333100",
                        "coins": "29163750"
                    },
                    "minBet": {
                        "entries": "15",
                        "coins": "150"
                    },
                    "maxBet": {
                        "entries": "300",
                        "coins": "3750"
                    },
                    "volatility": 3,
                    "rtp": "",
                    "maxMultiplier": 7777,
                    "isBonusFeature": true
                },
                "city": "Fresno",
                "state": "CA",
                "surname": "V",
                "name": "Aaron",
                "gameMode": "TournamentPoints"
            },
            {
                "id": "6813f9fda3208",
                "nickname": "4789***",
                "login": "4789291",
                "type": "win",
                "data": {
                    "id": 2308,
                    "title": "Rich Piggies 2 <span>Bonus Combo<\/span>",
                    "slug": "rich-piggies-2-bonus-combo",
                    "logo": "\/uploads\/games_items\/Rich-Piggies-2_-Bonus-Combo.png",
                    "winAmount": 4600,
                    "betAmount": 200,
                    "isOnlyForApp": false,
                    "gamePlayInfo": true,
                    "gameExclusiveData": [],
                    "cover": "\/uploads\/games_items\/skrin_Rich-Piggies-2_-Bonus-Combo.png",
                    "maxWin": {
                        "entries": "6500000",
                        "coins": "13000000"
                    },
                    "minBet": {
                        "entries": "20",
                        "coins": "100"
                    },
                    "maxBet": {
                        "entries": "5000",
                        "coins": "10000"
                    },
                    "volatility": 3,
                    "rtp": "",
                    "maxMultiplier": 1300,
                    "isBonusFeature": true
                },
                "city": "Huntsville",
                "state": "AL",
                "surname": "J",
                "name": "Latoya",
                "gameMode": "SweepStakes"
            },
            {
                "id": "6813f9fd5e046",
                "nickname": "5315***",
                "login": "5315039",
                "type": "win",
                "data": {
                    "id": 3186,
                    "title": "3 Coin Treasure 2",
                    "slug": "3-coin-treasure-2",
                    "logo": "\/uploads\/games_items\/3-Coin-Treasure-2_320_400.png",
                    "winAmount": 3600,
                    "betAmount": 3000,
                    "isOnlyForApp": false,
                    "gamePlayInfo": true,
                    "gameExclusiveData": [],
                    "cover": null,
                    "maxWin": {
                        "entries": "20800000",
                        "coins": "104000000"
                    },
                    "minBet": {
                        "entries": "10",
                        "coins": "100"
                    },
                    "maxBet": {
                        "entries": "2000",
                        "coins": "10000"
                    },
                    "volatility": 3,
                    "rtp": "",
                    "maxMultiplier": 10400,
                    "isBonusFeature": true
                },
                "city": "",
                "state": "",
                "surname": "W",
                "name": "Dacha",
                "gameMode": "TournamentPoints"
            },
            {
                "id": "6813f9fd5cb5b",
                "nickname": "7204***",
                "login": "7204190",
                "type": "win",
                "data": {
                    "id": 3219,
                    "title": "Fortune Pig",
                    "slug": "fortune-pig",
                    "logo": "\/uploads\/games_items\/FR_Fortune-Pig-2x-min.png",
                    "winAmount": 1000,
                    "betAmount": 200,
                    "isOnlyForApp": false,
                    "gamePlayInfo": true,
                    "gameExclusiveData": [],
                    "cover": "\/uploads\/games_items\/FR_Fortune-Pig-700x394-2x-min.png",
                    "maxWin": {
                        "entries": "2000000",
                        "coins": "10000000"
                    },
                    "minBet": {
                        "entries": "10",
                        "coins": "100"
                    },
                    "maxBet": {
                        "entries": "2000",
                        "coins": "10000"
                    },
                    "volatility": 3,
                    "rtp": "",
                    "maxMultiplier": 1000,
                    "isBonusFeature": true
                },
                "city": "Pryor",
                "state": "OK",
                "surname": "T",
                "name": "Brandon",
                "gameMode": "SweepStakes"
            }
        ],
        "userBarCount": 4,
        "isBonusPopup": null,
        "showBonusPopup": null,
        "defaultSettings": "",
        "verificationDone": false,
        "startChain": null,
        "isRegFinished": null,
        "preferredCurrency": null,
        "isLotteryActive": false,
        "lotteryType": null,
        "lotterySlug": null,
        "favoriteGames": [],
        "isShowNodepFreeSpin": null,
        "lastGames": [
            2070,
            1845,
            1997,
            2191,
            3079,
            3094,
            1720,
            2091,
            1737,
            1735,
            2028,
            3041,
            2854,
            2847,
            3078,
            2335,
            3051
        ],
        "zip": "75701",
        "noContact": false,
        "isGameFiltersPromoDisplayed": false,
        "lotteryPromoTicketData": null,
        "vipTournamentType": null,
        "hideNoDepOnBonusPage": false,
        "isAutoCashRegister": false,
        "isPushNotificationAvailable": null,
        "webPushAlertAllowed": null,
        "webPushBlockedDefault": null,
        "webPushAlertNotificationShow": null,
        "webPushAlertProposed": null,
        "webPushProposed": null,
        "webPushAccepted": null,
        "webPushDeclined": null,
        "webPushAlertIgnored": null,
        "webPushAlertIgnoredCount": null,
        "bonusPromoOffersSettings": {
            "enabled": false
        },
        "wheelOfFortune": null,
        "siteNotifications": "",
        "lotteryAmountTickets": 0,
        "showVersionLink": false,
        "welcomePackage": {
            "fsAmount": 0,
            "moneyAmount": [
                "n\/a"
            ]
        },
        "isDebug": false,
        "socialNetworks": [],
        "showInsuranceBonusInfo": false,
        "showInsuranceBonusPopup": false,
        "isDesignL": false,
        "ludomanCheckEnabled": false,
        "appleAppId": "1618212717",
        "ssn": false,
        "profileCompleted": true,
        "state": "",
        "address2": "",
        "signUpBonus": {
            "available": false
        },
        "isBonusesEnabled": true,
        "androidAppId": "com.funrize.game.client",
        "showDownloadAppPopup": true,
        "showAppFeaturesForGuest": false,
        "bannerPresetPackage": {
            "preset": {
                "id": 18,
                "coins": 50000,
                "entries": 500,
                "additionalData": null,
                "moneyBoxAmount": null,
                "accumulatedMoneyBoxAmount": null,
                "availableTill": null
            },
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
            "money": 4.99,
            "usualPrice": 0,
            "imageCash": "\/uploads\/promo_offers_presets\/2-1731441779.png",
            "isWelcomeOffer": false,
            "text": "",
            "additionalData": []
        },
        "popupPresetPackages": [
            {
                "preset": {
                    "id": 18,
                    "coins": 50000,
                    "entries": 500,
                    "additionalData": null,
                    "moneyBoxAmount": null,
                    "accumulatedMoneyBoxAmount": null,
                    "availableTill": null
                },
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
                "money": 4.99,
                "usualPrice": 0,
                "imageCash": "\/uploads\/promo_offers_presets\/2-1731441779.png",
                "isWelcomeOffer": false,
                "text": "",
                "additionalData": []
            },
            {
                "preset": {
                    "id": 23,
                    "coins": 250000,
                    "entries": 2500,
                    "additionalData": null,
                    "moneyBoxAmount": null,
                    "accumulatedMoneyBoxAmount": null,
                    "availableTill": null
                },
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
                "money": 24.99,
                "usualPrice": 0,
                "imageCash": "\/uploads\/promo_offers_presets\/67869858560cb.png",
                "isWelcomeOffer": false,
                "text": "",
                "additionalData": []
            }
        ],
        "isShowVerificationPromo": false,
        "needConfirmPhone": false,
        "isShowDailyWheelForGuest": true,
        "fraudDetector": {
            "enabled": true,
            "verificationCompleted": false
        },
        "isShowReferralsInfo": true,
        "facebookJoinLink": "https:\/\/urlgeni.us\/facebook\/NwJq",
        "showPopupRtpGamesIfLessAmount": 50,
        "showRtpGamesPopupAfter": 900,
        "twitterJoinLink": "https:\/\/twitter.com\/funrize",
        "confirmContactsReward": {
            "isAvailable": true,
            "amount": 2,
            "freeSpinAmount": null,
            "conditions": [
                "allContactsConfirm"
            ],
            "prizeTitle": ""
        },
        "registrationTournamentPointsReward": 75000,
        "registrationFormData": {
            "emailEnabled": true,
            "phoneEnabled": true,
            "facebookAuthEnabled": true,
            "googleAuthEnabled": true,
            "contactsOrder": [
                "email",
                "phone"
            ]
        },
        "enabledOneClickRegistration": false,
        "cashback": null,
        "visitedSections": [
            "popUpHowItWorks"
        ],
        "notificationCenter": {
            "onPage": 20,
            "messages": [
                {
                    "systemAlias": "offer",
                    "ncMessageId": 17465449,
                    "isReaded": false,
                    "type": "offer",
                    "title": "\u26a1Act fast! Tap Here to Get 15 FP!",
                    "message": "We\u2019ll send an email with your Free Plays on Three Piglets to ashdowning@gmail.com",
                    "link": "https:\/\/ams-new.bonuses.email\/v1\/redirect?player_message=2504704761&hash=ed8d8168d65ea85d6a5e85b62aee1dd0&url=https%253A%252F%252Ffunrize.com",
                    "image": "https:\/\/ams-new.bonuses.email\/uploads\/images\/Funrize\/Notifications\/dailyloginicon4.png",
                    "buttonLabel": "TAP",
                    "dateBegin": "Thu, 01 May 2025 17:22:57 -0500",
                    "dateEnd": "Thu, 01 May 2025 18:22:57 -0500",
                    "createdAt": "Fri, 02 May 2025 01:22:58 +0300"
                }
            ],
            "countPages": 1,
            "unreadMessagesCount": 1
        },
        "externalScripts": [
            {
                "code": "<script>\r\n        (function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};\r\n            a=d.createElement(s);a.async=1;a.src=r;a.type='text\/java'+s;f=d.getElementsByTagName(s)[0];\r\n            f.parentNode.insertBefore(a,f)})(window,document,'script', 'https:\/\/invitejs.trustpilot.com\/tp.min.js', 'tp');\r\n            tp('register', 'XXADEdDfKD7Wz8ok');\r\n<\/script>",
                "location": "head"
            },
            {
                "code": "<!-- Google Tag Manager -->\r\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\r\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\r\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\r\n'https:\/\/www.googletagmanager.com\/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\r\n})(window,document,'script','dataLayer','GTM-KTMC5RZ');<\/script>\r\n<!-- End Google Tag Manager -->",
                "location": "head"
            },
            {
                "code": "<!-- Google Tag Manager (noscript) -->\r\n<noscript><iframe src=\"https:\/\/www.googletagmanager.com\/ns.html?id=GTM-KTMC5RZ\"\r\nheight=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"><\/iframe><\/noscript>\r\n<!-- End Google Tag Manager (noscript) -->",
                "location": "body"
            },
            {
                "code": "<!-- Google tag (gtag.js) -->\r\n<script async src=\"https:\/\/www.googletagmanager.com\/gtag\/js?id=AW-977517696\"><\/script>\r\n<script>\r\n  window.dataLayer = window.dataLayer || [];\r\n  function gtag(){dataLayer.push(arguments);}\r\n  gtag('js', new Date());\r\n  gtag('config', 'AW-977517696', {'allow_enhanced_conversions':true});\r\n<\/script>",
                "location": "head"
            }
        ],
        "canBeTransferred": false,
        "rankLeague": {
            "enabled": false,
            "progressData": null,
            "activeBooster": null,
            "availableSectionsBoosters": null,
            "playerWheels": null,
            "playerWheelsAvailable": null
        },
        "wsConnectionData": {
            "centrifugo": {
                "url": "wss:\/\/wss.funrize.com\/connection\/websocket",
                "connectionToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NDAxMDg0In0.iS9WRP5Eomx5KxXaZJ7oUJZgLBRhhyt4aij6EbnYnFg",
                "connections": [
                    {
                        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFubmVsIjoiZmFub3V0Iiwic3ViIjoiNTQwMTA4NCJ9.DR6zIAInkcl1ZX3D3S6QP1Lwc0JDoVsyTkZ6uF9L248",
                        "channelName": "fanout"
                    },
                    {
                        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFubmVsIjoiJDU0MDEwODQiLCJzdWIiOiI1NDAxMDg0In0.3jJ0McwAbt575f44LBXB5vZPymhSMD0NSrxUaV3aceQ",
                        "channelName": "$5401084"
                    }
                ]
            }
        },
        "uncollectedQuestPrize": null,
        "accountStatus": "ACTIVE",
        "isTokenizeCash": false,
        "isEntriesTournamentAvailable": true,
        "visitedRaces": [],
        "isAffiliate": false,
        "isAffiliateAgreements": false,
        "season": {
            "isEnabled": false,
            "isActive": false,
            "isAvailable": false,
            "isEnabledAvailabilityByDeposit": false,
            "slug": "",
            "totalProgressPercents": 0,
            "currentLevel": 0,
            "prize": 0
        },
        "depositStreak": {
            "isActive": true,
            "startedAt": "",
            "finishedAt": "",
            "percentEnabled": true,
            "balanceLimit": 0,
            "skin": "neutral_wheel_of_wins",
            "popUpSoundPath": ""
        },
        "redeem": {
            "show": false,
            "isEntries": false,
            "isCoins": false
        },
        "historyTransaction": {
            "show": false,
            "isEntries": false,
            "isCoins": false
        },
        "adventureWheel": {
            "isActive": false,
            "isEnabledBannerForGuest": false
        },
        "prizeDrops": {
            "isActive": false
        },
        "freeCoins": {
            "isActive": true,
            "minSum": 2000,
            "freeSum": 800
        },
        "popUpAds": {
            "isActive": true
        },
        "scratchCardLottery": {
            "isActive": false
        },
        "moneyBox": {
            "isActive": false
        },
        "magicBox": {
            "isActive": false
        },
        "bingo": {
            "isActive": false
        },
        "vipProgram": {
            "isActive": false
        },
        "rally": null,
        "dailyLogin": {
            "isActive": true,
            "isUnlimited": false
        },
        "isBannerSliderEnabled": false,
        "isCookiesNoticeEnabled": true,
        "isDailyActivitiesEnabled": false,
        "featuresPriority": {
            "offerComponents": [
                ""
            ],
            "bannerInTheCashDesk": [
                ""
            ],
            "cardsInMainMenu": [
                ""
            ],
            "widgetInGamePopup": [
                "tournament",
                "fpChallenge",
                "cashback",
                "funmeter"
            ],
            "onMainPage": [
                ""
            ]
        },
        "favLast": [
            2070,
            1845,
            1997,
            2191,
            3079,
            3094,
            1720,
            2091,
            1737,
            1735,
            2028,
            3041,
            2854,
            2847,
            3078,
            2335,
            3051
        ],
        "playerInfo": {
            "playerDashboard": {
                "registerDate": "27.03.2024",
                "settings": {
                    "sms_notify": false,
                    "push_msg": true,
                    "email_notify": true
                },
                "playerStatus": {
                    "cashbackInfo": {
                        "startFromTitle": "",
                        "minRate": "1",
                        "maxRate": "7"
                    },
                    "current": {
                        "id": 0,
                        "title": "",
                        "minCp": "0",
                        "rate": 0,
                        "cashback": "0",
                        "number": 0,
                        "achieved": true,
                        "currency": "",
                        "currentCp": 0,
                        "totalCp": 0,
                        "code": "level_1"
                    },
                    "next": {
                        "id": 0,
                        "title": "",
                        "minCp": "0",
                        "rate": 0,
                        "cashback": "0",
                        "number": 0,
                        "achieved": true,
                        "currency": "",
                        "currentCp": 0,
                        "totalCp": 0,
                        "code": "level_1"
                    }
                }
            },
            "playerBalance": {
                "balance": "0",
                "currency": "$",
                "main": "0.00",
                "bonus": [],
                "entries": 0,
                "winnings": "0.00",
                "tourPoints": 78770
            }
        },
        "payPal": {
            "paymentsIn": {
                "keys": {
                    "api_key": null
                }
            }
        },
        "funMeter": {
            "is_active": true
        },
        "playerRestrictionIdsHash": "default",
        "wheelForGuest": {
            "isActive": false,
            "timeToAppear": null
        },
        "nextTemperatureUpdateTime": null,
        "jackpotSevens": [],
        "starDrops": []
    }
}
    */
