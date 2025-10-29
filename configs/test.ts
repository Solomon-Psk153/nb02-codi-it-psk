export default {
  app: {
    logLevel: 'debug',
    cookie: {
      httpOnly: false,
      secure: false,
      sameSite: 'none',
      // maxAge: 60 * 60 * 1000,
    }
  },

  knex: {
    pg: {
      pool: { min: 0, max: 10 },
      debug: true,
      asyncStackTraces: true,
      compileSqlOnError: true,
      acquireConnectionTimeout: 3_000
    }
  }
};