import axios from "axios";
import { sendInitialData } from "./helpers";

// Socket events
export const setupIo = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected");
    sendInitialData(socket);

    socket.on("newMessage", async (data) => {
      await axios.post("http://localhost/api/mensajes", { ...data });
      const { data: mensajes } = await axios.get(
        "http://localhost/api/mensajes"
      );
      io.sockets.emit('messageReceived', mensajes);
    });
  });
};
