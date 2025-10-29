import { returnDBConfig } from "@_app/utils/util.app.db";
import config from "@_configs/index";
import { omit } from "@_utils/app.util";

export default returnDBConfig({dbType: config.env.db.type, dbConfig: omit(config, "app") });


/*
// sample config

const config: { [key: string]: Knex.Config } = {
  dev: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "password",
      database: "mydb",
    },
    migrations: {
      directory: "./migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
*/