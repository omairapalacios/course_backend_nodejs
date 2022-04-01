const ProductoModel = require('../models/product.model');
const Producto = new ProductoModel();
const ChatModel = require('../models/chat.model');
const Chat = new ChatModel();

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New Client Connected:', socket.id);

    const sendProducts = async () => {
      const products = await Producto.getAll();
      io.emit('server:sendProducts', products);
    };
    sendProducts();

    socket.on('client:newProduct', async (data) => {
      console.log(data);
      await Producto.save(data);
      sendProducts();
    });

    const sendMessages = async () => {
      const messages = await Chat.getAllMessages();
      io.emit('server:sendMessages', messages);
    };
    sendMessages();
    // socket.on('client:deletenote', async (noteId) => {
    //   await Note.findByIdAndDelete(noteId);
    //   emitNotes();
    // });

    // socket.on('client:getnote', async (noteId) => {
    //   const note = await Note.findById(noteId);
    //   socket.emit('server:selectednote', note);
    // });

    // socket.on('client:updatenote', async (updatedNote) => {
    //   await Note.findByIdAndUpdate(updatedNote._id, {
    //     title: updatedNote.title,
    //     description: updatedNote.description,
    //   });
    //   emitNotes();
    // });

    // socket.on('disconnect', () => {
    //   console.log(socket.id, 'disconnected');
    // });
  });
};
