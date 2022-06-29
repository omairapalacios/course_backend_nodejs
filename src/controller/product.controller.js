const ProductoModel = require('../models/product.model');
const Producto = new ProductoModel();

module.exports = {
  createProduct: async (req, res) => {
    try {
      const id = await Producto.save(req.body);
      res.status(200).send({
        status: 200,
        data: {
          id,
        },
        message: 'product was added successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  getProducts: async (req, res) => {
    try {
      const data = await Producto.getAll();
      res.render('products', {
        name: 'products',
        products: data,
      });
      /* res.status(200).send({
        status: 200,
        data,
        message: 'products was obtained successfully',
      }); */
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
};
