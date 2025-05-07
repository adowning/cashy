import createRouter from "../lib/create-router";
import { NETWORK_CONFIG } from "shared";
import { login, register, me } from "../services/auth.service";

const router = createRouter();
router.get(NETWORK_CONFIG.LOGIN.LOGIN, async (c) => {
  return await login(c.req);
});
router.get(NETWORK_CONFIG.LOGIN.REGISTER, async (c) => {
  return await register(c.req);
});
router.get(NETWORK_CONFIG.LOGIN.ME, async (c) => {
  console.log("asdf");
  return await me(c.req, c.get("user")!);
});

export default router;
