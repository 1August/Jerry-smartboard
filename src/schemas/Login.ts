import { User } from "./UserSchema";
import { z } from "zod";

export type Token = string;

export type LoginResponse = {
  user: User;
  token: Token;
};

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export const LoginRequestSchema = z.object({
  email: z.string().email({ message: "Should be valid email" }).min(6),
  password: z.string().min(6),
});
