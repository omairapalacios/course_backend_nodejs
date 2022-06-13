import express from "express";
import { MensajeDAO } from "../database/mensajeDAO";
import { faker } from "@faker-js/faker";
import { normalize, schema } from "normalizr";
import { fork } from "child_process";

faker.locale = "es";

const { Router } = express;

export const api = Router();

const mensajesDAO = new MensajeDAO();

// Fake api
const generarProducto = ()=> {
  const producto = {
    title: faker.commerce.product(),
    price: faker.finance.amount(),
    thumbnail: faker.image.avatar(),
  };
  return producto;
};

const getProductos = () => {
  const productos = [];
  for (let i = 0; i < 5; i++) {
    productos.push(generarProducto());
  }
  return productos;
};

api.get("/productos-test", async (req, res)=> {
  res.send(getProductos());
});

// Send normalized data.

const author = new schema.Entity("author");
const message = new schema.Entity(
  "mensaje",
  { author: author },
  { idAttribute: "_id" }
);
const listOfMessages = new schema.Entity("mensajes", {
  mensajes: [message],
});

api.get("/mensajes", async (req, res)=> {
  const mensajes  = await mensajesDAO.obtenerTodos();
  const originalData = { id: "mensajes", mensajes };
  const normalizedData = normalize(originalData, listOfMessages);
  res.send(normalizedData);
});

api.post("/mensajes", async (req, res) => {
  const mensaje = req.body;
  try {
    await mensajesDAO.guardar({
      id: mensaje.timestamp + mensaje.author.id,
      ...mensaje,
    });
    res.send("Message is saved successfully");
  } catch (e) {
    console.log(e);
  }
});

api.get("/randoms", async (req, res) => {
  console.log(`randoms en ${process.pid} y ${process.argv}`);
  const { cant } = req.query;
  const forked = fork(__dirname + "/../src/random/randomNumbers.js");
  forked.send(cant || 100000000);
  forked.on("message", (msg) => {
    res.send(msg);
  });
});
