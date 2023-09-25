import { string, z } from "zod";

export type NewUser = z.infer<typeof NewUserSchema>;
export type User = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
  id: string().uuid(),
  username: string().min(3).max(20),
  email: string().email(),
});

export const NewUserSchema = UserSchema.omit({
  id: true,
});
