const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const socketIoServerSide = require('./utils/socket-server-side');

const createApp = () => {
  const routerViews = require("./routes");
  const config = require("./config/config");

  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);

  // VIEWS ENGINE AND DIRECTORY
  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "/views"));

  // MIDDLEWARE
  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "public")));

  // MUESTRA DE EXPRESS
  app.get("/", (req, res) => {
    res.send("Estoy escuchando desde mi express");
  });

  // RUTAS DE LAS VISTAS
  routerViews(app);

  // SOCKET.IO
  socketIoServerSide(io);

  // DATABASE
  mongoose
    .connect(config.mongodbUri)
    .then(() => console.log("Connected to mongodb!"));

  return app;
  
};

module.exports = createApp;
