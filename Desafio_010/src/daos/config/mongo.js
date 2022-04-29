const connect = require('mongoose').connect;

const uri =
  'mongodb+srv://admin:<password>@cluster0.bso5c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

function connectMongoDb() {
  try {
    const client = await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Db connectect to', client.connection.name);
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectMongoDb;