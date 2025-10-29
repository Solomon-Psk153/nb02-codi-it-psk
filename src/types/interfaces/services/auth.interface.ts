import type { PostLoginRequestBodyObjectType } from "@_types/auth.type";
import type { QueryUserByEmailObjectType } from "@_types/user.type";


export interface IAuthSrv {
  login({ email, password }: PostLoginRequestBodyObjectType): Promise<QueryUserByEmailObjectType>
}