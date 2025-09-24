import type { Knex } from "knex";

export const createGradesTable = (t: Knex.CreateTableBuilder) => {
  t.string("id", 25).primary({ constraintName: "pkey_grade_id" });
  t.string("name", 100).unique({ indexName: "uniq_grade_name" }).comment("VIP: 1,000,000원 이상 / Black: 500,000 이상 / Red: 300,000 / Orange: 100,000 / Green: 신규 회원");
  t.integer("rate").defaultTo(0).comment("무엇인가?");
  t.integer("min_amount").defaultTo(0).comment("VIP: 1,000,000원 이상 / Black: 500,000 이상 / Red: 300,000 / Orange: 100,000 / Green: 신규 회원");
};