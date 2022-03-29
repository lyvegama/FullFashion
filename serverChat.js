const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socket => {
    // console.log(`Usuario conectado ${socket.id}`);

    socket.on("entrarSala", (data) => {
        socket.join(data)
        // console.log(`El usuario con ID: ${socket.id} se ha unido a la sala`)
    })

    socket.on("enviarMensaje", (info) => {
        socket.to(info.sala).emit("mensajeRecibido", info);
    })

    socket.on("disconnect", () => {
        // console.log("User Disconnected", socket.id);
    })
})

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
