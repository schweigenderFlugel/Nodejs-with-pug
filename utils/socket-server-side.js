// SOCKET.IO
const socketIoServerSide = (io) => {
  io.on("connection", (socket) => {
    console.log("Users conected: ", io.engine.clientsCount);
    socket.emit("welcome", "Ahora estás conectado");
    socket.conn.once("upgrade", () => {
      console.log("Hemos pasado de HTTP Long-Polling a ", socket.conn.transport.name);
    });
    socket.on("server", data => {
      console.log(data);
    })

    io.emit("everyone", socket.id + " se ha conectado");

    socket.on("disconnect", () => {
      console.log("El socket " + socket.id + "se ha desconectado");
    });
  });
};

module.exports = socketIoServerSide;
