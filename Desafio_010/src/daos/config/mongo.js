const connect = require('mongoose').connect;

const uri =
  'mongodb+srv://omaira:7VX3qFkBW4vLwqqv@cluster0.bso5c.mongodb.net/omaira-coderhouse?retryWrites=true&w=majority';

async function connectMongoDb() {
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