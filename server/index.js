const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);

const url = "https://emr-prod.herokuapp.com";
const PORT = process.env.PORT || 3001;

const io = require("socket.io")(server, {
  cors: {
    origin: url || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.end("EMR API.");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

server.listen(PORT, () =>
  console.log(`EMR Video-Chat server now running at port ${PORT}`)
);
