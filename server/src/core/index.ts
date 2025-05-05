import { ILogger, VerboseLogger, SimpleLogger } from "./verboseLogger";
import ZilaClient from "./ZilaClient";
import { CloseCodes, WSStatus } from "./enums";
import { IWSMessage } from "./IWSMessage";
import type { ZilaWSCallback } from "./ZilaWSCallback";
import { parse as parseCookie } from "cookie"; // Still using the cookie library
import type { ServerWebSocket, TLSOptions, Server } from "bun"; // Import Bun types
import { authRoutes, getUserFromToken } from "../http/auth";
import { staticServe } from "./static";
import { User, CORS_HEADERS } from "shared/";
import { ICookie } from "./ICookie";
import { userRoutes } from "../http/user";
import { currencyRoutes } from "../http/currency";
import { vipRoutes } from "../http/vip";
import { gameRoutes } from "../http/game";
import { withdrawalRoutes } from "../http/transactions/withdraw";
import { handleCashAppWebhook } from "../http/transactions/cashapp.webhook";
import { depositRoutes } from "../http/transactions/deposit";

// Update IServerSettings to use Bun's Headers and potentially TLSOptions
export interface IServerSettings {
  /**
   * The port of the WebSocket server
   */
  port: number;
  /**
   * Set this if you want to secure the connection
   */
  https?: {
    /**
     * The path to the certificate file.
     * Supports: .pem
     */
    pathToCert: string;
    /**
     * The path to the certificate key file.
     * Supports: .pem
     */
    pathToKey: string;
    /**
     * The password which the certificate is encrypted with.
     */
    passphrase?: string;
  };
  /**
   * Enables verbose logging
   */
  verbose?: boolean;
  /**
   * * You can override the server's default *Logger* system by giving this property an [ILogger](https://zilaws.com/docs/server-api/config#logger) interface.
   * If you give set true, the default logging script will be used.
   */
  logger?: boolean | ILogger;
  /**
   * Sets the host for the server
   */
  host?: string;

  /**
   * This event handler gets called before a new WS connection would be created.
   * If you want to add new headers to the upgrade frame's reponse, return them as an array.
   * @param recievedHeaders Bun's Headers object
   * @returns {Array<string>}
   */
  headerEvent?: (recievedHeaders: Headers) => Array<string> | void; // Updated to Bun's Headers

  /**
   * The maximal waiting time for waiters.
   * Defaults to 800ms
   */
  maxWaiterTime?: number;

  /**
   * Custom client class
   */
  clientClass?: new (
    socket: ServerWebSocket<any>, // Updated to Bun's WebSocket type
    ip: string | undefined,
    server: ZilaServer,
    isBrowser: boolean,
    headers: Headers, // Updated to Bun's Headers
    cookies?: Map<string, string>,
    user?: User
  ) => ZilaClient;
}

export interface IServerEvents<T extends ZilaClient> {
  /**
   * Runs every time a client connects.
   * @param socket
   * @returns
   */
  onClientConnect: (socket: T) => void;

  /**
   * Runs every time a client disconnects
   * @param socket
   * @param code
   * @param reason
   * @returns
   */
  onClientDisconnect: (socket: T, code: number, reason: string) => void;

  /**
   * Runs every time after a the server processes a message from the client.
   * @param socket
   * @param eventHandlerName The name of the event handler callback
   * @param message If the message object is instance of T, this param will be T, undefined if not.
   * @returns
   */
  onClientMessage: <T>(socket: T, eventHandlerName: string, messageDataObject: T | undefined) => void;

  /**
   * Runs every time a server recieves a message from the client before any registered callback could run
   * @param socket
   * @param eventHandlerName The name of the event handler callback
   * @param message If the message object is instance of T, this param will be T, undefined if not.
   * @returns
   */
  onClientMessageBeforeCallback: <U>(
    socket: T,
    eventHandlerName: string,
    messageDataObject: U | undefined
  ) => void;

  /**
   * Runs every time a server recieves a message from the client before any registered callback could run.
   * @param socket
   * @param rawMessage Not processed, raw message from the client. (Hopefully JSON)
   * @returns
   */
  onClientRawMessageBeforeCallback: (socket: T, rawMessage: string) => void;

  /**
   * Runs when a client calls `syncCookies`.
   * @param socket socket.cookies contain the newly synced cookies.
   * @param cookiesBeforeSync The cookies before syncing
   * @returns
   */
  onCookieSync: (socket: T, cookiesBeforeSync: Map<string, string>) => void;
}

/**
 * Calculates the bonus amount based on the deposit amount.
 * @param depositAmount The amount deposited.
 * @returns The bonus amount.
 */
function calculateBonus(depositAmount: number): number {
  if (depositAmount >= 500 && depositAmount < 1000) {
    return 50;
  } else if (depositAmount >= 1000) {
    return 100;
  } else {
    return 0;
  }
}

export class ZilaServer<T extends ZilaClient = ZilaClient> {
  // No longer need wss directly, Bun.serve handles it
  // wss: WebSocketServer;
  VerbLog?: ILogger;
  Logger?: ILogger;
  maxWaiterTime = 800;
  server: Server;
  private clientClass: new (
    socket: ServerWebSocket<any>, // Updated to Bun's WebSocket type
    ip: string | undefined,
    server: ZilaServer,
    isBrowser: boolean,
    headers: Headers, // Updated to Bun's Headers
    user: User,
    cookies?: Map<string, string>
  ) => ZilaClient;

  // Bun.serve handles requests directly, no separate baseServer needed
  // private baseServer: ServerHTTP | ServerHTTPS;

  private serverEvents: {
    [K in keyof IServerEvents<T>]?: Array<IServerEvents<T>[K]> | undefined;
  } = {};

  private readonly callbacks: { [id: string]: ZilaWSCallback<ZilaClient> | undefined } = {};

  private readonly bannedIpsAndReasons: Map<string, string | undefined> = new Map();

  private _status: WSStatus = WSStatus.OPENING;

  // headerEvent will be handled within the fetch handler
  private headerEvent: ((recievedHeaders: Headers) => Array<string> | void) | undefined = undefined; // Updated to Bun's Headers

  public get status() {
    return this._status;
  }

  // Clients list needs to be managed manually as Bun.serve doesn't expose a clients list like ws
  private _clients: Array<ZilaClient | T> = [];

  public get clients() {
    return this._clients;
  }

  public readonly settings: IServerSettings;

  // Bun handles fetching natively, no need for node-fetch or manual http requests
  /* istanbul ignore next */
  private async getNewestVersion(): Promise<string> {
    try {
      const response = await fetch("https://registry.npmjs.org/zilaws-server/latest/", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data["version"];
    } catch (error: any) {
      this.Logger?.error(`Failed to fetch latest version: ${error.message}`);
      return "unknown"; // Return a default or indicate failure
    }
  }

  public constructor(settings: IServerSettings) {
    this.settings = settings;
    // hasrequested is not directly applicable with Bun.serve's model
    // this.hasrequested = false;

    // @ts-ignore
    this.clientClass = settings.clientClass ?? ZilaClient;
    if (settings.maxWaiterTime) this.maxWaiterTime = settings.maxWaiterTime;

    if (settings.verbose) {
      this.VerbLog = VerboseLogger;
      this.VerbLog.log(
        "Verbose logging is enabled. WS error codes' documentation: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code"
      );
    }

    if (settings.logger !== undefined) {
      if (typeof settings.logger == "boolean" && settings.logger) {
        this.Logger = SimpleLogger;
      } else if (typeof settings.logger === "object") {
        this.Logger = settings.logger;
      }
    }

    this.Logger?.log("Starting server...");

    this.headerEvent = settings.headerEvent;

    // Configure TLS options for Bun.serve
    let tlsOptions: TLSOptions | undefined = undefined;
    if (settings.https) {
      try {
        // Read certificate and key files using Bun's file API
        const cert = Bun.file(settings.https.pathToCert);
        const key = Bun.file(settings.https.pathToKey);

        // Bun.serve expects certificate and key as Bun.file objects or strings
        tlsOptions = {
          key: key,
          cert: cert,
          passphrase: settings.https.passphrase,
        };
      } catch (error: any) {
        this.Logger?.error(`Failed to load SSL certificates: ${error.message}`);
        // Depending on requirements, you might want to throw an error or exit here
        // For now, we'll log and continue without TLS, which might cause issues
        tlsOptions = undefined;
      }
    }

    // Use Bun.serve to create the server
    this.server = Bun.serve({
      port: settings.port,
      static: staticServe,
      hostname: settings.host,
      tls: tlsOptions, // Apply TLS options
      fetch: async (req: any) => {
        // Handle incoming HTTP requests (including WebSocket upgrade requests)
        // Get client IP address - Bun provides it on the Request object
        console.log("fetch");
        const clientIp =
          req.headers.get("host") ||
          req.headers.get("host")?.split(":") ||
          req.headers.get("X-Forwarded-For") ||
          req.headers.get("CF-Connecting-IP") ||
          req.socketAddress?.address;

        // Check for banned IPs before processing the request
        const [_, reason] = this.bannedIpsAndReasons.get(clientIp ?? "") ?? [undefined, undefined];
        if (reason) {
          // Return a 403 Forbidden response for banned IPs
          return new Response(reason || "Forbidden", { status: 403 });
        }
        // Handle non-browser cookie security threat check
        // Bun's Request headers are a Headers object

        const setCookieHeader = req.headers.get("set-cookie");
        const sTypeHeader = req.headers.get("s-type");

        if (setCookieHeader != undefined && sTypeHeader == "1") {
          this.Logger?.warn(
            `A client with the IP address of ${clientIp[0]} tried to connect while having cookies in its header and a marking for non-browser environment.`
          );
          return new Response("Forbidden", { status: 403 });
        }

        // Handle the headerEvent before upgrading
        const responseHeaders = new Headers();
        if (this.headerEvent) {
          const extraHeaders = this.headerEvent(req.headers);
          if (Array.isArray(extraHeaders)) {
            extraHeaders.forEach((header) => {
              // Assuming extraHeaders are in "Name: Value" format
              const parts = header.split(": ", 2);
              if (parts.length === 2) {
                responseHeaders.append(parts[0], parts[1]);
              }
            });
          }
        }
        if (req.method === "OPTIONS") {
          const res = new Response("Departed", CORS_HEADERS);
          return res;
        }

        // const path = req.url.pathname;
        console.log(req.url);
        let routeResult: any = false;
        let url = req.url.split("?")[0];
        let params = req.url.split("?")[1];
        if (params) console.log("params ", params);
        let route = url.split("/auth")[1];

        if (route) routeResult = await authRoutes(req, `/auth${route}`);
        if (routeResult !== false) return routeResult;

        route = url.split("/user")[1];
        if (route) routeResult = await userRoutes(req, `/user${route}`);
        if (routeResult !== false) return routeResult;
        if (route) routeResult = await vipRoutes(req, `/user${route}`);
        if (routeResult !== false) return routeResult;
        if (route) routeResult = await gameRoutes(req, `/user${route}`, params);
        if (routeResult !== false) return routeResult;
        if (route) routeResult = await depositRoutes(req, `/user${route}`);
        if (routeResult !== false) return routeResult;

        route = url.split("/currency")[1];
        if (route) routeResult = await currencyRoutes(req, `/currency${route}`);
        if (routeResult !== false) return routeResult;
        route = url.split("/games")[1];
        if (route) routeResult = await gameRoutes(req, `/games${route}`, params);
        if (routeResult !== false) return routeResult;
        route = url.split("/withdraw")[1];
        if (route) routeResult = await withdrawalRoutes(req, `/withdraw${route}`);
        if (routeResult !== false) return routeResult;
        console.log(route);
        if (route === undefined) {
          route = url.replace("http://localhost:6589", "");
        }

        // if (route.startsWith("/api/user")) {
        //   // Example path prefix
        //   const route = url.substring("/api/deposit".length); // Extract the specific route part
        //   const depositResponse = await depositRoutes(req, route);
        //   if (depositResponse !== false) {
        //     // depositRoutes returns false if route not handled
        //     return depositResponse;
        //   }
        // }

        // Handle the Cash App webhook route
        if (route === "/webhooks/cashapp" && req.method === "POST") {
          return await handleCashAppWebhook(req as any);
        }
        // if (route === "/user/connect/websocket") this.server.upgrade(req, { data: req });

        // Handle other routes...
        // return new Response("Not Found", { status: 404 });
        // if (req.url.pathname !== "/") {
        //   try {
        //     const filePath = `./public${url.pathname}`;
        //     const file = Bun.file(filePath);
        //     // Check file exists synchronously
        //     if (existsSync(filePath)) {
        //       return new Response(file);
        //     }
        //   } catch (e) {
        //     // Continue to 404
        //   }
        // }
        // Bun automatically handles the WebSocket upgrade if the 'websocket' handler is defined
        // and the request has the correct headers (Upgrade: websocket, Connection: Upgrade, etc.)
        // If it's a WebSocket request, you can handle it as a regular HTTP request.
        // For this ZilaServer, we'll return a 404 for non-WebSocket requests.
        // console.log(req);
        console.log("upgrading websocket");
        this.server.upgrade(req, { data: req });
        return new Response("Not Found", { status: 404, headers: responseHeaders });
      },
      websocket: {
        // Bun's WebSocket handlers
        open: async (ws: ServerWebSocket<any>) => {
          console.log("open");
          const that = this;
          // Client connected via WebSocket
          const req = ws.data as Request; // Access the original request from ws.data
          const clientIp = req.headers.get("host")?.split(":") as [string, string];
          // req.headers.get("host")?.split(":") ||
          // req.headers.get("X-Forwarded-For") ||
          // req.headers.get("CF-Connecting-IP") ||
          // req.socketAddress?.address;

          this.Logger?.log(`A client has connected: ${clientIp[0]}:${clientIp[1]}`);

          // Parse cookies from the request headers
          const cookieHeader = req.headers.get("cookie");
          const cookiesMap = cookieHeader ? new Map(Object.entries(parseCookie(cookieHeader))) : new Map();

          const cookie: ICookie = {
            name: "token",
            value: cookiesMap.get("token"),
            secure: true,
            sameSite: "none",
          };
          const user = await getUserFromToken(cookiesMap.get("token"));
          if (user === null) ws.close(1000, "Unauthorized");
          // console.log(user);
          // Determine if the client is a browser based on the s-type header
          const sTypeHeader = req.headers.get("s-type");
          const isBrowser = sTypeHeader !== "1";

          // Create a new ZilaClient instance
          const ip = clientIp[0] + clientIp[1];
          // console.log(cookiesMap);
          let zilaSocket = new this.clientClass(
            ws, // Pass Bun's WebSocket object
            ip,
            //@ts-ignore
            this.server,
            true,
            req.headers,
            // this, // Pass the ZilaServer instance
            // isBrowser,
            // req.headers, // Pass Bun's Headers object
            user as User,
            cookiesMap // /Pass parsed cookies
          );
          // console.log("cookies: ", zilaSocket.cookies);
          zilaSocket.setCookie(cookie);
          // Store the ZilaSocket instance on the WebSocket object for easy access in other handlers
          ws.data = { zilaSocket: zilaSocket, request: req, remoteAddress: ws.remoteAddress };

          // Add the client to the server's clients list
          this._clients.push(zilaSocket);

          // Trigger the onClientConnect event
          if (this.serverEvents.onClientConnect) {
            console.log("asdf");
            for (const cb of this.serverEvents.onClientConnect) {
              cb(zilaSocket as T);
            }
          }
        },

        message: (ws: ServerWebSocket<any>, message: string | Buffer) => {
          // Message received from a client
          console.log("message");
          const zilaSocket = ws.data.zilaSocket as ZilaClient;
          if (ws.data.req == undefined) ws.data.req = ws.data.request;
          const req = ws.data.req as Request;

          const datastring = typeof message === "string" ? message : message.toString(); // Handle Buffer messages

          if (this.serverEvents.onClientRawMessageBeforeCallback) {
            for (const cb of this.serverEvents.onClientRawMessageBeforeCallback) {
              cb(zilaSocket as T, datastring);
            }
          }

          const clientIp = req.headers.get("host")?.split(":") as [string, string];

          this.VerbLog?.log(`Message recieved: ${clientIp[0]}:${clientIp[1]}\nData:${datastring}`);

          // Process the message
          this.callMessageHandler(zilaSocket, req, datastring);
        },

        close: (ws: ServerWebSocket<any>, code: number, reason: string) => {
          console.log("close");
          // Client disconnected
          const zilaSocket = ws.data.zilaSocket as ZilaClient;
          if (ws.data.req == undefined) ws.data.req = ws.data.request;

          const req = ws.data.req as Request;

          if (req === undefined) console.log(ws.data);
          // Remove the client from the server's clients list
          const clientIndex = this._clients.indexOf(zilaSocket);
          if (clientIndex > -1) {
            this._clients.splice(clientIndex, 1);
          }

          // Trigger the onClientDisconnect event
          if (this.serverEvents.onClientDisconnect) {
            for (const cb of this.serverEvents.onClientDisconnect) {
              cb(zilaSocket as T, code, reason);
            }
          }
          let clientIp;
          if (req !== undefined) clientIp = req.headers.get("host")?.split(":") as [string, string];
          if (this.VerbLog) {
            this.VerbLog.log(
              `A client has been disconnected. IP: ${clientIp[0]}:${clientIp[1]} | Code: ${code} | Reason: ${reason}`
            );
          } else if (this.Logger) {
            this.Logger.log(`A client has been disconnected. IP: ${clientIp[0]}:${clientIp[1]}`);
          }
        },

        // error: (ws: ServerWebSocket<any>, error: Error) => {
        //   // An error occurred with a WebSocket connection
        //   const zilaSocket = ws.data.zilaSocket as ZilaClient;
        //   const req = ws.data.request as Request;
        //   const clientIp = req.headers.get("host")?.split(":") as [string, string];

        //   this.Logger?.error(`An error has occured for client ${clientIp[0]}:${clientIp[1]}: ${error.stack}`);
        //   // The 'close' event will likely follow this error event
        // },

        // Optional: Define other WebSocket options
        // maxMessageSize: 1024 * 1024, // Example: 1MB
        // idleTimeout: 20, // Example: 20 seconds
      },
      // Bun.serve returns a Server object, but we don't need to store it in a baseServer property
      // as all handling is done within the handlers above.
    });
    //createing the dataase listener

    this._status = WSStatus.OPEN;

    this.Logger?.log(
      `Ready for incoming connections on port ${settings.port} with SSL ${
        settings.https ? "enabled" : "disabled"
      }.`
    );

    // Bun.serve doesn't have explicit 'close' or 'error' events on the server object itself
    // Server-wide errors or shutdown will typically be handled by Bun's process management.
    // You might add process signal listeners (SIGINT, SIGTERM) for graceful shutdown.
    process.on("SIGINT", async () => {
      this.Logger?.log("SIGINT received, shutting down gracefully...");
      this.stopServerAsync("Server shutting down");
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      this.Logger?.log("SIGTERM received, shutting down gracefully...");
      this.stopServerAsync("Server shutting down");
      process.exit(0);
    });
  }

  async stopServerAsync(message: string) {
    this._status = WSStatus.CLOSED;
    this.Logger?.log(message);
    // Close all WebSocket connections
    for (const client of this.clients) {
      client.socket.close(1001, message); // 1001: Going Away
    }

    // Wait for a short time to allow clients to disconnect
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Stop the server
    this.server.unref();
    this._status = WSStatus.CLOSED;
    this.Logger?.log("Server has been stopped.");
  }

  /**
   * Calls the given callback if the client recieves a request for it from the server.
   * @param {ZilaClient} socket The ZilaClient instance associated with the message
   * @param {Request} req The original Bun Request object
   * @param {string} msg The raw websocket message string
   */
  private callMessageHandler(socket: ZilaClient, req: Request, msg: string) {
    let msgObj: IWSMessage;
    try {
      msgObj = JSON.parse(msg) as IWSMessage;
    } catch (e) {
      const clientIp = req.headers.get("host")?.split(":") as [string, number];
      // req.headers.get("X-Forwarded-For") ||
      // req.headers.get("CF-Connecting-IP");
      //req.socketAddress?.address;
      this.Logger?.warn(`Bad Message from ${clientIp[0]}:${clientIp[1]}. Error: ${e}`);
      // Optionally close the connection for a bad message
      socket.socket.close(CloseCodes.BAD_MESSAGE, "Bad Message Format");
      return;
    }

    /* istanbul ignore next */
    if (msgObj.identifier && msgObj.identifier[0] != "@") {
      // Inner event
      if (msgObj.identifier == "SyncCookies") {
        if (
          msgObj.message !== undefined &&
          msgObj.message !== null &&
          typeof msgObj.message == "object" &&
          Object.hasOwn(msgObj.message, "length") &&
          typeof msgObj.message[0] === "string" // Ensure the message content is a string (the cookie header)
        ) {
          try {
            let beforeCookies: Map<string, string> | undefined;
            if (this.serverEvents.onCookieSync && this.serverEvents.onCookieSync.length > 0) {
              // Clone the cookies map before syncing if there are listeners
              beforeCookies = new Map(socket.cookies);
            }
            console.log("cookie msg ", msgObj.message[0]);
            // Parse the cookie string received from the client
            const parsedCookies = parseCookie(msgObj.message[0]);
            console.log("synced cookies ", parsedCookies);
            try {
              // Filter out undefined values before storing
              const syncedCookies = Object.fromEntries(
                Object.entries(parsedCookies).filter(([_, v]) => v !== undefined)
              ) as Record<string, string>;
              ZilaClient.StoreSyncedCookies(socket, syncedCookies);
            } catch (e) {
              console.log("error syncing cookies ", parsedCookies);
            }
            if (beforeCookies) {
              for (const cb of this.serverEvents.onCookieSync!) {
                cb(socket as T, beforeCookies);
              }
            }
          } catch (e) {
            const clientIp = req.headers.get("host")?.split(":") as [string, string];
            this.Logger?.warn(`Bad Cookie Sync Message from ${clientIp[0]}:${clientIp[1]}. Error: ${e}`);
            // Optionally close the connection for a bad message
            socket.socket.close(CloseCodes.BAD_MESSAGE, "Bad Cookie Sync Message");
          }
        } else {
          const clientIp =
            req.headers.get("host")?.split(":") ||
            req.headers.get("X-Forwarded-For") ||
            req.headers.get("CF-Connecting-IP") ||
            socket.socket.remoteAddress;
          this.Logger?.warn(`Invalid SyncCookies message format from ${clientIp[0]}:${clientIp[1]}`);
          // Optionally close the connection for a bad message
          socket.socket.close(CloseCodes.BAD_MESSAGE, "Invalid SyncCookies message format");
        }
      }

      return; // Stop processing if it's a built-in message that's been handled
    }

    // Process custom message handlers if the identifier starts with "@" (after slicing)
    if (msgObj.identifier && msgObj.identifier[0] === "@") {
      msgObj.identifier = msgObj.identifier.slice(1);
    } else {
      // If identifier doesn't start with "@" and wasn't a recognized built-in, treat as bad message
      const clientIp = req.headers.get("host")?.split(":") as [string, string];
      //req.socketAddress?.address;
      this.Logger?.warn(
        `Unrecognized message identifier format from ${clientIp[0]}:${clientIp[1]}: ${msgObj.identifier}`
      );
      socket.socket.close(CloseCodes.BAD_MESSAGE, "Unrecognized message format");
      return;
    }

    if (this.serverEvents.onClientRawMessageBeforeCallback) {
      for (const cb of this.serverEvents.onClientRawMessageBeforeCallback) {
        cb(socket as T, msg);
      }
    }

    if (this.serverEvents.onClientMessageBeforeCallback) {
      for (const cb of this.serverEvents.onClientMessageBeforeCallback) {
        cb(socket as T, msgObj.identifier, msgObj.message);
      }
    }

    const callback = this.callbacks[msgObj.identifier];
    // Ensure message is not null before calling the callback with spread syntax
    if (callback !== undefined && callback !== null && msgObj.message !== null) {
      Promise.resolve(callback(socket, ...msgObj.message))
        .then((val) => {
          if (msgObj.callbackId && msgObj.callbackId != null) {
            this.send(socket, msgObj.callbackId, val);
          }
        })
        .catch((error) => {
          const clientIp = req.headers.get("host")?.split(":") as [string, string];
          this.Logger?.error(
            `Error executing message handler ${msgObj.identifier} for client ${clientIp[0]}:${clientIp[1]}: ${error.stack}`
          );
          // Optionally send an error response back to the client or close the connection
          // socket.send("Error", `Error processing message: ${msgObj.identifier}`);
        });
    } else if (callback !== undefined && callback !== null && msgObj.message === null) {
      // Handle case where message is null but callback exists
      Promise.resolve(callback(socket))
        .then((val) => {
          if (msgObj.callbackId && msgObj.callbackId != null) {
            this.send(socket, msgObj.callbackId, val);
          }
        })
        .catch((error) => {
          const clientIp = req.headers.get("host")?.split(":") as [string, string];
          this.Logger?.error(
            `Error executing message handler ${msgObj.identifier} for client ${clientIp[0]}:${clientIp[1]}: ${error.stack}`
          );
        });
    } else {
      // No handler found for the identifier
      const clientIp = req.headers.get("host")?.split(":") as [string, string];
      this.Logger?.warn(
        `No message handler registered for identifier "${msgObj.identifier}" from client ${clientIp[0]}:${clientIp[1]}`
      );
      // Optionally send an error back to the client indicating no handler
      // if (msgObj.callbackId) {
      //     socket.send(msgObj.callbackId, { error: `No handler for ${msgObj.identifier}` });
      // }
    }
  }

  /**
   * Removes a specific callback from the specified event type.
   * @param eventType
   * @param callback
   * @returns
   */
  public removeEventListener<K extends keyof IServerEvents<T>>(eventType: K, callback: IServerEvents<T>[K]) {
    let arr = this.serverEvents[eventType];
    if (!arr) return;

    const id = arr.indexOf(callback);
    if (id == -1) return;

    arr.splice(id, 1);
    if (arr.length == 0) delete this.serverEvents[eventType];
  }

  /**
   * Creates a new event listener that runs once an event occurs which it got registered to.
   *
   * The registered callback only runs once then removes itself.
   * @param eventType
   * @param callback
   */
  public onceEventListener<K extends keyof IServerEvents<T>>(eventType: K, callback: IServerEvents<T>[K]) {
    const that = this;

    function onceCallback(...args: any[]) {
      that.removeEventListener(eventType, onceCallback as any); // Cast needed due to function wrapper
      (callback as Function)(...args);
    }
    //@ts-ignore
    this.addEventListener(eventType, onceCallback as any); // Cast needed due to function wrapper
  }

  /**
   * Calls an eventhandler on the client-side for the specified client.
   * @param {ZilaClient} socket The websocket client
   * @param {string} identifier The callback's name on the client-side.
   * @param {any|undefined} data Arguments that shall be passed to the callback as parameters (optional)
   */
  public send(socket: ZilaClient, identifier: string, ...data: any[]): void {
    socket.send(identifier, ...data);
  }

  public broadcastSend(identifier: string, ...data: any[]): void {
    // Use Bun's WebSocket server broadcast method
    // Bun's broadcast method sends to all connected websockets managed by this server instance
    // The data needs to be a string or Buffer
    const msg: IWSMessage = {
      callbackId: null,
      message: data,
      identifier: identifier,
    };
    const msgString = JSON.stringify(msg);

    // Use the existing server instance to publish the message
    this.server.publish("broadcast", msgString); // Use a topic like "broadcast"
    // Note: Bun's broadcast requires a topic. You might need to manage topics if you
    // have different groups of clients. For a simple broadcast, a single topic works.
    // Clients need to subscribe to this topic on connection.
    // ws.subscribe("broadcast"); in the open handler.
  }

  /**
   * Calls an eventhandler on the client-side for the specified client. Gets a value of T type back from the client or just waits for the eventhandler to finish.
   * If the client doesn't respond in
   * @param {T} socket The websocket client
   * @param {string} identifier The callback's name on the client-side.
   * @param {any|undefined} data Arguments that shall be passed to the callback as parameters (optional)
   * @returns {Promise<T | undefined}
   */
  public waiter<T>(socket: ZilaClient, identifier: string, ...data: any[]): Promise<T | undefined> {
    return socket.waiter<T>(identifier, ...data);
  }

  /**
   * Registers an eventhandler.
   * The registered callback will run when one of the clients ask for it with the given identifier.
   * Can get overrided with using the same identifier.
   * @param identifier The eventhandler's name
   * @param callback The eventhandler
   */
  public setMessageHandler(identifier: string, callback: ZilaWSCallback<T>): void {
    this.callbacks[identifier] = callback as ZilaWSCallback<ZilaClient>;
  }

  /**
   * Removes an MessageHandler. The callback will no longer get triggered when one of the client asks for it.
   * @param identifier
   */
  public removeMessageHandler(identifier: string): void {
    delete this.callbacks[identifier];
  }

  /**
   * Registers a MessageHandler that only can be called once.
   * @param identifier
   * @param callback
   */
  public onceMessageHandler(identifier: string, callback: ZilaWSCallback<T>): void {
    this.callbacks[identifier] = (socket: ZilaClient, ...args: any[]) => {
      this.removeMessageHandler(identifier);
      return callback(socket as T, ...args);
    };
  }

  /**
   * Disconnects a client from the WS server
   * @param socket
   * @param reason The reason for this action. Will get sent down to client.
   */
  public kickClient(socket: ZilaClient, reason?: string) {
    socket.socket.close(CloseCodes.KICKED, reason);
  }

  /**
   * The server will no longer accept connections from that IP-address.
   * The list of banned IPs resets on every server restart.
   * @param socket
   * @param reason
   */
  public banClient(socket: ZilaClient, reason?: string) {
    socket.socket.close(CloseCodes.BANNED, reason);
    if (socket.ip) {
      this.bannedIpsAndReasons.set(socket.ip, reason);
    }
  }

  /**
   * Stops the ZilaWS server
   */
  public stopServer() {
    this.server.stop();
    // this.baseServer.close();
  }
}
