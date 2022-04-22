const fs = require('fs');

class Cart {
  constructor() {
    this.path = 'carritos.txt';
    this.pathProducts = 'productos.txt';
  }

  async createCart() {
    try {
      if (!fs.existsSync(this.path)) {
        throw Error('The file not exists, please created');
      }
      let data = await fs.promises.readFile(this.path, 'utf-8');
      const timestamp = Date.now();
      if (data !== '') {
        data = JSON.parse(data);
      }
      let newCart = {};
      if (data.length > 0) {
        data = data.sort((a, b) => a.id - b.id);
        newCart = {
          id: data[data.length - 1].id + 1,
          timestamp,
          products: [],
        };
        data = [...data, newCart];
      } else {
        newCart = { id: 1, timestamp, products: [] };
        data = [newCart];
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(data, null, 2),
        'utf-8'
      );
      return newCart;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async addProductToCart(idCart, idProduct) {
    try {
      if (!fs.existsSync(this.path)) {
        throw Error('The file not exists, please created');
      }
      const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
      const idExist = carts.some((cart) => cart.id === idCart);
      const products = JSON.parse(
        await fs.promises.readFile(this.pathProducts, 'utf-8')
      );
      const idExistProduct = products.some(
        (product) => product.id === idProduct
      );
      let cartsUpdated = [];
      let currentCard = {};
      if (idExist && idExistProduct) {
        cartsUpdated = carts.map((cart) => {
          if (cart.id === idCart) {
            cart.products.push(idProduct);
            currentCard = cart;
            return cart;
          }
          return cart;
        });
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(cartsUpdated, null, 2)
        );
        return currentCard;
      }
      throw Error('Id does not exist');
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getCardById(id) {
    try {
      if (!id || typeof id !== 'number') {
        throw Error('Expect a number');
      }
      if (!fs.existsSync(this.path)) {
        throw Error('The file not exists, please created');
      }
      let data = await fs.promises.readFile(this.path, 'utf-8');
      if (data === '' && data.length === 0) {
        throw Error('The file not have content');
      }
      data = JSON.parse(data);
      const finded = data.find((card) => card.id === id);
      if (!finded) throw Error('Cart not found');
      return finded;
    } catch (error) {
      throw Error(error.message);
    }
  }
  async deleteCartById(id) {
    try {
      if (!id || typeof id !== 'number') {
        throw Error('Expect a number');
      }
      if (!fs.existsSync(this.path)) {
        throw Error('The file not exists, please created');
      }
      let data = await fs.promises.readFile(this.path, 'utf-8');
      if (data === '' && data.length === 0) {
        throw Error('The file not have content');
      }
      data = JSON.parse(data);
      const index = data.findIndex((product) => {
        return product.id === id;
      });
      if (index === -1)  throw Error('Cart not found'); 
      data = data.filter((product) => {
        return product.id != id;
      });
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(data, null, 2),
        'utf-8'
      );
      return 'Cart was deleted successfully';
    } catch (error) {
      throw Error(error.message);
    }
  }
  async deleteProductCart(idCart, idProduct) {
    try {
      if (!fs.existsSync(this.path)) {
        throw Error('The file not exists, please created');
      }
      const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
      const idExist = carts.some((cart) => cart.id === idCart);
      const products = JSON.parse(
        await fs.promises.readFile(this.pathProducts, 'utf-8')
      );
      const idExistProduct = products.some(
        (product) => product.id === idProduct
      );
      let cartsUpdated = [];
      let currentCard = {};
      if (idExist && idExistProduct) {
        cartsUpdated = carts.map((cart) => {
          if (cart.id === idCart) {
            const index = cart.products.findIndex((product) => {
              return product === idProduct;
            });
            if (index === -1) throw Error('Product not found on Cart'); 
            cart.products = cart.products.filter(
              (product) => product !== idProduct
            );
            currentCard = cart;
            return cart;
          } return cart;
        });
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(cartsUpdated, null, 2)
        );
        return currentCard;
      }
      throw Error('Id does not exist');
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Cart;
