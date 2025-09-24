import type { Knex } from "knex";

export const createOrdersTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_order_id" });
  t.string("name", 25).notNullable();
  t.string("phone_number", 25).notNullable();
  t.integer("subtotal").notNullable();
  t.integer("total_quantity").notNullable();
  t.integer("use_point").notNullable();
  t.timestamps(true, true);
  t.jsonb("payments").notNullable();
  t.text("address").notNullable();
  t.string("user_id", 25).notNullable();

  t.foreign("user_id", "fkey_orders_to_user")
    .references("id").inTable("users")
    .onDelete("SET NULL")
    .onUpdate("SET NULL");
};