const express = require('express');
const router = express.Router();

const products = require('./products');
const cards = require('./carts');
const info = require('./info');
const randoms = require('./randoms');

router.use('/productos', products);
router.use('/carritos', cards);
router.use('/info', info);
router.use('/randoms', randoms);

module.exports = router;
