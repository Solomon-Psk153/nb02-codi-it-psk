import jwt from "jsonwebtoken";
import { jwtAccessSecret, jwtRefreshSecret } from "@_consts/env.consts";

export const generateRefreshToken = (userId: string, scopes: string[]) => {
  return jwt.sign({ sub: userId, scopes }, jwtAccessSecret, {
    expiresIn: "5h",
    algorithm: "HS256"
  });
}

export const generateAccessToken = (userId: string, scopes: string[]) => {
  return jwt.sign({ sub: userId, scopes }, jwtRefreshSecret, {
    expiresIn: '1d',
    algorithm: "HS256"
  });
}