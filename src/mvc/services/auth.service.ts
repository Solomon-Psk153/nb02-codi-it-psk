import { strAndHashCompare } from "@_utils/app.util";
import { BadRequestError, NotFoundError } from "@_errors/400.error";
import { repoDBErrorCatcher } from "@_mws/repoDBErrorCatcher";

import type { PostLoginRequestBodyObjectType } from "@_types/auth.type";
import type { IAuthRepo } from "@_IFs/repos/auth.interface";
import type { IAuthSrv } from "@_IFs/services/auth.interface";
import { RESOLVER } from "awilix";

export class AuthService implements IAuthSrv {
  private AuthRepo;
  constructor(
    {AuthRepo}: {AuthRepo: IAuthRepo}
  ) { 
    this.AuthRepo = AuthRepo;
  }
  
  public async login({ email, password }: PostLoginRequestBodyObjectType) {
    const registeredUserObj = await repoDBErrorCatcher(() => this.AuthRepo.findByEmail(email));

    if (!registeredUserObj) throw new NotFoundError("요청한 리소스를 찾을 수 없습니다:user not found");
    const isSamePassword = await strAndHashCompare(password, registeredUserObj.password);
    if (!isSamePassword) throw new BadRequestError("이메일 또는 비밀번호가 올바르지 않습니다:password not same");
    return registeredUserObj;
  }

  static [RESOLVER] = {
    name: 'AuthService'
  }
}