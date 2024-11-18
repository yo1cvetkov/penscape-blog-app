import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().trim().min(3, "Minimum 3 characters long.").max(20, "Maximum 20 characters long"),
    email: z.string().email(),
    password: z
      .string()
      .min(12, "Password must be at least 12 characters long")
      .refine((password) => /[A-Z]/.test(password), { message: "Password must include at least one uppercase letter" })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must include at least one lowercase letter",
      })
      .refine((password) => /\d/.test(password), {
        message: "Password must include at least one number",
      })
      .refine((password) => /[^a-zA-Z0-9]/.test(password), {
        message: "Password must include at least one special character",
      }),
    repeatPassword: z.string().min(1, "Repeated password required."),
    bio: z.optional(z.string()),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        path: ["repeatPassword"],
        message: "Passwords must match",
        code: "custom",
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
