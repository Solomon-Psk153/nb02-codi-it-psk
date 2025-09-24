import type { Knex } from "knex";

export const createOrderItemsTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_order_item_id" });
  t.bigInteger("price").notNullable();
  t.integer("quantity").notNullable();
  t.string("product_id", 25).notNullable();
  t.jsonb("product").notNullable();
  t.jsonb("size").notNullable();
  t.boolean("is_reviewed").notNullable();
  t.string("order_id", 25).notNullable();

  t.foreign("product_id", "fkey_order_items_to_product")
    .references("id").inTable("products")
    .onDelete("SET NULL")
    .onUpdate("CASCADE");

  t.foreign("order_id", "fkey_order_items_to_order")
    .references("id").inTable("orders")
    .onDelete("SET NULL")
    .onUpdate("CASCADE");
};