const firestore = require('../database/firebase/config').firebaseDb;

class Product {
  constructor() {
    this.nameTable = 'PRODUCTS';
  }
  async save(product) {
    try {
      if (!product || typeof product !== 'object') {
        throw Error('You should add an object');
      }
      if (Object.keys(product).length === 0) {
        throw Error("You can't add an empty object");
      }
      const newProduct = {
        ...product,
      };
      await firestore.collection(this.nameTable).add(newProduct);
      return newProduct;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getAll() {
    try {
      const productsData = [];
      const result = await firestore.collection(this.nameTable).get();
      result.forEach((doc) => {
        productsData.push({
          ...doc.data(),
          id: doc.id,
        }
        );
      });
      const data = JSON.parse(JSON.stringify(productsData));
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Product;
