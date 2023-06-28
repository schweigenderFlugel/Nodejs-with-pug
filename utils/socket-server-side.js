const formatMessage = require('./messages')

// SOCKET.IO
const socketIoServerSide = (io) => {
  io.on("connection", (socket) => {

    socket.conn.once("upgrade", () => {
      console.log("Hemos pasado de HTTP Long-Polling a ", socket.conn.transport.name);
    });
    socket.on("server", data => {
      console.log(data);
    })

    // SEND TO CLIENT THE NUMBER OF USERS CONNECTED
    console.log("Users conected: ", io.engine.clientsCount);
    socket.emit("users_connected", io.engine.clientsCount)

    // Mensaje para el cliente actual. 
    socket.emit("welcome", "Ahora estás conectado");

    // Para todos los clientes en general
    // io.emit("everyone", socket.id + " se ha conectado");

    // BROADCASTING WHO HAS JUST CONNECTED
    socket.broadcast.emit("everyone", socket.id + " se ha conectado");

     // Join a room
    socket.on('join', (roomName) => {
      socket.join(roomName);
      io.to(roomName).emit('roomJoined', `${socket.id} just joined the ${roomName}`);
    });

    // Leave a room
    socket.on('leaveRoom', (room) => {
      console.log(`${socket.id} has left room ${room}`);
      socket.leave(room);
      io.to(room).emit('roomLeft', `${socket.id} has left the room`);
    });


    // RECIEVING MESSAGE FROM CLIENT SIDE AND SEND IT BACK TO THE CLIENT
    socket.on('chatMessage', (msg) => {
      io.emit('message', formatMessage(socket.id, msg));
    })

    // BROADCASTING WHO HAS JUST DISCONNECTED
    socket.on("disconnect", () => {
      socket.broadcast.emit("everyone", socket.id + " se ha desconectado");
      console.log("El socket " + socket.id + "se ha desconectado");
    });

  });
};

module.exports = socketIoServerSide;
