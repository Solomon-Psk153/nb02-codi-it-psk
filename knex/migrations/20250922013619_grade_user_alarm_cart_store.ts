import type { Knex } from "knex";
import { createUsersTable } from "../models/users.model";
import { createGradesTable } from "../models/grades.model";
import { onUpdateTrigger } from "../../src/utils/knex.util";
import { createAlarmsTable } from "../models/alarms.model";
import { createCartsTable } from "../models/carts.model";
import { createStoresTable } from "../models/stores.model";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("grades", createGradesTable);
  
  await knex.schema.createTable("users", createUsersTable);
  await knex.raw(onUpdateTrigger("users"));

  await knex.schema.createTable("alarms", createAlarmsTable);
  await knex.raw(onUpdateTrigger("alarms"));

  await knex.schema.createTable("carts", createCartsTable);
  await knex.raw(onUpdateTrigger("carts"));

  await knex.schema.createTable("stores", createStoresTable);
  await knex.raw(onUpdateTrigger("stores"));
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("stores");
  await knex.schema.dropTableIfExists("carts");
  await knex.schema.dropTableIfExists("alarms");
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("grades");
}