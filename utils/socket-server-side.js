const formatMessage = require('./messages')

// SOCKET.IO
const socketIoServerSide = (io) => {
  io.on("connection", (socket) => {

    console.log("Users conected: ", io.engine.clientsCount);
    socket.conn.once("upgrade", () => {
      console.log("Hemos pasado de HTTP Long-Polling a ", socket.conn.transport.name);
    });
    socket.on("server", data => {
      console.log(data);
    })

    // Mensaje para el cliente actual. 
    socket.emit("welcome", "Ahora estás conectado");

    // Para todos los clientes en general
    // io.emit("everyone", socket.id + " se ha conectado");

    // para todos los demás clientes
    socket.broadcast.emit("everyone", socket.id + " se ha conectado");

    // RECIEVING MESSAGE FROM CLIENT SIDE AND SEND IT BACK TO THE CLIENT
    socket.on('chatMessage', (msg) => {
      io.emit('message', formatMessage('USER', msg));
    })

    socket.on("disconnect", () => {
      socket.broadcast.emit("everyone", socket.id + " se ha desconectado");
      console.log("El socket " + socket.id + "se ha desconectado");
    });

  });
};

module.exports = socketIoServerSide;
