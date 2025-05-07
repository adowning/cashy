// src/index.ts
import type { Server, ErrorLike } from "bun"; // Import Bun's Server type and Errorlike
// Assuming your custom router and supporting files are compiled/available
// Adjust paths as necessary based on your build process or project structure
import { WebSocketRouter } from "./routes/router"; // Import your custom router
// Assuming MyWebSocketData is defined in a shared types file or websocket.ts
// It should represent the FULL data structure attached to ws.data, including clientId
// e.g., export type MyWebSocketData = { clientId: string; userId?: string; roomId?: string };
import { MyWebSocketData } from "./websocket"; // Adjust import path if needed
import { auth } from "./lib/auth";
import { chatRouter } from "./routes/chat";
import { registerRoutes } from "./routes";
import createApp from "./lib/create-app";

const ws = new WebSocketRouter<Record<string, unknown>>();
ws.addRoutes(chatRouter);

// // const app = new Hono<HonoEnv>();
const app = createApp();
const routes = registerRoutes(app);

// // Middleware
// app.use("*", logger());
// app.use("*", cors(/* Add your CORS options if needed */));
// app.use("*", async (c, next) => {
//   // Make server instance available via c.get() in route handlers
//   c.set("serverInstance", c.env.serverInstance);
//   await next();
// });
// app
//   .use(
//     "*",
//     logger(),
//     cors({
//       origin: allowedOrigins,
//       allowHeaders: ["Content-Type", "Authorization"],
//       allowMethods: ["GET", "POST", "PUT", "DELETE"],
//       maxAge: 600,
//       credentials: true,
//     }),
//     async (c, next) => {
//       const session = await auth.api.getSession({
//         headers: c.req.raw.headers,
//       });

//       if (!session) {
//         c.set("user", null);
//         c.set("session", null);
//         return next();
//       }

//       // Ensure the user object matches our User interface
//       const typedUser: Partial<User> = {
//         ...session.user,
//         username: session.user.username || "",
//         totalXp: session.user.totalXp || 0,
//         balance: session.user.balance || 0,
//         isVerified: session.user.isVerified || false,
//         active: session.user.active ?? true,
//         lastLogin: session.user.lastLogin || null,
//         verificationToken: session.user.verificationToken || null,
//         avatar: session.user.avatar || null,
//         activeProfileId: session.user.activeProfileId || null,
//         gender: session.user.gender || null,
//         status: session.user.status || null,
//         cashtag: session.user.cashtag || null,
//         phpId: session.user.phpId || null,
//         accessToken: session.user.accessToken || null,
//         twoFactorEnabled: session.user.twoFactorEnabled || false,
//         banned: session.user.banned || false,
//         banReason: session.user.banReason || null,
//         banExpires: session.user.banExpires || null,
//         lastDailySpin: session.user.lastDailySpin || null,
//         // activeProfile: session.user.activeProfile,
//         // vipInfo: session.user.vipInfo,
//       };
//       c.set("user", typedUser);
//       c.set("session", session.session);
//       return next();
//     }
//   )
//   .on(["POST", "GET"], "/auth/*", (c) => {
//     return auth.handler(c.req.raw);
//   });
// // --- Define REST API Routes ---
// app.get("/", (c) => c.text("Hono REST API with Custom WebSocket Router is running on Bun!"));

// app.post("/api/broadcast/:roomId", async (c) => {
//   const server = c.get("serverInstance"); // Get server instance set by middleware
//   if (!server) {
//     return c.json({ error: "Server instance not available" }, 500);
//   }
//   const roomId = c.req.param("roomId");
//   let body: { message: string };
//   try {
//     body = await c.req.json<{ message: string }>();
//   } catch (e) {
//     return c.json({ error: "Invalid JSON body" }, 400);
//   }

//   if (!roomId || !body?.message) {
//     return c.json({ error: "Missing roomId or message in body" }, 400);
//   }

//   const messagePayload = JSON.stringify({
//     type: "admin_broadcast", // Define a schema for this if needed
//     room: roomId,
//     message: body.message,
//   });

//   const publishedBytes = server.publish(roomId, messagePayload);
//   console.log(`[REST API] Published ${publishedBytes} bytes to room ${roomId}`);
//   return c.json({ success: true, room: roomId, publishedBytes });
// });

// --- Add your other REST routes here ---
// e.g., app.post('/api/auth/login', ...)

// --- WebSocket Router Setup ---

// Instantiate your custom router.
// Pass the type for the *additional* data you want to store, beyond the clientId managed by the router.
// If MyWebSocketData = { clientId: string, userId?: string, roomId?: string },
// then pass Omit<MyWebSocketData, 'clientId'> which is { userId?: string, roomId?: string }
type AdditionalWsData = Omit<MyWebSocketData, "clientId">;
const wsRouter = new WebSocketRouter<AdditionalWsData>();

// --- Define WebSocket Routes using the Router ---

// --- TODO: Replace examples below with your actual schemas and handlers ---

// Example: GetValuePISchema (assuming no payload)
// import { GetValuePISchema, PiValueResponseSchema } from './schema';
// wsRouter.onMessage(GetValuePISchema, ({ ws, send }) => {
//   console.log(`[WS Router] Handling GetValueOfPI from ${ws.data.clientId}`);
//   // Use the type-safe send function created by the router
//   send(PiValueResponseSchema, { value: Math.PI });
// });

// Example: GetPostByIdSchema (assuming payload { id: string })
// import { GetPostByIdSchema, PostDetailsResponseSchema } from './schema';
// wsRouter.onMessage(GetPostByIdSchema, ({ ws, payload, send }) => {
//   const postId = payload.id; // Access validated payload
//   console.log(`[WS Router] Handling GetPostById from ${ws.data.clientId} for post ${postId}`);
//   // Fetch post data based on postId
//   const postData = { id: postId, title: `Details for Post ${postId}`, content: "..." };
//   send(PostDetailsResponseSchema, postData); // Send validated response
// });

// Example: SubscribeStatsSchema (assuming no payload)
// import { SubscribeStatsSchema, SubscribedResponseSchema } from './schema';
// wsRouter.onMessage(SubscribeStatsSchema, ({ ws, send }) => {
//   const userId = ws.data.userId; // Access context data (userId was added during upgrade)
//   if (userId) {
//       const topic = `statsUpdates_${userId}`;
//       ws.subscribe(topic);
//       console.log(`[WS Router] Subscribed ${userId} (${ws.data.clientId}) to ${topic}`);
//       // Send confirmation using a defined schema
//       send(SubscribedResponseSchema, { topic: topic, success: true });
//   } else {
//      console.warn(`[WS Router] Cannot subscribe stats: userId missing for client ${ws.data.clientId}`);
//      // Optionally send an error back using ErrorMessage schema
//      // send(ErrorMessage, { code: ErrorCode.Enum.AUTHORIZATION_FAILED, message: "User ID not found for subscription." });
//   }
// });

// --- Define Open/Close Handlers ---
wsRouter.onOpen(({ ws, send }) => {
  // send is available here too
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

  /**
   * Handles incoming HTTP requests OR WebSocket upgrade requests.
   */
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
