const express = require('express');
const router = require('./src/routes');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(router);

app.listen(app.get('port'), () => {
  console.info(`Server listening on port ${app.get('port')}`);
});
