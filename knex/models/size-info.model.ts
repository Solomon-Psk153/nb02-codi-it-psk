import type { Knex } from "knex";

export const createSizeInfoTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_size_info_id" });
  t.string("ko", 4).notNullable().comment("swagger 문서에서는 축약으로 표시된다. e.g. L");
  t.string("en", 12).notNullable().comment("swagger 문서에서는 단어로 표시된다. e.g. Large");
};