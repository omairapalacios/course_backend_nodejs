const { config } = require('./config');
const knex = require('knex')(config);

const seedDatabaseProductsSQLite = async () => {
  console.log('⚙ Configuring SQLITE3');
  try {
      const existTableMessages = await knex.schema.hasTable('MESSAGES');
      if (existTableMessages) {
        await knex.schema.dropTable('MESSAGES');
      }
      console.log('Creating registers on MESSAGES table');
      await knex.schema.createTable('MESSAGES', (table) => {
        table.string('id', 40).primary();
        table.string('message', 300).nullable(false);
        table.string('dateTime', 30).nullable(false);
        table.string('email', 40).nullable(false);
      });

      await knex.destroy();
  } catch (error) {
    console.log(error.message);
  }
};

seedDatabaseProductsSQLite();
