export type UserVipRank = {
  data: Data
}

export type Data = {
  vipRank: DataVipRank
}

export type DataVipRank = {
  color: string
  image: string
  title: string
  rankLevel: number
  description: string
}

export type User = {
  id: string
  phpid: null
  username: string
  email: string
  vipRank: UserVipRank
  age: null
  gender: string
  location: null
  accessToken: string
  password: string
  avatar: string
  isAnonymous: boolean
  dateOfBirth: Date
  phone: string
  status: string
  twoFactorEnabled: boolean
  emailVerified: boolean
  lastLogin: null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  socketID: string
  isOnline: boolean
  cashtag: string
  isStaff: boolean
  currentSessionID: string
  activeProfileID: string
  stats: string
  lastDailySpin: Date
  vipRankLevel: number
  vipInfo: VipInfo
  balance: number
  vipPoints: number
  countBalance: number
  currency: string
  isExcluded: boolean
  isActive: boolean
  faceVerificationTime: Date
  address: number
  totalCashOut: number
  totalSpins: number
  totalCashIn: number
  totalWon: number
  totalBet: number
  totalBonusWon: number
  rtp: number
  profileType: string
  limits: any[]
  xp: number
  rakeback: string
  mute: boolean
  ban: boolean
  verifiedAt: Date
  userID: string
  shopID: string
  ownerID: string
  activeUserID: string
  phpShopID: null
  purchases: any[]
  isAuthorized: boolean
}

export interface LiveWinItem {
  image: any
  level: number
  game_name: string
  betting_amount: number | string
}
export interface GetInvitaionBonusData {
  id: string
  content: string
  cash: string
}

export interface GetBettingCommissionData {
  id: string
  content: string
  cash: string
}

export interface StatisticsItem {
  today_deposited_user: number
  yesterday_deposited_user: number
  today_revenue: number
  yesterday_revenue: number
  this_month_deposited_user: number
  this_month_revenue: number
  total_registered_user: number
  total_depositing_user: number
  total_revenue: number
}
export interface AchievementItem {
  index: number
  num: number
  award: number
  state: number
  rate: number
}

export interface ExplainItem {
  index: number
  num: number
  award: number
  status: number
  rate: number
}

// export type GetAchievementResponse = {
//   code: number
//   data: GetAchievementItem
//   message: string
// }

// AppBar interfaces
export interface GetUserData {
  id: string
  avatar: string
  name: string
  grade_level: string
  grade: string
  wallet: number | string
  currency: string
}

// Banner interfaces
export interface GetBannerList {
  id: string
  image_path: string
  icon_path: string
  click_feedback: number
  content: string
}

export interface GetBannerListResponse {
  code: number
  data: Array<GetBannerList>
  msg: string
}

// Bonus interfaces
export interface GetBonusData {
  type: string
  rate: number
  currentCash: string
  totalCash: string
  restCash: string
  bonusCash: string
  expireDate: string
}

export interface BonusItem {
  type: number
  status: number
  now: string
  max: string
  ended_at: number
  created_at: number
  gain_amount: string
  currency: string
  receive: number
  wager: number
  rate: number
  deposit: string
  id: string | number
  children: any
}

export interface GetBonusList {
  list: Array<BonusItem>
}

export type GetUserBonusResponse = {
  code: number
  data: GetBonusList
  message: string
}

// Chat interfaces
export interface ChatRequestData {
  type: string
  avatar: string
  grade: string
  gradeColor: string
  gradeBackground: string
  sender: string
  receiver: string
  message: string
  starLevel: Array<string>
}

// Currency interfaces
export interface GetCurrencyBalanceList {
  amount: string
  availabe_balance: string
  real: string
  bonus: string
  currency: string
}

export interface GetCurrencyBalanceListResponse {
  code: number
  data: Array<GetCurrencyBalanceList>
  message: string
}

// Deposit interfaces
export interface GetCurrencyItem {
  icon: string
  name: string
  value: number
}

export interface GetPaymentItem {
  id: string
  icon: string
  name: string
  description: string
  min: string | number
  max: string | number
}

export interface GetPixInfo {
  id: string
  first_name: string
  last_name: string
}

export interface GetDepositResponse {
  code: number
  data: any
  message: string
}

export interface DepositItem {
  id_number: string
  first_name: string
  last_name: string
  channels_id: string
  amount: string | number
}

export interface DepositHistoryItem {
  id: number
  created_at: number
  type: string
  amount: string
  status: number
  note: string
  currency: string
}

export interface DepositHistoryResponse {
  total_pages: number
  record: Array<DepositHistoryItem>
}

export interface SubmitDepositResponse {
  code: number
  data: any
  message: string
}

export type GetDepositHistoryResponse = {
  code: number
  data: DepositHistoryResponse
  message: string
}

// Game interfaces
export interface Category {
  image: string
  pictures: string
  game_count: string | number
  name: string
  slug: string
  games: Array<Search>
  page_no: number
}

export interface Search {
  id: number
  name: string
  image: string
  provider: string
  is_demo: boolean
}

export interface GameItem {
  id: number
  name: string
  image: string
  provider: string
  producer: string
  is_demo: boolean
}

export interface GameEnterBody {
  id: string | Array<string>
  demo: boolean
}

export interface GameUserBody {
  game_categories_slug: string
  page: number
  limit: number
}

export interface GameEnterResponse {
  method: string
  parames: string
  provider: string
  reserve: string
  weburl: string
}

export interface GameHistoryItem {
  name: string
  created_at: number
  amount: string | number
  multiplier: string | number
  bet_id: string | number
  status: string | number
  profit: number
}

export interface GameBigWinItem {
  game_id: string
  game_name: string
  game_icon: string
  user_name: string
  user_vip_group: number
  user_vip_level: number
  bet_amount: string
  multiplier: string
  win_amount: string
  time: number
}

export interface GameBigWinData {
  high_rollers: Array<GameBigWinItem>
  lucky_bets: Array<GameBigWinItem>
}

export interface GameHistoryResponse {
  total_pages: number
  record: Array<GameHistoryItem>
}

export interface GameSearchResponse {
  list: Array<Search>
  total: number
}

export type GetGameFavoriteListResponse = {
  code: number
  data: Array<number | string>
  message: string
}

export type GetGameBigWinResponse = {
  code: number
  data: GameBigWinData
  message: string
}

export type GetGameCategoriesResponse = {
  code: number
  data: Array<Category>
  messsage: string
}

export type GetGameSearchResponse = {
  code: number
  data: GameSearchResponse
  message: string
}

export type GetGameEnterResponse = {
  code: number
  data: GameEnterResponse
  message: string
}

export type GetGameHistoryResponse = {
  code: number
  data: GameHistoryResponse
  message: string
}

// Invite interfaces
export interface InviteData {
  bonus_month: number | string
  bonus_today: number | string
  bonus_total: number | string
  bonus_yesterdays: number | string
  deposit_users: number | string
  deposit_users_month: number | string
  deposit_users_today: number | string
  deposit_users_yesterdays: number | string
  invite_code: string
  invited_users: number | string
  web_invite_url: string
  available_bonus: string | number
}

export interface InviteHistoryFormData {
  index: number
  size: number
  first_time: string | number
  last_time: string | number
}

export interface InviteHistoryData {
  total_pages: number
  list: Array<InviteHistoryItem>
}

export interface InviteHistoryItem {
  time: number | string
  user: string
  bonus: number | string
}

export interface StatisticsData {
  today_profit: StatisticsItem
  week_profit: StatisticsItem
  month_profit: StatisticsItem
  receive_profit: number | string
}

export interface StatisticsItem {
  register_user: Array<number | string>
  deposit_user: Array<number | string>
  deposit_bonus: number | string
  deposit_amount: Array<number | string>
  bet_amount: Array<number | string>
  bet_bonus: Array<number | string>
  achievement_award: number | string
}

export interface PersonalInvitationInformation {
  total_profit: string | number
  invitation_bonus: string | number
  bettion_commission: string | number
  achievement_bonus: string | number
  deposited_users: string | number
  profit_today: {
    profit: string | number
    bettion_commission: string | number
    invite_bonus: string | number
  }
  profit_week: {
    profit: string | number
    bettion_commission: string | number
    invite_bonus: string | number
  }
  profit_month: {
    profit: string | number
    bettion_commission: string | number
    invite_bonus: string | number
  }
}

export interface InviteHistoryConfig {
  list: Array<any>
}

export type GetStatisticsResponse = {
  code: number
  data: StatisticsData
  message: string
}

export type InviteHistoryResponse = {
  code: number
  data: InviteHistoryData
  message: string
}

export interface GetInviteResponse {
  code: number
  data: InviteData
  message: string
}

export interface GetInviteSelfResponse {
  code: number
  data: PersonalInvitationInformation
  message: string
}

export interface GetInviteHistoryResponse {
  code: number
  data: InviteHistoryConfig
  message: string
}

// Mail interfaces
export interface GetMailData {
  id: number
  icon: any
  offset: number
  mail_content_1: {
    color: string
    content: string
  }
  mail_content_2: {
    color: string
    content: string
  }
  mail_rail_1: {
    color: string
    content: string
  }
  mail_rail_2: {
    color: string
    content: string
  }
}

// NavBar interfaces
export interface GetGameOriginalData {
  icon: string
  name: string
}

// Promo interfaces
export interface PromoData {
  group_id: number
  group_name: string
  list_data: Array<PromoListData>
}

export interface PromoListData {
  id: number
  name: string
  image_path: string
  text: string
  desc: string
  countdown: boolean
  content: string
  click_feedback: number
  button_path: string
  button_text: string
}

export interface PromoGroupData {
  group_data: Array<PromoData>
}

export type GetPromoListResponse = {
  code: number | string
  data: PromoGroupData
  message: string
}

// Reward interfaces
export interface GetRewardCenterList {
  achievement: string
  achievement_status: number
  cash_back: string
  week: string
  level_up_num: number
}

export interface GetRewardCenterListResponse {
  code: number
  data: GetRewardCenterList
  message: string
}

export interface GetBonusResponse {
  code: number
  data: any
  message: string
}

// Signin interfaces
export interface SigninRequestData {
  username: string
  password: string
}
export interface authRequestData {}
export type GetSigninResponseData = {
  code: number
  token: string
  message: string
  user: User
}

// Signup interfaces
export interface SignupRequestData {
  username: string
  password: string
  referral_code: string
  browser: string
  device: string
  model: string
  brand: string
  imei: string
}

export type GetSignupResponseData = {
  code: number
  token: string
  message: string
}

// Socket interfaces
export interface GetUserBalance {
  bal: string | number
  cur: string
  mt: number
}

// Transaction interfaces
export interface TransactionHistoryItem {
  id: string
  created_at: number
  status: string
  type: number
  note: string
  amount: number
  balance: number
}

export interface TransactionHistoryResponse {
  total_pages: number
  record: Array<TransactionHistoryItem>
}

export type GetTransactionHistoryResponse = {
  code: number
  data: TransactionHistoryResponse
  message: string
}

// User interfaces
export interface GetUserInfo {
  uid: string
  name: string
  avatar: string
  first_name: string
  last_name: string
  id: number | string
  id_number: string
  email: string
  email_confirmd: false
  phone: string
  phone_confirmd: false
  date_of_birth: string
  county: string
  state: string
  city: string
  address: string
  postal_code: string
  language: string
  locale: string
  initial_profile_complete: false
  is_supended: 0
  sys_communications: false
  locked_personal_info_fields: Array<string>
  create_at: number
}
export interface GetUserAmount {
  amount: number
  currency: {
    fiat: true
    name: string
    symbol: string
    type: string
  }
  withdraw: 111111
  rate: 1000
}
export interface UpdateEmail {
  email: string
  password: string
}
export interface UpdatePassword {
  now_password: string
  new_password: string
}
export interface GetUserBalance {
  amount: number
  currency: string
  availabe_balance: number
  real: number | string
  bonus: number | string
}
export interface UpdateSuspendUser {
  time: number
}
export type GetUserInfoResponseData = {
  code: number
  data: GetUserInfo
  message: string
}
export type GetUserBalanceResponseData = {
  code: number
  data: GetUserBalance
  message: string
}
export type GetUserEmailVerifyResponseData = {
  code: number
  time: number
  message: string
}
export type GetUserAmountResponseData = {
  code: number
  data: GetUserAmount
  message: string
}

// VIP interfaces
export interface GetVIPData {
  id: number
  totalDepositAmount: number
  currentDepositAmount: number
  totalWagerAmount: number
  currentWagerAmount: number
  vipGrade: string
  vipRate: number
}

export interface GetSpinData {
  id: number
  image: any
  title: string
  content: string
}

export interface GetRouletteHistory {
  id: number
  rouletteTime: string
  user: string
  rouletteResult: string
}

export interface VipInfo {
  level: number
  deposit_exp: number
  bet_exp: number
  rank_bet_exp: number
  rank_deposit_exp: number
  free_spin_times: number
  week_gift: number
  month_gift: number
  upgrade_gift: number
  now_cash_back: number
  yesterday_cash_back: number
  history_cash_back: number
}

export interface VipLevel {
  level: number
  rank_id: number
  protection_conditions: number
  deposit_exp: number
  bet_exp: number
  free_spins_times: number
  uprank_award: number
  week_award: number
  withdrawals_amonut: number
  withdrawal_times: number
  month_withdrawals_amount: number
  month_withdrawals_times: number
  month_award: number
  free_withdrawals: number
  free_withdrawals_times: number
  withdrawal_fee: number
  bet_award_rate: any
  signin_award: Array<any>
  tasks_max: number
  deposit_rate: number
  bet_rate: number
  availabe_daily_bonus_time: string
  collectable_week_bonus_day: string | number
  collectable_month_bonus_day: string | number
}

export interface VipTaskItem {
  index: number
  task_id: number
  task_type: number
  task_terms: {
    terms_id: number
    deposit: number
    bet: number
    game_type: string
    game_tag: string
    times: number
    multiplier: number
    game_win: number
  }
  state: number
  award: number
}

export interface VipRebateHistoryItem {
  notes_id: string | number
  created_at: string | number
  amount: string | number
  cash_back: string | number
  vip_level: string | number
  vip_rate: string | number
  game_type: string
}

export interface VipRebateHistoryData {
  total: number
  list: Array<VipRebateHistoryItem>
}

export interface VipRebateHistoryRequest {
  page_num: number
  page_size: number
  start_time: number
}

export interface VipLevelRewardHistoryItem {
  notes_id: string | number
  created_at: string | number
  amount: string | number
  vip_level: string | number
  type: string
}

export interface VipLevelRewardHistoryData {
  total: number
  list: Array<VipLevelRewardHistoryItem>
}

export interface VipLevelRewardHistoryRequest {
  page_num: number
  page_size: number
  start_time: number
}

export interface VipTimesHistoryItem {
  notes_id: string | number
  created_at: string | number
  amount: string | number
  vip_level: string | number
  type: string
}

export interface VipTimesHistoryData {
  total: number
  list: Array<VipTimesHistoryItem>
}

export interface VipTimesHistoryRequest {
  index: number
  page_num: number
  page_size: number
  start_time: number
}

export interface VipSignInData {
  award: Array<string | number>
  signin_day: number
  is_signin: number
  limited_bet: number
  limited_deposit: number
  vip_level: number
}

export interface VipLevelUpListData {
  level: number
  upgreadegift: number
  upgrade_award: number
}

export interface VipLevelUpReceiveData {
  win_award: number
  lose_award: Array<number>
}
export interface LiveWinItem {
  image: any
  level: number
  game_name: string
  betting_amount: number | string
}
export interface GetInvitaionBonusData {
  id: string
  content: string
  cash: string
}

export interface GetBettingCommissionData {
  id: string
  content: string
  cash: string
}

export interface StatisticsItem {
  today_deposited_user: number
  yesterday_deposited_user: number
  today_revenue: number
  yesterday_revenue: number
  this_month_deposited_user: number
  this_month_revenue: number
  total_registered_user: number
  total_depositing_user: number
  total_revenue: number
}
export interface GetWithdrawResponse {
  code: number
  data: any
  message: string
}

export interface WithdrawItem {
  id_number: string
  first_name: string
  last_name: string
  channels_id: string
  amount: string | number
}
export interface WithdrawalHistoryItem {
  id: number
  created_at: number
  type: string
  note: string
  status: number
  amount: string
  currency_type: string
  currency: string
}
export interface WithdrawalHistoryResponse {
  total_pages: number
  record: Array<WithdrawalHistoryItem>
}

export interface SubmitWithdrawResponse {
  code: number
  data: any
  message: string
}

export type GetWithdrawalHistoryResponse = {
  code: number
  data: WithdrawalHistoryResponse
  message: string
}
