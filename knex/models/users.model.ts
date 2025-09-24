import type { Knex } from "knex";

export const createUsersTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_user_id" });
  t.string("name", 100).notNullable().comment("중복되도 된다.");
  t.string("email", 200).notNullable().unique({ indexName: "uniq_user_email" });
  t.text("password").comment("8자 이상은 프론트에서 처리하며 암호화되서 들어간다.");
  t.string("type", 6).comment("타입은 SELLER, BUYER 뿐이다.");
  t.timestamps(true, true);
  t.string("grade_id", 25).notNullable();
  t.text("image_url").comment("리턴할 때는 image로 줘야 한다.");
  t.integer("points").notNullable().defaultTo(0);

  t.foreign("grade_id", "fkey_users_to_grade")
    .references("id").inTable("grades")
    .onDelete("RESTRICT")
    .onUpdate("CASCADE");
};