import type { Knex } from "knex";
import { isNotProduction, PG_CONNECTION4CREATE } from "../../src/utils/consts/env.consts";

// DB 생성 전용 knex 설정 (기존 DB에 접속)
const config: Knex.Config = {
  client: "pg",
  connection: PG_CONNECTION4CREATE,
  debug: isNotProduction,
  asyncStackTraces: isNotProduction,
  compileSqlOnError: isNotProduction,
  pool:{min:0, max:1}
};

export default config;
