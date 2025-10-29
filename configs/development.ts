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

  knex:{
    pg: {
      debug: true,
      asyncStackTraces: true,
      compileSqlOnError: true,
      acquireConnectionTimeout: 4_000
    }
  }
};