import { Route, Controller, Tags, Post, Body, SuccessResponse, Response, Example, Request } from "@tsoa/runtime";
import { RESOLVER } from "awilix";

import type { Request as ExpressRequest } from "express";
import type { ErrorResponseObjectType } from "@_types/error.type";
import type { PostUserRegisterRequestObjectType, UserRestructedDBObjectType } from "@_types/user.type";
import type { IUserSrv } from "@_IFs/services/user.interface";
import { userRegisterSchema } from "@_validators/requests/user.validator";

@Route("users")
@Tags("User")
export class UserController extends Controller{

  constructor(){
    super();
  }
  
  @Post("/")
  @SuccessResponse(201, "register success", "application/json")
  @Example<UserRestructedDBObjectType>({
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
  @Response<ErrorResponseObjectType>(409, "ConFlict", { status: 404, message: "이미 존재하는 유저입니다.", error: "ConFlict" }, "application/json")
  public async register(
    @Request() req: ExpressRequest,
    @Body() body: PostUserRegisterRequestObjectType
  ){
    const userService = req.scope.resolve<IUserSrv>("UserService");
    userRegisterSchema.parse(body);
    const newRegisterObj = await userService.register(body);

    return newRegisterObj;
  }

  static [RESOLVER] = {
    name: 'UserController'
  }
};