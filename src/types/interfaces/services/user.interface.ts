import type { PostFindUserInfoParamType, PostRegisterRequestObjectType, UserRestructedDBObjectType } from "@_types/user.type";

export interface IUserSrv {
  register({name, email, password, type}: PostRegisterRequestObjectType): Promise<UserRestructedDBObjectType>;
  findUserInfo({id, type}: PostFindUserInfoParamType): Promise<UserRestructedDBObjectType>;
}