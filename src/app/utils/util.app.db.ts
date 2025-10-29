import { closeDBInstanceParamsType, createDBInstanceParamsType } from "@_types/app.type";
import { type Knex } from "knex";
import path from "path";

export const returnDB4CreateConfig = ({ dbType, dbConfig }: createDBInstanceParamsType): Knex.Config => {
  switch (dbType.toLowerCase()) {
    case "pg":
    case "postgres":
    case "postgresql": {
      return {
        client: dbConfig.knex.pg.client,
        connection: dbConfig.env.db.pg.createConnection,
        debug: dbConfig.knex.pg.debug,
        asyncStackTraces: dbConfig.knex.pg.asyncStackTraces,
        compileSqlOnError: dbConfig.knex.pg.compileSqlOnError,
        pool:{min:0, max:1}
      };
    }
    default:
      throw new Error(`Unsupported DB type: ${dbType}`);
  }
}

export const returnDBConfig = ({ dbType, dbConfig }: createDBInstanceParamsType): Knex.Config => {
  switch (dbType.toLowerCase()) {
    case "pg":
    case "postgres":
    case "postgresql": {
      return {
        client: dbConfig.knex.pg.client,
        connection: dbConfig.env.db.pg.connection,
        debug: dbConfig.knex.pg.debug,
        asyncStackTraces: dbConfig.knex.pg.asyncStackTraces,
        pool: dbConfig.knex.pg.pool,
        acquireConnectionTimeout: dbConfig.knex.pg.acquireConnectionTimeout,
        postProcessResponse: (result, queryContext) => {
          if (queryContext && queryContext.skipPostProcess) return result;

          // snake_case -> camelCase 변환
          const toCamel = (str: string) => str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

          // 재귀적으로 객체/배열 순회해서 key 변환
          const keysToCamelDeep = (data: any): any => {
            if (Array.isArray(data)) {
              return data.map(keysToCamelDeep);
            } else if (data !== null && typeof data === "object") {
              return Object.entries(data).reduce((acc: any, [key, value]) => {
                if (key === "image_url") key = "image";
                acc[toCamel(key)] = keysToCamelDeep(value);
                return acc;
              }, {});
            }
            return data;
          };

          return keysToCamelDeep(result);
        },
        compileSqlOnError: dbConfig.knex.pg.compileSqlOnError,
        migrations: {
          extension: "ts",
          directory: path.resolve(__dirname, "../../../knex/migrations"),
        },
        seeds: {
          directory: path.resolve(__dirname, "../../../knex/seeds"),
          extension: "ts",
          recursive: true
        },
        useNullAsDefault: true
      };
    }
    default:
      throw new Error(`Unsupported DB type: ${dbType}`);
  }
};

export const closeDBInstance = async ({ dbInstance }: closeDBInstanceParamsType) => {
  try {
    await (dbInstance as Knex).destroy();
  } catch (err) {
    throw new Error(`'Error while destroying DB instance', ${err}`);
  }
  // switch (dbType.toLowerCase()) {
  //   case "pg":
  //   case "postgres":
  //   case "postgresql":
  //     await (dbInstance as Knex).destroy();
  //     break;
  //   default:
  //     // Unknown type: best-effort, if has destroy call it
  //     // await (dbInstance as any).destroy();
  //     throw new Error(`Unsupported DB type: ${dbType}`);
  // }
};