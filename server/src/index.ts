import type { Server, ErrorLike } from "bun"; // Import Bun's Server type and Errorlike
import { WebSocketRouter } from "./routes/router"; // Import your custom router
import { MyWebSocketData } from "./websocket"; // Adjust import path if needed
import { auth } from "./lib/auth";
import { chatRouter } from "./routes/chat";
import { registerRoutes } from "./routes";
import createApp from "./lib/create-app";

const ws = new WebSocketRouter<Record<string, unknown>>();
ws.addRoutes(chatRouter);
const app = createApp();
registerRoutes(app);

type AdditionalWsData = Omit<MyWebSocketData, "clientId">;
const wsRouter = new WebSocketRouter<AdditionalWsData>();

// --- Define Open/Close Handlers ---
wsRouter.onOpen(({ ws, send }) => {
  console.log(`[WS Router] Client connected: ${ws.data.clientId}, User: ${ws.data.userId}`);
  // Example: Send a welcome message
  // import { WelcomeMessageSchema } from './schema';
  // send(WelcomeMessageSchema, { message: `Welcome ${ws.data.userId || 'guest'}!` });
});

wsRouter.onClose(({ ws, code, reason }) => {
  console.log(
    `[WS Router] Client disconnected: ${ws.data.clientId}, User: ${ws.data.userId}, Code: ${code}, Reason: ${reason}`
  );
  // Perform any necessary cleanup based on ws.data
});

// --- Bun Server Setup ---
const PORT = 6589;

console.log(`Attempting to start server on port ${PORT}...`);

// Pass the type for the *additional* data (excluding clientId) as the first generic argument.
// Pass an empty object type `{}` as the second generic argument to satisfy the type signature.
const server = Bun.serve<AdditionalWsData, {}>({
  // Corrected: Added second type argument {}
  port: PORT,
  hostname: "0.0.0.0", // Listen on all interfaces

  routes: {
    "/ws": async (req) => {
      const cookies = new Bun.CookieMap(req.headers.get("cookie")!);
      const token = cookies.get("token");
      console.log(req.headers);
      const email = "xxx@asdfasdf.com";
      const password = "asdfasdf";
      // const signUpResponse = (await auth.api.signUpEmail({
      //   body: {
      //     id: "",
      //     email,
      //     password,
      //     name: "Test User",
      //     emailVerified: true,
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //     username: "testuser",
      //     totalXp: 0,
      //     balance: 0,
      //     isVerified: false,
      //     active: true,
      //     lastLogin: new Date(),
      //     verificationToken: "",
      //     avatar: "",
      //     activeProfileId: "",
      //     gender: "BOY",
      //     status: "ACTIVE",
      //     cashtag: "",
      //     phpId: 0,
      //     accessToken: "",
      //     twoFactorEnabled: false,
      //     banned: false,
      //     banReason: "",
      //     banExpires: new Date(),
      //     lastDailySpin: new Date(),
      //     image: "",
      //   },
      // })) as { token: string; user: User };
      // const signInWithEmail = await auth.api.signInEmail({ body: { email, password } });
      // console.log(signInWithEmail);
      // signUpResponse.token;
      // req.headers.token = token;
      // console.log(req.headers);
      //
      const session = await auth.api.getSession({
        headers: req.headers,
      });
      console.log(" ses ", session);
      console.log(" ses ", session?.user);
      // const wsContextData: AdditionalWsData = {
      //   userId: session?.user.id,
      //   roomId: session?.user.id,
      //   clientId: session?.user.id,
      // };

      // Attempt to upgrade using Bun's native server.upgrade
      // Pass the prepared context data. Bun combines this with a generated clientId
      // and makes the combined object available as ws.data in the WebSocketHandler.
      // const success = server.upgrade(req, {
      //   data: wsContextData,
      //   // headers: new Headers({ 'X-WebSocket-Server': 'Bun-Native-With-Router' }) // Optional headers
      // });
      return ws.upgrade(req, {
        server,
        data: {
          userId: session?.user.id,
          roomId: session?.user.id,
          clientId: session?.user.id as string,
        },
      }); // Return the WebSocketHandler
      // return Response.json(session);
    },
  },
  fetch(req: Request, server: Server): Response | Promise<Response> | undefined {
    const url = new URL(req.url);

    //   // --- WebSocket Upgrade Logic ---
    //   if (url.pathname === "/wsx") {
    //     console.log(`[Bun Fetch] Received request for WebSocket upgrade at ${url.pathname}`);
    //     // const tags = c.req.queries("tags");
    //     const cookies = new Bun.CookieMap(req.headers.get("cookie")!);
    //     const token = cookies.get("token");
    //     // console.log(token);
    //     // const session = await auth.api.getSession({
    //     //   headers: req.headers,
    //     // });
    //     // --- Authentication/Context Preparation ---
    //     const userId = url.searchParams.get("userId");
    //     const roomId = url.searchParams.get("roomId") || "default_room";
    //     // TODO: Implement proper authentication (e.g., check Authorization header, cookies)

    //     if (!userId) {
    //       console.log("[Bun Fetch] WebSocket upgrade denied: Missing userId query param.");
    //       return new Response("userId query parameter is required for WebSocket connection", { status: 400 });
    //     }
    //     // --- End Authentication/Context ---

    //     // Prepare the *additional* context data (the part defined by AdditionalWsData)
    //     const wsContextData: AdditionalWsData = {
    //       userId: userId,
    //       roomId: roomId,
    //     };

    //     // Attempt to upgrade using Bun's native server.upgrade
    //     // Pass the prepared context data. Bun combines this with a generated clientId
    //     // and makes the combined object available as ws.data in the WebSocketHandler.
    //     const success = server.upgrade(req, {
    //       data: wsContextData,
    //       // headers: new Headers({ 'X-WebSocket-Server': 'Bun-Native-With-Router' }) // Optional headers
    //     });

    //     if (success) {
    //       console.log(`[Bun Fetch] WebSocket upgrade successful for userId: ${userId}`);
    //       return undefined; // Signal Bun to handle the 101 response
    //     } else {
    //       console.error("[Bun Fetch] WebSocket upgrade failed (server.upgrade returned false).");
    //       return new Response("WebSocket upgrade failed", { status: 400 });
    //     }
    //   }
    //   // --- End WebSocket Upgrade Logic ---

    //   // --- HTTP Request Handling via Hono ---
    //   console.log(`[Bun Fetch] Passing request to Hono: ${req.method} ${url.pathname}`);
    //   // Pass the server instance in the environment object for Hono context
    const honoEnv = { serverInstance: server };
    return app.fetch(req, honoEnv);
    //   // --- End HTTP Request Handling ---
  },

  /**
   * Assign the WebSocket handlers generated by our custom router instance.
   */
  websocket: wsRouter.websocket,

  /**
   * Error handling for the Bun server itself.
   * Corrected return type to satisfy Bun's expected signature.
   */
  error(error: ErrorLike): void | Response | Promise<void> | Promise<Response> {
    console.error("[Bun Server Error]", error);
    // Returning a Response:
    return Promise.resolve(new Response(`Server error: ${error.message || "Unknown error"}`, { status: 500 }));
  },
});

console.log(`🚀 Server listening on http://${server.hostname}:${server.port}`);

// Optional: Graceful shutdown handling
process.on("SIGINT", () => {
  console.log("\nReceived SIGINT. Shutting down server...");
  server.stop(true); // true = close existing connections gracefully
  console.log("Server stopped.");
  process.exit(0);
});
