import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { Task } from "../types";

export class R2Bucket extends OpenAPIRoute {
  schema = {
    tags: ["Files"],
    summary: "Get a single Task by slug",
    request: {
      params: z.object({
        fileSlug: Str({ description: "File slug" }),
      }),
    },
    responses: {
      "200": {
        description: "Returns a single task if found",
        params: "string",
      },
    },
    "404": {
      description: "Task not found",
    },
  };

  async handle(c, env): Promise<void | Response> {
    // Get validated data
    console.log("x");
    const url = new URL(c.req.url);
    const key = url.pathname.slice(1);
    // const key = url.pathname;
    console.log(key);
    switch (c.req.method) {
      case "PUT":
        await c.env.slots.put(key, c.req.body);
        return new Response(`Put ${key} successfully!`);
      case "GET":
        console.log(key);
        // const object = await c.env.slots.get(key);
        const options = {
          limit: 10,
          include: ["customMetadata"],
        };
        const object = await c.env.slots.get(key);
        console.log(object);
        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }
        console.log(object);
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);

        return new Response(object.body, {
          headers,
        });
      case "DELETE":
        await c.env.MY_BUCKET.delete(key);
        return new Response("Deleted!");

      default:
        return new Response("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: "PUT, GET, DELETE",
          },
        });
    }
  }
}
