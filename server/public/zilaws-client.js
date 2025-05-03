class ZilaClient {
  constructor(ws) {
    this.ws = ws;
    this.messageHandlers = {};
    this.waiters = {};

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        const handler = this.messageHandlers[data.name];
        if (handler) {
          handler(data.payload);
        }
      } else if (data.type === "response") {
        const waiter = this.waiters[data.id];
        if (waiter) {
          waiter.resolve(data.payload);
          delete this.waiters[data.id];
        }
      }
    };

    this.ws.onclose = () => {
      console.log("Connection closed");
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  static connectTo(url) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        const client = new ZilaClient(ws);
        resolve(client);
      };

      ws.onerror = (error) => {
        reject(error);
      };
    });
  }

  setMessageHandler(name, handler) {
    this.messageHandlers[name] = handler;
  }

  send(name, payload) {
    this.ws.send(JSON.stringify({ type: "message", name: name, payload: payload }));
  }

  waiter(name, payload) {
    return new Promise((resolve, reject) => {
      const id = this.generateId();
      this.waiters[id] = { resolve, reject };
      this.ws.send(JSON.stringify({ type: "request", id: id, name: name, payload: payload }));
    });
  }

  generateId() {
    return Math.random().toString(36).substring(2, 15);
  }
}
