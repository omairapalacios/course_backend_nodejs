const express = require('express');
const router = express.Router();
const {
  getInfo,
} = require('../controller/info.controller');

router.get('/', getInfo);

module.exports = router;
