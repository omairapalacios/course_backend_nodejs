const connect = require('mongoose').connect;

const uri = process.env.MONGO_URI;

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