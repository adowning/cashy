import createRouter from "../lib/create-router";
import { NETWORK_CONFIG } from "shared";
import { getCurrencyList } from "../services/currency.service";
import type { User } from "shared";

const router = createRouter();
router.get(NETWORK_CONFIG.CURRENCY.CURRENCY_LIST, async (c) => {
  const user = c.get("user") as User;
  return await getCurrencyList(c.req.raw, user);
});

export default router;
