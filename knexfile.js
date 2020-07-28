
require("dotenv").config();

const pgConnection = process.env.DATABASE_URL || "postgresql://postgres:abc@localhost/recipe";

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/recipe.db3'
    },
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
},

testing: {
  client: "sqlite3",
  connection: {
    filename: ":memory:",
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
},

production: {
  client: "pg",
  connection: pgConnection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./data/migrations",
    tableName: "knex_migrations"
  },
  seeds: {
    directory: "./data/seeds",
  },
},
};