import type { Knex } from "knex";

export const createReviewsTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_review_id" });
  t.string("user_id", 25).notNullable();
  t.string("product_id", 25).notNullable();
  t.integer("rating").notNullable().defaultTo(0).comment("1 ~ 5까지");
  t.text("content").notNullable().comment("최소 10자 이상이다.");
  t.timestamps(true, true);

  t.foreign("user_id", "fkey_reviews_to_user")
    .references("id").inTable("users")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");

  t.foreign("product_id", "fkey_reviews_to_product")
    .references("id").inTable("products")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
};