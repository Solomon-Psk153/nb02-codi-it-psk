import { initDI } from "@_di/container.di";
import { createCuid } from "@_utils/app.util";
import config from "@_configs/index";

import type { Knex } from "knex";

export async function seed(): Promise<void> {
  const container = await initDI({ config });
  const pg = container.resolve<Knex>("db");
  // // Deletes ALL existing entries
  await pg.transaction(async (trx: Knex.Transaction) => {
    await trx.del().from("grades");
    await trx.del().from("categories");
    await trx.del().from("size_info");
    await trx.del().from("sizes");
  });

  // Inserts seed entries
  await pg.transaction(async (trx: Knex.Transaction) => {
    await trx.insert([
      {
        id: createCuid(),
        name: "VIP",
        rate: 10,
        min_amount: 1_000_000
      },

      {
        id: createCuid(),
        name: "Black",
        rate: 7,
        min_amount: 500_000
      },

      {
        id: createCuid(),
        name: "Red",
        rate: 5,
        min_amount: 300_000
      },

      {
        id: createCuid(),
        name: "Orange",
        rate: 3,
        min_amount: 100_000
      },

      {
        id: createCuid(),
        name: "Green",
        rate: 1,
        min_amount: 0
      },
    ], ["id", "name", "rate", "min_amount"]).into("grades");

    await trx.insert([
      {
        id: createCuid(),
        name: "TOP"
      },

      {
        id: createCuid(),
        name: "BOTTOM"
      },

      {
        id: createCuid(),
        name: "DRESS"
      },

      {
        id: createCuid(),
        name: "OUTER"
      },

      {
        id: createCuid(),
        name: "SKIRT"
      },

      {
        id: createCuid(),
        name: "SHOES"
      },

      {
        id: createCuid(),
        name: "ACC"
      },
    ], ["id", "name"]).into("categories");

    for (const [short, long] of Object.entries({ FREE: "FREE", XS: "Extra Small", S: "Small", M: "Medium", L: "Large", XL: "Extra Large" })) {
      const fid = createCuid();

      await trx.insert({
        id: fid,
        ko: short,
        en: long
      }, ["id", "ko", "en"]).into("size_info");

      await trx.insert({
        // id: 0,
        name: short,
        size_info_id: fid
      }, ["id", "name", "size_info_id"]).into("sizes");
    }
  });

};
