import { z } from "zod";

export type SignupResponse = {
  message: string;
};

export type SignupRequest = z.infer<typeof SignupRequestSchema>;
export const SignupRequestSchema = z.object({
  email: z.string().email({ message: "Should be valid email" }).min(6),
  password: z.string().min(6),
});

// password: z.string().min(6).max(32).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
