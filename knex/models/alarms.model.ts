import type { Knex } from "knex";

export const createAlarmsTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_alarm_id" });
  t.string("user_id", 25).notNullable();
  t.text("content").notNullable();
  t.boolean("is_checked").notNullable().defaultTo(false);
  t.timestamps(true, true);

  t.foreign("user_id", "fkey_alarms_to_user")
    .references("id").inTable("users")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
};