import type { Knex } from "knex";

export const createInquiriesTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_inquiry_id" });
  t.string("user_id", 25).notNullable();
  t.string("product_id", 25).notNullable();
  t.string("title", 100).notNullable().comment("1자 이상이면 된다.");
  t.text("content").notNullable().comment("1자 이상이면 된다.");
  t.string("status", 30).defaultTo("WaitingAnswer").comment("상태 값은 WaitingAnswer, CompletedAnswer이다.");
  t.boolean("is_secret").defaultTo(false).comment("비밀글 여부");
  t.timestamps(true, true);

  t.foreign("user_id", "fkey_inquiries_to_user")
    .references("id").inTable("users")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");

  t.foreign("product_id", "fkey_inquiries_to_product")
    .references("id").inTable("products")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
};