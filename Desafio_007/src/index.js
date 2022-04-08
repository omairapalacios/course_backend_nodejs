const express = require('express');
const { urlencoded } = require('express');
const router = require('./routes/index');
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.set('port', process.env.PORT || 8080);

app.use('/api', router);

app.listen(app.get('port'), () => {
  console.info(`Server listening on port ${app.get('port')}`);
});
