import type { Knex } from "knex";
import { onUpdateTrigger } from "../../src/utils/knex.util";
import { createRepliesTable } from "../models/replies.model";
import { createInquiriesTable } from "../models/inquiries.model";
import { createReviewsTable } from "../models/reviews.model";
import { createProductsTable } from "../models/products.model";
import { createCategoriesTable } from "../models/categories.model";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("categories", createCategoriesTable);

  await knex.schema.createTable("products", createProductsTable);
  await knex.raw(onUpdateTrigger("products"));

  await knex.schema.createTable("reviews", createReviewsTable);
  await knex.raw(onUpdateTrigger("reviews"));

  await knex.schema.createTable("inquiries", createInquiriesTable);
  await knex.raw(onUpdateTrigger("inquiries"));

  await knex.schema.createTable("replies", createRepliesTable);
  await knex.raw(onUpdateTrigger("replies"));
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("replies");
  await knex.schema.dropTableIfExists("inquiries");
  await knex.schema.dropTableIfExists("reviews");
  await knex.schema.dropTableIfExists("products");
  await knex.schema.dropTableIfExists("categories");
}