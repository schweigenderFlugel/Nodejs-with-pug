const socket = io();

// El cliente recibe el mensaje del servidor
socket.on("welcome", data => {
    const text = document.querySelector("#text")
    text.textContent = data;
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
const textArea = document.querySelector('#text-area')
emitToServer.addEventListener("click", () => {
    socket.emit("server", "Hola, servidor");
})


// NEW USER CONNECTED
socket.on("everyone", message => {
    const text = document.querySelector("#user-connected");
    text.textContent = message;
    setTimeout(() => {
        text.classList.add('inactive');
    }, 2000);
    console.log(message);
})

// NUMBER OF USERS CONNECTED
socket.on("users_connected", users => {
    const usersConnected = document.querySelector("#users-number");
    usersConnected.textContent = users;
})

// EMITTING THE MESSAGE TO THE SERVER
const form = document.getElementById('chat-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.msg.value;
    socket.emit('chatMessage', msg);
    e.target.msg.value = '';
    e.target.msg.focus();
})

// RECIEVING THE MESSAGE FROM SERVER
socket.on('message', message => {
    outputMessage(message);
})

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<div style="width: 18rem; margin-bottom:10px" class="card">
        <div class="card-body">
            <h6 class="card-title">${message.username}</h6>
            <p class="card-text">${message.text}</p>
            <p class="card-subtitle mb-2 text-muted">${message.time}</p>
        </div>
    </div>`
    document.getElementById('chat-messages').appendChild(div);
}