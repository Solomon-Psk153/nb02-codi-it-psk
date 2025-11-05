import type { PostFindUserInfoParamType, PostRegisterRequestObjectType, UserRestructedDBObjectType } from "@_types/user.type";

export interface IUserRepo {
  createUser({ name, email, password, type }: PostRegisterRequestObjectType): Promise<UserRestructedDBObjectType>;
  findByIdAndType({id, type}: PostFindUserInfoParamType): Promise<UserRestructedDBObjectType>;
}