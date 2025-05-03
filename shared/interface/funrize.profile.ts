// To parse this data:
//
//   import { Convert, Profile } from "./file";
//
//   const profile = Convert.toProfile(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type Profile = {
  pageType: string;
  seo: null;
  banner: null;
  payload: Payload;
};

export type Payload = {
  login: string;
  email: string;
  phone: string;
  name: string;
  surname: string;
  birthMonth: string;
  birthYear: string;
  birthDay: string;
  locale: string;
  countryID: number;
  countryCode: string;
  nickname: string;
  address: string;
  city: string;
  confirmed: boolean;
  emailConfirmed: boolean;
  settings: Settings;
  autoVerificationData: AutoVerificationData;
  responsiblePlay: ResponsiblePlay;
  documentConfirmStatus: string;
  rewardInfo: RewardInfo;
  avatar: null;
};

export type AutoVerificationData = {
  isEnabled: boolean;
  isAvailable: boolean;
  providers: string[];
  showOn: string[];
  duplicateCredentials: boolean;
  ageRestriction: boolean;
  undesirablePlayer: boolean;
  isTest: boolean;
  canBeRetried: boolean;
  isForcibly: boolean;
  isRequired: boolean;
  isVerified: boolean;
  showConfirmContacts: boolean;
  activatedProviders: any[];
};

export type ResponsiblePlay = {
  isActivityReminderEnabled: boolean;
  isPurchaseLimitEnabled: boolean;
  isSelfExclusionEnabled: boolean;
  activityReminderAllowedValues: string[];
  selfExclusionAllowedValues: string[];
  coolOffAllowedValues: string[];
  purchaseLimitMinDayAmount: number;
  purchaseLimitMaxDayAmount: number;
  purchaseLimitMinWeekAmount: number;
  purchaseLimitMaxWeekAmount: number;
  purchaseLimitMinMonthAmount: number;
  purchaseLimitMaxMonthAmount: number;
  activityReminderValue: null;
  purchaseLimitPeriod: null;
  purchaseLimitValue: null;
  selfExclusionValue: null;
};

export type RewardInfo = {
  currentReward: number;
  nextReward: number;
  availableAfterDateTime: Date;
};

export type Settings = {
  systemNotify: boolean;
  smsNotify: boolean;
  pushMsg: boolean;
  emailNotify: boolean;
};

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toProfile(json: string): Profile {
    return cast(JSON.parse(json), r("Profile"));
  }

  public static profileToJson(value: Profile): string {
    return JSON.stringify(uncast(value, r("Profile")), null, 2);
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
  Profile: o(
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
      { json: "login", js: "login", typ: "" },
      { json: "email", js: "email", typ: "" },
      { json: "phone", js: "phone", typ: "" },
      { json: "name", js: "name", typ: "" },
      { json: "surname", js: "surname", typ: "" },
      { json: "birthMonth", js: "birthMonth", typ: "" },
      { json: "birthYear", js: "birthYear", typ: "" },
      { json: "birthDay", js: "birthDay", typ: "" },
      { json: "locale", js: "locale", typ: "" },
      { json: "country_id", js: "countryID", typ: 0 },
      { json: "country_code", js: "countryCode", typ: "" },
      { json: "nickname", js: "nickname", typ: "" },
      { json: "address", js: "address", typ: "" },
      { json: "city", js: "city", typ: "" },
      { json: "confirmed", js: "confirmed", typ: true },
      { json: "email_confirmed", js: "emailConfirmed", typ: true },
      { json: "settings", js: "settings", typ: r("Settings") },
      { json: "autoVerificationData", js: "autoVerificationData", typ: r("AutoVerificationData") },
      { json: "responsiblePlay", js: "responsiblePlay", typ: r("ResponsiblePlay") },
      { json: "documentConfirmStatus", js: "documentConfirmStatus", typ: "" },
      { json: "rewardInfo", js: "rewardInfo", typ: r("RewardInfo") },
      { json: "avatar", js: "avatar", typ: null },
    ],
    false
  ),
  AutoVerificationData: o(
    [
      { json: "isEnabled", js: "isEnabled", typ: true },
      { json: "isAvailable", js: "isAvailable", typ: true },
      { json: "providers", js: "providers", typ: a("") },
      { json: "showOn", js: "showOn", typ: a("") },
      { json: "duplicateCredentials", js: "duplicateCredentials", typ: true },
      { json: "ageRestriction", js: "ageRestriction", typ: true },
      { json: "undesirablePlayer", js: "undesirablePlayer", typ: true },
      { json: "isTest", js: "isTest", typ: true },
      { json: "canBeRetried", js: "canBeRetried", typ: true },
      { json: "isForcibly", js: "isForcibly", typ: true },
      { json: "isRequired", js: "isRequired", typ: true },
      { json: "isVerified", js: "isVerified", typ: true },
      { json: "showConfirmContacts", js: "showConfirmContacts", typ: true },
      { json: "activatedProviders", js: "activatedProviders", typ: a("any") },
    ],
    false
  ),
  ResponsiblePlay: o(
    [
      { json: "isActivityReminderEnabled", js: "isActivityReminderEnabled", typ: true },
      { json: "isPurchaseLimitEnabled", js: "isPurchaseLimitEnabled", typ: true },
      { json: "isSelfExclusionEnabled", js: "isSelfExclusionEnabled", typ: true },
      { json: "activityReminderAllowedValues", js: "activityReminderAllowedValues", typ: a("") },
      { json: "selfExclusionAllowedValues", js: "selfExclusionAllowedValues", typ: a("") },
      { json: "coolOffAllowedValues", js: "coolOffAllowedValues", typ: a("") },
      { json: "purchaseLimitMinDayAmount", js: "purchaseLimitMinDayAmount", typ: 0 },
      { json: "purchaseLimitMaxDayAmount", js: "purchaseLimitMaxDayAmount", typ: 0 },
      { json: "purchaseLimitMinWeekAmount", js: "purchaseLimitMinWeekAmount", typ: 0 },
      { json: "purchaseLimitMaxWeekAmount", js: "purchaseLimitMaxWeekAmount", typ: 0 },
      { json: "purchaseLimitMinMonthAmount", js: "purchaseLimitMinMonthAmount", typ: 0 },
      { json: "purchaseLimitMaxMonthAmount", js: "purchaseLimitMaxMonthAmount", typ: 0 },
      { json: "activityReminderValue", js: "activityReminderValue", typ: null },
      { json: "purchaseLimitPeriod", js: "purchaseLimitPeriod", typ: null },
      { json: "purchaseLimitValue", js: "purchaseLimitValue", typ: null },
      { json: "selfExclusionValue", js: "selfExclusionValue", typ: null },
    ],
    false
  ),
  RewardInfo: o(
    [
      { json: "currentReward", js: "currentReward", typ: 0 },
      { json: "nextReward", js: "nextReward", typ: 0 },
      { json: "availableAfterDateTime", js: "availableAfterDateTime", typ: Date },
    ],
    false
  ),
  Settings: o(
    [
      { json: "system_notify", js: "systemNotify", typ: true },
      { json: "sms_notify", js: "smsNotify", typ: true },
      { json: "push_msg", js: "pushMsg", typ: true },
      { json: "email_notify", js: "emailNotify", typ: true },
    ],
    false
  ),
};
