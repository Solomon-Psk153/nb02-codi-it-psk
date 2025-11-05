import { Request } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "@_errors/400.error";
import { UserDBObjectType } from "@_types/knex.type";
import { jwtAccessSecret, jwtRefreshSecret } from "@_consts/env.consts";
import { getContainer } from "@_di/container.di";
import type { Knex } from "knex";
import { appLogLevel } from "./consts/app.consts";
import { asValue } from "awilix";

// token을 여러 위치에서 찾기(헤더, 바디, 쿼리, 쿠키 가능)
const searchTokenWithName = (req: Request, name: string) => {
  if (req.body && req.body[name]) {
    return req.body[name];
  } else if (req.query && req.query[name]) {
    return String(req.query[name]);
  } else if (req.cookies && req.cookies[name]) {
    return req.cookies[name];
  } else return null;
};

const searchTokenWithSecurityName = (req: Request, secName: string):string => {
  let token: string | null | undefined;

  if (secName === "access") {
    const authHeader = req.headers["authorization"];
    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    } else {
      token = searchTokenWithName(req, "accesstoken");
    }
  } else if (secName === "refresh") {
    token = searchTokenWithName(req, "refreshToken");
  }

  if(!token){
    throw new Error(`No ${secName}token provided`);
  }

  if (appLogLevel === 'debug') console.log(`${secName}Token:`, token);
  
  return token;
};

const selectTokenSecret4HS = (secName: string) => {
  switch (secName) {
    case "access":
      return jwtAccessSecret;
    case "refresh":
      return jwtRefreshSecret;
    default:
      throw new Error(`${secName} secret not found`);
  }
}

// scopes = roles = seller or buyer
export const expressAuthentication = async (req: Request, securityName: string, scopes?: string[]) => {
  const token = searchTokenWithSecurityName(req, securityName);
  try {
    const payload = jwt.verify(token, selectTokenSecret4HS(securityName), { algorithms: ["HS256"] });
    
    if (typeof payload !== "object" || Object.is(payload, null)) {
      throw new Error("Invalid payload");
    }

    // const tokenRoles: string[] = Array.isArray(payload.roles) ? payload.roles : [];
    const tokenScopes: string[] = Array.isArray(payload.scopes) ? payload.scopes : [];
    
    if(appLogLevel === 'debug'){
      console.log("tokenScopes:", tokenScopes);
      console.log("scopes:", scopes);
    }

    if (scopes && scopes.length > 0) {
      
      const ok = scopes.every((scope) => tokenScopes.includes(scope));

      if (!ok) throw new Error("Insufficient scope");

    } else {
      throw new Error("scope not defined");
    }

    const userId = payload.sub;
    if (typeof userId !== "string") throw new Error("Invalid subject claim");

    const db = getContainer().resolve<Knex>("db");
    const user = await db.select("*").from("users").where({ id: userId }).first<UserDBObjectType | undefined>();
    
    if(appLogLevel === 'debug') console.log("user: ", user);

    if (user != null) {

      // if(tokenRoles.includes(user.type)) throw new Error("Not Same Role!");

      // safe user property
      req.user = {
        id: user.id,
        type: user.type
      };
      req.scope.register({ currentUser: asValue(req.user) });
    } else {
      throw new Error("user's not found");
    }
  } catch (err) {
    // 토큰이 잘못된 건 서버 오류가 아니라 클라이언트 인증 실패
    throw new UnauthorizedError(`Invalid Token: ${err}`);
  }
};