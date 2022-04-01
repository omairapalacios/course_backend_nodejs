const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controller/product.controller');


router.post('/productos', createProduct);

router.get('/productos', getProducts);

router.get('/productos/:id', getProductById);

router.put('/productos/:id', updateProductById);

router.delete('/productos/:id', deleteProductById);

module.exports = router;
