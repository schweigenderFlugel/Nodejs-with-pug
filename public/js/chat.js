const socket = io();

function checkSocketStatus() {
    console.log("Estado del Socket: ", socket.connected);
}

socket.on("connect", () => {
    console.log("El socket se ha conectado: ", socket.id);
    checkSocketStatus();
})

socket.on("connect_error", () => {
    console.log("Ha ocurrido un error en la conexión")
})

socket.on("disconnect", () => {
    console.log("El socket se ha desconectado: ", socket.id);
    checkSocketStatus();
})

socket.io.on("reconnect_attempt", () => {
    console.log("Se está intentando restablecer la conexión")
})

socket.io.on("reconnect", () => {
    console.log("Se ha restablecido la conexión")
})