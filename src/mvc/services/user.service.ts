import { repoDBErrorCatcher } from "@_mws/repoDBErrorCatcher";

import type { PostUserRegisterRequestObjectType, UserRestructedDBObjectType } from "@_types/user.type";
import type { IUserRepo } from "@_IFs/repos/user.interface";
import type { IUserSrv } from "@_IFs/services/user.interface";
import { RESOLVER } from "awilix";

export class UserService implements IUserSrv{
  private UserRepo;
  constructor(
    {UserRepo}: {UserRepo: IUserRepo}
  ){
    this.UserRepo = UserRepo;
  }

  public async register({name, email, password, type}: PostUserRegisterRequestObjectType): Promise<UserRestructedDBObjectType>{
    const newRegisterObj = await repoDBErrorCatcher(() => this.UserRepo.createUser({name, email, password, type}));
    return newRegisterObj;
  }

  static [RESOLVER] = {
    name: 'UserService'
  }
};