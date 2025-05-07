// src/websocketHandlers.ts

import type { ServerWebSocket, WebSocketHandler } from "bun";

/**
 * Defines the structure for custom data to be attached to each WebSocket connection.
 * This data is passed during the `server.upgrade()` call in the main fetch handler.
 */
export type MyWebSocketData = {
  userId?: string; // Example: Identifier for the connected user
  roomId?: string; // Example: Identifier for the chat room or channel
  // Add any other context needed (e.g., authToken, connectionTime)
};

/**
 * Defines the Bun native WebSocket event handlers.
 * This object is passed to the `websocket` property of `Bun.serve()`.
 * It uses Bun's specific `ServerWebSocket` and `WebSocketHandler` types.
 */
export const bunNativeWebSocketHandler: WebSocketHandler<MyWebSocketData> = {
  /**
   * Called when a new WebSocket connection is successfully established after the upgrade.
   * @param ws The WebSocket connection object, typed with MyWebSocketData.
   */
  open(ws: ServerWebSocket<MyWebSocketData>) {
    console.log(
      `[Bun WS Native] Connection opened. Context: userId=${ws.data?.userId}, roomId=${ws.data?.roomId}`
    );

    // Send an acknowledgment message to the newly connected client
    ws.send(
      JSON.stringify({
        type: "connection_ack",
        message: "Connected via Bun native WebSocket handler.",
        data: ws.data, // Send back the context data received during upgrade
      })
    );

    // Subscribe the connection to relevant topics (channels/rooms) based on its context data
    if (ws.data?.roomId) {
      ws.subscribe(ws.data.roomId);
      console.log(`[Bun WS Native] User ${ws.data.userId} subscribed to room ${ws.data.roomId}`);
    }
    // Subscribe to user-specific updates (e.g., for notifications or stats)
    if (ws.data?.userId) {
      const userTopic = `statsUpdates_${ws.data.userId}`;
      ws.subscribe(userTopic);
      console.log(`[Bun WS Native] User ${ws.data.userId} subscribed to topic ${userTopic}`);
      // Optionally send confirmation for specific subscriptions
      ws.send(JSON.stringify({ handler: "SubscribedToStatsUpdates", topic: userTopic, success: true }));
    }
  },

  /**
   * Called when a message is received from a connected client.
   * @param ws The WebSocket connection object.
   * @param message The received message (can be string or Uint8Array/Buffer).
   */
  message(ws: ServerWebSocket<MyWebSocketData>, message: string | Uint8Array) {
    const incomingMsg = message.toString(); // Ensure message is a string for JSON parsing
    console.log(
      `[Bun WS Native] Message from userId: ${ws.data?.userId}, roomId: ${ws.data?.roomId}: ${incomingMsg}`
    );

    try {
      // Attempt to parse the incoming message as JSON
      const parsed = JSON.parse(incomingMsg);

      // --- Implement your application-specific message routing and handling ---
      // This logic replaces your original server's message handlers (e.g., ZilaServer)

      if (parsed.handler === "GetValueOfPI") {
        ws.send(JSON.stringify({ handler: "GetValueOfPI", data: Math.PI, isSuccess: true }));
      } else if (parsed.handler === "GetPostById" && parsed.params?.[0]) {
        const postId = parsed.params[0];
        // TODO: Replace with your actual database call or logic to fetch post data
        const postData = { id: postId, title: `Details for Post ${postId} from DB` };
        ws.send(JSON.stringify({ handler: "GetPostById", data: postData, isSuccess: true }));
      }
      // Example: Broadcasting a message to a room (excluding the sender)
      else if (parsed.action === "broadcast_to_room" && ws.data?.roomId) {
        const success = ws.publish(
          // Use ws.publish to send to OTHERS in the topic
          ws.data.roomId,
          JSON.stringify({
            type: "room_message",
            sender: ws.data.userId, // Identify the sender using context data
            payload: parsed.payload,
          })
        );
        console.log(
          `[Bun WS Native] Publish to room ${ws.data.roomId} ${success ? "succeeded" : "failed (backpressure?)"}`
        );
        // Send confirmation back to the original sender
        ws.send(JSON.stringify({ type: "broadcast_sent_ack", success: success > 0 }));
      }
      // Add more 'else if' blocks for other handlers/actions...
      else {
        // Default behavior: echo the message back or send an "unknown command" response
        ws.send(
          JSON.stringify({
            type: "echo_or_unknown",
            message: `Received your message: ${incomingMsg}`,
            receivedPayload: parsed, // Send back the parsed payload
            context: ws.data,
          })
        );
      }
      // --- End application-specific message handling ---
    } catch (e) {
      // Handle cases where the message is not valid JSON or a handler throws an error
      console.error("[Bun WS Native] Error processing message:", e);
      // Send an error message back to the client if the socket is still open
      if (ws.readyState === 1) {
        try {
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Failed to process message (invalid JSON or handler error).",
            })
          );
        } catch (sendError) {
          // Log error if sending the error message itself fails
          console.error("[Bun WS Native] Failed to send error message back to client:", sendError);
        }
      }
    }
  },

  /**
   * Called when a WebSocket connection is closed, either by the client or the server.
   * @param ws The WebSocket connection object.
   * @param code The WebSocket close code (e.g., 1000 for normal closure).
   * @param reason A string explaining why the connection was closed.
   */
  close(ws: ServerWebSocket<MyWebSocketData>, code: number, reason: string) {
    console.log(
      `[Bun WS Native] Connection closed. userId: ${ws.data?.userId}, roomId: ${ws.data?.roomId}. Code: ${code}, Reason: ${reason}`
    );
    // Perform necessary cleanup when a connection closes
    // Unsubscribe from all topics the connection might have joined
    if (ws.data?.roomId) {
      ws.unsubscribe(ws.data.roomId);
      console.log(`[Bun WS Native] User ${ws.data.userId} unsubscribed from room ${ws.data.roomId}`);
    }
    if (ws.data?.userId) {
      ws.unsubscribe(`statsUpdates_${ws.data.userId}`);
      console.log(`[Bun WS Native] User ${ws.data.userId} unsubscribed from statsUpdates topic`);
    }
    // Add any other application-specific cleanup logic (e.g., update presence status)
  },

  /**
   * Called when the socket's buffer drains, indicating it's ready to receive more data
   * after previously signaling backpressure (ws.send() returning 0 or low value).
   * @param ws The WebSocket connection object.
   */
  drain(ws: ServerWebSocket<MyWebSocketData>) {
    console.log(`[Bun WS Native] Backpressure drain for userId: ${ws.data?.userId}. Ready for more data.`);
    // If you implemented logic to pause sending due to backpressure, you can resume it here.
  },

  // Note: Bun's native WebSocketHandler does not include a top-level 'error(ws, error)' handler.
  // Errors within message/open/close handlers should be caught using try/catch blocks.
  // Connection-level errors typically trigger the 'close' event.
};
