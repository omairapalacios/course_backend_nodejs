var express = require('express');
var router = express.Router();

var products = require('./products');
var cards = require('./cars');

router.use('/productos', products);
router.use('/cards', cards);

module.exports = router;
