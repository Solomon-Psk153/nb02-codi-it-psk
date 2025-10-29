import { z } from "zod";
import { userLoginSchema } from "@_validators/requests/auth.validator";
import { UserRestructedDBObjectType } from "./user.type";

/**
 * Post Request를 할 때, 클라이언트가 주는 정보 구조
 */
export type PostLoginRequestBodyObjectType = z.infer<typeof userLoginSchema>;

/**
 * Post Request에 성공해서 로그인 정보를 줄 때, json 구조
 * ```json
 * ```
 */
export type PostLoginResponseSuccessObjectType = {
  user: Omit<UserRestructedDBObjectType, "password" | "createdAt" | "updatedAt">;
  accessToken: string;
};