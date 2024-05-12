// import * as http from "http";
// import { Server as SocketIOServer, Socket } from "socket.io";

// const server = http.createServer((req, res) => {
//   // Handle HTTP requests if needed
// });

// const io = new SocketIOServer(server);

// io.on("connection", (socket: Socket) => {
//   console.log("A user connected");

//   // Handle chat messages
//   socket.on("chat message", (message: string) => {
//     io.emit("chat message", message); // Broadcast the message to all connected clients
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// server.listen(3001, () => {
//   console.log("WebSocket server listening on port 3001");
// });
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`user with id-${socket.id} joined room - ${roomId}`);
  });

  socket.on("send_msg", (data) => {
    console.log(data, "DATA");
    //This will send a message to a specific room ID
    socket.to(data.roomId).emit("receive_msg", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
