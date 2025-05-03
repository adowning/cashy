import { DateTime, Str } from "chanfana";
import { z } from "zod";
export * from "./settingsRequest";
export * from "./settingsResponse";
export * from "./spinRequest";
export * from "./spinResponse";

export const Task = z.object({
  name: Str({ example: "lorem" }),
  slug: Str(),
  description: Str({ required: false }),
  completed: z.boolean().default(false),
  due_date: DateTime(),
});
