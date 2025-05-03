// import { fromHono } from "chanfana";
// import { Hono } from "hono";
// import { TaskCreate } from "./endpoints/taskCreate";
// import { TaskDelete } from "./endpoints/taskDelete";
// import { TaskFetch } from "./endpoints/taskFetch";
// import { TaskList } from "./endpoints/taskList";
// import { R2Bucket } from "./endpoints/r2Bucket";
// import { handleSettings } from "./endpoints/HandleSettings";
// import { HandleSpin } from "./endpoints/HandleSpin";
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const prisma = new PrismaClient().$extends(withAccelerate());
// // Start a Hono app
// const app = new Hono();

// // Setup OpenAPI registry
// // const openapi = fromHono(app, {
// //   docs_url: "/",
// // });

// // Register OpenAPI endpoints
// // app.get("/api/tasks", TaskList);
// // app.post("/api/tasks", TaskCreate);
// // app.get("/api/tasks/:taskSlug", TaskFetch);
// // app.delete("/api/tasks/:taskSlug", TaskDelete);
// // app.get("/", (c) => c.text("Hello Cloudflare Workers!"));

// app.post("/api/:userId/:gameName/rtg/platform/game/settings", (c) => {
//   const { userId, gameName } = c.req.param();
//   console.log(userId);
//   console.log(gameName);
//   return handleSettings(c, userId, gameName, prisma);
// });
// // app.post("/rtg", (c) => {
// //   // const { userId, gameName } = c.req.param();

// //   // handleSettings(c, userId, gameName, prisma);

// //   console.log(c);
// //   return c.text("Hello Cloudflare Workers!");
// // });
// // openapi.post("/api/:usernama/:gameName/game/spin", HandleSpin);

// // app.get("/rtg/:file",  R2Bucket);
// // app.get("/:dir{(css|img)}/:key", async (c) => {
// app.get("/:dir/:key", async (c) => {
//   const key = `${c.req.param("dir")}/${c.req.param("key")}`;
//   const object = await c.env.slots.get(key);

//   if (!object) return c.notFound();

//   const data = await object.arrayBuffer();
//   const contentType = object.httpMetadata?.contentType || "";

//   const cacheControl =
//     c.req.param("dir") == "img" ? "max-age=31536000" : "max-age=900";

//   return c.body(data, 200, {
//     // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
//     "Cache-Control": cacheControl,
//     "Content-Type": contentType,
//     ETag: object.httpEtag,
//   });
// });

// // Export the Hono app
// export default app;

// // http://r2-worker.andrews.workers.dev/api/asdf/777Strike/rtg/platform/game/settings

// const someHost = "https://examples.cloudflareworkers.com/demos";
// const url = someHost + "/requests/json";
// const body = {
//   results: ["default data to send"],
//   errors: null,
//   msg: "I sent this to the fetch",
// };

// [[r2_buckets]]
// binding = 'slots'
// slots = 'slots'


async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json());
  } else if (contentType.includes("application/text")) {
    return response.text();
  } else if (contentType.includes("text/html")) {
    return response.text();
  } else {
    return response.text();
  }
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    switch (request.method) {
      // case "PUT":
      //   await env.slots.put(key, request.body);
      //   return new Response(`Put ${key} successfully!`);
      case "GET":
        const object = await env.slots.get(key);

        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);

        return new Response(object.body, {
          headers,
        });
      case "POST":
        console.log('hjere')
        // console.log(JSON.stringify(request.body))
        var uri = request.url.replace('r2worker', 'api');
        // const pathname = url.pathname.split("/game/")[0];
        uri = uri.replace('.com', '.com/api')
        // const pathname = url.pathname.split("/game/")[0];
        // const newurl = pathname.replace('r2worker', api)
        // const proxyPathname = pathname.split("/")[1]
        // const apiServerUrl =pathname[0]
        console.log(uri);
        console.log(uri);
        console.log(uri);
        const apiRequest = new Request(uri, request);
        return fetch(apiRequest)
        // const body = await gatherResponse(request);
        // const init = {
        //   body: JSON.stringify(body),
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json;charset=UTF-8",
        //   },
        // };
        // console.log(request.url)
        // const apiUrl = request.url.replace('slots', 'api').replace('.com', '.com/api') 
        // console.log(apiUrl)
        // const response = await fetch(apiUrl, init);
        // console.log(response)

        // const results = await gatherResponse(response);
        // console.log(results)

        // return new Response(results);


      default:
        return new Response("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: "PUT, GET, DELETE",
          },
        });
    }
  },
};