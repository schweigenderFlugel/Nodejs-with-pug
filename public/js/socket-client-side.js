const socket = io();

socket.on("welcome", data => {
    const text = document.querySelector("#text")
    text.textContent  = data;
})

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

const emitToServer = document.querySelector("#emit-to-server");
emitToServer.addEventListener("click", () => {
    socket.emit("server", "Hola, servidor");
})

socket.on("everyone", message => {
    const text = document.querySelector("#user-connected");
    text.textContent = message;
    setTimeout(() => {
        text.classList.add('inactive');
    }, 2000);
    console.log(message);
})