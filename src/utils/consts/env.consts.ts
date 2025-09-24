import { envVerify } from "../env.util";

// BASIC
export const NODE_ENV = envVerify("NODE_ENV");
export const PORT = envVerify("PORT");

// DB
export const PG_CONNECTION4CREATE = envVerify("PG_CONNECTION4CREATE");

export const DB_NAME = envVerify("DB_NAME");
export const PG_CONNECTION = envVerify("PG_CONNECTION");

export const isNotProduction = NODE_ENV !== "high_production"