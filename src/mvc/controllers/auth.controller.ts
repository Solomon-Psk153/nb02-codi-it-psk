import { Route, Controller, Tags, Post, Body, SuccessResponse, Response, Example, Request } from "@tsoa/runtime";
import { generateAccessToken, generateRefreshToken } from "@_utils/token.util";
import { omit } from "@_utils/app.util";
import { cookieConfig } from "@_consts/app.consts";

import type { PostLoginRequestBodyObjectType, PostLoginResponseSuccessObjectType } from "@_types/auth.type";
import type { ErrorResponseObjectType } from "@_types/error.type";
import type { Request as ExpressRequest } from "express";
import type { IAuthSrv } from "@_IFs/services/auth.interface";
import type { CookieSameSiteType } from "@_types/app.type";
import { RESOLVER } from "awilix";
import { userLoginSchema } from "@_validators/requests/auth.validator";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {

  constructor(){
    super();
  }

  @Post("login")
  @SuccessResponse(201, "login success", "application/json")
  @Example<PostLoginRequestBodyObjectType>({ email: "buyer@codiit.com", password: "test1234" })
  @Response<ErrorResponseObjectType>(400, "Bad Request", { status: 400, message: "잘못된 요청입니다.", error: "Bad Request" }, "application/json")
  @Response<ErrorResponseObjectType>(401, "Unauthorized", { status: 401, message: "이메일 또는 비밀번호가 올바르지 않습니다.", error: "Unauthorized" }, "application/json")
  @Response<ErrorResponseObjectType>(404, "Not Found", { status: 404, message: "요청한 리소스를 찾을 수 없습니다.", error: "Not Found" }, "application/json")
  public async login(
    @Request() req: ExpressRequest,
    @Body() body: PostLoginRequestBodyObjectType
  ): Promise<PostLoginResponseSuccessObjectType> {
    const authService = req.scope.resolve<IAuthSrv>("AuthService");
    userLoginSchema.parse(body);
    const registeredUserObj = await authService.login(body);

    req.res?.cookie("refreshToken", generateRefreshToken(registeredUserObj.id, [registeredUserObj.type]), {
      path:"/auth/login",
      signed: cookieConfig.signed,
      httpOnly: cookieConfig.httpOnly,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite as CookieSameSiteType,
      maxAge: cookieConfig.maxAge
    });

    return {
      user: omit(registeredUserObj, "password"),
      accessToken: generateAccessToken(registeredUserObj.id, [registeredUserObj.type])
    };
  }

  public logout() {
  }

  static [RESOLVER] = {
    name: 'AuthController'
  }
};