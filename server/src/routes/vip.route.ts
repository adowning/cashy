import { OK } from "stoker/http-status-codes";

import createRouter from "../lib/create-router";
import { NETWORK_CONFIG } from "shared";
import { getVipInfo, getVipLevels, getVipLevelAward } from "../services/vip.service";

const router = createRouter();
router.get(NETWORK_CONFIG.VIP_INFO.USER_VIP_INFO, async (c) => {
  return await getVipInfo();
});
router.get(NETWORK_CONFIG.VIP_INFO.USER_VIP_LEVEL, async (c) => {
  return await getVipLevels();
});
router.get(NETWORK_CONFIG.VIP_INFO.VIP_LEVEL_AWARD, async (c) => {
  return await getVipLevelAward();
});

export default router;
