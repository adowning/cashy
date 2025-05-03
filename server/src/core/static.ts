export const staticServe: Record<`/${string}`, Response> = {
  "/api/health-check": new Response("All good!"),
  "/": new Response(await Bun.file("./public/index.html").bytes(), {
    headers: {
      "Content-Type": "text/html",
    },
  }),
  "/zilaws-client.js": new Response(await Bun.file("./public/zilaws-client.js").bytes(), {
    headers: {
      "Content-Type": "text/javascript",
    },
  }),
  "/index.js": new Response(await Bun.file("./public/index.js").bytes(), {
    headers: {
      "Content-Type": "text/javascript",
    },
  }),
  // }),
  // "/style.css": new Response(await Bun.file("./static/style.css").bytes(), {
  //   headers: {
  //     "Content-Type": "text/css",
  //   },
  // }),
};
