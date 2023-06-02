const express = require("express");
const path = require("path");
const { createServer } = require('http')
const { Server } = require('socket.io') 

const routerViews = require('./routes');
const config = require('./config/config');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Usamos el motor de las vistas y el directorio en donde están alojadas
app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());

app.use(express.urlencoded({ extended: false })); 
app.use(express.static('public'));

// Muestra 
app.get('/', (req, res) => {
    res.send('Estoy escuchando desde mi express');
  });

io.on('connection', socket => {
    console.log('Users conected: ', io.engine.clientsCount);
    socket.on("disconnect", () => {
        console.log("El socket " + socket.id + "se ha desconectado");
    socket.conn.once("upgrade", () => {
        console.log("Hemos pasado de HTTP Long-Polling a ", socket.conn.transport.name);
    })
    })
});

// LLamamos a las rutas, dependiendo del endpoint de la url
routerViews(app);

// En consola nos muestra el puerto y el entorno de trabajo.
httpServer.listen(3000, () => {
    console.log('Estoy escuchando por el puerto 3000');
});

