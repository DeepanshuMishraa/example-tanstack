import { z } from "zod";

export const analyseTextType = z.object({
  text: z.string(),
})
