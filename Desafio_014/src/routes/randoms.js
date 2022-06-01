const express = require('express');
const router = express.Router();
const fork = require('child_process').fork;

const child = fork('./src/process/numbersRandoms.js');

router.get('/', (req, res) => {
  const amount = req.query.cant;
  child.send(`start-${amount}`);
  child.on('message', (childMessage) => {
    res.json(childMessage);
  });
});

module.exports = router;

