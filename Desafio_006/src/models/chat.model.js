const fs = require('fs');

class Chat {
  constructor() {
    this.path = 'chat.txt';
  }

  async saveMessage(chat) {
    try {
      if (!chat || typeof chat !== 'object') {
        throw Error('You should add an object');
      }
      if (Object.keys(chat).length === 0) {
        throw Error("You can't add an empty object");
      }
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify([], null, 2),
          'utf-8'
        );
      }
      let data = await fs.promises.readFile(this.path, 'utf-8');
      if (data !== '') {
        data = JSON.parse(data);
      }
      let newMessage = {};
      if (data.length > 0) {
        data = data.sort((a, b) => a.id - b.id);
        newMessage = { ...chat, id: data[data.length - 1].id + 1 };
        data = [...data, newMessage];
      } else {
        newMessage = { ...chat, id: 1 };
        data = [newMessage];
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(data, null, 2),
        'utf-8'
      );
      return newMessage.id;
    } catch (error) {
      throw Error(error.message);
    }
  }
  async getAllMessages() {
    try {
      if (!fs.existsSync(this.path)) {
        throw Error('The file not exists, please created');
      }
      let data = await fs.promises.readFile(this.path, 'utf-8');
      if (data === '' && data.length === 0) {
        throw Error('The file not have content');
      }
      data = JSON.parse(data);
      data = data.sort((a, b) => a.id - b.id);
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Chat;
