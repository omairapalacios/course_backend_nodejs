const CardModel = require('../models/cart.model');
const Cart = new CardModel();

module.exports = {
  createCart: async (req, res) => {
    try {
      const cart = await Cart.createCart();
      res.status(200).send({
        status: 200,
        data: {
          cart,
        },
        message: 'Cart was created successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  addProductToCart: async (req, res) => {
    try {
      if (!req.body.id) {
        throw Error('You should add an product');
      }
      if (!req.params.id) {
        throw Error('You should choose a cart');
      }
      const idCart = parseInt(req.params.id);
      const idProduct = req.body.id;
      const cart = await Cart.addProductToCart(idCart, idProduct);
      res.status(200).send({
        status: 200,
        data: cart,
        message: 'Product was added to Cart successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  getCartById: async (req, res) => {
    const idCard = parseInt(req.params.id);
    try {
      const data = await Cart.getCardById(idCard);
      res.status(200).send({
        status: 200,
        data,
        message: 'Card was obtained successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  deleteCartById: async (req, res) => {
    const idCart = parseInt(req.params.id);
    try {
      await Cart.deleteCartById(idCart);
      res.status(200).send({
        status: 200,
        data: {
          id: idCart,
        },
        message: 'Cart was delete successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  deleteProductCart: async (req, res) => {
    console.log(req.params)
    try {
      if (!req.params.id) {
        throw Error('You should add an product');
      }
      if (!req.params.idProd) {
        throw Error('You should choose a cart');
      }
      const idCart = parseInt(req.params.id);
      const idProduct = parseInt(req.params.idProd);
      const cart = await Cart.deleteProductCart(idCart, idProduct);
      res.status(200).send({
        status: 200,
        data: cart,
        message: 'Product was deleted to Cart successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
};
