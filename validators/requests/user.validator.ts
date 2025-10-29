import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().nonempty(),
  email: z.email().nonempty(),
  password: z.string().nonempty(),
  type: z.enum(["SELLER", "BUYER"])
});