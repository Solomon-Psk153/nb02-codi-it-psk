export default {
  app: {
    logLevel: 'info',
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
      signed: true,
    }
  }, 

  knex: {
    pg: {
      client: "pg",
      pool: { min: 0, max: 4 },
      debug: false,
      asyncStackTraces: false,
      compileSqlOnError: false,
      acquireConnectionTimeout: 10_000
    }
  }
};