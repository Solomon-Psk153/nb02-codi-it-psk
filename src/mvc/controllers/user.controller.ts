import { Route, Controller, Tags, Post, Get, Body, SuccessResponse, Response, Example, Request, Security } from "@tsoa/runtime";
import { RESOLVER } from "awilix";

import type { Request as ExpressRequest } from "express";
import type { ErrorResponseObjectType } from "@_types/error.type";
import type { PostRegisterSuccessObjectType, PostRegisterRequestObjectType, PostFindUserInfoSuccessObjectType } from "@_types/user.type";
import type { IUserSrv } from "@_IFs/services/user.interface";
import { userRegisterSchema } from "@_validators/requests/user.validator";
import { RequestUserConfigType } from "@_types/config.type";

@Route("users")
@Tags("User")
export class UserController extends Controller {

  constructor() {
    super();
  }

  @Post("/")
  @SuccessResponse(201, "register success", "application/json")
  @Example<PostRegisterSuccessObjectType>({
    "id": "CUID",
    "name": "김유저",
    "email": "email@example.com",
    "password": "$2b$10$abc...",
    "type": "BUYER",
    "points": 999,
    "createdAt": "2025-05-29T06:00:41.976Z",
    "updatedAt": "2025-05-29T06:00:41.976Z",
    "grade": {
      "name": "green",
      "id": "grade_green",
      "rate": 5,
      "minAmount": 1000000
    },
    "image": "https://sprint-be-project.s3.ap-northeast-2.amazonaws.com/codiit/1749477485230-user_default.png"
  })
  @Response<ErrorResponseObjectType>(409, "ConFlict", { status: 409, message: "이미 존재하는 유저입니다.", error: "ConFlict" }, "application/json")
  public async register(
    @Request() req: ExpressRequest,
    @Body() body: PostRegisterRequestObjectType
  ): Promise<PostRegisterSuccessObjectType> {
    const userService = req.scope.resolve<IUserSrv>("UserService");
    userRegisterSchema.parse(body);
    const newRegisterObj = await userService.register(body);

    return newRegisterObj;
  }

  @Get("me")
  @Security("access", ["SELLER", "BUYER"])
  @SuccessResponse(200, "find my info Success", "application/json")
  @Example<PostFindUserInfoSuccessObjectType>({
    "id": "CUID",
    "name": "김유저",
    "email": "email@example.com",
    "password": "$2b$10$abc...",
    "type": "BUYER",
    "points": 999,
    "createdAt": "2025-05-29T06:00:41.976Z",
    "updatedAt": "2025-05-29T06:00:41.976Z",
    "grade": {
      "name": "green",
      "id": "grade_green",
      "rate": 5,
      "minAmount": 1000000
    },
    "image": "https://sprint-be-project.s3.ap-northeast-2.amazonaws.com/codiit/1749477485230-user_default.png"
  })
  @Response<ErrorResponseObjectType>(404, "NotFound", { status: 404, message: "유저를 찾을 수 없습니다.", error: "NotFound" }, "application/json")
  public async findMyInfo(
    @Request() req: ExpressRequest
  ): Promise<PostFindUserInfoSuccessObjectType> {
    const userService = req.scope.resolve<IUserSrv>("UserService");
    const currentUser = req.scope.resolve<RequestUserConfigType>("currentUser");
    const currentUserInfo = userService.findUserInfo(currentUser);
    return currentUserInfo;
  }


  static [RESOLVER] = {
    name: 'UserController'
  }
};