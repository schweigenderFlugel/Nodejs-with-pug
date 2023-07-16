const express = require("express");
const path = require("path");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const compression = require("compression");

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
    apis: ["src/routes/*.js"],
  }

  app.use(compression());

  // MIDDLEWARES
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)));


  const whitelist = ['http://localhost:3000']
  const options = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('not allowed by cors'))
      }
    },
    optionsSucessStatus: 200
  }
  app.use(cors(options));

  // MUESTRA DE EXPRESS
  app.get("/", (req, res) => {
    res.send("Estoy escuchando desde mi express");
  });

  // PASSPORT (MIDDLEWARE)
  require('./utils/auth');

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
