const mongoose = require('mongoose');
const connectMongoDb = require('./config/mongo');
const schemaProducts = require('./models/schemaProducts');

class Product {
  async connectDb() {
    return connectMongoDb();
  }
  async save(product) {
    try {
      if (!product || typeof product !== 'object') {
        throw Error('You should add an object');
      }
      if (Object.keys(product).length === 0) {
        throw Error("You can't add an empty object");
      }
      await this.connectDb();
      await schemaProducts.create(product);
      mongoose.disconnect();
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getById(id) {
    try {
      if (!id || typeof id !== 'number') {
        throw Error('Expect a number');
      }
      await this.connectDb();
      const product = await schemaProducts.findById(id);
      mongoose.disconnect();
      return product;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async updateById(id, newProduct) {
    try {
      if (!id || typeof id !== 'number') {
        throw Error('Expect a number');
      }
      await this.connectDb();
      await schemaProducts.updateById(id);
      mongoose.disconnect();
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getAll() {
    try {
      await this.connectDb();
      const products = await schemaProducts.find({});
      mongoose.disconnect();
      return products;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteById(id) {
    try {
      if (!id || typeof id !== 'number') {
        throw Error('Expect a number');
      }
      await this.connectDb();
      await schemaProducts.findByIdAndRemove(id);
      mongoose.disconnect();
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Product;
