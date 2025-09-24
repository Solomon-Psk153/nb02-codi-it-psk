import type { Knex } from "knex";
import { isNotProduction, PG_CONNECTION } from "../../src/utils/consts/env.consts";

// snake_case -> camelCase 변환
const toCamel = (str: string) => str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

// 재귀적으로 객체/배열 순회해서 key 변환
const keysToCamelDeep = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(keysToCamelDeep);
  } else if (data !== null && typeof data === "object") {
    return Object.entries(data).reduce((acc: any, [key, value]) => {
      acc[toCamel(key)] = keysToCamelDeep(value);
      return acc;
    }, {});
  }
  return data;
};

const config:Knex.Config = {
  client: "pg",
  connection: PG_CONNECTION,
  debug: isNotProduction,
  asyncStackTraces: isNotProduction,
  pool: { min: 0, max: 4 },
  acquireConnectionTimeout: 10000,
  postProcessResponse: (result, queryContext) => {
    if (queryContext && queryContext.skipPostProcess) return result;
    return keysToCamelDeep(result);
  },
  compileSqlOnError: isNotProduction,
  migrations: {
    extension: "ts",
    directory: "../migrations",
  }
};

export default config;

/*
// sample config

const config: { [key: string]: Knex.Config } = {
  dev: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "password",
      database: "mydb",
    },
    migrations: {
      directory: "./migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
*/