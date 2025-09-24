import knex from "knex";
import createConfig from "../../knex/config/create_db";
import { DB_NAME } from "../../src/utils/consts/env.consts";

export const create_db = async () => {
  const tmp4create = knex(createConfig);
  let rv;
  try {
    const isExists = await tmp4create.raw(`select 1 from pg_database where datname = '${DB_NAME}';`);

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

    if((isExists as any).rowCount > 0) rv = `Database "${DB_NAME}" already exists.`;
    else {
      await tmp4create.raw(`create database "${DB_NAME}" with connection_limit=5;`);
      rv = `Database "${DB_NAME}" created.`;
    }
  } catch (err) {
    rv = err; 
  } finally {
    tmp4create.destroy();
  }

  return rv;
};

create_db()
  .then(log => console.log(log))
  .catch(log => {
    console.error(log);
    process.exit(1);
  })