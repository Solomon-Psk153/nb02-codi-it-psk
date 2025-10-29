import { userRegisterSchema } from "./user.validator";

export const userLoginSchema = userRegisterSchema.pick({
  email: true,
  password: true
});