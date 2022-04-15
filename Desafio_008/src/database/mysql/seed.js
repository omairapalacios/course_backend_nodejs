const { config } = require('./config');
const knex = require('knex')(config);
const { products } = require('./products');

const seedDatabaseProductsMySQL = async () => {
  try {
    console.log('⚙ Configuring MYSQL');
    const existTableProducts = await knex.schema.hasTable('PRODUCTS');
    if (existTableProducts) {
      await knex.schema.dropTable('PRODUCTS');
    }
    await knex.schema.createTable('PRODUCTS', (table) => {
      table.string('id', 40).primary();
      table.string('name', 20).nullable(false);
      table.float('price').nullable(false);
      table.string('url', 300).nullable(false);
    });
    console.log('Creating PRODUCTS table');
    await knex('PRODUCTS').insert(products);
    console.log('Inserting registers on PRODUCTS table');
    await knex.destroy();
  } catch (error) {
    console.log(error.message);
  }
};

seedDatabaseProductsMySQL();
