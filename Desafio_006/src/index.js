const express = require('express');
const { urlencoded } = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');
const router = require('./routes');
const Sockets = require('./sockets');
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//HBS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views-hbs');
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 8080);
app.use('/api', router);

const server = app.listen(app.get('port'), () => {
  console.info(`Server listening on port ${app.get('port')}`);
});

const io = new Server(server);

Sockets(io);
