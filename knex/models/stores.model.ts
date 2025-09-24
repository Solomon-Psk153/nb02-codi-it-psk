import type { Knex } from "knex";

export const createStoresTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_store_id" });
  t.string("name", 100).notNullable().comment("이름이 다른 샵과 중복되도 문제는 없다.");
  t.string("address", 100).notNullable();
  t.string("detail_address", 200).notNullable();
  t.string("phone_number", 13).notNullable();
  t.text("content");
  t.text("image_url").comment("리턴할 때는 image로 줘야 한다.");
  t.string("user_id", 25).notNullable();
  t.integer("favorite_count").notNullable().defaultTo(0);
  t.integer("product_count").notNullable().defaultTo(0);
  t.integer("month_favorite_count").notNullable().defaultTo(0);
  t.integer("total_sold_count").notNullable().defaultTo(0);
  t.timestamps(true, true);

  t.foreign("user_id", "fkey_stores_to_user")
    .references("id").inTable("users")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
};