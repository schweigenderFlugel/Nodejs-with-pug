const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const routerViews = require("./routes");
const socketIoServerSide = require('./utils/socket-server-side');
const { logErrors, boomErrorHandler, errorHandler } = require("./middlewares/error.handler");

const createApp = () => {

  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);

  // VIEWS ENGINE AND DIRECTORY
  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "/views"));

  // MIDDLEWARES
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "public")));

  // MUESTRA DE EXPRESS
  app.get("/", (req, res) => {
    res.send("Estoy escuchando desde mi express");
  });

  // SOCKET.IO
  socketIoServerSide(io);

  // RUTAS DE LAS VISTAS
  routerViews(app);

  // ERRORS HANDLERS
  app.use(logErrors);
  app.use(boomErrorHandler);
  app.use(errorHandler);
 
  return httpServer;
  
};

module.exports = createApp;
