const express = require("express");
const mongoose = require("mongoose");
const { startDB, stopDB, isConnected } = require("./db.js");
const app = express();
const route = require("./router/routes.js");
const cors = require("cors");

app.use(express.json());
app.use("/", route);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send(isConnected() ? "Connected" : "Disconnected");
});

app.get("/ping", (req, res) => {
  res.send("PONG");
});

if (require.main == module) {
  app.listen(3000, async () => {
    await startDB();
    console.log("Server is running on port 3000");
  });
}
