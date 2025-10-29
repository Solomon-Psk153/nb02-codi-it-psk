// import { GradeRestructedDBObjectType } from "@_types/user.type";
import { initDI } from "@_di/container.di";
import type { GradeRestructedDBObjectType } from "@_types/user.type";
import { createCuid, hashingWithSalt } from "@_utils/app.util";
import { faker } from "@faker-js/faker";
import config from "@_configs/index";

import type { Knex } from "knex";

export async function seed(): Promise<void> {
  const container = await initDI({ config });
  const pg = container.resolve<Knex>("db");
  // Deletes ALL existing entries
  await pg.transaction(async (trx: Knex.Transaction) => {
    await trx.del().from("users");
  });

  // Inserts seed entries
  const greenGradeId = await pg.select("id").from("grades").where({ name: "Green" }).first<GradeRestructedDBObjectType>();
  await pg.insert([
    {
      id: createCuid(),
      name: "test_buyer1",
      email: faker.internet.email({ firstName: "a", lastName: "a", provider: "a" }),
      password: await hashingWithSalt("qwer"),
      type: "BUYER",
      grade_id: greenGradeId,
    },
    {
      id: createCuid(),
      name: "test_seller1",
      email: faker.internet.email({ firstName: "b", lastName: "b", provider: "b" }),
      password: await hashingWithSalt("qwer"),
      type: "SELLER",
      grade_id: greenGradeId,
    },
    {
      id: createCuid(),
      name: "test_buyer2",
      email: faker.internet.email({ firstName: "c", lastName: "c", provider: "c" }),
      password: await hashingWithSalt("qwer"),
      type: "BUYER",
      grade_id: greenGradeId,
    },
  ], ["id", "name", "email", "type"]).into("users");
};
