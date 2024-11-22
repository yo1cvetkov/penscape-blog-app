import { z } from "zod";

export const changeBioSchema = z.object({
  bio: z.string().min(20, "Bio must be at least 20 characters long."),
});

export type ChangeBioSchema = z.infer<typeof changeBioSchema>;
