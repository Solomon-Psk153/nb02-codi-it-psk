import type { Knex } from "knex";

export const createSizeInfoTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_size_info_id" });
  t.string("ko", 4).notNullable();
  t.string("en", 12).notNullable();
};