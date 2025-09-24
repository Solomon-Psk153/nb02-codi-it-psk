import type { Knex } from "knex";

export const createCategoriesTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_category_id" });
  t.string("name", 4).notNullable();
};