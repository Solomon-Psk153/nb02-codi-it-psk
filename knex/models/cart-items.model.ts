import type { Knex } from "knex";

export const createCartItemsTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_cart_item_id" });
  t.string("cart_id", 25).notNullable();
  t.string("product_id", 25).notNullable();
  t.integer("size_id").notNullable();
  t.integer("quantity").notNullable();
  t.timestamps(true, true);

  t.foreign("cart_id", "fkey_cart_items_to_cart")
    .references("id").inTable("carts")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");

  t.foreign("product_id", "fkey_cart_items_to_product")
    .references("id").inTable("products")
    .onDelete("SET NULL")
    .onUpdate("CASCADE");

  t.foreign("size_id", "fkey_cart_items_to_size")
    .references("id").inTable("sizes")
    .onDelete("SET NULL") 
    .onUpdate("CASCADE");
};