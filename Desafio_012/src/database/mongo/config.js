const mongoose = require('mongoose');

const dbConnection = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected MongoDB")
    } catch (error) {
        console.log(error);
      throw new Error('Error');
    }
}

module.exports = {
  dbConnection,
};