const formatMessage = require('./messages')

// SOCKET.IO
const socketIoServerSide = (io) => {
  io.on("connection", (socket) => {

    socket.conn.once("upgrade", () => {
      console.log("Hemos pasado de HTTP Long-Polling a", socket.conn.transport.name);
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
    socket.on('join-room', (room) => {
      socket.join(room);
      io.to(room).emit('room-joined', `${socket.id} just joined the ${room}`);
      socket.on('chatMessage', (msg) => {
        io.to(room).emit('message', formatMessage(socket.id, msg))
        io.to(room).emit('room', room)
      })
    });

    // Leave a room
    socket.on('leave-room', (room) => {
      console.log(`${socket.id} has left ${room}`);
      socket.leave(room);
      io.to(room).emit('room-left', `${socket.id} has left the room`);
    });


    // BROADCASTING WHO HAS JUST DISCONNECTED
    socket.on("disconnect", () => {
      socket.broadcast.emit("everyone", socket.id + " se ha desconectado");
      console.log("El socket " + socket.id + "se ha desconectado");
    });

  });
};

module.exports = socketIoServerSide;
