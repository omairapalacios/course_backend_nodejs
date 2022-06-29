const express = require('express');
const path = require('path');
const router = express.Router();
const {
  getProducts,
  createProduct,
} = require('../controller/product.controller');


router.post('/productos', createProduct);

router.get('/productos', getProducts);

module.exports = router;
