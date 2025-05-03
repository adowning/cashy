// // import { connectTo } from "zilaws-client";

// import type {
//   ZilaServer,
//   ZilaClient,
//   CloseCodes,
//   WSStatus,
//   WebSocketClient,
//   IncomingHttpHeaders,
// } from "zilaws-client";
// import { connectTo, ZilaConnection } from "zilaws-client";

// var myHeaders = new Headers();
// // myHeaders.append(
// //   "Authorization",
// //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZjZGVlNTc4LWUxZmMtNDQ4MS1iMTEwLWVkOWNjMjVjNjc4MCIsImlhdCI6MTc0NTg3OTI4OSwiZXhwIjoxNzc3NDM2ODg5fQ.xLqwPldvIcRe9tXv64kbp1zps70DxrjLEOL8aRLh5YA"
// // );
// // myHeaders.append(
// //   "Cookie",
// //   "cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtYTF1MzBrbDAwMDBtZGVjMmQ2MjFqYXYiLCJpYXQiOjE3NDU4OTA0MjgsImV4cCI6MTc3NzQ0ODAyOH0.SnNYMYX6m7GdymTQe0_1u4bAG26nf6B6dej9M9MI3os"
// // );
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   username: "ash",
//   password: "asdfasdf",
// });

// var requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow",
// };

// const result = await fetch("http://localhost:6589/auth/login", requestOptions);
// // .then((response) => response.text())
// // .then((result) => console.log(result))
// // .catch((error) => console.log("error", error));
// fetch("localhost:6589");
// console.log(result);
// const client = await connectTo("ws://localhost:6589", (reason?: string) => {
//   console.error("ZilaConnection error happened:\n" + reason);
// });
// client.syncCookies();
// client.setMessageHandler("test", (gotValue: string) => {
//   console.log(gotValue);
//   return gotValue + " success";
// });

// client.setMessageHandler("GetValueOfPI", (param1: string, param2: number, param3: object /*, ...*/) => {
//   console.log(param1);
// });
// const response: string | undefined = await client.waiter("GetValueOfPI", "myData", true);
// console.log(response);
