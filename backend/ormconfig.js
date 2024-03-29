module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL_AWS,
  "entities": [
    "./src/models/*.ts"
  ],
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}