import type { Knex } from "knex";

export const createSizesTable = (t: Knex.CreateTableBuilder) => {
  t.increments("id").primary({ constraintName: "pkey_size_id" });
  t.string("name", 4).notNullable();
  t.string("size_info_id", 25).notNullable();
  
  t.foreign("size_info_id", "fkey_sizes_to_size_info")
    .references("id").inTable("size_info")
    .onDelete("RESTRICT")
    .onUpdate("CASCADE");
};