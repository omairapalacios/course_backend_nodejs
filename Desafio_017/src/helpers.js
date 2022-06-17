import axios from "axios";

export const sendInitialData = async (socket) => {
  const { productos } = await axios.get(
    "http://localhost/api/productos-test"
  );

  const { template } = await axios.get(
    "http://localhost/static/tabla.hbs"
  );

  const { mensajes } = await axios.get("http://localhost/api/mensajes");

  socket.emit("connected", {
    mensajes,
    productos,
    template,
  });
};

export const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};
