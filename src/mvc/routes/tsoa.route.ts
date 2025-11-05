/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/auth.controller';
import { expressAuthentication } from './../../utils/expressAuthentication.tsoa';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  "Pick_UserDBObjectType.Exclude_keyofUserDBObjectType.grade_id-or-image_url__": {
    "dataType": "refAlias",
    "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "id": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true }, "password": { "dataType": "string", "required": true }, "type": { "dataType": "string", "required": true }, "points": { "dataType": "double", "required": true }, "createdAt": { "dataType": "string", "required": true }, "updatedAt": { "dataType": "string", "required": true } }, "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Omit_UserDBObjectType.grade_id-or-image_url_": {
    "dataType": "refAlias",
    "type": { "ref": "Pick_UserDBObjectType.Exclude_keyofUserDBObjectType.grade_id-or-image_url__", "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Pick_GradeDBObjectType.Exclude_keyofGradeDBObjectType.min_amount__": {
    "dataType": "refAlias",
    "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "id": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "rate": { "dataType": "double", "required": true } }, "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Omit_GradeDBObjectType.min_amount_": {
    "dataType": "refAlias",
    "type": { "ref": "Pick_GradeDBObjectType.Exclude_keyofGradeDBObjectType.min_amount__", "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "GradeRestructedDBObjectType": {
    "dataType": "refAlias",
    "type": { "dataType": "intersection", "subSchemas": [{ "ref": "Omit_GradeDBObjectType.min_amount_" }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "minAmount": { "dataType": "double", "required": true } } }], "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "UserRestructedDBObjectType": {
    "dataType": "refAlias",
    "type": { "dataType": "intersection", "subSchemas": [{ "ref": "Omit_UserDBObjectType.grade_id-or-image_url_" }, { "dataType": "nestedObjectLiteral", "nestedProperties": { "grade": { "ref": "GradeRestructedDBObjectType", "required": true }, "image": { "dataType": "string" } } }], "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "PostRegisterSuccessObjectType": {
    "dataType": "refAlias",
    "type": { "ref": "UserRestructedDBObjectType", "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "ErrorResponseObjectType": {
    "dataType": "refAlias",
    "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "error": { "dataType": "string", "required": true }, "message": { "dataType": "string", "required": true }, "status": { "dataType": "double", "required": true } }, "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "PostRegisterRequestObjectType": {
    "dataType": "refAlias",
    "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["SELLER"] }, { "dataType": "enum", "enums": ["BUYER"] }], "required": true }, "password": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true } }, "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "PostFindUserInfoSuccessObjectType": {
    "dataType": "refAlias",
    "type": { "ref": "UserRestructedDBObjectType", "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Pick_UserRestructedDBObjectType.Exclude_keyofUserRestructedDBObjectType.password-or-createdAt-or-updatedAt__": {
    "dataType": "refAlias",
    "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "id": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true }, "type": { "dataType": "string", "required": true }, "points": { "dataType": "double", "required": true }, "image": { "dataType": "string" }, "grade": { "ref": "GradeRestructedDBObjectType", "required": true } }, "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Omit_UserRestructedDBObjectType.password-or-createdAt-or-updatedAt_": {
    "dataType": "refAlias",
    "type": { "ref": "Pick_UserRestructedDBObjectType.Exclude_keyofUserRestructedDBObjectType.password-or-createdAt-or-updatedAt__", "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "PostLoginResponseSuccessObjectType": {
    "dataType": "refAlias",
    "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "accessToken": { "dataType": "string", "required": true }, "user": { "ref": "Omit_UserRestructedDBObjectType.password-or-createdAt-or-updatedAt_", "required": true } }, "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "PostLoginRequestBodyObjectType": {
    "dataType": "refAlias",
    "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "password": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true } }, "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "PostGetAccessWithRefreshSuccessObjectTYpe": {
    "dataType": "refAlias",
    "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "accessToken": { "dataType": "string", "required": true } }, "validators": {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################



  const argsUserController_register: Record<string, TsoaRoute.ParameterSchema> = {
    req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    body: { "in": "body", "name": "body", "required": true, "ref": "PostRegisterRequestObjectType" },
  };
  app.post('/api/users',
    ...(fetchMiddlewares<RequestHandler>(UserController)),
    ...(fetchMiddlewares<RequestHandler>(UserController.prototype.register)),

    async function UserController_register(request: ExRequest, response: ExResponse, next: any) {

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsUserController_register, request, response });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: 'register',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUserController_findMyInfo: Record<string, TsoaRoute.ParameterSchema> = {
    req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
  };
  app.get('/api/users/me',
    authenticateMiddleware([{ "access": ["SELLER", "BUYER"] }]),
    ...(fetchMiddlewares<RequestHandler>(UserController)),
    ...(fetchMiddlewares<RequestHandler>(UserController.prototype.findMyInfo)),

    async function UserController_findMyInfo(request: ExRequest, response: ExResponse, next: any) {

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsUserController_findMyInfo, request, response });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: 'findMyInfo',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
    req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    body: { "in": "body", "name": "body", "required": true, "ref": "PostLoginRequestBodyObjectType" },
  };
  app.post('/api/auth/login',
    ...(fetchMiddlewares<RequestHandler>(AuthController)),
    ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

    async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: 'login',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsAuthController_getAccessTokenWithRefreshToken: Record<string, TsoaRoute.ParameterSchema> = {
    req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
  };
  app.post('/api/auth/refresh',
    authenticateMiddleware([{ "refresh": ["SELLER", "BUYER"] }]),
    ...(fetchMiddlewares<RequestHandler>(AuthController)),
    ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.getAccessTokenWithRefreshToken)),

    async function AuthController_getAccessTokenWithRefreshToken(request: ExRequest, response: ExResponse, next: any) {

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_getAccessTokenWithRefreshToken, request, response });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: 'getAccessTokenWithRefreshToken',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      // keep track of failed auth attempts so we can hand back the most
      // recent one.  This behavior was previously existing so preserving it
      // here
      const failedAttempts: any[] = [];
      const pushAndRethrow = (error: any) => {
        failedAttempts.push(error);
        throw error;
      };

      const secMethodOrPromises: Promise<any>[] = [];
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const secMethodAndPromises: Promise<any>[] = [];

          for (const name in secMethod) {
            secMethodAndPromises.push(
              expressAuthenticationRecasted(request, name, secMethod[name], response)
                .catch(pushAndRethrow)
            );
          }

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          secMethodOrPromises.push(Promise.all(secMethodAndPromises)
            .then(users => { return users[0]; }));
        } else {
          for (const name in secMethod) {
            secMethodOrPromises.push(
              expressAuthenticationRecasted(request, name, secMethod[name], response)
                .catch(pushAndRethrow)
            );
          }
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      try {
        request['user'] = await Promise.any(secMethodOrPromises);

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }

        next();
      }
      catch (err) {
        // Show most recent error as response
        const error = failedAttempts.pop();
        error.status = error.status || 401;

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }
        next(error);
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
