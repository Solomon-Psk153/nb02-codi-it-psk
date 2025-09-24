import type { Knex } from "knex";

export const createRepliesTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_reply_id" });
  t.string("inquiry_id", 25).notNullable();
  t.string("user_id", 25).notNullable();
  t.text("content").notNullable();
  t.timestamps(true, true);

  t.foreign("inquiry_id", "fkey_replies_to_inquiry")
    .references("id").inTable("inquiries")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");

  t.foreign("user_id", "fkey_replies_to_user")
    .references("id").inTable("users")
    .onDelete("SET NULL")
    .onUpdate("CASCADE");
};