const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const socketIoServerSide = require('./utils/socket-server-side');

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
app.use(express.static("public"));

// Muestra
app.get("/", (req, res) => {
  res.send("Estoy escuchando desde mi express");
});

// SOCKET.IO
socketIoServerSide(io)

routerViews(app);

// LISTEN
httpServer.listen(3000, () => {
  console.log("Estoy escuchando por el puerto 3000");
});
