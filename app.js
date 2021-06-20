// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const port = process.env.PORT || 4001;
// const index = require("./routes/index");

// const app = express();
// app.use(index);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// const server = http.createServer(app);

// const io = socketIo(server);

// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

// server.listen(port, () => console.log(`Listening on port ${port}`));
var express = require("express");
app = express();
server = require("http").createServer(app);
io = require("socket.io")(server);
let interval;
let port = 3000;
server.listen(process.env.PORT || port, () =>
  console.log(`Listening on port ${process.env.PORT} || ${port}`)
);

io.sockets.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
