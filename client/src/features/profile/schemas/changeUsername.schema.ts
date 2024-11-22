import { z } from "zod";

export const changeUsernameSchema = z.object({
  username: z.string().trim().min(4, "Username must be at least 4 characters long."),
});

export type ChangeUsernameSchema = z.infer<typeof changeUsernameSchema>;
