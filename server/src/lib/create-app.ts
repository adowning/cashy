import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { Session } from "better-auth";

import type { AppApi } from "./types";

import notFound from "../middlewares/not-found";
import onError from "../middlewares/on-error";
import { auth } from "./auth";
import { BASE_PATH } from "./constans";
import createRouter from "./create-router";
import isAuthenticated from "../middlewares/is-authenticated";
import { Server } from "bun";
import { User } from "shared";

// eslint-disable-next-line node/no-process-env
const allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS || "[]");

type HonoEnv = {
  Bindings: {
    serverInstance?: Server; // Make serverInstance known to Hono's Env
  };
  Variables: {
    user: Partial<User> | null;
    session: Session | null;
    serverInstance?: Server; // Make serverInstance known for c.set/c.get
  };
};
// c
export default function createApp() {
  const app = createRouter()
    .use("*", serveStatic({ root: "./public" }))
    .use("*", logger())
    .use(async (c, next) => {
      console.log("here1");

      if (c.req.path.startsWith(BASE_PATH)) {
        return await next();
      }

      return serveStatic({ path: "./public" })(c, next);
    })

    .basePath(BASE_PATH) as AppApi;

  app
    .use(
      "*",
      logger(),
      cors({
        origin: allowedOrigins,
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        maxAge: 600,
        credentials: true,
      }),
      async (c, next) => {
        console.log("here");
        const session = await auth.api.getSession({
          headers: c.req.raw.headers,
        });

        if (!session) {
          c.set("user", null);
          c.set("session", null);
          return next();
        }
        c.set("user", session.user);
        c.set("session", session.session);
        return next();
      }
    )
    .on(["POST", "GET"], "/auth/*", (c) => {
      return auth.handler(c.req.raw);
    })
    .use(isAuthenticated);

  app.notFound(notFound).onError(onError);

  return app;
}
