import knex from "knex";
import config4create from "@_knex/config/createDb";
import config from "@_configs/index";

export const createDB4Migration = async (dbName: string) => {
  const tmp4create = knex(config4create);
  let rv;
  try {
    const isExists = await tmp4create.raw(`select 1 from pg_database where datname = '${dbName}';`);
    console.log("after isExists = ", isExists);
    /*
    // DB 존재할 때
    {
      rows: [ { "?column?": 1 } ],
      rowCount: 1,
      // ...기타 정보
    }

    // DB 없을 때
    {
      rows: [],
      rowCount: 0,
      // ...기타 정보
    }
    */

    if((isExists as any).rowCount > 0) rv = `Database "${dbName}" already exists.`;
    else {
      await tmp4create.raw(`create database "${dbName}" with connection_limit=5;`);
      rv = `Database "${dbName}" created.`;
    }
  } catch (err) {
    `err:${err}`.split("\n").slice(0, 5).forEach((line) => {
      console.log(line);
    });

    rv = err; 
  } finally {
    tmp4create.destroy();
  }

  return rv;
};

createDB4Migration(config.env.db.name)
  .then(log => console.log(log))
  .catch(log => {
    console.error(log);
    process.exit(1);
  });