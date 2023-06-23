const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const routerViews = require("./routes");
const socketIoServerSide = require('./utils/socket-server-side');
const { boomErrorHandler, errorHandler } = require("./middlewares/error.handler");


const createApp = () => {

  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  const swaggerSpec = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Node MongoDB API",
        version: "1.0.0"
      },
      servers: [
        {
          url: "http://localhost:3000"
        }
      ]
    },
    apis: ["./routes/*.js"],
  }

  // VIEWS ENGINE AND DIRECTORY
  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "/views"));

  // MIDDLEWARES
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "public")));
  app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)));

  // MUESTRA DE EXPRESS
  app.get("/", (req, res) => {
    res.send("Estoy escuchando desde mi express");
  });

  // SOCKET.IO
  socketIoServerSide(io);

  // RUTAS DE LAS VISTAS
  routerViews(app);

  // ERRORS HANDLERS
  app.use(boomErrorHandler);
  app.use(errorHandler);
 
  return httpServer;
  
};

module.exports = createApp;
