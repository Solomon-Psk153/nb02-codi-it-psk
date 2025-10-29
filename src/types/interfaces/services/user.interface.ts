import type { PostUserRegisterRequestObjectType, UserRestructedDBObjectType } from "@_types/user.type";

export interface IUserSrv {
  register({name, email, password, type}: PostUserRegisterRequestObjectType): Promise<UserRestructedDBObjectType>
}