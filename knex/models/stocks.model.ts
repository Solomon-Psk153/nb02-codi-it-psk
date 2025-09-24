import type { Knex } from "knex";

export const createStocksTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_stock_id" });
  t.string("product_id", 25).notNullable();
  t.integer("size_id").notNullable();
  t.integer("quantity").notNullable();

  t.foreign("product_id", "fkey_stocks_to_product")
    .references("id").inTable("users")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");

  t.comment("stock은 size의 product의 개수가 몇 개인지를 나타낸다.");
};