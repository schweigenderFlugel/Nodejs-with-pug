const socket = io();

// El cliente recibe el mensaje del servidor
socket.on("welcome", (data) => {
  const text = document.querySelector("#text");
  text.textContent = data;
});

function checkSocketStatus() {
  console.log("Estado del Socket: ", socket.connected);
}
socket.on("connect", () => {
  console.log("El socket se ha conectado: ", socket.id);
  checkSocketStatus();
});

socket.on("connect_error", () => {
  console.log("Ha ocurrido un error en la conexión");
});

socket.on("disconnect", () => {
  console.log("El socket se ha desconectado: ", socket.id);
  checkSocketStatus();
});

socket.io.on("reconnect_attempt", () => {
  console.log("Se está intentando restablecer la conexión");
});

socket.io.on("reconnect", () => {
  console.log("Se ha restablecido la conexión");
});

// NEW USER CONNECTED
socket.on("everyone", (message) => {
  const text = document.querySelector("#user-connected");
  text.textContent = message;
  setTimeout(() => {
    text.classList.add("inactive");
  }, 2000);
  console.log(message);
});

// NUMBER OF USERS CONNECTED
socket.on("users_connected", (users) => {
  const usersConnected = document.querySelector("#users-number");
  usersConnected.textContent = users;
});

// ENTER TO A ROOM
const room2 = document.querySelector("#room2");
const room3 = document.querySelector("#room3");
const leaveRoom = document.querySelector("#leave");
const form = document.getElementById("chat-form");
form.style.display = "none"

room2.addEventListener("click", () => {
    form.style.display = "block"

    // EMITTING THE MESSAGE TO THE SERVER
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = e.target.msg.value;
      socket.emit("chatMessage", msg);
      e.target.msg.value = "";
      e.target.msg.focus();
    });

  socket.emit("join-room", "room 2");
  room2.style.display = "none";
  room3.style.display = "none";
  const leaveRoomButton = document.createElement("div");
  leaveRoomButton.innerHTML = `<button id="leave-button" class="btn btn-danger">Dejar sala</button>`;
  document.getElementById("leave").appendChild(leaveRoomButton);
  leaveRoom.addEventListener("click", () => {
    socket.emit("leave-room", 'room 2');
    leaveRoom.style.display = "none";
  })
});

room3.addEventListener("click", () => {
  form.style.display = "block";

  // EMITTING THE MESSAGE TO THE SERVER
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = e.target.msg.value;
    socket.emit("chatMessage", msg);
    e.target.msg.value = "";
    e.target.msg.focus();
  });

  socket.emit("join-room", "room 3");
  room2.style.display = "none";
  room3.style.display = "none";
  const leaveRoomButton = document.createElement("div");
  leaveRoomButton.innerHTML = `<button class="btn btn-danger">Dejar sala</button>`;
  document.getElementById("leave").appendChild(leaveRoomButton);
  leaveRoom.addEventListener("click", () => {
    socket.emit("leave-room", 'room 3');
    leaveRoom.style.display = "none";
  })
});

socket.on("room-joined", (message) => {
  console.log(message);
});

// RECIEVING THE MESSAGE FROM SERVER
socket.on("message", (message) => {
  outputMessage(message);
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<div style="width: 18rem; margin-bottom:10px" class="card">
        <div class="card-body">
            <h6 class="card-title">${message.username}</h6>
            <p class="card-text">${message.text}</p>
            <p class="card-subtitle mb-2 text-muted">${message.time}</p>
        </div>
    </div>`;
  document.getElementById("chat-messages").appendChild(div);
}
