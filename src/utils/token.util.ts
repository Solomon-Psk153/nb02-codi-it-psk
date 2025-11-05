import jwt from "jsonwebtoken";
import { jwtAccessSecret, jwtRefreshSecret } from "@_consts/env.consts";
import { JwtSignParamsGenerateType } from "@_types/util.type";

export const generateAccessToken = ({sub, scopes}: JwtSignParamsGenerateType) => {
  return jwt.sign({ sub, scopes }, jwtAccessSecret, {
    expiresIn: "5h",
    algorithm: "HS256"
  });
};

export const generateRefreshToken = ({sub, scopes}: JwtSignParamsGenerateType) => {
  return jwt.sign({ sub, scopes }, jwtRefreshSecret, {
    expiresIn: '1d',
    algorithm: "HS256"
  });
};