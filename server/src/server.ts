import { ZilaServer } from "./core/index";
import ZilaClient from "./core/ZilaClient";
import { addSubscriber, debouncedChanges$ } from "./libs/listener";

export const server = new ZilaServer({
  port: 6589,
  logger: true,
  verbose: true,

  // https: {
  //   pathToCert: "cert/fullchain.pem",
  //   pathToKey: "cert/privkey.pem",
  // },
});

server.setMessageHandler("GetValueOfPI", (client: ZilaClient, param1: string) => {
  console.log("touch");
  console.log(param1); // --> Some string
  return Math.PI;
});
server.setMessageHandler("GetPostById", (client: ZilaClient, param1: string) => {
  //Your code here...
  console.log("param1");
  console.log(param1);

  return "This is message from the client side";
});
server.setMessageHandler("SubscribeToStatsUpdates", (client: ZilaClient, userId: string) => {
  //Your code here...
  console.log("param1");
  // console.log(client);
  addSubscriber(userId, client);
  // debouncedChanges$.subscribe((data) => {
  //   console.log("change detected");
  //   // client.send("StatsUpdate", data);
  //   server.send(client, "StatsUpdate", data, true);
  // });
  server.send(client, "Subscribed", true);
  return "This is message from the client side";
});
