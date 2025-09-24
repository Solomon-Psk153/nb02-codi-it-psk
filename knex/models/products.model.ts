import type { Knex } from "knex";

export const createProductsTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_product_id" });
  t.string("name", 150).notNullable();
  t.text("image_url").comment("리턴할 때는 image로 줘야 한다.");
  t.text("content").notNullable();
  t.timestamps(true, true);
  t.float("reviews_rating").notNullable().comment("별점");
  t.string("store_id", 25).notNullable();
  t.string("category_id", 25).notNullable();
  t.string("store_name", 100);
  t.bigInteger("price").notNullable();
  t.bigInteger("discount_price");
  t.integer("discount_rate");
  t.timestamp("discount_start_time");
  t.timestamp("discount_end_time");
  t.integer("reviews_count").defaultTo(0);
  t.integer("sales");
  t.integer("stock");
  t.boolean("is_sold_out");
  t.boolean("is_discount");

  t.foreign("category_id", "fkey_products_to_category")
    .references("id").inTable("categories")
    .onDelete("RESTRICT")
    .onUpdate("CASCADE");

  t.foreign("store_id", "fkey_products_to_store")
    .references("id").inTable("stores")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
};