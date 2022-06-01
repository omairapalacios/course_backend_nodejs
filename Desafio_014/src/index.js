const express = require('express');
const dotenv = require('dotenv');
const yargs = require('yargs');
const hideBin = require('yargs/helpers').hideBin;
const { urlencoded } = require('express');
const router = require('./routes/index');
const app = express();
dotenv.config();

const yargsInfo = yargs(hideBin(process.argv));
const argv = yargsInfo
  .option('port', { type: 'number' })
  .alias('p', 'port')
  .default('port', 8080).argv;

const PORT = argv.port;


app.use(express.json());
app.use(urlencoded({ extended: true }));

app.set('port', PORT);

app.use('/api', router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({
    status: 404,
    messages: 'Page not found',
  });
});

app.listen(app.get('port'), () => {
  console.info(
    '\x1b[33m%s\x1b[0m',
    `>>> Server listening on port ${app.get(
      'port'
    )} 🚀 `
  );
});