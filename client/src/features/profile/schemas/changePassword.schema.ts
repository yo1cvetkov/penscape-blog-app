import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z
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
    repeatPassword: z.string().min(1, "Repeated password is required."),
  })
  .superRefine(({ newPassword, repeatPassword }, ctx) => {
    if (newPassword !== repeatPassword) {
      ctx.addIssue({
        path: ["repeatPassword"],
        message: "Passwords must match",
        code: "custom",
      });
    }
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
