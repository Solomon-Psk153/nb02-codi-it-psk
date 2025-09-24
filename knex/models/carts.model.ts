import type { Knex } from "knex";

export const createCartsTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_cart_id" });
  t.string("user_id", 25).notNullable().comment("리턴할 때는 buyerId이어야 한다.");
  t.integer("quantity").notNullable().comment("장바구니 리턴할 때, 값이 보이지 않는다.");
  t.timestamps(true, true);

  t.foreign("user_id", "fkey_carts_to_user")
    .references("id").inTable("users")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");

  t.comment("어디에 쓰는 건지 알 수 없다.");
};