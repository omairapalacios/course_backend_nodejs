const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controller/product.controller');

router.post('/', createProduct);

router.get('/', getProducts);

router.get('/:id', getProductById);

router.put('/:id', updateProductById);

router.delete('/:id', deleteProductById);

module.exports = router;
