
const firestore = require('../config/firebase').firebaseDb;
class Chat {
  constructor() {
    this.nameTable = 'MESSAGES';
  }
  async saveMessage(message) {
    try {
      if (!message || typeof message !== 'object') {
        throw Error('Data invalid');
      }
      if (Object.keys(message).length === 0) {
        throw Error("Data empty");
      }
      const data = await firestore.collection(this.nameTable).add({
        ...message
      });
      return { _id: data.id, message };
    } catch (error) {
      throw Error(error.message);
    }
  }
  async getAllMessages() {
    try {
      const data = [];
      const messages = await firestore.collection(this.nameTable).get();
      messages.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Chat;
