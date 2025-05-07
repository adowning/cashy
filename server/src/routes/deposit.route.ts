import createRouter from "../lib/create-router";
import { NETWORK_CONFIG } from "shared";
import type { User } from "shared";
import { createDeposit, getDepositHistory, getDepositMethods } from "../services/transactions/deposit";

const router = createRouter();

router.get("/api/deposit/methods", async (c) => {
  const user = c.get("user") as User;
  return await getDepositMethods(c.req, user);
});

router.get("/api/deposit/history", async (c) => {
  const user = c.get("user") as User;
  return await getDepositHistory(c.req, user);
});

router.post("/api/deposit/create", async (c) => {
  const user = c.get("user") as User;
  return await createDeposit(c.req, user);
});

export default router;
