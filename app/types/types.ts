import { z } from "zod";

export const aiType = z.object({
  model: z.string().default('llama-3.3-70b-versatile'),
  text:z.string(),
})
