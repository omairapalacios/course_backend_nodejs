const express = require('express');
const Container = require('../controllers');
const router = express.Router();
const container = new Container();

router.get('/productos', async (req, res) => {
  const products = await container.getAll();
  res.json({
    status: 200,
    data: products,
  });
});


router.get('/productoRandom', async (req, res) => {
  const products = await container.getAll();
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  res.json({
    status: 200,
    data: randomProduct,
  });
});

module.exports = router;
