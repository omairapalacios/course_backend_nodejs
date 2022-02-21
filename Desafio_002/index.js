const fs = require('fs');

class Container {
  constructor() {
    this.path = 'productos.txt';
  }

  async save(product) {
    try {
      if (!product || typeof product !== 'object') {
        throw Error('You should add an object');
      }
      if (Object.keys(product).length === 0) {
        throw Error("You can't add an empty object");
      }
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify([], null, 2),
          'utf-8'
        );
      }
      let data = await fs.promises.readFile(this.path, 'utf-8');
      let newProduct = {};
      if (data !== '') {
        data = JSON.parse(data);
      }
      if (data.length > 0) {
        data = data.sort((a, b) => a.id - b.id);
        newProduct = { ...product, id: data[data.length - 1].id + 1 };
        data = [...data, newProduct];
      } else {
        newProduct = { ...product, id: 1 };
        data = [newProduct];
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(data, null, 2),
        'utf-8'
      );
      return newProduct.id;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getById(id) {
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
      const finded = data.find((product) => product.id === id);
      if (!finded) return null;
      return finded;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getAll() {
    try {
      if (!fs.existsSync(this.path)) {
        throw Error('The file not exists, please created');
      }
      let data = await fs.promises.readFile(this.path, 'utf-8');
      if (data === '' && data.length === 0) {
        throw Error('The file not have content');
      }
      data = JSON.parse(data);
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteById(id) {
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
      if (index === -1) return 'Product not exists';
      data = data.splice(index, 0);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(data, null, 2),
        'utf-8'
      );
      return 'Product was deleted successfully';
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteAll() {
    try {
      if (!fs.existsSync(this.path)) {
        throw Error('The file not exists, please created');
      }
      let data = await fs.promises.readFile(this.path, 'utf-8');
      if (data === '' && data.length === 0) {
        throw Error('The file not have content');
      }
      data = JSON.parse(data);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify([], null, 2),
        'utf-8'
      );
      return 'Products were deleted successfully';
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Container;
