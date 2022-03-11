const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const router = require('./src/routes');
const app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',router);

app.listen(app.get('port'), () => {
  console.info(`Server listening on port ${app.get('port')}`);
});
