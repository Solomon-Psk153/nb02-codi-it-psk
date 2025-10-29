import type { PostUserRegisterRequestObjectType, UserRestructedDBObjectType } from "@_types/user.type";

export interface IUserRepo {
  createUser({ name, email, password, type }: PostUserRegisterRequestObjectType): Promise<UserRestructedDBObjectType>
}