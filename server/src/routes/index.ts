import type { AppApi } from "../lib/types";

import { BASE_PATH } from "../lib/constans";
import createRouter from "../lib/create-router";
import healthRoute from "./health.route";
import userRoute from "./user.route";
import depositRoute from "./deposit.route";
import currencyRoute from "./currency.route";
import vipRoute from "./vip.route";
import gameRoute from "./game.route";
import authRoute from "./auth.route";

export function registerRoutes(app: AppApi) {
  // return [app.route("/", healthRoute), app.route("/", userRoute)];
  return app
    .route("/", authRoute)
    .route("/", userRoute)
    .route("/", depositRoute)
    .route("/", currencyRoute)
    .route("/", vipRoute)
    .route("/", gameRoute)
    .route("/", healthRoute);
}

// stand alone router type used for api client
export const router = registerRoutes(createRouter().basePath(BASE_PATH));
// eslint-disable-next-line ts/no-redeclare
export type router = typeof router;
