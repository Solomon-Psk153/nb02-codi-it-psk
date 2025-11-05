import { UserRestructedDBObjectType } from "./user.type";

/**
 * Post Request를 할 때, 클라이언트가 주는 정보 구조
 */
// export type PostLoginRequestBodyObjectType = z.infer<typeof userLoginSchema>;
export type PostLoginRequestBodyObjectType = {
    email: string;
    password: string;
}
/**
 * Post Request에 성공해서 로그인 정보를 줄 때, json 구조
 * ```json
 * {
 *   user:{
 *     id: Cuid;
 *     name: string;
 *     email: string;
 *     type: string;
 *     points: number;
 *     grade: {
 *       id: string;
 *       name: string;
 *       rate: number;
 *       minAmount: number;
 *     };
 *     image: string;
 *   }
 *   accessToken: string;
 * }
 * ```
 */
export type PostLoginResponseSuccessObjectType = {
  user: Omit<UserRestructedDBObjectType, "password" | "createdAt" | "updatedAt">;
  accessToken: string;
};

export type PostGetAccessWithRefreshSuccessObjectTYpe = {
  accessToken: string;
};