export default {
  knex: {
    pg: {
      pool: { min: 2, max: 20 }
    }
  }
};