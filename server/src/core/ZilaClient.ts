/**
 * @file ZilaWS
 * @module ZilaWS
 * @license
 * MIT License
 * Copyright (c) 2023 ZilaWS
 */

// Using Bun's built-in WebSocket type
// import { WebSocket as WebSocketClient } from "ws"; // Removed Node.js ws import
import { randomInt, randomUUID } from "crypto"; // crypto is available in Bun
import { WSStatus, ZilaWSCallback } from "."; // Assuming . refers to index.ts
import Cookie from "cookie"; // Using the cookie library for parsing/serializing
// import { IncomingHttpHeaders } from "http"; // Removed Node.js http import
import { ICookie } from "./ICookie";
import type { ServerWebSocket } from "bun"; // Import Bun's WebSocket type
import { User } from "shared";

// Forward declaration for ZilaServer to avoid circular dependency issues
// This allows ZilaClient to reference ZilaServer without ZilaServer needing to be defined first
declare class ZilaServer<T extends ZilaClient = ZilaClient> {
  VerbLog?: import("./verboseLogger").ILogger;
  Logger?: import("./verboseLogger").ILogger;
  maxWaiterTime: number;
  clients: Array<ZilaClient | T>;
  settings: IServerSettings;
  setMessageHandler(identifier: string, callback: ZilaWSCallback<ZilaClient>): void;
  removeMessageHandler(identifier: string): void;
  onceMessageHandler(identifier: string, callback: ZilaWSCallback<ZilaClient>): void;
  kickClient(socket: ZilaClient, reason?: string): void;
  banClient(socket: ZilaClient, reason?: string): void;
}

// Define IServerSettings here or import if it's in a separate file
// Assuming IServerSettings is defined in index.ts, we'll include a minimal definition here
// to satisfy the type checker in ZilaClient.ts. The full definition is in index.ts.
interface IServerSettings {
  port: number;
  https?: {
    pathToCert: string;
    pathToKey: string;
    passphrase?: string;
  };
  verbose?: boolean;
  logger?: boolean | import("./verboseLogger").ILogger;
  host?: string;
  headerEvent?: (recievedHeaders: Headers) => Array<string> | void; // Updated to Bun's Headers
  maxWaiterTime?: number;
  clientClass?: new (
    socket: ServerWebSocket<any>, // Updated to Bun's WebSocket type
    ip: string | undefined,
    server: ZilaServer,
    isBrowser: boolean,
    headers: Headers, // Updated to Bun's Headers
    cookies?: Map<string, string>
  ) => ZilaClient;
}
``;

export default class ZilaClient {
  // Updated socket type to Bun's ServerWebSocket
  socket: ServerWebSocket<any>;
  id: string;
  ip: string | undefined;
  server: ZilaServer;
  // Bun's WebSocket readyState aligns with the standard WebSocket API, which is compatible with WSStatus enum
  status: WSStatus;
  isBrowser: boolean;
  user: User;

  // Using Bun's Headers type
  private readonly headers: Headers;

  private _cookies: Map<string, string> = new Map();

  /**
   * Cookies of the client's browser. Must be URI encoded.
   * Only contains cookies which were present while establishing the connection and which were set by ZilaWS.
   */
  /* istanbul ignore next */
  public get cookies() {
    return this._cookies;
  }

  /**
   * *You must not use this constructor!*
   *
   * Inner part of ZilaWS.
   * @param socket
   * @param ip
   * @param server
   */
  constructor(
    // Updated socket type to Bun's ServerWebSocket
    socket: ServerWebSocket<any>,
    ip: string | undefined,
    server: ZilaServer,
    isBrowser: boolean,
    // Using Bun's Headers type
    headers: Headers,
    user: User,
    cookies?: Map<string, string>
  ) {
    this.socket = socket;
    // crypto.randomInt and crypto.randomUUID are available in Bun
    this.id = new Date(Date.now()).toISOString() + randomInt(0, 100);
    this.ip = ip;
    this.server = server;
    this.user = user;
    // Map Bun's readyState to WSStatus
    // Bun's readyState: 0 (CONNECTING), 1 (OPEN), 2 (CLOSING), 3 (CLOSED)
    // WSStatus: 0 (OPENING), 1 (OPEN), 2 (CLOSED), 3 (ERROR)
    // We'll map 0 to OPENING, 1 to OPEN, 2 and 3 to CLOSED. ERROR status will be handled separately.
    switch (socket.readyState) {
      case 0:
        this.status = WSStatus.OPENING;
        break;
      case 1:
        this.status = WSStatus.OPEN;
        break;
      case 2:
      case 3:
        this.status = WSStatus.CLOSED;
        break;
      default:
        this.status = WSStatus.ERROR; // Should not happen with standard WebSocket states
        break;
    }

    if (cookies) this._cookies = cookies;
    this.isBrowser = isBrowser;
    this.headers = headers;
  }

  /**
   * Used to store cookies to a socket which has been recieved from the client-side for syncing.
   * @param socket The socket to store the cookies in
   * @param cookies Cookies to store
   */
  /* istanbul ignore next */
  public static StoreSyncedCookies(socket: ZilaClient, cookies: Record<string, string>) {
    socket._cookies = new Map(Object.entries(cookies));
  }

  /**
   * Adds a cookie to the client's browser if it's actually running in a browser.
   * @param cookie
   */
  /* istanbul ignore next */
  public setCookie(cookie: ICookie) {
    if (!this.isBrowser) return;

    const cookieStr = Cookie.serialize(cookie.name, cookie.value, cookie);
    // Assuming "SetCookie" is a built-in client-side event handler
    this.bSend("SetCookie", cookieStr);

    this._cookies.set(cookie.name, cookie.value);
  }

  /**
   * Removes a cookie from the client's browser if it's actually running in a browser.
   * @param cookieName
   */
  /* istanbul ignore next */
  public removeCookie(cookieName: string) {
    if (!this.isBrowser) return;

    this._cookies.delete(cookieName);
    // Assuming "DelCookie" is a built-in client-side event handler
    this.bSend("DelCookie", cookieName);
  }

  /**
   * Returns a JSON serialized message object.
   * @param identifier
   * @param data
   * @param callbackId
   * @param isBuiltIn
   * @returns
   */
  private getMessageJSON(
    identifier: string,
    data: any[] | null,
    callbackId: string | null,
    isBuiltIn: boolean = false
  ): string {
    /* istanbul ignore next */
    return JSON.stringify({
      identifier: isBuiltIn ? "@" + identifier : identifier,
      message: data,
      callbackId: callbackId,
    });
  }

  /**
   * Calls an eventhandler on the client-side for the specified client.
   * @param {string} identifier The callback's name on the client-side.
   * @param {any|undefined} data Arguments that shall be passed to the callback as parameters (optional)
   */
  public send(identifier: string, ...data: any[]) {
    // Bun's WebSocket send method
    this.socket.send(this.getMessageJSON(identifier, data, null));
  }

  /**
   * Send function for built-in systems
   * @param {string} identifier The callback's name on the client-side.
   * @param {any|undefined} data Arguments that shall be passed to the callback as parameters (optional)
   */
  /* istanbul ignore next */
  private bSend(identifier: string, ...data: any[]) {
    // Bun's WebSocket send method
    this.socket.send(this.getMessageJSON(identifier, data, null, true));
  }

  /**
   * Calls an eventhandler on the client-side for the specified client. Gets a value of T type back from the client or just waits for the eventhandler to finish.
   * The max waiting time is the server's maxWaiterTime
   * @param {string} identifier The callback's name on the client-side.
   * @param {any|undefined} data Arguments that shall be passed to the callback as parameters (optional)
   * @returns {Promise<T | undefined>}
   */
  public waiter<T>(identifier: string, ...data: any[]): Promise<T | undefined> {
    return this.waiterTimeout<T>(identifier, this.server.maxWaiterTime, ...data);
  }

  /**
   * Calls an eventhandler on the client-side for the specified client. Gets a value of T type back from the client or just waits for the eventhandler to finish.
   * @param {string} identifier The callback's name on the client-side.
   * @param {number} maxWaitingTime The maximum time this waiter will wait for the client.
   * @param {any|undefined} data Arguments that shall be passed to the callback as parameters (optional)
   * @returns {Promise<T | undefined>}
   */
  public waiterTimeout<T>(identifier: string, maxWaitingTime: number, ...data: any[]): Promise<T | undefined> {
    return new Promise(async (resolve) => {
      const uuid = randomUUID();

      let timeout: Timer | undefined; // Use Bun's Timer type

      const cleanup = () => {
        if (timeout) clearTimeout(timeout);
        this.removeMessageHandler(uuid);
      };

      const responsePromise = new Promise<T | undefined>((r) => {
        this.setMessageHandler(uuid, (args: any[]): void => {
          cleanup();
          r(args as T | undefined);
        });
      });

      const timeoutPromise = new Promise<undefined>((r) => {
        timeout = setTimeout(() => {
          cleanup();
          r(undefined);
        }, maxWaitingTime);
      });

      // Use Promise.race to get the first result (either the response or the timeout)
      resolve(Promise.race([responsePromise, timeoutPromise]));

      // Send the message after setting up the listeners
      this.socket.send(this.getMessageJSON(identifier, data, uuid));
    });
  }

  /**
   * Registers an eventhandler.
   * The registered callback will run when one of the clients ask for it with the given identifier.
   * Can get overrided with using the same identifier.
   * @param identifier The eventhandler's name
   * @param callback The eventhandler
   */
  public setMessageHandler(identifier: string, callback: (...args: any[]) => void) {
    // Pass the ZilaClient instance to the server's message handler
    return this.server.setMessageHandler(identifier, (socket: ZilaClient, ...args: any[]) => {
      // Ensure the socket passed to the callback is the correct ZilaClient instance
      if (socket === this) {
        callback(...args);
      } else {
        // This case should ideally not happen if the server correctly maps sockets to ZilaClients
        this.server.Logger?.warn(`Mismatch in ZilaClient instance for message handler ${identifier}`);
      }
    });
  }

  /**
   * Registers a MessageHandler that only can be called once.
   * @param identifier
   * @param callback
   */
  public onceMessageHandler(identifier: string, callback: (...args: any[]) => void) {
    // Pass the ZilaClient instance to the server's once message handler
    return this.server.onceMessageHandler(identifier, (socket: ZilaClient, ...args) => {
      // Ensure the socket passed to the callback is the correct ZilaClient instance
      if (socket === this) {
        return callback(...args);
      } else {
        // This case should ideally not happen
        this.server.Logger?.warn(`Mismatch in ZilaClient instance for once message handler ${identifier}`);
      }
    });
  }

  /**
   * Removes an MessageHandler. The callback will no longer get triggered when one of the client asks for it.
   * @param identifier
   */
  public removeMessageHandler(identifier: string) {
    return this.server.removeMessageHandler(identifier);
  }

  /**
   * Disconnects a client from the WS server
   * @param reason The reason for this action. Will get sent down to client.
   */
  public kick(reason?: string) {
    this.server.kickClient(this, reason);
  }

  /**
   * The server will no longer accept connections from that IP-address.
   * The list of banned IPs resets on every server restart.
   * @param reason The reason for this action. Will get sent down to client.
   */
  public ban(reason?: string) {
    this.server.banClient(this, reason);
  }
}
